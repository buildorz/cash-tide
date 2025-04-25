import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWallet } from "@/context/WalletContext";
import { formatNumber } from "@/lib/utils";
import {
  ChevronRight,
  CreditCard,
  Eye,
  EyeOff,
  History,
  Plus,
  Send,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { useSmartWalletBalance } from "@/hooks/use-balance";
import { formatEther } from "viem";

export default function HomePage() {
  // const { balance } = useWallet();
  const balanceWei = useSmartWalletBalance();
  const balance = parseFloat(formatEther(balanceWei));
  const navigate = useNavigate();
  const [showBalance, setShowBalance] = useState(true);

  const toggleBalance = () => setShowBalance(!showBalance);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <>
      <motion.div
        className="max-w-7xl mx-auto md:p-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid md:grid-cols-12 gap-6">
          <motion.div variants={itemVariants} className="md:col-span-8">
            <Card className="bg-card border-border mb-6">
              <CardContent className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="relative">
                    <div className="flex items-center justify-between w-full gap-10">
                      <p className="text-muted-foreground text-sm mb-1">
                        Your Balance
                      </p>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="size-8 p-0"
                        onClick={toggleBalance}
                      >
                        {showBalance ? <EyeOff size={16} /> : <Eye size={16} />}
                      </Button>
                    </div>
                    <motion.div
                      initial={false}
                      animate={{ scale: showBalance ? 1 : 0.98 }}
                      className="relative"
                    >
                      <h2 className="text-5xl font-bold mb-1">
                        {showBalance ? formatNumber(Number(balance)) : "••••••"}
                      </h2>
                      <p className="text-muted-foreground text-xs">
                        {showBalance ? `${Number(balance)} USD` : "USD"}
                      </p>
                    </motion.div>
                  </div>

                  <div className="flex gap-3 mt-6 md:mt-0">
                    <Button size="sm" variant="outline" asChild>
                      <Link to="/add-funds">
                        <Plus className="h-4 w-4 mr-1" />
                        Add Money
                      </Link>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => navigate("/activity")}
                    >
                      <History className="h-4 w-4 mr-1" />
                      History
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants} className="md:col-span-4">
            <Card className="bg-card border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Monthly Spending
                  </span>
                  <span className="font-medium">$245.00</span>
                </div>
                <motion.div
                  className="w-full bg-muted h-1 rounded-full overflow-hidden"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  <motion.div
                    className="bg-primary h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "65%" }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  ></motion.div>
                </motion.div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Savings Goal
                  </span>
                  <span className="font-medium">$1,200.00</span>
                </div>
                <motion.div
                  className="w-full bg-muted h-1 rounded-full overflow-hidden"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  <motion.div
                    className="bg-primary h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "25%" }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                  ></motion.div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants} className="md:col-span-3">
            <div className="grid grid-cols-2 md:grid-cols-1 gap-3">
              <motion.button
                onClick={() => navigate("/send")}
                className="flex flex-col items-center justify-center p-4 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors relative group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2 sm:mb-3">
                  <Send className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-medium whitespace-nowrap">
                  Send
                </span>
                <div className="absolute inset-0 border border-transparent group-hover:border-primary/20 rounded-xl transition-all"></div>
              </motion.button>

              <motion.button
                onClick={() => navigate("/request")}
                className="flex flex-col items-center justify-center p-4 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors relative group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2 sm:mb-3">
                  <CreditCard className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-medium whitespace-nowrap">
                  Request
                </span>
                <div className="absolute inset-0 border border-transparent group-hover:border-primary/20 rounded-xl transition-all"></div>
              </motion.button>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="md:col-span-9">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium">Recent Activity</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/activity")}
              >
                View All
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              {[
                {
                  name: "Alex Morgan",
                  desc: "Coffee ☕ • 2 hours ago",
                  amount: "-$4.50",
                  isNegative: true,
                  initials: "AM",
                },
                {
                  name: "Sam Wilson",
                  desc: "Dinner split 🍕 • Yesterday",
                  amount: "+$12.75",
                  isNegative: false,
                  initials: "SM",
                },
                {
                  name: "Jamie Lee",
                  desc: "Monthly rent 🏠 • 3 days ago",
                  amount: "-$850.00",
                  isNegative: true,
                  initials: "JL",
                },
              ].map((transaction, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.15 }}
                >
                  <Card className="bg-card border-border">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10 border">
                            <AvatarImage src="/placeholder-user.jpg" />
                            <AvatarFallback className="bg-primary text-xs">
                              {transaction.initials}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">
                              {transaction.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {transaction.desc}
                            </p>
                          </div>
                        </div>
                        <p
                          className={`font-medium ${
                            transaction.isNegative
                              ? "text-destructive"
                              : "text-primary"
                          }`}
                        >
                          {transaction.amount}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
      >
        <Button
          className="fixed bottom-20 right-4 h-14 w-14 rounded-full md:hidden"
          size="icon"
          onClick={() => navigate("/send")}
        >
          <Send className="h-6 w-6" />
        </Button>
      </motion.div>
    </>
  );
}
