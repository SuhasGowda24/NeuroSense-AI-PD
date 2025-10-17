import React from "react";
import { Badge } from "../ui/badge";
import { BookOpen, Clock, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function ModuleCard({ module, index, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="p-6 rounded-xl bg-gradient-to-br from-white to-teal-50 border-2 border-teal-100 hover:border-teal-300 hover:shadow-xl transition-all cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
          {module.completed ? (
            <CheckCircle className="w-7 h-7 text-white" />
          ) : (
            <BookOpen className="w-7 h-7 text-white" />
          )}
        </div>
        {module.completed ? (
          <Badge className="bg-green-100 text-green-700 border-green-200">
            Completed
          </Badge>
        ) : (
          <Badge variant="outline" className="bg-white/60">
            New
          </Badge>
        )}
      </div>

      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-teal-700 transition-colors">
        {module.title}
      </h3>
      <p className="text-sm text-gray-600 mb-4 leading-relaxed">
        {module.description}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Clock className="w-4 h-4" />
          <span>{module.duration}</span>
        </div>
        <div className="text-sm text-teal-600 font-semibold group-hover:translate-x-1 transition-transform">
          Start →
        </div>
      </div>

      {module.sections && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 mb-2">{module.sections.length} sections</p>
          <div className="flex -space-x-1">
            {module.sections.slice(0, 3).map((_, idx) => (
              <div
                key={idx}
                className="w-6 h-6 rounded-full bg-teal-100 border-2 border-white flex items-center justify-center"
              >
                <span className="text-[10px] font-bold text-teal-700">{idx + 1}</span>
              </div>
            ))}
            {module.sections.length > 3 && (
              <div className="w-6 h-6 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center">
                <span className="text-[10px] font-bold text-gray-600">+{module.sections.length - 3}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}