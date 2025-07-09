import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  TrendingUp,
  Clock,
  Award,
  DollarSign,
  Search,
  Filter,
  Calendar,
  Activity,
  Target,
  Zap,
  Star,
  ArrowUp,
  ArrowDown,
  Sparkles,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Enhanced mock data with more dynamic properties
const liveMetrics = {
  totalTeachers: 127,
  activeNow: 89,
  avgRating: 4.7,
  totalStudents: 2843,
  monthlyGrowth: 12.5,
  satisfactionScore: 96.2,
};

const realtimeStats = [
  {
    id: 1,
    title: "Total Teachers",
    value: liveMetrics.totalTeachers,
    change: "+12",
    changePercent: "+10.4%",
    trend: "up",
    icon: Users,
    gradient: "from-blue-500 to-cyan-500",
    pulseColor: "bg-blue-500",
  },
  {
    id: 2,
    title: "Active Teachers",
    value: liveMetrics.activeNow,
    change: "+5",
    changePercent: "+5.9%",
    trend: "up",
    icon: Activity,
    gradient: "from-green-500 to-emerald-500",
    pulseColor: "bg-green-500",
  },
  {
    id: 3,
    title: "Average Rating",
    value: liveMetrics.avgRating,
    change: "+0.2",
    changePercent: "+4.4%",
    trend: "up",
    icon: Star,
    gradient: "from-yellow-500 to-orange-500",
    pulseColor: "bg-yellow-500",
  },
  {
    id: 4,
    title: "Total Students",
    value: liveMetrics.totalStudents,
    change: "+127",
    changePercent: "+4.7%",
    trend: "up",
    icon: Target,
    gradient: "from-purple-500 to-pink-500",
    pulseColor: "bg-purple-500",
  },
];

const topPerformers = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    subject: "Advanced Mathematics",
    rating: 4.9,
    students: 45,
    growth: "+12%",
    avatar: "SJ",
    specialty: "Calculus Expert",
    achievements: 3,
  },
  {
    id: 2,
    name: "Prof. Michael Chen",
    subject: "Quantum Physics",
    rating: 4.8,
    students: 38,
    growth: "+8%",
    avatar: "MC",
    specialty: "Research Leader",
    achievements: 5,
  },
  {
    id: 3,
    name: "Ms. Emily Rodriguez",
    subject: "Creative Writing",
    rating: 4.7,
    students: 52,
    growth: "+15%",
    avatar: "ER",
    specialty: "Published Author",
    achievements: 2,
  },
];

const departmentMetrics = [
  { name: "Mathematics", teachers: 23, efficiency: 94, color: "bg-blue-500" },
  { name: "Sciences", teachers: 19, efficiency: 91, color: "bg-green-500" },
  { name: "Languages", teachers: 15, efficiency: 88, color: "bg-yellow-500" },
  { name: "Arts", teachers: 12, efficiency: 85, color: "bg-purple-500" },
];

const recentActivities = [
  {
    id: 1,
    action: "New teacher joined",
    teacher: "Alex Thompson",
    time: "2 min ago",
    type: "join",
  },
  {
    id: 2,
    action: "Performance review completed",
    teacher: "Sarah Johnson",
    time: "5 min ago",
    type: "review",
  },
  {
    id: 3,
    action: "Payment processed",
    teacher: "Michael Chen",
    time: "8 min ago",
    type: "payment",
  },
  {
    id: 4,
    action: "Student enrollment",
    teacher: "Emily Rodriguez",
    time: "12 min ago",
    type: "enrollment",
  },
];

