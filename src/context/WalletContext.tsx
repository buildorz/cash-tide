import React, { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { showError, showSuccess } from "@/lib/utils";
import { useCreateKernel } from "@/hooks/use-create-kernel";
import { parseUnits, formatUnits, erc20Abi, encodeFunctionData } from "viem";
import { useWallets, useFundWallet } from "@privy-io/react-auth";
import { useSmartWalletBalance } from "@/hooks/use-balance";
import { axiosInstance } from "@/utils/axios";
import { USDC_ADDRESS } from "@/utils/constants";

interface Transaction {
  txhash: string;
  type: "send" | "receive" | "request" | "deposit";
  amount: number;
  recipient?: string;
  sender?: string;
  status: "completed" | "pending" | "failed";
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

type FundingMethod = 'card' | 'apple_pay' | 'google_pay';

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
  const { fundWallet } = useFundWallet();

  useEffect(() => {
    if (balanceWei) {
      const ethBalance = parseFloat(formatUnits(balanceWei, 6));
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
      console.log("kernel client`", kernelClient);
      if (amount <= 0) throw new Error("Amount must be greater than 0");
      if (amount > balance) throw new Error("Insufficient funds");

      type DbUser = { 
        id: string;
        walletAddress: string 
      };
      let dbUser: DbUser;
      try {
        const resp = await axiosInstance.get<DbUser>(`/api/user/phone/${encodeURIComponent(recipient)}`);
        dbUser = resp.data;
      } catch (e) {
        if (e.response?.status === 404 || e.response?.data.message === "User not found") {
          const createResp = await axiosInstance.post("/api/user/pregenerate", {
            phoneNumber: recipient,
          });
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data = createResp.data as any;
          const walletAddr = data.walletAddress;
          dbUser = { id: data.id, walletAddress: walletAddr };
        } else {
          throw e;
        }
      }

      const data = encodeFunctionData({
        abi: erc20Abi,
        functionName: "transfer",
        args: [
          dbUser.walletAddress as `0x${string}`, 
          parseUnits(amount.toString(), 6)
        ],
      })

      const txHash = await kernelClient.sendTransaction({
        to: USDC_ADDRESS,
        data: data
      });

      const transaction: Transaction = {
        txhash: txHash,
        type: "send",
        amount,
        sender: address,
        recipient: dbUser.walletAddress,
        status: "completed"
      };
      console.log("transaction", transaction);

      await axiosInstance.post("/api/transaction", {
        txhash: txHash,
        senderAddress: address,
        receiverAddress: dbUser.walletAddress,
        amount,
        transactionType: "SEND",
        transactionStatus: "COMPLETED",
      });

      setTransactions((prev) => [transaction, ...prev]);
      showSuccess(
        "Money sent!",
        `You sent $${amount.toFixed(
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
        txhash: "tx_" + Math.random().toString(36).substr(2, 9),
        type: "request",
        amount,
        recipient: from,
        status: "pending"
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

  const addFunds = async (amount: number, method: FundingMethod): Promise<boolean> => {
    if (!address) {
      console.error('No wallet address found for funding.');
      return false;
    }
    try {
      let defaultFundingMethod: 'card' | 'exchange' | 'wallet' | 'manual';
      switch (method) {
        case 'card':
        case 'apple_pay':
        case 'google_pay':
          defaultFundingMethod = 'card';
          break;
        default:
          defaultFundingMethod = 'card';
      }
      await fundWallet(address, {
        amount: amount.toString(),
        defaultFundingMethod,
      });

      const tx = {
        txhash: `0x${Math.floor(Math.random() * 1e16).toString(16)}`,
        amount,
        method,
        status: 'success',
      };
      console.log('Transaction:', tx);
      return true;
    } catch (error) {
      console.error('addFunds error:', error);
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
