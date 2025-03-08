import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Smartphone,
  Tablet,
  Phone,
  Laptop,
  Monitor,
  ArrowRight,
  Check,
  X,
} from "lucide-react";

interface MobileOptimizationProps {
  deviceType?: "smartphone" | "tablet" | "basic-phone";
  onDeviceChange?: (device: "smartphone" | "tablet" | "basic-phone") => void;
  previewMode?: boolean;
}

const MobileOptimization: React.FC<MobileOptimizationProps> = ({
  deviceType = "smartphone",
  onDeviceChange = () => {},
  previewMode = false,
}) => {
  const [activeDevice, setActiveDevice] = useState<
    "smartphone" | "tablet" | "basic-phone"
  >(deviceType);
  const [activeTab, setActiveTab] = useState("layout");
  const [orientation, setOrientation] = useState<"portrait" | "landscape">(
    "portrait",
  );

  const handleDeviceChange = (
    device: "smartphone" | "tablet" | "basic-phone",
  ) => {
    setActiveDevice(device);
    onDeviceChange(device);
  };

  const getDeviceIcon = (device: string) => {
    switch (device) {
      case "smartphone":
        return <Smartphone className="h-5 w-5" />;
      case "tablet":
        return <Tablet className="h-5 w-5" />;
      case "basic-phone":
        return <Phone className="h-5 w-5" />;
      default:
        return <Smartphone className="h-5 w-5" />;
    }
  };

  const getDeviceDimensions = () => {
    if (orientation === "landscape") {
      switch (activeDevice) {
        case "smartphone":
          return { width: 812, height: 375 };
        case "tablet":
          return { width: 1024, height: 768 };
        case "basic-phone":
          return { width: 320, height: 240 };
        default:
          return { width: 812, height: 375 };
      }
    } else {
      switch (activeDevice) {
        case "smartphone":
          return { width: 375, height: 812 };
        case "tablet":
          return { width: 768, height: 1024 };
        case "basic-phone":
          return { width: 240, height: 320 };
        default:
          return { width: 375, height: 812 };
      }
    }
  };

  const deviceDimensions = getDeviceDimensions();

  return (
    <div className="w-full h-full bg-white p-6 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Mobile Optimization</h2>
          <p className="text-muted-foreground mt-1">
            Optimize the dashboard for different mobile devices and interfaces
          </p>
        </div>
        {previewMode && (
          <Button>
            Apply Changes <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Device Selection</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col space-y-2">
                  <label className="text-sm font-medium">Device Type</label>
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      variant={
                        activeDevice === "smartphone" ? "default" : "outline"
                      }
                      className="flex flex-col items-center justify-center h-20 p-2"
                      onClick={() => handleDeviceChange("smartphone")}
                    >
                      <Smartphone className="h-8 w-8 mb-2" />
                      <span className="text-xs">Smartphone</span>
                    </Button>
                    <Button
                      variant={
                        activeDevice === "tablet" ? "default" : "outline"
                      }
                      className="flex flex-col items-center justify-center h-20 p-2"
                      onClick={() => handleDeviceChange("tablet")}
                    >
                      <Tablet className="h-8 w-8 mb-2" />
                      <span className="text-xs">Tablet</span>
                    </Button>
                    <Button
                      variant={
                        activeDevice === "basic-phone" ? "default" : "outline"
                      }
                      className="flex flex-col items-center justify-center h-20 p-2"
                      onClick={() => handleDeviceChange("basic-phone")}
                    >
                      <Phone className="h-8 w-8 mb-2" />
                      <span className="text-xs">Basic Phone</span>
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col space-y-2">
                  <label className="text-sm font-medium">Orientation</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant={
                        orientation === "portrait" ? "default" : "outline"
                      }
                      className="flex items-center justify-center py-2"
                      onClick={() => setOrientation("portrait")}
                    >
                      <Smartphone className="h-5 w-5 mr-2" />
                      Portrait
                    </Button>
                    <Button
                      variant={
                        orientation === "landscape" ? "default" : "outline"
                      }
                      className="flex items-center justify-center py-2"
                      onClick={() => setOrientation("landscape")}
                    >
                      <Smartphone className="h-5 w-5 mr-2 rotate-90" />
                      Landscape
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col space-y-2">
                  <label className="text-sm font-medium">Interface Type</label>
                  <Select defaultValue="touch">
                    <SelectTrigger>
                      <SelectValue placeholder="Select interface type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="touch">Touch Interface</SelectItem>
                      <SelectItem value="sms">SMS/USSD Interface</SelectItem>
                      <SelectItem value="voice">Voice Interface</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Optimization Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Smartphone className="h-4 w-4 mr-2" />
                    <span>Smartphone</span>
                  </div>
                  <Badge variant="default" className="flex items-center">
                    <Check className="h-3 w-3 mr-1" /> Optimized
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Tablet className="h-4 w-4 mr-2" />
                    <span>Tablet</span>
                  </div>
                  <Badge variant="default" className="flex items-center">
                    <Check className="h-3 w-3 mr-1" /> Optimized
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2" />
                    <span>Basic Phone</span>
                  </div>
                  <Badge variant="secondary" className="flex items-center">
                    <X className="h-3 w-3 mr-1" /> Pending
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Laptop className="h-4 w-4 mr-2" />
                    <span>Laptop</span>
                  </div>
                  <Badge variant="default" className="flex items-center">
                    <Check className="h-3 w-3 mr-1" /> Optimized
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Monitor className="h-4 w-4 mr-2" />
                    <span>Desktop</span>
                  </div>
                  <Badge variant="default" className="flex items-center">
                    <Check className="h-3 w-3 mr-1" /> Optimized
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Device Preview</CardTitle>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="flex items-center">
                    {getDeviceIcon(activeDevice)}
                    <span className="ml-1 capitalize">{activeDevice}</span>
                  </Badge>
                  <Badge variant="outline">
                    {deviceDimensions.width} × {deviceDimensions.height}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-3 mb-4">
                  <TabsTrigger value="layout">Layout</TabsTrigger>
                  <TabsTrigger value="components">Components</TabsTrigger>
                  <TabsTrigger value="performance">Performance</TabsTrigger>
                </TabsList>

                <TabsContent value="layout" className="space-y-4">
                  <div className="flex justify-center">
                    <div
                      className={`border-4 border-gray-800 rounded-2xl overflow-hidden bg-gray-100 ${orientation === "landscape" ? "rotate-90 mt-32 mb-32" : ""}`}
                      style={{
                        width: `${deviceDimensions.width / 4}px`,
                        height: `${deviceDimensions.height / 4}px`,
                        maxWidth: "100%",
                        maxHeight:
                          orientation === "landscape" ? "400px" : "600px",
                      }}
                    >
                      <div className="w-full h-full overflow-hidden bg-white">
                        <div className="h-6 bg-gray-800 flex items-center justify-center">
                          <div className="w-16 h-1 bg-gray-600 rounded-full"></div>
                        </div>
                        <div
                          className="p-2 overflow-auto"
                          style={{ height: "calc(100% - 24px)" }}
                        >
                          {/* Simplified dashboard preview */}
                          <div className="space-y-2">
                            <div className="h-8 bg-primary rounded-md w-full"></div>
                            <div className="grid grid-cols-2 gap-2">
                              <div className="h-16 bg-gray-200 rounded-md"></div>
                              <div className="h-16 bg-gray-200 rounded-md"></div>
                            </div>
                            <div className="h-24 bg-gray-200 rounded-md"></div>
                            <div className="h-24 bg-gray-200 rounded-md"></div>
                            <div className="grid grid-cols-2 gap-2">
                              <div className="h-16 bg-gray-200 rounded-md"></div>
                              <div className="h-16 bg-gray-200 rounded-md"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-md font-medium">
                      Layout Recommendations
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        <span>Use single column layout for smartphones</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        <span>
                          Implement collapsible sections for content
                          organization
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        <span>Prioritize critical information at the top</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        <span>Use bottom navigation for primary actions</span>
                      </li>
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="components" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">Touch Targets</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Minimum size</span>
                          <Badge variant="outline">44 × 44 px</Badge>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">Font Size</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Minimum size</span>
                          <Badge variant="outline">16px</Badge>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">Spacing</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Minimum padding</span>
                          <Badge variant="outline">16px</Badge>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">Images</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Responsive</span>
                          <Badge variant="default">Enabled</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-md font-medium">
                      Component Adaptations
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        <span>Simplified navigation with hamburger menu</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        <span>
                          Larger touch targets for buttons and interactive
                          elements
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        <span>Simplified charts and data visualizations</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        <span>Optimized forms with larger input fields</span>
                      </li>
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="performance" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">Load Time</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Average</span>
                          <Badge variant="default">1.2s</Badge>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">Data Usage</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Per session</span>
                          <Badge variant="outline">~250KB</Badge>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">
                          Offline Support
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Status</span>
                          <Badge variant="default">Enabled</Badge>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">
                          Battery Impact
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Rating</span>
                          <Badge variant="default">Low</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-md font-medium">
                      Performance Optimizations
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        <span>
                          Lazy loading of images and non-critical content
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        <span>
                          Reduced API calls for low-bandwidth connections
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        <span>Optimized assets for faster loading</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        <span>Progressive enhancement for basic phones</span>
                      </li>
                    </ul>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MobileOptimization;
