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
    const numericAmount = parseFloat(amount);
    if (numericAmount <= 0) return;

    const success = await addFunds(numericAmount, selectedMethod);
    if (success) {
      navigate("/home");
    }
  };

  return (
    <div className="max-w-7xl mx-auto md:p-6">
      <Header title="Add Funds" showBackButton />

      <div className="grid gap-6 md:p-0">
        <Card className="bg-card border-border">
          <CardContent className="p-3">
            <div className="mb-8">
              <AmountInput value={amount} onChange={setAmount} />
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Payment method</h3>

              <div className="space-y-3">
                {/* Credit/Debit Card */}
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
                    {selectedMethod === "card" && <div className="w-3 h-3 rounded-full bg-primary" />}
                  </div>
                </button>

                {/* Apple Pay */}
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
                    {selectedMethod === "apple_pay" && <div className="w-3 h-3 rounded-full bg-primary" />}
                  </div>
                </button>

                {/* Google Pay */}
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
                    {selectedMethod === "google_pay" && <div className="w-3 h-3 rounded-full bg-primary" />}
                  </div>
                </button>
              </div>
            </div>

            <Button
              onClick={handleAddFunds}
              className="w-full mt-6"
              disabled={parseFloat(amount) <= 0}
            >
              Add Funds
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddFunds;
