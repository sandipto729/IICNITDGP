const WebinarModel = require("../model/Webinar");

const WebinarFetch = async (req, res) => {
    try {
        // Find webinars that are either active or don't have isActive field (for backward compatibility)
        const webinar = await WebinarModel.find({ 
            $or: [
                { isActive: true },
                { isActive: { $exists: false } }
            ]
        }).populate('createdBy', 'name email');
        const sortedWebinar = webinar.sort((a, b) => new Date(a.date) - new Date(b.date));
        res.status(200).json(sortedWebinar);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const createWebinar = async (req, res) => {
    try {
        const {
            name,
            details,
            photo,
            date,
            time,
            location,
            category,
            registrationRequired,
            maxParticipants,
            registrationDeadline,
            contactEmail,
            contactPhone
        } = req.body;

        // Validate required fields
        if (!name || !details || !photo || !date) {
            return res.status(400).json({
                message: 'Name, details, photo, and date are required fields'
            });
        }

        const webinar = new WebinarModel({
            name,
            details,
            photo,
            date,
            time,
            location,
            category,
            registrationRequired,
            maxParticipants: maxParticipants ? parseInt(maxParticipants) : null,
            registrationDeadline,
            contactEmail,
            contactPhone,
            createdBy: req.user ? req.user._id : null
        });

        const savedWebinar = await webinar.save();
        await savedWebinar.populate('createdBy', 'name email');
        
        res.status(201).json({
            message: 'Event created successfully',
            webinar: savedWebinar
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getWebinarById = async (req, res) => {
    try {
        const webinar = await WebinarModel.findById(req.params.id).populate('createdBy', 'name email');
        if (!webinar) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json(webinar);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const updateWebinar = async (req, res) => {
    try {
        const webinar = await WebinarModel.findByIdAndUpdate(
            req.params.id,
            { ...req.body },
            { new: true, runValidators: true }
        ).populate('createdBy', 'name email');
        
        if (!webinar) {
            return res.status(404).json({ message: 'Event not found' });
        }
        
        res.status(200).json({
            message: 'Event updated successfully',
            webinar
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const deleteWebinar = async (req, res) => {
    try {
        const webinar = await WebinarModel.findByIdAndUpdate(
            req.params.id,
            { isActive: false },
            { new: true }
        );
        
        if (!webinar) {
            return res.status(404).json({ message: 'Event not found' });
        }
        
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getWebinarCategories = async (req, res) => {
    try {
        const categories = ['workshop', 'seminar', 'conference', 'webinar', 'hackathon', 'competition', 'other'];
        res.status(200).json(categories);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    WebinarFetch,
    createWebinar,
    getWebinarById,
    updateWebinar,
    deleteWebinar,
    getWebinarCategories
}