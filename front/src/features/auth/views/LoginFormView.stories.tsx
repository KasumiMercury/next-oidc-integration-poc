import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { LoginFormView } from "./LoginFormView";

const meta = {
	title: "Auth/LoginFormView",
	component: LoginFormView,
	parameters: {
		layout: "fullscreen",
	},
	args: {
		action: fn(),
	},
} satisfies Meta<typeof LoginFormView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		loginChallenge: "demo-challenge",
	},
};

export const PreviewMode: Story = {
	args: {
		loginChallenge: "preview-only",
		notice: <p className="text-xs text-foreground/70">(preview mode)</p>,
	},
};
