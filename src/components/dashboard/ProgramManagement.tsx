import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  PlusCircle,
  Edit,
  Trash2,
  MapPin,
  Calendar,
  BarChart2,
  Settings,
} from "lucide-react";

interface RecyclingInitiative {
  id: string;
  name: string;
  description: string;
  status: "active" | "planned" | "completed";
  startDate: string;
  endDate: string;
  targetAmount: number;
  currentAmount: number;
}

interface CollectionPoint {
  id: string;
  name: string;
  address: string;
  coordinates: { lat: number; lng: number };
  operatingHours: string;
  wasteTypes: string[];
  status: "operational" | "maintenance" | "closed";
}

interface ProgramManagementProps {
  initiatives?: RecyclingInitiative[];
  collectionPoints?: CollectionPoint[];
  onAddInitiative?: (initiative: Omit<RecyclingInitiative, "id">) => void;
  onEditInitiative?: (initiative: RecyclingInitiative) => void;
  onDeleteInitiative?: (id: string) => void;
  onAddCollectionPoint?: (point: Omit<CollectionPoint, "id">) => void;
  onEditCollectionPoint?: (point: CollectionPoint) => void;
  onDeleteCollectionPoint?: (id: string) => void;
}

const ProgramManagement: React.FC<ProgramManagementProps> = ({
  initiatives = [
    {
      id: "1",
      name: "Plastic Recycling Drive",
      description:
        "Community-wide initiative to collect and recycle plastic waste",
      status: "active",
      startDate: "2023-06-01",
      endDate: "2023-12-31",
      targetAmount: 5000,
      currentAmount: 2340,
    },
    {
      id: "2",
      name: "E-Waste Collection",
      description: "Safe disposal and recycling of electronic waste",
      status: "planned",
      startDate: "2023-09-15",
      endDate: "2024-03-15",
      targetAmount: 2000,
      currentAmount: 0,
    },
    {
      id: "3",
      name: "Paper Recycling Program",
      description:
        "Collection and recycling of paper waste from schools and offices",
      status: "completed",
      startDate: "2023-01-10",
      endDate: "2023-05-10",
      targetAmount: 3000,
      currentAmount: 3200,
    },
  ],
  collectionPoints = [
    {
      id: "1",
      name: "Central Collection Facility",
      address: "123 Main Street, City Center",
      coordinates: { lat: 34.0522, lng: -118.2437 },
      operatingHours: "Mon-Fri: 8AM-6PM, Sat: 9AM-2PM",
      wasteTypes: ["Plastic", "Paper", "Glass", "Metal"],
      status: "operational",
    },
    {
      id: "2",
      name: "Northern District Point",
      address: "456 North Avenue, Northern District",
      coordinates: { lat: 34.1522, lng: -118.1437 },
      operatingHours: "Mon-Sat: 9AM-5PM",
      wasteTypes: ["Plastic", "E-Waste"],
      status: "operational",
    },
    {
      id: "3",
      name: "Southern Community Center",
      address: "789 South Boulevard, Southern District",
      coordinates: { lat: 33.9522, lng: -118.3437 },
      operatingHours: "Tue-Sun: 10AM-4PM",
      wasteTypes: ["Paper", "Organic"],
      status: "maintenance",
    },
  ],
  onAddInitiative = () => {},
  onEditInitiative = () => {},
  onDeleteInitiative = () => {},
  onAddCollectionPoint = () => {},
  onEditCollectionPoint = () => {},
  onDeleteCollectionPoint = () => {},
}) => {
  const [isInitiativeDialogOpen, setIsInitiativeDialogOpen] = useState(true);
  const [isCollectionPointDialogOpen, setIsCollectionPointDialogOpen] =
    useState(true);
  const [selectedInitiative, setSelectedInitiative] =
    useState<RecyclingInitiative | null>(null);
  const [selectedCollectionPoint, setSelectedCollectionPoint] =
    useState<CollectionPoint | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
      case "operational":
        return "bg-green-100 text-green-800";
      case "planned":
      case "maintenance":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
      case "closed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const calculateProgress = (current: number, target: number) => {
    return Math.min(Math.round((current / target) * 100), 100);
  };

  return (
    <div className="w-full h-full bg-white p-6 rounded-lg">
      <Tabs defaultValue="initiatives" className="w-full">
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value="initiatives">Recycling Initiatives</TabsTrigger>
            <TabsTrigger value="collection-points">
              Collection Points
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="initiatives" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Recycling Initiatives</h2>
            <Dialog
              open={isInitiativeDialogOpen}
              onOpenChange={setIsInitiativeDialogOpen}
            >
              <DialogTrigger asChild>
                <Button onClick={() => setSelectedInitiative(null)}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Initiative
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {selectedInitiative
                      ? "Edit Initiative"
                      : "Add New Initiative"}
                  </DialogTitle>
                  <DialogDescription>
                    {selectedInitiative
                      ? "Update the details of this recycling initiative."
                      : "Create a new recycling initiative for the community."}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="name" className="text-right">
                      Name
                    </label>
                    <Input
                      id="name"
                      defaultValue={selectedInitiative?.name}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="description" className="text-right">
                      Description
                    </label>
                    <Textarea
                      id="description"
                      defaultValue={selectedInitiative?.description}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="status" className="text-right">
                      Status
                    </label>
                    <Select
                      defaultValue={selectedInitiative?.status || "planned"}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="planned">Planned</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="startDate" className="text-right">
                      Start Date
                    </label>
                    <Input
                      id="startDate"
                      type="date"
                      defaultValue={selectedInitiative?.startDate}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="endDate" className="text-right">
                      End Date
                    </label>
                    <Input
                      id="endDate"
                      type="date"
                      defaultValue={selectedInitiative?.endDate}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="targetAmount" className="text-right">
                      Target (kg)
                    </label>
                    <Input
                      id="targetAmount"
                      type="number"
                      defaultValue={selectedInitiative?.targetAmount.toString()}
                      className="col-span-3"
                    />
                  </div>
                  {selectedInitiative && (
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="currentAmount" className="text-right">
                        Current (kg)
                      </label>
                      <Input
                        id="currentAmount"
                        type="number"
                        defaultValue={selectedInitiative.currentAmount.toString()}
                        className="col-span-3"
                      />
                    </div>
                  )}
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    onClick={() => setIsInitiativeDialogOpen(false)}
                  >
                    {selectedInitiative
                      ? "Update Initiative"
                      : "Create Initiative"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {initiatives.map((initiative) => (
              <Card key={initiative.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{initiative.name}</CardTitle>
                      <CardDescription className="mt-1">
                        {initiative.description}
                      </CardDescription>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(initiative.status)}`}
                    >
                      {initiative.status.charAt(0).toUpperCase() +
                        initiative.status.slice(1)}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center text-sm">
                      <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                      <span>
                        {new Date(initiative.startDate).toLocaleDateString()} -{" "}
                        {new Date(initiative.endDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>
                          {initiative.currentAmount} / {initiative.targetAmount}{" "}
                          kg
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-primary h-2.5 rounded-full"
                          style={{
                            width: `${calculateProgress(initiative.currentAmount, initiative.targetAmount)}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4 flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedInitiative(initiative);
                      setIsInitiativeDialogOpen(true);
                    }}
                  >
                    <Edit className="h-4 w-4 mr-1" /> Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                    onClick={() => onDeleteInitiative(initiative.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" /> Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="collection-points" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Collection Points</h2>
            <Dialog
              open={isCollectionPointDialogOpen}
              onOpenChange={setIsCollectionPointDialogOpen}
            >
              <DialogTrigger asChild>
                <Button onClick={() => setSelectedCollectionPoint(null)}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Collection Point
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {selectedCollectionPoint
                      ? "Edit Collection Point"
                      : "Add New Collection Point"}
                  </DialogTitle>
                  <DialogDescription>
                    {selectedCollectionPoint
                      ? "Update the details of this collection point."
                      : "Create a new waste collection point for the community."}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="pointName" className="text-right">
                      Name
                    </label>
                    <Input
                      id="pointName"
                      defaultValue={selectedCollectionPoint?.name}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="address" className="text-right">
                      Address
                    </label>
                    <Textarea
                      id="address"
                      defaultValue={selectedCollectionPoint?.address}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="lat" className="text-right">
                      Latitude
                    </label>
                    <Input
                      id="lat"
                      type="number"
                      step="0.0001"
                      defaultValue={selectedCollectionPoint?.coordinates.lat.toString()}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="lng" className="text-right">
                      Longitude
                    </label>
                    <Input
                      id="lng"
                      type="number"
                      step="0.0001"
                      defaultValue={selectedCollectionPoint?.coordinates.lng.toString()}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="hours" className="text-right">
                      Operating Hours
                    </label>
                    <Input
                      id="hours"
                      defaultValue={selectedCollectionPoint?.operatingHours}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="wasteTypes" className="text-right">
                      Waste Types
                    </label>
                    <Input
                      id="wasteTypes"
                      defaultValue={selectedCollectionPoint?.wasteTypes.join(
                        ", ",
                      )}
                      placeholder="Plastic, Paper, Glass, etc."
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="pointStatus" className="text-right">
                      Status
                    </label>
                    <Select
                      defaultValue={
                        selectedCollectionPoint?.status || "operational"
                      }
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="operational">Operational</SelectItem>
                        <SelectItem value="maintenance">
                          Under Maintenance
                        </SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    onClick={() => setIsCollectionPointDialogOpen(false)}
                  >
                    {selectedCollectionPoint
                      ? "Update Collection Point"
                      : "Create Collection Point"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {collectionPoints.map((point) => (
              <Card key={point.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{point.name}</CardTitle>
                      <CardDescription className="mt-1">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1 text-gray-500" />
                          {point.address}
                        </div>
                      </CardDescription>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(point.status)}`}
                    >
                      {point.status === "operational"
                        ? "Operational"
                        : point.status === "maintenance"
                          ? "Maintenance"
                          : "Closed"}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm">
                      <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                      <span>{point.operatingHours}</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-1">
                        Accepted Waste Types:
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {point.wasteTypes.map((type, index) => (
                          <span
                            key={index}
                            className="bg-gray-100 px-2 py-1 rounded-full text-xs"
                          >
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4 flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedCollectionPoint(point);
                      setIsCollectionPointDialogOpen(true);
                    }}
                  >
                    <Edit className="h-4 w-4 mr-1" /> Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                    onClick={() => onDeleteCollectionPoint(point.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" /> Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProgramManagement;
