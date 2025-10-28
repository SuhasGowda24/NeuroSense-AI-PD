import React, { useState, useEffect } from "react";
import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Plus, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axiosClient from "../../../lib/axiosClient";

import JourneyForm from "../../../components/PDashboard/JourneyForm";
import JourneyTimeline from "../../../components/PDashboard/JourneyTimeline";

export default function Journey() {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

   const loadEvents = async () => {
    try {
      const res = await axiosClient.get("/journey", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEvents(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error loading events:", err);
      setLoading(false);
    }
  };

     const handleSubmit = async (formData) => {
    try {
      if (editingEvent) {
        await axiosClient.put(`/journey/${editingEvent._id}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axiosClient.post("/journey", formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      setShowForm(false);
      setEditingEvent(null);
      await loadEvents();
    } catch (err) {
      console.error("Error saving event:", err);
    }
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setShowForm(true);
  };

 const handleDelete = async (id) => {
    try {
      await axiosClient.delete(`/journey/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      loadEvents();
    } catch (err) {
      console.error("Error deleting event:", err);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">My Journey</h1>
          <p className="text-gray-600 mt-2">Track important milestones and events in your PD journey</p>
        </div>
        <Button
          onClick={() => {
            setEditingEvent(null);
            setShowForm(!showForm);
          }}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Event
        </Button>
      </motion.div>

      <AnimatePresence>
        {showForm && (
          <JourneyForm
            event={editingEvent}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditingEvent(null);
            }}
          />
        )}
      </AnimatePresence>

      {loading ? (
        <div className="flex justify-center py-20">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full"
          />
        </div>
      ) : events.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card className="border-none shadow-xl bg-white/90 backdrop-blur-lg">
            <CardContent className="p-16 text-center">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                <Calendar className="w-12 h-12 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Start Your Journey Timeline</h3>
              <p className="text-gray-600 mb-6">Document important moments, symptoms changes, and treatment milestones</p>
              <Button
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Event
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <JourneyTimeline
          events={events}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}