import React, { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { showError, showSuccess } from "@/lib/utils";
import { useCreateKernel } from "@/hooks/use-create-kernel";
import { parseUnits, formatEther } from "viem";
import { useWallets } from "@privy-io/react-auth";
import { useSmartWalletBalance } from "@/hooks/use-balance";

interface Transaction {
  id: string;
  type: "send" | "receive" | "request" | "deposit";
  amount: number;
  recipient?: string;
  sender?: string;
  status: "completed" | "pending" | "failed";
  timestamp: Date;
}

interface WalletContextType {
  balance: number;
  transactions: Transaction[];
  sendMoney: (amount: number, recipient: string) => Promise<boolean>;
  requestMoney: (amount: number, from: string) => Promise<boolean>;
  addFunds: (
    amount: number,
    method: "card" | "apple_pay" | "google_pay"
  ) => Promise<boolean>;
  pendingRequests: Transaction[];
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const balanceWei = useSmartWalletBalance();
  const [balance, setBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { user } = useAuth();
  const { kernelClient, address } = useCreateKernel();
  const { wallets } = useWallets();

  useEffect(() => {
    if (balanceWei) {
      const ethBalance = parseFloat(formatEther(balanceWei));
      setBalance(ethBalance);
    }
  }, [balanceWei]);

  useEffect(() => {
    if (user) {
      const embedded = wallets.find(w => w.walletClientType === 'privy');
      if (!embedded) return;
  
      const storedTransactions = localStorage.getItem("wallet_transactions");

      if (storedTransactions) {
        const parsedTransactions = JSON.parse(storedTransactions).map((tx) => ({
          ...tx,
          timestamp: new Date(tx.timestamp),
        }));
        setTransactions(parsedTransactions);
      }
    }
  }, [user, wallets, address]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("wallet_transactions", JSON.stringify(transactions));
    }
  }, [transactions, user]);

  const sendMoney = async (
    amount: number,
    recipient: string
  ): Promise<boolean> => {
    try {
      if (!kernelClient) throw new Error('Wallet not ready');

      if (amount <= 0) {
        throw new Error("Amount must be greater than 0");
      }

      if (amount > balance) {
        throw new Error("Insufficient funds");
      }

      const valueWei = parseUnits(amount.toString(), 18);
      const txHash = await kernelClient.sendTransaction({
        to: recipient,
        value: valueWei,
        data: "0x",
      });
      console.log("Sponsored txHash:", txHash);

      const transaction: Transaction = {
        id: txHash,
        type: "send",
        amount,
        recipient,
        status: "completed",
        timestamp: new Date(),
      };
      setTransactions((prev) => [transaction, ...prev]);
      showSuccess(
        "Money sent!",
        `Transaction ${txHash} confirmed — you sent $${amount.toFixed(
          2
        )} to ${recipient}`
      );

      return true;
    } catch (error) {
      console.error("Send money error:", error);
      showError("Send money failed", error.message || "Failed to send money");
      return false;
    }
  };

  const requestMoney = async (
    amount: number,
    from: string
  ): Promise<boolean> => {
    try {
      if (amount <= 0) {
        throw new Error("Amount must be greater than 0");
      }

      const transaction: Transaction = {
        id: "tx_" + Math.random().toString(36).substr(2, 9),
        type: "request",
        amount,
        recipient: from,
        status: "pending",
        timestamp: new Date(),
      };

      setTransactions((prev) => [transaction, ...prev]);

      showSuccess(
        "Request sent!",
        `You have requested $${amount.toFixed(2)} from ${from}`
      );

      return true;
    } catch (error) {
      console.error("Request money error:", error);
      showError(
        "Request money failed",
        error.message || "Failed to request money"
      );
      return false;
    }
  };

  const addFunds = async (
    amount: number,
    method: "card" | "apple_pay" | "google_pay"
  ): Promise<boolean> => {
    try {
      if (amount <= 0) {
        throw new Error("Amount must be greater than 0");
      }

      const transaction: Transaction = {
        id: "tx_" + Math.random().toString(36).substr(2, 9),
        type: "deposit",
        amount,
        status: "completed",
        timestamp: new Date(),
      };

      setTransactions((prev) => [transaction, ...prev]);

      const methodName =
        method === "card"
          ? "Card"
          : method === "apple_pay"
            ? "Apple Pay"
            : "Google Pay";

      showSuccess(
        "Funds added!",
        `$${amount.toFixed(2)} added to your wallet via ${methodName}`
      );

      return true;
    } catch (error) {
      console.error("Add funds error:", error);
      showError("Add funds failed", error.message || "Failed to add funds");
      return false;
    }
  };

  const pendingRequests = transactions.filter(
    (tx) => tx.type === "request" && tx.status === "pending"
  );

  return (
    <WalletContext.Provider
      value={{
        balance,
        transactions,
        sendMoney,
        requestMoney,
        addFunds,
        pendingRequests,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};
