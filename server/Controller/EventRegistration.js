const EventModel = require("../model/EventRegistration");

const EventRegistration = async (req, res) => {
    try {
        const email = req.body.email;
        const existingEvent = await EventModel.findOne({ email });
        if (existingEvent) {
            return res.status(400).json({ error: "Event already registered" });
        }
        const event = await EventModel.create(req.body);
        res.status(201).json(event);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {EventRegistration};