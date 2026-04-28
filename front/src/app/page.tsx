import { headers } from "next/headers";
import { auth } from "@/lib/auth/auth";
import { LoginButton, LogoutButton } from "./_components/auth-buttons";

export default async function Home() {
	const session = await auth.api.getSession({ headers: await headers() });
	const user = session?.user;
	const displayName = user?.name ?? user?.email ?? user?.id;

	return (
		<main className="flex flex-1 flex-col items-center justify-center gap-6 p-8">
			<h1 className="text-3xl font-semibold tracking-tight">
				BetterAuth × Hydra PoC
			</h1>
			{displayName ? (
				<div className="flex flex-col items-center gap-3">
					<p className="text-zinc-600 dark:text-zinc-300">
						Signed in as{" "}
						<span className="font-medium text-black dark:text-white">
							{displayName}
						</span>
					</p>
					<LogoutButton />
				</div>
			) : (
				<div className="flex flex-col items-center gap-3">
					<p className="text-sm text-zinc-500">
						Authenticate via the first-party OIDC provider (Hydra).
					</p>
					<LoginButton />
				</div>
			)}
		</main>
	);
}
