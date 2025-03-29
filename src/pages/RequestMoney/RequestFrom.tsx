
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import PhoneInput from '@/components/PhoneInput';
import Button from '@/components/Button';
import { Share2 } from 'lucide-react';

const RequestFrom: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { amount } = location.state || { amount: '0.00' };
  
  const [requestType, setRequestType] = useState<'anyone' | 'specific'>('specific');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleContinue = () => {
    if (requestType === 'anyone') {
      navigate('/request/summary', { 
        state: { 
          amount,
          requestType,
        } 
      });
    } else if (phoneNumber.length > 0) {
      navigate('/request/summary', { 
        state: { 
          amount,
          requestType,
          from: {
            type: 'phone',
            value: phoneNumber
          }
        } 
      });
    }
  };

  return (
    <div className="app-container flex flex-col">
      <Header title="Request money" showBackButton />
      
      <div className="flex-1 px-4 py-6">
        <h2 className="text-3xl font-bold mb-8">
          Who do you want to request from?
        </h2>
        
        <div className="mb-8">
          <button 
            className={`w-full p-4 rounded-lg mb-4 flex items-center ${requestType === 'anyone' ? 'bg-app-light-green border border-app-green' : 'bg-app-gray'}`}
            onClick={() => setRequestType('anyone')}
          >
            <div className="w-10 h-10 rounded-full bg-app-light-green flex items-center justify-center mr-3">
              <Share2 className="text-app-green" size={20} />
            </div>
            <div className="text-left">
              <div className="font-medium">From anyone</div>
              <div className="text-sm text-gray-500">Generate a payment link</div>
            </div>
          </button>
          
          <div className="text-sm font-medium mb-3">From a specific number</div>
          <div onClick={() => setRequestType('specific')}>
            <PhoneInput 
              value={phoneNumber}
              onChange={setPhoneNumber}
              placeholder="Enter phone number"
            />
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <Button
          onClick={handleContinue}
          className="w-full"
          disabled={requestType === 'specific' && phoneNumber.length < 10}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default RequestFrom;
