
import React, { useState } from 'react';
import NumPad from './NumPad';

interface AmountInputProps {
  value: string;
  onChange: (value: string) => void;
  currency?: string;
}

const AmountInput: React.FC<AmountInputProps> = ({ 
  value, 
  onChange, 
  currency = '$' 
}) => {
  const handleNumberClick = (num: number) => {
    let newValue = value === '0.00' ? num.toString() : value + num.toString();
    
    // Format value to proper money format
    // Remove any non-numeric characters
    newValue = newValue.replace(/[^0-9]/g, '');
    
    // Handle decimal point
    if (newValue.length <= 2) {
      // For values less than $1
      newValue = '0.' + newValue.padStart(2, '0');
    } else {
      // For values $1 and above
      newValue = newValue.slice(0, -2) + '.' + newValue.slice(-2);
    }
    
    onChange(newValue);
  };

  const handleDelete = () => {
    if (value === '0.00') return;
    
    // Remove one character
    let newValue = value.replace(/[^0-9]/g, '');
    newValue = newValue.slice(0, -1);
    
    if (newValue.length === 0) {
      onChange('0.00');
      return;
    }
    
    // Format the value
    if (newValue.length <= 2) {
      newValue = '0.' + newValue.padStart(2, '0');
    } else {
      newValue = newValue.slice(0, -2) + '.' + newValue.slice(-2);
    }
    
    onChange(newValue);
  };

  return (
    <div className="text-center">
      <div className="text-5xl font-bold mb-8 mt-4">
        {currency}{value}
      </div>
      <NumPad onNumberClick={handleNumberClick} onDelete={handleDelete} />
    </div>
  );
};

export default AmountInput;
