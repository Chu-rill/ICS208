import { SidebarProvider } from "./ui/sidebar";
import AppSidebar from "./AppSidebar";
import { Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 flex flex-col ml-64">
          {" "}
          {/* Add ml-64 to create space for the absolute sidebar */}
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}

export default AppLayout;
