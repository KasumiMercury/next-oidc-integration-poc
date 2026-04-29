import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { genericOAuth } from "better-auth/plugins";
import { db } from "@/lib/db";
import { env } from "@/lib/env";

// pnpm dlx auth@latest generate --config ./src/lib/auth/auth.ts --output ./src/lib/db/schema.ts --yes
export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "sqlite",
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
