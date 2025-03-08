import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import {
  BarChart,
  LineChart,
  Activity,
  Heart,
  Leaf,
  FileText,
  Download,
  Filter,
} from "lucide-react";

interface HealthMonitoringProps {
  healthData?: {
    airQuality: number;
    waterQuality: number;
    diseaseReduction: number;
    communityWellbeing: number;
  };
  environmentalImpact?: {
    carbonReduction: number;
    greenhouseGases: number;
    landReclamation: number;
    biodiversityImprovement: number;
  };
  reports?: {
    id: string;
    title: string;
    date: string;
    type: string;
  }[];
}

const HealthMonitoring = ({
  healthData = {
    airQuality: 78,
    waterQuality: 82,
    diseaseReduction: 45,
    communityWellbeing: 68,
  },
  environmentalImpact = {
    carbonReduction: 1250,
    greenhouseGases: 32,
    landReclamation: 15,
    biodiversityImprovement: 28,
  },
  reports = [
    {
      id: "1",
      title: "Quarterly Health Assessment",
      date: "2023-03-15",
      type: "Health",
    },
    {
      id: "2",
      title: "Environmental Impact Study",
      date: "2023-02-28",
      type: "Environment",
    },
    {
      id: "3",
      title: "Community Health Survey Results",
      date: "2023-01-10",
      type: "Health",
    },
    {
      id: "4",
      title: "Waste Management Health Effects",
      date: "2022-12-05",
      type: "Health",
    },
    {
      id: "5",
      title: "Biodiversity Improvement Report",
      date: "2022-11-22",
      type: "Environment",
    },
  ],
}: HealthMonitoringProps) => {
  const [activeTab, setActiveTab] = useState("health");

  return (
    <div className="w-full h-full bg-background p-4">
      <Card className="w-full h-full">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl font-bold">
                Health Monitoring Dashboard
              </CardTitle>
              <CardDescription>
                Track health outcomes and environmental impact metrics
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue="health"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="health">
                <Heart className="h-4 w-4 mr-2" />
                Health Outcomes
              </TabsTrigger>
              <TabsTrigger value="environment">
                <Leaf className="h-4 w-4 mr-2" />
                Environmental Impact
              </TabsTrigger>
              <TabsTrigger value="reports">
                <FileText className="h-4 w-4 mr-2" />
                Health Reports
              </TabsTrigger>
            </TabsList>

            <TabsContent value="health" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      Air Quality Improvement
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold">
                        {healthData.airQuality}%
                      </div>
                      <div className="h-16 w-full max-w-40">
                        {/* Placeholder for chart */}
                        <div className="bg-muted/30 h-full w-full rounded-md flex items-center justify-center">
                          <BarChart className="h-8 w-8 text-muted-foreground/70" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      Water Quality Improvement
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold">
                        {healthData.waterQuality}%
                      </div>
                      <div className="h-16 w-full max-w-40">
                        {/* Placeholder for chart */}
                        <div className="bg-muted/30 h-full w-full rounded-md flex items-center justify-center">
                          <LineChart className="h-8 w-8 text-muted-foreground/70" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      Disease Reduction
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold">
                        {healthData.diseaseReduction}%
                      </div>
                      <div className="h-16 w-full max-w-40">
                        {/* Placeholder for chart */}
                        <div className="bg-muted/30 h-full w-full rounded-md flex items-center justify-center">
                          <Activity className="h-8 w-8 text-muted-foreground/70" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      Community Wellbeing
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold">
                        {healthData.communityWellbeing}%
                      </div>
                      <div className="h-16 w-full max-w-40">
                        {/* Placeholder for chart */}
                        <div className="bg-muted/30 h-full w-full rounded-md flex items-center justify-center">
                          <Heart className="h-8 w-8 text-muted-foreground/70" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Health Trends Over Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 w-full bg-muted/30 rounded-md flex items-center justify-center">
                    <LineChart className="h-12 w-12 text-muted-foreground/70" />
                    <span className="ml-2 text-muted-foreground">
                      Health metrics visualization
                    </span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="environment" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      Carbon Reduction
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold">
                        {environmentalImpact.carbonReduction} tons
                      </div>
                      <div className="h-16 w-full max-w-40">
                        {/* Placeholder for chart */}
                        <div className="bg-muted/30 h-full w-full rounded-md flex items-center justify-center">
                          <BarChart className="h-8 w-8 text-muted-foreground/70" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      Greenhouse Gas Reduction
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold">
                        {environmentalImpact.greenhouseGases}%
                      </div>
                      <div className="h-16 w-full max-w-40">
                        {/* Placeholder for chart */}
                        <div className="bg-muted/30 h-full w-full rounded-md flex items-center justify-center">
                          <LineChart className="h-8 w-8 text-muted-foreground/70" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      Land Reclamation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold">
                        {environmentalImpact.landReclamation} acres
                      </div>
                      <div className="h-16 w-full max-w-40">
                        {/* Placeholder for chart */}
                        <div className="bg-muted/30 h-full w-full rounded-md flex items-center justify-center">
                          <Leaf className="h-8 w-8 text-muted-foreground/70" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      Biodiversity Improvement
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold">
                        {environmentalImpact.biodiversityImprovement}%
                      </div>
                      <div className="h-16 w-full max-w-40">
                        {/* Placeholder for chart */}
                        <div className="bg-muted/30 h-full w-full rounded-md flex items-center justify-center">
                          <Leaf className="h-8 w-8 text-muted-foreground/70" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Environmental Impact Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 w-full bg-muted/30 rounded-md flex items-center justify-center">
                    <BarChart className="h-12 w-12 text-muted-foreground/70" />
                    <span className="ml-2 text-muted-foreground">
                      Environmental impact visualization
                    </span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports" className="space-y-4">
              <div className="bg-card border rounded-lg overflow-hidden">
                <div className="grid grid-cols-12 bg-muted/50 p-3 text-sm font-medium">
                  <div className="col-span-1">#</div>
                  <div className="col-span-5">Report Title</div>
                  <div className="col-span-2">Type</div>
                  <div className="col-span-2">Date</div>
                  <div className="col-span-2">Actions</div>
                </div>

                <div className="divide-y">
                  {reports.map((report, index) => (
                    <div
                      key={report.id}
                      className="grid grid-cols-12 p-3 text-sm items-center hover:bg-muted/30"
                    >
                      <div className="col-span-1">{index + 1}</div>
                      <div className="col-span-5 font-medium">
                        {report.title}
                      </div>
                      <div className="col-span-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${report.type === "Health" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"}`}
                        >
                          {report.type}
                        </span>
                      </div>
                      <div className="col-span-2">{report.date}</div>
                      <div className="col-span-2">
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <Button>
                  <FileText className="h-4 w-4 mr-2" />
                  Generate New Report
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="border-t pt-4">
          <p className="text-xs text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()} | Data refreshes
            every 24 hours
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default HealthMonitoring;
