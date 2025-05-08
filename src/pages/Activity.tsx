import React, { useState } from 'react';
import { Clock, ArrowUpRight, ArrowDownLeft, Download, Upload, Loader } from 'lucide-react';
import { format } from 'date-fns';
import { useAuth } from '@/context/AuthContext';
import { useTransactions } from '@/hooks/use-transactions';
import { Transaction } from '@/hooks/use-transactions';

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
  const [activeTab, setActiveTab] = useState<'activity' | 'requests'>('activity');
  const { transactions, isLoading } = useTransactions();

  const getDisplayInfo = (user: { name: string | null, phoneNumber: string }) => {
    return user.name || formatPhoneNumber(user.phoneNumber);
  };

  const formatPhoneNumber = (phoneNumber: string) => {
    return phoneNumber;
  };

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

  const formatAmount = (tx: Transaction) => {
    const prefix = (tx.transactionType === 'send' || tx.transactionType === 'withdrawal') ? '- ' : '+ ';
    return `${prefix}${tx.amount.toFixed(2)} $`;
  };

  const formatDate = (date: Date) => {
    return format(date, 'MMM d, yyyy • h:mm a');
  };

  const LoadingState = () => (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        <Loader className="text-blue-500 animate-spin" size={24} />
      </div>
      <h3 className="text-xl font-medium mb-2">Loading transactions</h3>
      <p className="text-gray-500">Please wait while we fetch your activity data...</p>
    </div>
  );

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
        {isLoading ? (
          <LoadingState />
        ) : activeTab === 'activity' ? (
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
        ) : (
          <EmptyState
            message="No requests yet"
            description="Money requests that you've sent will appear here."
          />
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