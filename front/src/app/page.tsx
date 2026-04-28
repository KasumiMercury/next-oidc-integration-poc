import { getSession, isAuthenticated } from "@/lib/session/session";
import { LoginButton, LogoutButton } from "./_components/auth-buttons";

export default async function Home() {
	const session = await getSession();
	const authed = isAuthenticated(session);
	const claims = session.claims;
	const displayName =
		claims?.preferred_username ??
		claims?.name ??
		claims?.email ??
		session.subject;

	return (
		<main className="flex flex-1 flex-col items-center justify-center gap-6 p-8">
			<h1 className="text-3xl font-semibold tracking-tight">
				openid-client × iron-session × Hydra PoC
			</h1>
			{authed ? (
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
