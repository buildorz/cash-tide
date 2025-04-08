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
    // If current value is 0.00, replace it with the new number
    if (value === '0.00') {
      newValue = num.toString().padStart(value.length - 2, '0');
    } else {
      // Remove decimal point from current value and append new number
      newValue = value.replace('.', '') + num.toString();
    }

    // Remove any non-numeric characters
    newValue = newValue.replace(/[^0-9]/g, '');
    // Remove leading zeros except if the entire number is zero
    newValue = newValue.replace(/^0+(?=\d)/, '');

    // Format the value by adding decimal point
    // If length is 1, pad with a leading zero
    if (newValue.length === 1) {
      newValue = '0.0' + newValue;
    }
    // If length is 2, format as 0.XX
    else if (newValue.length === 2) {
      newValue = '0.' + newValue;
    }
    // For longer numbers, insert decimal point before last 2 digits
    else {
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

  // Format the display value, removing leading zeros
  const displayValue = value === '0.00' ? '' : value;

  return (
    <div className="text-center">
      <div className="text-5xl font-bold mb-8 mt-4">
        {displayValue ? currency + displayValue : currency}
      </div>
      <NumPad onNumberClick={handleNumberClick} onDelete={handleDelete} />
    </div>
  );
};

export default AmountInput;
