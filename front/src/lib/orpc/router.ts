import { authorized } from "@/lib/orpc/authorized";

export const router = {
	me: authorized.handler(({ context }) => ({
		session: context.session,
		user: context.user,
	})),
};

export type Router = typeof router;
