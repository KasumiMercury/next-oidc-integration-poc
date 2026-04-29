function withDefault(name: string, fallback: string): string {
	return process.env[name] ?? fallback;
}

export const env = {
	hydraPublicUrl: withDefault("HYDRA_PUBLIC_URL", "http://localhost:4444"),
	hydraAdminUrl: withDefault("HYDRA_ADMIN_URL", "http://localhost:4445"),
	oidcIssuerUrl: withDefault("OIDC_ISSUER_URL", "http://localhost:4444"),
	oidcClientId: withDefault("OIDC_CLIENT_ID", "front-poc-client"),
	oidcClientSecret: withDefault(
		"OIDC_CLIENT_SECRET",
		"front-poc-secret-please-replace",
	),
	oidcRedirectUri: withDefault(
		"OIDC_REDIRECT_URI",
		"http://localhost:3000/api/auth/callback/hydra",
	),
	oidcScope: withDefault("OIDC_SCOPE", "openid offline_access profile email"),
	betterAuthUrl: withDefault("BETTER_AUTH_URL", "http://localhost:3000"),
	betterAuthSecret: withDefault(
		"BETTER_AUTH_SECRET",
		"dev-only-better-auth-secret-please-replace",
	),
	betterAuthDbPath: withDefault(
		"BETTER_AUTH_DB_PATH",
		"./data/better-auth/db.sqlite",
	),
} as const;
