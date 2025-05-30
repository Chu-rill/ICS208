import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { toast } from "sonner";
import { useAuth } from "./AuthContext";

// Department types
export const DEPARTMENTS = [
  "School Fees",
  "Library",
  "Hostel",
  "Department",
  "Bursary",
  "Sports",
];

// Rejection reasons
export const REJECTION_REASONS = {
  "School Fees": [
    "Fee payment incomplete",
    "Payment verification failed",
    "Discrepancy in payment records",
    "Outstanding balance",
  ],
  Library: [
    "Unreturned books",
    "Outstanding fines",
    "Damaged library materials",
    "Library card expired",
  ],
  Hostel: [
    "Room key not returned",
    "Property damage",
    "Outstanding hostel fees",
    "Violation of hostel rules",
  ],
  Department: [
    "Missing coursework",
    "Incomplete project submissions",
    "Equipment not returned",
    "Outstanding department dues",
  ],
  Bursary: [
    "Missing financial documentation",
    "Unreconciled accounts",
    "Scholarship requirements unfulfilled",
    "Financial records discrepancy",
  ],
  Sports: [
    "Unreturned sports equipment",
    "Outstanding sports fees",
    "Incomplete participation requirements",
    "Sports property damage",
  ],
};

export interface ClearanceRequest {
  id: string;
  studentId: string;
  studentName: string;
  matricNumber: string;
  department: string;
  status: "pending" | "approved" | "rejected";
  dateRequested: Date;
  dateUpdated?: Date;
  rejectionReason?: string;
}

interface ClearanceContextType {
  studentRequests: ClearanceRequest[];
  pendingRequests: ClearanceRequest[];
  clearedRequests: ClearanceRequest[];
  requestClearance: (department: string) => void;
  approveClearance: (requestId: string) => void;
  rejectClearance: (requestId: string, reason: string) => void;
  getStudentClearanceProgress: () => number;
  getDepartmentRequestStatus: (
    department: string
  ) => "none" | "pending" | "approved" | "rejected";
  getRejectionReason: (department: string) => string | undefined;
}

const ClearanceContext = createContext<ClearanceContextType>({
  studentRequests: [],
  pendingRequests: [],
  clearedRequests: [],
  requestClearance: () => {},
  approveClearance: () => {},
  rejectClearance: () => {},
  getStudentClearanceProgress: () => 0,
  getDepartmentRequestStatus: () => "none",
  getRejectionReason: () => undefined,
});

export const useClearance = () => useContext(ClearanceContext);

