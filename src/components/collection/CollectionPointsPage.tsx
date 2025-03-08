import React, { useState } from "react";
import Navbar from "../dashboard/Navbar";
import CollectionMap from "../dashboard/CollectionMap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MapPin, Search, Filter, Clock, Info, ArrowRight } from "lucide-react";

interface CollectionPoint {
  id: string;
  name: string;
  address: string;
  coordinates: { lat: number; lng: number };
  operatingHours: string;
  wasteTypes: string[];
  distance: string;
  status: "operational" | "maintenance" | "closed";
}

const defaultCollectionPoints: CollectionPoint[] = [
  {
    id: "1",
    name: "Central Recycling Facility",
    address: "123 Green Street, Eco District",
    coordinates: { lat: 34.052, lng: -118.243 },
    operatingHours: "Mon-Fri: 8AM-6PM, Sat: 9AM-4PM",
    wasteTypes: ["Plastic", "Paper", "Glass"],
    distance: "0.8 km",
    status: "operational",
  },
  {
    id: "2",
    name: "Community Collection Center",
    address: "456 Recycle Avenue, Green Zone",
    coordinates: { lat: 34.055, lng: -118.248 },
    operatingHours: "Mon-Sat: 7AM-7PM",
    wasteTypes: ["Electronics", "Metal", "Batteries"],
    distance: "1.2 km",
    status: "operational",
  },
  {
    id: "3",
    name: "Neighborhood Drop-off Point",
    address: "789 Sustainability Road",
    coordinates: { lat: 34.048, lng: -118.25 },
    operatingHours: "24/7 Access",
    wasteTypes: ["Plastic", "Paper", "Organic"],
    distance: "1.5 km",
    status: "operational",
  },
  {
    id: "4",
    name: "Eastern District Collection Point",
    address: "234 East Avenue, Eastern District",
    coordinates: { lat: 34.058, lng: -118.235 },
    operatingHours: "Tue-Sun: 9AM-5PM",
    wasteTypes: ["Plastic", "Glass", "Metal"],
    distance: "2.3 km",
    status: "maintenance",
  },
  {
    id: "5",
    name: "Southern Community Hub",
    address: "567 South Boulevard, Southern District",
    coordinates: { lat: 34.042, lng: -118.247 },
    operatingHours: "Mon-Fri: 10AM-6PM",
    wasteTypes: ["Paper", "Cardboard", "Plastic"],
    distance: "3.1 km",
    status: "operational",
  },
  {
    id: "6",
    name: "Western Recycling Center",
    address: "890 West Road, Western Zone",
    coordinates: { lat: 34.051, lng: -118.26 },
    operatingHours: "Wed-Mon: 8AM-7PM",
    wasteTypes: ["Electronics", "Batteries", "Hazardous"],
    distance: "3.8 km",
    status: "closed",
  },
];

