import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Plus, Pill, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import MedicationForm from "../../../components/PDashboard/MedicationForm";
import MedicationCard from "../../../components/PDashboard/MedicationCard";
import MedicationSchedule from "../../../components/PDashboard/MedicationSchedule";
import MedicationReminders from "../../../components/PDashboard/MedicationReminders";

export default function Medication() {
  const [medications, setMedications] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingMed, setEditingMed] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token"); // JWT stored at login

  useEffect(() => {
    loadMedications();
  }, []);

  const loadMedications = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/medications", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch medications");
      const data = await res.json();
      setMedications(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (medData) => {
    try {
      if (editingMed) {
         // Update medication
        const res = await fetch(`/api/medications/${editingMed._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(medData),
        });
        if (!res.ok) throw new Error("Failed to update medication");
      } else {
        // Create new medication
        const res = await fetch("/api/medications", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(medData),
        });
        if (!res.ok) throw new Error("Failed to add medication");
      }
      setShowForm(false);
      setEditingMed(null);
      loadMedications();
    } catch (err) {
      console.error("Error saving medication:", err);
      alert("Failed to save medication. Please try again.");
    }
  };

  const handleEdit = (med) => {
    setEditingMed(med);
    setShowForm(true);
  };

  const handleDelete = async (medId) => {
     if (!window.confirm("Are you sure you want to delete this medication?")) return;
    try {
      const res = await fetch(`/api/medications/${medId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete medication");
      loadMedications();
    } catch (err) {
      console.error("Error deleting medication:", err);
      alert("Failed to delete medication. Please try again.");
    }
  };

  if (error) {
    return (
      <div className="p-4 lg:p-8 max-w-7xl mx-auto">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Unable to Load Medications</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button onClick={loadMedications}>Try Again</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">Medications</h1>
          <p className="text-gray-600 mt-2">Manage your medication schedule and track adherence</p>
        </div>
        <Button
          onClick={() => {
            setEditingMed(null);
            setShowForm(!showForm);
          }}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Medication
        </Button>
      </motion.div>

      <AnimatePresence>
        {showForm && (
          <MedicationForm
            medication={editingMed}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditingMed(null);
            }}
          />
        )}
      </AnimatePresence>

      {loading ? (
        <div className="flex justify-center py-20">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
          />
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {medications.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <Card className="border-none shadow-xl bg-white/90 backdrop-blur-lg">
                  <CardContent className="p-16 text-center">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                      <Pill className="w-12 h-12 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No medications added yet</h3>
                    <p className="text-gray-600 mb-6">Start by adding your medications to track your schedule</p>
                    <Button
                      onClick={() => setShowForm(true)}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Your First Medication
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <>
                <Card className="border-none shadow-xl bg-white/90 backdrop-blur-lg">
                  <CardHeader className="border-b border-blue-50">
                    <CardTitle className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
                        <Pill className="w-5 h-5 text-white" />
                      </div>
                      Active Medications
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <AnimatePresence>
                      {medications.map((med, index) => (
                        <MedicationCard
                          key={med._id}
                          medication={med}
                          onEdit={handleEdit}
                          onDelete={handleDelete}
                          index={index}
                        />
                      ))}
                    </AnimatePresence>
                  </CardContent>
                </Card>

                <MedicationSchedule medications={medications} />
              </>
            )}
          </div>

          <div className="space-y-6">
            <MedicationReminders medications={medications} />
            
            <Card className="border-none shadow-xl bg-gradient-to-br from-amber-500 to-orange-500 text-white">
              <CardContent className="p-6">
                <AlertCircle className="w-10 h-10 mb-4" />
                <h3 className="text-lg font-bold mb-2">Important Reminder</h3>
                <p className="text-sm text-amber-100 leading-relaxed">
                  Never stop or change your medications without consulting your neurologist. Always follow your prescribed schedule.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
