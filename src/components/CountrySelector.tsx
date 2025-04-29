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
  { code: "US", flag: "us", dialCode: "+1" },
  { code: "GB", flag: "gb", dialCode: "+44" },
  { code: "CA", flag: "ca", dialCode: "+1" },
  { code: "AU", flag: "au", dialCode: "+61" },
  { code: "DE", flag: "de", dialCode: "+49" },
  { code: "FR", flag: "fr", dialCode: "+33" },
  { code: "IN", flag: "in", dialCode: "+91" },
  { code: "IT", flag: "it", dialCode: "+39" },
  { code: "JP", flag: "jp", dialCode: "+81" },
  { code: "KR", flag: "kr", dialCode: "+82" },
  { code: "NL", flag: "nl", dialCode: "+31" },
  { code: "NZ", flag: "nz", dialCode: "+64" },
  { code: "SG", flag: "sg", dialCode: "+65" },
  { code: "ES", flag: "es", dialCode: "+34" },
  { code: "SE", flag: "se", dialCode: "+46" },
  { code: "CH", flag: "ch", dialCode: "+41" },
  { code: "AE", flag: "ae", dialCode: "+971" },
  { code: "BR", flag: "br", dialCode: "+55" },
  { code: "CN", flag: "cn", dialCode: "+86" },
  { code: "HK", flag: "hk", dialCode: "+852" },
  { code: "IE", flag: "ie", dialCode: "+353" },
  { code: "MX", flag: "mx", dialCode: "+52" },
  { code: "NG", flag: "ng", dialCode: "+234" },
  { code: "PH", flag: "ph", dialCode: "+63" },
  { code: "PL", flag: "pl", dialCode: "+48" },
  { code: "RO", flag: "ro", dialCode: "+40" },
  { code: "RU", flag: "ru", dialCode: "+7" },
  { code: "SA", flag: "sa", dialCode: "+966" },
  { code: "TH", flag: "th", dialCode: "+66" },
  { code: "TR", flag: "tr", dialCode: "+90" },
  { code: "UA", flag: "ua", dialCode: "+380" },
  { code: "VN", flag: "vn", dialCode: "+84" },
  { code: "ZA", flag: "za", dialCode: "+27" },
  { code: "MY", flag: "my", dialCode: "+60" },
  { code: "ID", flag: "id", dialCode: "+62" },
  { code: "PK", flag: "pk", dialCode: "+92" },
  { code: "BD", flag: "bd", dialCode: "+880" },
  { code: "EG", flag: "eg", dialCode: "+20" },
  { code: "KE", flag: "ke", dialCode: "+254" },
  { code: "GH", flag: "gh", dialCode: "+233" }
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
