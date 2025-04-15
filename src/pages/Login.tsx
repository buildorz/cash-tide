import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import PhoneInput from "@/components/PhoneInput";
import Button from "@/components/Button";
import Logo from "@/components/Logo";
import { toast } from "sonner";
import { showError } from "@/lib/utils";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Icons } from "@/components/ui/icons";
import { UserIcon } from "lucide-react";

const Login: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [verificationMode, setVerificationMode] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  const { login, verifyCode, isAuthenticated } = useAuth();

  const navigate = useNavigate();

  const handleContinue = async () => {
    if (phoneNumber.length < 10) {
      toast("Please enter a valid phone number");

      return;
    }

    setIsSubmitting(true);
    try {
      await login(phoneNumber);
      setVerificationMode(true);
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyCode = async () => {
    if (verificationCode.length !== 6) {
      showError("Invalid code", "Please enter the 6-digit verification code");
      return;
    }

    setIsSubmitting(true);
    try {
      const success = await verifyCode(verificationCode);
      if (success) {
        navigate("/home");
      }
    } catch (error) {
      console.error("Verification error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendCode = () => {
    login(phoneNumber);
    showError(
      "Code resent",
      "A new verification code has been sent to your phone"
    );
  };

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div className="flex flex-col justify-center p-3 sm:p-6 min-h-[100dvh]">
      <Link to={"/"} className="text-center mb-8">
        <Logo />
      </Link>

      <div className="max-w-[1140px] mx-auto h-full flex items-center justify-center flex-col flex-1 ">
        <Icons.pattern className="w-full absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2" />

        <div className="bg-white relative w-full max-w-[440px] mx-auto p-4 rounded-[20px] md:p-8 border border-[#E1E4EA] shadow-[0px_1px_2px_0px_#0A0D1408]">
          {!verificationMode ? (
            <div className="flex flex-col items-center gap-6">
              <div className="size-24 bg-[linear-gradient(180deg,_rgba(113,_119,_132,_0.1)_0%,_rgba(113,_119,_132,_0)_100%)] p-4 rounded-full">
                <div className="size-full rounded-full bg-white border border-[#E1E4EA] shadow-[0px_1px_2px_0px_#0A0D1408] p-4">
                  <Icons.user />
                </div>
              </div>

              <div className="space-y-1 text-center">
                <h1 className="text-2xl font-normal text-[#0E121B]">
                  Welcome to CashTide
                </h1>
                <p className="text-[#525866]">
                  Send money in seconds to anyone in the world, directly to
                  their phone numbers.
                </p>
              </div>

              <div className="w-full h-px bg-[#E1E4EA]" />

              <PhoneInput
                value={phoneNumber}
                onChange={setPhoneNumber}
                placeholder="Enter your phone number"
              />

              <Button
                className="w-full rounded-[10px]"
                disabled={isSubmitting}
                onClick={handleContinue}
              >
                {isSubmitting ? "Sending code..." : "Continue"}
              </Button>
              <div id="recaptcha-container"></div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-6">
              <div className="size-24 bg-[linear-gradient(180deg,_rgba(113,_119,_132,_0.1)_0%,_rgba(113,_119,_132,_0)_100%)] p-4 rounded-full">
                <div className="size-full rounded-full bg-white border border-[#E1E4EA] shadow-[0px_1px_2px_0px_#0A0D1408] p-4">
                  <Icons.message />
                </div>
              </div>

              <div className="space-y-1 text-center">
                <h1 className="text-2xl font-normal text-center">
                  Enter Verification Code
                </h1>
                <p className="text-[#525866] text-center mb-8">
                  Please check{" "}
                  <span className="text-[#0E121B] font-medium">
                    {phoneNumber}
                  </span>{" "}
                  for a message from CashTide and enter your code below.
                </p>
              </div>

              <div className="w-full h-px bg-[#E1E4EA]" />

              <InputOTP
                maxLength={6}
                onChange={(e) => setVerificationCode(e)}
                value={verificationCode}
              >
                <InputOTPGroup className="gap-1">
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>

              <Button
                className="w-full rounded-[10px]"
                disabled={isSubmitting}
                onClick={handleVerifyCode}
              >
                {isSubmitting ? "Verifying..." : "Verify Code"}
              </Button>

              <div className="flex items-center flex-col">
                <p className=" text-sm">
                  Experiencing issues receiving the code?
                </p>
                <button
                  onClick={handleResendCode}
                  className="text-app-green  font-medium"
                >
                  Resend code
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
