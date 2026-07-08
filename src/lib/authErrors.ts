/** Map Firebase auth error codes to friendly login messages. */
export function mapAuthError(code: string): string {
  switch (code) {
    case "auth/user-not-found":
      return "No account found with this email.";
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Incorrect email or password.";
    case "auth/invalid-email":
      return "Invalid email address.";
    case "auth/too-many-requests":
      return "Too many failed attempts. Please try again later.";
    default:
      return "Login failed. Please try again.";
  }
}

/** Map Firebase auth error codes to friendly signup messages. */
export function mapSignupError(code: string): string {
  switch (code) {
    case "auth/email-already-in-use":
      return "An account with this email already exists.";
    case "auth/invalid-email":
      return "Invalid email address.";
    case "auth/weak-password":
      return "Password is too weak.";
    default:
      return "Signup failed. Please try again.";
  }
}
