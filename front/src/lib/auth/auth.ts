import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { genericOAuth } from "better-auth/plugins";
import Database from "better-sqlite3";
import { env } from "@/lib/env";

const db = new Database(env.betterAuthDbPath);
db.pragma("journal_mode = WAL");

export const auth = betterAuth({
	database: db,
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
