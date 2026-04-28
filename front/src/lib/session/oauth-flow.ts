import "server-only";
import {
	getIronSession,
	type IronSession,
	type SessionOptions,
} from "iron-session";
import type { NextRequest, NextResponse } from "next/server";
import { env } from "@/lib/env";

export type OAuthFlowData = {
	codeVerifier?: string;
	state?: string;
	returnTo?: string;
};

const flowOptions: SessionOptions = {
	password: env.sessionSecret,
	cookieName: "front_poc_oauth_flow",
	ttl: 600,
	cookieOptions: {
		httpOnly: true,
		sameSite: "lax",
		path: "/api/auth",
		secure: process.env.NODE_ENV === "production",
	},
};

export async function getOAuthFlowSession(
	req: NextRequest,
	res: NextResponse,
): Promise<IronSession<OAuthFlowData>> {
	return getIronSession<OAuthFlowData>(req, res, flowOptions);
}
