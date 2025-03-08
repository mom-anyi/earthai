import React from "react";
import Navbar from "../dashboard/Navbar";
import StatisticsPanel from "../dashboard/StatisticsPanel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Recycle, ArrowRight, Info, Calendar } from "lucide-react";

const RecyclingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar userType="user" userName="John Doe" notificationCount={3} />

      <div className="pt-16 p-4 md:p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <Recycle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Recycling Center</h1>
                <p className="text-gray-600">
                  Track your recycling progress and learn how to recycle
                  effectively
                </p>
              </div>
            </div>
          </div>

          {/* Statistics Panel */}
          <StatisticsPanel
            personalStats={{
              totalRecycled: 342,
              monthlyAverage: 28.5,
              impactScore: 87,
              carbonSaved: 156,
            }}
            recyclingGoals={{
              plastic: { current: 45, target: 100 },
              paper: { current: 78, target: 100 },
              glass: { current: 23, target: 50 },
              metal: { current: 12, target: 25 },
            }}
          />

          {/* Recycling Guides */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4">Recycling Guides</h2>

            <Tabs defaultValue="plastic" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="plastic">Plastic</TabsTrigger>
                <TabsTrigger value="paper">Paper</TabsTrigger>
                <TabsTrigger value="glass">Glass</TabsTrigger>
                <TabsTrigger value="metal">Metal</TabsTrigger>
                <TabsTrigger value="electronics">Electronics</TabsTrigger>
              </TabsList>

              <TabsContent value="plastic" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>How to Recycle Plastic</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>
                      Plastic recycling involves collecting plastic materials
                      and reprocessing them into new products instead of
                      throwing them away as waste.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="border rounded-lg p-4">
                        <h3 className="font-medium mb-2">Step 1: Clean</h3>
                        <p className="text-sm text-gray-600">
                          Rinse containers to remove food residue and remove
                          labels when possible.
                        </p>
                      </div>
                      <div className="border rounded-lg p-4">
                        <h3 className="font-medium mb-2">Step 2: Sort</h3>
                        <p className="text-sm text-gray-600">
                          Check the recycling number (1-7) and sort according to
                          local guidelines.
                        </p>
                      </div>
                      <div className="border rounded-lg p-4">
                        <h3 className="font-medium mb-2">Step 3: Compress</h3>
                        <p className="text-sm text-gray-600">
                          Flatten bottles and containers to save space in
                          recycling bins.
                        </p>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg flex items-start">
                      <Info className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Did you know?</h4>
                        <p className="text-sm">
                          It takes up to 500 years for plastic to decompose in
                          landfills, but recycled plastic can be transformed
                          into new products in as little as 6 weeks.
                        </p>
                      </div>
                    </div>

                    <Button className="w-full md:w-auto">
                      Learn More About Plastic Recycling
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="paper" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>How to Recycle Paper</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Paper recycling guide content would go here...</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="glass" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>How to Recycle Glass</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Glass recycling guide content would go here...</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="metal" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>How to Recycle Metal</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Metal recycling guide content would go here...</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="electronics" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>How to Recycle Electronics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Electronics recycling guide content would go here...</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Upcoming Recycling Events */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4">
              Upcoming Recycling Events
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">
                      Community Cleanup Day
                    </CardTitle>
                    <div className="p-2 rounded-full bg-green-100">
                      <Calendar className="h-4 w-4 text-green-600" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-2">
                    Join us for a community-wide cleanup and recycling drive.
                  </p>
                  <div className="text-sm">
                    <div className="flex items-center mb-1">
                      <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                      <span>June 15, 2023 | 9:00 AM - 2:00 PM</span>
                    </div>
                    <div className="flex items-center">
                      <Info className="h-4 w-4 mr-2 text-gray-500" />
                      <span>Central Park, Main Entrance</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">
                      E-Waste Collection Drive
                    </CardTitle>
                    <div className="p-2 rounded-full bg-green-100">
                      <Calendar className="h-4 w-4 text-green-600" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-2">
                    Safely dispose of your electronic waste at our collection
                    event.
                  </p>
                  <div className="text-sm">
                    <div className="flex items-center mb-1">
                      <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                      <span>June 22, 2023 | 10:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex items-center">
                      <Info className="h-4 w-4 mr-2 text-gray-500" />
                      <span>Community Center, North Wing</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">
                      Recycling Workshop
                    </CardTitle>
                    <div className="p-2 rounded-full bg-green-100">
                      <Calendar className="h-4 w-4 text-green-600" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-2">
                    Learn effective recycling techniques and upcycling ideas.
                  </p>
                  <div className="text-sm">
                    <div className="flex items-center mb-1">
                      <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                      <span>July 5, 2023 | 1:00 PM - 3:00 PM</span>
                    </div>
                    <div className="flex items-center">
                      <Info className="h-4 w-4 mr-2 text-gray-500" />
                      <span>Public Library, Conference Room B</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-4 flex justify-center">
              <Button variant="outline">
                View All Events
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecyclingPage;
