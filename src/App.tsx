import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { WalletProvider } from "./context/WalletContext";
import { PrivyProvider } from "@privy-io/react-auth";

// Pages
import Login from "./pages/Login";
import Home from "./pages/Home";
import SendAmount from "./pages/SendMoney/SendAmount";
import SendTo from "./pages/SendMoney/SendTo";
import SendSummary from "./pages/SendMoney/SendSummary";
import RequestAmount from "./pages/RequestMoney/RequestAmount";
import RequestFrom from "./pages/RequestMoney/RequestFrom";
import RequestSummary from "./pages/RequestMoney/RequestSummary";
import RequestShare from "./pages/RequestMoney/RequestShare";
import AddFunds from "./pages/AddFunds";
import Activity from "./pages/Activity";
import QRCode from "./pages/QRCode";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/home" replace /> : <Login />} />

      <Route path="/" element={isAuthenticated ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />} />

      <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />

      {/* Send Money Flow */}
      <Route path="/send" element={<ProtectedRoute><SendAmount /></ProtectedRoute>} />
      <Route path="/send/to" element={<ProtectedRoute><SendTo /></ProtectedRoute>} />
      <Route path="/send/summary" element={<ProtectedRoute><SendSummary /></ProtectedRoute>} />

      {/* Request Money Flow */}
      <Route path="/request" element={<ProtectedRoute><RequestAmount /></ProtectedRoute>} />
      <Route path="/request/from" element={<ProtectedRoute><RequestFrom /></ProtectedRoute>} />
      <Route path="/request/summary" element={<ProtectedRoute><RequestSummary /></ProtectedRoute>} />
      <Route path="/request/share" element={<ProtectedRoute><RequestShare /></ProtectedRoute>} />

      {/* Other Pages */}
      <Route path="/add-funds" element={<ProtectedRoute><AddFunds /></ProtectedRoute>} />
      <Route path="/activity" element={<ProtectedRoute><Activity /></ProtectedRoute>} />
      <Route path="/qr" element={<ProtectedRoute><QRCode /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <PrivyProvider
      appId="cm8skeydc00jv87n0b07aod2t"
      clientId="client-WY5i4HCwd7d5SR3BNNFh5aWvPMVpV1CpzZ39fAGNVdMai"
      config={{
        // Display email and wallet as login methods
        loginMethods: ['telegram', 'sms'],
        appearance: {
          theme: 'light',
          accentColor: '#676FFF',
          logo: 'https://your-logo-url'
        },
        // Create embedded wallets for users who don't have a wallet
        embeddedWallets: {
          createOnLogin: 'users-without-wallets'
        }
      }}
    >
      <TooltipProvider>
        <AuthProvider>
          <WalletProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </WalletProvider>
        </AuthProvider>
      </TooltipProvider>
    </PrivyProvider>
  </QueryClientProvider>
);

export default App;
