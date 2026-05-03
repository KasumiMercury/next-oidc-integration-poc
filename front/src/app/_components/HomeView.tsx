"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/Button";

export type HomeViewProps = {
	state: "loading" | "signed-out" | "signed-in";
	userName?: string;
	onSignIn?: () => void;
	onSignOut?: () => void;
	signOutDisabled?: boolean;
	notice?: ReactNode;
};

export function HomeView({
	state,
	userName,
	onSignIn,
	onSignOut,
	signOutDisabled,
	notice,
}: HomeViewProps) {
	if (state === "loading") {
		return null;
	}

	return (
		<main className="flex flex-1 items-center justify-center px-6 py-12">
			<div className="flex w-full max-w-sm flex-col items-center gap-6 rounded-2xl border border-foreground/10 bg-foreground/2 p-8 shadow-sm">
				{notice}
				<p>Next.js + BetterAuth + OIDC example</p>
				{state === "signed-out" ? (
					<Button variant="primary" onPress={onSignIn}>
						Sign in
					</Button>
				) : (
					<>
						<p className="text-center text-sm text-foreground/70">
							Signed in as{" "}
							<span className="font-medium text-foreground">{userName}</span>
						</p>
						<Button
							variant="outline"
							isDisabled={signOutDisabled}
							onPress={onSignOut}
						>
							Sign out
						</Button>
					</>
				)}
			</div>
		</main>
	);
}
