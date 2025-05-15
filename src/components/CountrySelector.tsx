import React from "react";
import { cn } from "../lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

interface CountrySelectorProps {
  selectedCountry: {
    code: string;
    flag: string;
    dialCode: string;
  };
  onChange: (country: { code: string; flag: string; dialCode: string }) => void;
  className?: string;
}

export const countries = [
  { code: "AF", flag: "AF", dialCode: "+93" }, // Afghanistan
  { code: "AL", flag: "AL", dialCode: "+355" }, // Albania
  { code: "DZ", flag: "DZ", dialCode: "+213" }, // Algeria
  { code: "AD", flag: "AD", dialCode: "+376" }, // Andorra
  { code: "AO", flag: "AO", dialCode: "+244" }, // Angola
  { code: "AG", flag: "AG", dialCode: "+1" }, // Antigua and Barbuda
  { code: "AR", flag: "AR", dialCode: "+54" }, // Argentina
  { code: "AM", flag: "AM", dialCode: "+374" }, // Armenia
  { code: "AU", flag: "AU", dialCode: "+61" }, // Australia
  { code: "AT", flag: "AT", dialCode: "+43" }, // Austria
  { code: "AZ", flag: "AZ", dialCode: "+994" }, // Azerbaijan
  { code: "BS", flag: "BS", dialCode: "+1" }, // Bahamas
  { code: "BH", flag: "BH", dialCode: "+973" }, // Bahrain
  { code: "BD", flag: "BD", dialCode: "+880" }, // Bangladesh
  { code: "BB", flag: "BB", dialCode: "+1" }, // Barbados
  { code: "BY", flag: "BY", dialCode: "+375" }, // Belarus
  { code: "BE", flag: "BE", dialCode: "+32" }, // Belgium
  { code: "BZ", flag: "BZ", dialCode: "+501" }, // Belize
  { code: "BJ", flag: "BJ", dialCode: "+229" }, // Benin
  { code: "BT", flag: "BT", dialCode: "+975" }, // Bhutan
  { code: "BO", flag: "BO", dialCode: "+591" }, // Bolivia
  { code: "BA", flag: "BA", dialCode: "+387" }, // Bosnia and Herzegovina
  { code: "BW", flag: "BW", dialCode: "+267" }, // Botswana
  { code: "BR", flag: "BR", dialCode: "+55" }, // Brazil
  { code: "BN", flag: "BN", dialCode: "+673" }, // Brunei
  { code: "BG", flag: "BG", dialCode: "+359" }, // Bulgaria
  { code: "BF", flag: "BF", dialCode: "+226" }, // Burkina Faso
  { code: "BI", flag: "BI", dialCode: "+257" }, // Burundi
  { code: "KH", flag: "KH", dialCode: "+855" }, // Cambodia
  { code: "CM", flag: "CM", dialCode: "+237" }, // Cameroon
  { code: "CA", flag: "CA", dialCode: "+1" }, // Canada
  { code: "CV", flag: "CV", dialCode: "+238" }, // Cape Verde
  { code: "CF", flag: "CF", dialCode: "+236" }, // Central African Republic
  { code: "TD", flag: "TD", dialCode: "+235" }, // Chad
  { code: "CL", flag: "CL", dialCode: "+56" }, // Chile
  { code: "CN", flag: "CN", dialCode: "+86" }, // China
  { code: "CO", flag: "CO", dialCode: "+57" }, // Colombia
  { code: "KM", flag: "KM", dialCode: "+269" }, // Comoros
  { code: "CG", flag: "CG", dialCode: "+242" }, // Congo
  { code: "CR", flag: "CR", dialCode: "+506" }, // Costa Rica
  { code: "HR", flag: "HR", dialCode: "+385" }, // Croatia
  { code: "CU", flag: "CU", dialCode: "+53" }, // Cuba
  { code: "CY", flag: "CY", dialCode: "+357" }, // Cyprus
  { code: "CZ", flag: "CZ", dialCode: "+420" }, // Czech Republic
  { code: "DK", flag: "DK", dialCode: "+45" }, // Denmark
  { code: "DJ", flag: "DJ", dialCode: "+253" }, // Djibouti
  { code: "DM", flag: "DM", dialCode: "+1" }, // Dominica
  { code: "DO", flag: "DO", dialCode: "+1" }, // Dominican Republic
  { code: "EC", flag: "EC", dialCode: "+593" }, // Ecuador
  { code: "EG", flag: "EG", dialCode: "+20" }, // Egypt
  { code: "SV", flag: "SV", dialCode: "+503" }, // El Salvador
  { code: "GQ", flag: "GQ", dialCode: "+240" }, // Equatorial Guinea
  { code: "ER", flag: "ER", dialCode: "+291" }, // Eritrea
  { code: "EE", flag: "EE", dialCode: "+372" }, // Estonia
  { code: "ET", flag: "ET", dialCode: "+251" }, // Ethiopia
  { code: "FJ", flag: "FJ", dialCode: "+679" }, // Fiji
  { code: "FI", flag: "FI", dialCode: "+358" }, // Finland
  { code: "FR", flag: "FR", dialCode: "+33" }, // France
  { code: "GA", flag: "GA", dialCode: "+241" }, // Gabon
  { code: "GM", flag: "GM", dialCode: "+220" }, // Gambia
  { code: "GE", flag: "GE", dialCode: "+995" }, // Georgia
  { code: "DE", flag: "DE", dialCode: "+49" }, // Germany
  { code: "GH", flag: "GH", dialCode: "+233" }, // Ghana
  { code: "GR", flag: "GR", dialCode: "+30" }, // Greece
  { code: "GD", flag: "GD", dialCode: "+1" }, // Grenada
  { code: "GT", flag: "GT", dialCode: "+502" }, // Guatemala
  { code: "GN", flag: "GN", dialCode: "+224" }, // Guinea
  { code: "GW", flag: "GW", dialCode: "+245" }, // Guinea-Bissau
  { code: "GY", flag: "GY", dialCode: "+592" }, // Guyana
  { code: "HT", flag: "HT", dialCode: "+509" }, // Haiti
  { code: "HN", flag: "HN", dialCode: "+504" }, // Honduras
  { code: "HK", flag: "HK", dialCode: "+852" }, // Hong Kong
  { code: "HU", flag: "HU", dialCode: "+36" }, // Hungary
  { code: "IS", flag: "IS", dialCode: "+354" }, // Iceland
  { code: "IN", flag: "IN", dialCode: "+91" }, // India
  { code: "ID", flag: "ID", dialCode: "+62" }, // Indonesia
  { code: "IR", flag: "IR", dialCode: "+98" }, // Iran
  { code: "IQ", flag: "IQ", dialCode: "+964" }, // Iraq
  { code: "IE", flag: "IE", dialCode: "+353" }, // Ireland
  { code: "IL", flag: "IL", dialCode: "+972" }, // Israel
  { code: "IT", flag: "IT", dialCode: "+39" }, // Italy
  { code: "JM", flag: "JM", dialCode: "+1" }, // Jamaica
  { code: "JP", flag: "JP", dialCode: "+81" }, // Japan
  { code: "JO", flag: "JO", dialCode: "+962" }, // Jordan
  { code: "KZ", flag: "KZ", dialCode: "+7" }, // Kazakhstan
  { code: "KE", flag: "KE", dialCode: "+254" }, // Kenya
  { code: "KI", flag: "KI", dialCode: "+686" }, // Kiribati
  { code: "KP", flag: "KP", dialCode: "+850" }, // North Korea
  { code: "KR", flag: "KR", dialCode: "+82" }, // South Korea
  { code: "KW", flag: "KW", dialCode: "+965" }, // Kuwait
  { code: "KG", flag: "KG", dialCode: "+996" }, // Kyrgyzstan
  { code: "LA", flag: "LA", dialCode: "+856" }, // Laos
  { code: "LV", flag: "LV", dialCode: "+371" }, // Latvia
  { code: "LB", flag: "LB", dialCode: "+961" }, // Lebanon
  { code: "LS", flag: "LS", dialCode: "+266" }, // Lesotho
  { code: "LR", flag: "LR", dialCode: "+231" }, // Liberia
  { code: "LY", flag: "LY", dialCode: "+218" }, // Libya
  { code: "LI", flag: "LI", dialCode: "+423" }, // Liechtenstein
  { code: "LT", flag: "LT", dialCode: "+370" }, // Lithuania
  { code: "LU", flag: "LU", dialCode: "+352" }, // Luxembourg
  { code: "MO", flag: "MO", dialCode: "+853" }, // Macau
  { code: "MK", flag: "MK", dialCode: "+389" }, // North Macedonia
  { code: "MG", flag: "MG", dialCode: "+261" }, // Madagascar
  { code: "MW", flag: "MW", dialCode: "+265" }, // Malawi
  { code: "MY", flag: "MY", dialCode: "+60" }, // Malaysia
  { code: "MV", flag: "MV", dialCode: "+960" }, // Maldives
  { code: "ML", flag: "ML", dialCode: "+223" }, // Mali
  { code: "MT", flag: "MT", dialCode: "+356" }, // Malta
  { code: "MH", flag: "MH", dialCode: "+692" }, // Marshall Islands
  { code: "MR", flag: "MR", dialCode: "+222" }, // Mauritania
  { code: "MU", flag: "MU", dialCode: "+230" }, // Mauritius
  { code: "MX", flag: "MX", dialCode: "+52" }, // Mexico
  { code: "FM", flag: "FM", dialCode: "+691" }, // Micronesia
  { code: "MD", flag: "MD", dialCode: "+373" }, // Moldova
  { code: "MC", flag: "MC", dialCode: "+377" }, // Monaco
  { code: "MN", flag: "MN", dialCode: "+976" }, // Mongolia
  { code: "ME", flag: "ME", dialCode: "+382" }, // Montenegro
  { code: "MA", flag: "MA", dialCode: "+212" }, // Morocco
  { code: "MZ", flag: "MZ", dialCode: "+258" }, // Mozambique
  { code: "MM", flag: "MM", dialCode: "+95" }, // Myanmar
  { code: "NA", flag: "NA", dialCode: "+264" }, // Namibia
  { code: "NR", flag: "NR", dialCode: "+674" }, // Nauru
  { code: "NP", flag: "NP", dialCode: "+977" }, // Nepal
  { code: "NL", flag: "NL", dialCode: "+31" }, // Netherlands
  { code: "NZ", flag: "NZ", dialCode: "+64" }, // New Zealand
  { code: "NI", flag: "NI", dialCode: "+505" }, // Nicaragua
  { code: "NE", flag: "NE", dialCode: "+227" }, // Niger
  { code: "NG", flag: "NG", dialCode: "+234" }, // Nigeria
  { code: "NO", flag: "NO", dialCode: "+47" }, // Norway
  { code: "OM", flag: "OM", dialCode: "+968" }, // Oman
  { code: "PK", flag: "PK", dialCode: "+92" }, // Pakistan
  { code: "PW", flag: "PW", dialCode: "+680" }, // Palau
  { code: "PS", flag: "PS", dialCode: "+970" }, // Palestine
  { code: "PA", flag: "PA", dialCode: "+507" }, // Panama
  { code: "PG", flag: "PG", dialCode: "+675" }, // Papua New Guinea
  { code: "PY", flag: "PY", dialCode: "+595" }, // Paraguay
  { code: "PE", flag: "PE", dialCode: "+51" }, // Peru
  { code: "PH", flag: "PH", dialCode: "+63" }, // Philippines
  { code: "PL", flag: "PL", dialCode: "+48" }, // Poland
  { code: "PT", flag: "PT", dialCode: "+351" }, // Portugal
  { code: "QA", flag: "QA", dialCode: "+974" }, // Qatar
  { code: "RO", flag: "RO", dialCode: "+40" }, // Romania
  { code: "RU", flag: "RU", dialCode: "+7" }, // Russia
  { code: "RW", flag: "RW", dialCode: "+250" }, // Rwanda
  { code: "KN", flag: "KN", dialCode: "+1" }, // Saint Kitts and Nevis
  { code: "LC", flag: "LC", dialCode: "+1" }, // Saint Lucia
  { code: "VC", flag: "VC", dialCode: "+1" }, // Saint Vincent and the Grenadines
  { code: "WS", flag: "WS", dialCode: "+685" }, // Samoa
  { code: "SM", flag: "SM", dialCode: "+378" }, // San Marino
  { code: "ST", flag: "ST", dialCode: "+239" }, // Sao Tome and Principe
  { code: "SA", flag: "SA", dialCode: "+966" }, // Saudi Arabia
  { code: "SN", flag: "SN", dialCode: "+221" }, // Senegal
  { code: "RS", flag: "RS", dialCode: "+381" }, // Serbia
  { code: "SC", flag: "SC", dialCode: "+248" }, // Seychelles
  { code: "SL", flag: "SL", dialCode: "+232" }, // Sierra Leone
  { code: "SG", flag: "SG", dialCode: "+65" }, // Singapore
  { code: "SK", flag: "SK", dialCode: "+421" }, // Slovakia
  { code: "SI", flag: "SI", dialCode: "+386" }, // Slovenia
  { code: "SB", flag: "SB", dialCode: "+677" }, // Solomon Islands
  { code: "SO", flag: "SO", dialCode: "+252" }, // Somalia
  { code: "ZA", flag: "ZA", dialCode: "+27" }, // South Africa
  { code: "SS", flag: "SS", dialCode: "+211" }, // South Sudan
  { code: "ES", flag: "ES", dialCode: "+34" }, // Spain
  { code: "LK", flag: "LK", dialCode: "+94" }, // Sri Lanka
  { code: "SD", flag: "SD", dialCode: "+249" }, // Sudan
  { code: "SR", flag: "SR", dialCode: "+597" }, // Suriname
  { code: "SE", flag: "SE", dialCode: "+46" }, // Sweden
  { code: "CH", flag: "CH", dialCode: "+41" }, // Switzerland
  { code: "SY", flag: "SY", dialCode: "+963" }, // Syria
  { code: "TW", flag: "TW", dialCode: "+886" }, // Taiwan
  { code: "TJ", flag: "TJ", dialCode: "+992" }, // Tajikistan
  { code: "TZ", flag: "TZ", dialCode: "+255" }, // Tanzania
  { code: "TH", flag: "TH", dialCode: "+66" }, // Thailand
  { code: "TL", flag: "TL", dialCode: "+670" }, // Timor-Leste
  { code: "TG", flag: "TG", dialCode: "+228" }, // Togo
  { code: "TO", flag: "TO", dialCode: "+676" }, // Tonga
  { code: "TT", flag: "TT", dialCode: "+1" }, // Trinidad and Tobago
  { code: "TN", flag: "TN", dialCode: "+216" }, // Tunisia
  { code: "TR", flag: "TR", dialCode: "+90" }, // Turkey
  { code: "TM", flag: "TM", dialCode: "+993" }, // Turkmenistan
  { code: "TV", flag: "TV", dialCode: "+688" }, // Tuvalu
  { code: "UG", flag: "UG", dialCode: "+256" }, // Uganda
  { code: "UA", flag: "UA", dialCode: "+380" }, // Ukraine
  { code: "AE", flag: "AE", dialCode: "+971" }, // United Arab Emirates
  { code: "GB", flag: "GB", dialCode: "+44" }, // United Kingdom
  { code: "US", flag: "US", dialCode: "+1" }, // United States
  { code: "UY", flag: "UY", dialCode: "+598" }, // Uruguay
  { code: "UZ", flag: "UZ", dialCode: "+998" }, // Uzbekistan
  { code: "VU", flag: "VU", dialCode: "+678" }, // Vanuatu
  { code: "VA", flag: "VA", dialCode: "+379" }, // Vatican City
  { code: "VE", flag: "VE", dialCode: "+58" }, // Venezuela
  { code: "VN", flag: "VN", dialCode: "+84" }, // Vietnam
  { code: "YE", flag: "YE", dialCode: "+967" }, // Yemen
  { code: "ZM", flag: "ZM", dialCode: "+260" }, // Zambia
  { code: "ZW", flag: "ZW", dialCode: "+263" }, // Zimbabwe
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
