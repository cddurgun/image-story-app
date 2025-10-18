import { AuthSession } from "@/types";

const SESSION_KEY = "auth_session";
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days

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

    // Auto login after signup
    createSession(data.user);

    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to create account" };
  }
};

// Login
export const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.error || "Failed to login" };
    }

    createSession(data.user);

    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to login" };
  }
};

// Create session
const createSession = (user: { id: string; email: string; name: string }): void => {
  const session: AuthSession = {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
    expiresAt: new Date(Date.now() + SESSION_DURATION).toISOString(),
  };

  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
};

// Get current session
export const getSession = (): AuthSession | null => {
  if (typeof window === "undefined") return null;

  const stored = localStorage.getItem(SESSION_KEY);
  if (!stored) return null;

  const session: AuthSession = JSON.parse(stored);

  // Check if session expired
  if (new Date(session.expiresAt) < new Date()) {
    logout();
    return null;
  }

  return session;
};

// Logout
export const logout = (): void => {
  localStorage.removeItem(SESSION_KEY);
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return getSession() !== null;
};

// Get current user
export const getCurrentUser = () => {
  const session = getSession();
  return session?.user || null;
};
