export interface Teacher {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  availability: {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
  };
  salary: number;
  lastPaymentDate: string;
  assignedStudents: Student[];
  joiningDate: string;
  profileImage?: string;
}

export interface Student {
  id: string;
  name: string;
  grade: string;
  subject: string;
  enrolledDate: string;
}

export interface PaymentRecord {
  id: string;
  teacherId: string;
  amount: number;
  date: string;
  status: "pending" | "completed" | "failed";
  description: string;
}

export interface DashboardStats {
  totalTeachers: number;
  activeTeachers: number;
  totalStudents: number;
  pendingPayments: number;
}

export interface AvailabilityData {
  day: string;
  available: number;
  total: number;
}
