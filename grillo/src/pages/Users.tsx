import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

// Define types for the role and status values
type UserRole = "Donor" | "Recipient" | "Admin";
type UserStatus = "Active" | "Inactive";

interface User {
  id: number;
  name: string;
  email: string;
  avatarUrl: string;
  role: UserRole;
  status: UserStatus;
}

const Users = () => {
  // Demo data for users
  const users: User[] = [
    {
      id: 1,
      name: "Alice Smith",
      email: "alice.smith@example.com",
      avatarUrl: "https://i.pravatar.cc/150?img=1",
      role: "Donor",
      status: "Active",
    },
    {
      id: 2,
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      avatarUrl: "https://i.pravatar.cc/150?img=2",
      role: "Recipient",
      status: "Inactive",
    },
    {
      id: 3,
      name: "Charlie Brown",
      email: "charlie.brown@example.com",
      avatarUrl: "https://i.pravatar.cc/150?img=3",
      role: "Admin",
      status: "Active",
    },
  ];

  // Add proper type annotations to solve the TS error
  const roleColors: Record<UserRole, string> = {
    Donor: "bg-green-100 text-green-800",
    Recipient: "bg-blue-100 text-blue-800",
    Admin: "bg-orange-100 text-orange-800",
  };

  const statusColors: Record<UserStatus, string> = {
    Active: "bg-green-100 text-green-800",
    Inactive: "bg-red-100 text-red-800",
  };

  return (
    <div className="container mx-auto py-10">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Users</CardTitle>
          <CardDescription>Manage users and their roles.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            {users.map((user) => (
              <Card key={user.id} className="shadow-sm">
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={user.avatarUrl} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="text-lg font-semibold">{user.name}</h2>
                      <p className="text-muted-foreground">{user.email}</p>
                      <Badge className={`mt-1 ${roleColors[user.role]}`}>
                        {user.role}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <Badge className={statusColors[user.status]}>
                      {user.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <Button className="flex-1 bg-[#D11B2F] hover:bg-[#A71526] cursor-pointer">
            Add User
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Users;
