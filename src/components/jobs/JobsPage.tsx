import React, { useState } from "react";
import Navbar from "../dashboard/Navbar";
import JobsPanel from "../dashboard/JobsPanel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  BriefcaseIcon,
  Search,
  Filter,
  MapPin,
  Clock,
  CheckCircle,
  ArrowRight,
  FileText,
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

interface Application {
  jobId: string;
  jobTitle: string;
  company: string;
  appliedDate: string;
  status: "pending" | "interview" | "accepted" | "rejected";
}

const defaultJobs: JobListing[] = [
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
  {
    id: "4",
    title: "Recycling Program Coordinator",
    company: "Green Future NGO",
    location: "Central District",
    type: "Full-time",
    salary: "$45,000-55,000/year",
    posted: "5 days ago",
    description:
      "Coordinate recycling programs, manage volunteers, and develop educational materials for community outreach.",
    skills: ["Project Management", "Communication", "Environmental Science"],
    applied: false,
  },
  {
    id: "5",
    title: "E-Waste Technician",
    company: "TechRecycle Inc.",
    location: "Industrial Zone",
    type: "Full-time",
    salary: "$19-22/hr",
    posted: "2 weeks ago",
    description:
      "Disassemble and process electronic waste for recycling. Identify valuable components and hazardous materials.",
    skills: ["Technical Knowledge", "Attention to Detail", "Safety Procedures"],
    applied: false,
  },
  {
    id: "6",
    title: "Sustainability Consultant",
    company: "EcoSolutions Consulting",
    location: "Business District",
    type: "Contract",
    salary: "$30-35/hr",
    posted: "1 week ago",
    description:
      "Provide consulting services to businesses looking to improve their recycling and waste management practices.",
    skills: [
      "Consulting Experience",
      "Sustainability Knowledge",
      "Business Acumen",
    ],
    applied: false,
  },
];

const defaultApplications: Application[] = [
  {
    jobId: "2",
    jobTitle: "Waste Collection Driver",
    company: "GreenPath Recycling",
    appliedDate: "2023-06-10",
    status: "interview",
  },
  {
    jobId: "7",
    jobTitle: "Recycling Plant Supervisor",
    company: "Urban Recyclers Ltd.",
    appliedDate: "2023-05-28",
    status: "rejected",
  },
  {
    jobId: "8",
    jobTitle: "Environmental Educator",
    company: "City Environmental Department",
    appliedDate: "2023-06-05",
    status: "pending",
  },
];

