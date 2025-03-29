
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import PhoneInput from '@/components/PhoneInput';
import Button from '@/components/Button';

const SendTo: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { amount } = location.state || { amount: '0.00' };
  
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleContinue = () => {
    if (phoneNumber.length > 0) {
      navigate('/send/summary', { 
        state: { 
          amount, 
          recipient: {
            type: 'phone',
            value: phoneNumber
          }
        } 
      });
    }
  };

  return (
    <div className="app-container flex flex-col">
      <Header title="To" showBackButton />
      
      <div className="flex-1 px-4 py-6">
        <h2 className="text-3xl font-bold mb-8">
          Who will receive the money?
        </h2>
        
        <PhoneInput 
          value={phoneNumber}
          onChange={setPhoneNumber}
          placeholder="Enter phone number"
        />
      </div>
      
      <div className="p-4">
        <Button
          onClick={handleContinue}
          className="w-full"
          disabled={phoneNumber.length < 10}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default SendTo;
