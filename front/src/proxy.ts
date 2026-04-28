import { type NextRequest, NextResponse } from "next/server";
import { env } from "@/lib/env";
import { refreshSessionIfNeeded } from "@/lib/session/refresh";
import { getProxySession } from "@/lib/session/session";

export async function proxy(req: NextRequest) {
	const res = NextResponse.next();
	const session = await getProxySession(req, res);
	if (!session.refreshToken) return res;

	const result = await refreshSessionIfNeeded(session);
	if (result.kind === "failed") {
		console.error("[proxy] refresh failed, destroying session", result.error);
		session.destroy();
		const redirectRes = NextResponse.redirect(new URL("/", env.appUrl));
		for (const [k, v] of res.headers) {
			if (k.toLowerCase() === "set-cookie") {
				redirectRes.headers.append("set-cookie", v);
			}
		}
		return redirectRes;
	}
	return res;
}

export const config = {
	matcher: [
		"/((?!api/auth|login|consent|logout|_next/static|_next/image|favicon.ico).*)",
	],
};
