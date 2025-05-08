import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", collected: 40, used: 35 },
  { name: "Feb", collected: 30, used: 28 },
  { name: "Mar", collected: 50, used: 45 },
  { name: "Apr", collected: 45, used: 48 },
  { name: "May", collected: 60, used: 55 },
  { name: "Jun", collected: 75, used: 70 },
];

export function BloodUsageChart() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Blood Usage Trends</CardTitle>
        <CardDescription>
          Comparison of collected and used blood units
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #ddd",
                }}
                labelStyle={{ fontWeight: "bold" }}
              />
              <Legend />
              <Bar dataKey="collected" name="Units Collected" fill="#EA384C" />
              <Bar dataKey="used" name="Units Used" fill="#7D101D" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export default BloodUsageChart;
