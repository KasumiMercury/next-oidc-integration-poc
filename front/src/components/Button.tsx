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
				className="inline-flex cursor-pointer items-center justify-center rounded-md border border-foreground/20 bg-transparent px-5 py-2.5 text-sm font-medium text-foreground transition-colors data-hovered:bg-foreground/5 data-pressed:bg-foreground/10 data-focus-visible:outline-2 data-focus-visible:outline-offset-2 data-focus-visible:outline-foreground data-disabled:opacity-50"
			/>
		);
	}

	return (
		<AriaButton
			{...props}
			className="inline-flex cursor-pointer items-center justify-center rounded-md bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors data-hovered:opacity-90 data-pressed:opacity-80 data-focus-visible:outline-2 data-focus-visible:outline-offset-2 data-focus-visible:outline-foreground data-disabled:opacity-50"
		/>
	);
}
