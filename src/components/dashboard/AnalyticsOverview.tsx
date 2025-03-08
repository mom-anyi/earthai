import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  ArrowUpRight,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Users,
  Recycle,
  Activity,
  FileBarChart,
} from "lucide-react";

interface AnalyticsOverviewProps {
  metrics?: {
    wasteCollected: {
      value: number;
      trend: number;
      unit: string;
    };
    recyclingRate: {
      value: number;
      trend: number;
      unit: string;
    };
    employmentCreated: {
      value: number;
      trend: number;
      unit: string;
    };
    healthImpact: {
      value: number;
      trend: number;
      unit: string;
    };
  };
  alerts?: {
    id: string;
    type: "warning" | "info" | "success" | "error";
    message: string;
  }[];
}

const AnalyticsOverview = ({
  metrics = {
    wasteCollected: { value: 1250, trend: 12, unit: "kg" },
    recyclingRate: { value: 68, trend: 5, unit: "%" },
    employmentCreated: { value: 24, trend: -3, unit: "jobs" },
    healthImpact: { value: 85, trend: 7, unit: "points" },
  },
  alerts = [
    {
      id: "1",
      type: "warning",
      message: "Collection point #12 is nearing capacity",
    },
    {
      id: "2",
      type: "info",
      message: "New recycling program launched in Zone B",
    },
    { id: "3", type: "success", message: "Monthly recycling target achieved" },
  ],
}: AnalyticsOverviewProps) => {
  const getTrendIcon = (trend: number) => {
    if (trend > 0) return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (trend < 0) return <TrendingDown className="h-4 w-4 text-red-500" />;
    return null;
  };

  const getAlertIcon = (type: "warning" | "info" | "success" | "error") => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case "info":
        return <FileBarChart className="h-4 w-4 text-blue-500" />;
      case "success":
        return <Recycle className="h-4 w-4 text-green-500" />;
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getAlertBadgeVariant = (
    type: "warning" | "info" | "success" | "error",
  ) => {
    switch (type) {
      case "warning":
        return "secondary";
      case "info":
        return "default";
      case "success":
        return "default";
      case "error":
        return "destructive";
      default:
        return "default";
    }
  };

  return (
    <div className="w-full bg-background p-6 rounded-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Analytics Overview</h2>
        <p className="text-muted-foreground">
          Key metrics and trends for waste management operations
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Waste Collected
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-baseline">
                <span className="text-2xl font-bold">
                  {metrics.wasteCollected.value}
                </span>
                <span className="ml-1 text-sm text-muted-foreground">
                  {metrics.wasteCollected.unit}
                </span>
              </div>
              <div className="flex items-center">
                {getTrendIcon(metrics.wasteCollected.trend)}
                <span
                  className={`ml-1 text-sm ${metrics.wasteCollected.trend > 0 ? "text-green-500" : metrics.wasteCollected.trend < 0 ? "text-red-500" : ""}`}
                >
                  {Math.abs(metrics.wasteCollected.trend)}%
                </span>
              </div>
            </div>
            <div className="mt-2">
              <Recycle className="h-5 w-5 text-primary inline mr-1" />
              <span className="text-xs text-muted-foreground">This month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Recycling Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-baseline">
                <span className="text-2xl font-bold">
                  {metrics.recyclingRate.value}
                </span>
                <span className="ml-1 text-sm text-muted-foreground">
                  {metrics.recyclingRate.unit}
                </span>
              </div>
              <div className="flex items-center">
                {getTrendIcon(metrics.recyclingRate.trend)}
                <span
                  className={`ml-1 text-sm ${metrics.recyclingRate.trend > 0 ? "text-green-500" : metrics.recyclingRate.trend < 0 ? "text-red-500" : ""}`}
                >
                  {Math.abs(metrics.recyclingRate.trend)}%
                </span>
              </div>
            </div>
            <div className="mt-2">
              <Activity className="h-5 w-5 text-primary inline mr-1" />
              <span className="text-xs text-muted-foreground">
                Current average
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Employment Created
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-baseline">
                <span className="text-2xl font-bold">
                  {metrics.employmentCreated.value}
                </span>
                <span className="ml-1 text-sm text-muted-foreground">
                  {metrics.employmentCreated.unit}
                </span>
              </div>
              <div className="flex items-center">
                {getTrendIcon(metrics.employmentCreated.trend)}
                <span
                  className={`ml-1 text-sm ${metrics.employmentCreated.trend > 0 ? "text-green-500" : metrics.employmentCreated.trend < 0 ? "text-red-500" : ""}`}
                >
                  {Math.abs(metrics.employmentCreated.trend)}%
                </span>
              </div>
            </div>
            <div className="mt-2">
              <Users className="h-5 w-5 text-primary inline mr-1" />
              <span className="text-xs text-muted-foreground">
                This quarter
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Health Impact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-baseline">
                <span className="text-2xl font-bold">
                  {metrics.healthImpact.value}
                </span>
                <span className="ml-1 text-sm text-muted-foreground">
                  {metrics.healthImpact.unit}
                </span>
              </div>
              <div className="flex items-center">
                {getTrendIcon(metrics.healthImpact.trend)}
                <span
                  className={`ml-1 text-sm ${metrics.healthImpact.trend > 0 ? "text-green-500" : metrics.healthImpact.trend < 0 ? "text-red-500" : ""}`}
                >
                  {Math.abs(metrics.healthImpact.trend)}%
                </span>
              </div>
            </div>
            <div className="mt-2">
              <Activity className="h-5 w-5 text-primary inline mr-1" />
              <span className="text-xs text-muted-foreground">
                Overall score
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts Section */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-3">Recent Alerts</h3>
        <Card>
          <CardContent className="p-4">
            {alerts.length > 0 ? (
              <ul className="space-y-2">
                {alerts.map((alert) => (
                  <li
                    key={alert.id}
                    className="flex items-center justify-between p-2 rounded-md bg-muted/50"
                  >
                    <div className="flex items-center">
                      {getAlertIcon(alert.type)}
                      <span className="ml-2">{alert.message}</span>
                    </div>
                    <Badge variant={getAlertBadgeVariant(alert.type)}>
                      {alert.type.charAt(0).toUpperCase() + alert.type.slice(1)}
                    </Badge>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-muted-foreground">
                No alerts at this time
              </p>
            )}
          </CardContent>
          <CardFooter className="flex justify-end p-4 pt-0">
            <Button variant="outline" size="sm" className="flex items-center">
              View All Alerts
              <ArrowUpRight className="ml-1 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Quick Actions</h3>
        <div className="flex flex-wrap gap-2">
          <Button size="sm">Generate Report</Button>
          <Button size="sm" variant="outline">
            Set Collection Targets
          </Button>
          <Button size="sm" variant="outline">
            Manage Alerts
          </Button>
          <Button size="sm" variant="outline">
            View Detailed Analytics
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsOverview;
