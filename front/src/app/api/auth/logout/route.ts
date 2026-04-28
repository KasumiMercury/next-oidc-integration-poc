import { type NextRequest, NextResponse } from "next/server";
import { env } from "@/lib/env";
import { getProxySession } from "@/lib/session/session";

async function handle(req: NextRequest): Promise<NextResponse> {
	const res = new NextResponse(null, { status: 302 });
	const session = await getProxySession(req, res);
	const idTokenHint = session.idToken;
	session.destroy();

	const endSession = new URL(`${env.oidcIssuerUrl}/oauth2/sessions/logout`);
	if (idTokenHint) endSession.searchParams.set("id_token_hint", idTokenHint);
	endSession.searchParams.set("post_logout_redirect_uri", `${env.appUrl}/`);

	res.headers.set("location", endSession.toString());
	return res;
}

export async function GET(req: NextRequest) {
	return handle(req);
}

export async function POST(req: NextRequest) {
	return handle(req);
}
