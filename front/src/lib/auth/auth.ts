import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { genericOAuth } from "better-auth/plugins";
import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";
import { env } from "@/lib/env";

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
					providerId: "hydra",
					clientId: env.oidcClientId,
					clientSecret: env.oidcClientSecret,
					authorizationUrl: `${env.oidcIssuerUrl}/oauth2/auth`,
					tokenUrl: `${env.hydraServerUrl}/oauth2/token`,
					userInfoUrl: `${env.hydraServerUrl}/userinfo`,
					issuer: env.oidcIssuerUrl,
					scopes: env.oidcScope.split(" "),
					pkce: true,
				},
			],
		}),
		nextCookies(),
	],
});
