import React from "react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  { code: "IN", flag: "IN", dialCode: "+91" },
  { code: "US", flag: "US", dialCode: "+1" },
  { code: "GB", flag: "GB", dialCode: "+44" },
  { code: "CA", flag: "CA", dialCode: "+1" },
  { code: "AU", flag: "AU", dialCode: "+61" },
  { code: "NG", flag: "NG", dialCode: "+234" },
  { code: "ZA", flag: "ZA", dialCode: "+27" },
];

const CountrySelector: React.FC<CountrySelectorProps> = ({
  selectedCountry,
  onChange,
  className,
}) => {
  return (
    <Select
      value={selectedCountry.code}
      onValueChange={(value) => {
        const country = countries.find((c) => c.code === value);
        if (country) {
          onChange(country);
        }
      }}
    >
      <SelectTrigger
        className={cn("w-fit bg-white border-[#E1E4EA]", className)}
      >
        <div className="flex items-center gap-2">
          <img
            src={`https://flagcdn.com/${selectedCountry.flag.toLowerCase()}.svg`}
            alt=""
            className="w-6 h-6"
          />
          <SelectValue>{selectedCountry.code}</SelectValue>
        </div>
      </SelectTrigger>
      <SelectContent>
        {countries.map((country) => (
          <SelectItem key={country.code} value={country.code}>
            <div className="flex items-center gap-2">
              <img
                src={`https://flagcdn.com/${country.flag.toLowerCase()}.svg`}
                alt=""
                className="w-6 h-6"
              />
              <span>{country.code}</span>
              <span className="text-app-text-gray">{country.dialCode}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CountrySelector;
