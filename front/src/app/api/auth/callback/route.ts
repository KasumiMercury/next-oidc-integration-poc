import { type NextRequest, NextResponse } from "next/server";
import * as client from "openid-client";
import { env } from "@/lib/env";
import { oidcConfig } from "@/lib/oidc/client";
import { getOAuthFlowSession } from "@/lib/session/oauth-flow";
import { getProxySession, type IDTokenClaims } from "@/lib/session/session";

const FALLBACK_LIFETIME_MS = 5 * 60 * 1000;

function errorRedirect(code: string): NextResponse {
	const url = new URL("/", env.appUrl);
	url.searchParams.set("auth_error", code);
	return NextResponse.redirect(url);
}

function copySetCookie(from: NextResponse, to: NextResponse): void {
	for (const [k, v] of from.headers) {
		if (k.toLowerCase() === "set-cookie") {
			to.headers.append("set-cookie", v);
		}
	}
}

export async function GET(req: NextRequest) {
	const res = new NextResponse(null, { status: 302 });
	const flow = await getOAuthFlowSession(req, res);

	if (!flow.codeVerifier || !flow.state) {
		return errorRedirect("missing_flow");
	}

	const target = flow.returnTo ?? "/";
	const codeVerifier = flow.codeVerifier;
	const expectedState = flow.state;

	// Reconstruct the callback URL from the registered redirect_uri so that openid-client's
	// `stripParams(currentUrl)` produces the exact `redirect_uri` value Hydra expects.
	// Inside Docker, req.nextUrl.origin can be `http://0.0.0.0:3000`, which would not match
	// the registered `http://localhost:3000/api/auth/callback` and cause Hydra to reject the
	// token exchange.
	const callbackUrl = new URL(env.oidcRedirectUri);
	for (const [k, v] of req.nextUrl.searchParams) {
		callbackUrl.searchParams.append(k, v);
	}

	let tokens: Awaited<ReturnType<typeof client.authorizationCodeGrant>>;
	try {
		tokens = await client.authorizationCodeGrant(oidcConfig, callbackUrl, {
			pkceCodeVerifier: codeVerifier,
			expectedState,
			idTokenExpected: true,
		});
	} catch (error) {
		console.error("[auth/callback] token exchange failed", error);
		flow.destroy();
		const fail = errorRedirect("token_exchange_failed");
		copySetCookie(res, fail);
		return fail;
	}

	const claims = tokens.claims();
	if (!claims) {
		console.error("[auth/callback] id_token claims missing");
		flow.destroy();
		const fail = errorRedirect("no_id_token");
		copySetCookie(res, fail);
		return fail;
	}

	const session = await getProxySession(req, res);
	session.subject = claims.sub;
	session.claims = claims as IDTokenClaims;
	session.accessToken = tokens.access_token;
	session.refreshToken = tokens.refresh_token;
	session.idToken = tokens.id_token;
	const expiresIn = tokens.expiresIn();
	session.accessTokenExpiresAt =
		expiresIn !== undefined
			? Date.now() + expiresIn * 1000
			: Date.now() + FALLBACK_LIFETIME_MS;
	await session.save();
	flow.destroy();

	res.headers.set("location", new URL(target, env.appUrl).toString());
	return res;
}
