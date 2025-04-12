import React from 'react';
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
    let newValue;
    
    // If current value is 0 or 0.00, replace it
    if (value === '0' || value === '0.00' || value === '') {
      newValue = num.toString();
    } else {
      // Otherwise append the number
      newValue = value.replace(/[^0-9]/g, '') + num.toString();
    }

    // Format the value as currency
    const numericValue = parseInt(newValue, 10);
    newValue = (numericValue / 100).toFixed(2);
    
    onChange(newValue);
  };

  const handleDelete = () => {
    // If value is already 0 or empty, do nothing
    if (value === '0' || value === '0.00' || value === '') {
      onChange('0');
      return;
    }
    
    // Remove one character from the numeric portion
    let newValue = value.replace(/[^0-9]/g, '');
    newValue = newValue.slice(0, -1);
    
    if (newValue.length === 0) {
      onChange('0');
      return;
    }
    
    // Format the remaining value as currency
    const numericValue = parseInt(newValue, 10);
    newValue = (numericValue / 100).toFixed(2);
    
    onChange(newValue);
  };

  // Format the display value
  const displayValue = value === '0' || value === '0.00' || value === '' ? '0' : value;

  return (
    <div className="text-center">
      <div className="text-5xl font-bold mb-8 mt-4">
        {currency}{displayValue}
      </div>
      <NumPad onNumberClick={handleNumberClick} onDelete={handleDelete} />
    </div>
  );
};

export default AmountInput;
