"use client";

import { authClient } from "@/lib/auth-client";

export default function Home() {
	const { data: session, isPending } = authClient.useSession();

	if (isPending) {
		return null;
	}

	if (!session) {
		return (
			<button
				type="button"
				onClick={() =>
					authClient.signIn.oauth2({ providerId: "first", callbackURL: "/" })
				}
			>
				Sign in
			</button>
		);
	}

	return (
		<div>
			<p>Signed in as {session.user.name}</p>
			<button type="button" onClick={() => authClient.signOut()}>
				Sign out
			</button>
		</div>
	);
}
