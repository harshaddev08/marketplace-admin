import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { StatusBadge } from "../StatusBadge";

interface Activity {
  id: string;
  type: "booking" | "signup" | "provider";
  user: {
    name: string;
    avatar?: string;
  };
  description: string;
  time: string;
  status?: "pending" | "confirmed" | "completed" | "cancelled" | "verified";
}

const recentActivities: Activity[] = [
  {
    id: "1",
    type: "booking",
    user: {
      name: "Sarah Johnson",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    },
    description: "Booked a plumbing service",
    time: "2 min ago",
    status: "pending",
  },
  {
    id: "2",
    type: "provider",
    user: {
      name: "Mike Chen",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    },
    description: "Applied as Electrician",
    time: "15 min ago",
    status: "pending",
  },
  {
    id: "3",
    type: "signup",
    user: { name: "Emily Davis" },
    description: "New user registration",
    time: "1 hour ago",
  },
  {
    id: "4",
    type: "booking",
    user: {
      name: "Alex Thompson",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
    },
    description: "Completed cleaning service",
    time: "2 hours ago",
    status: "completed",
  },
  {
    id: "5",
    type: "provider",
    user: {
      name: "Lisa Wang",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    },
    description: "Provider verified",
    time: "3 hours ago",
    status: "verified",
  },
];

export const RecentActivity = () => {
  return (
    <div
      className="glass rounded-xl p-6 opacity-0 animate-fade-in"
      style={{ animationDelay: "600ms" }}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">Recent Activity</h3>
          <p className="text-sm text-muted-foreground">
            Latest platform events
          </p>
        </div>
        <button className="text-sm text-primary hover:underline">
          View all
        </button>
      </div>
      <div className="space-y-4">
        {recentActivities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary/30 transition-colors"
          >
            <Avatar className="w-10 h-10">
              <AvatarImage src={activity.user.avatar} />
              <AvatarFallback className="bg-primary/10 text-primary text-sm">
                {activity.user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {activity.user.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {activity.description}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {activity.status && <StatusBadge status={activity.status} />}
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {activity.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
