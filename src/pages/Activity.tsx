
import React, { useState } from 'react';
import Header from '@/components/Header';
import { useWallet } from '@/context/WalletContext';
import { Clock, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { format } from 'date-fns';

const Activity: React.FC = () => {
  const { transactions, pendingRequests } = useWallet();
  const [activeTab, setActiveTab] = useState<'activity' | 'requests'>('activity');

  return (
    <div className="app-container flex flex-col">
      <Header showBackButton />
      
      <div className="tabs flex border-b mb-4">
        <button
          className={`flex-1 py-4 text-center font-medium ${activeTab === 'activity' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('activity')}
        >
          Activity
        </button>
        <button
          className={`flex-1 py-4 text-center font-medium ${activeTab === 'requests' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('requests')}
        >
          Requests
        </button>
      </div>
      
      <div className="flex-1 px-4">
        {activeTab === 'activity' ? (
          <>
            {transactions.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-20">
                <div className="w-16 h-16 rounded-full bg-app-light-green flex items-center justify-center mb-4">
                  <Clock className="text-app-green" size={24} />
                </div>
                <h3 className="text-xl font-medium mb-2">No activity yet</h3>
                <p className="text-gray-500 max-w-xs">
                  When there is a new transaction, it will show up here.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {transactions.map((tx) => (
                  <div key={tx.id} className="p-4 border rounded-lg bg-white flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-full ${tx.type === 'send' ? 'bg-red-100' : 'bg-green-100'} flex items-center justify-center mr-3`}>
                        {tx.type === 'send' ? (
                          <ArrowUpRight className="text-red-500" size={20} />
                        ) : (
                          <ArrowDownLeft className="text-green-500" size={20} />
                        )}
                      </div>
                      <div>
                        <div className="font-medium">
                          {tx.type === 'send' ? 'Sent to ' + (tx.recipient || 'Unknown') : 
                           tx.type === 'receive' ? 'Received from ' + (tx.sender || 'Unknown') :
                           tx.type === 'deposit' ? 'Added funds' :
                           'Money request'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {format(tx.timestamp, 'MMM d, yyyy • h:mm a')}
                        </div>
                      </div>
                    </div>
                    <div className={`font-medium ${tx.type === 'send' ? 'text-red-500' : 'text-green-500'}`}>
                      {tx.type === 'send' ? '-' : '+'} ${tx.amount.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            {pendingRequests.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-20">
                <div className="w-16 h-16 rounded-full bg-app-light-green flex items-center justify-center mb-4">
                  <Clock className="text-app-green" size={24} />
                </div>
                <h3 className="text-xl font-medium mb-2">No requests yet</h3>
                <p className="text-gray-500 max-w-xs">
                  Money requests that you've sent will appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingRequests.map((request) => (
                  <div key={request.id} className="p-4 border rounded-lg bg-white">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">Request to {request.recipient}</div>
                      <div className="text-amber-500 font-medium">Pending</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        {format(request.timestamp, 'MMM d, yyyy • h:mm a')}
                      </div>
                      <div className="font-medium">${request.amount.toFixed(2)}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Activity;
