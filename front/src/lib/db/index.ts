import { drizzle } from "drizzle-orm/libsql";
import { env } from "@/lib/env";

export const db = drizzle({
	connection: { url: `file:${env.betterAuthDbPath}` },
});
