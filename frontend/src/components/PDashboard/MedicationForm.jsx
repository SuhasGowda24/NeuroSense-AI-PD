import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import { Badge } from "../ui/badge";
import { X, Save, Plus, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

export default function MedicationForm({ medication, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(medication || {
    name: "",
    dosage: "",
    frequency: "",
    times: [],
    with_food: false,
    purpose: "",
    side_effects: [],
    started_date: "",
    end_date: "",
    notes: ""
  });

  useEffect(() => {
  if (medication) {
    setFormData({
      name: medication.name || "",
      dosage: medication.dosage || "",
      frequency: medication.frequency || "",
      times: medication.times || [],
      with_food: medication.with_food || false,
      purpose: medication.purpose || "",
      side_effects: medication.side_effects || [],
      started_date: medication.started_date || "",
      end_date: medication.end_date || "",
      notes: medication.notes || "",
    });
  }
}, [medication]);

  const [newTime, setNewTime] = useState("");
  const [newSideEffect, setNewSideEffect] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const addTime = () => {
    if (newTime && !formData.times.includes(newTime)) {
      setFormData({...formData, times: [...formData.times, newTime].sort()});
      setNewTime("");
    }
  };

  const removeTime = (time) => {
    setFormData({...formData, times: formData.times.filter(t => t !== time)});
  };

  const addSideEffect = () => {
    if (newSideEffect && !formData.side_effects.includes(newSideEffect)) {
      setFormData({...formData, side_effects: [...formData.side_effects, newSideEffect]});
      setNewSideEffect("");
    }
  };

  const removeSideEffect = (effect) => {
    setFormData({...formData, side_effects: formData.side_effects.filter(e => e !== effect)});
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <Card className="border-none shadow-2xl bg-white/95 backdrop-blur-xl">
        <CardHeader className="border-b border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
                <Save className="w-5 h-5 text-white" />
              </div>
              {medication ? "Edit Medication" : "Add New Medication"}
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
                <Label className="font-semibold">Medication Name *</Label>
                <Input
                  placeholder="e.g., Levodopa, Carbidopa"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label className="font-semibold">Dosage *</Label>
                <Input
                  placeholder="e.g., 100mg, 250mg"
                  value={formData.dosage}
                  onChange={(e) => setFormData({...formData, dosage: e.target.value})}
                  required
                  className="h-11"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="font-semibold">Frequency *</Label>
              <Input
                placeholder="e.g., 3 times daily, Every 4 hours"
                value={formData.frequency}
                onChange={(e) => setFormData({...formData, frequency: e.target.value})}
                required
                className="h-11"
              />
            </div>

            <div className="space-y-3 p-5 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
              <Label className="font-semibold text-base">Schedule Times</Label>
              <div className="flex gap-2">
                <Input
                  type="time"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="h-11"
                />
                <Button
                  type="button"
                  onClick={addTime}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add
                </Button>
              </div>
              {formData?.times?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.times.map((time, idx) => (
                    <Badge
                      key={idx}
                      className="bg-blue-100 text-blue-700 px-3 py-1 cursor-pointer hover:bg-blue-200 transition-colors"
                      onClick={() => removeTime(time)}
                    >
                      {time}
                      <Trash2 className="w-3 h-3 ml-2" />
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label className="font-semibold">Purpose / What It Treats</Label>
              <Input
                placeholder="e.g., Controls tremor, Improves mobility"
                value={formData.purpose}
                onChange={(e) => setFormData({...formData, purpose: e.target.value})}
                className="h-11"
              />
            </div>

            <div className="space-y-3 p-5 rounded-xl bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200">
              <Label className="font-semibold text-base">Side Effects to Watch For</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="e.g., Nausea, Dizziness"
                  value={newSideEffect}
                  onChange={(e) => setNewSideEffect(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSideEffect())}
                  className="h-11"
                />
                <Button
                  type="button"
                  onClick={addSideEffect}
                  className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add
                </Button>
              </div>
              {formData?.side_effects?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.side_effects.map((effect, idx) => (
                    <Badge
                      key={idx}
                      className="bg-orange-100 text-orange-700 px-3 py-1 cursor-pointer hover:bg-orange-200 transition-colors"
                      onClick={() => removeSideEffect(effect)}
                    >
                      {effect}
                      <Trash2 className="w-3 h-3 ml-2" />
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="font-semibold">Started Date</Label>
                <Input
                  type="date"
                  value={formData.started_date}
                  onChange={(e) => setFormData({...formData, started_date: e.target.value})}
                  className="h-11"
                />
              </div>
               <div className="space-y-2">
                <Label className="font-semibold">End Date</Label>
                <Input
                  type="date"
                  value={formData.end_date}
                  onChange={(e) => setFormData({...formData, end_date: e.target.value})}
                  className="h-11"
                />
              </div>
              <motion.div 
                whileHover={{ scale: 1.01 }}
                className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200"
              >
                <div>
                  <Label className="font-semibold text-gray-900">Take with Food</Label>
                  <p className="text-xs text-gray-600 mt-1">Should be taken with meals</p>
                </div>
                <Switch
                  checked={formData.with_food}
                  onCheckedChange={(checked) => setFormData({...formData, with_food: checked})}
                  className="data-[state=checked]:bg-green-500"
                />
              </motion.div>
            </div>

            <div className="space-y-2">
              <Label className="font-semibold">Additional Notes</Label>
              <Textarea
                placeholder="Any special instructions, interactions, or observations..."
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                rows={4}
                className="resize-none"
              />
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
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-base font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  <Save className="w-5 h-5 mr-2" />
                  {medication ? "Update Medication" : "Add Medication"}
                </Button>
              </motion.div>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}