import { Card, CardContent } from "./ui/card";
import { cn } from "../lib/utils";

interface BloodTypeCardProps {
  bloodType: string;
  quantity: number;
  status: "high" | "medium" | "low" | "critical";
  className?: string;
}

export function BloodTypeCard({
  bloodType,
  quantity,
  status,
  className,
}: BloodTypeCardProps) {
  const statusColor = {
    high: "bg-green-100 text-green-800",
    medium: "bg-blue-100 text-blue-800",
    low: "bg-amber-100 text-amber-800",
    critical: "bg-red-100 text-red-800",
  };

  const statusBorderColor = {
    high: "border-green-200",
    medium: "border-blue-200",
    low: "border-amber-200",
    critical: "border-red-200",
  };

  return (
    <Card
      className={cn(
        "overflow-hidden border-2",
        statusBorderColor[status],
        className
      )}
    >
      <CardContent className="p-0 flex">
        <div className="flex items-center justify-center p-4 bg-[#D11B2F] text-white font-bold text-2xl w-20">
          {bloodType}
        </div>
        <div className="flex flex-col justify-center px-4 py-3 flex-1">
          <div className="text-sm text-muted-foreground">Units Available</div>
          <div className="text-2xl font-bold">{quantity}</div>
          <span
            className={cn(
              "text-xs px-2 py-0.5 mt-1 rounded-full inline-block w-fit",
              statusColor[status]
            )}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

export default BloodTypeCard;
