import { ORPCError } from "@orpc/server";
import { auth } from "@/features/auth/rp/auth";
import { base } from "@/lib/orpc/context";

export const authMiddleware = base.middleware(async ({ context, next }) => {
	const sessionData = await auth.api.getSession({
		headers: context.reqHeaders ?? new Headers(),
	});

	if (!sessionData?.session || !sessionData?.user) {
		throw new ORPCError("UNAUTHORIZED");
	}

	return next({
		context: {
			session: sessionData.session,
			user: sessionData.user,
		},
	});
});
