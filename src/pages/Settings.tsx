
import React from 'react';
import Header from '@/components/Header';
import { useAuth } from '@/context/AuthContext';
import { User, CreditCard, Shield, Bell, HelpCircle, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Settings: React.FC = () => {
  const { user, logoutProcess } = useAuth();
  console.log('user => ', user);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutProcess();
    navigate('/login');
  };

  return (
    <div className="app-container flex flex-col">
      <Header title="Settings" showBackButton />

      <div className="flex-1 px-4 py-6">
        <div className="flex items-center mb-8">
          <div className="w-16 h-16 rounded-full bg-app-light-green flex items-center justify-center mr-4">
            <User className="text-app-green" size={24} />
          </div>
          <div>
            <div className="font-medium text-lg">{user ? String(user.email ? user.email.address : user.telegram ? user.telegram.username : "User") : 'User'}</div>
            <div className="text-gray-500">{user.phone ? String(user.phone) : ""}</div>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <SettingsItem
            icon={<User className="text-app-green" size={20} />}
            title="Account"
            description="Personal information"
          />

          <SettingsItem
            icon={<CreditCard className="text-app-green" size={20} />}
            title="Payment Methods"
            description="Connected cards and accounts"
          />

          <SettingsItem
            icon={<Shield className="text-app-green" size={20} />}
            title="Security"
            description="Password, authentication"
          />

          <SettingsItem
            icon={<Bell className="text-app-green" size={20} />}
            title="Notifications"
            description="Customize notifications"
          />

          <SettingsItem
            icon={<HelpCircle className="text-app-green" size={20} />}
            title="Help & Support"
            description="FAQs, contact support"
          />
        </div>

        <button
          className="flex items-center text-red-500 font-medium"
          onClick={handleLogout}
        >
          <LogOut size={20} className="mr-2" />
          Log out
        </button>
      </div>
    </div>
  );
};

interface SettingsItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const SettingsItem: React.FC<SettingsItemProps> = ({ icon, title, description }) => {
  return (
    <button className="w-full flex items-center p-4 rounded-lg hover:bg-app-gray">
      <div className="w-10 h-10 rounded-full bg-app-light-green flex items-center justify-center mr-3">
        {icon}
      </div>
      <div className="text-left flex-1">
        <div className="font-medium">{title}</div>
        <div className="text-sm text-gray-500">{description}</div>
      </div>
      <div className="text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m9 18 6-6-6-6" />
        </svg>
      </div>
    </button>
  );
};

export default Settings;
