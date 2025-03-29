
import React, { useState } from 'react';
import CountrySelector from './CountrySelector';

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const PhoneInput: React.FC<PhoneInputProps> = ({ value, onChange, placeholder = "Phone number" }) => {
  const [selectedCountry, setSelectedCountry] = useState({
    code: 'IN',
    flag: '🇮🇳',
    dialCode: '+91'
  });

  const handleCountryChange = (country: { code: string; flag: string; dialCode: string }) => {
    setSelectedCountry(country);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow digits
    const phoneNumber = e.target.value.replace(/\D/g, '');
    onChange(phoneNumber);
  };

  return (
    <div className="flex items-stretch w-full gap-2">
      <CountrySelector
        selectedCountry={selectedCountry}
        onChange={handleCountryChange}
        className="shrink-0"
      />
      <input
        type="tel"
        value={value}
        onChange={handlePhoneChange}
        placeholder={placeholder}
        className="flex-1 px-4 py-2 rounded-md bg-app-gray text-lg focus:outline-none"
      />
    </div>
  );
};

export default PhoneInput;
