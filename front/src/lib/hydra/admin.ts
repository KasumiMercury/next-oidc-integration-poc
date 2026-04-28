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
