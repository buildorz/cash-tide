import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import AmountInput from "../components/AmountInput";
import Button from "../components/Button";
import { useWallet } from "../context/WalletContext";
import { Card, CardContent } from "../components/ui/card";

const AddFunds = () => {
  const [amount, setAmount] = useState("0.00");
  const [selectedMethod, setSelectedMethod] = useState("card");
  const navigate = useNavigate();
  const { addFunds } = useWallet();

  const handleAddFunds = async () => {
    const numericAmount = parseFloat(amount);
    if (numericAmount <= 0) return;

    const success = await addFunds(numericAmount, selectedMethod as "card" | "apple_pay" | "google_pay");
    if (success) {
      navigate("/home");
    }
  };

  const isAmountValid = parseFloat(amount) > 0;

  return (
    <div className="max-w-7xl mx-auto md:p-6">
      <Header title="Add Funds" showBackButton />

      <div className="grid gap-6 md:p-0">
        <Card className="bg-card border-border">
          <CardContent className="p-3">
            <div className="mb-8">
              <AmountInput value={amount} onChange={setAmount} />
            </div>

            <Button
              onClick={handleAddFunds}
              className={`w-full mt-6 ${!isAmountValid ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={!isAmountValid}
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