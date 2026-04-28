import { env } from "@/lib/env";

export class HydraAdminError extends Error {
	constructor(
		public readonly status: number,
		public readonly path: string,
		public readonly responseBody: string,
	) {
		super(`Hydra admin ${status} ${path}: ${responseBody}`);
		this.name = "HydraAdminError";
	}
}

export async function hydraAdminFetch<T = unknown>(
	path: string,
	init?: RequestInit,
): Promise<T> {
	const res = await fetch(`${env.hydraAdminUrl}${path}`, {
		...init,
		headers: {
			"content-type": "application/json",
			...(init?.headers ?? {}),
		},
	});
	if (!res.ok) {
		throw new HydraAdminError(res.status, path, await res.text());
	}
	if (res.status === 204) {
		return undefined as T;
	}
	return (await res.json()) as T;
}

export type LoginRequest = {
	challenge: string;
	subject: string;
	skip: boolean;
	client: {
		client_id: string;
		client_name?: string;
	};
	request_url: string;
	requested_scope?: string[];
	requested_access_token_audience?: string[];
};

export type AcceptLoginBody = {
	subject: string;
	remember?: boolean;
	remember_for?: number;
	acr?: string;
	context?: Record<string, unknown>;
};

export type RedirectResponse = {
	redirect_to: string;
};

export type ConsentRequest = {
	challenge: string;
	skip: boolean;
	subject: string;
	client: {
		client_id: string;
		client_name?: string;
	};
	requested_scope?: string[];
	requested_access_token_audience?: string[];
};

export type AcceptConsentBody = {
	grant_scope: string[];
	grant_access_token_audience?: string[];
	remember?: boolean;
	remember_for?: number;
	session?: {
		access_token?: Record<string, unknown>;
		id_token?: Record<string, unknown>;
	};
};

export const hydraAdmin = {
	getLoginRequest(challenge: string) {
		const qs = new URLSearchParams({ login_challenge: challenge });
		return hydraAdminFetch<LoginRequest>(
			`/admin/oauth2/auth/requests/login?${qs}`,
		);
	},

	acceptLoginRequest(challenge: string, body: AcceptLoginBody) {
		const qs = new URLSearchParams({ login_challenge: challenge });
		return hydraAdminFetch<RedirectResponse>(
			`/admin/oauth2/auth/requests/login/accept?${qs}`,
			{ method: "PUT", body: JSON.stringify(body) },
		);
	},

	getConsentRequest(challenge: string) {
		const qs = new URLSearchParams({ consent_challenge: challenge });
		return hydraAdminFetch<ConsentRequest>(
			`/admin/oauth2/auth/requests/consent?${qs}`,
		);
	},

	acceptConsentRequest(challenge: string, body: AcceptConsentBody) {
		const qs = new URLSearchParams({ consent_challenge: challenge });
		return hydraAdminFetch<RedirectResponse>(
			`/admin/oauth2/auth/requests/consent/accept?${qs}`,
			{ method: "PUT", body: JSON.stringify(body) },
		);
	},
};
