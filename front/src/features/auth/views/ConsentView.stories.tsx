import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { ConsentRequest } from "@/features/auth/op/admin";
import { ConsentView } from "./ConsentView";

const meta = {
	title: "Auth/ConsentView",
	component: ConsentView,
	parameters: {
		layout: "fullscreen",
	},
} satisfies Meta<typeof ConsentView>;

export default meta;
type Story = StoryObj<typeof meta>;

const baseRequest: ConsentRequest = {
	challenge: "demo-challenge",
	skip: false,
	subject: "alice@example.com",
	client: {
		client_id: "front-poc-client",
		client_name: "Demo App",
	},
	requested_scope: ["openid", "offline_access", "profile", "email"],
	requested_access_token_audience: [],
};

export const Default: Story = {
	args: {
		request: baseRequest,
	},
};

export const MinimalScopes: Story = {
	args: {
		request: { ...baseRequest, requested_scope: ["openid"] },
	},
};

export const WithAudience: Story = {
	args: {
		request: {
			...baseRequest,
			requested_access_token_audience: ["https://api.example.com"],
		},
	},
};

export const PreviewMode: Story = {
	args: {
		request: {
			challenge: "preview-only",
			skip: false,
			subject: "preview-user",
			client: { client_id: "front-poc-client" },
			requested_scope: ["openid", "offline_access", "profile", "email"],
			requested_access_token_audience: [],
		},
		notice: <p className="text-xs text-foreground/70">(preview mode)</p>,
	},
};
