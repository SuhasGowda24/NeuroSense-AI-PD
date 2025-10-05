import React from "react";
import { Card, CardContent } from "../ui/card";
import { Activity, Calendar, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export default function QuickStats({ symptoms, events }) {
  const getAverageSymptomSeverity = () => {
    if (symptoms.length === 0) return 0;
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
      title: "Journey Events",
      value: events.length,
      subtitle: "Milestones tracked",
      icon: Calendar,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
    },
    {
      title: "Avg Symptom Level",
      value: getAverageSymptomSeverity(),
      subtitle: "Out of 10",
      icon: TrendingUp,
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50",
    }
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


