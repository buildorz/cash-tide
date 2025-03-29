
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import PhoneInput from '@/components/PhoneInput';
import Button from '@/components/Button';
import Logo from '@/components/Logo';
import { useToast } from '@/components/ui/use-toast';

const Login: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [verificationMode, setVerificationMode] = useState(false);
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const { login, verifyCode } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleContinue = async () => {
    if (phoneNumber.length < 10) {
      toast({
        variant: "destructive",
        title: "Invalid phone number",
        description: "Please enter a valid phone number",
      });
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

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.charAt(0);
    }
    
    if (value && !isNaN(Number(value))) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);
      
      // Auto-focus next input
      if (index < 5 && value) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        if (nextInput) {
          nextInput.focus();
        }
      }
    } else if (value === '') {
      const newCode = [...verificationCode];
      newCode[index] = '';
      setVerificationCode(newCode);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      // Focus previous input on backspace if current input is empty
      const prevInput = document.getElementById(`code-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  const handleVerifyCode = async () => {
    const code = verificationCode.join('');
    if (code.length !== 6) {
      toast({
        variant: "destructive",
        title: "Invalid code",
        description: "Please enter the 6-digit verification code",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const success = await verifyCode(code);
      if (success) {
        navigate('/home');
      }
    } catch (error) {
      console.error("Verification error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendCode = () => {
    login(phoneNumber);
    toast({
      title: "Code resent",
      description: "A new verification code has been sent to your phone",
    });
  };

  return (
    <div className="app-container flex flex-col justify-center p-6">
      <div className="text-center mb-8">
        <Logo />
      </div>

      <div className="bg-[url('/lovable-uploads/acb8c901-b70f-4265-9e1d-0f2afb24dd26.png')] bg-contain bg-center bg-no-repeat h-64 mb-8"></div>

      {!verificationMode ? (
        <>
          <h1 className="text-3xl font-bold mb-4 text-center">Welcome to CashTide</h1>
          <p className="text-gray-600 text-center mb-8">
            Send money in seconds to anyone in the world, directly to their phone numbers.
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
          </div>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4 text-center">Enter confirmation code</h1>
          <p className="text-gray-600 text-center mb-8">
            Please check +91 {phoneNumber} for a message from CashTide and enter your code below.
          </p>

          <div className="flex justify-between mb-8 max-w-md mx-auto">
            {verificationCode.map((digit, index) => (
              <input
                key={index}
                id={`code-${index}`}
                type="text"
                maxLength={1}
                className="w-12 h-12 text-center text-xl font-semibold border rounded-lg focus:border-app-green focus:ring-1 focus:ring-app-green focus:outline-none"
                value={digit}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                autoFocus={index === 0}
              />
            ))}
          </div>

          <Button 
            className="w-full mb-4"
            disabled={isSubmitting}
            onClick={handleVerifyCode}
          >
            {isSubmitting ? "Verifying..." : "Verify Code"}
          </Button>

          <p className="text-center">
            Didn't get a message? <button onClick={handleResendCode} className="text-app-green font-medium">Resend code</button>
          </p>
        </>
      )}
    </div>
  );
};

export default Login;
