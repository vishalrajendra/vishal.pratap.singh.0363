const express = require("express");
const Event = require("../models/Event");
const Registration = require("../models/Registration");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const { search = "", category = "" } = req.query;
    const query = {};
    if (search) query.name = { $regex: search, $options: "i" };
    if (category && category !== "All") query.category = category;
    const events = await Event.find(query).sort({ date: 1, createdAt: -1 });
    res.json({ success: true, events });
  } catch (err) { next(err); }
});

router.get("/:id", async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ success: false, message: "Event not found" });
    res.json({ success: true, event });
  } catch (err) { next(err); }
});

router.post("/", async (req, res, next) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json({ success: true, event });
  } catch (err) { next(err); }
});

router.put("/:id", async (req, res, next) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true
    });
    if (!event) return res.status(404).json({ success: false, message: "Event not found" });
    res.json({ success: true, event });
  } catch (err) { next(err); }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ success: false, message: "Event not found" });
    await Registration.deleteMany({ eventId: req.params.id });
    res.json({ success: true, message: "Event and related registrations deleted" });
  } catch (err) { next(err); }
});

module.exports = router;