import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Badge } from "../ui/badge";
import { Sparkles, User, MapPin, Calendar, Heart, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function SetupProfile({ user, onComplete }) {
  const [formData, setFormData] = useState({
    stage: "",
    diagnosis_date: "",
    age: "",
    location: "",
    primary_symptoms: [],
    language_preference: "english"
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const symptoms = [
    { value: "tremor", label: "Tremor" },
    { value: "rigidity", label: "Stiffness/Rigidity" },
    { value: "bradykinesia", label: "Slowness of Movement" },
    { value: "postural_instability", label: "Balance Issues" },
    { value: "sleep_issues", label: "Sleep Problems" },
    { value: "mood_changes", label: "Mood Changes" },
    { value: "cognitive_changes", label: "Memory/Thinking Changes" },
    { value: "speech_issues", label: "Speech Difficulties" },
    { value: "freezing", label: "Freezing Episodes" }
  ];

  const handleSymptomToggle = (symptom) => {
  setFormData(prev => {
    const updatedSymptoms = prev.primary_symptoms.includes(symptom)
      ? prev.primary_symptoms.filter((s) => s !== symptom)
      : [...prev.primary_symptoms, symptom];

    if (error) setError(null);
    return {
      ...prev,
      primary_symptoms: updatedSymptoms
    };
  });
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

  // VALIDATION RULES
  if (!formData.stage) {
    return setError("Please select your stage.");
  }

  if (formData.stage !== "caregiver") {
    if (!formData.diagnosis_date) {
      return setError("Please enter your diagnosis date.");
    }
    if (!formData.age) {
      return setError("Please enter your age.");
    }
    if (formData.primary_symptoms.length === 0) {
      return setError("Please select at least one primary symptom.");
    }
  }

  if (!formData.location.trim()) {
    return setError("Please enter your location.");
  }
  // Continue submitting if no errors
  setSaving(true);

  const token = localStorage.getItem("token"); // get JWT from localStorage
    
  try {
      const response = await fetch(`/api/profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
       body: JSON.stringify(formData),
    });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || "Failed to save profile");
  }

  // navigate to Patientdashboard
  const data = await response.json();
  onComplete(data.profile); // send profile back to dashboard
  } catch (err) {
    console.error(err);
    setError(err.message);
  } finally {
    setSaving(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
      <Card className="max-w-3xl w-full border-none shadow-2xl">
        <CardHeader className="text-center pb-6 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-t-xl">
          <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8" />
          </div>
          <CardTitle className="text-3xl font-bold mb-2">Welcome to PD Care</CardTitle>
          <p className="text-teal-100">Let's personalize your experience</p>
        </CardHeader>
        <CardContent className="p-8">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3"
            >
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </motion.div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label className="text-base font-semibold flex items-center gap-2">
                <Heart className="w-4 h-4 text-teal-600" />
                I am a... *
              </Label>
              <Select value={formData.stage} onValueChange={(value) =>{ setFormData({...formData, stage: value}); if (error) setError(null);}}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select your situation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newly_diagnosed">Newly Diagnosed Patient</SelectItem>
                  <SelectItem value="mid_stage">Mid-Stage Patient</SelectItem>
                  <SelectItem value="advanced">Advanced Stage Patient</SelectItem>
                  <SelectItem value="caregiver">Caregiver/Family Member</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Diagnosis Date, Age & Symptoms */}
            {formData.stage && formData.stage !== "caregiver" && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-teal-600" />
                      Diagnosis Date
                    </Label>
                    <Input
                      type="date"
                      value={formData.diagnosis_date}
                      onChange={(e) =>{
                        setFormData({...formData, diagnosis_date: e.target.value});
                        if (error) setError(null);
                      }}
                        className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <User className="w-4 h-4 text-teal-600" />
                      Age
                    </Label>
                    <Input
                      type="number"
                      placeholder="Your age"
                      value={formData.age}
                      onChange={(e) =>{
                        setFormData({...formData, age: e.target.value});
                        if (error) setError(null);
                      }}
                      className="h-12"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-base font-semibold">Primary Symptoms</Label>
                  <p className="text-sm text-gray-500 mb-3">Select all that apply</p>
                  <div className="flex flex-wrap gap-2">
                    {symptoms.map((symptom) => (
                      <Badge
                        key={symptom.value}
                        variant={formData.primary_symptoms.includes(symptom.value) ? "default" : "outline"}
                        className={`cursor-pointer px-4 py-2 transition-all ${
                          formData.primary_symptoms.includes(symptom.value)
                            ? "bg-teal-600 hover:bg-teal-700 text-white"
                            : "hover:bg-teal-50"
                        }`}
                        onClick={() => handleSymptomToggle(symptom.value)}
                      >
                        {symptom.label}
                      </Badge>
                    ))}
                  </div>
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-teal-600" />
                Location
              </Label>
              <Input
                placeholder="e.g., Bangalore, Karnataka"
                value={formData.location}
                onChange={(e) =>{ 
                  setFormData({...formData, location: e.target.value});
                  if (error) setError(null);
                }}
                  className="h-12"
              />
              <p className="text-xs text-gray-500">This helps us show you relevant local resources</p>
            </div>

            <Button
              type="submit"
              disabled={!formData.stage || saving}
              className="w-full h-12 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-lg font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? "Setting up..." : "Complete Setup"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}