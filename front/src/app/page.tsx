"use client";

import { useSearchParams } from "next/navigation";
import { Button } from "@/components/Button";
import { authClient } from "@/lib/auth-client";

export default function Home() {
	const searchParams = useSearchParams();
	const { data: session, isPending } = authClient.useSession();

	const previewSignedIn =
		process.env.NODE_ENV !== "production" &&
		searchParams.get("preview") === "signedin";
	const effectiveSession = previewSignedIn
		? { user: { name: "preview-user" } }
		: session;

	if (!previewSignedIn && isPending) {
		return null;
	}

	return (
		<main className="flex flex-1 items-center justify-center px-6 py-12">
			<div className="flex w-full max-w-sm flex-col items-center gap-6 rounded-2xl border border-foreground/10 bg-foreground/2 p-8 shadow-sm">
				{previewSignedIn && (
					<p className="text-xs text-foreground/50">(preview mode)</p>
				)}
				<p>Next.js + BetterAuth + OIDC example</p>
				{!effectiveSession ? (
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
								{effectiveSession.user.name}
							</span>
						</p>
						<Button
							variant="outline"
							isDisabled={previewSignedIn}
							onPress={() => authClient.signOut()}
						>
							Sign out
						</Button>
					</>
				)}
			</div>
		</main>
	);
}
