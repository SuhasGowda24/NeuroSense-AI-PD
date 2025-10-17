import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Clock, Calendar } from "lucide-react";
import { motion } from "framer-motion";

export default function MedicationSchedule({ medications }) {
  const getAllTimes = () => {
    const timesMap = {};
    
    medications.forEach(med => {
      if (med.times && med.times.length > 0) {
        med.times.forEach(time => {
          if (!timesMap[time]) {
            timesMap[time] = [];
          }
          timesMap[time].push(med);
        });
      }
    });

    return Object.entries(timesMap)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([time, meds]) => ({ time, medications: meds }));
  };

  const schedule = getAllTimes();

  if (schedule.length === 0) {
    return null;
  }

  return (
    <Card className="border-none shadow-xl bg-white/90 backdrop-blur-lg">
      <CardHeader className="border-b border-blue-50">
        <CardTitle className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          Today's Schedule
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {schedule.map((slot, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex gap-4 p-4 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 hover:border-indigo-300 transition-all"
            >
              <div className="flex flex-col items-center justify-center px-4 py-2 rounded-lg bg-white shadow-sm">
                <Clock className="w-5 h-5 text-indigo-600 mb-1" />
                <span className="text-lg font-bold text-gray-900">{slot.time}</span>
              </div>
              <div className="flex-1 space-y-2">
                {slot.medications.map((med, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-white/80">
                    <div>
                      <p className="font-semibold text-gray-900">{med.name}</p>
                      <p className="text-sm text-gray-600">{med.dosage}</p>
                    </div>
                    {med.with_food && (
                      <Badge className="bg-green-100 text-green-700">
                        With food
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}