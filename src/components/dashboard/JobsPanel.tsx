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
import { Badge } from "../ui/badge";
import {
  BriefcaseIcon,
  ClockIcon,
  MapPinIcon,
  ArrowRightIcon,
  CheckCircleIcon,
} from "lucide-react";

interface JobListing {
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
}

interface JobsPanelProps {
  jobs?: JobListing[];
  onApply?: (jobId: string) => void;
  onViewDetails?: (jobId: string) => void;
  onTrackApplication?: (jobId: string) => void;
}

const JobsPanel = ({
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
  onApply = () => {},
  onViewDetails = () => {},
  onTrackApplication = () => {},
}: JobsPanelProps) => {
  return (
    <Card className="w-full h-full bg-white overflow-hidden">
      <CardHeader className="bg-green-50">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl text-green-800">
              Job Opportunities
            </CardTitle>
            <CardDescription>
              Available positions in recycling and waste management
            </CardDescription>
          </div>
          <Button
            variant="outline"
            className="text-green-700 border-green-200 hover:bg-green-100"
          >
            View All Jobs <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4 overflow-y-auto max-h-[320px]">
        <div className="space-y-4">
          {jobs.map((job) => (
            <Card
              key={job.id}
              className="overflow-hidden border-l-4 border-l-green-500"
            >
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-lg">{job.title}</h3>
                    <p className="text-sm text-gray-600">{job.company}</p>
                  </div>
                  <Badge
                    variant={job.applied ? "secondary" : "default"}
                    className={
                      job.applied
                        ? "bg-amber-100 text-amber-800"
                        : "bg-green-100 text-green-800"
                    }
                  >
                    {job.applied ? "Applied" : "Open"}
                  </Badge>
                </div>

                <p className="text-sm text-gray-700 mb-3">{job.description}</p>

                <div className="flex flex-wrap gap-2 mb-3">
                  {job.skills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-gray-100"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>

                <div className="flex flex-wrap text-xs text-gray-500 gap-x-4 gap-y-1 mb-3">
                  <div className="flex items-center">
                    <MapPinIcon className="h-3 w-3 mr-1" />
                    {job.location}
                  </div>
                  <div className="flex items-center">
                    <BriefcaseIcon className="h-3 w-3 mr-1" />
                    {job.type}
                  </div>
                  <div className="flex items-center">
                    <ClockIcon className="h-3 w-3 mr-1" />
                    Posted {job.posted}
                  </div>
                </div>

                <div className="flex justify-between items-center mt-2">
                  <div className="text-sm font-medium">{job.salary}</div>
                  <div className="flex gap-2">
                    {job.applied ? (
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center"
                        onClick={() => onTrackApplication(job.id)}
                      >
                        <CheckCircleIcon className="h-3 w-3 mr-1" />
                        Track Application
                      </Button>
                    ) : (
                      <Button
                        variant="default"
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => onApply(job.id)}
                      >
                        Apply Now
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onViewDetails(job.id)}
                    >
                      Details
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 border-t p-4">
        <div className="w-full flex justify-between items-center">
          <p className="text-sm text-gray-500">
            Showing {jobs.length} of {jobs.length} opportunities
          </p>
          <Button variant="link" className="text-green-700">
            Set Job Alerts
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default JobsPanel;
