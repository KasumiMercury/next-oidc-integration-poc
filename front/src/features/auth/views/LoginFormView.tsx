"use client";

// ReactNode: JSXやテキストなど任意のUI要素を受け取る型
import type { ReactNode } from "react";
import { useState } from "react";
// React Aria Components: アクセシビリティ対応のUIプリミティブ
// TextField  : ラベル・入力・エラーをまとめる親コンポーネント
// Input      : 実際の <input> 要素
// Label      : <label> 要素（TextField と自動で紐づく）
// FieldError : バリデーションエラーの表示欄
import { FieldError, Input, Label, TextField } from "react-aria-components";
import { Button } from "@/components/Button";

export type LoginFormViewProps = {
	// Hydra から発行されるログインセッションの識別子
	loginChallenge: string;
	// フォーム送信時に呼ばれる Server Action（page.tsx から注入）
	action?: (formData: FormData) => void | Promise<void>;
	// プレビューモード時などに表示する補足メッセージ
	notice?: ReactNode;
};

export function LoginFormView({
	loginChallenge,
	action,
	notice,
}: LoginFormViewProps) {
	// 入力値をstateで管理することで、ボタンの有効/無効をリアルタイムに切り替える
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	// どちらかが空ならボタンを無効化する（最終目標: 空のときはログインボタンを押せない）
	const isSubmitDisabled = username.length === 0 || password.length === 0;

	return (
		<main className="flex flex-1 items-center justify-center px-6 py-12">
			<div className="flex w-full max-w-sm flex-col gap-6 rounded-2xl border border-foreground/10 bg-foreground/2 p-8 shadow-sm">
				{/* プレビューモードの案内などを表示するスロット */}
				{notice}
				<h1 className="text-xl font-semibold text-foreground">ログイン</h1>
				<form action={action} className="flex flex-col gap-4">
					{/* Hydra の login_challenge をフォームに含める（OIDC フロー継続に必須） */}
					<input type="hidden" name="login_challenge" value={loginChallenge} />

					{/* ユーザーネーム入力欄 */}
					<TextField
						name="username"
						isRequired
						// "aria": フォーカスを外した瞬間にエラーを表示する（ブラウザ標準の submit 時のみではない）
						validationBehavior="aria"
						value={username}
						onChange={setUsername}
						// 空のとき "Username is required." を返す → FieldError に表示される
						validate={(v) => (v.length === 0 ? "ユーザー名を入力してください。" : null)}
						className="flex flex-col gap-1.5"
					>
						<Label className="text-sm font-medium text-foreground">
							ユーザー名
						</Label>
						{/* data-[focus-visible]: キーボードフォーカス時のアウトライン */}
						{/* data-[invalid]: バリデーションエラー時にボーダーを赤にする */}
						<Input className="rounded-md border border-foreground/20 bg-background px-3 py-2 text-sm text-foreground placeholder:text-foreground/40 data-[focus-visible]:outline-2 data-[focus-visible]:outline-offset-2 data-[focus-visible]:outline-foreground data-[invalid]:border-destructive" />
						{/* validate の戻り値を表示する欄（エラーがなければ何も表示しない） */}
						<FieldError className="text-xs text-destructive" />
					</TextField>

					{/* パスワード入力欄（ユーザーネームと同じ構成） */}
					<TextField
						name="password"
						type="password"
						isRequired
						validationBehavior="aria"
						value={password}
						onChange={setPassword}
						validate={(v) => (v.length === 0 ? "パスワードを入力してください。" : null)}
						className="flex flex-col gap-1.5"
					>
						<Label className="text-sm font-medium text-foreground">
							パスワード
						</Label>
						<Input className="rounded-md border border-foreground/20 bg-background px-3 py-2 text-sm text-foreground placeholder:text-foreground/40 data-[focus-visible]:outline-2 data-[focus-visible]:outline-offset-2 data-[focus-visible]:outline-foreground data-[invalid]:border-destructive" />
						<FieldError className="text-xs text-destructive" />
					</TextField>

					{/* isDisabled: username か password が空なら押せない */}
					<Button variant="primary" type="submit" isDisabled={isSubmitDisabled}>
						ログイン
					</Button>
				</form>
			</div>
		</main>
	);
}
