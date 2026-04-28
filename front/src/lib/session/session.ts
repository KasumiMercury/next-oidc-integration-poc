import "server-only";
import {
	getIronSession,
	type IronSession,
	type SessionOptions,
} from "iron-session";
import { cookies } from "next/headers";
import type { NextRequest, NextResponse } from "next/server";
import { env } from "@/lib/env";

export type IDTokenClaims = {
	sub: string;
	email?: string;
	email_verified?: boolean;
	name?: string;
	preferred_username?: string;
	[key: string]: unknown;
};

export type SessionData = {
	subject?: string;
	claims?: IDTokenClaims;
	accessToken?: string;
	refreshToken?: string;
	idToken?: string;
	accessTokenExpiresAt?: number;
};

export const sessionOptions: SessionOptions = {
	password: env.sessionSecret,
	cookieName: "front_poc_session",
	ttl: 60 * 60 * 24 * 14,
	cookieOptions: {
		httpOnly: true,
		sameSite: "lax",
		path: "/",
		secure: process.env.NODE_ENV === "production",
	},
};

export async function getSession(): Promise<IronSession<SessionData>> {
	return getIronSession<SessionData>(await cookies(), sessionOptions);
}

export async function getProxySession(
	req: NextRequest,
	res: NextResponse,
): Promise<IronSession<SessionData>> {
	return getIronSession<SessionData>(req, res, sessionOptions);
}

export function isAuthenticated(session: SessionData): boolean {
	return Boolean(session.subject && session.accessToken);
}
