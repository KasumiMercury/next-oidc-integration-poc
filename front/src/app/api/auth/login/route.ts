import { type NextRequest, NextResponse } from "next/server";
import * as client from "openid-client";
import { env } from "@/lib/env";
import { oidcConfig } from "@/lib/oidc/client";
import { getOAuthFlowSession } from "@/lib/session/oauth-flow";

export async function GET(req: NextRequest) {
	const codeVerifier = client.randomPKCECodeVerifier();
	const codeChallenge = await client.calculatePKCECodeChallenge(codeVerifier);
	const state = client.randomState();

	const authUrl = client.buildAuthorizationUrl(oidcConfig, {
		redirect_uri: env.oidcRedirectUri,
		scope: env.oidcScope,
		code_challenge: codeChallenge,
		code_challenge_method: "S256",
		state,
	});

	const res = NextResponse.redirect(authUrl);
	const flow = await getOAuthFlowSession(req, res);
	flow.codeVerifier = codeVerifier;
	flow.state = state;
	flow.returnTo = req.nextUrl.searchParams.get("returnTo") ?? "/";
	await flow.save();

	return res;
}
