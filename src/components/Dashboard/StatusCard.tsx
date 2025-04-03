
import { cn } from "@/lib/utils";

interface StatusCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  trend?: {
    direction: 'up' | 'down' | 'neutral';
    value: string;
  };
  className?: string;
}

export function StatusCard({ title, value, icon, description, trend, className }: StatusCardProps) {
  return (
    <div className={cn("rounded-lg border bg-card p-6 shadow-sm", className)}>
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-sm text-muted-foreground">{title}</h3>
        <div className="text-muted-foreground">{icon}</div>
      </div>
      <div className="mt-2 flex items-baseline">
        <div className="text-2xl font-semibold">{value}</div>
        {trend && (
          <span className={cn(
            "ml-2 text-xs",
            trend.direction === 'up' ? "text-green-600" : 
            trend.direction === 'down' ? "text-red-600" : "text-gray-500"
          )}>
            {trend.direction === 'up' ? '↑' : trend.direction === 'down' ? '↓' : '→'} {trend.value}
          </span>
        )}
      </div>
      {description && <p className="mt-1 text-xs text-muted-foreground">{description}</p>}
    </div>
  );
}
