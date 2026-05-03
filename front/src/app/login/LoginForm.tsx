"use client";

import { Button } from "@/components/Button";
import { login } from "./actions";

export function LoginForm({ loginChallenge }: { loginChallenge: string }) {
	return (
		<main className="flex flex-1 items-center justify-center px-6 py-12">
			<div className="flex w-full max-w-sm flex-col items-center gap-6 rounded-2xl border border-foreground/10 bg-foreground/2 p-8 shadow-sm">
				<form action={login}>
					<input type="hidden" name="login_challenge" value={loginChallenge} />
					<Button variant="primary" type="submit">
						Continue as test
					</Button>
				</form>
			</div>
		</main>
	);
}
