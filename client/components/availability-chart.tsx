import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { BarChart3 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { AvailabilityData } from "@shared/types";

interface AvailabilityChartProps {
  data?: AvailabilityData[];
}

// Mock data for demonstration
const defaultData: AvailabilityData[] = [
  { day: "Mon", available: 45, total: 52 },
  { day: "Tue", available: 38, total: 52 },
  { day: "Wed", available: 42, total: 52 },
  { day: "Thu", available: 35, total: 52 },
  { day: "Fri", available: 48, total: 52 },
  { day: "Sat", available: 25, total: 52 },
  { day: "Sun", available: 12, total: 52 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700">
        <p className="font-medium text-slate-800 dark:text-slate-200">{`${label}`}</p>
        <p className="text-blue-600 dark:text-blue-400">
          {`Available: ${data.available}`}
        </p>
        <p className="text-slate-600 dark:text-slate-400">
          {`Total: ${data.total}`}
        </p>
        <p className="text-sm text-slate-500">
          {`${Math.round((data.available / data.total) * 100)}% availability`}
        </p>
      </div>
    );
  }
  return null;
};

export function AvailabilityChart({
  data = defaultData,
}: AvailabilityChartProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card className="p-6">
        <div className="flex items-center space-x-2 mb-6">
          <BarChart3 className="w-5 h-5 text-blue-500" />
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
            Teacher Availability by Day
          </h3>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
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
                fill="url(#colorGradient)"
                radius={[4, 4, 0, 0]}
                className="hover:opacity-80 transition-opacity"
              />
              <Bar
                dataKey="total"
                fill="#e2e8f0"
                radius={[4, 4, 0, 0]}
                opacity={0.3}
              />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.9} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.9} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Summary Stats */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {data.reduce((sum, day) => sum + day.available, 0)}
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Total Available
            </p>
          </div>
          <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {Math.round(
                (data.reduce((sum, day) => sum + day.available, 0) /
                  data.reduce((sum, day) => sum + day.total, 0)) *
                  100,
              )}
              %
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Avg Availability
            </p>
          </div>
          <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              {Math.max(...data.map((day) => day.available))}
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Peak Day
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
