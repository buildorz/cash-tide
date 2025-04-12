import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWallet } from "@/context/WalletContext";
import { formatNumber } from "@/lib/utils";
import {
  ChevronRight,
  CreditCard,
  History,
  Plus,
  Send,
  Wallet,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function HomePage() {
  const { balance } = useWallet();
  const navigate = useNavigate();

  return (
    <>
      <div className="max-w-7xl mx-auto md:p-6">
        <div className="grid md:grid-cols-12 gap-6">
          <Card className="md:col-span-8 bg-card border-border mb-6">
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-muted-foreground text-sm mb-1">
                    Your Balance
                  </p>
                  <h2 className="text-5xl font-bold mb-1">
                    {formatNumber(balance)}
                  </h2>
                  <p className="text-muted-foreground text-xs">{balance} USD</p>
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

          <Card className="md:col-span-4 bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Monthly Spending
                </span>
                <span className="font-medium">$245.00</span>
              </div>
              <div className="w-full bg-muted h-1 rounded-full overflow-hidden">
                <div
                  className="bg-primary h-full rounded-full"
                  style={{ width: "65%" }}
                ></div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Savings Goal
                </span>
                <span className="font-medium">$1,200.00</span>
              </div>
              <div className="w-full bg-muted h-1 rounded-full overflow-hidden">
                <div
                  className="bg-primary h-full rounded-full"
                  style={{ width: "25%" }}
                ></div>
              </div>
            </CardContent>
          </Card>

          <div className="md:col-span-3 grid grid-cols-3 md:grid-cols-1 gap-3 md:gap-4">
            <Card
              className="bg-card border-border hover:bg-muted transition-colors cursor-pointer"
              onClick={() => navigate("/send")}
            >
              <CardContent className="p-4 flex md:flex-row items-center justify-center md:justify-start gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Send className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm">Send Money</span>
              </CardContent>
            </Card>

            <Card
              className="bg-card border-border hover:bg-muted transition-colors cursor-pointer"
              onClick={() => navigate("/request")}
            >
              <CardContent className="p-4 flex md:flex-row items-center justify-center md:justify-start gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <CreditCard className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm">Request</span>
              </CardContent>
            </Card>

            <Card
              className="bg-card border-border hover:bg-muted transition-colors cursor-pointer"
              onClick={() => navigate("/wallet")}
            >
              <CardContent className="p-4 flex md:flex-row items-center justify-center md:justify-start gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Wallet className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm">Wallet</span>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-9">
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
              <Card className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border">
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback className="bg-primary text-xs">
                          AM
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">Alex Morgan</p>
                        <p className="text-xs text-muted-foreground">
                          Coffee ☕ • 2 hours ago
                        </p>
                      </div>
                    </div>
                    <p className="font-medium text-destructive">-$4.50</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border">
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback className="bg-primary text-xs">
                          SM
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">Sam Wilson</p>
                        <p className="text-xs text-muted-foreground">
                          Dinner split 🍕 • Yesterday
                        </p>
                      </div>
                    </div>
                    <p className="font-medium text-primary">+$12.75</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border">
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback className="bg-primary text-xs">
                          JL
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">Jamie Lee</p>
                        <p className="text-xs text-muted-foreground">
                          Monthly rent 🏠 • 3 days ago
                        </p>
                      </div>
                    </div>
                    <p className="font-medium text-destructive">-$850.00</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Button
        className="fixed bottom-20 right-4 h-14 w-14 rounded-full md:hidden"
        size="icon"
        onClick={() => navigate("/send")}
      >
        <Send className="h-6 w-6" />
      </Button>
    </>
  );
}
