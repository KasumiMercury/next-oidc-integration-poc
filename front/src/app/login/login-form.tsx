"use client";

import { useActionState } from "react";
import {
	Button,
	FieldError,
	Form,
	Input,
	Label,
	TextField,
} from "react-aria-components";

export type LoginFormState = { error?: string } | undefined;

const labelStyle = "text-sm font-medium text-zinc-700 dark:text-zinc-200";
const inputStyle =
	"rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-black outline-none transition data-[focused]:border-zinc-500 data-[focused]:ring-2 data-[focused]:ring-zinc-500/30 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white";
const errorStyle = "text-sm text-red-600 dark:text-red-400";
const buttonStyle =
	"rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700 data-[focused]:outline-none data-[focused]:ring-2 data-[focused]:ring-zinc-500 data-[focused]:ring-offset-2 data-[disabled]:opacity-60 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300";

export function LoginForm({
	action,
	clientName,
}: {
	action: (
		prevState: LoginFormState,
		formData: FormData,
	) => Promise<LoginFormState>;
	clientName: string;
}) {
	const [state, formAction, isPending] = useActionState(action, undefined);

	return (
		<main className="flex flex-1 flex-col items-center justify-center p-8">
			<div className="w-full max-w-sm rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
				<h1 className="mb-1 text-xl font-semibold">Sign in to {clientName}</h1>
				<p className="mb-4 text-sm text-zinc-500 dark:text-zinc-400">
					PoC: any non-empty username / password is accepted.
				</p>
				<Form action={formAction} className="flex flex-col gap-4">
					<TextField name="username" isRequired className="flex flex-col gap-1">
						<Label className={labelStyle}>Username</Label>
						<Input className={inputStyle} autoComplete="username" />
						<FieldError className={errorStyle} />
					</TextField>
					<TextField
						name="password"
						type="password"
						isRequired
						className="flex flex-col gap-1"
					>
						<Label className={labelStyle}>Password</Label>
						<Input className={inputStyle} autoComplete="current-password" />
						<FieldError className={errorStyle} />
					</TextField>
					{state?.error ? <p className={errorStyle}>{state.error}</p> : null}
					<Button type="submit" isPending={isPending} className={buttonStyle}>
						{isPending ? "Signing in..." : "Sign in"}
					</Button>
				</Form>
			</div>
		</main>
	);
}
