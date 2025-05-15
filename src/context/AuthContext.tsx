/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useState, useContext, useLayoutEffect } from "react";
import { User, useLogin, useLogout, usePrivy } from "@privy-io/react-auth";
import { showError, showSuccess } from "../lib/utils";
import { axiosInstance } from "../utils/axios";

interface DbUser {
  id: string;
  name?: string | null;
  phoneNumber: string;
  walletAddress: string;
  createdAt: string;
  status: string;
}

export interface AppUser extends User {
  privyDID: string;
  dbId: string;
  name: string;
  phone: { number: string };
  wallet: { address: string } & Omit<User["wallet"], "address">;
  createdAt: Date;
  status: string;
}

interface AuthContextType {
  user: AppUser | null;
  isAuthenticated: boolean;
  login: () => Promise<void>;
  logout: () => void;
  verifyCode: (code: string) => Promise<boolean>;
  updateUser: (newName: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { authenticated } = usePrivy();
  const [user, setUser] = useState<AppUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(authenticated);
  const [isLoading, setIsLoading] = useState(true);

  const { login: privyLogin } = useLogin({
    onComplete: async ({ user: privyUser }) => {
      try {
        const privyDID = privyUser.id;
        const walletAddress = privyUser.wallet?.address;
        const phoneNumber = privyUser.phone?.number;
        if (!walletAddress || !phoneNumber) {
          throw new Error("Missing wallet or phone on Privy user");
        }

        let db: DbUser;
        try {
          const getResp = await axiosInstance.get<DbUser>(`/api/user/get/${privyDID}`);
          db = getResp.data;
        } catch (err: any) {
          if (err.response?.status === 404 || err.response?.data?.message === "User not found") {
            const createResp = await axiosInstance.post<DbUser>("/api/user/register", {
              privyDID,
              walletAddress,
              phoneNumber,
            });
            db = createResp.data;
          } else {
            throw err;
          }
        }

        const appUser: AppUser = {
          ...privyUser,
          privyDID,
          dbId: db.id,
          name: db.name,
          phone: { number: db.phoneNumber },
          wallet: { ...privyUser.wallet!, address: db.walletAddress },
          createdAt: new Date(db.createdAt),
          status: db.status,
        };

        setUser(appUser);
        setIsAuthenticated(true);
        localStorage.setItem("user", JSON.stringify(appUser));
        showSuccess(
          "Login successful",
          `Welcome back ${appUser.name ? appUser.name : ""}!`
        );

        // Check for redirect URL after successful login
        const redirectUrl = localStorage.getItem('redirectAfterLogin');
        if (redirectUrl) {
          localStorage.removeItem('redirectAfterLogin'); // Clean up
          window.location.href = redirectUrl; // Use window.location for full page reload
        }
      } catch (err: any) {
        console.error("Auth sync error:", err);
        showError("Authentication Error", err.message || "Unable to sync with backend");
      }
    },
    onError: (error) => {
      console.error("Privy login error:", error);
      showError("Login failed", "Failed to authenticate");
    },
  });

  const { logout: privyLogout } = useLogout();

  useLayoutEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = async () => {
    try {
      privyLogin();
    } catch (error) {
      console.error("Login error:", error);
      showError("Login failed", "Please try again later");
    }
  };

  const updateUser = (newName: string) => {
    setUser((u) => {
      if (!u) return u;
      const updated = { ...u, name: newName };
      localStorage.setItem("user", JSON.stringify(updated));
      return updated;
    });
  };

  const verifyCode = async (code: string): Promise<boolean> => {
    showSuccess("Verification successful", "You are now logged in");
    return true;
  };

  const logout = () => {
    privyLogout();
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    showSuccess("Logged out", "You have been successfully logged out");
  };

  if (isLoading) return null;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, verifyCode, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
