"use client";

import { Button } from "react-aria-components";
import { authClient } from "@/lib/auth/auth-client";

const primaryButton =
	"rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700 data-[focused]:outline-none data-[focused]:ring-2 data-[focused]:ring-zinc-500 data-[focused]:ring-offset-2 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300";

export function LoginButton() {
	return (
		<Button
			className={primaryButton}
			onPress={async () => {
				await authClient.signIn.oauth2({
					providerId: "hydra",
					callbackURL: "/",
				});
			}}
		>
			Login with Hydra
		</Button>
	);
}

export function LogoutButton() {
	return (
		<Button
			className={primaryButton}
			onPress={async () => {
				await authClient.signOut();
				window.location.href = "/";
			}}
		>
			Logout
		</Button>
	);
}
