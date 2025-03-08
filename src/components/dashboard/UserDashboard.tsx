import React, { useState } from "react";
import StatisticsPanel from "./StatisticsPanel";
import CollectionMap from "./CollectionMap";
import JobsPanel from "./JobsPanel";
import HealthImpactPanel from "./HealthImpactPanel";

interface UserDashboardProps {
  userName?: string;
  userAvatar?: string;
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
  collectionPoints?: Array<{
    id: string;
    name: string;
    address: string;
    coordinates: { lat: number; lng: number };
    operatingHours: string;
    wasteTypes: string[];
    distance: string;
  }>;
  jobs?: Array<{
    id: string;
    title: string;
    company: string;
    location: string;
    type: string;
    salary: string;
    posted: string;
    description: string;
    skills: string[];
    applied?: boolean;
  }>;
  healthMetrics?: {
    airQuality: number;
    respiratoryIssues: number;
    communityHealth: number;
  };
}

const UserDashboard: React.FC<UserDashboardProps> = ({
  userName = "John Doe",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
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
  collectionPoints = [
    {
      id: "1",
      name: "Central Recycling Facility",
      address: "123 Green Street, Eco District",
      coordinates: { lat: 34.052, lng: -118.243 },
      operatingHours: "Mon-Fri: 8AM-6PM, Sat: 9AM-4PM",
      wasteTypes: ["Plastic", "Paper", "Glass"],
      distance: "0.8 km",
    },
    {
      id: "2",
      name: "Community Collection Center",
      address: "456 Recycle Avenue, Green Zone",
      coordinates: { lat: 34.055, lng: -118.248 },
      operatingHours: "Mon-Sat: 7AM-7PM",
      wasteTypes: ["Electronics", "Metal", "Batteries"],
      distance: "1.2 km",
    },
    {
      id: "3",
      name: "Neighborhood Drop-off Point",
      address: "789 Sustainability Road",
      coordinates: { lat: 34.048, lng: -118.25 },
      operatingHours: "24/7 Access",
      wasteTypes: ["Plastic", "Paper", "Organic"],
      distance: "1.5 km",
    },
  ],
  jobs = [
    {
      id: "1",
      title: "Recycling Facility Operator",
      company: "EcoWaste Solutions",
      location: "Central District",
      type: "Full-time",
      salary: "$15-18/hr",
      posted: "2 days ago",
      description:
        "Operate recycling machinery and sort materials at our state-of-the-art facility. Training provided.",
      skills: ["Physical Stamina", "Basic Mechanical Knowledge", "Team Player"],
      applied: false,
    },
    {
      id: "2",
      title: "Waste Collection Driver",
      company: "GreenPath Recycling",
      location: "North Zone",
      type: "Part-time",
      salary: "$17-20/hr",
      posted: "1 week ago",
      description:
        "Drive collection vehicles to gather recyclable materials from designated collection points.",
      skills: ["Valid Driver's License", "Route Planning", "Safety Conscious"],
      applied: true,
    },
    {
      id: "3",
      title: "Community Recycling Educator",
      company: "EcoAwareness Initiative",
      location: "Various Locations",
      type: "Contract",
      salary: "$16/hr",
      posted: "3 days ago",
      description:
        "Educate community members about proper recycling practices and the importance of waste management.",
      skills: ["Communication", "Public Speaking", "Environmental Knowledge"],
      applied: false,
    },
  ],
  healthMetrics = {
    airQuality: 68,
    respiratoryIssues: 42,
    communityHealth: 78,
  },
}) => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleApplyForJob = (jobId: string) => {
    console.log(`Applied for job with ID: ${jobId}`);
    // In a real implementation, this would send an API request
  };

  const handleViewJobDetails = (jobId: string) => {
    console.log(`Viewing details for job with ID: ${jobId}`);
    // In a real implementation, this would open a modal or navigate to details page
  };

  const handleTrackApplication = (jobId: string) => {
    console.log(`Tracking application for job with ID: ${jobId}`);
    // In a real implementation, this would navigate to application tracking page
  };

  const handleSelectCollectionPoint = (point: any) => {
    console.log(`Selected collection point: ${point.name}`);
    // In a real implementation, this would show more details or highlight on map
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Welcome Section */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full overflow-hidden">
              <img
                src={userAvatar}
                alt={userName}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Welcome back, {userName}!</h1>
              <p className="text-gray-600">
                Track your recycling progress and explore opportunities
              </p>
            </div>
          </div>
        </div>

        {/* Statistics Panel */}
        <StatisticsPanel
          personalStats={personalStats}
          recyclingGoals={recyclingGoals}
        />

        {/* Collection Map and Jobs Panel (side by side on larger screens) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CollectionMap
            collectionPoints={collectionPoints}
            onSelectPoint={handleSelectCollectionPoint}
          />
          <JobsPanel
            jobs={jobs}
            onApply={handleApplyForJob}
            onViewDetails={handleViewJobDetails}
            onTrackApplication={handleTrackApplication}
          />
        </div>

        {/* Health Impact Panel */}
        <HealthImpactPanel
          metrics={[
            {
              title: "Air Quality Improvement",
              value: healthMetrics.airQuality,
              target: 100,
              unit: "%",
              icon: <span>🌬️</span>,
              color: "bg-green-500",
            },
            {
              title: "Reduced Respiratory Issues",
              value: healthMetrics.respiratoryIssues,
              target: 100,
              unit: "%",
              icon: <span>🫁</span>,
              color: "bg-blue-500",
            },
            {
              title: "Community Health Score",
              value: healthMetrics.communityHealth,
              target: 100,
              unit: "%",
              icon: <span>❤️</span>,
              color: "bg-red-500",
            },
          ]}
          resources={[
            {
              title: "Waste Management and Health",
              description:
                "Learn how proper waste management impacts community health outcomes.",
              imageUrl:
                "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&q=80",
              link: "#",
            },
            {
              title: "Recycling Best Practices",
              description:
                "Discover the most effective ways to recycle different materials.",
              imageUrl:
                "https://images.unsplash.com/photo-1604187351574-c75ca79f5807?w=600&q=80",
              link: "#",
            },
            {
              title: "Environmental Health Guide",
              description:
                "Understand how environmental factors affect your health and wellbeing.",
              imageUrl:
                "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&q=80",
              link: "#",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default UserDashboard;
