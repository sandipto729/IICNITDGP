const AuditionModel = require('../model/Audition');
const sendEmail = require('../utils/mail');

const createAudition = async (req, res) => {
    try {
        const audition = new AuditionModel(req.body);
        await audition.save();
        res.status(201).send(audition);
    } catch (error) {
        res.status(400).send(error);
    }
};

const getAllAuditions = async (req, res) => {
    try {
        console.log('Fetching all auditions...');
        const auditions = await AuditionModel.find();
        console.log(`Found ${auditions.length} auditions`);
        res.status(200).json(auditions);
    } catch (error) {
        console.error('Error fetching auditions:', error);
        res.status(500).json({ 
            message: 'Failed to fetch auditions', 
            error: error.message 
        });
    }
};

const updateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        
        console.log(`Updating audition ${id} to status: ${status}`);
        
        // Find the audition first
        const audition = await AuditionModel.findById(id);
        if (!audition) {
            return res.status(404).json({ 
                message: 'Audition not found' 
            });
        }

        if (status === 'approved') {
            audition.status = status;
            await audition.save();
            
            const email = audition.email;
            const subject = 'Audition Status Update';
            const text = 'Congratulations! Your audition has been approved. Welcome to the team!';
            
            try {
                await sendEmail(email, subject, text);
                console.log(`Approval email sent to ${email}`);
            } catch (emailError) {
                console.error('Failed to send approval email:', emailError);
                // Continue even if email fails
            }
            
        } else if (status === 'rejected') {
            const email = audition.email;
            const subject = 'Audition Status Update';
            const text = 'We regret to inform you that your audition has been rejected. Thank you for your interest.';
            
            try {
                await sendEmail(email, subject, text);
                console.log(`Rejection email sent to ${email}`);
            } catch (emailError) {
                console.error('Failed to send rejection email:', emailError);
                // Continue even if email fails
            }
            
            // Delete the audition record
            await AuditionModel.findByIdAndDelete(id);
            console.log(`Audition ${id} deleted after rejection`);
        }
        
        res.status(200).json({ 
            message: 'Audition status updated successfully',
            status: status
        });
    } catch (error) {
        console.error('Error updating audition status:', error);
        res.status(500).json({ 
            message: 'Failed to update audition status', 
            error: error.message 
        });
    }
};



module.exports = {
    createAudition,
    getAllAuditions,
    updateStatus
};