import React, { useState } from "react";
import { MapPin, Clock, Filter, Navigation, Info } from "lucide-react";
import { motion } from "framer-motion";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CollectionPoint {
  id: string;
  name: string;
  address: string;
  coordinates: { lat: number; lng: number };
  operatingHours: string;
  wasteTypes: string[];
  distance: string;
}

interface CollectionMapProps {
  collectionPoints?: CollectionPoint[];
  userLocation?: { lat: number; lng: number };
  onSelectPoint?: (point: CollectionPoint) => void;
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
];

const CollectionMap: React.FC<CollectionMapProps> = ({
  collectionPoints = defaultCollectionPoints,
  userLocation = { lat: 34.05, lng: -118.245 },
  onSelectPoint = () => {},
}) => {
  const [selectedPoint, setSelectedPoint] = useState<CollectionPoint | null>(
    null,
  );
  const [filterType, setFilterType] = useState<string>("all");

  const filteredPoints =
    filterType === "all"
      ? collectionPoints
      : collectionPoints.filter((point) =>
          point.wasteTypes.includes(filterType),
        );

  const handlePointSelect = (point: CollectionPoint) => {
    setSelectedPoint(point);
    onSelectPoint(point);
  };

  const getDirections = (point: CollectionPoint) => {
    // In a real implementation, this would integrate with a maps API
    console.log(`Getting directions to ${point.name}`);
    window.open(
      `https://maps.google.com/?q=${point.coordinates.lat},${point.coordinates.lng}`,
      "_blank",
    );
  };

  return (
    <div className="w-full h-full bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Collection Points</h2>
          <div className="flex items-center space-x-2">
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by waste type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Plastic">Plastic</SelectItem>
                <SelectItem value="Paper">Paper</SelectItem>
                <SelectItem value="Glass">Glass</SelectItem>
                <SelectItem value="Metal">Metal</SelectItem>
                <SelectItem value="Electronics">Electronics</SelectItem>
                <SelectItem value="Batteries">Batteries</SelectItem>
                <SelectItem value="Organic">Organic</SelectItem>
              </SelectContent>
            </Select>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Filter className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Filter collection points</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100%-64px)]">
        {/* Map View - In a real implementation, this would be an actual map component */}
        <div className="w-2/3 bg-gray-100 relative">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1569336415962-a4bd9f69c07b?w=800&q=80')",
            }}
          >
            {/* Map markers would be placed here in a real implementation */}
            {filteredPoints.map((point) => (
              <motion.div
                key={point.id}
                className="absolute cursor-pointer"
                style={{
                  left: `${Math.random() * 80 + 10}%`,
                  top: `${Math.random() * 80 + 10}%`,
                }}
                whileHover={{ scale: 1.2 }}
                onClick={() => handlePointSelect(point)}
              >
                <div
                  className={`p-1 rounded-full ${selectedPoint?.id === point.id ? "bg-primary" : "bg-gray-500"}`}
                >
                  <MapPin className="h-6 w-6 text-white" />
                </div>
              </motion.div>
            ))}

            {/* User location marker */}
            <div
              className="absolute"
              style={{
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="p-1 rounded-full bg-blue-500 animate-pulse">
                <div className="h-4 w-4 rounded-full bg-blue-300" />
              </div>
            </div>
          </div>
        </div>

        {/* Collection Points List */}
        <div className="w-1/3 overflow-y-auto border-l border-gray-200">
          {filteredPoints.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              <Info className="h-12 w-12 mx-auto mb-2 text-gray-400" />
              <p>No collection points match your filter criteria.</p>
              <Button variant="link" onClick={() => setFilterType("all")}>
                Show all points
              </Button>
            </div>
          ) : (
            filteredPoints.map((point) => (
              <Card
                key={point.id}
                className={`m-2 cursor-pointer transition-all ${selectedPoint?.id === point.id ? "border-primary" : ""}`}
                onClick={() => handlePointSelect(point)}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{point.name}</CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-start space-x-2 mb-2">
                    <MapPin className="h-4 w-4 mt-0.5 text-gray-500" />
                    <p className="text-sm text-gray-600">{point.address}</p>
                  </div>
                  <div className="flex items-start space-x-2 mb-2">
                    <Clock className="h-4 w-4 mt-0.5 text-gray-500" />
                    <p className="text-sm text-gray-600">
                      {point.operatingHours}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {point.wasteTypes.map((type) => (
                      <Badge key={type} variant="secondary" className="text-xs">
                        {type}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      getDirections(point);
                    }}
                  >
                    <Navigation className="h-4 w-4 mr-2" />
                    Directions ({point.distance})
                  </Button>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CollectionMap;
