import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Users,
  DollarSign,
  BarChart3,
  TrendingUp,
  Clock,
  GraduationCap,
} from "lucide-react";
import { Teacher } from "@shared/types";
import { DashboardLayout } from "@/components/dashboard-layout";
import { TeacherSearch } from "@/components/teacher-search";
import { TeacherDetails } from "@/components/teacher-details";
import { AvailabilityChart } from "@/components/availability-chart";
import { PaymentForm } from "@/components/payment-form";
import { AllTeachersAnalytics } from "@/components/all-teachers-analytics";
import { PaymentHistory } from "@/components/payment-history";
import { DynamicTeacherDashboard } from "@/components/dynamic-teacher-dashboard";
import { Card } from "@/components/ui/card";

const statsData = [
  {
    title: "Total Teachers",
    value: "52",
    change: "+12%",
    icon: Users,
    color: "from-blue-500 to-blue-600",
  },
  {
    title: "Active Today",
    value: "45",
    change: "+8%",
    icon: Clock,
    color: "from-green-500 to-green-600",
  },
  {
    title: "Total Students",
    value: "1,247",
    change: "+23%",
    icon: GraduationCap,
    color: "from-purple-500 to-purple-600",
  },
  {
    title: "Monthly Payments",
    value: "$284K",
    change: "+15%",
    icon: DollarSign,
    color: "from-orange-500 to-orange-600",
  },
];

export default function Index() {
  const location = useLocation();
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [activeSection, setActiveSection] = useState<
    "search" | "details" | "analytics" | "payments" | "teachers"
  >("search");

  // Set active section based on current route
  useEffect(() => {
    const path = location.pathname;
    if (path === "/analytics") {
      setActiveSection("analytics");
    } else if (path === "/payments") {
      setActiveSection("payments");
    } else if (path === "/teachers") {
      setActiveSection("teachers");
    } else {
      setActiveSection("search");
    }
  }, [location.pathname]);

  const handleTeacherSelect = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setActiveSection("details");
  };

  const handlePaymentSubmit = (payment: any) => {
    console.log("Payment submitted:", payment);
    // In real app, this would call an API
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, index) => (
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
                      {stat.change} from last month
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

        {/* Action Buttons */}
        {!selectedTeacher && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            {[
              {
                id: "search",
                label: "Find Teacher",
                icon: Users,
                active: activeSection === "search",
              },
              {
                id: "analytics",
                label: "View Analytics",
                icon: BarChart3,
                active: activeSection === "analytics",
              },
            ].map((button) => (
              <button
                key={button.id}
                onClick={() => setActiveSection(button.id as any)}
                className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  button.active
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                    : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:shadow-md"
                }`}
              >
                <button.icon className="w-4 h-4" />
                <span className="ml-2 flex-1 text-center text-sm sm:text-base font-medium tracking-wide">
                  {button.label}
                </span>
              </button>
            ))}
          </motion.div>
        )}

        {/* Teacher Selected Actions */}
        {selectedTeacher && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            {[
              { id: "details", label: "Profile Details", icon: Users },
              { id: "analytics", label: "Analytics", icon: BarChart3 },
              { id: "payments", label: "Process Payment", icon: DollarSign },
              { id: "search", label: "Find Another", icon: Users },
            ].map((button) => (
              <button
                key={button.id}
                onClick={() => setActiveSection(button.id as any)}
                className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeSection === button.id
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                    : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:shadow-md"
                }`}
              >
                <button.icon className="w-4 h-4" />
                <span className="ml-2 flex-1 text-center text-sm sm:text-base font-medium tracking-wide">
                  {button.label}
                </span>
              </button>
            ))}
          </motion.div>
        )}

        {/* Content Sections */}
        <div className="min-h-[400px]">
          {activeSection === "search" && (
            <div className="space-y-8">
              <DynamicTeacherDashboard />
              <TeacherSearch onTeacherSelect={handleTeacherSelect} />
            </div>
          )}

          {activeSection === "details" && selectedTeacher && (
            <TeacherDetails teacher={selectedTeacher} />
          )}

          {activeSection === "analytics" && <AllTeachersAnalytics />}

          {activeSection === "teachers" && (
            <div className="space-y-8">
              <TeacherSearch onTeacherSelect={handleTeacherSelect} />
              {selectedTeacher && <TeacherDetails teacher={selectedTeacher} />}
            </div>
          )}

          {activeSection === "payments" && (
            <div className="space-y-8">
              <PaymentHistory />
              {selectedTeacher && (
                <PaymentForm
                  teacher={selectedTeacher}
                  onPaymentSubmit={handlePaymentSubmit}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
