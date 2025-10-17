import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Bell, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function MedicationReminders({ medications }) {
  const getUpcomingReminders = () => {
    const now = new Date();
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    const reminders = [];
    medications.forEach(med => {
      if (med.times && med.times.length > 0) {
        med.times.forEach(time => {
          if (time > currentTime) {
            reminders.push({ medication: med, time });
          }
        });
      }
    });

    return reminders.sort((a, b) => a.time.localeCompare(b.time)).slice(0, 3);
  };

  const upcomingReminders = getUpcomingReminders();

  return (
    <Card className="border-none shadow-xl bg-gradient-to-br from-amber-500 to-orange-500 text-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Next Reminders
        </CardTitle>
      </CardHeader>
      <CardContent>
        {upcomingReminders.length === 0 ? (
          <p className="text-amber-100 text-sm">No more reminders for today</p>
        ) : (
          <div className="space-y-3">
            {upcomingReminders.map((reminder, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 p-3 rounded-lg bg-white/20 backdrop-blur-sm"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-white/30">
                  <Clock className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">{reminder.medication.name}</p>
                  <p className="text-xs text-amber-100">{reminder.medication.dosage}</p>
                </div>
                <Badge className="bg-white/30 text-white border-none font-mono">
                  {reminder.time}
                </Badge>
              </motion.div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}