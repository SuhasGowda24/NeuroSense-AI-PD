import JourneyEvent from "../models/JourneyEvent.js";

// Get all events
export const getEvents = async (req, res) => {
  try {
    // only return events for the authenticated patient
    const events = await JourneyEvent.find({ patientId: req.user.id }).sort({ date: -1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: "Error fetching events" });
  }
};

// Add new event
export const addEvent = async (req, res) => {
  try {
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
    const deleted = await JourneyEvent.findOneAndDelete({ _id: req.params.id, patientId: req.user.id });
    if (!deleted) return res.status(404).json({ message: "Event not found" });
    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: "Error deleting event" });
  }
};
