import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { HomeView } from "./HomeView";

const meta = {
	title: "App/HomeView",
	component: HomeView,
	parameters: {
		layout: "fullscreen",
	},
	args: {
		onSignIn: fn(),
		onSignOut: fn(),
	},
} satisfies Meta<typeof HomeView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SignedOut: Story = {
	args: {
		state: "signed-out",
	},
};

export const SignedIn: Story = {
	args: {
		state: "signed-in",
		userName: "alice",
	},
};

export const SignedInWithLongName: Story = {
	args: {
		state: "signed-in",
		userName: "very-long-display-name@example.com",
	},
};

export const PreviewSignedIn: Story = {
	args: {
		state: "signed-in",
		userName: "preview-user",
		signOutDisabled: true,
		notice: <p className="text-xs text-foreground/50">(preview mode)</p>,
	},
};

export const Loading: Story = {
	args: {
		state: "loading",
	},
};
