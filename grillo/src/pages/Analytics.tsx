import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { BloodUsageChart } from "../components/BloodUsageChart";

const Analytics = () => {
  return (
    <div className="container mx-auto py-10">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Analytics</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <BloodUsageChart />
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
