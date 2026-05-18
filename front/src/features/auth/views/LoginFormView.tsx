"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { FieldError, Input, Label, TextField } from "react-aria-components";
import * as v from "valibot";
import { Button } from "@/components/Button";

const usernameSchema = v.pipe(
	v.string(),
	v.minLength(1, "ユーザー名を入力してください。"),
);

const passwordSchema = v.pipe(
	v.string(),
	v.minLength(1, "パスワードを入力してください。"),
);

function createValidator<T>(schema: v.BaseSchema<T, T, v.BaseIssue<T>>) {
	return (value: string): string | null => {
		const result = v.safeParse(schema, value);
		return result.success ? null : (result.issues[0].message ?? null);
	};
}

export type LoginFormViewProps = {
	loginChallenge: string;
	action?: (formData: FormData) => void | Promise<void>;
	notice?: ReactNode;
};

export function LoginFormView({
	loginChallenge,
	action,
	notice,
}: LoginFormViewProps) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const isSubmitDisabled = username.length === 0 || password.length === 0;

	return (
		<main className="flex flex-1 flex-col items-center justify-center px-4 py-16">
			{/* アイコン・タイトル（カードの外） */}
			<div className="mb-8 flex flex-col items-center gap-2">
				<h1 className="text-2xl font-bold text-foreground">ログイン</h1>
				<p className="text-sm text-muted-foreground">
					アカウントにサインインしてください
				</p>
			</div>

			{/* フォームカード */}
			<div className="w-full max-w-sm rounded-xl border border-border bg-background p-8 shadow-md">
				{notice}
				<form action={action} className="flex flex-col gap-4">
					<input type="hidden" name="login_challenge" value={loginChallenge} />

					<TextField
						name="username"
						isRequired
						validationBehavior="aria"
						value={username}
						onChange={setUsername}
						validate={createValidator(usernameSchema)}
						className="flex flex-col gap-1.5"
					>
						<Label className="text-sm font-medium text-foreground">
							ユーザー名
						</Label>
						<Input
							className="rounded-lg border border-border bg-muted px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground data-[focus-visible]:border-primary data-[focus-visible]:bg-background data-[focus-visible]:outline-none data-[invalid]:border-destructive"
							placeholder="username"
						/>
						<FieldError className="text-xs text-destructive" />
					</TextField>

					<TextField
						name="password"
						type="password"
						isRequired
						validationBehavior="aria"
						value={password}
						onChange={setPassword}
						validate={createValidator(passwordSchema)}
						className="flex flex-col gap-1.5"
					>
						<Label className="text-sm font-medium text-foreground">
							パスワード
						</Label>
						<Input
							className="rounded-lg border border-border bg-muted px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground data-[focus-visible]:border-primary data-[focus-visible]:bg-background data-[focus-visible]:outline-none data-[invalid]:border-destructive"
							placeholder="••••••••"
						/>
						<FieldError className="text-xs text-destructive" />
					</TextField>

					<Button variant="primary" type="submit" isDisabled={isSubmitDisabled}>
						サインイン
					</Button>
				</form>
			</div>
		</main>
	);
}
