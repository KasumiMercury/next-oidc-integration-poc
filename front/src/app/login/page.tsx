import { LoginForm } from "./LoginForm";

export default async function LoginPage({
	searchParams,
}: {
	searchParams: Promise<{ login_challenge?: string }>;
}) {
	const { login_challenge } = await searchParams;
	if (!login_challenge) {
		return <p>Missing login_challenge.</p>;
	}
	return <LoginForm loginChallenge={login_challenge} />;
}
