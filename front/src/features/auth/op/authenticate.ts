export type AuthenticatedUser = {
	subject: string;
	username: string;
};

// PoC stub: any non-empty username/password is accepted, with the username
// used as the subject identifier. Replace the body with a POST to the real
// identity backend (e.g. Spring Security) when wiring up production auth.
export async function authenticate(
	username: string,
	password: string,
): Promise<AuthenticatedUser | null> {
	if (!username || !password) {
		return null;
	}
	return {
		subject: username,
		username,
	};
}
