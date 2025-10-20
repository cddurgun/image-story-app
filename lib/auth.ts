import { signIn as nextAuthSignIn, signOut as nextAuthSignOut } from "next-auth/react";

// Sign up
export const signUp = async (email: string, password: string, name: string): Promise<{ success: boolean; error?: string }> => {
  try {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, name }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.error || "Failed to create account" };
    }

    // Auto login after signup using NextAuth
    const result = await nextAuthSignIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      return { success: false, error: result.error };
    }

    return { success: true };
  } catch (error) {
    console.error("Signup error:", error instanceof Error ? error.message : "Unknown error");
    return { success: false, error: "Failed to create account" };
  }
};

// Login
export const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
  try {
    const result = await nextAuthSignIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      return { success: false, error: "Invalid email or password" };
    }

    if (!result?.ok) {
      return { success: false, error: "Failed to login" };
    }

    return { success: true };
  } catch (error) {
    console.error("Login error:", error instanceof Error ? error.message : "Unknown error");
    return { success: false, error: "Failed to login" };
  }
};

// Logout
export const logout = async (): Promise<void> => {
  await nextAuthSignOut({ redirect: false });
};
