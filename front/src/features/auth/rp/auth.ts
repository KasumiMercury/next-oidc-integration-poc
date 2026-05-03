import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { genericOAuth } from "better-auth/plugins";
import * as schema from "@/features/auth/rp/schema";
import { db } from "@/lib/db";
import { env } from "@/lib/env";

// pnpm dlx auth@latest generate --config ./src/features/auth/rp/auth.ts --output ./src/features/auth/rp/schema.ts --yes
export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "sqlite",
		schema,
	}),
	baseURL: env.betterAuthUrl,
	secret: env.betterAuthSecret,
	plugins: [
		genericOAuth({
			config: [
				{
					providerId: "first",
					clientId: env.oidcClientId,
					clientSecret: env.oidcClientSecret,
					authorizationUrl: `${env.oidcIssuerUrl}/oauth2/auth`,
					tokenUrl: `${env.hydraPublicUrl}/oauth2/token`,
					userInfoUrl: `${env.hydraPublicUrl}/userinfo`,
					issuer: env.oidcIssuerUrl,
					scopes: env.oidcScope.split(" "),
					pkce: true,
				},
			],
		}),
		nextCookies(),
	],
});
