
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, CalendarClock, ShieldCheck } from "lucide-react";
import { useAccreditationData } from "@/hooks/useAccreditationData";
import { Skeleton } from "@/components/ui/skeleton";
import { format, parseISO } from "date-fns";

export const AccreditationTile = () => {
  const { data: accreditations, isLoading } = useAccreditationData();

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'ACCREDITED': return 'bg-green-100 text-green-800';
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-red-100 text-red-800';
    }
  };

  if (isLoading || !accreditations) {
    return (
      <Card className="h-full">
        <CardHeader><Skeleton className="h-5 w-3/5" /></CardHeader>
        <CardContent><Skeleton className="h-40 w-full" /></CardContent>
      </Card>
    )
  }

  const upcomingReview = accreditations.find(a => new Date(a.next_review_date) > new Date());

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-yellow-500/10 rounded-lg">
              <Trophy className="h-5 w-5 text-yellow-500" />
            </div>
            <div>
              <CardTitle className="text-lg">Accreditation</CardTitle>
              <CardDescription>Status of accreditations</CardDescription>
            </div>
          </div>
          {upcomingReview && (
            <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">
              <CalendarClock className="h-3 w-3 mr-1" />
              Next: {format(parseISO(upcomingReview.next_review_date), "MMM d, yyyy")}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {accreditations.length > 0 ? (
          accreditations.slice(0, 3).map((acc, i) => (
            <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
              <div>
                <div className="font-semibold text-sm">{acc.name}</div>
                <div className="text-xs text-muted-foreground">{acc.accrediting_body}</div>
              </div>
              <Badge className={`text-xs ${getStatusVariant(acc.status)}`}>{acc.status}</Badge>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-muted-foreground text-sm">No accreditation data</div>
        )}
        <div className="text-xs text-muted-foreground bg-green-50 p-2 rounded">
          <ShieldCheck className="h-3 w-3 inline mr-1 text-green-600" />
          All mandatory reporting is up to date.
        </div>
      </CardContent>
    </Card>
  );
};
