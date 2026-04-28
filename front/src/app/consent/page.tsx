import { redirect } from "next/navigation";
import { hydraAdmin } from "@/lib/hydra/admin";

// First-party flow: client is registered with `skip_consent: true`, so Hydra
// always sets `skip: true` on the consent request. We unconditionally accept
// the requested scopes here without showing UI.
export default async function ConsentPage({
	searchParams,
}: {
	searchParams: Promise<{ consent_challenge?: string }>;
}) {
	const { consent_challenge: challenge } = await searchParams;

	if (!challenge) {
		return (
			<main className="flex flex-1 flex-col items-center justify-center gap-2 p-8 text-center">
				<h1 className="text-xl font-semibold">Missing consent_challenge</h1>
				<p className="text-sm text-zinc-500">
					This page expects to be opened by the OIDC provider as part of an
					authorization request.
				</p>
			</main>
		);
	}

	const consentRequest = await hydraAdmin.getConsentRequest(challenge);

	// PoC: synthesize basic OIDC claims from the subject. A real identity
	// backend would carry these forward via login `context` or look them up
	// here from the user store.
	const claims = {
		email: `${consentRequest.subject}@example.local`,
		email_verified: true,
		name: consentRequest.subject,
		preferred_username: consentRequest.subject,
	};

	const result = await hydraAdmin.acceptConsentRequest(challenge, {
		grant_scope: consentRequest.requested_scope ?? [],
		grant_access_token_audience:
			consentRequest.requested_access_token_audience ?? [],
		remember: true,
		remember_for: 3600,
		session: {
			id_token: claims,
			access_token: claims,
		},
	});
	redirect(result.redirect_to);
}
