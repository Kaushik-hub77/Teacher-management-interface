import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  GraduationCap,
  Clock,
  DollarSign,
} from "lucide-react";
import { Teacher } from "@shared/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface TeacherDetailsProps {
  teacher: Teacher;
}

export function TeacherDetails({ teacher }: TeacherDetailsProps) {
  const availableDays = Object.entries(teacher.availability)
    .filter(([_, available]) => available)
    .map(([day, _]) => day.charAt(0).toUpperCase() + day.slice(1));

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card className="p-6">
        <div className="flex items-start space-x-6">
          <Avatar className="w-20 h-20">
            <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-2xl font-bold">
              {teacher.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
              {teacher.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400">
                <Mail className="w-4 h-4" />
                <span>{teacher.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400">
                <Phone className="w-4 h-4" />
                <span>{teacher.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400">
                <Calendar className="w-4 h-4" />
                <span>
                  Joined: {new Date(teacher.joiningDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400">
                <GraduationCap className="w-4 h-4" />
                <span>{teacher.assignedStudents.length} Students</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <MapPin className="w-5 h-5 text-blue-500" />
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                Address
              </h3>
            </div>
            <div className="space-y-2 text-slate-600 dark:text-slate-400">
              <p>{teacher.address.street}</p>
              <p>
                {teacher.address.city}, {teacher.address.state}{" "}
                {teacher.address.zipCode}
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Availability */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Clock className="w-5 h-5 text-green-500" />
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                Availability
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {Object.entries(teacher.availability).map(([day, available]) => (
                <Badge
                  key={day}
                  variant={available ? "default" : "secondary"}
                  className={available ? "bg-green-500 hover:bg-green-600" : ""}
                >
                  {day.charAt(0).toUpperCase() + day.slice(1)}
                </Badge>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Salary Information */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <DollarSign className="w-5 h-5 text-purple-500" />
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                Salary Information
              </h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-slate-600 dark:text-slate-400">
                  Annual Salary:
                </span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  ${teacher.salary.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600 dark:text-slate-400">
                  Last Payment:
                </span>
                <span className="text-slate-800 dark:text-slate-200">
                  {new Date(teacher.lastPaymentDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Assigned Students */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <GraduationCap className="w-5 h-5 text-blue-500" />
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                Assigned Students ({teacher.assignedStudents.length})
              </h3>
            </div>
            <div className="space-y-3 max-h-40 overflow-y-auto">
              {teacher.assignedStudents.map((student) => (
                <div
                  key={student.id}
                  className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-slate-800 dark:text-slate-200">
                      {student.name}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {student.grade} - {student.subject}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {new Date(student.enrolledDate).toLocaleDateString()}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
