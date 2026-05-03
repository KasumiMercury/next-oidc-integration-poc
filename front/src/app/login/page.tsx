import { LoginFormView } from "@/features/auth/views/LoginFormView";
import { login } from "./actions";

export default async function LoginPage({
	searchParams,
}: {
	searchParams: Promise<{ login_challenge?: string }>;
}) {
	const { login_challenge } = await searchParams;
	if (!login_challenge) {
		if (process.env.NODE_ENV !== "production") {
			return (
				<LoginFormView
					loginChallenge="preview-only"
					action={login}
					notice={<p className="text-xs text-foreground/70">(preview mode)</p>}
				/>
			);
		}
		return <p>Missing login_challenge.</p>;
	}
	return <LoginFormView loginChallenge={login_challenge} action={login} />;
}
