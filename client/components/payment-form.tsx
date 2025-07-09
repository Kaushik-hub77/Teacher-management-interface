import { useState } from "react";
import { motion } from "framer-motion";
import { DollarSign, CreditCard, Calendar, CheckCircle } from "lucide-react";
import { Teacher, PaymentRecord } from "@shared/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PaymentFormProps {
  teacher: Teacher;
  onPaymentSubmit: (payment: Omit<PaymentRecord, "id">) => void;
}

export function PaymentForm({ teacher, onPaymentSubmit }: PaymentFormProps) {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !description || !paymentType) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const payment: Omit<PaymentRecord, "id"> = {
      teacherId: teacher.id,
      amount: parseFloat(amount),
      date: new Date().toISOString(),
      status: "completed",
      description: `${paymentType}: ${description}`,
    };

    onPaymentSubmit(payment);
    setIsSubmitting(false);
    setIsSuccess(true);

    // Reset form after success
    setTimeout(() => {
      setIsSuccess(false);
      setAmount("");
      setDescription("");
      setPaymentType("");
    }, 3000);
  };

  const suggestedAmounts = [
    { label: "Monthly Salary", amount: Math.round(teacher.salary / 12) },
    { label: "Quarterly Bonus", amount: Math.round(teacher.salary * 0.1) },
    { label: "Annual Bonus", amount: Math.round(teacher.salary * 0.15) },
  ];

  if (isSuccess) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center py-12"
      >
        <Card className="p-8 max-w-md mx-auto bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-green-200 dark:border-green-700">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <CheckCircle className="w-8 h-8 text-white" />
          </motion.div>
          <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">
            Payment Successful!
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
            Payment has been credited to {teacher.name}'s account.
          </p>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="p-6">
        <div className="flex items-center space-x-2 mb-6">
          <DollarSign className="w-5 h-5 text-green-500" />
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
            Credit Salary - {teacher.name}
          </h3>
        </div>

        {/* Quick Amount Suggestions */}
        <div className="mb-6">
          <Label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3 block">
            Quick Select
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {suggestedAmounts.map((suggestion) => (
              <Button
                key={suggestion.label}
                variant="outline"
                onClick={() => {
                  setAmount(suggestion.amount.toString());
                  setDescription(suggestion.label);
                }}
                className="h-auto p-3 flex flex-col items-start hover:bg-blue-50 dark:hover:bg-blue-900/20"
              >
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  {suggestion.label}
                </span>
                <span className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                  ${suggestion.amount.toLocaleString()}
                </span>
              </Button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Payment Type */}
            <div className="space-y-2">
              <Label htmlFor="paymentType">Payment Type</Label>
              <Select value={paymentType} onValueChange={setPaymentType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select payment type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="salary">Monthly Salary</SelectItem>
                  <SelectItem value="bonus">Performance Bonus</SelectItem>
                  <SelectItem value="overtime">Overtime Payment</SelectItem>
                  <SelectItem value="reimbursement">
                    Expense Reimbursement
                  </SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Amount */}
            <div className="space-y-2">
              <Label htmlFor="amount">Amount ($)</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-10"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter payment description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              required
            />
          </div>

          {/* Payment Summary */}
          {amount && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
            >
              <div className="flex items-center space-x-2 mb-2">
                <CreditCard className="w-4 h-4 text-blue-500" />
                <span className="font-medium text-slate-800 dark:text-slate-200">
                  Payment Summary
                </span>
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">
                    Recipient:
                  </span>
                  <span className="text-slate-800 dark:text-slate-200">
                    {teacher.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">
                    Amount:
                  </span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    ${parseFloat(amount || "0").toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">
                    Date:
                  </span>
                  <span className="text-slate-800 dark:text-slate-200">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-12 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
            disabled={!amount || !description || !paymentType || isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Processing Payment...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <CreditCard className="w-4 h-4" />
                <span>Credit Payment</span>
              </div>
            )}
          </Button>
        </form>
      </Card>
    </motion.div>
  );
}