// Generate mock data
const generateMockRequests = (): ClearanceRequest[] => {
  const today = new Date();
  const day = 24 * 60 * 60 * 1000; // One day in milliseconds

  return [
    // John Student - All Approved
    {
      id: "req1",
      studentId: "1",
      studentName: "John Student",
      matricNumber: "123456",
      department: "Library",
      status: "approved",
      dateRequested: new Date(today.getTime() - 10 * day),
      dateUpdated: new Date(today.getTime() - 8 * day),
    },
    {
      id: "req2",
      studentId: "1",
      studentName: "John Student",
      matricNumber: "123456",
      department: "School Fees",
      status: "approved",
      dateRequested: new Date(today.getTime() - 9 * day),
      dateUpdated: new Date(today.getTime() - 7 * day),
    },
    {
      id: "req3",
      studentId: "1",
      studentName: "John Student",
      matricNumber: "123456",
      department: "Hostel",
      status: "approved",
      dateRequested: new Date(today.getTime() - 8 * day),
      dateUpdated: new Date(today.getTime() - 6 * day),
    },
    {
      id: "req4",
      studentId: "1",
      studentName: "John Student",
      matricNumber: "123456",
      department: "Department",
      status: "approved",
      dateRequested: new Date(today.getTime() - 7 * day),
      dateUpdated: new Date(today.getTime() - 5 * day),
    },
    {
      id: "req5",
      studentId: "1",
      studentName: "John Student",
      matricNumber: "123456",
      department: "Bursary",
      status: "approved",
      dateRequested: new Date(today.getTime() - 6 * day),
      dateUpdated: new Date(today.getTime() - 4 * day),
    },
    {
      id: "req6",
      studentId: "1",
      studentName: "John Student",
      matricNumber: "123456",
      department: "Sports",
      status: "approved",
      dateRequested: new Date(today.getTime() - 5 * day),
      dateUpdated: new Date(today.getTime() - 3 * day),
    },

    // Emily Davis - Mixed
    {
      id: "req7",
      studentId: "5",
      studentName: "Emily Davis",
      matricNumber: "789012",
      department: "Library",
      status: "rejected",
      dateRequested: new Date(today.getTime() - 4 * day),
      dateUpdated: new Date(today.getTime() - 3 * day),
      rejectionReason: "Unreturned books",
    },
    {
      id: "req8",
      studentId: "5",
      studentName: "Emily Davis",
      matricNumber: "789012",
      department: "School Fees",
      status: "pending",
      dateRequested: new Date(today.getTime() - 3 * day),
    },
    {
      id: "req9",
      studentId: "5",
      studentName: "Emily Davis",
      matricNumber: "789012",
      department: "Hostel",
      status: "approved",
      dateRequested: new Date(today.getTime() - 6 * day),
      dateUpdated: new Date(today.getTime() - 5 * day),
    },
    {
      id: "req10",
      studentId: "5",
      studentName: "Emily Davis",
      matricNumber: "789012",
      department: "Department",
      status: "pending",
      dateRequested: new Date(today.getTime() - 2 * day),
    },
    {
      id: "req11",
      studentId: "5",
      studentName: "Emily Davis",
      matricNumber: "789012",
      department: "Bursary",
      status: "approved",
      dateRequested: new Date(today.getTime() - 8 * day),
      dateUpdated: new Date(today.getTime() - 7 * day),
    },
    {
      id: "req12",
      studentId: "5",
      studentName: "Emily Davis",
      matricNumber: "789012",
      department: "Sports",
      status: "pending",
      dateRequested: new Date(today.getTime() - 1 * day),
    },

    // Michael Brown - Mixed
    {
      id: "req13",
      studentId: "6",
      studentName: "Michael Brown",
      matricNumber: "345678",
      department: "Library",
      status: "approved",
      dateRequested: new Date(today.getTime() - 7 * day),
      dateUpdated: new Date(today.getTime() - 6 * day),
    },
    {
      id: "req14",
      studentId: "6",
      studentName: "Michael Brown",
      matricNumber: "345678",
      department: "School Fees",
      status: "rejected",
      dateRequested: new Date(today.getTime() - 6 * day),
      dateUpdated: new Date(today.getTime() - 5 * day),
      rejectionReason: "Outstanding balance",
    },
    {
      id: "req15",
      studentId: "6",
      studentName: "Michael Brown",
      matricNumber: "345678",
      department: "Hostel",
      status: "pending",
      dateRequested: new Date(today.getTime() - 5 * day),
    },
    {
      id: "req16",
      studentId: "6",
      studentName: "Michael Brown",
      matricNumber: "345678",
      department: "Department",
      status: "approved",
      dateRequested: new Date(today.getTime() - 4 * day),
      dateUpdated: new Date(today.getTime() - 3 * day),
    },
    {
      id: "req17",
      studentId: "7",
      studentName: "Sarah Wilson",
      matricNumber: "901234",
      department: "Bursary",
      status: "pending",
      dateRequested: new Date(today.getTime() - 3 * day),
    },
    {
      id: "req18",
      studentId: "7",
      studentName: "Sarah Wilson",
      matricNumber: "901234",
      department: "Sports",
      status: "rejected",
      dateRequested: new Date(today.getTime() - 2 * day),
      dateUpdated: new Date(today.getTime() - 1 * day),
      rejectionReason: "Incomplete participation requirements",
    },
  ];
};

