
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, Clock, BadgeDollarSign, Check, X, Users } from "lucide-react";

export default function BookingPage() {
  // Mock data - in a real app this would come from API/database
  const upcomingGames = [
    {
      id: 1,
      date: "22 Apr 2023",
      time: "19:00",
      isPaid: false,
      isAvailable: true,
      teamsGenerated: false,
    },
    {
      id: 2,
      date: "29 Apr 2023",
      time: "19:00",
      isPaid: true,
      isAvailable: true,
      teamsGenerated: true,
      teams: {
        teamA: ["James S.", "Michael B.", "William T.", "Richard E.", "Joseph G."],
        teamB: ["David J.", "Robert W.", "John D.", "Thomas R.", "Charles W."]
      }
    },
    {
      id: 3,
      date: "06 May 2023",
      time: "19:00",
      isPaid: false,
      isAvailable: false,
      teamsGenerated: false,
    },
  ];

  // State for tracking availability
  const [availability, setAvailability] = useState<Record<number, boolean>>(
    upcomingGames.reduce((acc, game) => ({ ...acc, [game.id]: game.isAvailable }), {})
  );

  // Handler for availability toggle
  const handleAvailabilityChange = (gameId: number) => {
    setAvailability(prev => ({
      ...prev,
      [gameId]: !prev[gameId]
    }));
  };

  return (
    <div className="container max-w-4xl py-8 px-4 mx-auto">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl md:text-3xl">Game Availability</CardTitle>
          <p className="text-muted-foreground mt-2">
            Players who haven't paid by 24 hours before kickoff may not be considered for team selection.
          </p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="upcoming">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upcoming">Upcoming Games</TabsTrigger>
              <TabsTrigger value="past">Past Games</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming" className="pt-6">
              <div className="space-y-6">
                {upcomingGames.map((game) => (
                  <div key={game.id} className="border rounded-lg overflow-hidden">
                    {/* Game Header */}
                    <div className="bg-muted p-4 flex flex-col md:flex-row md:items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <CalendarDays className="h-5 w-5 text-pitch-green" />
                        <span className="font-medium">{game.date}</span>
                        <span className="text-muted-foreground">•</span>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1 text-pitch-green" />
                          <span>{game.time}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center mt-2 md:mt-0 space-x-2">
                        {/* Payment Status */}
                        {game.isPaid ? (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300 flex items-center">
                            <Check className="h-3 w-3 mr-1" />
                            Paid
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-300 flex items-center">
                            <BadgeDollarSign className="h-3 w-3 mr-1" />
                            Not Paid
                          </Badge>
                        )}
                        
                        {/* Availability Toggle */}
                        <div className="flex items-center space-x-2">
                          <span className="text-sm">Available?</span>
                          <Toggle
                            pressed={availability[game.id]}
                            onPressedChange={() => handleAvailabilityChange(game.id)}
                            aria-label="Toggle availability"
                            className={
                              availability[game.id]
                                ? "data-[state=on]:bg-green-600"
                                : "data-[state=on]:bg-red-600"
                            }
                          >
                            {availability[game.id] ? (
                              <Check className="h-4 w-4" />
                            ) : (
                              <X className="h-4 w-4" />
                            )}
                          </Toggle>
                        </div>
                      </div>
                    </div>
                    
                    {/* Teams Section (if generated) */}
                    {game.teamsGenerated && game.teams && (
                      <div className="p-4">
                        <h3 className="text-center font-medium mb-4 flex items-center justify-center">
                          <Users className="h-5 w-5 mr-2 text-pitch-green" />
                          Selected Teams
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-pitch-green/10 p-3 rounded-lg">
                            <h4 className="font-bold mb-2 text-pitch-green">Team A</h4>
                            <ul className="space-y-1">
                              {game.teams.teamA.map((player, idx) => (
                                <li key={idx} className="text-sm">{player}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="bg-action-orange/10 p-3 rounded-lg">
                            <h4 className="font-bold mb-2 text-action-orange">Team B</h4>
                            <ul className="space-y-1">
                              {game.teams.teamB.map((player, idx) => (
                                <li key={idx} className="text-sm">{player}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Action Buttons */}
                    <div className="bg-muted/50 p-3 flex justify-end space-x-3">
                      {!game.isPaid && (
                        <Button 
                          variant="outline"
                          className="bg-action-orange hover:bg-action-orange/90 text-white" 
                          size="sm"
                        >
                          Pay Now
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="past" className="pt-6">
              <div className="text-center text-muted-foreground py-8">
                Past games history will appear here
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
