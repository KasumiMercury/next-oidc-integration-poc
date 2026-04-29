import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { betterAuth } from "better-auth";
import { db } from "@/lib/db";

// pnpm dlx auth@latest generate --config ./src/lib/auth/auth.ts --output ./src/lib/db/schema.ts --yes
export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "sqlite",
	}),
});