export const ClearanceProvider = ({ children }: { children: ReactNode }) => {
  const { currentUser } = useAuth();
  const [allRequests, setAllRequests] = useState<ClearanceRequest[]>(() => {
    const savedRequests = localStorage.getItem("clearanceRequests");
    return savedRequests ? JSON.parse(savedRequests) : generateMockRequests();
  });

  // Save requests to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("clearanceRequests", JSON.stringify(allRequests));
  }, [allRequests]);

  // Filter requests based on user role
  const studentRequests =
    currentUser?.role === "student"
      ? allRequests.filter((req) => req.studentId === currentUser.id)
      : [];

  const pendingRequests =
    currentUser?.role === "admin"
      ? allRequests.filter(
          (req) =>
            req.department === currentUser.department &&
            req.status === "pending"
        )
      : currentUser?.role === "superadmin"
      ? allRequests.filter((req) => req.status === "pending")
      : [];

  const clearedRequests =
    currentUser?.role === "admin"
      ? allRequests.filter(
          (req) =>
            req.department === currentUser.department &&
            req.status === "approved"
        )
      : currentUser?.role === "superadmin"
      ? allRequests.filter((req) => req.status === "approved")
      : [];

  // Request clearance for a department
  const requestClearance = (department: string) => {
    if (!currentUser || currentUser.role !== "student") return;

    // Check if there's already a pending or approved request
    const existingRequest = studentRequests.find(
      (req) =>
        req.department === department &&
        (req.status === "pending" || req.status === "approved")
    );

    if (existingRequest) {
      toast.error(
        "You already have a pending or approved request for this department"
      );
      return;
    }

    const newRequest: ClearanceRequest = {
      id: `req-${Date.now()}`,
      studentId: currentUser.id,
      studentName: currentUser.name,
      matricNumber: currentUser.matricNumber || "",
      department,
      status: "pending",
      dateRequested: new Date(),
    };

    setAllRequests((prev) => [...prev, newRequest]);
    toast.success(`Clearance requested for ${department}`);
  };

  // Approve clearance request
  const approveClearance = (requestId: string) => {
    setAllRequests((prev) =>
      prev.map((req) =>
        req.id === requestId
          ? {
              ...req,
              status: "approved",
              dateUpdated: new Date(),
            }
          : req
      )
    );

    const request = allRequests.find((req) => req.id === requestId);
    if (request) {
      toast.success(
        `Clearance approved for ${request.studentName} in ${request.department}`
      );
    }
  };

  // Reject clearance request
  const rejectClearance = (requestId: string, reason: string) => {
    setAllRequests((prev) =>
      prev.map((req) =>
        req.id === requestId
          ? {
              ...req,
              status: "rejected",
              dateUpdated: new Date(),
              rejectionReason: reason,
            }
          : req
      )
    );

    const request = allRequests.find((req) => req.id === requestId);
    if (request) {
      toast.error(
        `Clearance rejected for ${request.studentName} in ${request.department}`
      );
    }
  };

  // Calculate student clearance progress
  const getStudentClearanceProgress = () => {
    if (!currentUser || currentUser.role !== "student") return 0;

    const approvedCount = studentRequests.filter(
      (req) => req.status === "approved"
    ).length;
    return Math.round((approvedCount / DEPARTMENTS.length) * 100);
  };

  // Get request status for a specific department
  const getDepartmentRequestStatus = (department: string) => {
    if (!currentUser || currentUser.role !== "student") return "none";

    const request = studentRequests.find(
      (req) => req.department === department
    );
    return request ? request.status : "none";
  };

  // Get rejection reason for a department
  const getRejectionReason = (department: string) => {
    if (!currentUser || currentUser.role !== "student") return undefined;

    const request = studentRequests.find(
      (req) => req.department === department && req.status === "rejected"
    );

    return request?.rejectionReason;
  };

  return (
    <ClearanceContext.Provider
      value={{
        studentRequests,
        pendingRequests,
        clearedRequests,
        requestClearance,
        approveClearance,
        rejectClearance,
        getStudentClearanceProgress,
        getDepartmentRequestStatus,
        getRejectionReason,
      }}
    >
      {children}
    </ClearanceContext.Provider>
  );
};
