import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  DollarSign,
  BarChart3,
  Search,
  Settings,
  Home,
  GraduationCap,
  Bell,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: ReactNode;
}

const sidebarItems = [
  { icon: Home, label: "Dashboard", href: "/" },
  { icon: Search, label: "Find Teacher", href: "/search" },
  { icon: Users, label: "All Teachers", href: "/teachers" },
  { icon: BarChart3, label: "Analytics", href: "/analytics" },
  { icon: DollarSign, label: "Payments", href: "/payments" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [notificationCount] = useState(3);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black">
      <div className="flex">
        {/* Desktop Sidebar - Hidden on mobile */}
        <motion.aside
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          className="hidden lg:block fixed left-0 top-0 h-full w-64 bg-black shadow-2xl border-r border-gray-800 z-50"
        >
          {/* Logo */}
          <div className="h-16 flex items-center justify-center px-6 border-b border-gray-800">
            <div className="flex items-center space-x-3">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg"
              >
                <GraduationCap className="w-6 h-6 text-white" />
              </motion.div>
              <motion.h1
                whileHover={{ scale: 1.05 }}
                className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              >
                EduAdmin
              </motion.h1>
            </div>
          </div>

          {/* Navigation */}
          <nav className="mt-6 px-4">
            <div className="space-y-3">
              {sidebarItems.map((item, index) => {
                const isActive = location.pathname === item.href;
                const isHovered = hoveredItem === item.href;
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={item.href}
                      onMouseEnter={() => setHoveredItem(item.href)}
                      onMouseLeave={() => setHoveredItem(null)}
                      className={cn(
                        "flex items-center justify-between px-4 py-4 rounded-xl transition-all duration-300 group relative overflow-hidden",
                        isActive
                          ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-xl"
                          : "text-gray-300 hover:bg-gradient-to-r hover:from-gray-800 hover:to-gray-700 hover:text-white",
                      )}
                    >
                      <div className="flex items-center space-x-3 z-10">
                        <motion.div
                          animate={
                            isHovered || isActive
                              ? { scale: 1.2, rotate: 360 }
                              : { scale: 1, rotate: 0 }
                          }
                          transition={{ duration: 0.3 }}
                        >
                          <item.icon
                            className={cn(
                              "w-5 h-5 transition-colors duration-300",
                              isActive
                                ? "text-white"
                                : "text-gray-400 group-hover:text-blue-400",
                            )}
                          />
                        </motion.div>
                        <span className="font-medium group-hover:font-semibold transition-all duration-300">
                          {item.label}
                        </span>
                      </div>

                      {/* Notification badges for specific items */}
                      <AnimatePresence>
                        {item.href === "/payments" && notificationCount > 0 && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-bold"
                          >
                            {notificationCount}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Hover effect background */}
                      {isHovered && !isActive && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 0.1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl"
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </nav>
        </motion.aside>

        {/* Main Content */}
        <div className="flex-1 lg:ml-64">
          {/* Header */}
          <header className="h-16 bg-black/95 backdrop-blur-lg border-b border-gray-800 flex items-center justify-between px-4 lg:px-6">
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-white hover:bg-gray-800"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>

            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent text-center flex-1 tracking-tight leading-tight"
            >
              <span className="hidden sm:inline">
                Teacher Management Dashboard ✨
              </span>
              <span className="sm:hidden">EduAdmin ✨</span>
            </motion.h2>
            <div className="flex items-center space-x-2 lg:space-x-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative p-2 lg:p-3 rounded-xl bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 transition-all duration-300 shadow-lg"
              >
                <Bell className="w-5 h-5 text-blue-400" />
                {notificationCount > 0 && (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-bold"
                  >
                    {notificationCount}
                  </motion.div>
                )}
              </motion.button>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg cursor-pointer flex items-center justify-center text-white font-bold text-sm lg:text-base"
              >
                SA
              </motion.div>
            </div>
          </header>

          {/* Mobile Navigation Overlay */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="lg:hidden fixed inset-0 bg-black/50 z-40"
                  onClick={() => setIsMobileMenuOpen(false)}
                />
                <motion.div
                  initial={{ x: -300 }}
                  animate={{ x: 0 }}
                  exit={{ x: -300 }}
                  className="lg:hidden fixed left-0 top-0 h-full w-64 bg-black shadow-2xl border-r border-gray-800 z-50"
                >
                  {/* Mobile Logo */}
                  <div className="h-16 flex items-center justify-center px-6 border-b border-gray-800">
                    <div className="flex items-center space-x-3">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg"
                      >
                        <GraduationCap className="w-6 h-6 text-white" />
                      </motion.div>
                      <motion.h1
                        whileHover={{ scale: 1.05 }}
                        className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                      >
                        EduAdmin
                      </motion.h1>
                    </div>
                  </div>

                  {/* Mobile Navigation */}
                  <nav className="mt-6 px-4">
                    <div className="space-y-3">
                      {sidebarItems.map((item, index) => {
                        const isActive = location.pathname === item.href;
                        return (
                          <motion.div
                            key={item.href}
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <Link
                              to={item.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className={cn(
                                "flex items-center justify-between px-4 py-4 rounded-xl transition-all duration-300 group relative overflow-hidden",
                                isActive
                                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-xl"
                                  : "text-gray-300 hover:bg-gradient-to-r hover:from-gray-800 hover:to-gray-700 hover:text-white",
                              )}
                            >
                              <div className="flex items-center space-x-3 z-10">
                                <item.icon
                                  className={cn(
                                    "w-5 h-5 transition-colors duration-300",
                                    isActive
                                      ? "text-white"
                                      : "text-gray-400 group-hover:text-blue-400",
                                  )}
                                />
                                <span className="font-medium group-hover:font-semibold transition-all duration-300">
                                  {item.label}
                                </span>
                              </div>

                              {/* Notification badges for specific items */}
                              <AnimatePresence>
                                {item.href === "/payments" &&
                                  notificationCount > 0 && (
                                    <motion.div
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      exit={{ scale: 0 }}
                                      className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-bold"
                                    >
                                      {notificationCount}
                                    </motion.div>
                                  )}
                              </AnimatePresence>
                            </Link>
                          </motion.div>
                        );
                      })}
                    </div>
                  </nav>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Page Content */}
          <main className="p-4 lg:p-6 pb-20 lg:pb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {children}
            </motion.div>
          </main>
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-lg border-t border-gray-800 z-40">
          <div className="flex items-center justify-around py-2">
            {sidebarItems.slice(0, 5).map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200",
                    isActive
                      ? "text-blue-400"
                      : "text-gray-400 hover:text-white",
                  )}
                >
                  <div className="relative">
                    <item.icon className="w-5 h-5" />
                    {item.href === "/payments" && notificationCount > 0 && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs" />
                    )}
                  </div>
                  <span className="text-xs mt-1 font-medium">
                    {item.label === "Find Teacher"
                      ? "Search"
                      : item.label === "All Teachers"
                        ? "Teachers"
                        : item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
