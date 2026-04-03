import React, { useState, useEffect } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Clock, CheckCircle, Pill, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import axiosClient from "../../lib/axiosClient";

export default function MedicationSchedule({ medications, adherence = {}, setAdherence }) {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
const [clickedButtons, setClickedButtons] = useState(new Set());

  // Load existing logs on component mount
  useEffect(() => {
    const loadLogs = async () => {
      try {
        const response = await axiosClient.get('/medications/logs');
        setLogs(response.data);
      } catch (error) {
        console.error('Error loading logs:', error);
      }
    };
    loadLogs();
  }, []);

  const handleTakeDose = async (medication, time) => {
    const medId = medication._id || medication.id;
    const buttonKey = `${medId}-${time}`;
    setClickedButtons((prev) => new Set(prev).add(buttonKey));

    // Update local state immediately for instant UI feedback
    const now = new Date();
    const logData = {
      medication_id: medId,
      medication_name: medication.name,
      scheduled_time: `${now.toISOString().split("T")[0]}T${time}:00`,
      taken_time: now.toISOString(),
      taken: true,
      side_effects_noted: [],
    };
    setLogs(prev => [...prev, logData]);
    if (typeof setAdherence === 'function') {
      setAdherence(prev => ({
        ...prev,
        [medId]: { ...prev[medId], [time]: 'taken' }
      }));
    }
    setIsLoading(true);
    // Save to backend in background
    try {
  await axiosClient.post('/medications/logs', logData);
} catch (error) {
  console.error('Error saving log:', error);

  // Revert state on error
  setLogs(prev => prev.filter(log => log !== logData));

  if (typeof setAdherence === 'function') {
    setAdherence(prev => ({
      ...prev,
      [medId]: { ...prev[medId], [time]: undefined }
    }));
  }

  setClickedButtons((prev) => {
    const newSet = new Set(prev);
    newSet.delete(buttonKey);
    return newSet;
  });

} finally {
  setIsLoading(false); 
}
  };

  const getAllTimes = () => {
    const timesMap = {};

    (medications || []).forEach(med => {
      const medId = med._id || med.id;
      if (med.times && med.times.length > 0) {
        med.times.forEach(time => {
          if (!timesMap[time]) timesMap[time] = [];
          timesMap[time].push(med);
        });
      }
    });

    return Object.entries(timesMap)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([time, meds]) => ({ time, medications: meds }));
  };

  const schedule = medications?.length ? getAllTimes().filter(slot => slot.medications.length > 0) : [];
  
  if (schedule.length === 0) return null;

  return (
    <div className="space-y-4">
      {schedule.map((slot, slotIndex) => (
        <motion.div
          key={slotIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ delay: slotIndex * 0.1 }}
          className="p-5 rounded-xl bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200 hover:border-blue-300 hover:shadow-lg transition-all group"
        >
          {/* Time Header */}
          <div className="flex items-center gap-3 mb-4 pb-3 border-b border-blue-200">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-lg">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{slot.time}</h3>
              <p className="text-sm text-gray-600">
                {slot.medications.length} medication{slot.medications.length > 1 ? 's' : ''}
              </p>
            </div>
          </div>

          {/* Medications List */}
          <div className="space-y-3">
            {slot.medications.map((med, medIndex) => {
              const medId = med._id || med.id;
              const log = logs.find((l) =>
                l.medication_id === medId && l.scheduled_time.includes(slot.time)
              );
              const isTaken = log?.taken || adherence[medId]?.[slot.time] === 'taken';
              const buttonKey = `${medId}-${slot.time}`;

              return (
                <div
                  key={medIndex}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    isTaken
                      ? "bg-green-50 border-green-200"
                      : "bg-white/70 border-gray-200"
                  } border transition-colors`}
                >
                  {/* Left side - Medication Info */}
                  <div className="flex items-start gap-3 flex-1">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center flex-shrink-0">
                      <Pill className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className={`font-semibold text-sm ${
                        isTaken ? "text-green-900" : "text-gray-900"
                      }`}>
                        {med.name}
                      </h4>
                      <p className={`text-xs ${
                        isTaken ? "text-green-700" : "text-gray-600"
                      }`}>
                        {med.dosage}
                      </p>
                      {med.with_food && (
                        <div className="flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3 h-3 text-orange-600" />
                          <span className="text-xs text-orange-700 font-medium">
                            Take with food
                          </span>
                        </div>
                      )}
                      {med.purpose && (
                        <p className="text-xs text-gray-600 mt-1">
                          {med.purpose}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Right side - Status/Action */}
                  <div className="flex-shrink-0 ml-3">
                    {isTaken ? (
                      <Badge className="bg-green-800 text-white">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Taken
                      </Badge>
                    ) : (
                   <Button
                      onClick={() => handleTakeDose(med, slot.time)}
                      disabled={isLoading || clickedButtons.has(buttonKey)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md text-white transition-all shadow-sm hover:shadow-md ${
                        isTaken
                          ? 'bg-gradient-to-r from-green-700 to-green-800 hover:from-green-700 hover:to-green-800'
                          : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
                      } ml-auto`}
                      >
                      {clickedButtons.has(buttonKey) ? 'Taken' : 'Mark as Taken'}
                    </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      ))}
    </div>
  );
}








