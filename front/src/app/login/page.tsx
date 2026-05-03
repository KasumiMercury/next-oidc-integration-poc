import { LoginForm } from "./LoginForm";

export default async function LoginPage({
	searchParams,
}: {
	searchParams: Promise<{ login_challenge?: string }>;
}) {
	const { login_challenge } = await searchParams;
	if (!login_challenge) {
		if (process.env.NODE_ENV !== "production") {
			return (
				<>
					<p className="text-xs text-foreground">(preview mode)</p>
					<LoginForm loginChallenge="preview-only" />
				</>
			);
		}
		return <p>Missing login_challenge.</p>;
	}
	return <LoginForm loginChallenge={login_challenge} />;
}
