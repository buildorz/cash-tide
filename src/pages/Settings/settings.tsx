import React from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import { useAuth } from "@/context/AuthContext";
import {
  User,
  CreditCard,
  Shield,
  Bell,
  HelpCircle,
  LogOut,
  ChevronRight,
  Camera,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";

const Settings: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const settingsGroups = [
    {
      title: "Account",
      items: [
        {
          icon: <User size={20} />,
          title: "Personal Information",
          description: "Update your personal details",
          badge: "Incomplete",
          path: "/settings/account/personal-information",
        },
        {
          icon: <CreditCard size={20} />,
          title: "Payment Methods",
          description: "Manage your payment options",
          badge: "2 Cards",
          path: "/settings/account/payment-methods",
        },
      ],
    },
    // {
    //   title: "Security & Privacy",
    //   items: [
    //     {
    //       icon: <Shield size={20} />,
    //       title: "Security Settings",
    //       description: "Password and authentication",
    //       badge: "Enhanced",
    //       path: "/settings/security/security-settings",
    //     },
    //     {
    //       icon: <Bell size={20} />,
    //       title: "Notifications",
    //       description: "Manage your alerts",
    //       badge: "All Active",
    //       path: "/settings/security/notifications",
    //     },
    //   ],
    // },
    {
      title: "Support",
      items: [
        {
          icon: <HelpCircle size={20} />,
          title: "Help Center",
          description: "FAQs and support resources",
          path: "/settings/support/help-center",
        },
      ],
    },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto pb-24 md:pb-16 lg:pb-8">
      <Header title="Settings" showBackButton />

      <div className="space-y-4 sm:space-y-6 md:space-y-8 ">
        {/* Profile Card */}
        {/* <Card className="p-3 sm:p-4 md:p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 left-0 h-12 sm:h-16 md:h-20 bg-gradient-to-r from-primary/10 to-primary/5" />

          <div className="relative flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
            <div className="relative group">
              <Avatar className="h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20 border-2 border-primary">
                <AvatarImage src="https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/01/0113bb111a455783608816652feb8c17b5d269f3_full.jpg" />
                <AvatarFallback className="text-base sm:text-lg md:text-xl bg-primary/10">
                  {user?.name?.[0]?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                variant="secondary"
                className="absolute -bottom-1 -right-1 h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Camera size={isMobile ? 10 : isMobile ? 12 : 14} />
              </Button>
            </div>

            <div className="flex-1 text-center sm:text-left mt-2 sm:mt-0">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">
                {user?.name || "User"}
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
                {user?.phoneNumber || "No phone number"}
              </p>
              <Badge variant="secondary" className="mt-1 sm:mt-2">
                Premium Member
              </Badge>
            </div>
          </div>
        </Card> */}

        {/* Settings Groups */}
        {settingsGroups.map((group, index) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="mb-2 sm:mb-3 md:mb-4">
              <h3 className="text-xs sm:text-sm font-medium text-muted-foreground px-1">
                {group.title}
              </h3>
            </div>

            <Card>
              <div className="divide-y divide-border">
                {group.items.map((item, idx) => (
                  <motion.button
                    key={item.title}
                    className="w-full"
                    whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                    whileTap={{ scale: 0.995 }}
                    onClick={() => handleNavigation(item.path)}
                  >
                    <div className="flex items-center gap-2 sm:gap-3 md:gap-4 p-2 sm:p-3 md:p-4">
                      <div className="h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        {React.cloneElement(item.icon, {
                          size: isMobile ? 14 : isMobile ? 16 : 20,
                        })}
                      </div>

                      <div className="flex-1 text-left">
                        <div className="font-medium text-xs sm:text-sm md:text-base">
                          {item.title}
                        </div>
                        <div className="text-xs md:text-sm text-muted-foreground">
                          {item.description}
                        </div>
                      </div>

                      <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
                        {item.badge && (
                          <Badge
                            variant="secondary"
                            className="font-normal text-xs md:text-sm px-1 sm:px-2"
                          >
                            {item.badge}
                          </Badge>
                        )}
                        <ChevronRight
                          size={isMobile ? 14 : isMobile ? 16 : 18}
                          className="text-muted-foreground"
                        />
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}

        {/* Logout Section */}
        <div className="pt-2 sm:pt-3 md:pt-4">
          <Separator className="mb-3 sm:mb-4 md:mb-6" />
          <Button
            variant="destructive"
            className="w-full py-4 sm:py-5 md:py-6 text-xs sm:text-sm md:text-base"
            onClick={handleLogout}
          >
            <LogOut
              size={isMobile ? 14 : isMobile ? 16 : 18}
              className="mr-2"
            />
            Log out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
