"use client";

import { authClient } from "@/lib/auth-client";

export default function Home() {
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
