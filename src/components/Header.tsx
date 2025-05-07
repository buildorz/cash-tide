import React from "react";
import { ArrowLeft, Settings, History, QrCode } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  showLogo?: boolean;
  showSettings?: boolean;
  showHistory?: boolean;
  showQrCode?: boolean;
  className?: string;
  onBack?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  title,
  showBackButton = false,
  showLogo = false,
  showSettings = false,
  showHistory = false,
  showQrCode = false,
  className = "",
  onBack,
}) => {
  const navigate = useNavigate();

  return (
    <header className={`flex items-center justify-between py-4 ${className}`}>
      <div className="flex items-center">
        {showBackButton && (
          <button
            onClick={onBack ? onBack : () => navigate(-1)}
            className="mr-4 p-1 rounded-full hover:bg-app-gray"
          >
            <ArrowLeft size={24} />
          </button>
        )}
        {showLogo && <Logo />}
        {title && <h1 className="text-xl font-semibold">{title}</h1>}
      </div>

      <div className="flex items-center gap-4">
        {showHistory && (
          <button
            onClick={() => navigate("/activity")}
            className="p-1 rounded-full hover:bg-app-gray"
          >
            <History size={24} />
          </button>
        )}

        {showQrCode && (
          <button
            onClick={() => navigate("/qr")}
            className="p-1 rounded-full hover:bg-app-gray"
          >
            <QrCode size={24} />
          </button>
        )}

        {showSettings && (
          <button
            onClick={() => navigate("/settings")}
            className="p-1 rounded-full hover:bg-app-gray"
          >
            <Settings size={24} />
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
