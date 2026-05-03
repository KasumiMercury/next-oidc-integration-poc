import { redirect } from "next/navigation";
import { hydraAdmin } from "@/features/auth/op/admin";
import { ConsentView } from "@/features/auth/views/ConsentView";

export default async function ConsentPage({
	searchParams,
}: {
	searchParams: Promise<{ consent_challenge?: string }>;
}) {
	const { consent_challenge } = await searchParams;
	if (!consent_challenge) {
		if (process.env.NODE_ENV !== "production") {
			return (
				<ConsentView
					request={{
						challenge: "preview-only",
						skip: false,
						subject: "preview-user",
						client: { client_id: "front-poc-client" },
						requested_scope: ["openid", "offline_access", "profile", "email"],
						requested_access_token_audience: [],
					}}
					notice={<p className="text-xs text-foreground/70">(preview mode)</p>}
				/>
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
