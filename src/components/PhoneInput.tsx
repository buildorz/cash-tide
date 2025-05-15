import React, { useState } from "react";
import CountrySelector from "./CountrySelector";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  setCountry: (country: { code: string; flag: string; dialCode: string }) => void;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChange,
  placeholder = "Phone number",
  setCountry
}) => {
  const [selectedCountry, setSelectedCountry] = useState({
    code: "US",
    flag: "US",
    dialCode: "+1",
  });

  const handleCountryChange = (country: {
    code: string;
    flag: string;
    dialCode: string;
  }) => {
    setSelectedCountry(country);
    setCountry(country);
    // immediately emit a new combined value if there's already a phone number
    if (value) {
      const digits = value.replace(/\D/g, "").slice(0, 10);
      onChange(`${country.dialCode} ${digits}`);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // strip non-digits
    const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
    // combine with dial code, e.g. "+91 7012345678"
    const combined = `${selectedCountry.dialCode} ${digits}`;
    onChange(combined);
  };

  return (
    <div className="space-y-1">
      <label
        htmlFor="phone-input"
        className="text-sm font-medium text-[#0E121B]"
      >
        Phone Number <span className="text-[#335CFF]">*</span>
      </label>

      <div className="flex items-stretch w-full gap-1">
        <CountrySelector
          selectedCountry={selectedCountry}
          onChange={handleCountryChange}
          className="shrink-0"
        />
        <input
          id="phone-input"
          type="tel"
          value={value.startsWith(selectedCountry.dialCode) ? value.slice(selectedCountry.dialCode.length + 1) : value}
          onChange={handlePhoneChange}
          placeholder={placeholder}
          className="flex-1 px-4 py-2 rounded-md bg-white border border-[#E1E4EA] text-base placeholder:text-sm font-normal focus:outline-none w-full"
        />
      </div>
    </div>
  );
};

export default PhoneInput;
