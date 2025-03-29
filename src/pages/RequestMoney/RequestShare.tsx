
import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Button from '@/components/Button';
import { Share2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const RequestShare: React.FC = () => {
  const location = useLocation();
  const { amount } = location.state || { amount: '0.00' };
  const { toast } = useToast();
  
  const handleShare = () => {
    // In a real app, this would use the Web Share API
    // or create a shareable link
    toast({
      title: "Link copied!",
      description: "Payment request link has been copied to clipboard",
    });
  };

  return (
    <div className="app-container flex flex-col">
      <Header title="Request money" showBackButton />
      
      <div className="flex-1 px-4 py-6">
        <div className="text-center mb-12">
          <div className="text-lg mb-2">You are requesting</div>
          <div className="text-5xl font-bold mb-2">${amount}</div>
        </div>
        
        <div className="flex justify-center mb-8">
          <div className="w-64 h-64 border rounded-lg flex items-center justify-center bg-white">
            <div className="text-center">
              <div className="w-48 h-48 bg-[url('/lovable-uploads/88522aae-2630-4fe3-b800-8d200de860be.png')] bg-contain bg-center bg-no-repeat mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <Button
          onClick={handleShare}
          className="w-full"
          icon={<Share2 size={18} />}
        >
          Share request link
        </Button>
      </div>
    </div>
  );
};

export default RequestShare;
