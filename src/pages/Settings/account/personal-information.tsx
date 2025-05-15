import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "../../../components/Header";
import { useAuth } from "../../../context/AuthContext";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Loader2, Copy } from "lucide-react";
import { useIsMobile } from "../../../hooks/use-mobile";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useCreateKernel } from "../../../hooks/use-create-kernel";
import { axiosInstance } from "../../../utils/axios";

const PersonalInformation: React.FC = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isLoading, setIsLoading] = useState(false);
  const { address } = useCreateKernel();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email?.address || "",
    phone: user?.phone?.number || "",
  });

  console.log("user data kya aa raha hai??????", user);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const payload = {
        name: formData.name,
      };
      await axiosInstance.put(
        `/api/user/update/${user?.id}`,
        payload,
        { headers: { "Content-Type": "application/json" } }
      );
      updateUser(formData.name);
      toast.success("Name updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update personal information");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      toast.success("Wallet address copied to clipboard");
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto pb-24 md:pb-16 lg:pb-8">
      <Header title="Personal Information" showBackButton />

      <div className="space-y-4 sm:space-y-6 md:space-y-8 ">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {/* Profile Picture Card */}
          {/* <Card className="p-4 sm:p-5 md:p-6 mb-4 sm:mb-6">
            <div className="flex flex-col items-center sm:flex-row sm:items-start gap-4">
              <div className="relative group">
                <Avatar className="h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 border-2 border-primary">
                  <AvatarImage src="https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/01/0113bb111a455783608816652feb8c17b5d269f3_full.jpg" />
                  <AvatarFallback className="text-xl sm:text-2xl md:text-3xl bg-primary/10">
                    {user?.name?.[0]?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <Button
                  type="button"
                  size="icon"
                  variant="secondary"
                  className="absolute -bottom-2 -right-2 h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 rounded-full"
                >
                  <Camera size={isMobile ? 16 : 18} />
                </Button>
              </div>

              <div className="text-center sm:text-left space-y-1 sm:space-y-2">
                <h3 className="text-lg sm:text-xl font-medium">Profile Picture</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Upload a clear photo of your face
                </p>
                <div className="flex gap-2 justify-center sm:justify-start">
                  <Button type="button" size="sm" variant="outline">
                    Upload New
                  </Button>
                  <Button type="button" size="sm" variant="ghost">
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          </Card> */}

          {/* Personal Information Form */}
          <Card className="p-4 sm:p-5 md:p-6">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                  />
                </div>

                {/* <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                  />
                </div> */}

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    disabled={!!user?.phone}
                  />
                  {user?.phone && (
                    <p className="text-xs text-muted-foreground">
                      Phone number cannot be changed
                    </p>
                  )}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="walletAddress">Wallet Address</Label>
                  <div className="relative">
                    <Input
                      id="walletAddress"
                      name="walletAddress"
                      value={address || "Loading..."}
                      disabled
                      className="pr-10 "
                    />
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      className="absolute inset-y-0 right-0 flex items-center justify-center p-0.5"
                      onClick={handleCopyAddress}
                      disabled={!address}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  {address && (
                    <p className="text-xs text-muted-foreground">
                      We only support USDC on Base. Please do not use any other
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/settings")}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating…
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default PersonalInformation;
