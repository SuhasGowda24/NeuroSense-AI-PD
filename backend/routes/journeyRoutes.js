import express from "express";
import {
  getEvents,
  addEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/journeyController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getEvents);
router.post("/", verifyToken, addEvent);
router.put("/:id", verifyToken, updateEvent);
router.delete("/:id", verifyToken, deleteEvent);

export default router;
