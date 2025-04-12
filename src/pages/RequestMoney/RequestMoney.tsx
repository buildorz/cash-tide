import React, { useState } from "react";
import { Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useWallet } from "@/context/WalletContext";
import { useAuth } from "@/context/AuthContext";
import { showSuccess } from "@/lib/utils";

import Header from "@/components/Header";
import AmountInput from "@/components/AmountInput";
import PhoneInput from "@/components/PhoneInput";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type RequestStep = "amount" | "recipient" | "summary" | "share";
type RequestType = "anyone" | "specific";

const RequestMoney: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<RequestStep>("amount");
  const [amount, setAmount] = useState("0.00");
  const [requestType, setRequestType] = useState<RequestType>("specific");
  const [phoneNumber, setPhoneNumber] = useState("");

  const navigate = useNavigate();
  const { requestMoney } = useWallet();
  const { user } = useAuth();

  const handleContinue = () => {
    switch (currentStep) {
      case "amount":
        if (parseFloat(amount) > 0) {
          setCurrentStep("recipient");
        }
        break;
      case "recipient":
        if (
          requestType === "anyone" ||
          (requestType === "specific" && phoneNumber.length >= 10)
        ) {
          setCurrentStep("summary");
        }
        break;
      case "summary":
        handleSendRequest();
        break;
    }
  };

  const handleSendRequest = async () => {
    if (requestType === "specific") {
      const success = await requestMoney(parseFloat(amount), phoneNumber);
      if (success) {
        navigate("/home");
      }
    } else {
      setCurrentStep("share");
    }
  };

  const handleShare = () => {
    showSuccess(
      "Link copied!",
      "Payment request link has been copied to clipboard"
    );
  };

  const renderAmountStep = () => (
    <>
      <div className="flex-1 space-y-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Enter Amount</h2>
          <p className="text-muted-foreground">
            How much would you like to request?
          </p>
        </div>

        <Card className="p-6">
          <AmountInput value={amount} onChange={setAmount} />
        </Card>
      </div>

      <Button
        onClick={handleContinue}
        className="w-full"
        disabled={parseFloat(amount) <= 0}
      >
        Continue
      </Button>
    </>
  );

  const renderRecipientStep = () => (
    <>
      <div className="flex-1 space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">
            Who are you requesting from?
          </h2>
          <p className="text-muted-foreground">
            Choose how you want to share your request
          </p>
        </div>

        <Card
          className={`p-4 cursor-pointer ${
            requestType === "anyone" ? "border-primary" : ""
          }`}
          onClick={() => setRequestType("anyone")}
        >
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Share2 className="text-primary" size={20} />
            </div>
            <div>
              <div className="font-medium">From anyone</div>
              <div className="text-sm text-muted-foreground">
                Generate a payment link
              </div>
            </div>
          </div>
        </Card>

        <div>
          <div className="text-sm font-medium mb-2">From a specific number</div>
          <Card
            className={`p-4 ${
              requestType === "specific" ? "border-primary" : ""
            }`}
            onClick={() => setRequestType("specific")}
          >
            <PhoneInput
              value={phoneNumber}
              onChange={setPhoneNumber}
              placeholder="Enter phone number"
            />
          </Card>
        </div>
      </div>

      <Button
        onClick={handleContinue}
        className="w-full"
        disabled={requestType === "specific" && phoneNumber.length < 10}
      >
        Continue
      </Button>
    </>
  );

  const renderSummaryStep = () => (
    <>
      <div className="flex-1 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Review Request</h2>
          <div className="text-5xl font-bold my-8">${amount}</div>
        </div>

        {requestType === "specific" && (
          <Card className="p-4">
            <div className="text-sm text-muted-foreground mb-2">
              Requesting from
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                🇮🇳
              </div>
              <div>
                <div className="font-medium">IN</div>
                <div className="text-muted-foreground">+91 {phoneNumber}</div>
              </div>
            </div>
          </Card>
        )}
      </div>

      <Button onClick={handleContinue} className="w-full">
        {requestType === "anyone" && <Share2 size={18} className="mr-2" />}
        {requestType === "specific" ? "Send Request" : "Share request link"}
      </Button>
    </>
  );

  const renderShareStep = () => (
    <>
      <div className="flex-1 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Share Payment Request</h2>
          <div className="text-5xl font-bold my-8">${amount}</div>
        </div>

        <Card className="aspect-square flex items-center justify-center">
          <div className="w-3/4 h-3/4 bg-[url('/lovable-uploads/88522aae-2630-4fe3-b800-8d200de860be.png')] bg-contain bg-center bg-no-repeat"></div>
        </Card>
      </div>

      <Button onClick={handleShare} className="w-full">
        <Share2 size={18} className="mr-2" />
        Share request link
      </Button>
    </>
  );

  const renderStep = () => {
    switch (currentStep) {
      case "amount":
        return renderAmountStep();
      case "recipient":
        return renderRecipientStep();
      case "summary":
        return renderSummaryStep();
      case "share":
        return renderShareStep();
    }
  };

  return (
    <div className="max-w-md mx-auto py-6">
      <div className="space-y-6">
        <Header
          title="Request Money"
          showBackButton
          onBack={() =>
            currentStep === "amount"
              ? navigate(-1)
              : setCurrentStep((prev) => {
                  if (prev === "recipient") return "amount";
                  if (prev === "summary") return "recipient";
                  if (prev === "share") return "summary";
                  return "amount";
                })
          }
        />

        <div className="space-y-8">{renderStep()}</div>
      </div>
    </div>
  );
};

export default RequestMoney;
