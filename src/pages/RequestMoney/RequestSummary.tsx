
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Button from '@/components/Button';
import { useWallet } from '@/context/WalletContext';
import { Share2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const RequestSummary: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { amount, requestType, from } = location.state || { 
    amount: '0.00', 
    requestType: 'specific',
    from: { type: 'phone', value: '' } 
  };
  
  const { requestMoney } = useWallet();
  const { user } = useAuth();
  
  const handleSendRequest = async () => {
    if (requestType === 'specific') {
      const success = await requestMoney(parseFloat(amount), from.value);
      if (success) {
        navigate('/home');
      }
    } else {
      // Handle sharing payment link
      navigate('/request/share', { state: { amount } });
    }
  };

  return (
    <div className="app-container flex flex-col">
      <Header title="Request money" showBackButton />
      
      <div className="flex-1 px-4 py-6">
        <div className="text-center mb-12">
          <div className="text-lg mb-2">You are requesting</div>
          <div className="text-5xl font-bold mb-2">${amount}</div>
        </div>
        
        {requestType === 'specific' && (
          <div className="mb-8">
            <div className="text-lg font-medium mb-4">From</div>
            <div className="bg-app-gray p-4 rounded-lg flex items-center">
              {from.type === 'phone' && (
                <>
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center mr-3">
                    🇮🇳
                  </div>
                  <div>
                    <div className="font-medium">IN</div>
                    <div>+91 {from.value}</div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <Button
          onClick={handleSendRequest}
          className="w-full"
          icon={requestType === 'anyone' ? <Share2 size={18} /> : undefined}
        >
          {requestType === 'specific' ? 'Send Request' : 'Share request link'}
        </Button>
      </div>
    </div>
  );
};

export default RequestSummary;
