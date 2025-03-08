import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Bell,
  Search,
  Menu,
  User,
  LogOut,
  Settings,
  HelpCircle,
  ChevronDown,
  Recycle,
  BarChart2,
  Users,
  MapPin,
  Home,
} from "lucide-react";

interface NavbarProps {
  userType?: "user" | "admin";
  userName?: string;
  userAvatar?: string;
  notificationCount?: number;
  onMenuToggle?: () => void;
  onProfileClick?: () => void;
  onNotificationsClick?: () => void;
  onLogout?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  userType = "user",
  userName = "John Doe",
  userAvatar = "",
  notificationCount = 3,
  onMenuToggle = () => {},
  onProfileClick = () => {},
  onNotificationsClick = () => {},
  onLogout = () => {},
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // Implement search functionality
  };

  const navLinks =
    userType === "admin"
      ? [
          {
            name: "Dashboard",
            icon: <BarChart2 className="h-4 w-4" />,
            href: "/admin/dashboard",
          },
          {
            name: "Programs",
            icon: <Recycle className="h-4 w-4" />,
            href: "/admin/programs",
          },
          {
            name: "Employment",
            icon: <Users className="h-4 w-4" />,
            href: "/admin/employment",
          },
          {
            name: "Collection Points",
            icon: <MapPin className="h-4 w-4" />,
            href: "/admin/collection-points",
          },
        ]
      : [
          { name: "Home", icon: <Home className="h-4 w-4" />, href: "/" },
          {
            name: "Recycling",
            icon: <Recycle className="h-4 w-4" />,
            href: "/recycling",
          },
          {
            name: "Collection Points",
            icon: <MapPin className="h-4 w-4" />,
            href: "/collection-points",
          },
          { name: "Jobs", icon: <Users className="h-4 w-4" />, href: "/jobs" },
        ];

  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full z-30 h-16">
      <div className="px-4 h-full flex items-center justify-between">
        {/* Left section: Logo and mobile menu toggle */}
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden mr-2"
            onClick={onMenuToggle}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center">
            <Recycle className="h-8 w-8 text-green-600" />
            <span className="ml-2 text-xl font-bold text-green-600">
              EcoTrack
            </span>
          </div>
        </div>

        {/* Center section: Navigation links (desktop only) */}
        <div className="hidden md:flex items-center space-x-4">
          {navLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-100 hover:text-gray-900"
            >
              {link.icon}
              <span className="ml-2">{link.name}</span>
            </a>
          ))}
        </div>

        {/* Right section: Search, notifications, and profile */}
        <div className="flex items-center space-x-3">
          {/* Search */}
          <form onSubmit={handleSearch} className="hidden md:flex relative">
            <Input
              type="search"
              placeholder="Search..."
              className="w-64 pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </form>

          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={onNotificationsClick}
          >
            <Bell className="h-5 w-5" />
            {notificationCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500">
                {notificationCount}
              </Badge>
            )}
          </Button>

          {/* Profile dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={
                      userAvatar ||
                      `https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`
                    }
                    alt={userName}
                  />
                  <AvatarFallback>
                    {userName.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:flex flex-col items-start">
                  <span className="text-sm font-medium">{userName}</span>
                  <span className="text-xs text-gray-500 capitalize">
                    {userType}
                  </span>
                </div>
                <ChevronDown className="h-4 w-4 hidden md:block" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onProfileClick}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Help</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
