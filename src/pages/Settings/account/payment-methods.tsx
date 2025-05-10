import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "../../../components/Header";
import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import {
  PlusCircle,
  CreditCard,
  Trash2,
  CheckCircle2,
  Pencil,
} from "lucide-react";
import { Badge } from "../../../components/ui/badge";
import { Separator } from "../../../components/ui/separator";
import { Switch } from "../../../components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

type PaymentCard = {
  id: string;
  type: "visa" | "mastercard" | "amex";
  name: string;
  last4: string;
  expMonth: string;
  expYear: string;
  isDefault: boolean;
};

const PaymentMethods: React.FC = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState<PaymentCard[]>([
    {
      id: "card1",
      type: "visa",
      name: "John Doe",
      last4: "4242",
      expMonth: "12",
      expYear: "25",
      isDefault: true,
    },
    {
      id: "card2",
      type: "mastercard",
      name: "John Doe",
      last4: "8888",
      expMonth: "08",
      expYear: "26",
      isDefault: false,
    },
  ]);

  const [isAddCardOpen, setIsAddCardOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newCard, setNewCard] = useState({
    cardNumber: "",
    name: "",
    expMonth: "",
    expYear: "",
    cvv: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCard((prev) => ({ ...prev, [name]: value }));
  };

  const handleSetDefault = (id: string) => {
    setCards(
      cards.map((card) => ({
        ...card,
        isDefault: card.id === id,
      }))
    );
    toast.success("Default payment method updated");
  };

  const handleDeleteCard = (id: string) => {
    setCards(cards.filter((card) => card.id !== id));
    toast.success("Card removed successfully");
  };

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const cardType = ["visa", "mastercard", "amex"][
        Math.floor(Math.random() * 3)
      ] as "visa" | "mastercard" | "amex";
      const newCardObj: PaymentCard = {
        id: `card${Date.now()}`,
        type: cardType,
        name: newCard.name,
        last4: newCard.cardNumber.slice(-4),
        expMonth: newCard.expMonth,
        expYear: newCard.expYear,
        isDefault: cards.length === 0,
      };

      setCards([...cards, newCardObj]);
      setNewCard({
        cardNumber: "",
        name: "",
        expMonth: "",
        expYear: "",
        cvv: "",
      });
      setIsLoading(false);
      setIsAddCardOpen(false);
      toast.success("New card added successfully");
    }, 1500);
  };

  const getCardIcon = (type: string) => {
    switch (type) {
      case "visa":
        return (
          <div className="rounded bg-blue-100 p-1 text-blue-700 font-bold text-xs">
            VISA
          </div>
        );
      case "mastercard":
        return (
          <div className="rounded bg-yellow-100 p-1 text-yellow-700 font-bold text-xs">
            MC
          </div>
        );
      case "amex":
        return (
          <div className="rounded bg-gray-100 p-1 text-gray-700 font-bold text-xs">
            AMEX
          </div>
        );
      default:
        return <CreditCard size={16} />;
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto pb-24 md:pb-16 lg:pb-8">
      <Header title="Payment Methods" showBackButton />

      <div className="space-y-4 sm:space-y-6 md:space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex justify-between items-center mb-3 sm:mb-4">
            <h3 className="text-sm font-medium">Your Payment Cards</h3>

            <Dialog open={isAddCardOpen} onOpenChange={setIsAddCardOpen}>
              <DialogTrigger asChild>
                <Button size="sm" variant="outline">
                  <PlusCircle size={14} className="mr-1" />
                  Add New Card
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Payment Method</DialogTitle>
                  <DialogDescription>
                    Add a new credit or debit card to your account.
                  </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleAddCard} className="space-y-4 pt-2">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={newCard.cardNumber}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name">Name on Card</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      value={newCard.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="space-y-2">
                      <Label htmlFor="expMonth">Month</Label>
                      <Input
                        id="expMonth"
                        name="expMonth"
                        placeholder="MM"
                        maxLength={2}
                        value={newCard.expMonth}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="expYear">Year</Label>
                      <Input
                        id="expYear"
                        name="expYear"
                        placeholder="YY"
                        maxLength={2}
                        value={newCard.expYear}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        name="cvv"
                        type="password"
                        placeholder="123"
                        maxLength={4}
                        value={newCard.cvv}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <DialogFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsAddCardOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? "Adding..." : "Add Card"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <div>
              {cards.length === 0 ? (
                <div className="p-6 text-center">
                  <CreditCard className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                  <h3 className="font-medium mb-1">No Payment Methods</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    You haven't added any payment methods yet
                  </p>
                  <Button
                    onClick={() => setIsAddCardOpen(true)}
                    variant="outline"
                    size="sm"
                  >
                    <PlusCircle size={14} className="mr-1" />
                    Add Payment Method
                  </Button>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {cards.map((card) => (
                    <div key={card.id} className="p-3 sm:p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 rounded-full bg-primary/5 flex items-center justify-center">
                            {getCardIcon(card.type)}
                          </div>

                          <div>
                            <div className="flex items-center">
                              <h4 className="font-medium text-sm">
                                •••• {card.last4}
                              </h4>
                              {card.isDefault && (
                                <Badge variant="secondary" className="ml-2">
                                  Default
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Expires {card.expMonth}/{card.expYear}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {!card.isDefault && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleSetDefault(card.id)}
                            >
                              <CheckCircle2 size={14} className="mr-1" />
                              Set Default
                            </Button>
                          )}

                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDeleteCard(card.id)}
                          >
                            <Trash2 size={14} className="text-destructive" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>

          <Separator className="my-6" />

          {/* Card Settings Section */}
          <div className="mb-3 sm:mb-4">
            <h3 className="text-sm font-medium">Card Settings</h3>
          </div>

          <Card>
            <div className="divide-y divide-border">
              <div className="p-3 sm:p-4 flex items-center justify-between">
                <div className="space-y-1">
                  <h4 className="font-medium text-sm">
                    Save New Cards by Default
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Automatically save cards when making payments
                  </p>
                </div>
                <Switch />
              </div>

              <div className="p-3 sm:p-4 flex items-center justify-between">
                <div className="space-y-1">
                  <h4 className="font-medium text-sm">
                    Transaction Notifications
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Get notified for all card transactions
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="p-3 sm:p-4 flex items-center justify-between">
                <div className="space-y-1">
                  <h4 className="font-medium text-sm">
                    International Transactions
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Allow payments in foreign currencies
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentMethods;
