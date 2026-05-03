import { redirect } from "next/navigation";
import { hydraAdmin } from "@/features/auth/op/admin";

export default async function ConsentPage({
	searchParams,
}: {
	searchParams: Promise<{ consent_challenge?: string }>;
}) {
	const { consent_challenge } = await searchParams;
	if (!consent_challenge) {
		if (process.env.NODE_ENV !== "production") {
			const dummyRequest = {
				challenge: "preview-only",
				skip: false,
				subject: "preview-user",
				client: { client_id: "front-poc-client" },
				requested_scope: ["openid", "offline_access", "profile", "email"],
				requested_access_token_audience: [],
			};
			return (
				<main className="flex flex-1 flex-col items-center gap-4 px-6 py-12">
					<h2 className="text-lg font-medium">Consent (preview)</h2>
					<p className="text-sm text-foreground/70">
						Hydra fetch skipped. This is what <code>getConsentRequest()</code>{" "}
						would return:
					</p>
					<pre className="w-full max-w-xl overflow-auto rounded-md border border-foreground/10 bg-foreground/5 p-4 text-xs">
						{JSON.stringify(dummyRequest, null, 2)}
					</pre>
				</main>
			);
		}
		return <p>Missing consent_challenge.</p>;
	}

	const consentRequest = await hydraAdmin.getConsentRequest(consent_challenge);
	const { redirect_to } = await hydraAdmin.acceptConsentRequest(
		consent_challenge,
		{
			grant_scope: consentRequest.requested_scope ?? [],
			grant_access_token_audience:
				consentRequest.requested_access_token_audience ?? [],
		},
	);

	redirect(redirect_to);
}
