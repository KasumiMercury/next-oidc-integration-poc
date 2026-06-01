"use client";

import { useRef, useState } from "react";
import {
	Button as AriaButton,
	type ButtonProps as AriaButtonProps,
	type PressEvent,
} from "react-aria-components";

type ButtonVariant = "primary" | "outline";

export interface ButtonProps extends Omit<AriaButtonProps, "className"> {
	variant?: ButtonVariant;
}

export function Button({
	variant = "primary",
	onPress,
	...props
}: ButtonProps) {
	const [animating, setAnimating] = useState(false);
	const rafRef = useRef<number>(0);

	const handlePress = (e: PressEvent) => {
		cancelAnimationFrame(rafRef.current);
		setAnimating(false);
		rafRef.current = requestAnimationFrame(() => setAnimating(true));
		onPress?.(e);
	};

	const pressClass = animating ? "animate-lantern-press" : "";

	if (variant === "outline") {
		return (
			<AriaButton
				{...props}
				onPress={handlePress}
				onAnimationEnd={() => setAnimating(false)}
				className={`inline-flex cursor-pointer items-center justify-center rounded-xl border border-border bg-transparent px-5 py-2.5 text-sm font-medium text-primary transition-colors data-hovered:bg-primary/10 data-focus-visible:outline-2 data-focus-visible:outline-offset-2 data-focus-visible:outline-primary data-disabled:opacity-40 ${pressClass}`}
			/>
		);
	}

	return (
		<AriaButton
			{...props}
			onPress={handlePress}
			onAnimationEnd={() => setAnimating(false)}
			className={`inline-flex cursor-pointer items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[0_0_16px_var(--primary-glow)] transition-colors data-hovered:brightness-110 data-hovered:shadow-[0_0_24px_var(--primary-glow)] data-focus-visible:outline-2 data-focus-visible:outline-offset-2 data-focus-visible:outline-primary data-disabled:opacity-40 data-disabled:shadow-none ${pressClass}`}
		/>
	);
}
