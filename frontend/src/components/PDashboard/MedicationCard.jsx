import React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Pill, Clock, Edit2, Trash2, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function MedicationCard({ medication, onEdit, onDelete, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -2 }}
      className="p-5 rounded-xl bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200 hover:border-blue-300 hover:shadow-lg transition-all group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-4 flex-1">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <Pill className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-1">{medication.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{medication.dosage} • {medication.frequency}</p>
            {medication.purpose && (
              <p className="text-sm text-gray-700 mb-2">
                <span className="font-medium">Purpose:</span> {medication.purpose}
              </p>
            )}
            <div className="flex flex-wrap gap-2">
              {medication.with_food && (
                <Badge className="bg-green-100 text-green-700 border-green-200">
                  Take with food
                </Badge>
              )}
              {medication.started_date && (
                <Badge variant="outline" className="bg-white/60">
                  Since {new Date(medication.started_date).toLocaleDateString()}
                </Badge>
              )}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(medication)}
            className="hover:bg-blue-100 hover:text-blue-700 transition-colors"
          >
            <Edit2 className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(medication.id)}
            className="hover:bg-red-100 hover:text-red-700 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {medication.times && medication.times.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-gray-700">Scheduled Times:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {medication.times.map((time, idx) => (
              <Badge key={idx} className="bg-blue-100 text-blue-700 font-mono">
                {time}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {medication.side_effects && medication.side_effects.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-4 h-4 text-orange-600" />
            <span className="text-sm font-semibold text-gray-700">Watch for:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {medication.side_effects.map((effect, idx) => (
              <Badge key={idx} variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                {effect}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {medication.notes && (
        <div className="p-3 rounded-lg bg-white/60 border border-blue-100">
          <p className="text-sm text-gray-700 leading-relaxed">{medication.notes}</p>
        </div>
      )}
    </motion.div>
  );
}