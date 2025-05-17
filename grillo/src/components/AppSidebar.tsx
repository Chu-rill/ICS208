import {
  Activity,
  BarChart4,
  Calendar,
  Heart,
  Home,
  LogOut,
  Settings,
  UserRound,
  Users,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "./ui/sidebar";
import { Link } from "react-router-dom";

export function AppSidebar() {
  const menuItems = [
    {
      title: "Dashboard",
      icon: Home,
      path: "/dashboard",
    },
    {
      title: "Donations",
      icon: Heart,
      path: "/dashboard/donations",
    },
    {
      title: "Appointments",
      icon: Calendar,
      path: "/dashboard/appointments",
    },
    {
      title: "Inventory",
      icon: Activity,
      path: "/dashboard/inventory",
    },
    {
      title: "Analytics",
      icon: BarChart4,
      path: "/dashboard/analytics",
    },
  ];

  const adminItems = [
    {
      title: "Users",
      icon: Users,
      path: "/dashboard/users",
    },
    {
      title: "Settings",
      icon: Settings,
      path: "/dashboard/settings",
    },
  ];

  return (
    <Sidebar className=" w-64 h-screen bg-white border-r border-gray-200 shadow-lg">
      <SidebarHeader className="flex items-center gap-2 px-4">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#D11B2F]">
          <Heart size={16} className="text-white" />
        </div>
        <span className="text-lg font-bold">BloodLink</span>
        <SidebarTrigger className="ml-auto lg:hidden" />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.path}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Administration</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.path}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/dashboard/profile">
                <UserRound className="w-4 h-4" />
                <span>Profile</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <button>
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
