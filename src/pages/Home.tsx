
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Button from '@/components/Button';
import { useWallet } from '@/context/WalletContext';
import { Settings, Clock, Send, ReceiptText, Plus } from 'lucide-react';

const Home: React.FC = () => {
  const { balance } = useWallet();
  const navigate = useNavigate();

  return (
    <div className="app-container flex flex-col min-h-screen">
      <Header showLogo showSettings showHistory />

      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="mt-8 mb-2 text-gray-500">Your Balance</div>
        <div className="text-6xl font-bold mb-2">${balance.toFixed(2)}</div>
        <div className="text-gray-500 mb-16">{balance.toFixed(2)}</div>



        <div className="grid grid-cols-3 gap-7 w-full max-w-xs mx-auto mb-8">
          {/* Request */}
          <div className="flex flex-col items-center">
            <button
              onClick={() => navigate('/request')}
              className="w-16 h-16 rounded-full bg-app-light-green flex items-center justify-center mb-2"
            >
              <ReceiptText size={28} className="text-app-green" />
            </button>
            <span className="text-sm">Request</span>
          </div>
          {/* Fund */}
          <div className="flex flex-col items-center">
            <button
              onClick={() => navigate('/add-funds')}
              className="w-16 h-16 rounded-full bg-app-light-green flex items-center justify-center mb-2"
            >
              <Plus size={28} className="text-app-green" />
            </button>
            <span className="text-sm">Fund</span>
          </div>
          {/* Send */}
          <div className="flex flex-col items-center">
            <button
              onClick={() => navigate('/send')}
              className="w-16 h-16 rounded-full bg-app-light-green flex items-center justify-center mb-2"
            >
              <Send size={28} className="text-app-green" />
            </button>
            <span className="text-sm">Send</span>
          </div>
        </div>


      </div>

      <div className="p-4">
        <Button
          className="w-full"
          onClick={() => navigate('/send')}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default Home;
