
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { format } from "date-fns";
import { Award, Star, Trophy, Heart, Zap } from "lucide-react";
import { useStudentBadges } from "@/hooks/useStudentBadges";

export function BadgesTab() {
  const { user } = useAuth();
  const { data: badges } = useStudentBadges(user?.id);

  // Map badge type to icon
  const getBadgeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'achievement':
        return <Trophy className="h-6 w-6" />;
      case 'sel':
        return <Heart className="h-6 w-6" />;
      case 'streak':
        return <Zap className="h-6 w-6" />;
      case 'milestone':
        return <Star className="h-6 w-6" />;
      default:
        return <Award className="h-6 w-6" />;
    }
  };

  // Group badges by type
  const badgesByType = badges?.reduce((acc, badge) => {
    const type = badge.badge_type || 'Other';
    if (!acc[type]) acc[type] = [];
    acc[type].push(badge);
    return acc;
  }, {} as Record<string, typeof badges>) || {};

  const badgeTypes = Object.keys(badgesByType);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">My Badges</h2>
        <div className="bg-primary/10 text-primary px-3 py-1 rounded-full">
          <span className="font-bold">{badges?.length || 0}</span> badges earned
        </div>
      </div>

      {badgeTypes.length > 0 ? (
        badgeTypes.map((type) => (
          <Card key={type}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {getBadgeIcon(type)}
                {type} Badges
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {badgesByType[type]?.map((badge) => (
                  <div 
                    key={badge.id} 
                    className="flex flex-col items-center text-center bg-muted/50 p-4 rounded-lg"
                  >
                    <div className="rounded-full bg-primary/20 p-3 mb-2">
                      {getBadgeIcon(badge.badge_type || type)}
                    </div>
                    <h4 className="font-medium text-sm mb-1">{badge.badge_name}</h4>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(badge.date_earned), 'MMM d, yyyy')}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center py-12">
            <Award className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">No badges yet</h3>
            <p className="text-muted-foreground text-center max-w-md">
              Complete goals, maintain streaks, and participate in activities to earn badges!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
