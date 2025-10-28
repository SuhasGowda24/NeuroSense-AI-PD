import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { X, Save, Calendar } from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";

export default function JourneyForm({ event, onSubmit, onCancel }) {
const [formData, setFormData] = useState(event || {
  date: format(new Date(), "yyyy-MM-dd"),
  eventType: "",
  title: "",
  description: "",
  significantLevel: ""
});

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const eventTypes = [
    { value: "diagnosis", label: "🏥 Diagnosis", description: "Initial PD diagnosis or related diagnosis" },
    { value: "symptom_change", label: "⚠️ Symptom Change", description: "New symptoms or changes in existing ones" },
    { value: "medication_change", label: "💊 Medication Change", description: "Started, stopped, or adjusted medication" },
    { value: "therapy_started", label: "🏃 Therapy Started", description: "Physical therapy, speech therapy, etc." },
    { value: "hospitalization", label: "🏥 Hospitalization", description: "Hospital admission or ER visit" },
    { value: "milestone", label: "🎯 Milestone", description: "Personal achievements or important moments" },
    { value: "other", label: "📝 Other", description: "Other significant events" }
  ];

  const significanceLevels = [
    { value: "major", label: "Major", description: "Life-changing event", color: "from-red-100 to-orange-100" },
    { value: "moderate", label: "Moderate", description: "Important but not critical", color: "from-yellow-100 to-amber-100" },
    { value: "minor", label: "Minor", description: "Worth noting but small impact", color: "from-blue-100 to-cyan-100" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <Card className="border-none shadow-2xl bg-white/95 backdrop-blur-xl">
        <CardHeader className="border-b border-purple-100 bg-gradient-to-r from-purple-50 to-pink-50">
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              {event ? "Edit Journey Event" : "Add Journey Event"}
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={onCancel} className="hover:bg-red-50 hover:text-red-600 transition-colors">
              <X className="w-5 h-5" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="font-semibold">Date *</Label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  required
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label className="font-semibold">Event Type *</Label>
                <Select value={formData.eventType} onValueChange={(value) => setFormData({...formData, eventType: value})} required>
                  <SelectTrigger className="h-11">
                  <SelectValue> {formData.eventType ? eventTypes.find((t) => t.value === formData.eventType)?.label : "Select event type"} </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {eventTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex flex-col py-1">
                          <span className="font-medium">{type.label}</span>
                          <span className="text-xs text-gray-500">{type.description}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="font-semibold">Title *</Label>
              <Input
                placeholder="e.g., Started physical therapy, First appointment with neurologist"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label className="font-semibold">Description</Label>
              <Textarea
                placeholder="Describe what happened, how you felt, what changed, any important details..."
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={5}
                className="resize-none"
              />
            </div>

            <div className="space-y-3">
              <Label className="font-semibold text-base">Significance Level</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {significanceLevels.map((level) => (
                  <motion.div
                    key={level.value}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setFormData({...formData, significantLevel: level.value})}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      formData.significantLevel === level.value
                        ? `bg-gradient-to-r ${level.color} border-purple-500 shadow-lg`
                        : 'bg-white border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-gray-900">{level.label}</span>
                      {formData.significantLevel === level.value && (
                        <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-white" />
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-600">{level.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onCancel} 
                className="flex-1 h-12 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </Button>
              <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  type="submit" 
                  className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-base font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  <Save className="w-5 h-5 mr-2" />
                  {event ? "Update Event" : "Add Event"}
                </Button>
              </motion.div>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}