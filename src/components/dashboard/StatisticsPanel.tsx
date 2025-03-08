import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Progress } from "../ui/progress";
import { ArrowUpRight, Recycle, Target, TrendingUp } from "lucide-react";

interface StatisticCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  trend?: number;
  color?: string;
}

const StatisticCard = ({
  title = "Statistic",
  value = "0",
  description = "Description of this statistic",
  icon = <Recycle />,
  trend = 0,
  color = "bg-green-500",
}: StatisticCardProps) => {
  return (
    <Card className="bg-white">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={`p-2 rounded-full ${color} text-white`}>{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
        {trend !== 0 && (
          <div
            className={`flex items-center mt-2 text-xs ${trend > 0 ? "text-green-500" : "text-red-500"}`}
          >
            <ArrowUpRight
              className={`h-4 w-4 ${trend < 0 ? "rotate-180" : ""}`}
            />
            <span className="ml-1">{Math.abs(trend)}% from last month</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface RecyclingGoalProps {
  title: string;
  current: number;
  target: number;
  unit: string;
}

const RecyclingGoal = ({
  title = "Plastic Recycling",
  current = 45,
  target = 100,
  unit = "kg",
}: RecyclingGoalProps) => {
  const progress = Math.min(Math.round((current / target) * 100), 100);

  return (
    <Card className="bg-white">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="p-2 rounded-full bg-blue-500 text-white">
          <Target className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium">
            {current} {unit}
          </span>
          <span className="text-sm text-muted-foreground">
            {target} {unit}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
        <p className="text-xs text-muted-foreground mt-2">
          {progress}% of goal reached
        </p>
      </CardContent>
    </Card>
  );
};

interface StatisticsPanelProps {
  personalStats?: {
    totalRecycled: number;
    monthlyAverage: number;
    impactScore: number;
    carbonSaved: number;
  };
  recyclingGoals?: {
    plastic: { current: number; target: number };
    paper: { current: number; target: number };
    glass: { current: number; target: number };
    metal: { current: number; target: number };
  };
}

const StatisticsPanel = ({
  personalStats = {
    totalRecycled: 342,
    monthlyAverage: 28.5,
    impactScore: 87,
    carbonSaved: 156,
  },
  recyclingGoals = {
    plastic: { current: 45, target: 100 },
    paper: { current: 78, target: 100 },
    glass: { current: 23, target: 50 },
    metal: { current: 12, target: 25 },
  },
}: StatisticsPanelProps) => {
  return (
    <div className="w-full bg-gray-50 p-6 rounded-xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Your Recycling Statistics</h2>
        <div className="flex items-center text-sm text-blue-600">
          <span>View detailed history</span>
          <TrendingUp className="ml-2 h-4 w-4" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatisticCard
          title="Total Recycled"
          value={`${personalStats.totalRecycled} kg`}
          description="Total waste recycled since you joined"
          icon={<Recycle className="h-4 w-4" />}
          trend={12}
          color="bg-green-500"
        />
        <StatisticCard
          title="Monthly Average"
          value={`${personalStats.monthlyAverage} kg`}
          description="Average recycling per month"
          icon={<TrendingUp className="h-4 w-4" />}
          trend={-3}
          color="bg-blue-500"
        />
        <StatisticCard
          title="Impact Score"
          value={personalStats.impactScore.toString()}
          description="Your environmental impact rating"
          icon={<Target className="h-4 w-4" />}
          trend={5}
          color="bg-purple-500"
        />
        <StatisticCard
          title="Carbon Saved"
          value={`${personalStats.carbonSaved} kg`}
          description="CO₂ emissions prevented"
          icon={<Recycle className="h-4 w-4" />}
          color="bg-emerald-500"
        />
      </div>

      <h3 className="text-lg font-semibold mb-4">Your Recycling Goals</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <RecyclingGoal
          title="Plastic Recycling"
          current={recyclingGoals.plastic.current}
          target={recyclingGoals.plastic.target}
          unit="kg"
        />
        <RecyclingGoal
          title="Paper Recycling"
          current={recyclingGoals.paper.current}
          target={recyclingGoals.paper.target}
          unit="kg"
        />
        <RecyclingGoal
          title="Glass Recycling"
          current={recyclingGoals.glass.current}
          target={recyclingGoals.glass.target}
          unit="kg"
        />
        <RecyclingGoal
          title="Metal Recycling"
          current={recyclingGoals.metal.current}
          target={recyclingGoals.metal.target}
          unit="kg"
        />
      </div>
    </div>
  );
};

export default StatisticsPanel;