const JobsPage: React.FC = () => {
  const [jobs, setJobs] = useState<JobListing[]>(defaultJobs);
  const [applications, setApplications] =
    useState<Application[]>(defaultApplications);
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterLocation, setFilterLocation] = useState<string>("all");
  const [isApplyDialogOpen, setIsApplyDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("available");

  const handleApplyForJob = (jobId: string) => {
    // Find the job
    const job = jobs.find((j) => j.id === jobId);
    if (job) {
      setSelectedJob(job);
      setIsApplyDialogOpen(true);
    }
  };

  const handleSubmitApplication = () => {
    if (selectedJob) {
      // Update the job's applied status
      const updatedJobs = jobs.map((job) =>
        job.id === selectedJob.id ? { ...job, applied: true } : job,
      );
      setJobs(updatedJobs);

      // Add to applications
      const newApplication: Application = {
        jobId: selectedJob.id,
        jobTitle: selectedJob.title,
        company: selectedJob.company,
        appliedDate: new Date().toISOString().split("T")[0],
        status: "pending",
      };
      setApplications([...applications, newApplication]);

      // Close dialog
      setIsApplyDialogOpen(false);
      setSelectedJob(null);
    }
  };

  const handleViewJobDetails = (jobId: string) => {
    const job = jobs.find((j) => j.id === jobId);
    if (job) {
      setSelectedJob(job);
    }
  };

  const handleTrackApplication = (jobId: string) => {
    setActiveTab("applications");
    // Could also scroll to the specific application
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters();
  };

  const applyFilters = () => {
    let filtered = [...defaultJobs];

    // Apply job type filter
    if (filterType !== "all") {
      filtered = filtered.filter((job) => job.type === filterType);
    }

    // Apply location filter
    if (filterLocation !== "all") {
      filtered = filtered.filter((job) => job.location === filterLocation);
    }

    // Apply search query if present
    if (searchQuery) {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    setJobs(filtered);
  };

  const resetFilters = () => {
    setSearchQuery("");
    setFilterType("all");
    setFilterLocation("all");
    setJobs(defaultJobs);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary">Pending Review</Badge>;
      case "interview":
        return (
          <Badge variant="default" className="bg-blue-100 text-blue-800">
            Interview Scheduled
          </Badge>
        );
      case "accepted":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Accepted
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="default" className="bg-red-100 text-red-800">
            Not Selected
          </Badge>
        );
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  // Get unique locations for filter
  const locations = ["all", ...new Set(defaultJobs.map((job) => job.location))];

  // Get unique job types for filter
  const jobTypes = ["all", ...new Set(defaultJobs.map((job) => job.type))];

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar userType="user" userName="John Doe" notificationCount={3} />

      <div className="pt-16 p-4 md:p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                <BriefcaseIcon className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">
                  Recycling Job Opportunities
                </h1>
                <p className="text-gray-600">
                  Find employment opportunities in recycling and waste
                  management
                </p>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Find Jobs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="col-span-1 md:col-span-4">
                  <form onSubmit={handleSearch} className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <Input
                      type="text"
                      placeholder="Search jobs by title, company, or keywords..."
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </form>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Job Type
                  </label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                  >
                    {jobTypes.map((type, index) => (
                      <option key={index} value={type === "all" ? "all" : type}>
                        {type === "all" ? "All Types" : type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Location
                  </label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={filterLocation}
                    onChange={(e) => setFilterLocation(e.target.value)}
                  >
                    {locations.map((location, index) => (
                      <option
                        key={index}
                        value={location === "all" ? "all" : location}
                      >
                        {location === "all" ? "All Locations" : location}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-end gap-2">
                  <Button onClick={applyFilters} className="flex-1">
                    <Filter className="h-4 w-4 mr-2" />
                    Apply Filters
                  </Button>
                  <Button variant="outline" onClick={resetFilters}>
                    Reset
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs for Available Jobs and Applications */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="available">
                <BriefcaseIcon className="h-4 w-4 mr-2" />
                Available Jobs
              </TabsTrigger>
              <TabsTrigger value="applications">
                <FileText className="h-4 w-4 mr-2" />
                My Applications
              </TabsTrigger>
            </TabsList>

            <TabsContent value="available" className="space-y-4">
              {/* Available Jobs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {jobs.length === 0 ? (
                  <div className="col-span-2 bg-white p-6 rounded-lg text-center">
                    <BriefcaseIcon className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                    <p className="text-gray-600">
                      No jobs match your search criteria.
                    </p>
                    <Button
                      variant="link"
                      onClick={resetFilters}
                      className="mt-2"
                    >
                      Reset filters
                    </Button>
                  </div>
                ) : (
                  jobs.map((job) => (
                    <Card key={job.id} className="overflow-hidden">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{job.title}</CardTitle>
                          {job.applied && (
                            <Badge
                              variant="secondary"
                              className="bg-green-100 text-green-800"
                            >
                              Applied
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{job.company}</p>
                      </CardHeader>
                      <CardContent className="pb-4">
                        <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                          {job.description}
                        </p>

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
                            <MapPin className="h-3 w-3 mr-1" />
                            {job.location}
                          </div>
                          <div className="flex items-center">
                            <BriefcaseIcon className="h-3 w-3 mr-1" />
                            {job.type}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            Posted {job.posted}
                          </div>
                        </div>

                        <div className="flex justify-between items-center mt-2">
                          <div className="text-sm font-medium">
                            {job.salary}
                          </div>
                          <div className="flex gap-2">
                            {job.applied ? (
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex items-center"
                                onClick={() => handleTrackApplication(job.id)}
                              >
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Track Application
                              </Button>
                            ) : (
                              <Button
                                variant="default"
                                size="sm"
                                className="bg-purple-600 hover:bg-purple-700"
                                onClick={() => handleApplyForJob(job.id)}
                              >
                                Apply Now
                              </Button>
                            )}
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewJobDetails(job.id)}
                            >
                              Details
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="applications" className="space-y-4">
              {/* My Applications */}
              <Card>
                <CardHeader>
                  <CardTitle>My Job Applications</CardTitle>
                </CardHeader>
                <CardContent>
                  {applications.length === 0 ? (
                    <div className="text-center py-6">
                      <FileText className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                      <p className="text-gray-600">
                        You haven't applied to any jobs yet.
                      </p>
                      <Button
                        variant="link"
                        onClick={() => setActiveTab("available")}
                        className="mt-2"
                      >
                        Browse available jobs
                      </Button>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="px-4 py-3 text-left font-medium text-gray-500">
                              Job Title
                            </th>
                            <th className="px-4 py-3 text-left font-medium text-gray-500">
                              Company
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
                          {applications.map((application, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                              <td className="px-4 py-3">
                                {application.jobTitle}
                              </td>
                              <td className="px-4 py-3">
                                {application.company}
                              </td>
                              <td className="px-4 py-3">
                                {application.appliedDate}
                              </td>
                              <td className="px-4 py-3">
                                {getStatusBadge(application.status)}
                              </td>
                              <td className="px-4 py-3">
                                <Button variant="outline" size="sm">
                                  View Details
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Job Application Dialog */}
          <Dialog open={isApplyDialogOpen} onOpenChange={setIsApplyDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Apply for {selectedJob?.title}</DialogTitle>
                <DialogDescription>
                  Complete the application form below to apply for this position
                  at {selectedJob?.company}.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="name" className="text-right">
                    Full Name
                  </label>
                  <Input
                    id="name"
                    defaultValue="John Doe"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="email" className="text-right">
                    Email
                  </label>
                  <Input
                    id="email"
                    defaultValue="john.doe@example.com"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="phone" className="text-right">
                    Phone
                  </label>
                  <Input
                    id="phone"
                    placeholder="+1 (555) 123-4567"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="experience" className="text-right">
                    Experience
                  </label>
                  <select
                    id="experience"
                    className="col-span-3 p-2 border rounded-md"
                  >
                    <option>Less than 1 year</option>
                    <option>1-2 years</option>
                    <option>3-5 years</option>
                    <option>5+ years</option>
                  </select>
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <label htmlFor="cover" className="text-right pt-2">
                    Cover Letter
                  </label>
                  <Textarea
                    id="cover"
                    placeholder="Tell us why you're interested in this position and what makes you a good fit..."
                    className="col-span-3"
                    rows={5}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right">Resume</label>
                  <div className="col-span-3">
                    <Button variant="outline" className="w-full justify-start">
                      <ArrowRight className="mr-2 h-4 w-4" />
                      Upload Resume (PDF, DOC, DOCX)
                    </Button>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsApplyDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleSubmitApplication}>
                  Submit Application
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Selected Job Details */}
          {selectedJob && !isApplyDialogOpen && (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">
                      {selectedJob.title}
                    </CardTitle>
                    <p className="text-gray-600">
                      {selectedJob.company} • {selectedJob.location}
                    </p>
                  </div>
                  {selectedJob.applied ? (
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-800"
                    >
                      Applied
                    </Badge>
                  ) : (
                    <Button
                      onClick={() => handleApplyForJob(selectedJob.id)}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      Apply Now
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Job Description</h3>
                  <p className="text-gray-700">{selectedJob.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h3 className="font-medium mb-2">Job Type</h3>
                    <p className="text-gray-700">{selectedJob.type}</p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Salary</h3>
                    <p className="text-gray-700">{selectedJob.salary}</p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Posted</h3>
                    <p className="text-gray-700">{selectedJob.posted}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Required Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">
                    About {selectedJob.company}
                  </h3>
                  <p className="text-gray-700">
                    {selectedJob.company} is a leading organization in the
                    recycling and waste management sector, committed to
                    sustainable practices and environmental conservation.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobsPage;
