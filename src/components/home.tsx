import React, { useState } from "react";
import Navbar from "./dashboard/Navbar";
import UserDashboard from "./dashboard/UserDashboard";
import { LayoutDashboard, Smartphone } from "lucide-react";
import MobileOptimization from "./dashboard/MobileOptimization";

interface HomeProps {
  userType?: "user" | "admin";
  userName?: string;
  userAvatar?: string;
  notificationCount?: number;
  isMobileView?: boolean;
}

const Home: React.FC<HomeProps> = ({
  userType = "user",
  userName = "John Doe",
  userAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=John`,
  notificationCount = 3,
  isMobileView = false,
}) => {
  const [showMobileSettings, setShowMobileSettings] = useState(false);
  const [mobileDevice, setMobileDevice] = useState<
    "smartphone" | "tablet" | "basic-phone"
  >("smartphone");

  const handleMenuToggle = () => {
    console.log("Menu toggled");
    // In a real implementation, this would toggle a mobile menu
  };

  const handleProfileClick = () => {
    console.log("Profile clicked");
    // In a real implementation, this would navigate to profile page
  };

  const handleNotificationsClick = () => {
    console.log("Notifications clicked");
    // In a real implementation, this would open notifications panel
  };

  const handleLogout = () => {
    console.log("Logout clicked");
    // In a real implementation, this would handle logout
  };

  const handleDeviceChange = (
    device: "smartphone" | "tablet" | "basic-phone",
  ) => {
    setMobileDevice(device);
    console.log(`Device changed to ${device}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <Navbar
        userType={userType}
        userName={userName}
        userAvatar={userAvatar}
        notificationCount={notificationCount}
        onMenuToggle={handleMenuToggle}
        onProfileClick={handleProfileClick}
        onNotificationsClick={handleNotificationsClick}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <div className="pt-16">
        {" "}
        {/* Add padding top to account for fixed navbar */}
        {showMobileSettings ? (
          <MobileOptimization
            deviceType={mobileDevice}
            onDeviceChange={handleDeviceChange}
            previewMode={true}
          />
        ) : userType === "admin" ? (
          <div className="w-full min-h-screen bg-gray-100 p-4 md:p-6">
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 mt-1">
                Manage waste collection, recycling programs, employment, and
                health indicators
              </p>
            </div>
            <p className="text-center text-gray-500 mt-8">
              Admin dashboard content will be displayed here
            </p>
          </div>
        ) : (
          <UserDashboard
            userName={userName}
            userAvatar={userAvatar}
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
            healthMetrics={{
              airQuality: 68,
              respiratoryIssues: 42,
              communityHealth: 78,
            }}
          />
        )}
      </div>

      {/* Mobile Optimization Toggle (for demo purposes) */}
      <div className="fixed bottom-4 right-4">
        <button
          onClick={() => setShowMobileSettings(!showMobileSettings)}
          className="bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary/90 transition-colors"
        >
          {showMobileSettings ? (
            <LayoutDashboard className="h-6 w-6" />
          ) : (
            <Smartphone className="h-6 w-6" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Home;
