"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/Button";

export type LoginFormViewProps = {
	loginChallenge: string;
	action?: (formData: FormData) => void | Promise<void>;
	notice?: ReactNode;
};

export function LoginFormView({
	loginChallenge,
	action,
	notice,
}: LoginFormViewProps) {
	return (
		<main className="flex flex-1 items-center justify-center px-6 py-12">
			<div className="flex w-full max-w-sm flex-col items-center gap-6 rounded-2xl border border-foreground/10 bg-foreground/2 p-8 shadow-sm">
				{notice}
				<form action={action} className="flex flex-col items-center gap-4">
					<input type="hidden" name="login_challenge" value={loginChallenge} />
					<Button variant="primary" type="submit">
						Continue as test
					</Button>
				</form>
			</div>
		</main>
	);
}
