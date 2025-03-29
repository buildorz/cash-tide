
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import AmountInput from '@/components/AmountInput';
import Button from '@/components/Button';

const RequestAmount: React.FC = () => {
  const [amount, setAmount] = useState('0.00');
  const navigate = useNavigate();

  const handleContinue = () => {
    if (parseFloat(amount) > 0) {
      // Pass the amount to the next screen
      navigate('/request/from', { state: { amount } });
    }
  };

  return (
    <div className="app-container flex flex-col">
      <Header title="Request" showBackButton />
      
      <div className="flex-1 px-4 py-6">
        <AmountInput 
          value={amount} 
          onChange={setAmount} 
        />
      </div>
      
      <div className="p-4">
        <Button
          onClick={handleContinue}
          className="w-full"
          disabled={parseFloat(amount) <= 0}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default RequestAmount;
