import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import AmountInput from "@/components/AmountInput";
import Button from "@/components/Button";
import { useWallet } from "@/context/WalletContext";
import { CreditCard, Apple, SmartphoneNfc } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const AddFunds: React.FC = () => {
  const [amount, setAmount] = useState("0.00");
  const [selectedMethod, setSelectedMethod] = useState<
    "card" | "apple_pay" | "google_pay"
  >("card");
  const navigate = useNavigate();
  const { addFunds } = useWallet();

  const handleAddFunds = async () => {
    if (parseFloat(amount) <= 0) return;

    const success = await addFunds(parseFloat(amount), selectedMethod);
    if (success) {
      navigate("/home");
    }
  };

  return (
    <div className="max-w-7xl mx-auto md:p-6">
      <Header title="Add Funds" showBackButton />

      <div className="grid gap-6 p-4 md:p-0">
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="mb-8">
              <AmountInput value={amount} onChange={setAmount} />
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Payment method</h3>

              <div className="space-y-3">
                <button
                  className={`w-full p-4 rounded-lg flex items-center justify-between ${
                    selectedMethod === "card"
                      ? "bg-primary/10 border border-primary"
                      : "bg-muted"
                  }`}
                  onClick={() => setSelectedMethod("card")}
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-3">
                      <CreditCard className="text-primary" size={20} />
                    </div>
                    <span>Credit/Debit Card</span>
                  </div>
                  <div className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center">
                    {selectedMethod === "card" && (
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                    )}
                  </div>
                </button>

                <button
                  className={`w-full p-4 rounded-lg flex items-center justify-between ${
                    selectedMethod === "apple_pay"
                      ? "bg-primary/10 border border-primary"
                      : "bg-muted"
                  }`}
                  onClick={() => setSelectedMethod("apple_pay")}
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-3">
                      <Apple className="text-black" size={20} />
                    </div>
                    <span>Apple Pay</span>
                  </div>
                  <div className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center">
                    {selectedMethod === "apple_pay" && (
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                    )}
                  </div>
                </button>

                <button
                  className={`w-full p-4 rounded-lg flex items-center justify-between ${
                    selectedMethod === "google_pay"
                      ? "bg-primary/10 border border-primary"
                      : "bg-muted"
                  }`}
                  onClick={() => setSelectedMethod("google_pay")}
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-3">
                      <SmartphoneNfc className="text-black" size={20} />
                    </div>
                    <span>Google Pay</span>
                  </div>
                  <div className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center">
                    {selectedMethod === "google_pay" && (
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                    )}
                  </div>
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="fixed bottom-6 left-0 right-0 p-4 md:relative md:p-0 md:mt-6">
        <Button
          onClick={handleAddFunds}
          className="w-full"
          disabled={parseFloat(amount) <= 0}
        >
          Add Funds
        </Button>
      </div>
    </div>
  );
};

export default AddFunds;
