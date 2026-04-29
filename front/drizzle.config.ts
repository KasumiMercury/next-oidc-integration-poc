import type { Config } from "drizzle-kit";

const dbPath =
	process.env.BETTER_AUTH_DB_PATH ?? "./data/better-auth/db.sqlite";

export default {
	schema: "./src/lib/db/schema.ts",
	out: "./src/lib/db/migrations",
	dialect: "sqlite",
	dbCredentials: {
		url: `file:${dbPath}`,
	},
} satisfies Config;
