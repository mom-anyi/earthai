import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  CheckCircle,
  Clock,
  FileText,
  Search,
  UserPlus,
  Users,
  X,
} from "lucide-react";

interface ApplicationData {
  id: string;
  name: string;
  position: string;
  status: "pending" | "approved" | "rejected";
  appliedDate: string;
  avatar: string;
}

interface WorkerData {
  id: string;
  name: string;
  position: string;
  startDate: string;
  avatar: string;
  status: "active" | "inactive";
}

interface MetricData {
  label: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
}

interface EmploymentManagementProps {
  applications?: ApplicationData[];
  workers?: WorkerData[];
  metrics?: MetricData[];
}

const EmploymentManagement = ({
  applications = [
    {
      id: "1",
      name: "Ahmed Hassan",
      position: "Recycling Coordinator",
      status: "pending",
      appliedDate: "2023-06-15",
      avatar: "ahmed",
    },
    {
      id: "2",
      name: "Fatima Omar",
      position: "Collection Point Manager",
      status: "approved",
      appliedDate: "2023-06-12",
      avatar: "fatima",
    },
    {
      id: "3",
      name: "Mohammed Ali",
      position: "Waste Sorter",
      status: "rejected",
      appliedDate: "2023-06-10",
      avatar: "mohammed",
    },
    {
      id: "4",
      name: "Aisha Ibrahim",
      position: "Community Educator",
      status: "pending",
      appliedDate: "2023-06-08",
      avatar: "aisha",
    },
  ],
  workers = [
    {
      id: "1",
      name: "Zainab Yusuf",
      position: "Recycling Coordinator",
      startDate: "2023-01-15",
      avatar: "zainab",
      status: "active",
    },
    {
      id: "2",
      name: "Ibrahim Musa",
      position: "Collection Point Manager",
      startDate: "2023-02-20",
      avatar: "ibrahim",
      status: "active",
    },
    {
      id: "3",
      name: "Halima Abubakar",
      position: "Waste Sorter",
      startDate: "2023-03-10",
      avatar: "halima",
      status: "inactive",
    },
    {
      id: "4",
      name: "Yusuf Abdullahi",
      position: "Community Educator",
      startDate: "2023-04-05",
      avatar: "yusuf",
      status: "active",
    },
  ],
  metrics = [
    {
      label: "Total Workers",
      value: 42,
      change: 8,
      icon: <Users className="h-4 w-4" />,
    },
    {
      label: "New Applications",
      value: 12,
      change: 3,
      icon: <UserPlus className="h-4 w-4" />,
    },
    {
      label: "Jobs Created",
      value: 56,
      change: 12,
      icon: <FileText className="h-4 w-4" />,
    },
    {
      label: "Retention Rate",
      value: "87%",
      change: 5,
      icon: <CheckCircle className="h-4 w-4" />,
    },
  ],
}: EmploymentManagementProps) => {
  return (
    <Card className="w-full h-full bg-white overflow-hidden">
      <CardHeader>
        <CardTitle className="text-xl font-bold">
          Employment Management
        </CardTitle>
        <CardDescription>
          Review applications, manage workers, and track employment metrics
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {metrics.map((metric, index) => (
            <Card key={index} className="bg-gray-50">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-500">{metric.label}</span>
                  <div className="p-2 rounded-full bg-primary/10 text-primary">
                    {metric.icon}
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <Badge
                    variant={metric.change > 0 ? "default" : "destructive"}
                    className="text-xs"
                  >
                    {metric.change > 0 ? "+" : ""}
                    {metric.change}%
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="applications" className="w-full">
          <TabsList className="mb-4 w-full justify-start">
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="workers">Current Workers</TabsTrigger>
          </TabsList>

          <TabsContent value="applications" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search applications..."
                  className="pl-8 pr-4 py-2 w-full rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Filter
                </Button>
                <Button size="sm">New Job Posting</Button>
              </div>
            </div>

            <div className="rounded-md border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-gray-500">
                      Applicant
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-gray-500">
                      Position
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-gray-500">
                      Applied Date
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-gray-500">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {applications.map((application) => (
                    <tr key={application.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage
                              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${application.avatar}`}
                            />
                            <AvatarFallback>
                              {application.name.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">
                            {application.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">{application.position}</td>
                      <td className="px-4 py-3">{application.appliedDate}</td>
                      <td className="px-4 py-3">
                        <Badge
                          variant={
                            application.status === "approved"
                              ? "default"
                              : application.status === "rejected"
                                ? "destructive"
                                : "secondary"
                          }
                        >
                          {application.status.charAt(0).toUpperCase() +
                            application.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                          {application.status === "pending" && (
                            <>
                              <Button variant="default" size="sm">
                                Approve
                              </Button>
                              <Button variant="destructive" size="sm">
                                Reject
                              </Button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="workers" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search workers..."
                  className="pl-8 pr-4 py-2 w-full rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Filter
                </Button>
                <Button size="sm">Assign Tasks</Button>
              </div>
            </div>

            <div className="rounded-md border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-gray-500">
                      Worker
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-gray-500">
                      Position
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-gray-500">
                      Start Date
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-gray-500">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {workers.map((worker) => (
                    <tr key={worker.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage
                              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${worker.avatar}`}
                            />
                            <AvatarFallback>
                              {worker.name.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{worker.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">{worker.position}</td>
                      <td className="px-4 py-3">{worker.startDate}</td>
                      <td className="px-4 py-3">
                        <Badge
                          variant={
                            worker.status === "active" ? "default" : "secondary"
                          }
                        >
                          {worker.status.charAt(0).toUpperCase() +
                            worker.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Profile
                          </Button>
                          <Button variant="outline" size="sm">
                            Tasks
                          </Button>
                          {worker.status === "active" ? (
                            <Button variant="destructive" size="sm">
                              Deactivate
                            </Button>
                          ) : (
                            <Button variant="default" size="sm">
                              Activate
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between border-t p-4">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Clock className="h-4 w-4" />
          <span>Last updated: Today at 14:32</span>
        </div>
        <Button variant="outline" size="sm">
          Export Data
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EmploymentManagement;
