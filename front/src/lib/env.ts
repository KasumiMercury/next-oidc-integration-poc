function withDefault(name: string, fallback: string): string {
	return process.env[name] ?? fallback;
}

export const env = {
	appUrl: withDefault("APP_URL", "http://localhost:3000"),
	hydraPublicUrl: withDefault("HYDRA_PUBLIC_URL", "http://localhost:4444"),
	hydraAdminUrl: withDefault("HYDRA_ADMIN_URL", "http://localhost:4445"),
	hydraServerUrl: withDefault("HYDRA_SERVER_URL", "http://localhost:4444"),
	oidcIssuerUrl: withDefault("OIDC_ISSUER_URL", "http://localhost:4444"),
	oidcClientId: withDefault("OIDC_CLIENT_ID", "front-poc-client"),
	oidcClientSecret: withDefault(
		"OIDC_CLIENT_SECRET",
		"front-poc-secret-please-replace",
	),
	oidcRedirectUri: withDefault(
		"OIDC_REDIRECT_URI",
		"http://localhost:3000/api/auth/callback",
	),
	oidcScope: withDefault("OIDC_SCOPE", "openid offline_access profile email"),
	sessionSecret: withDefault(
		"SESSION_SECRET",
		"dev-only-iron-session-secret-please-replace-32+chars",
	),
} as const;
