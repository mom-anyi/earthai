import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "../ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  BarChart,
  LineChart,
  PieChart,
  TrendingUp,
  Download,
  Calendar,
  Target,
  Filter,
} from "lucide-react";

interface WasteAnalyticsProps {
  title?: string;
  description?: string;
  data?: {
    collections: {
      date: string;
      amount: number;
      type: string;
    }[];
    trends: {
      month: string;
      plastic: number;
      paper: number;
      organic: number;
      metal: number;
    }[];
    targets: {
      category: string;
      current: number;
      target: number;
    }[];
  };
}

const WasteAnalytics: React.FC<WasteAnalyticsProps> = ({
  title = "Waste Collection Analytics",
  description = "Detailed analytics for waste collection with charts, reports, and target setting tools.",
  data = {
    collections: [
      { date: "2023-01-01", amount: 120, type: "Plastic" },
      { date: "2023-01-02", amount: 85, type: "Paper" },
      { date: "2023-01-03", amount: 150, type: "Organic" },
      { date: "2023-01-04", amount: 65, type: "Metal" },
      { date: "2023-01-05", amount: 110, type: "Plastic" },
    ],
    trends: [
      { month: "Jan", plastic: 120, paper: 85, organic: 150, metal: 65 },
      { month: "Feb", plastic: 140, paper: 90, organic: 130, metal: 70 },
      { month: "Mar", plastic: 160, paper: 95, organic: 140, metal: 75 },
      { month: "Apr", plastic: 180, paper: 100, organic: 160, metal: 80 },
      { month: "May", plastic: 200, paper: 110, organic: 180, metal: 85 },
    ],
    targets: [
      { category: "Plastic", current: 180, target: 200 },
      { category: "Paper", current: 100, target: 150 },
      { category: "Organic", current: 160, target: 200 },
      { category: "Metal", current: 80, target: 100 },
    ],
  },
}) => {
  const [timeRange, setTimeRange] = useState("monthly");
  const [wasteType, setWasteType] = useState("all");

  // Placeholder for chart components
  const CollectionTrendsChart = () => (
    <div className="h-64 w-full bg-slate-100 rounded-lg flex items-center justify-center">
      <div className="text-center">
        <LineChart className="h-12 w-12 mx-auto text-slate-400" />
        <p className="mt-2 text-sm text-slate-500">
          Collection Trends Visualization
        </p>
      </div>
    </div>
  );

  const WasteDistributionChart = () => (
    <div className="h-64 w-full bg-slate-100 rounded-lg flex items-center justify-center">
      <div className="text-center">
        <PieChart className="h-12 w-12 mx-auto text-slate-400" />
        <p className="mt-2 text-sm text-slate-500">
          Waste Distribution by Type
        </p>
      </div>
    </div>
  );

  const TargetProgressChart = () => (
    <div className="h-64 w-full bg-slate-100 rounded-lg flex items-center justify-center">
      <div className="text-center">
        <BarChart className="h-12 w-12 mx-auto text-slate-400" />
        <p className="mt-2 text-sm text-slate-500">
          Target Progress Visualization
        </p>
      </div>
    </div>
  );

  return (
    <Card className="w-full h-full bg-white overflow-hidden">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <div className="flex space-x-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[150px]">
                <Calendar className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
            <Select value={wasteType} onValueChange={setWasteType}>
              <SelectTrigger className="w-[150px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Waste Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="plastic">Plastic</SelectItem>
                <SelectItem value="paper">Paper</SelectItem>
                <SelectItem value="organic">Organic</SelectItem>
                <SelectItem value="metal">Metal</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="trends" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="trends">
              <TrendingUp className="mr-2 h-4 w-4" />
              Trends
            </TabsTrigger>
            <TabsTrigger value="distribution">
              <PieChart className="mr-2 h-4 w-4" />
              Distribution
            </TabsTrigger>
            <TabsTrigger value="targets">
              <Target className="mr-2 h-4 w-4" />
              Targets
            </TabsTrigger>
          </TabsList>

          <TabsContent value="trends" className="space-y-4">
            <CollectionTrendsChart />
            <div className="mt-4">
              <h3 className="text-lg font-medium mb-2">Collection Trends</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-slate-100">
                      <th className="p-2 text-left">Month</th>
                      <th className="p-2 text-left">Plastic</th>
                      <th className="p-2 text-left">Paper</th>
                      <th className="p-2 text-left">Organic</th>
                      <th className="p-2 text-left">Metal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.trends.map((item, index) => (
                      <tr key={index} className="border-b border-slate-200">
                        <td className="p-2">{item.month}</td>
                        <td className="p-2">{item.plastic} kg</td>
                        <td className="p-2">{item.paper} kg</td>
                        <td className="p-2">{item.organic} kg</td>
                        <td className="p-2">{item.metal} kg</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="distribution" className="space-y-4">
            <WasteDistributionChart />
            <div className="mt-4">
              <h3 className="text-lg font-medium mb-2">Waste Distribution</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {["Plastic", "Paper", "Organic", "Metal"].map((type) => {
                  const total = data.collections
                    .filter((item) => item.type === type)
                    .reduce((sum, item) => sum + item.amount, 0);

                  return (
                    <Card key={type} className="bg-slate-50">
                      <CardContent className="p-4">
                        <p className="text-sm text-slate-500">{type}</p>
                        <p className="text-2xl font-bold">{total} kg</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="targets" className="space-y-4">
            <TargetProgressChart />
            <div className="mt-4">
              <h3 className="text-lg font-medium mb-2">Target Progress</h3>
              <div className="space-y-4">
                {data.targets.map((item, index) => {
                  const percentage = Math.round(
                    (item.current / item.target) * 100,
                  );

                  return (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between">
                        <span>{item.category}</span>
                        <span>
                          {percentage}% ({item.current}/{item.target} kg)
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2.5">
                        <div
                          className="bg-primary h-2.5 rounded-full"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="border-t pt-4 flex justify-between">
        <div className="text-sm text-slate-500">
          Last updated: {new Date().toLocaleDateString()}
        </div>
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WasteAnalytics;
