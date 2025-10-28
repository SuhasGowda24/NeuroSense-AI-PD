import React from "react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Activity, Calendar, Pill } from "lucide-react";
import { motion } from "framer-motion";

export default function QuickStats({ symptoms, events, medications = [] }) {
  const getAverageSymptomSeverity = () => {
    if (!Array.isArray(symptoms) || symptoms.length === 0) return 0;
    const total = symptoms.reduce((sum, s) => {
      const avg =
        ((s.tremor_severity || 0) +
          (s.rigidity_severity || 0) +
          (s.mobility_difficulty || 0)) /
        3;
      return sum + avg;
    }, 0);
    return (total / symptoms.length).toFixed(1);
  };

  const uniqueDaysCount = Array.isArray(symptoms)
    ? new Set(symptoms.map((s) => s.date)).size
    : 0;

  const todayStr = new Date().toISOString().split("T")[0];
  const hasLoggedToday = Array.isArray(symptoms) && symptoms.some((s) => s.date === todayStr);

  const stats = [
    {
      title: "Symptom Logs",
      value: symptoms.length,
      subtitle: "Last 7 days",
      icon: Activity,
      color: "from-teal-500 to-cyan-500",
      bgColor: "bg-teal-50",
    },
      {
      title: "Medication",
  value: medications.length,
      subtitle: "Medicine tracked",
      icon: Pill,
      color: "from-blue-500 to-blue-500",
      bgColor: "bg-blue-50",
     },
    {
      title: "Journey Events",
      value: events.length,
      subtitle: "Milestones tracked",
      icon: Calendar,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
    },

    // {
    //   title: "Avg Symptom Level",
    //   value: getAverageSymptomSeverity(),
    //   subtitle: "Out of 10",
    //   icon: TrendingUp,
    //   color: "from-orange-500 to-red-500",
    //   bgColor: "bg-orange-50",
    // }
  ];

  return (
    <>
      {/* Mobile: Stack all cards */}
      {/* Tablet (md): 2 cards top, 1 card centered bottom */}
      {/* Desktop (lg): All 3 cards in a row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className={`${
              index === 2 ? 'md:col-span-2 lg:col-span-1 md:flex md:justify-center lg:block' : ''
            }`}
          >
            <div className={`${index === 2 ? 'md:w-1/2 lg:w-full' : 'w-full'}`}>
              <Card className="border-none shadow-lg bg-white/90 backdrop-blur-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer h-full">
                <CardContent className="p-6 relative">
                  <motion.div
                    className={`absolute inset-0 ${stat.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  />
                  <div className="relative z-10">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <stat.icon className="w-7 h-7 text-white" />
                    </div>
                    <motion.div
                      className="text-4xl font-bold text-gray-900 mb-1"
                      initial={{ scale: 1 }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-sm font-semibold text-gray-700 mb-1">
                      {stat.title}
                    </div>
                    <div className="text-xs text-gray-500">{stat.subtitle}</div>
                    {stat.title === 'Medication' && (
                      <div className="mt-2">
                        <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                          {medications.length} {medications.length === 1 ? 'medication' : 'medications'}
                        </Badge>
                      </div>
                    )}

                    {stat.title === 'Symptom Logs' && (
                      <div className="mt-2 flex items-center gap-2">
                        <Badge variant="secondary" className="bg-teal-100 text-teal-700">
                          {uniqueDaysCount} {uniqueDaysCount === 1 ? 'day logged' : 'days logged'}
                        </Badge>
                        <Badge className={`${hasLoggedToday ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                          {hasLoggedToday ? 'Logged today' : 'Not logged today'}
                        </Badge>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}


