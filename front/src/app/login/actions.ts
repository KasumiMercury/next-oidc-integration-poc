"use server";

import { redirect } from "next/navigation";
import { authenticate } from "@/features/auth/op/authenticate";

export async function login(formData: FormData) {
	const challenge = formData.get("login_challenge");
	if (typeof challenge !== "string" || challenge.length === 0) {
		throw new Error("missing login_challenge");
	}

	const usernameField = formData.get("username");
	const passwordField = formData.get("password");
	const hasCredentials =
		typeof usernameField === "string" &&
		usernameField.length > 0 &&
		typeof passwordField === "string" &&
		passwordField.length > 0;

	const username = hasCredentials ? (usernameField as string) : "test";
	const password = hasCredentials ? (passwordField as string) : "test";

	const result = await authenticate(username, password, challenge);
	if (!result) {
		throw new Error("authentication failed");
	}
	redirect(result.redirectTo);
}
