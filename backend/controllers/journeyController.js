import JourneyEvent from "../models/JourneyEvent.js";
import mongoose from "mongoose";

// Get all events
export const getEvents = async (req, res) => {
  try {
    // Admin can override using ?userId=xxxx
    const targetUserId =
      req.user.role === "admin" && req.query.userId
        ? req.query.userId
        : req.user.id;

        // If admin provided a userId, validate it
    if (req.user.role === "admin" && req.query.userId) {
      if (!mongoose.Types.ObjectId.isValid(req.query.userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
    }
    // only return events for the authenticated patient
    const events = await JourneyEvent.find({ patientId: targetUserId }).sort({ date: -1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: "Error fetching events" });
  }
};

// Add new event
export const addEvent = async (req, res) => {
  try {
    if (req.user.role === "admin") {
      return res
        .status(403)
        .json({ message: "Admins cannot create journey events" });
    }
    const event = new JourneyEvent({ ...req.body, patientId: req.user.id });
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ message: "Error creating event" });
  }
};

// Update event
export const updateEvent = async (req, res) => {
  try {
    if (req.user.role === "admin") {
      return res
        .status(403)
        .json({ message: "Admins cannot modify journey events" });
    }
    // update only if the event belongs to the authenticated user
    const updatedEvent = await JourneyEvent.findOneAndUpdate(
      { _id: req.params.id, patientId: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedEvent) return res.status(404).json({ message: "Event not found" });
    res.json(updatedEvent);
  } catch (err) {
    res.status(400).json({ message: "Error updating event" });
  }
};

// Delete event
export const deleteEvent = async (req, res) => {
  try {
    if (req.user.role === "admin") {
      return res
        .status(403)
        .json({ message: "Admins cannot delete journey events" });
    }
    const deleted = await JourneyEvent.findOneAndDelete({ _id: req.params.id, patientId: req.user.id });
    if (!deleted) return res.status(404).json({ message: "Event not found" });
    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: "Error deleting event" });
  }
};
