import { redirect } from "next/navigation";
import { hydraAdmin } from "@/features/auth/op/admin";

export default async function ConsentPage({
	searchParams,
}: {
	searchParams: Promise<{ consent_challenge?: string }>;
}) {
	const { consent_challenge } = await searchParams;
	if (!consent_challenge) {
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
