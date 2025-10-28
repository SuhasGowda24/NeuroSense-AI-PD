import React from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Calendar, Edit2, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";

const eventTypeIcons = {
  diagnosis: "🏥",
  symptom_change: "⚠️",
  medication_change: "💊",
  therapy_started: "🏃",
  hospitalization: "🏥",
  milestone: "🎯",
  other: "📝"
};

const eventTypeColors = {
  diagnosis: "from-red-100 to-orange-100 border-red-300",
  symptom_change: "from-yellow-100 to-amber-100 border-yellow-300",
  medication_change: "from-blue-100 to-indigo-100 border-blue-300",
  therapy_started: "from-green-100 to-emerald-100 border-green-300",
  hospitalization: "from-red-100 to-pink-100 border-red-300",
  milestone: "from-purple-100 to-pink-100 border-purple-300",
  other: "from-gray-100 to-slate-100 border-gray-300"
};

const eventTypes = [
  { value: "diagnosis", label: "🏥 Diagnosis" },
  { value: "symptom_change", label: "⚠️ Symptom Change" },
  { value: "medication_change", label: "💊 Medication Change" },
  { value: "therapy_started", label: "🏃 Therapy Started" },
  { value: "hospitalization", label: "🏥 Hospitalization" },
  { value: "milestone", label: "🎯 Milestone" },
  { value: "other", label: "📝 Other" },
];

const significanceColors = {
  major: "bg-red-100 text-red-700 border-red-300",
  moderate: "bg-yellow-100 text-yellow-700 border-yellow-300",
  minor: "bg-blue-100 text-blue-700 border-blue-300"
};

const significanceLevelsDesc = (level) => {
  const desc = {
    major: "Life-changing event",
    moderate: "Important but not critical",
    minor: "Small but notable event",
  };
  return desc[level] || "Moderate impact";
};

export default function JourneyTimeline({ events, onEdit, onDelete }) {
  return (
    <Card className="border-none shadow-xl bg-white/90 backdrop-blur-lg">
      <CardContent className="p-6">
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-300 via-pink-300 to-purple-300" />
          
          <div className="space-y-6">
            <AnimatePresence>
              {events.map((event, index) => (
                <motion.div
                  key={event._id || index}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-20"
                >
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    className="absolute left-4 top-6 w-8 h-8 rounded-full bg-white border-4 border-purple-500 shadow-lg flex items-center justify-center text-lg z-10"
                  >
                   {eventTypeIcons[event.eventType] || "📝"}
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02, x: 4 }}
                    className={`p-6 rounded-xl bg-gradient-to-r ${eventTypeColors[event.eventType] || "from-gray-100 to-slate-100 border-gray-200"} border-2 hover:shadow-xl transition-all group`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge className={significanceColors[event.significantLevel] || significanceColors["moderate"]}>
                            {event.significantLevel || "moderate"}
                          </Badge>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="w-4 h-4" />
                            {event.date ? format(new Date(event.date), "MMMM d, yyyy") : "Date not set"}
                          </div>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                        {event.description && (
                          <p className="text-gray-700 leading-relaxed">{event.description}</p>
                        )}
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onEdit(event)}
                          className="hover:bg-white/60 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onDelete(event._id)}
                          className="hover:bg-red-100 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <Badge variant="outline" className="bg-white/60 text-gray-700 capitalize">
                     {eventTypeIcons[event.eventType] || "📝"}{" "}
                     {eventTypes.find((t) => t.value === event.eventType)?.label || "Other"}
                    </Badge>
                      <span className="text-xs text-gray-500 italic">
                      {significanceLevelsDesc(event.significantLevel)}
                      </span>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}