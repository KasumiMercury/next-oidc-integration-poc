import { toNextJsHandler } from "better-auth/next-js";
import { auth } from "@/features/auth/rp/auth";

export const { GET, POST } = toNextJsHandler(auth);
