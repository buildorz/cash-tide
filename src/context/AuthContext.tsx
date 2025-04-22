import { showError, showSuccess } from "@/lib/utils";
import { User, useLogin, useLogout, usePrivy } from "@privy-io/react-auth"

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useLayoutEffect,
} from "react";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: () => Promise<void>;
  logout: () => void;
  verifyCode: (code: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { authenticated } = usePrivy();
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(authenticated);
  const [isLoading, setIsLoading] = useState(true);
  const [authData, setAuthData] = useState(null)

  const { login: privyLogin } = useLogin({
    onComplete: (data) => {
      setUser(data.user);
      setIsAuthenticated(true);
      showSuccess(
        "Login successful",
        "Welcome to CashTide!",
      );
    },
    onError: (error) => {
      console.error('Login error:', error);
      showError(
        "Error",
        "Failed to log in",
      );
    }
  });
  const { logout: privyLogout } = useLogout();

  useLayoutEffect(() => {
    // Check if user is already logged in from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = async () => {
    try {
      await privyLogin();
    } catch (error) {
      console.error("Login error:", error);
      showError("Login failed", "Please try again later");
    }
  };

  const verifyCode = async (code: string): Promise<boolean> => {
    try {

      showSuccess("Login successful", "You are now logged in");

      return true;
    } catch (error) {
      console.error("Verification error:", error);
      showError("Verification failed", "Invalid verification code");
      return false;
    }
  };

  const logout = () => {
    privyLogout();
    setUser(null);
    setIsAuthenticated(false);
    showSuccess("Logged out", "You have been successfully logged out");
  };

  if (isLoading) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, verifyCode }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
