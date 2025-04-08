
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { usePrivy, User, useLogin } from '@privy-io/react-auth';

interface Userx {
  id: string;
  phoneNumber: string;
  email?: string;
  name?: string;
  balance: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loginProcess: () => void;
  logoutProcess: () => void;
  verifyCode: (code: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const { login } = useLogin({
    onComplete: (data) => {
      setIsAuthenticated(true);
      toast({
        title: "Login successful",
        description: "Welcome to CashTide!",
      });
    },
    onError: (error) => {
      console.error('Login error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to log in",
      });
    }
  });

  const { user, authenticated, logout } = usePrivy();

  const [localUser, setUser] = useState<User | null>(user);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(authenticated);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in from localStorage
    // const storedUser = localStorage.getItem('user');
    if (authenticated) {
      // setUser(JSON.parse(storedUser));
      setUser(user);
      setIsAuthenticated(authenticated);
    }
  }, [user, authenticated]);
  const loginProcess = async () => {
    try {
      await login();
      setIsAuthenticated(authenticated);
      // localStorage.setItem('user', JSON.stringify(privyUser));
      setUser(user);
      toast({
        title: "Login successful",
        description: "Welcome to CashTide!",
      });
    } catch (error) {
      console.error('Login error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to log in",
      });
    }
  }

  const verifyCode = async (code: string): Promise<boolean> => {
    try {
      // This would normally verify the code with an API
      // For demo, we'll just accept any code and create a mock user

      // Create mock user
      // const mockUser: Userx = {
      //   id: 'user_' + Math.random().toString(36).substr(2, 9),
      //   phoneNumber: '+91XXXXXXXXXX',
      //   email: 'user@example.com',
      //   name: 'Demo User',
      //   balance: 0.00
      // };

      // setUser(mockUser);
      // setIsAuthenticated(true);
      // localStorage.setItem('user', JSON.stringify(mockUser));

      // toast({
      //   title: "Login successful",
      //   description: "Welcome to CashTide!",
      // });

      // return true;
    } catch (error) {
      console.error('Verification error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Invalid verification code",
      });
      return false;
    }
  };


  const logoutProcess = () => {
    logout();
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loginProcess, logoutProcess, verifyCode }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
