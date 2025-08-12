const IdeaModel = require("../model/Idea");

const IdeaSubmission=async(req,res)=>{
    const idea=new IdeaModel(req.body);
    try {
        await idea.save();
        res.status(201).send(idea);
    } catch (error) {
        res.status(400).send(error);
    }
}


// Admin: Get all innovation submissions
const getAllInnovations = async (req, res) => {
    try {
        // Check if user is admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Admin privileges required.'
            });
        }

        const {
            page = 1,
            limit = 50,
            sortBy = 'createdAt',
            sortOrder = 'desc'
        } = req.query;

        // Sort options
        const sortOptions = {};
        sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

        // Calculate pagination
        const skip = (parseInt(page) - 1) * parseInt(limit);

        // Execute query
        const innovations = await IdeaModel.find()
            .sort(sortOptions)
            .skip(skip)
            .limit(parseInt(limit));

        // Get total count for pagination
        const totalInnovations = await IdeaModel.countDocuments();

        res.json({
            success: true,
            innovations,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(totalInnovations / parseInt(limit)),
                totalInnovations,
                innovationsPerPage: parseInt(limit)
            }
        });
    } catch (error) {
        console.error('Get innovations error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch innovations',
            error: error.message
        });
    }
};

module.exports={IdeaSubmission,getAllInnovations};

