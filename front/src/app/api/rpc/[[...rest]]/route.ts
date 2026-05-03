import { RPCHandler } from "@orpc/server/fetch";
import { RequestHeadersPlugin } from "@orpc/server/plugins";
import { router } from "@/lib/orpc/router";

const handler = new RPCHandler(router, {
	plugins: [new RequestHeadersPlugin()],
});

async function handle(request: Request): Promise<Response> {
	const { matched, response } = await handler.handle(request, {
		prefix: "/api/rpc",
		context: {},
	});

	return matched ? response : new Response("Not found", { status: 404 });
}

export {
	handle as GET,
	handle as POST,
	handle as PUT,
	handle as PATCH,
	handle as DELETE,
	handle as HEAD,
	handle as OPTIONS,
};
