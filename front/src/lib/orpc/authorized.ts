import { base } from "@/lib/orpc/context";
import { authMiddleware } from "@/lib/orpc/middlewares/auth";

export const authorized = base.use(authMiddleware);
