
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

interface CountrySelectorProps {
  selectedCountry: {
    code: string;
    flag: string;
    dialCode: string;
  };
  onChange: (country: { code: string; flag: string; dialCode: string }) => void;
  className?: string;
}

const countries = [
  { code: 'IN', flag: '🇮🇳', dialCode: '+91' },
  { code: 'US', flag: '🇺🇸', dialCode: '+1' },
  { code: 'GB', flag: '🇬🇧', dialCode: '+44' },
  { code: 'CA', flag: '🇨🇦', dialCode: '+1' },
  { code: 'AU', flag: '🇦🇺', dialCode: '+61' },
];

const CountrySelector: React.FC<CountrySelectorProps> = ({
  selectedCountry,
  onChange,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        className={cn(
          "flex items-center gap-1 py-2 px-3 rounded-md bg-app-gray",
          className
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-xl mr-1">{selectedCountry.flag}</span>
        <span className="font-medium">{selectedCountry.code}</span>
        <ChevronDown size={16} className="ml-1" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-full bg-white rounded-md shadow-lg z-10">
          <ul className="py-1">
            {countries.map((country) => (
              <li key={country.code}>
                <button
                  type="button"
                  className="flex items-center w-full px-3 py-2 hover:bg-app-gray"
                  onClick={() => {
                    onChange(country);
                    setIsOpen(false);
                  }}
                >
                  <span className="text-xl mr-2">{country.flag}</span>
                  <span>{country.code}</span>
                  <span className="ml-2 text-app-text-gray">{country.dialCode}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CountrySelector;
