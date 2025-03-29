
import React, { useState } from 'react';
import Header from '@/components/Header';
import Button from '@/components/Button';
import { Share2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const QRCode: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'my-code' | 'scan'>('my-code');
  const { toast } = useToast();

  const handleShare = () => {
    toast({
      title: "Link copied!",
      description: "Your payment link has been copied to clipboard",
    });
  };

  return (
    <div className="app-container flex flex-col">
      <Header showBackButton />
      
      <div className="tabs flex border-b mb-4">
        <button
          className={`flex-1 py-4 text-center font-medium ${activeTab === 'my-code' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('my-code')}
        >
          My Code
        </button>
        <button
          className={`flex-1 py-4 text-center font-medium ${activeTab === 'scan' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('scan')}
        >
          Scan
        </button>
      </div>
      
      <div className="flex-1 px-4 py-6">
        {activeTab === 'my-code' ? (
          <>
            <h2 className="text-2xl font-bold mb-8 text-center">
              Scan to receive money
            </h2>
            
            <div className="bg-white p-6 rounded-lg shadow-sm mb-10">
              <div className="flex justify-center mb-4">
                <Logo />
              </div>
              <div className="w-full h-64 bg-[url('/lovable-uploads/88522aae-2630-4fe3-b800-8d200de860be.png')] bg-contain bg-center bg-no-repeat"></div>
            </div>
            
            <Button 
              className="w-full"
              icon={<Share2 size={18} />}
              onClick={handleShare}
            >
              Share request link
            </Button>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">
                Scan QR code to pay
              </h2>
              <p className="text-gray-500">
                Point your camera at a CashTide QR code to make a payment
              </p>
            </div>
            
            <div className="w-full h-64 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-500">
                Camera access required
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Logo: React.FC = () => {
  return (
    <div className="flex items-center">
      <span className="font-bold text-2xl text-black">cash</span>
      <span className="font-bold text-2xl text-app-green">tide</span>
      <div className="w-2 h-2 rounded-full bg-app-green ml-1"></div>
    </div>
  );
};

export default QRCode;
