"use client";

import { Button } from "@/components/Button";
import { authClient } from "@/lib/auth-client";

export default function Home() {
	const { data: session, isPending } = authClient.useSession();

	if (isPending) {
		return null;
	}

	return (
		<main className="flex flex-1 items-center justify-center px-6 py-12">
			<div className="flex w-full max-w-sm flex-col items-center gap-6 rounded-2xl border border-foreground/10 bg-foreground/2 p-8 shadow-sm">
				<p>Next.js + BetterAuth + OIDC example</p>
				{!session ? (
					<Button
						variant="primary"
						onPress={() =>
							authClient.signIn.oauth2({
								providerId: "first",
								callbackURL: "/",
							})
						}
					>
						Sign in
					</Button>
				) : (
					<>
						<p className="text-center text-sm text-foreground/70">
							Signed in as{" "}
							<span className="font-medium text-foreground">
								{session.user.name}
							</span>
						</p>
						<Button variant="outline" onPress={() => authClient.signOut()}>
							Sign out
						</Button>
					</>
				)}
			</div>
		</main>
	);
}
