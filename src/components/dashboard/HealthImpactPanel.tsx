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
import { Activity, Heart, BookOpen, Leaf, ArrowUpRight } from "lucide-react";

interface HealthMetric {
  title: string;
  value: number;
  target: number;
  unit: string;
  icon: React.ReactNode;
  color: string;
}

interface EducationalResource {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

interface HealthImpactPanelProps {
  metrics?: HealthMetric[];
  resources?: EducationalResource[];
  communityImpact?: string;
}

const HealthImpactPanel = ({
  metrics = [
    {
      title: "Air Quality Improvement",
      value: 68,
      target: 100,
      unit: "%",
      icon: <Leaf className="h-5 w-5" />,
      color: "bg-green-500",
    },
    {
      title: "Reduced Respiratory Issues",
      value: 42,
      target: 100,
      unit: "%",
      icon: <Activity className="h-5 w-5" />,
      color: "bg-blue-500",
    },
    {
      title: "Community Health Score",
      value: 78,
      target: 100,
      unit: "%",
      icon: <Heart className="h-5 w-5" />,
      color: "bg-red-500",
    },
  ],
  resources = [
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
  ],
  communityImpact = "Your recycling efforts have contributed to a 23% reduction in waste-related illnesses in your community over the past year.",
}: HealthImpactPanelProps) => {
  return (
    <div className="w-full bg-white p-6 rounded-xl shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Health Impact</h2>
        <p className="text-gray-600 mt-1">{communityImpact}</p>
      </div>

      {/* Health Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {metrics.map((metric, index) => (
          <Card key={index} className="overflow-hidden border-none shadow-md">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div className={`p-2 rounded-full ${metric.color}`}>
                  {metric.icon}
                </div>
                <span className="text-2xl font-bold">
                  {metric.value}
                  {metric.unit}
                </span>
              </div>
              <CardTitle className="text-lg mt-2">{metric.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>
                    {metric.value}/{metric.target}
                    {metric.unit}
                  </span>
                </div>
                <Progress
                  value={(metric.value / metric.target) * 100}
                  className="h-2"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Educational Resources */}
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <BookOpen className="mr-2 h-5 w-5" />
          Health Education Resources
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {resources.map((resource, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="h-40 overflow-hidden">
                <img
                  src={resource.imageUrl}
                  alt={resource.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="pt-4">
                <CardTitle className="text-lg">{resource.title}</CardTitle>
                <CardDescription className="mt-2">
                  {resource.description}
                </CardDescription>
              </CardContent>
              <CardFooter>
                <a
                  href={resource.link}
                  className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium"
                >
                  Learn more
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HealthImpactPanel;
