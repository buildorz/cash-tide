import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AmountInput from "@/components/AmountInput";
import PhoneInput from "@/components/PhoneInput";
import Button from "@/components/Button";
import { useWallet } from "@/context/WalletContext";
import { Plus, ArrowLeft, Send as SendIcon, User2 } from "lucide-react";
import { Card } from "@/components/ui/card";

import { formatEther } from "viem";
import { useSmartWalletBalance } from "@/hooks/use-balance";

type Step = "amount" | "recipient" | "summary";

const Send: React.FC = () => {
  const navigate = useNavigate();
  const { balance, sendMoney } = useWallet();
  const balanceWei = useSmartWalletBalance();
  const balanceEth = balanceWei ? parseFloat(formatEther(balanceWei)) : 0;

  const [step, setStep] = useState<Step>("amount");
  const [amount, setAmount] = useState("0.00");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleContinue = () => {
    if (step === "amount" && parseFloat(amount) > 0) {
      setStep("recipient");
    } else if (step === "recipient" && phoneNumber.length >= 10) {
      setStep("summary");
    }
  };

  const handleBack = () => {
    if (step === "recipient") {
      setStep("amount");
    } else if (step === "summary") {
      setStep("recipient");
    }
  };

  const handleSend = async () => {
    const success = await sendMoney(parseFloat(amount), "0xdDF57A3d065F74a83Bfa7F3bC1D0461e63d485AF");
    if (success) {
      navigate("/home");
    }
  };

  const handleAddFunds = () => {
    navigate("/add-funds");
  };

  const insufficientFunds = balanceEth < balance;

  const renderStep = () => {
    switch (step) {
      case "amount":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="text-sm text-muted-foreground">
                Balance: ${balanceEth.toFixed(2)}
              </div>
            </div>
            <div className="text-center mb-4">
              <h1 className="text-2xl font-bold mb-2">Send Money</h1>
              <p className="text-muted-foreground">Enter the amount to send</p>
            </div>
            <AmountInput value={amount} onChange={setAmount} />
          </div>
        );

      case "recipient":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <Button variant="ghost" size="sm" onClick={handleBack}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="text-sm text-muted-foreground">
                Amount: ${amount}
              </div>
            </div>
            <div className="space-y-6">
              <div className="text-center">
                <h1 className="text-2xl font-bold mb-2">Recipient</h1>
                <p className="text-muted-foreground">
                  Enter the recipient's phone number
                </p>
              </div>

              <Card className="p-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-1">
                    <PhoneInput
                      setCountry={() => { }}
                      value={phoneNumber}
                      onChange={setPhoneNumber}
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>
              </Card>
            </div>
          </div>
        );

      case "summary":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <Button variant="ghost" size="sm" onClick={handleBack}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="text-sm font-medium">Transaction Summary</div>
            </div>

            <Card className="p-6">
              <div className="space-y-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Sending</p>
                  <div className="text-4xl font-bold mb-1">${amount}</div>
                  <p className="text-sm text-muted-foreground">
                    Available balance: ${balance.toFixed(2)}
                  </p>
                </div>

                <div className="h-px bg-border" />

                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">To</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <User2 className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">
                        +91 {phoneNumber}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Mobile Number
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <p className="text-xs text-center text-muted-foreground">
              By continuing, you agree that this transaction cannot be reversed
            </p>
          </div>
        );
    }
  };

  return (
    <div className="max-w-md mx-auto h-[calc(100vh-4rem)] flex flex-col ">
      <div className="">{renderStep()}</div>

      <div className="py-4">
        {step === "summary" ? (
          insufficientFunds ? (
            <Button
              onClick={handleAddFunds}
              className="w-full bg-primary"
              size="lg"
            >
              <Plus className="mr-2 h-5 w-5" />
              Add funds
            </Button>
          ) : (
            <Button onClick={handleSend} className="w-full" size="lg">
              <SendIcon className="mr-2 h-5 w-5" />
              Send Money
            </Button>
          )
        ) : (
          <Button
            onClick={handleContinue}
            className="w-full"
            size="lg"
            disabled={
              (step === "amount" && parseFloat(amount) <= 0) ||
              (step === "recipient" && phoneNumber.length < 10)
            }
          >
            Continue
          </Button>
        )}
      </div>
    </div>
  );
};

export default Send;
