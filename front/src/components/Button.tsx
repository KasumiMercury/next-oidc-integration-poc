"use client";

import {
	Button as AriaButton,
	type ButtonProps as AriaButtonProps,
} from "react-aria-components";

type ButtonVariant = "primary" | "outline";

export interface ButtonProps extends Omit<AriaButtonProps, "className"> {
	variant?: ButtonVariant;
}

export function Button({ variant = "primary", ...props }: ButtonProps) {
	if (variant === "outline") {
		return (
			<AriaButton
				{...props}
				className="inline-flex cursor-pointer items-center justify-center rounded-xl border border-border bg-transparent px-5 py-2.5 text-sm font-medium text-primary transition-colors data-hovered:bg-primary/10 data-pressed:bg-primary/20 data-focus-visible:outline-2 data-focus-visible:outline-offset-2 data-focus-visible:outline-primary data-disabled:opacity-40"
			/>
		);
	}

	return (
		<AriaButton
			{...props}
			className="inline-flex cursor-pointer items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[0_0_16px_var(--primary-glow)] transition-all data-hovered:brightness-110 data-hovered:shadow-[0_0_24px_var(--primary-glow)] data-pressed:brightness-90 data-pressed:scale-95 data-focus-visible:outline-2 data-focus-visible:outline-offset-2 data-focus-visible:outline-primary data-disabled:opacity-40 data-disabled:shadow-none"
		/>
	);
}
