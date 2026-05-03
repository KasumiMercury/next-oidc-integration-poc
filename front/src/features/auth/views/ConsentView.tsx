import type { ReactNode } from "react";
import type { ConsentRequest } from "@/features/auth/op/admin";

export type ConsentViewProps = {
	request: ConsentRequest;
	notice?: ReactNode;
};

export function ConsentView({ request, notice }: ConsentViewProps) {
	const clientLabel = request.client.client_name ?? request.client.client_id;
	return (
		<main className="flex flex-1 flex-col items-center gap-4 px-6 py-12">
			{notice}
			<h2 className="text-lg font-medium">Consent</h2>
			<p className="text-sm text-foreground/70">
				Consent request from <code>{clientLabel}</code> for subject{" "}
				<code>{request.subject || "(unknown)"}</code>
			</p>
			<pre className="w-full max-w-xl overflow-auto rounded-md border border-foreground/10 bg-foreground/5 p-4 text-xs">
				{JSON.stringify(request, null, 2)}
			</pre>
		</main>
	);
}
