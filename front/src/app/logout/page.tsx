import { redirect } from "next/navigation";
import { hydraAdmin } from "@/lib/hydra/admin";

export default async function LogoutPage({
	searchParams,
}: {
	searchParams: Promise<{ logout_challenge?: string }>;
}) {
	const { logout_challenge: challenge } = await searchParams;

	if (!challenge) {
		return (
			<main className="flex flex-1 flex-col items-center justify-center gap-2 p-8 text-center">
				<h1 className="text-xl font-semibold">Missing logout_challenge</h1>
			</main>
		);
	}

	await hydraAdmin.getLogoutRequest(challenge);
	const result = await hydraAdmin.acceptLogoutRequest(challenge);
	redirect(result.redirect_to);
}
