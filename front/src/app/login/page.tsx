import { redirect } from "next/navigation";
import { authenticate } from "@/lib/auth/authenticate";
import { hydraAdmin } from "@/lib/hydra/admin";
import { LoginForm, type LoginFormState } from "./login-form";

export default async function LoginPage({
	searchParams,
}: {
	searchParams: Promise<{ login_challenge?: string }>;
}) {
	const { login_challenge: challenge } = await searchParams;

	if (!challenge) {
		return (
			<main className="flex flex-1 flex-col items-center justify-center gap-2 p-8 text-center">
				<h1 className="text-xl font-semibold">Missing login_challenge</h1>
				<p className="text-sm text-zinc-500">
					This page expects to be opened by the OIDC provider as part of an
					authorization request.
				</p>
			</main>
		);
	}

	const challengeId: string = challenge;
	const loginRequest = await hydraAdmin.getLoginRequest(challengeId);

	if (loginRequest.skip) {
		const result = await hydraAdmin.acceptLoginRequest(challengeId, {
			subject: loginRequest.subject,
		});
		redirect(result.redirect_to);
	}

	async function login(
		_prev: LoginFormState,
		formData: FormData,
	): Promise<LoginFormState> {
		"use server";
		const username = String(formData.get("username") ?? "");
		const password = String(formData.get("password") ?? "");
		const user = await authenticate(username, password);
		if (!user) {
			return { error: "Invalid username or password." };
		}
		const result = await hydraAdmin.acceptLoginRequest(challengeId, {
			subject: user.subject,
			remember: true,
			remember_for: 3600,
		});
		redirect(result.redirect_to);
	}

	const clientName =
		loginRequest.client.client_name ?? loginRequest.client.client_id;

	return <LoginForm action={login} clientName={clientName} />;
}
