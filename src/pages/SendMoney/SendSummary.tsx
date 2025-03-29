
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Button from '@/components/Button';
import { useWallet } from '@/context/WalletContext';
import { Plus } from 'lucide-react';

const SendSummary: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { amount, recipient } = location.state || { amount: '0.00', recipient: { type: 'phone', value: '' } };
  
  const { balance, sendMoney } = useWallet();
  
  const handleSend = async () => {
    const success = await sendMoney(parseFloat(amount), recipient.value);
    if (success) {
      navigate('/home');
    }
  };

  const handleAddFunds = () => {
    navigate('/add-funds');
  };

  const insufficientFunds = parseFloat(amount) > balance;

  return (
    <div className="app-container flex flex-col">
      <Header title="Summary" showBackButton />
      
      <div className="flex-1 px-4 py-6">
        <div className="text-center mb-12">
          <div className="text-lg mb-2">You are Sending</div>
          <div className="text-5xl font-bold mb-2">${amount}</div>
          <div className="text-gray-500">Available: ${balance.toFixed(2)}</div>
        </div>
        
        <div className="mb-8">
          <div className="text-lg font-medium mb-4">To</div>
          <div className="bg-app-gray p-4 rounded-lg flex items-center">
            {recipient.type === 'phone' && (
              <>
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center mr-3">
                  🇮🇳
                </div>
                <div>
                  <div className="font-medium">IN</div>
                  <div>+91 {recipient.value}</div>
                </div>
              </>
            )}
          </div>
        </div>
        
        <div className="text-center text-sm text-gray-500 mb-8">
          *Transfers cannot be reversed
        </div>
      </div>
      
      <div className="p-4 space-y-3">
        {insufficientFunds ? (
          <Button
            onClick={handleAddFunds}
            className="w-full"
            icon={<Plus size={18} />}
          >
            Add funds
          </Button>
        ) : (
          <Button
            onClick={handleSend}
            className="w-full"
          >
            Send
          </Button>
        )}
      </div>
    </div>
  );
};

export default SendSummary;
