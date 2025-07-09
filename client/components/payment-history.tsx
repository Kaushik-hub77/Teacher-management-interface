import { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  DollarSign,
  CheckCircle,
  Clock,
  AlertCircle,
  Download,
  Filter,
  Search,
} from "lucide-react";
import { PaymentRecord } from "@shared/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock payment history data
const paymentHistory: PaymentRecord[] = [
  {
    id: "1",
    teacherId: "1",
    amount: 5416.67,
    date: "2024-01-15",
    status: "completed",
    description: "Monthly Salary - January 2024",
  },
  {
    id: "2",
    teacherId: "2",
    amount: 6000.0,
    date: "2024-01-15",
    status: "completed",
    description: "Monthly Salary - January 2024",
  },
  {
    id: "3",
    teacherId: "1",
    amount: 1000.0,
    date: "2024-01-10",
    status: "completed",
    description: "Performance Bonus - Q4 2023",
  },
  {
    id: "4",
    teacherId: "3",
    amount: 4500.0,
    date: "2024-01-12",
    status: "pending",
    description: "Monthly Salary - January 2024",
  },
  {
    id: "5",
    teacherId: "2",
    amount: 750.0,
    date: "2024-01-08",
    status: "failed",
    description: "Overtime Payment - December 2023",
  },
  {
    id: "6",
    teacherId: "4",
    amount: 5200.0,
    date: "2024-01-05",
    status: "completed",
    description: "Monthly Salary - January 2024",
  },
];

// Mock teacher names for display
const teacherNames: Record<string, string> = {
  "1": "Sarah Johnson",
  "2": "Michael Chen",
  "3": "Emily Davis",
  "4": "Robert Wilson",
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    case "pending":
      return <Clock className="w-4 h-4 text-yellow-500" />;
    case "failed":
      return <AlertCircle className="w-4 h-4 text-red-500" />;
    default:
      return <Clock className="w-4 h-4 text-gray-500" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    case "pending":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    case "failed":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
  }
};

export function PaymentHistory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  const filteredPayments = paymentHistory
    .filter((payment) => {
      const teacherName = teacherNames[payment.teacherId] || "";
      const matchesSearch =
        teacherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || payment.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "amount":
          return b.amount - a.amount;
        case "teacher":
          return (teacherNames[a.teacherId] || "").localeCompare(
            teacherNames[b.teacherId] || "",
          );
        default:
          return 0;
      }
    });

  const totalAmount = filteredPayments.reduce(
    (sum, payment) => sum + payment.amount,
    0,
  );
  const completedPayments = filteredPayments.filter(
    (p) => p.status === "completed",
  ).length;
  const pendingPayments = filteredPayments.filter(
    (p) => p.status === "pending",
  ).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-2">
          Payment History
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          Track and manage all salary payments and transactions
        </p>
      </motion.div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            title: "Total Payments",
            value: filteredPayments.length.toString(),
            icon: DollarSign,
            color: "from-blue-500 to-blue-600",
          },
          {
            title: "Total Amount",
            value: `$${totalAmount.toLocaleString()}`,
            icon: DollarSign,
            color: "from-green-500 to-green-600",
          },
          {
            title: "Completed",
            value: completedPayments.toString(),
            icon: CheckCircle,
            color: "from-green-500 to-green-600",
          },
          {
            title: "Pending",
            value: pendingPayments.toString(),
            icon: Clock,
            color: "from-yellow-500 to-yellow-600",
          },
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center`}
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Filters and Search */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col md:flex-row gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search by teacher or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="amount">Amount</SelectItem>
                  <SelectItem value="teacher">Teacher</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button variant="outline" className="flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </Button>
        </div>
      </Card>

      {/* Payment History Table */}
      <Card className="p-6">
        <div className="space-y-4">
          {filteredPayments.map((payment, index) => (
            <motion.div
              key={payment.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-medium text-slate-800 dark:text-slate-200">
                      {teacherNames[payment.teacherId] || "Unknown Teacher"}
                    </h4>
                    <Badge className={getStatusColor(payment.status)}>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(payment.status)}
                        <span className="capitalize">{payment.status}</span>
                      </div>
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                    {payment.description}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-slate-500 dark:text-slate-400">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(payment.date).toLocaleDateString()}</span>
                    </div>
                    <span>ID: {payment.id}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-slate-800 dark:text-slate-200">
                    ${payment.amount.toLocaleString()}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    USD
                  </p>
                </div>
              </div>
            </motion.div>
          ))}

          {filteredPayments.length === 0 && (
            <div className="text-center py-12">
              <DollarSign className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-600 dark:text-slate-400">
                No payments found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </Card>

      {/* Razorpay Branding */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center py-6"
      >
        <div className="flex items-center justify-center space-x-2 text-slate-500 dark:text-slate-400">
          <span className="text-sm">Powered by</span>
          <div className="flex items-center space-x-1 px-3 py-1 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-blue-800 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">R</span>
            </div>
            <span className="font-semibold text-blue-600 dark:text-blue-400">
              Razorpay
            </span>
          </div>
        </div>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
          Secure payment processing for educational institutions
        </p>
      </motion.div>
    </div>
  );
}
