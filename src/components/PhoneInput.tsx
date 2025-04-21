import React, { useState } from "react";
import CountrySelector from "./CountrySelector";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  setCountry: (value: string) => void;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChange,
  placeholder = "Phone number",
  setCountry
}) => {
  const [selectedCountry, setSelectedCountry] = useState({
    code: "IN",
    flag: "IN",
    dialCode: "+91",
  });

  const handleCountryChange = (country: {
    code: string;
    flag: string;
    dialCode: string;
  }) => {
    setSelectedCountry(country);
    setCountry(country.dialCode);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow digits
    const phoneNumber = e.target.value.replace(/\D/g, "");
    console.log("no: ", phoneNumber);
    onChange(phoneNumber);
  };

  return (
    <div className="space-y-1">
      <label
        htmlFor="phone-input"
        className="text-sm font-medium text-[#0E121B]"
      >
        Phone Number <span className="text-[#335CFF] tx">*</span>
      </label>

      <div className="flex items-stretch w-full gap-1">
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
          className="flex-1 px-4 py-2 rounded-md bg-white border border-[#E1E4EA] text-base placeholder:text-sm font-normal focus:outline-none w-full"
        />
      </div>
    </div>
  );
};

export default PhoneInput;
