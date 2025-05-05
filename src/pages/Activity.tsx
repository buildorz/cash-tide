import React, { useState, useEffect } from 'react';
import { Clock, ArrowUpRight, ArrowDownLeft, Download, Upload } from 'lucide-react';
import { format } from 'date-fns';
import { useAuth } from '@/context/AuthContext';
import { axiosInstance } from '@/utils/axios';

// Updated interface to match the actual API response
interface ApiTransaction {
  id: string;
  txhash: string;
  transactionType: 'SEND' | 'RECEIVE' | 'DEPOSIT' | 'WITHDRAWAL';
  senderId: string;
  receiverId: string;
  amount: number;
  transactionStatus: 'PENDING' | 'COMPLETED' | 'FAILED';
  createdAt: string;
  completedAt?: string;
  sender: {
    id: string;
    name: string | null;
    phoneNumber: string;
    walletAddress: string;
    privyDID: string;
    createdAt: string;
    deletedAt: string | null;
    status: string;
  };
  receiver: {
    id: string;
    name: string | null;
    phoneNumber: string;
    walletAddress: string;
    privyDID: string;
    createdAt: string;
    deletedAt: string | null;
    status: string;
  };
}

// Updated interface for frontend use
interface Transaction {
  id: string;
  transactionType: 'send' | 'receive' | 'deposit' | 'withdrawal';
  amount: number;
  sender?: {
    id: string;
    name: string | null;
    phoneNumber: string;
    walletAddress: string;
  };
  receiver?: {
    id: string;
    name: string | null;
    phoneNumber: string;
    walletAddress: string;
  };
  timestamp: Date;
  completedAt?: Date;
  status: string;
  txhash: string;
}

// Updated interface for API requests
interface ApiRequest {
  id: string;
  requesterId: string;
  requestToId: string;
  amount: number;
  currency: string;
  requestType: 'PAYMENT' | 'REFUND' | 'OTHER';
  description?: string;
  requestStatus: 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELED';
  createdAt: string;
  respondedAt?: string;
  requester: {
    id: string;
    name: string | null;
    phoneNumber: string;
    walletAddress: string;
  };
  requestTo: {
    id: string;
    name: string | null;
    phoneNumber: string;
    walletAddress: string;
  };
}

// Request for frontend use
interface Request {
  id: string;
  amount: number;
  currency: string;
  requestType: string;
  description?: string;
  requester: {
    id: string;
    name: string | null;
    phoneNumber: string;
    walletAddress: string;
  };
  requestTo: {
    id: string;
    name: string | null;
    phoneNumber: string;
    walletAddress: string;
  };
  timestamp: Date;
  respondedAt?: Date;
  status: string;
}

