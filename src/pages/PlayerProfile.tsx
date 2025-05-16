
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Users, Shield, ChevronRight } from "lucide-react";

export default function PlayerProfile() {
  // Mock data - in a real app this would come from API/database
  const playerData = {
    name: "James Smith",
    avatarUrl: "https://i.pravatar.cc/300?u=james",
    overallRating: 7.8,
    preferredPosition: "Midfield",
    positionRatings: {
      Defence: 7.2,
      Midfield: 8.4,
      Attack: 7.6,
    },
    recentGames: [
      { date: "2023-04-12", rating: 8.5, position: "Midfield" },
      { date: "2023-04-05", rating: 7.0, position: "Attack" },
      { date: "2023-03-29", rating: 8.2, position: "Midfield" },
      { date: "2023-03-22", rating: 6.8, position: "Defence" },
      { date: "2023-03-15", rating: 8.5, position: "Midfield" },
    ],
  };

  // Helper function to format dates
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
    });
  };

  // Helper function for position icons
  const getPositionIcon = (position: string) => {
    switch (position) {
      case "Defence":
        return <Shield className="h-5 w-5" />;
      case "Attack":
        return <ChevronRight className="h-5 w-5" />;
      default:
        return <Users className="h-5 w-5" />;
    }
  };

  return (
    <div className="container max-w-4xl py-8 px-4 mx-auto">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Player Avatar and Basic Info */}
        <div className="md:w-1/3">
          <Card>
            <CardHeader className="pb-2">
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4 border-4 border-pitch-green">
                <AspectRatio ratio={1 / 1}>
                  <img 
                    src={playerData.avatarUrl} 
                    alt={playerData.name} 
                    className="object-cover w-full h-full"
                  />
                </AspectRatio>
              </div>
              <CardTitle className="text-2xl font-bold text-center">{playerData.name}</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Overall Rating */}
              <div className="flex flex-col items-center mb-6">
                <div className="text-sm text-muted-foreground mb-1">Overall Rating</div>
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <svg className="w-full h-full" viewBox="0 0 36 36">
                    <circle 
                      cx="18" cy="18" r="16" 
                      fill="none" 
                      stroke="#e6e6e6" 
                      strokeWidth="2"
                    />
                    <circle 
                      cx="18" cy="18" r="16" 
                      fill="none" 
                      stroke="#FF6B35" 
                      strokeWidth="2"
                      strokeDasharray={`${100 * playerData.overallRating / 10} 100`}
                      strokeDashoffset="25"
                      transform="rotate(-90 18 18)"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold">
                    {playerData.overallRating}
                  </div>
                </div>
              </div>
              
              {/* Preferred Position */}
              <div className="bg-muted/50 rounded-lg p-3 flex items-center justify-between">
                <span className="text-sm">Preferred Position</span>
                <span className="font-medium flex items-center">
                  {getPositionIcon(playerData.preferredPosition)}
                  <span className="ml-1">{playerData.preferredPosition}</span>
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Player Stats and History */}
        <div className="md:w-2/3">
          <Card>
            <CardHeader>
              <CardTitle>Player Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="ratings">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="ratings">Position Ratings</TabsTrigger>
                  <TabsTrigger value="history">Game History</TabsTrigger>
                </TabsList>
                <TabsContent value="ratings" className="pt-4">
                  {/* Position Ratings */}
                  <div className="space-y-4">
                    {Object.entries(playerData.positionRatings).map(([position, rating]) => (
                      <div key={position} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            {getPositionIcon(position)}
                            <span className="ml-2 text-sm font-medium">{position}</span>
                          </div>
                          <span className="text-sm font-bold">{rating}</span>
                        </div>
                        <Progress value={rating * 10} className="h-2" />
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="history" className="pt-4">
                  {/* Game History */}
                  <div className="divide-y">
                    {playerData.recentGames.map((game, index) => (
                      <div key={index} className="py-3 flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium">{formatDate(game.date)}</div>
                          <div className="text-xs text-muted-foreground flex items-center">
                            {getPositionIcon(game.position)}
                            <span className="ml-1">{game.position}</span>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-action-orange mr-1" fill="#FF6B35" />
                          <span className="font-bold">{game.rating}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
