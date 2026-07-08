import { describe, expect, it } from "vitest";
import { mapAuthError, mapSignupError } from "@/lib/authErrors";

describe("mapAuthError", () => {
  it.each([
    ["auth/user-not-found", "No account found with this email."],
    ["auth/wrong-password", "Incorrect email or password."],
    ["auth/invalid-credential", "Incorrect email or password."],
    ["auth/invalid-email", "Invalid email address."],
    ["auth/too-many-requests", "Too many failed attempts. Please try again later."],
    ["auth/something-unknown", "Login failed. Please try again."],
    ["", "Login failed. Please try again."],
  ])("maps %s", (code, expected) => {
    expect(mapAuthError(code)).toBe(expected);
  });
});

describe("mapSignupError", () => {
  it.each([
    ["auth/email-already-in-use", "An account with this email already exists."],
    ["auth/weak-password", "Password is too weak."],
    ["auth/whatever", "Signup failed. Please try again."],
  ])("maps %s", (code, expected) => {
    expect(mapSignupError(code)).toBe(expected);
  });
});
