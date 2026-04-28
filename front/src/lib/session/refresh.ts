import "server-only";
import type { IronSession } from "iron-session";
import * as client from "openid-client";
import { oidcConfig } from "@/lib/oidc/client";
import type { IDTokenClaims, SessionData } from "./session";

const REFRESH_THRESHOLD_MS = 60_000;
const FALLBACK_LIFETIME_MS = 5 * 60 * 1000;

export type RefreshResult =
	| { kind: "ok" }
	| { kind: "no-session" }
	| { kind: "failed"; error: unknown };

export async function refreshSessionIfNeeded(
	session: IronSession<SessionData>,
): Promise<RefreshResult> {
	if (!session.refreshToken || !session.accessTokenExpiresAt) {
		return { kind: "no-session" };
	}
	if (session.accessTokenExpiresAt - REFRESH_THRESHOLD_MS > Date.now()) {
		return { kind: "ok" };
	}

	try {
		const tokens = await client.refreshTokenGrant(
			oidcConfig,
			session.refreshToken,
		);
		session.accessToken = tokens.access_token;
		if (tokens.refresh_token) {
			session.refreshToken = tokens.refresh_token;
		}
		if (tokens.id_token) {
			session.idToken = tokens.id_token;
			const claims = tokens.claims();
			if (claims) {
				session.claims = claims as IDTokenClaims;
				session.subject = claims.sub;
			}
		}
		const expiresIn = tokens.expiresIn();
		session.accessTokenExpiresAt =
			expiresIn !== undefined
				? Date.now() + expiresIn * 1000
				: Date.now() + FALLBACK_LIFETIME_MS;
		await session.save();
		return { kind: "ok" };
	} catch (error) {
		return { kind: "failed", error };
	}
}
