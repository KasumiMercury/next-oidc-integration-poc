"use client";

import { useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { HomeView } from "./_components/HomeView";

export default function Home() {
	const searchParams = useSearchParams();
	const { data: session, isPending } = authClient.useSession();

	const previewSignedIn =
		process.env.NODE_ENV !== "production" &&
		searchParams.get("preview") === "signedin";

	if (previewSignedIn) {
		return (
			<HomeView
				state="signed-in"
				userName="preview-user"
				signOutDisabled
				notice={<p className="text-xs text-foreground/50">(preview mode)</p>}
			/>
		);
	}

	if (isPending) {
		return <HomeView state="loading" />;
	}

	if (!session) {
		return (
			<HomeView
				state="signed-out"
				onSignIn={() =>
					authClient.signIn.oauth2({
						providerId: "first",
						callbackURL: "/",
					})
				}
			/>
		);
	}

	return (
		<HomeView
			state="signed-in"
			userName={session.user.name}
			onSignOut={() => authClient.signOut()}
		/>
	);
}
