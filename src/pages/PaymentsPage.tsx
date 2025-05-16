
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { CalendarDays, Clock, BadgeDollarSign, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function PaymentsPage() {
  // Mock data - in a real app this would come from API/database
  const gameData = {
    date: "22 Apr 2023",
    time: "19:00",
    fee: 7.50,
    isPaid: false,
    kittyEnabled: true,
    kittyAmount: 0.50,
  };
  
  const { toast } = useToast();

  const handlePayment = () => {
    // In a real app, this would trigger a payment gateway
    console.log("Processing payment...");
    
    // Show success toast
    toast({
      title: "Payment successful",
      description: "Thank you for your payment!",
    });
  };

  return (
    <div className="container max-w-md py-8 px-4 mx-auto">
      <Card className="overflow-hidden border-2">
        <div className="bg-pitch-green text-white p-6 text-center">
          <h1 className="text-2xl font-bold mb-1">Game Payment</h1>
          <p className="text-white/80">Secure your spot in the upcoming game</p>
        </div>
        
        <CardHeader>
          <CardTitle className="flex items-center justify-center text-xl">
            <CalendarDays className="mr-2 h-5 w-5" />
            {gameData.date}
          </CardTitle>
          <CardDescription className="flex items-center justify-center text-base">
            <Clock className="mr-2 h-5 w-5" />
            {gameData.time}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-6">
            {/* Payment Status */}
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center">
                <BadgeDollarSign className="h-5 w-5 mr-2 text-pitch-green" />
                <span className="font-medium">Status</span>
              </div>
              {gameData.isPaid ? (
                <div className="flex items-center text-green-600">
                  <Check className="h-5 w-5 mr-1" />
                  <span className="font-medium">Paid</span>
                </div>
              ) : (
                <span className="text-amber-500 font-medium">Not Paid</span>
              )}
            </div>
            
            {/* Payment Details */}
            {!gameData.isPaid && (
              <div className="space-y-6">
                <div className="p-4 border rounded-lg space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Game Fee</span>
                    <span className="font-bold">£{gameData.fee.toFixed(2)}</span>
                  </div>
                  
                  {gameData.kittyEnabled && (
                    <div className="pt-3 border-t">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="kitty" />
                        <div className="flex justify-between items-center w-full">
                          <Label htmlFor="kitty" className="cursor-pointer">
                            Add to Kitty (End-of-season rewards)
                          </Label>
                          <span className="font-medium">£{gameData.kittyAmount.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="pt-3 border-t flex justify-between items-center">
                    <span className="font-bold">Total</span>
                    <span className="text-xl font-bold">£{gameData.fee.toFixed(2)}</span>
                  </div>
                </div>
                
                {/* Payment Methods */}
                <div className="space-y-3">
                  <div className="bg-muted/30 p-3 rounded-lg flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center mr-3">
                        <span className="text-white font-bold">P</span>
                      </div>
                      <span>PayPal</span>
                    </div>
                    <div className="h-4 w-4 rounded-full border-2 border-action-orange flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-action-orange"></div>
                    </div>
                  </div>
                  
                  <div className="bg-muted/30 p-3 rounded-lg flex items-center justify-between opacity-60">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center mr-3">
                        <span className="text-white font-bold">C</span>
                      </div>
                      <span>Card Payment</span>
                    </div>
                    <div className="h-4 w-4 rounded-full border-2 border-gray-400"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
        
        <CardFooter>
          {!gameData.isPaid && (
            <Button 
              className="w-full bg-action-orange hover:bg-action-orange/90 text-white"
              size="lg"
              onClick={handlePayment}
            >
              Pay Now
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
