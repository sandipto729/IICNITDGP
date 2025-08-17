const AuditionModel = require('../model/Audition');
const sendEmail = require('../utils/mail');

const createAudition = async (req, res) => {
    try {
        const audition = new AuditionModel(req.body);
        await audition.save();
        
        // Send registration confirmation email
        const registrationEmailContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Audition Registration Confirmation</title>
            </head>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #f4f4f4;">
                <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <h2 style="color: #333; margin-bottom: 10px;">🎉 Audition Registration Successful!</h2>
                        <div style="width: 50px; height: 3px; background: linear-gradient(135deg, #22c55e, #16a34a); margin: 0 auto;"></div>
                    </div>
                    
                    <p style="color: #555; margin-bottom: 20px;">Dear <strong>${audition.name || 'Student'}</strong>,</p>
                    
                    <p style="color: #555; margin-bottom: 25px;">Thank you for registering for the IIC NIT Durgapur audition! Your application has been successfully submitted.</p>
                    
                    <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #3b82f6;">
                        <h3 style="color: #1e40af; margin-top: 0;">📋 Your Application Details:</h3>
                        <p style="margin: 5px 0; color: #555;"><strong>Name:</strong> ${audition.name || 'N/A'}</p>
                        <p style="margin: 5px 0; color: #555;"><strong>Email:</strong> ${audition.email || 'N/A'}</p>
                        <p style="margin: 5px 0; color: #555;"><strong>Mobile:</strong> ${audition.mobile || 'N/A'}</p>
                        <p style="margin: 5px 0; color: #555;"><strong>Roll Number:</strong> ${audition.rollno || 'N/A'}</p>
                        <p style="margin: 5px 0; color: #555;"><strong>Year:</strong> ${audition.year || 'N/A'}</p>
                        <p style="margin: 5px 0; color: #555;"><strong>Department:</strong> ${audition.department || 'N/A'}</p>
                        <p style="margin: 5px 0; color: #555;"><strong>Domain:</strong> ${Array.isArray(audition.domain) ? audition.domain.join(', ') : (audition.domain || 'N/A')}</p>
                    </div>
                    
                    <div style="background-color: #fef3c7; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #f59e0b;">
                        <p style="color: #92400e; margin: 0; font-size: 14px;">
                            <strong>📌 What's Next?</strong><br>
                            • Our team will review your application<br>
                            • You'll be notified via email about your selection status<br>
                            • Keep an eye on your inbox for updates
                        </p>
                    </div>
                    
                    <p style="color: #555; margin-bottom: 20px;">We appreciate your interest in joining our team and look forward to reviewing your application.</p>
                    
                    <div style="text-align: center; margin: 30px 0;">
                        <p style="color: #555; font-weight: bold;">Best of luck! 🌟</p>
                    </div>
                    
                    <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 30px; text-align: center;">
                        <p style="color: #999; font-size: 12px; margin: 0;">
                            Innovation and Incubation Cell, NIT Durgapur<br>
                            This is an automated message. Please do not reply to this email.
                        </p>
                    </div>
                </div>
            </body>
            </html>
        `;
        
        try {
            await sendEmail(audition.email, '🎉 Audition Registration Confirmed - IIC NIT Durgapur', registrationEmailContent);
            console.log(`Registration confirmation email sent to ${audition.email}`);
        } catch (emailError) {
            console.error('Failed to send registration email:', emailError);
            // Continue even if email fails - don't block the registration
        }
        
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
            const subject = '🎉 Congratulations! Your Audition Has Been Approved - IIC NIT Durgapur';
            const approvalEmailContent = `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Audition Approved</title>
                </head>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #f4f4f4;">
                    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
                        <div style="text-align: center; margin-bottom: 30px;">
                            <h1 style="color: #16a34a; margin-bottom: 10px;">🎉 CONGRATULATIONS! 🎉</h1>
                            <div style="width: 80px; height: 4px; background: linear-gradient(135deg, #22c55e, #16a34a); margin: 0 auto;"></div>
                        </div>
                        
                        <p style="color: #555; margin-bottom: 20px;">Dear <strong>${audition.name || 'Student'}</strong>,</p>
                        
                        <div style="background: linear-gradient(135deg, #dcfce7, #bbf7d0); padding: 25px; border-radius: 10px; margin: 25px 0; text-align: center;">
                            <h2 style="color: #166534; margin: 0 0 15px 0;">✅ YOUR AUDITION HAS BEEN APPROVED!</h2>
                            <p style="color: #15803d; font-size: 18px; margin: 0; font-weight: 500;">Welcome to the IIC NIT Durgapur Team!</p>
                        </div>
                        
                        <p style="color: #555; margin-bottom: 20px;">We are thrilled to inform you that you have been selected to join our innovative team at the Innovation and Incubation Cell, NIT Durgapur.</p>
                        
                        <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #3b82f6;">
                            <h3 style="color: #1e40af; margin-top: 0;">📋 Your Selection Details:</h3>
                            <p style="margin: 5px 0; color: #555;"><strong>Domain:</strong> ${Array.isArray(audition.domain) ? audition.domain.join(', ') : (audition.domain || 'N/A')}</p>
                            <p style="margin: 5px 0; color: #555;"><strong>Year:</strong> ${audition.year || 'N/A'}</p>
                            <p style="margin: 5px 0; color: #555;"><strong>Department:</strong> ${audition.department || 'N/A'}</p>
                        </div>
                        
                        <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #f59e0b;">
                            <h3 style="color: #92400e; margin-top: 0;">📌 Next Steps:</h3>
                            <p style="color: #92400e; margin: 5px 0;">• You will be contacted soon with further details</p>
                            <p style="color: #92400e; margin: 5px 0;">• Join our official WhatsApp/Telegram group (link will be shared)</p>
                            <p style="color: #92400e; margin: 5px 0;">• Attend the orientation session (date to be announced)</p>
                            <p style="color: #92400e; margin: 5px 0;">• Prepare to embark on an exciting journey of innovation!</p>
                        </div>
                        
                        <p style="color: #555; margin-bottom: 25px;">Your skills and enthusiasm have impressed our selection committee, and we believe you will be a valuable addition to our team.</p>
                        
                        <div style="text-align: center; margin: 30px 0;">
                            <p style="color: #16a34a; font-size: 20px; font-weight: bold; margin: 0;">Welcome aboard! 🚀</p>
                        </div>
                        
                        <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 30px; text-align: center;">
                            <p style="color: #999; font-size: 12px; margin: 0;">
                                Innovation and Incubation Cell, NIT Durgapur<br>
                                This is an automated message. Please do not reply to this email.
                            </p>
                        </div>
                    </div>
                </body>
                </html>
            `;
            
            try {
                await sendEmail(email, subject, approvalEmailContent);
                console.log(`Approval email sent to ${email}`);
            } catch (emailError) {
                console.error('Failed to send approval email:', emailError);
                // Continue even if email fails
            }
            
        } else if (status === 'rejected') {
            const email = audition.email;
            const subject = 'Audition Application Update - IIC NIT Durgapur';
            const rejectionEmailContent = `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Audition Application Update</title>
                </head>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #f4f4f4;">
                    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
                        <div style="text-align: center; margin-bottom: 30px;">
                            <h2 style="color: #333; margin-bottom: 10px;">Audition Application Update</h2>
                            <div style="width: 50px; height: 3px; background: linear-gradient(135deg, #6b7280, #4b5563); margin: 0 auto;"></div>
                        </div>
                        
                        <p style="color: #555; margin-bottom: 20px;">Dear <strong>${audition.name || 'Student'}</strong>,</p>
                        
                        <p style="color: #555; margin-bottom: 25px;">Thank you for your interest in joining the Innovation and Incubation Cell at NIT Durgapur and for taking the time to submit your application.</p>
                        
                        <div style="background-color: #fef2f2; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #ef4444;">
                            <p style="color: #dc2626; margin: 0; font-weight: 500;">
                                After careful consideration of all applications, we regret to inform you that we are unable to offer you a position at this time.
                            </p>
                        </div>
                        
                        <p style="color: #555; margin-bottom: 20px;">This decision was not easy to make, as we received many outstanding applications from talented individuals like yourself. The selection process was highly competitive.</p>
                        
                        <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #3b82f6;">
                            <h3 style="color: #1e40af; margin-top: 0;">💡 Don't Give Up!</h3>
                            <p style="color: #1e40af; margin: 5px 0;">• Keep developing your skills and gaining experience</p>
                            <p style="color: #1e40af; margin: 5px 0;">• Watch for future opportunities with IIC NIT Durgapur</p>
                            <p style="color: #1e40af; margin: 5px 0;">• Consider participating in our workshops and events</p>
                            <p style="color: #1e40af; margin: 5px 0;">• Stay connected with our community for updates</p>
                        </div>
                        
                        <p style="color: #555; margin-bottom: 25px;">We encourage you to continue pursuing your passion for innovation and entrepreneurship. Your enthusiasm and interest in our organization are appreciated.</p>
                        
                        <p style="color: #555; margin-bottom: 25px;">We wish you all the best in your future endeavors and hope to see you at our upcoming events and workshops.</p>
                        
                        <div style="text-align: center; margin: 30px 0;">
                            <p style="color: #6b7280; font-weight: bold; margin: 0;">Thank you for your interest! 🙏</p>
                        </div>
                        
                        <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 30px; text-align: center;">
                            <p style="color: #999; font-size: 12px; margin: 0;">
                                Innovation and Incubation Cell, NIT Durgapur<br>
                                This is an automated message. Please do not reply to this email.
                            </p>
                        </div>
                    </div>
                </body>
                </html>
            `;
            
            try {
                await sendEmail(email, subject, rejectionEmailContent);
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