import "server-only";
import * as client from "openid-client";
import { env } from "@/lib/env";

const serverMetadata: client.ServerMetadata = {
	issuer: env.oidcIssuerUrl,
	authorization_endpoint: `${env.oidcIssuerUrl}/oauth2/auth`,
	end_session_endpoint: `${env.oidcIssuerUrl}/oauth2/sessions/logout`,
	token_endpoint: `${env.hydraServerUrl}/oauth2/token`,
	userinfo_endpoint: `${env.hydraServerUrl}/userinfo`,
	jwks_uri: `${env.hydraServerUrl}/.well-known/jwks.json`,
	code_challenge_methods_supported: ["S256"],
	grant_types_supported: ["authorization_code", "refresh_token"],
	response_types_supported: ["code"],
	token_endpoint_auth_methods_supported: ["client_secret_post"],
};

export const oidcConfig = new client.Configuration(
	serverMetadata,
	env.oidcClientId,
	env.oidcClientSecret,
);

if (
	env.oidcIssuerUrl.startsWith("http://") ||
	env.hydraServerUrl.startsWith("http://")
) {
	client.allowInsecureRequests(oidcConfig);
}
