import type { Config } from "drizzle-kit";
import { env } from "@/lib/env";

export default {
	schema: "./src/features/auth/rp/schema.ts",
	out: "./src/lib/db/migrations",
	dialect: "sqlite",
	dbCredentials: {
		url: `file:${env.betterAuthDbPath}`,
	},
} satisfies Config;
