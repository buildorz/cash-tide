
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from './AuthContext';

interface Transaction {
  id: string;
  type: 'send' | 'receive' | 'request' | 'deposit';
  amount: number;
  recipient?: string;
  sender?: string;
  status: 'completed' | 'pending' | 'failed';
  timestamp: Date;
}

interface WalletContextType {
  balance: number;
  transactions: Transaction[];
  sendMoney: (amount: number, recipient: string) => Promise<boolean>;
  requestMoney: (amount: number, from: string) => Promise<boolean>;
  addFunds: (amount: number, method: 'card' | 'apple_pay' | 'google_pay') => Promise<boolean>;
  pendingRequests: Transaction[];
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [balance, setBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      // Load wallet data from localStorage
      const storedBalance = localStorage.getItem('wallet_balance');
      const storedTransactions = localStorage.getItem('wallet_transactions');
      
      if (storedBalance) {
        setBalance(parseFloat(storedBalance));
      }
      
      if (storedTransactions) {
        // Convert string dates back to Date objects
        const parsedTransactions = JSON.parse(storedTransactions).map((tx: any) => ({
          ...tx,
          timestamp: new Date(tx.timestamp)
        }));
        setTransactions(parsedTransactions);
      }
    }
  }, [user]);

  // Save wallet data to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('wallet_balance', balance.toString());
      localStorage.setItem('wallet_transactions', JSON.stringify(transactions));
    }
  }, [balance, transactions, user]);

  const sendMoney = async (amount: number, recipient: string): Promise<boolean> => {
    try {
      if (amount <= 0) {
        throw new Error('Amount must be greater than 0');
      }
      
      if (amount > balance) {
        throw new Error('Insufficient funds');
      }

      // Create transaction
      const transaction: Transaction = {
        id: 'tx_' + Math.random().toString(36).substr(2, 9),
        type: 'send',
        amount,
        recipient,
        status: 'completed',
        timestamp: new Date()
      };

      // Update balance and add transaction
      setBalance(prev => prev - amount);
      setTransactions(prev => [transaction, ...prev]);

      toast({
        title: "Money sent!",
        description: `$${amount.toFixed(2)} sent to ${recipient}`,
      });

      return true;
    } catch (error: any) {
      console.error('Send money error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to send money",
      });
      return false;
    }
  };

  const requestMoney = async (amount: number, from: string): Promise<boolean> => {
    try {
      if (amount <= 0) {
        throw new Error('Amount must be greater than 0');
      }

      // Create transaction
      const transaction: Transaction = {
        id: 'tx_' + Math.random().toString(36).substr(2, 9),
        type: 'request',
        amount,
        recipient: from,
        status: 'pending',
        timestamp: new Date()
      };

      // Add transaction
      setTransactions(prev => [transaction, ...prev]);

      toast({
        title: "Money requested!",
        description: `Request for $${amount.toFixed(2)} sent to ${from}`,
      });

      return true;
    } catch (error: any) {
      console.error('Request money error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to request money",
      });
      return false;
    }
  };

  const addFunds = async (amount: number, method: 'card' | 'apple_pay' | 'google_pay'): Promise<boolean> => {
    try {
      if (amount <= 0) {
        throw new Error('Amount must be greater than 0');
      }

      // Create transaction
      const transaction: Transaction = {
        id: 'tx_' + Math.random().toString(36).substr(2, 9),
        type: 'deposit',
        amount,
        status: 'completed',
        timestamp: new Date()
      };

      // Update balance and add transaction
      setBalance(prev => prev + amount);
      setTransactions(prev => [transaction, ...prev]);

      const methodName = method === 'card' ? 'Card' : method === 'apple_pay' ? 'Apple Pay' : 'Google Pay';
      
      toast({
        title: "Funds added!",
        description: `$${amount.toFixed(2)} added to your wallet via ${methodName}`,
      });

      return true;
    } catch (error: any) {
      console.error('Add funds error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to add funds",
      });
      return false;
    }
  };

  const pendingRequests = transactions.filter(tx => 
    tx.type === 'request' && tx.status === 'pending'
  );

  return (
    <WalletContext.Provider value={{ 
      balance, 
      transactions, 
      sendMoney, 
      requestMoney, 
      addFunds,
      pendingRequests
    }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
