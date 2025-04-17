import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Bell,
  MessageSquare,
  CreditCard,
  Wallet,
  DollarSign,
  Clock,
  Lock,
} from "lucide-react";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";

const Notifications: React.FC = () => {
  const isMobile = useIsMobile();
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(false);
  const [notificationFrequency, setNotificationFrequency] = useState("instant");

  const handlePushToggle = () => {
    setPushEnabled(!pushEnabled);
    toast.success(
      `Push notifications ${!pushEnabled ? "enabled" : "disabled"}`
    );
  };

  const handleEmailToggle = () => {
    setEmailEnabled(!emailEnabled);
    toast.success(
      `Email notifications ${!emailEnabled ? "enabled" : "disabled"}`
    );
  };

  const handleSmsToggle = () => {
    setSmsEnabled(!smsEnabled);
    toast.success(`SMS notifications ${!smsEnabled ? "enabled" : "disabled"}`);
  };

  const handleFrequencyChange = (value: string) => {
    setNotificationFrequency(value);
    toast.success(`Notification frequency set to ${value}`);
  };

  const notificationGroups = [
    {
      title: "Transaction Alerts",
      items: [
        {
          icon: <CreditCard size={18} />,
          title: "Payment Confirmations",
          description: "Get notified when payments are processed",
          enabled: true,
        },
        {
          icon: <DollarSign size={18} />,
          title: "Money Received",
          description: "Get notified when you receive money",
          enabled: true,
        },
        {
          icon: <Wallet size={18} />,
          title: "Balance Updates",
          description: "Get notified about balance changes",
          enabled: false,
        },
      ],
    },
    {
      title: "Account Notifications",
      items: [
        {
          icon: <Lock size={18} />,
          title: "Security Alerts",
          description: "Suspicious activity and security notices",
          enabled: true,
        },
        {
          icon: <Clock size={18} />,
          title: "Reminders",
          description: "Bill payments and recurring transfers",
          enabled: true,
        },
        {
          icon: <MessageSquare size={18} />,
          title: "Promotions and News",
          description: "New features and special offers",
          enabled: false,
        },
      ],
    },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto pb-24 md:pb-16 lg:pb-8">
      <Header title="Notifications" showBackButton />

      <div className="space-y-5 sm:space-y-6 md:space-y-8">
        {/* Notification Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="mb-2 sm:mb-3 md:mb-4">
            <h3 className="text-sm font-medium">Notification Methods</h3>
          </div>

          <Card className="mb-6">
            <div className="divide-y divide-border">
              <div className="p-3 sm:p-4 md:p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Bell size={isMobile ? 16 : 20} />
                  </div>

                  <div>
                    <h4 className="font-medium">Push Notifications</h4>
                    <p className="text-xs text-muted-foreground">
                      Real-time alerts on your device
                    </p>
                  </div>
                </div>

                <Switch
                  checked={pushEnabled}
                  onCheckedChange={handlePushToggle}
                />
              </div>

              <div className="p-3 sm:p-4 md:p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <MessageSquare size={isMobile ? 16 : 20} />
                  </div>

                  <div>
                    <h4 className="font-medium">Email Notifications</h4>
                    <p className="text-xs text-muted-foreground">
                      Receive updates in your inbox
                    </p>
                  </div>
                </div>

                <Switch
                  checked={emailEnabled}
                  onCheckedChange={handleEmailToggle}
                />
              </div>

              <div className="p-3 sm:p-4 md:p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <MessageSquare size={isMobile ? 16 : 20} />
                  </div>

                  <div>
                    <h4 className="font-medium">SMS Notifications</h4>
                    <p className="text-xs text-muted-foreground">
                      Get text messages for important alerts
                    </p>
                  </div>
                </div>

                <Switch
                  checked={smsEnabled}
                  onCheckedChange={handleSmsToggle}
                />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Notification Frequency */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="mb-2 sm:mb-3 md:mb-4">
            <h3 className="text-sm font-medium">Notification Frequency</h3>
          </div>

          <Card className="p-3 sm:p-4 md:p-5 mb-6">
            <RadioGroup
              defaultValue={notificationFrequency}
              onValueChange={handleFrequencyChange}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="instant" id="instant" />
                <Label htmlFor="instant" className="cursor-pointer">
                  <span className="font-medium">Instant</span>
                  <p className="text-xs text-muted-foreground">
                    Receive notifications as events happen
                  </p>
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="hourly" id="hourly" />
                <Label htmlFor="hourly" className="cursor-pointer">
                  <span className="font-medium">Hourly Summary</span>
                  <p className="text-xs text-muted-foreground">
                    Receive bundled notifications every hour
                  </p>
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="daily" id="daily" />
                <Label htmlFor="daily" className="cursor-pointer">
                  <span className="font-medium">Daily Digest</span>
                  <p className="text-xs text-muted-foreground">
                    Receive a daily summary of all activity
                  </p>
                </Label>
              </div>
            </RadioGroup>
          </Card>
        </motion.div>

        {/* Notification Types */}
        {notificationGroups.map((group, index) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <div className="mb-2 sm:mb-3 md:mb-4">
              <h3 className="text-sm font-medium">{group.title}</h3>
            </div>

            <Card
              className={index < notificationGroups.length - 1 ? "mb-6" : ""}
            >
              <div className="divide-y divide-border">
                {group.items.map((item, idx) => (
                  <div
                    key={item.title}
                    className="p-3 sm:p-4 md:p-5 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        {item.icon}
                      </div>

                      <div>
                        <h4 className="font-medium">{item.title}</h4>
                        <p className="text-xs text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <Switch
                      defaultChecked={item.enabled}
                      onCheckedChange={(checked) => {
                        toast.success(
                          `${item.title} notifications ${
                            checked ? "enabled" : "disabled"
                          }`
                        );
                      }}
                    />
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Separator className="my-6" />

          <div className="text-xs text-muted-foreground">
            <p>
              You can manage detailed notification preferences for each method.
              Changes to notification settings may take a few minutes to apply.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Notifications;
