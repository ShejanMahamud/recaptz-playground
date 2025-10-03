import { Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface EventLogProps {
  events: string[];
  darkMode?: boolean;
}

export function EventLog({ events, darkMode }: EventLogProps) {
  if (events.length === 0) return null;

  return (
    <Card className={darkMode ? "dark border-gray-800" : ""}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Activity className="w-5 h-5" />
          Event Log
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-24 sm:h-32 w-full">
          <div className="space-y-2">
            {events.map((event, index) => (
              <div
                key={index}
                className="text-xs sm:text-sm font-mono p-2 rounded bg-muted"
              >
                {event}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
