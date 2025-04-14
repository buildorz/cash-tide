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
    <div className="app-container flex flex-col justify-center p-6">
      <Link to={"/"} className="text-center mb-8">
        <Logo />
      </Link>

      <div className="bg-[url('/lovable-uploads/acb8c901-b70f-4265-9e1d-0f2afb24dd26.png')] bg-contain bg-center bg-no-repeat h-64 mb-8"></div>

      {!verificationMode ? (
        <>
          <h1 className="text-3xl font-bold mb-4 text-center">
            Welcome to CashTide
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Send money in seconds to anyone in the world, directly to their
            phone numbers.
          </p>

          <div className="space-y-6">
            <PhoneInput
              value={phoneNumber}
              onChange={setPhoneNumber}
              placeholder="Enter your phone number"
            />

            <Button
              className="w-full"
              disabled={isSubmitting}
              onClick={handleContinue}
            >
              {isSubmitting ? "Sending code..." : "Continue"}
            </Button>
            <div id="recaptcha-container"></div>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4 text-center">
            Enter confirmation code
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Please check +91 {phoneNumber} for a message from CashTide and enter
            your code below.
          </p>

          <div className="flex justify-between mb-8 max-w-md mx-auto">
            <InputOTP
              maxLength={6}
              onChange={(e) => setVerificationCode(e)}
              value={verificationCode}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <Button
            className="w-full mb-4"
            disabled={isSubmitting}
            onClick={handleVerifyCode}
          >
            {isSubmitting ? "Verifying..." : "Verify Code"}
          </Button>

          <p className="text-center">
            Didn't get a message?{" "}
            <button
              onClick={handleResendCode}
              className="text-app-green font-medium"
            >
              Resend code
            </button>
          </p>
        </>
      )}
    </div>
  );
};

export default Login;
