import { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "sonner";

// Define user types
export type UserRole = "student" | "admin" | "superadmin";

export interface User {
  id: string;
  name: string;
  role: UserRole;
  department?: string; // For admin users
  matricNumber?: string; // For student users
}

// Mock users for demonstration
const MOCK_USERS = [
  {
    id: "1",
    matricNumber: "123456",
    password: "password",
    name: "John Student",
    role: "student" as UserRole,
  },
  {
    id: "2",
    username: "library_admin",
    password: "admin",
    name: "Library Admin",
    role: "admin" as UserRole,
    department: "Library",
  },
  {
    id: "3",
    username: "fees_admin",
    password: "admin",
    name: "Fees Admin",
    role: "admin" as UserRole,
    department: "School Fees",
  },
  {
    id: "4",
    username: "superadmin",
    password: "superadmin",
    name: "Super Admin",
    role: "superadmin" as UserRole,
  },
];

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (matricOrUsername: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  isAuthenticated: false,
  login: async () => false,
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("clearanceUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (matricOrUsername: string, password: string) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Find user (either by matric number for students or username for admins)
    const foundUser = MOCK_USERS.find(
      (user) =>
        (user.matricNumber === matricOrUsername ||
          user.username === matricOrUsername) &&
        user.password === password
    );

    if (foundUser) {
      // Create a safe user object without password
      const safeUser: User = {
        id: foundUser.id,
        name: foundUser.name,
        role: foundUser.role,
        ...(foundUser.matricNumber && { matricNumber: foundUser.matricNumber }),
        ...(foundUser.department && { department: foundUser.department }),
      };

      setCurrentUser(safeUser);
      localStorage.setItem("clearanceUser", JSON.stringify(safeUser));
      toast.success("Login successful");
      return true;
    } else {
      toast.error("Invalid credentials");
      return false;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("clearanceUser");
    toast.info("You have been logged out");
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
