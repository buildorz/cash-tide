import { showError, showSuccess } from "@/lib/utils";
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from "@/auth";
import { ConfirmationResult } from "firebase/auth"

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useLayoutEffect,
} from "react";

declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier;
  }
}

interface User {
  id: string;
  phoneNumber: string;
  email?: string;
  name?: string;
  balance: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (phoneNumber: string) => Promise<void>;
  logout: () => void;
  verifyCode: (code: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [authData, setAuthData] = useState(null)

  useLayoutEffect(() => {
    // Check if user is already logged in from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = async (phoneNumber: string) => {
    try {
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
          size: 'normal',
          callback: () => {
            showSuccess('reCAPTCHA verified');
          },
          'expired-callback': () => {
            showError('reCAPTCHA expired');
          },
        });
      }
      await signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier).then((result) => {
        console.log("result: ", result);
        setAuthData(result);
        showSuccess("Verification code sent", "Please check your phone");
      }).catch((error) => {
        console.error("Error during sign-in:", error);
        showError("Sign-in failed", "Please try again later");
      });
      // This would normally make an API call to send a verification code
      // For demo, we'll just simulate a successful code sending
      showSuccess(
        "Verification code sent",
        `A code has been sent to ${phoneNumber}`
      );
    } catch (error) {
      console.error("Login error:", error);
      showError("Login failed", "Please try again later");
    }
  };

  const verifyCode = async (code: string): Promise<boolean> => {
    try {
      // This would normally verify the code with an API
      // For demo, we'll just accept any code and create a mock user

      // using the firebase confirmation result r
      const confirmed = await authData.confirm(code);
      // Create mock user
      const mockUser: User = {
        id: "user_" + Math.random().toString(36).substr(2, 9),
        phoneNumber: "+91XXXXXXXXXX",
        email: "user@example.com",
        name: "Demo User",
        balance: 0.0,
      };

      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(mockUser));

      showSuccess("Login successful", "You are now logged in");

      return true;
    } catch (error) {
      console.error("Verification error:", error);
      showError("Verification failed", "Invalid verification code");
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
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
