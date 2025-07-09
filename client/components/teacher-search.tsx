import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, UserCheck, Users, Sparkles } from "lucide-react";
import { Teacher } from "@shared/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface TeacherSearchProps {
  onTeacherSelect: (teacher: Teacher) => void;
}

// Mock data - in real app this would come from API
const mockTeachers: Teacher[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@edu.com",
    phone: "+1 (555) 123-4567",
    address: {
      street: "123 Oak Street",
      city: "Springfield",
      state: "CA",
      zipCode: "90210",
    },
    availability: {
      monday: true,
      tuesday: true,
      wednesday: false,
      thursday: true,
      friday: true,
      saturday: false,
      sunday: false,
    },
    salary: 65000,
    lastPaymentDate: "2024-01-15",
    assignedStudents: [
      {
        id: "1",
        name: "Emma Wilson",
        grade: "10th",
        subject: "Mathematics",
        enrolledDate: "2024-01-10",
      },
      {
        id: "2",
        name: "James Smith",
        grade: "11th",
        subject: "Mathematics",
        enrolledDate: "2024-01-12",
      },
    ],
    joiningDate: "2023-08-15",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.chen@edu.com",
    phone: "+1 (555) 987-6543",
    address: {
      street: "456 Pine Avenue",
      city: "Oakland",
      state: "CA",
      zipCode: "94612",
    },
    availability: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: false,
      friday: true,
      saturday: true,
      sunday: false,
    },
    salary: 72000,
    lastPaymentDate: "2024-01-15",
    assignedStudents: [
      {
        id: "3",
        name: "Sophia Davis",
        grade: "9th",
        subject: "Physics",
        enrolledDate: "2024-01-08",
      },
    ],
    joiningDate: "2023-09-01",
  },
];

export function TeacherSearch({ onTeacherSelect }: TeacherSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [typingIndex, setTypingIndex] = useState(0);

  const placeholderTexts = [
    "Search by teacher name...",
    "Find by email address...",
    "Discover your educators...",
    "Look up teacher profiles...",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTypingIndex((prev) => (prev + 1) % placeholderTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (searchTerm) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        setIsSearching(false);
        setShowSuggestions(true);
      }, 800);
      return () => clearTimeout(timer);
    } else {
      setShowSuggestions(false);
    }
  }, [searchTerm]);

  const filteredTeachers = mockTeachers.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleTeacherSelect = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    onTeacherSelect(teacher);
  };

  return (
    <div className="space-y-6">
      {/* Search Form */}
      <Card className="p-6 bg-black border-gray-800">
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center space-x-3"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg"
            >
              <Search className="w-5 h-5 text-white" />
            </motion.div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Discover Your Teachers
            </h3>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-5 h-5 text-yellow-400" />
            </motion.div>
          </motion.div>

          <div className="relative group">
            <motion.div
              animate={isSearching ? { rotate: 360 } : { rotate: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10"
            >
              <Search
                className={`w-5 h-5 transition-colors duration-300 ${
                  isSearching ? "text-blue-500" : "text-slate-400"
                }`}
              />
            </motion.div>
            <Input
              placeholder={placeholderTexts[typingIndex]}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-14 text-lg border-2 transition-all duration-300 hover:border-blue-300 focus:border-blue-500 group-hover:shadow-lg"
            />
            {isSearching && (
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.8 }}
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              />
            )}
          </div>

          {/* Search Results */}
          <AnimatePresence>
            {showSuggestions && searchTerm && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="space-y-3 max-h-80 overflow-y-auto bg-black border border-gray-800 rounded-xl shadow-xl p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      {filteredTeachers.length} teachers found
                    </span>
                  </div>
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-xs text-green-500"
                  >
                    ● Live
                  </motion.div>
                </div>

                {filteredTeachers.map((teacher, index) => (
                  <motion.div
                    key={teacher.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                      borderColor: "rgb(59 130 246)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="p-4 bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl cursor-pointer border border-gray-700 hover:border-blue-500 transition-all duration-300 group"
                    onClick={() => handleTeacherSelect(teacher)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                          className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold"
                        >
                          {teacher.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </motion.div>
                        <div>
                          <p className="font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {teacher.name}
                          </p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            {teacher.email}
                          </p>
                          <p className="text-xs text-green-600 dark:text-green-400">
                            {teacher.assignedStudents.length} students •
                            Available{" "}
                            {
                              Object.values(teacher.availability).filter(
                                Boolean,
                              ).length
                            }{" "}
                            days/week
                          </p>
                        </div>
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        className="text-blue-500 group-hover:text-blue-600"
                      >
                        <UserCheck className="w-5 h-5" />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}

                {filteredTeachers.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-8"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <Search className="w-8 h-8 text-slate-400" />
                    </motion.div>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">
                      No teachers found matching "{searchTerm}"
                    </p>
                    <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">
                      Try adjusting your search terms
                    </p>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Card>

      {/* Selected Teacher Confirmation */}
      <AnimatePresence>
        {selectedTeacher && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: "spring", duration: 0.6 }}
          >
            <Card className="p-6 bg-gradient-to-r from-green-50 via-blue-50 to-purple-50 dark:from-green-900/20 dark:via-blue-900/20 dark:to-purple-900/20 border-2 border-green-200 dark:border-green-700 shadow-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg"
                  >
                    <UserCheck className="w-6 h-6 text-white" />
                  </motion.div>
                  <div>
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="font-bold text-lg text-slate-800 dark:text-slate-200"
                    >
                      ✨ {selectedTeacher.name} Selected!
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-sm text-slate-600 dark:text-slate-400"
                    >
                      Now explore their profile, analytics, or process payments
                    </motion.p>
                  </div>
                </div>
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-2xl"
                >
                  🎉
                </motion.div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
