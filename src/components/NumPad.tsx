
import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface NumPadProps {
  onNumberClick: (num: number) => void;
  onDelete: () => void;
}

const NumPad: React.FC<NumPadProps> = ({ onNumberClick, onDelete }) => {
  return (
    <div className="numpad-grid w-full max-w-xs mx-auto mt-8">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
        <div key={num} className="flex justify-center">
          <button
            className="numpad-button"
            onClick={() => onNumberClick(num)}
          >
            {num}
          </button>
        </div>
      ))}
      <div className="flex justify-center">
        <button className="numpad-button invisible"></button>
      </div>
      <div className="flex justify-center">
        <button 
          className="numpad-button"
          onClick={() => onNumberClick(0)}
        >
          0
        </button>
      </div>
      <div className="flex justify-center">
        <button 
          className="numpad-button"
          onClick={onDelete}
        >
          <ArrowLeft size={24} />
        </button>
      </div>
    </div>
  );
};

export default NumPad;
