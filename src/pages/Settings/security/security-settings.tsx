import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "../../../components/Header";
import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Separator } from "../../../components/ui/separator";
import { Switch } from "../../../components/ui/switch";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {
  KeyRound,
  Fingerprint,
  ShieldCheck,
  EyeOff,
  PhoneIcon,
  Loader2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { useAuth } from "../../../context/AuthContext";

const SecuritySettings: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [twoFactorDialogOpen, setTwoFactorDialogOpen] = useState(false);

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate password match
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("New passwords don't match");
      setIsLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setPasswordDialogOpen(false);
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      toast.success("Password updated successfully");
    }, 1500);
  };

  const handleTwoFactorToggle = () => {
    setTwoFactorDialogOpen(true);
  };

  const handleTwoFactorSetup = () => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setTwoFactorDialogOpen(false);
      toast.success("Two-factor authentication enabled");
    }, 1500);
  };

  return (
    <div className="w-full max-w-2xl mx-auto pb-24 md:pb-16 lg:pb-8">
      <Header title="Security Settings" showBackButton />

      <div className="space-y-5 sm:space-y-6 md:space-y-8">
        {/* Password Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="mb-2 sm:mb-3 md:mb-4">
            <h3 className="text-sm font-medium">Password & Authentication</h3>
          </div>

          <Card className="mb-6">
            <div className="divide-y divide-border">
              <div className="p-3 sm:p-4 md:p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <KeyRound size={20} />
                  </div>

                  <div>
                    <h4 className="font-medium">Change Password</h4>
                    <p className="text-xs text-muted-foreground">
                      Update your password regularly for security
                    </p>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPasswordDialogOpen(true)}
                >
                  Update
                </Button>

                <Dialog
                  open={passwordDialogOpen}
                  onOpenChange={setPasswordDialogOpen}
                >
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Change Your Password</DialogTitle>
                      <DialogDescription>
                        Create a strong, unique password to protect your account
                      </DialogDescription>
                    </DialogHeader>

                    <form
                      onSubmit={handlePasswordSubmit}
                      className="space-y-4 py-2"
                    >
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">
                          Current Password
                        </Label>
                        <Input
                          id="currentPassword"
                          name="currentPassword"
                          type="password"
                          value={passwordForm.currentPassword}
                          onChange={handlePasswordChange}
                          required
                        />
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input
                          id="newPassword"
                          name="newPassword"
                          type="password"
                          value={passwordForm.newPassword}
                          onChange={handlePasswordChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">
                          Confirm New Password
                        </Label>
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          value={passwordForm.confirmPassword}
                          onChange={handlePasswordChange}
                          required
                        />
                      </div>

                      <div className="text-xs text-muted-foreground space-y-1">
                        <p>Password must:</p>
                        <ul className="list-disc pl-4 space-y-0.5">
                          <li>Be at least 8 characters long</li>
                          <li>Include at least one uppercase letter</li>
                          <li>Include at least one number</li>
                          <li>Include at least one special character</li>
                        </ul>
                      </div>

                      <DialogFooter>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setPasswordDialogOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                          {isLoading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Updating...
                            </>
                          ) : (
                            "Update Password"
                          )}
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="p-3 sm:p-4 md:p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <PhoneIcon size={20} />
                  </div>

                  <div>
                    <h4 className="font-medium">Two-Factor Authentication</h4>
                    <p className="text-xs text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                </div>

                <Switch onClick={handleTwoFactorToggle} />

                <Dialog
                  open={twoFactorDialogOpen}
                  onOpenChange={setTwoFactorDialogOpen}
                >
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        Enable Two-Factor Authentication
                      </DialogTitle>
                      <DialogDescription>
                        Protect your account with an additional verification
                        step
                      </DialogDescription>
                    </DialogHeader>

                    <div className="py-4 space-y-4">
                      <div className="border rounded-lg p-4 bg-muted/30 text-center">
                        <div className="bg-white inline-block p-2 rounded mb-2">
                          {/* This would be a QR code in a real app */}
                          <div className="h-40 w-40 bg-black/90"></div>
                        </div>
                        <p className="text-xs text-center break-all font-mono mt-2 bg-muted px-2 py-1 rounded">
                          JBSWY3DPEHPK3PXP
                        </p>
                      </div>

                      <div>
                        <p className="text-sm mb-2">
                          Scan this QR code with an authenticator app:
                        </p>
                        <ul className="text-xs text-muted-foreground list-disc pl-4 space-y-1">
                          <li>Google Authenticator</li>
                          <li>Microsoft Authenticator</li>
                          <li>Authy</li>
                        </ul>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="verificationCode">
                          Verification Code
                        </Label>
                        <Input
                          id="verificationCode"
                          placeholder="Enter 6-digit code"
                          maxLength={6}
                        />
                      </div>
                    </div>

                    <DialogFooter>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setTwoFactorDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleTwoFactorSetup}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Setting up...
                          </>
                        ) : (
                          "Enable 2FA"
                        )}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="p-3 sm:p-4 md:p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Fingerprint size={20} />
                  </div>

                  <div>
                    <h4 className="font-medium">Biometric Authentication</h4>
                    <p className="text-xs text-muted-foreground">
                      Use fingerprint or face recognition to login
                    </p>
                  </div>
                </div>

                <Switch defaultChecked />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Security Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="mb-2 sm:mb-3 md:mb-4">
            <h3 className="text-sm font-medium">Privacy & Data</h3>
          </div>

          <Card>
            <div className="divide-y divide-border">
              <div className="p-3 sm:p-4 md:p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <ShieldCheck size={20} />
                  </div>

                  <div>
                    <h4 className="font-medium">App Lock</h4>
                    <p className="text-xs text-muted-foreground">
                      Require authentication when opening the app
                    </p>
                  </div>
                </div>

                <Switch />
              </div>

              <div className="p-3 sm:p-4 md:p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <EyeOff size={20} />
                  </div>

                  <div>
                    <h4 className="font-medium">Hide Account Balance</h4>
                    <p className="text-xs text-muted-foreground">
                      Show or hide your balance on the home screen
                    </p>
                  </div>
                </div>

                <Switch defaultChecked />
              </div>
            </div>
          </Card>

          <div className="pt-6 sm:pt-8">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                toast.success("Data privacy policy opened");
              }}
            >
              View Data Privacy Policy
            </Button>
          </div>

          <div className="pt-3">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                toast.success("Privacy logs exported");
              }}
            >
              Export Privacy Logs
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SecuritySettings;
