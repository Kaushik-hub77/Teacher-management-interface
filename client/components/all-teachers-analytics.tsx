import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import {
  Users,
  TrendingUp,
  Clock,
  Award,
  Calendar,
  MapPin,
  DollarSign,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Mock analytics data for all teachers
const availabilityData = [
  { day: "Mon", available: 45, total: 52, percentage: 87 },
  { day: "Tue", available: 38, total: 52, percentage: 73 },
  { day: "Wed", available: 42, total: 52, percentage: 81 },
  { day: "Thu", available: 35, total: 52, percentage: 67 },
  { day: "Fri", available: 48, total: 52, percentage: 92 },
  { day: "Sat", available: 25, total: 52, percentage: 48 },
  { day: "Sun", available: 12, total: 52, percentage: 23 },
];

const departmentData = [
  { name: "Mathematics", value: 15, color: "#3b82f6" },
  { name: "Science", value: 12, color: "#8b5cf6" },
  { name: "English", value: 10, color: "#10b981" },
  { name: "History", value: 8, color: "#f59e0b" },
  { name: "Arts", value: 7, color: "#ef4444" },
];

const performanceData = [
  { month: "Jan", satisfaction: 4.5, retention: 95 },
  { month: "Feb", satisfaction: 4.6, retention: 94 },
  { month: "Mar", satisfaction: 4.4, retention: 96 },
  { month: "Apr", satisfaction: 4.7, retention: 97 },
  { month: "May", satisfaction: 4.8, retention: 98 },
  { month: "Jun", satisfaction: 4.6, retention: 95 },
];

const topTeachers = [
  {
    name: "Sarah Johnson",
    subject: "Mathematics",
    rating: 4.9,
    students: 45,
    experience: "5 years",
  },
  {
    name: "Michael Chen",
    subject: "Physics",
    rating: 4.8,
    students: 42,
    experience: "7 years",
  },
  {
    name: "Emily Davis",
    subject: "English",
    rating: 4.7,
    students: 38,
    experience: "4 years",
  },
  {
    name: "Robert Wilson",
    subject: "Chemistry",
    rating: 4.6,
    students: 35,
    experience: "6 years",
  },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700">
        <p className="font-medium text-slate-800 dark:text-slate-200">
          {label}
        </p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }}>
            {`${entry.dataKey}: ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function AllTeachersAnalytics() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-2">
          All Teachers Analytics
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          Comprehensive insights into teacher performance and availability
        </p>
      </motion.div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            title: "Total Teachers",
            value: "52",
            change: "+3 this month",
            icon: Users,
            color: "from-blue-500 to-blue-600",
          },
          {
            title: "Avg Rating",
            value: "4.7",
            change: "+0.2 improvement",
            icon: Award,
            color: "from-yellow-500 to-yellow-600",
          },
          {
            title: "Weekly Availability",
            value: "78%",
            change: "+5% from last week",
            icon: Clock,
            color: "from-green-500 to-green-600",
          },
          {
            title: "Total Salary Budget",
            value: "$3.2M",
            change: "Annual budget",
            icon: DollarSign,
            color: "from-purple-500 to-purple-600",
          },
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                    {stat.value}
                  </p>
                  <p className="text-sm text-green-600 dark:text-green-400 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {stat.change}
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Availability Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-6">
              Daily Teacher Availability
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={availabilityData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis
                    dataKey="day"
                    tick={{ fontSize: 12 }}
                    className="text-slate-600 dark:text-slate-400"
                  />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    className="text-slate-600 dark:text-slate-400"
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey="available"
                    fill="url(#availabilityGradient)"
                    radius={[4, 4, 0, 0]}
                  />
                  <defs>
                    <linearGradient
                      id="availabilityGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.9} />
                      <stop
                        offset="95%"
                        stopColor="#8b5cf6"
                        stopOpacity={0.9}
                      />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        {/* Department Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-6">
              Teachers by Department
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={departmentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {departmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {departmentData.map((dept) => (
                <div key={dept.name} className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: dept.color }}
                  />
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {dept.name} ({dept.value})
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Performance Trends */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-6">
            Performance Trends (6 Months)
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12 }}
                  className="text-slate-600 dark:text-slate-400"
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  className="text-slate-600 dark:text-slate-400"
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="satisfaction"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ fill: "#3b82f6", strokeWidth: 2, r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="retention"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </motion.div>

      {/* Top Performing Teachers */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-6">
            Top Performing Teachers
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topTeachers.map((teacher, index) => (
              <div
                key={teacher.name}
                className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-slate-800 dark:text-slate-200">
                    {teacher.name}
                  </h4>
                  <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                    #{index + 1}
                  </Badge>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                  {teacher.subject} • {teacher.experience}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">
                    {teacher.students} students
                  </span>
                  <div className="flex items-center space-x-1">
                    <Award className="w-4 h-4 text-yellow-500" />
                    <span className="font-medium text-slate-800 dark:text-slate-200">
                      {teacher.rating}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
