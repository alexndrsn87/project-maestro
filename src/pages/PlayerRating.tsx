
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Shield, Users, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function PlayerRating() {
  // Mock data - in a real app this would come from API/database
  const gameData = {
    date: "15 Apr 2023",
    players: [
      { id: 1, name: "James Smith" },
      { id: 2, name: "David Johnson" },
      { id: 3, name: "Michael Brown" },
      { id: 4, name: "Robert Wilson" },
      { id: 5, name: "William Taylor" },
      { id: 6, name: "John Davies" },
      { id: 7, name: "Richard Evans" },
      { id: 8, name: "Thomas Roberts" },
      { id: 9, name: "Joseph Green" },
      { id: 10, name: "Charles Wright" },
    ]
  };

  // State for tracking ratings
  const [ratings, setRatings] = useState<Record<number, { rating: number; position: string; feedback: string; manOfMatch: boolean }>>({});
  const { toast } = useToast();

  // Handler for rating changes
  const handleRatingChange = (playerId: number, field: string, value: any) => {
    setRatings(prev => ({
      ...prev,
      [playerId]: {
        ...(prev[playerId] || { rating: 0, position: "", feedback: "", manOfMatch: false }),
        [field]: value
      }
    }));
  };

  // Submit handler
  const handleSubmit = () => {
    // Here you would send the ratings to your backend
    console.log("Submitting ratings:", ratings);
    
    // Show a success toast
    toast({
      title: "Ratings submitted successfully",
      description: "Thank you for rating the players!",
    });
  };

  return (
    <div className="container max-w-4xl py-8 px-4 mx-auto">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl md:text-3xl">Rate Players</CardTitle>
          <CardDescription className="text-lg">Game on {gameData.date}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {gameData.players.map((player) => (
              <div key={player.id} className="border-b pb-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">{player.name}</h3>
                  <div className="flex items-center mt-2 md:mt-0">
                    <Checkbox 
                      id={`mom-${player.id}`} 
                      checked={ratings[player.id]?.manOfMatch || false}
                      onCheckedChange={(checked) => 
                        handleRatingChange(player.id, "manOfMatch", checked)
                      }
                    />
                    <Label htmlFor={`mom-${player.id}`} className="ml-2 cursor-pointer">
                      Man of the Match
                    </Label>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Rating selection */}
                  <div>
                    <Label className="block mb-2">Rating (1-10)</Label>
                    <ToggleGroup 
                      type="single" 
                      value={ratings[player.id]?.rating?.toString() || ""}
                      onValueChange={(value) => 
                        handleRatingChange(player.id, "rating", parseInt(value))
                      }
                      className="flex flex-wrap justify-start"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                        <ToggleGroupItem 
                          key={num} 
                          value={num.toString()}
                          className="w-10 h-10 flex items-center justify-center data-[state=on]:bg-action-orange data-[state=on]:text-white"
                        >
                          {num}
                        </ToggleGroupItem>
                      ))}
                    </ToggleGroup>
                  </div>

                  {/* Position selection */}
                  <div>
                    <Label className="block mb-2">Best Position</Label>
                    <RadioGroup 
                      value={ratings[player.id]?.position || ""}
                      onValueChange={(value) => 
                        handleRatingChange(player.id, "position", value)
                      }
                      className="flex flex-col space-y-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Defence" id={`defence-${player.id}`} />
                        <Label htmlFor={`defence-${player.id}`} className="flex items-center cursor-pointer">
                          <Shield className="h-4 w-4 mr-1" />
                          Defence
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Midfield" id={`midfield-${player.id}`} />
                        <Label htmlFor={`midfield-${player.id}`} className="flex items-center cursor-pointer">
                          <Users className="h-4 w-4 mr-1" />
                          Midfield
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Attack" id={`attack-${player.id}`} />
                        <Label htmlFor={`attack-${player.id}`} className="flex items-center cursor-pointer">
                          <ChevronRight className="h-4 w-4 mr-1" />
                          Attack
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                {/* Anonymous feedback */}
                <div className="mt-4">
                  <Label htmlFor={`feedback-${player.id}`} className="block mb-2">
                    Optional Anonymous Feedback
                  </Label>
                  <Textarea 
                    id={`feedback-${player.id}`} 
                    placeholder="Share your thoughts on this player's performance..."
                    value={ratings[player.id]?.feedback || ""}
                    onChange={(e) => 
                      handleRatingChange(player.id, "feedback", e.target.value)
                    }
                    className="resize-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full md:w-auto bg-action-orange hover:bg-action-orange/90" 
            size="lg"
            onClick={handleSubmit}
          >
            Submit Ratings
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
