import { hydraAdmin } from "@/features/auth/op/admin";

export type AuthenticationResult = {
	redirectTo: string;
};

// PoC stub: any non-empty username/password is accepted, with the username
// used as the subject identifier. Replace the credential check with a POST to
// the real identity backend (e.g. Spring Security) when wiring up production
// auth; the Hydra accept call below should stay.
export async function authenticate(
	username: string,
	password: string,
	challenge: string,
): Promise<AuthenticationResult | null> {
	if (!username || !password) {
		return null;
	}
	const { redirect_to } = await hydraAdmin.acceptLoginRequest(challenge, {
		subject: username,
	});
	return { redirectTo: redirect_to };
}