const Activity: React.FC = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [pendingRequests, setPendingRequests] = useState<Request[]>([]);
  const [activeTab, setActiveTab] = useState<'activity' | 'requests'>('activity');

  useEffect(() => {
    if (!user) return;

    const fetchTransactions = async () => {
      try {
        // Fetch sent transactions
        const { data: sendData } = await axiosInstance.get<ApiTransaction[]>(
          `/api/transaction/user/${user.dbId}?type=send`
        );
        const sends: Transaction[] = sendData.map((tx) => ({
          id: tx.id,
          txhash: tx.txhash,
          transactionType: 'send',
          amount: tx.amount,
          receiver: {
            id: tx.receiver.id,
            name: tx.receiver.name,
            phoneNumber: tx.receiver.phoneNumber,
            walletAddress: tx.receiver.walletAddress,
          },
          sender: {
            id: tx.sender.id,
            name: tx.sender.name,
            phoneNumber: tx.sender.phoneNumber,
            walletAddress: tx.sender.walletAddress,
          },
          timestamp: new Date(tx.createdAt),
          completedAt: tx.completedAt ? new Date(tx.completedAt) : undefined,
          status: tx.transactionStatus.toLowerCase(),
        }));

        // Fetch received transactions
        const { data: recvData } = await axiosInstance.get<ApiTransaction[]>(
          `/api/transaction/user/${user.dbId}?type=receive`
        );
        const recvs: Transaction[] = recvData.map((tx) => ({
          id: tx.id,
          txhash: tx.txhash,
          transactionType: 'receive',
          amount: tx.amount,
          receiver: {
            id: tx.receiver.id,
            name: tx.receiver.name,
            phoneNumber: tx.receiver.phoneNumber,
            walletAddress: tx.receiver.walletAddress,
          },
          sender: {
            id: tx.sender.id,
            name: tx.sender.name,
            phoneNumber: tx.sender.phoneNumber,
            walletAddress: tx.sender.walletAddress,
          },
          timestamp: new Date(tx.createdAt),
          completedAt: tx.completedAt ? new Date(tx.completedAt) : undefined,
          status: tx.transactionStatus.toLowerCase(),
        }));

        // Fetch deposit transactions
        const { data: depositData } = await axiosInstance.get<ApiTransaction[]>(
          `/api/transaction/user/${user.dbId}?type=deposit`
        );
        const deposits: Transaction[] = depositData.map((tx) => ({
          id: tx.id,
          txhash: tx.txhash,
          transactionType: 'deposit',
          amount: tx.amount,
          receiver: tx.receiver ? {
            id: tx.receiver.id,
            name: tx.receiver.name,
            phoneNumber: tx.receiver.phoneNumber,
            walletAddress: tx.receiver.walletAddress,
          } : undefined,
          sender: tx.sender ? {
            id: tx.sender.id,
            name: tx.sender.name,
            phoneNumber: tx.sender.phoneNumber,
            walletAddress: tx.sender.walletAddress,
          } : undefined,
          timestamp: new Date(tx.createdAt),
          completedAt: tx.completedAt ? new Date(tx.completedAt) : undefined,
          status: tx.transactionStatus.toLowerCase(),
        }));

        // Fetch withdrawal transactions
        const { data: withdrawalData } = await axiosInstance.get<ApiTransaction[]>(
          `/api/transaction/user/${user.dbId}?type=withdrawal`
        );
        const withdrawals: Transaction[] = withdrawalData.map((tx) => ({
          id: tx.id,
          txhash: tx.txhash,
          transactionType: 'withdrawal',
          amount: tx.amount,
          receiver: tx.receiver ? {
            id: tx.receiver.id,
            name: tx.receiver.name,
            phoneNumber: tx.receiver.phoneNumber,
            walletAddress: tx.receiver.walletAddress,
          } : undefined,
          sender: tx.sender ? {
            id: tx.sender.id,
            name: tx.sender.name,
            phoneNumber: tx.sender.phoneNumber,
            walletAddress: tx.sender.walletAddress,
          } : undefined,
          timestamp: new Date(tx.createdAt),
          completedAt: tx.completedAt ? new Date(tx.completedAt) : undefined,
          status: tx.transactionStatus.toLowerCase(),
        }));

        // Merge and sort all completed activity
        setTransactions(
          [...sends, ...recvs, ...deposits, ...withdrawals].sort(
            (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
          )
        );

        // Fetch pending requests
        try {
          const { data: reqData } = await axiosInstance.get<ApiRequest[]>(
            `/api/request/user/${user.dbId}?status=pending`
          );
          const reqs: Request[] = reqData.map((req) => ({
            id: req.id,
            amount: req.amount,
            currency: req.currency,
            requestType: req.requestType.toLowerCase(),
            description: req.description,
            requester: req.requester,
            requestTo: req.requestTo,
            timestamp: new Date(req.createdAt),
            respondedAt: req.respondedAt ? new Date(req.respondedAt) : undefined,
            status: req.requestStatus.toLowerCase(),
          }));

          setPendingRequests(
            reqs.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
          );
        } catch (err) {
          console.error('Failed fetching requests:', err);
          // If requests endpoint doesn't exist yet, show empty
          setPendingRequests([]);
        }
      } catch (err) {
        console.error('Failed fetching transactions:', err);
      }
    };

    fetchTransactions();
  }, [user]);

  // Helper function to display user name or phone number
  const getDisplayInfo = (user: { name: string | null, phoneNumber: string }) => {
    return user.name || formatPhoneNumber(user.phoneNumber);
  };

  // Helper function to format phone number
  const formatPhoneNumber = (phoneNumber: string) => {
    // Return the phone number as is
    return phoneNumber;
  };

  // Helper function to get transaction icon
  const getTransactionIcon = (type: string) => {
    switch(type) {
      case 'send':
        return <ArrowUpRight className="text-red-500" size={20} />;
      case 'receive':
        return <ArrowDownLeft className="text-green-500" size={20} />;
      case 'deposit':
        return <Download className="text-blue-500" size={20} />;
      case 'withdrawal':
        return <Upload className="text-orange-500" size={20} />;
      default:
        return <Clock className="text-gray-500" size={20} />;
    }
  };

  // Helper function to get transaction color
  const getTransactionColor = (type: string) => {
    switch(type) {
      case 'send':
        return 'bg-red-100';
      case 'receive':
        return 'bg-green-100';
      case 'deposit':
        return 'bg-blue-100';
      case 'withdrawal':
        return 'bg-orange-100';
      default:
        return 'bg-gray-100';
    }
  };

  // Helper function to get transaction text
  const getTransactionText = (tx: Transaction) => {
    switch(tx.transactionType) {
      case 'send':
        return 'Sent to ' + (tx.receiver ? getDisplayInfo(tx.receiver) : 'Unknown');
      case 'receive':
        return 'Received from ' + (tx.sender ? getDisplayInfo(tx.sender) : 'Unknown');
      case 'deposit':
        return 'Deposit to wallet';
      case 'withdrawal':
        return 'Withdrawal from wallet';
      default:
        return 'Transaction';
    }
  };

  const getAmountStyle = (type: string) => {
    switch(type) {
      case 'send':
      case 'withdrawal':
        return 'text-red-500';
      case 'receive':
      case 'deposit':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  // Helper function to format the amount with sign
  const formatAmount = (tx: Transaction) => {
    const prefix = (tx.transactionType === 'send' || tx.transactionType === 'receive') ? '- ' : '+ ';
    return `${prefix}${tx.amount.toFixed(2)} $`;
  };

  // Helper function to format date
  const formatDate = (date: Date) => {
    return format(date, 'MMM d, yyyy • h:mm a');
  };

  return (
    <div className="max-w-4xl mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Activity</h1>
      <div className="tabs flex border-b mb-4">
        <button
          className={`flex-1 py-4 text-center font-medium ${
            activeTab === 'activity' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('activity')}
        >
          Activity
        </button>
        <button
          className={`flex-1 py-4 text-center font-medium ${
            activeTab === 'requests' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('requests')}
        >
          Requests
        </button>
      </div>

      <div className="flex-1 px-4">
        {activeTab === 'activity' ? (
          transactions.length === 0 ? (
            <EmptyState
              message="No activity yet"
              description="When there is a new transaction, it will show up here."
            />
          ) : (
            <div className="space-y-4">
              {transactions.map((tx) => (
                <div
                  key={tx.id}
                  className="p-4 border rounded-lg bg-white flex flex-col"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div
                        className={`w-10 h-10 rounded-full ${getTransactionColor(tx.transactionType)} flex items-center justify-center mr-3`}
                      >
                        {getTransactionIcon(tx.transactionType)}
                      </div>
                      <div>
                        <div className="font-medium">
                          {getTransactionText(tx)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {formatDate(tx.timestamp)}
                        </div>
                      </div>
                    </div>
                    <div className={`font-medium ${getAmountStyle(tx.transactionType)}`}>
                      {formatAmount(tx)}
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-gray-500 flex justify-between">
                    <div>
                      Status: <span className="capitalize">{tx.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : pendingRequests.length === 0 ? (
          <EmptyState
            message="No requests yet"
            description="Money requests that you've sent will appear here."
          />
        ) : (
          <div className="space-y-4">
            {pendingRequests.map((req) => (
              <div key={req.id} className="p-4 border rounded-lg bg-white">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium">
                    Request to {getDisplayInfo(req.requestTo)}
                  </div>
                  <div className="text-amber-500 font-medium capitalize">
                    {req.status}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    {formatDate(req.timestamp)}
                    {req.description && <span className="ml-2">• {req.description}</span>}
                  </div>
                  <div className="font-medium">
                    {req.amount.toFixed(2)} {req.currency}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const EmptyState: React.FC<{ message: string; description: string }> = ({ message, description }) => (
  <div className="flex flex-col items-center justify-center h-full text-center py-20">
    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
      <Clock className="text-gray-500" size={24} />
    </div>
    <h3 className="text-xl font-medium mb-2">{message}</h3>
    <p className="text-gray-500 max-w-xs">{description}</p>
  </div>
);

export default Activity;