import { drizzle } from "drizzle-orm/libsql";
import { env } from "@/lib/env";
import * as schema from "./schema";

export const db = drizzle({
	connection: { url: `file:${env.betterAuthDbPath}` },
	schema,
});