export function DynamicTeacherDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedMetric, setSelectedMetric] = useState<number | null>(null);
  const [isLiveMode, setIsLiveMode] = useState(true);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      setAnimationKey((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Dynamic Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent leading-tight tracking-tight">
          <span className="hidden sm:inline">
            Staff Analytics data
          </span>
          <span className="sm:hidden">Teacher Analytics</span>
        </h1>

        <p className="text-gray-400 text-sm sm:text-base md:text-lg lg:text-xl max-w-4xl mx-auto px-4 leading-relaxed font-light">
          <span className="hidden sm:inline">
            Comprehensive insights and real-time analytics for educational
            excellence
          </span>
          <span className="sm:hidden">Real-time analytics for education</span>
        </p>
      </motion.div>

      {/* Real-time Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
        {realtimeStats.map((stat, index) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            onClick={() =>
              setSelectedMetric(selectedMetric === stat.id ? null : stat.id)
            }
            className="cursor-pointer"
          >
            <Card className="p-3 lg:p-6 bg-black border-gray-800 hover:border-blue-500 transition-all duration-300 relative overflow-hidden">
              {/* Pulse effect */}
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                className={`absolute -top-2 -right-2 w-4 h-4 ${stat.pulseColor} rounded-full`}
              />

              <div className="flex items-center justify-between mb-2 lg:mb-4">
                <div
                  className={`p-2 lg:p-3 rounded-xl bg-gradient-to-r ${stat.gradient} shadow-lg`}
                >
                  <stat.icon className="w-4 h-4 lg:w-6 lg:h-6 text-white" />
                </div>
                <motion.div
                  animate={{ rotate: stat.trend === "up" ? 0 : 180 }}
                  className="text-green-400"
                >
                  <ArrowUp className="w-4 h-4" />
                </motion.div>
              </div>

              <div className="space-y-1 lg:space-y-2">
                <p className="text-xs sm:text-sm lg:text-base font-medium text-gray-400 tracking-wide">
                  {stat.title}
                </p>
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white leading-none">
                  {typeof stat.value === "number" && stat.value > 10
                    ? stat.value.toLocaleString()
                    : stat.value}
                </p>
                <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-2 space-y-1 lg:space-y-0">
                  <span className="text-xs sm:text-sm lg:text-base text-green-400 font-semibold tracking-wide">
                    {stat.change}
                  </span>
                  <span className="text-xs sm:text-sm text-gray-500 font-medium">
                    <span className="hidden lg:inline">
                      {stat.changePercent} this month
                    </span>
                    <span className="lg:hidden">{stat.changePercent}</span>
                  </span>
                </div>
              </div>

              {/* Selection indicator */}
              <AnimatePresence>
                {selectedMetric === stat.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute inset-0 border-2 border-blue-500 rounded-lg pointer-events-none"
                  />
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Top Performers & Departments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Performers */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6 bg-black border-gray-800">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white flex items-center space-x-2 tracking-tight">
                <Award className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />
                <span>Top Performers</span>
              </h3>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-5 h-5 text-yellow-400" />
              </motion.div>
            </div>

            <div className="space-y-4">
              {topPerformers.map((performer, index) => (
                <motion.div
                  key={performer.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ scale: 1.02, x: 10 }}
                  className="p-4 bg-gray-900 rounded-xl border border-gray-800 hover:border-yellow-500 transition-all duration-300"
                >
                  <div className="flex items-center space-x-4">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className={`w-12 h-12 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center text-white font-bold shadow-lg`}
                    >
                      {performer.avatar}
                    </motion.div>

                    <div className="flex-1">
                      <h4 className="text-sm sm:text-base md:text-lg font-semibold text-white tracking-wide">
                        {performer.name}
                      </h4>
                      <p className="text-xs sm:text-sm md:text-base text-gray-400 font-medium">
                        {performer.subject}
                      </p>
                      <div className="flex items-center space-x-4 mt-1">
                        <Badge className="bg-yellow-500 text-black text-xs">
                          ⭐ {performer.rating}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {performer.students} students
                        </span>
                        <span className="text-xs text-green-400 font-medium">
                          {performer.growth}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="flex items-center space-x-1">
                        {Array.from({ length: performer.achievements }).map(
                          (_, i) => (
                            <motion.div
                              key={i}
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{
                                delay: i * 0.2,
                                duration: 1,
                                repeat: Infinity,
                              }}
                            >
                              <Award className="w-4 h-4 text-yellow-400" />
                            </motion.div>
                          ),
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {performer.specialty}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Department Metrics */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6 bg-black border-gray-800">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white flex items-center space-x-2 tracking-tight">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
                <span>Department Performance</span>
              </h3>
              <Button
                variant="outline"
                size="sm"
                className="border-gray-700 text-gray-300"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>

            <div className="space-y-4">
              {departmentMetrics.map((dept, index) => (
                <motion.div
                  key={dept.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ scale: 1.02 }}
                  className="p-4 bg-gray-900 rounded-xl border border-gray-800 hover:border-blue-500 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-white">{dept.name}</h4>
                    <Badge className="bg-blue-500 text-white">
                      {dept.teachers} teachers
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Efficiency</span>
                      <span className="text-white font-medium">
                        {dept.efficiency}%
                      </span>
                    </div>

                    <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${dept.efficiency}%` }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                        className={`h-2 ${dept.color} rounded-full relative`}
                      >
                        <motion.div
                          animate={{ x: [-10, 10, -10] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute inset-0 bg-white opacity-30 w-4 h-full"
                        />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Recent Activities */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="p-6 bg-black border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white flex items-center space-x-2 tracking-tight">
              <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
              <span>Live Activity Feed</span>
            </h3>
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-3 h-3 bg-green-400 rounded-full"
            />
          </div>

          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex items-center space-x-4 p-3 bg-gray-900 rounded-lg border border-gray-800 hover:border-green-500 transition-all duration-300"
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    activity.type === "join"
                      ? "bg-blue-400"
                      : activity.type === "review"
                        ? "bg-yellow-400"
                        : activity.type === "payment"
                          ? "bg-green-400"
                          : "bg-purple-400"
                  } animate-pulse`}
                />

                <div className="flex-1">
                  <p className="text-white text-sm">
                    <span className="font-medium">{activity.action}</span>
                    {activity.teacher && (
                      <span className="text-blue-400 ml-1">
                        - {activity.teacher}
                      </span>
                    )}
                  </p>
                  <p className="text-gray-500 text-xs">{activity.time}</p>
                </div>

                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Zap className="w-4 h-4 text-yellow-400" />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
