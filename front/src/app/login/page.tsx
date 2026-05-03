import { login } from "./actions";

export default async function LoginPage({
	searchParams,
}: {
	searchParams: Promise<{ login_challenge?: string }>;
}) {
	const { login_challenge } = await searchParams;
	if (!login_challenge) {
		return <p>Missing login_challenge.</p>;
	}
	return (
		<form action={login}>
			<input type="hidden" name="login_challenge" value={login_challenge} />
			<button type="submit">Continue as test</button>
		</form>
	);
}
