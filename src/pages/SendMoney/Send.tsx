import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AmountInput from "../../components/AmountInput";
import PhoneInput from "../../components/PhoneInput";
import Button from "../../components/Button";
import { useWallet } from "../../context/WalletContext";
import { useSmartWalletBalance } from "../../hooks/use-balance";
import { formatUnits } from "viem";
import { Plus, ArrowLeft, Send as SendIcon, User2, Loader2 } from "lucide-react";
import { Card } from "../../components/ui/card";

type Step = "amount" | "recipient" | "summary";

const Send: React.FC = () => {
  const navigate = useNavigate();
  const balanceWei = useSmartWalletBalance();
  const balance = parseFloat(formatUnits(balanceWei, 6));
  const { sendMoney } = useWallet();

  const [step, setStep] = useState<Step>("amount");
  const [amount, setAmount] = useState("0.00");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [, setCountryCode] = useState("+91");
  const [isLoading, setIsLoading] = useState(false);

  const enteredAmount = parseFloat(amount);
  const insufficientFunds = enteredAmount > balance;

  const isContinueDisabled =
    enteredAmount <= 0 ||
    insufficientFunds ||
    (step === "recipient" && phoneNumber.length < 10);

  const handleContinue = () => {
    if (step === "amount" && enteredAmount > 0 && !insufficientFunds) {
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
    try {
      setIsLoading(true);
      const success = await sendMoney(enteredAmount, phoneNumber);
      if (success) {
        navigate("/home");
      }
    } catch (error) {
      console.error("Error sending money:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddFunds = () => {
    navigate("/add-funds");
  };

  const LoadingOverlay = () => (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-card p-6 rounded-lg shadow-lg text-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto mb-4" />
        <h3 className="text-lg font-medium mb-2">Processing Payment</h3>
        <p className="text-muted-foreground">
          Please wait while we send ${amount} to {phoneNumber}
        </p>
      </div>
    </div>
  );

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
                Balance: ${balance.toFixed(2)}
              </div>
            </div>
            <div className="text-center mb-4">
              <h1 className="text-2xl font-bold mb-2">Send Money</h1>
              <p className="text-muted-foreground">Enter the amount to send</p>
            </div>
            <AmountInput value={amount} onChange={setAmount} />
            {insufficientFunds && (
              <p className="text-sm text-red-500">
                You only have ${balance.toFixed(2)} available.
              </p>
            )}
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
                <PhoneInput
                  setCountry={setCountryCode}
                  value={phoneNumber}
                  onChange={setPhoneNumber}
                  placeholder="Enter phone number"
                />
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
                        {phoneNumber}
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
    <div className="max-w-md mx-auto h-[calc(100vh-4rem)] flex flex-col">
      {isLoading && <LoadingOverlay />}
      <div>{renderStep()}</div>
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
            <Button 
              onClick={handleSend} 
              className="w-full" 
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <SendIcon className="mr-2 h-5 w-5" />
              )}
              {isLoading ? "Processing..." : "Send Money"}
            </Button>
          )
        ) : (
          <Button
            onClick={handleContinue}
            size="lg"
            disabled={isContinueDisabled}
            className={`w-full transition-opacity duration-150 ${
              isContinueDisabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Continue
          </Button>
        )}
      </div>
    </div>
  );
};

export default Send;