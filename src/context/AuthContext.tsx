
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

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

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (phoneNumber: string) => {
    try {
      // This would normally make an API call to send a verification code
      // For demo, we'll just simulate a successful code sending
      toast({
        title: "Verification code sent",
        description: `A code has been sent to ${phoneNumber}`,
      });
    } catch (error) {
      console.error('Login error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send verification code",
      });
    }
  };

  const verifyCode = async (code: string): Promise<boolean> => {
    try {
      // This would normally verify the code with an API
      // For demo, we'll just accept any code and create a mock user
      
      // Create mock user
      const mockUser: User = {
        id: 'user_' + Math.random().toString(36).substr(2, 9),
        phoneNumber: '+91XXXXXXXXXX',
        email: 'user@example.com',
        name: 'Demo User',
        balance: 0.00
      };
      
      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      toast({
        title: "Login successful",
        description: "Welcome to CashTide!",
      });
      
      return true;
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

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, verifyCode }}>
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
