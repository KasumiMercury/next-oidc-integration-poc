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
		<main className="flex flex-1 items-center justify-center px-4 py-16">
			<div className="w-full max-w-sm rounded-xl border border-border bg-background p-8 shadow-md">
				{notice}

				{state === "signed-out" ? (
					<div className="flex flex-col items-center gap-5">
						<div className="flex flex-col items-center gap-1 text-center">
							<p className="font-semibold text-foreground">ようこそ</p>
							<p className="text-sm text-muted-foreground">
								続けるにはサインインしてください
							</p>
						</div>
						<Button variant="primary" onPress={onSignIn}>
							サインイン
						</Button>
					</div>
				) : (
					<div className="flex flex-col items-center gap-5">
						<div className="flex flex-col items-center gap-1 text-center">
							<p className="text-xs text-muted-foreground">サインイン中</p>
							<p className="text-lg font-semibold text-foreground">
								{userName}
							</p>
						</div>
						<div className="h-px w-full bg-border" />
						<Button
							variant="outline"
							isDisabled={signOutDisabled}
							onPress={onSignOut}
						>
							サインアウト
						</Button>
					</div>
				)}
			</div>
		</main>
	);
}