const CollectionPointsPage: React.FC = () => {
  const [collectionPoints, setCollectionPoints] = useState<CollectionPoint[]>(
    defaultCollectionPoints,
  );
  const [selectedPoint, setSelectedPoint] = useState<CollectionPoint | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const handlePointSelect = (point: any) => {
    setSelectedPoint(point);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Filter collection points based on search query
    const filtered = defaultCollectionPoints.filter(
      (point) =>
        point.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        point.address.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setCollectionPoints(filtered);
  };

  const applyFilters = () => {
    let filtered = [...defaultCollectionPoints];

    // Apply waste type filter
    if (filterType !== "all") {
      filtered = filtered.filter((point) =>
        point.wasteTypes.includes(filterType),
      );
    }

    // Apply status filter
    if (filterStatus !== "all") {
      filtered = filtered.filter((point) => point.status === filterStatus);
    }

    // Apply search query if present
    if (searchQuery) {
      filtered = filtered.filter(
        (point) =>
          point.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          point.address.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    setCollectionPoints(filtered);
  };

  const resetFilters = () => {
    setSearchQuery("");
    setFilterType("all");
    setFilterStatus("all");
    setCollectionPoints(defaultCollectionPoints);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "bg-green-100 text-green-800";
      case "maintenance":
        return "bg-yellow-100 text-yellow-800";
      case "closed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar userType="user" userName="John Doe" notificationCount={3} />

      <div className="pt-16 p-4 md:p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <MapPin className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Collection Points</h1>
                <p className="text-gray-600">
                  Find nearby recycling collection points and drop-off locations
                </p>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Find Collection Points</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="col-span-1 md:col-span-3">
                  <form onSubmit={handleSearch} className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <Input
                      type="text"
                      placeholder="Search by name or address..."
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </form>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Waste Type
                  </label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                  >
                    <option value="all">All Types</option>
                    <option value="Plastic">Plastic</option>
                    <option value="Paper">Paper</option>
                    <option value="Glass">Glass</option>
                    <option value="Metal">Metal</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Batteries">Batteries</option>
                    <option value="Organic">Organic</option>
                    <option value="Hazardous">Hazardous</option>
                    <option value="Cardboard">Cardboard</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Status
                  </label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="all">All Statuses</option>
                    <option value="operational">Operational</option>
                    <option value="maintenance">Under Maintenance</option>
                    <option value="closed">Closed</option>
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

          {/* Map and List View */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Collection Points List */}
            <div className="lg:col-span-1 space-y-4">
              <h2 className="text-xl font-bold">
                Collection Points ({collectionPoints.length})
              </h2>

              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                {collectionPoints.length === 0 ? (
                  <div className="bg-white p-6 rounded-lg text-center">
                    <Info className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                    <p className="text-gray-600">
                      No collection points match your search criteria.
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
                  collectionPoints.map((point) => (
                    <Card
                      key={point.id}
                      className={`cursor-pointer transition-all ${selectedPoint?.id === point.id ? "border-blue-500 shadow-md" : ""}`}
                      onClick={() => handlePointSelect(point)}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold">{point.name}</h3>
                          <Badge className={getStatusColor(point.status)}>
                            {point.status.charAt(0).toUpperCase() +
                              point.status.slice(1)}
                          </Badge>
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex items-start">
                            <MapPin className="h-4 w-4 mt-0.5 mr-2 text-gray-500" />
                            <span>{point.address}</span>
                          </div>
                          <div className="flex items-start">
                            <Clock className="h-4 w-4 mt-0.5 mr-2 text-gray-500" />
                            <span>{point.operatingHours}</span>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {point.wasteTypes.map((type) => (
                              <Badge
                                key={type}
                                variant="outline"
                                className="text-xs"
                              >
                                {type}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>

            {/* Map View */}
            <div className="lg:col-span-2">
              <Card className="overflow-hidden h-[600px]">
                <CollectionMap
                  collectionPoints={collectionPoints}
                  onSelectPoint={handlePointSelect}
                />
              </Card>
            </div>
          </div>

          {/* Selected Point Details */}
          {selectedPoint && (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>{selectedPoint.name}</CardTitle>
                  <Badge className={getStatusColor(selectedPoint.status)}>
                    {selectedPoint.status.charAt(0).toUpperCase() +
                      selectedPoint.status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Location Details</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start">
                          <MapPin className="h-4 w-4 mt-0.5 mr-2 text-gray-500" />
                          <span>{selectedPoint.address}</span>
                        </div>
                        <div className="flex items-start">
                          <Clock className="h-4 w-4 mt-0.5 mr-2 text-gray-500" />
                          <span>{selectedPoint.operatingHours}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Accepted Materials</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedPoint.wasteTypes.map((type) => (
                          <Badge key={type} variant="secondary">
                            {type}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">
                        Additional Information
                      </h3>
                      <p className="text-sm text-gray-600">
                        This collection point is located{" "}
                        {selectedPoint.distance} from your current location.
                        Please ensure all materials are properly sorted before
                        drop-off.
                      </p>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="font-medium mb-1">Special Instructions</h3>
                      <p className="text-sm">
                        {selectedPoint.status === "maintenance"
                          ? "This location is currently under maintenance. Some services may be limited."
                          : selectedPoint.status === "closed"
                            ? "This location is temporarily closed. Please visit an alternative collection point."
                            : "Please bring your ID for electronic waste disposal. Large items may require assistance."}
                      </p>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button className="flex-1">Get Directions</Button>
                      <Button variant="outline">Share Location</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Tips for Collection */}
          <Card>
            <CardHeader>
              <CardTitle>Tips for Collection</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Before You Go</h3>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-start">
                      <span className="bg-blue-100 text-blue-800 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                        1
                      </span>
                      <span>
                        Clean and sort your recyclables by material type
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-blue-100 text-blue-800 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                        2
                      </span>
                      <span>
                        Check the operating hours of your chosen collection
                        point
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-blue-100 text-blue-800 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                        3
                      </span>
                      <span>
                        Remove caps, lids, and non-recyclable components
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">At the Collection Point</h3>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-start">
                      <span className="bg-blue-100 text-blue-800 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                        1
                      </span>
                      <span>
                        Follow the signage and place items in correct bins
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-blue-100 text-blue-800 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                        2
                      </span>
                      <span>
                        Ask staff for assistance with large or unusual items
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-blue-100 text-blue-800 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                        3
                      </span>
                      <span>Record your contribution in the EcoTrack app</span>
                    </li>
                  </ul>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">After Drop-off</h3>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-start">
                      <span className="bg-blue-100 text-blue-800 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                        1
                      </span>
                      <span>
                        Track your recycling progress in your dashboard
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-blue-100 text-blue-800 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                        2
                      </span>
                      <span>Share your experience to encourage others</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-blue-100 text-blue-800 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                        3
                      </span>
                      <span>Set goals for your next recycling trip</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CollectionPointsPage;
