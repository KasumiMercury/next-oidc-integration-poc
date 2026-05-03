import { os } from "@orpc/server";
import type { RequestHeadersPluginContext } from "@orpc/server/plugins";

export interface ORPCContext extends RequestHeadersPluginContext {}

export const base = os.$context<ORPCContext>();
