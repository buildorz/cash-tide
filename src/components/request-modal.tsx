import { formatDate, formatNumber } from "@/lib/utils";
import { axiosInstance } from "@/utils/axios";
import { Check, Clock, Loader2, User2, X } from "lucide-react";
import { useEffect, useState } from "react";
import Button from "./Button";
import { Card } from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  requestId: string | undefined;
};

type RequestResponse = {
  id: string;
  requesterId: string;
  payerId: string;
  amountRequested: number;
  requestStatus: "PENDING" | "COMPLETED" | "CANCELLED";
  requestDate: string;
  requestMessage: string;
};

async function getRequestInfo(requestId: string) {
  try {
    const req = await axiosInstance.get<RequestResponse>(
      `/api/request/get/${requestId}`
    );
    return req.data;
  } catch (error) {
    console.error("Error fetching request information:", error);
    throw error;
  }
}

export function RequestModal({ onOpenChange, open, requestId }: Props) {
  const [requestData, setRequestData] = useState<RequestResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    async function fetchRequestData() {
      if (requestId) {
        setIsLoading(true);
        try {
          const data = await getRequestInfo(requestId);
          setRequestData(data);
        } catch (error) {
          console.error("Failed to fetch request data:", error);
        } finally {
          setIsLoading(false);
        }
      }
    }

    if (open && requestId) {
      fetchRequestData();
    }
  }, [open, requestId]);

  const handleAccept = async () => {
    console.log("accepting");
  };

  const handleReject = () => {
    // Here you would implement the rejection logic with an API call
    // For now just close the modal
    onOpenChange(false);
  };

  if (!requestId) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Payment Request</DialogTitle>
          <DialogDescription>
            Someone has requested money from you
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : requestData ? (
          <div className="space-y-4">
            <Card className="p-6">
              <div className="space-y-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">
                    Request Amount
                  </p>
                  <div className="text-4xl font-bold mb-1">
                    {formatNumber(requestData.amountRequested)}
                  </div>
                </div>

                <div className="h-px bg-border" />

                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">From</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <User2 className="h-5 w-5" />
                    </div>

                    <div className="text-xs text-muted-foreground">
                      {requestData.requesterId}
                    </div>
                  </div>
                </div>

                {requestData.requestMessage && (
                  <>
                    <div className="h-px bg-border" />
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Message
                      </p>
                      <p className="text-sm">{requestData.requestMessage}</p>
                    </div>
                  </>
                )}

                <div className="h-px bg-border" />

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>
                      Requested on {formatDate(requestData.requestDate)}
                    </span>
                  </div>
                  <div className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 uppercase font-medium">
                    {requestData.requestStatus.toLowerCase()}
                  </div>
                </div>
              </div>
            </Card>

            {requestData.requestStatus === "PENDING" && (
              <DialogFooter className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-2">
                <Button
                  variant="outline"
                  onClick={handleReject}
                  className="w-full sm:w-auto"
                  icon={<X size={16} />}
                  disabled={isProcessing}
                >
                  Decline
                </Button>
                <Button
                  onClick={handleAccept}
                  className="w-full sm:w-auto"
                  icon={
                    isProcessing ? (
                      <Loader2 className="animate-spin" size={16} />
                    ) : (
                      <Check size={16} />
                    )
                  }
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing..." : "Accept & Pay"}
                </Button>
              </DialogFooter>
            )}
          </div>
        ) : (
          <div className="py-6 text-center">
            <p>Failed to load request details. Please try again.</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
