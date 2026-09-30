const express = require("express");
const Registration = require("../models/Registration");
const Event = require("../models/Event");

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const { eventId, name, email, collegeYear, phone } = req.body;
    if (!eventId || !name || !email || !collegeYear || !phone) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ success: false, message: "Event not found" });

    const existing = await Registration.findOne({ eventId, email });
    if (existing) {
      return res.status(409).json({ success: false, message: "This email is already registered for this event" });
    }

    const registration = await Registration.create({ eventId, name, email, collegeYear, phone });
    res.status(201).json({ success: true, message: "Registration successful", registration });
  } catch (err) { next(err); }
});

router.get("/", async (req, res, next) => {
  try {
    const { search = "", eventId = "" } = req.query;
    const query = {};
    if (eventId) query.eventId = eventId;

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { collegeYear: { $regex: search, $options: "i" } }
      ];
    }

    const registrations = await Registration.find(query)
      .populate("eventId", "name category date")
      .sort({ createdAt: -1 });

    res.json({ success: true, registrations });
  } catch (err) { next(err); }
});

module.exports = router;