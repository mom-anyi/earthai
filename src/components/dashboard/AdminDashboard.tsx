import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import AnalyticsOverview from "./AnalyticsOverview";
import WasteAnalytics from "./WasteAnalytics";
import ProgramManagement from "./ProgramManagement";
import EmploymentManagement from "./EmploymentManagement";
import HealthMonitoring from "./HealthMonitoring";

interface AdminDashboardProps {
  user?: {
    name: string;
    role: string;
    avatar: string;
  };
  activeTab?: string;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({
  user = {
    name: "Admin User",
    role: "Administrator",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
  },
  activeTab = "overview",
}) => {
  return (
    <div className="w-full min-h-screen bg-gray-100 p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 mt-1">
          Manage waste collection, recycling programs, employment, and health
          indicators
        </p>
      </div>

      <div className="mb-6">
        <AnalyticsOverview />
      </div>

      <Tabs defaultValue={activeTab} className="w-full">
        <TabsList className="mb-6 bg-white p-1 rounded-lg">
          <TabsTrigger
            value="waste"
            className="data-[state=active]:bg-primary data-[state=active]:text-white"
          >
            Waste Collection
          </TabsTrigger>
          <TabsTrigger
            value="programs"
            className="data-[state=active]:bg-primary data-[state=active]:text-white"
          >
            Recycling Programs
          </TabsTrigger>
          <TabsTrigger
            value="employment"
            className="data-[state=active]:bg-primary data-[state=active]:text-white"
          >
            Employment
          </TabsTrigger>
          <TabsTrigger
            value="health"
            className="data-[state=active]:bg-primary data-[state=active]:text-white"
          >
            Health Monitoring
          </TabsTrigger>
        </TabsList>

        <TabsContent value="waste" className="space-y-4">
          <WasteAnalytics />
        </TabsContent>

        <TabsContent value="programs" className="space-y-4">
          <ProgramManagement />
        </TabsContent>

        <TabsContent value="employment" className="space-y-4">
          <EmploymentManagement />
        </TabsContent>

        <TabsContent value="health" className="space-y-4">
          <HealthMonitoring />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
