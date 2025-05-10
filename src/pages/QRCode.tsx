import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Share2 } from "lucide-react";
import { showSuccess } from "../lib/utils";
import Logo from "../components/Logo";
import { useAuth } from "../context/AuthContext";
import { QRCodeSVG } from "qrcode.react";

const QRCode: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"my-code" | "scan">("my-code");

  const { user } = useAuth();

  const handleShare = () => {
    showSuccess(
      "Link copied!",
      "Your payment link has been copied to clipboard"
    );
  };

  console.log(user);

  return (
    <div className="container max-w-md mx-auto pt-6">
      <h1 className="text-2xl font-bold mb-6">QR Code</h1>

      <div className="tabs flex border-b mb-4">
        <button
          className={`flex-1 py-4 text-center font-medium ${
            activeTab === "my-code"
              ? "border-b-2 border-primary text-primary"
              : ""
          }`}
          onClick={() => setActiveTab("my-code")}
        >
          My Code
        </button>
        <button
          className={`flex-1 py-4 text-center font-medium ${
            activeTab === "scan" ? "border-b-2 border-primary text-primary" : ""
          }`}
          onClick={() => setActiveTab("scan")}
        >
          Scan
        </button>
      </div>

      <div className="py-6">
        {activeTab === "my-code" ? (
          <>
            <h2 className="text-2xl font-bold mb-8 text-center">
              Scan to receive money
            </h2>

            <div className="bg-background p-6 rounded-lg border border-border shadow-sm mb-10">
              <div className="flex justify-center mb-4">
                <Logo />
              </div>
              <div className="w-full h-64 ">
                <QRCodeSVG
                  value={user?.phone.number}
                  title={"CashTide QR Code"}
                  className="size-full"
                  bgColor={"#ffffff"}
                  fgColor={"#000000"}
                  level={"L"}
                  imageSettings={{
                    src: "/favicon.svg",
                    x: undefined,
                    y: undefined,
                    height: 20,
                    width: 20,
                    opacity: 1,
                    excavate: true,
                  }}
                />
              </div>
            </div>

            <Button className="w-full" onClick={handleShare}>
              <Share2 size={18} className="mr-2" />
              Share request link
            </Button>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">Scan QR code to pay</h2>
              <p className="text-muted-foreground">
                Point your camera at a CashTide QR code to make a payment
              </p>
            </div>

            <div className="w-full h-64 border-2 border-dashed border-muted rounded-lg flex items-center justify-center mb-4">
              <div className="text-center text-muted-foreground">
                Camera access required
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QRCode;
