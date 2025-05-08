import { useIsMobile } from "../hooks/use-mobile";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Bell, Search, SidebarOpen } from "lucide-react";
import { SidebarTrigger } from "./ui/sidebar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  const isMobile = useIsMobile();

  return (
    <div className="flex items-center justify-between h-16 px-4 border-b shrink-0">
      <div className="flex items-center gap-4">
        {isMobile && (
          <SidebarTrigger>
            <SidebarOpen className="w-5 h-5" />
          </SidebarTrigger>
        )}
        <h1 className="text-xl font-semibold">{title}</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden sm:flex">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-[200px] pl-8 md:w-[280px] bg-background"
            />
          </div>
        </div>

        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-blood-500" />
        </Button>

        <Avatar className="h-8 w-8">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}

export default Header;
