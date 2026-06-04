const BookService = require("../modal/BookService")
const asyncHandler = require("express-async-handler");
const { checkEmpty } = require("../utils/checkEmpty");
const sendEmail = require("../utils/email");
const Professional = require("../modal/Professional");
const agency_professional = require("../modal/agency_professional")



exports.bookService = asyncHandler(async (req, res) => {
  try {
    const { name, email, desc, time, date, professionalId, agencyProfessionalId } = req.body;

    if (!desc || !time || !date) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const booking = await BookService.create({
      name,
      email,
      desc,
      time,
      date,
      professionalId,
      agencyProfessionalId,
      customerId: req.user, // assuming req.user is populated by auth middleware
    });

    // Send emails in the background
    (async () => {
      try {
        let professionalEmail = null;
        let professionalName = "Professional";
        
        if (professionalId) {
          const pro = await Professional.findById(professionalId);
          if (pro) {
            professionalEmail = pro.email;
            professionalName = pro.name;
          }
        } else if (agencyProfessionalId) {
          const apro = await agency_professional.findById(agencyProfessionalId);
          if (apro) {
            professionalEmail = apro.email;
            professionalName = apro.name;
          }
        }

        // Email to user
        const userHtml = `<div style="font-family: 'Inter', system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border-radius: 24px; background: #ffffff; border: 1px solid #f0f0f5; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);">
    <div style="background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); padding: 30px; border-radius: 20px; text-align: center; color: #ffffff;">
        <h1 style="margin: 0; font-size: 24px; font-weight: 800; tracking-tight">Booking Confirmed!</h1>
        <p style="margin: 8px 0 0 0; opacity: 0.9; font-size: 14px;">Your service request has been received</p>
    </div>
    <div style="padding: 24px 12px; color: #374151; line-height: 1.6;">
        <p style="font-size: 15px; margin-top: 0;">Hi <strong>${name}</strong>,</p>
        <p style="font-size: 14px;">Your service booking has been created successfully. We have notified the professional, and you will receive another email as soon as they update the status.</p>
        
        <div style="background: #f8fafc; border: 1px solid #f1f5f9; border-radius: 16px; padding: 20px; margin: 24px 0;">
            <h3 style="margin: 0 0 16px 0; font-size: 15px; color: #1f2937; border-b: 1px solid #e2e8f0; padding-bottom: 8px;">Booking Details</h3>
            <table style="width: 100%; font-size: 13px; border-collapse: collapse;">
                <tr>
                    <td style="padding: 6px 0; color: #6b7280; width: 140px;">Description:</td>
                    <td style="padding: 6px 0; color: #1f2937; font-weight: 600;">${desc}</td>
                </tr>
                <tr>
                    <td style="padding: 6px 0; color: #6b7280;">Date:</td>
                    <td style="padding: 6px 0; color: #1f2937; font-weight: 600;">${new Date(date).toLocaleDateString()}</td>
                </tr>
                <tr>
                    <td style="padding: 6px 0; color: #6b7280;">Time:</td>
                    <td style="padding: 6px 0; color: #1f2937; font-weight: 600;">${time}</td>
                </tr>
                <tr>
                    <td style="padding: 6px 0; color: #6b7280;">Professional:</td>
                    <td style="padding: 6px 0; color: #1f2937; font-weight: 600;">${professionalName}</td>
                </tr>
            </table>
        </div>
        
        <div style="border-left: 4px solid #f59e0b; background: #fffbeb; padding: 12px 16px; border-radius: 8px; font-size: 13px; color: #b45309; margin-bottom: 24px;">
            <strong>Next Step:</strong> The professional will review your request. If they accept or reject it, we will notify you immediately.
        </div>
        
        <p style="font-size: 12px; color: #9ca3af; margin-bottom: 0;">Best regards,<br/>The OnDemand Team</p>
    </div>
</div>`;

        await sendEmail({
          to: email,
          subject: "Your service booking is successfully created!",
          message: userHtml
        });

        // Email to professional
        if (professionalEmail) {
          const proHtml = `<div style="font-family: 'Inter', system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border-radius: 24px; background: #ffffff; border: 1px solid #f0f0f5; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);">
    <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; border-radius: 20px; text-align: center; color: #ffffff;">
        <h1 style="margin: 0; font-size: 24px; font-weight: 800; tracking-tight">New Booking Request!</h1>
        <p style="margin: 8px 0 0 0; opacity: 0.9; font-size: 14px;">A customer has requested your service</p>
    </div>
    <div style="padding: 24px 12px; color: #374151; line-height: 1.6;">
        <p style="font-size: 15px; margin-top: 0;">Hello <strong>${professionalName}</strong>,</p>
        <p style="font-size: 14px;">You have received a new service booking request. Please log in to your dashboard to review and manage this request.</p>
        
        <div style="background: #f8fafc; border: 1px solid #f1f5f9; border-radius: 16px; padding: 20px; margin: 24px 0;">
            <h3 style="margin: 0 0 16px 0; font-size: 15px; color: #1f2937; border-b: 1px solid #e2e8f0; padding-bottom: 8px;">Request Details</h3>
            <table style="width: 100%; font-size: 13px; border-collapse: collapse;">
                <tr>
                    <td style="padding: 6px 0; color: #6b7280; width: 140px;">Customer Name:</td>
                    <td style="padding: 6px 0; color: #1f2937; font-weight: 600;">${name}</td>
                </tr>
                <tr>
                    <td style="padding: 6px 0; color: #6b7280;">Customer Email:</td>
                    <td style="padding: 6px 0; color: #1f2937; font-weight: 600;">${email}</td>
                </tr>
                <tr>
                    <td style="padding: 6px 0; color: #6b7280;">Description:</td>
                    <td style="padding: 6px 0; color: #1f2937; font-weight: 600;">${desc}</td>
                </tr>
                <tr>
                    <td style="padding: 6px 0; color: #6b7280;">Date:</td>
                    <td style="padding: 6px 0; color: #1f2937; font-weight: 600;">${new Date(date).toLocaleDateString()}</td>
                </tr>
                <tr>
                    <td style="padding: 6px 0; color: #6b7280;">Time:</td>
                    <td style="padding: 6px 0; color: #1f2937; font-weight: 600;">${time}</td>
                </tr>
            </table>
        </div>
        
        <div style="text-align: center; margin: 30px 0 20px 0;">
            <a href="http://localhost:5173" style="background: #10b981; color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 14px; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);">Manage Request</a>
        </div>
        
        <p style="font-size: 12px; color: #9ca3af; margin-bottom: 0;">Best regards,<br/>The OnDemand Team</p>
    </div>
</div>`;
          await sendEmail({
            to: professionalEmail,
            subject: "New Service Booking Request Received!",
            message: proHtml
          });
        }
      } catch (err) {
        console.error("Error sending booking confirmation emails:", err);
      }
    })();

    res.status(201).json({
      message: "Service booked successfully",
      booking,
      note: `Booking created by customer: ${name} (${email})`, // just to know who booked
    });
  } catch (error) {
    console.error("Error booking service:", error);
    res.status(500).json({ message: "Something went wrong while booking service" });
  }
});


exports.getAllCustomerBookings = async (req, res) => {
    try {
        const customerId = req.user?._id || req.user;
        const result = await BookService.find({ customerId: customerId })
            .populate("customerId")
            .populate("professionalId")
            .populate("agencyProfessionalId");

        return res.status(200).json({ message: "Get all customer bookings success", result: result || [] });
    } catch (error) {
        console.error("Error fetching customer bookings:", error);
        res.status(500).json({ message: 'Something went wrong', error });
    }
};

// for admin
exports.getAllProfessionalBooking = asyncHandler(async (req, res) => {
    try {
        if (!req.user || !req.user) {
            return res.status(401).json({ message: 'Authentication required.' });
        }

        const result = await BookService.find().populate('customerId', 'name email').populate('professionalId', 'name email')
        res.status(200).json({ message: 'Bookings fetched successfully.', result });
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
})
// for agency
exports.getAllAgencyProfessionalBooking = asyncHandler(async (req, res) => {
    try {
        const result = await BookService.find().populate('agencyProfessionalId').populate('customerId')
        const arr = []
        for (let i = 0; i < result.length; i++) {
            if (result[i].agencyProfessionalId) {
                arr.push(result[i])
            }
        }
        return res.status(200).json({ message: 'Bookings fetched successfully.', result: arr });
    } catch (error) {

        console.error('Error fetching bookings:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
})

exports.isAcceptAgencyProfessionalRequest = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "Booking ID is required" });
        }

        const result = await BookService.findByIdAndUpdate(id, { status: "accept" }, { new: true })
            .populate("professionalId")
            .populate("agencyProfessionalId");

        if (!result) {
            return res.status(404).json({ message: "Booking not found" });
        }

        // Send email to user
        (async () => {
            try {
                const professionalName = result.professionalId?.name || result.agencyProfessionalId?.name || "Professional";
                const userHtml = `<div style="font-family: 'Inter', system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border-radius: 24px; background: #ffffff; border: 1px solid #f0f0f5; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);">
    <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; border-radius: 20px; text-align: center; color: #ffffff;">
        <h1 style="margin: 0; font-size: 24px; font-weight: 800; tracking-tight">Booking Confirmed!</h1>
        <p style="margin: 8px 0 0 0; opacity: 0.9; font-size: 14px;">The professional has accepted your request</p>
    </div>
    <div style="padding: 24px 12px; color: #374151; line-height: 1.6;">
        <p style="font-size: 15px; margin-top: 0;">Hi <strong>${result.name}</strong>,</p>
        <p style="font-size: 14px;">Great news! <strong>${professionalName}</strong> has accepted your service booking request. They will arrive at the scheduled time.</p>
        
        <div style="background: #f8fafc; border: 1px solid #f1f5f9; border-radius: 16px; padding: 20px; margin: 24px 0;">
            <h3 style="margin: 0 0 16px 0; font-size: 15px; color: #1f2937; border-b: 1px solid #e2e8f0; padding-bottom: 8px;">Booking Details</h3>
            <table style="width: 100%; font-size: 13px; border-collapse: collapse;">
                <tr>
                    <td style="padding: 6px 0; color: #6b7280; width: 140px;">Description:</td>
                    <td style="padding: 6px 0; color: #1f2937; font-weight: 600;">${result.desc}</td>
                </tr>
                <tr>
                    <td style="padding: 6px 0; color: #6b7280;">Date:</td>
                    <td style="padding: 6px 0; color: #1f2937; font-weight: 600;">${new Date(result.date).toLocaleDateString()}</td>
                </tr>
                <tr>
                    <td style="padding: 6px 0; color: #6b7280;">Time:</td>
                    <td style="padding: 6px 0; color: #1f2937; font-weight: 600;">${result.time}</td>
                </tr>
                <tr>
                    <td style="padding: 6px 0; color: #6b7280;">Professional:</td>
                    <td style="padding: 6px 0; color: #1f2937; font-weight: 600;">${professionalName}</td>
                </tr>
                <tr>
                    <td style="padding: 6px 0; color: #6b7280;">Status:</td>
                    <td style="padding: 6px 0; color: #10b981; font-weight: 800;">ACCEPTED</td>
                </tr>
            </table>
        </div>
        
        <p style="font-size: 12px; color: #9ca3af; margin-bottom: 0;">Best regards,<br/>The OnDemand Team</p>
    </div>
</div>`;
                await sendEmail({
                    to: result.email,
                    subject: "Your service booking request is accepted!",
                    message: userHtml
                });
            } catch (err) {
                console.error("Error sending accept booking email to user:", err);
            }
        })();

        res.json({ message: "Professional accept Booking successful", result });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

exports.isRejectRequestAgencyProfessional = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "Booking ID is required" });
        }

        const result = await BookService.findByIdAndUpdate(id, { status: "reject" }, { new: true })
            .populate("professionalId")
            .populate("agencyProfessionalId");

        if (!result) {
            return res.status(404).json({ message: "Booking not found" });
        }

        // Send email to user
        (async () => {
            try {
                const professionalName = result.professionalId?.name || result.agencyProfessionalId?.name || "Professional";
                const userHtml = `<div style="font-family: 'Inter', system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border-radius: 24px; background: #ffffff; border: 1px solid #f0f0f5; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);">
    <div style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); padding: 30px; border-radius: 20px; text-align: center; color: #ffffff;">
        <h1 style="margin: 0; font-size: 24px; font-weight: 800; tracking-tight">Booking Declined</h1>
        <p style="margin: 8px 0 0 0; opacity: 0.9; font-size: 14px;">The professional is unavailable</p>
    </div>
    <div style="padding: 24px 12px; color: #374151; line-height: 1.6;">
        <p style="font-size: 15px; margin-top: 0;">Hi <strong>${result.name}</strong>,</p>
        <p style="font-size: 14px;">We regret to inform you that <strong>${professionalName}</strong> is unavailable and has declined your service request. You can browse other available professionals on our platform to schedule another service.</p>
        
        <div style="background: #f8fafc; border: 1px solid #f1f5f9; border-radius: 16px; padding: 20px; margin: 24px 0;">
            <h3 style="margin: 0 0 16px 0; font-size: 15px; color: #1f2937; border-b: 1px solid #e2e8f0; padding-bottom: 8px;">Declined Details</h3>
            <table style="width: 100%; font-size: 13px; border-collapse: collapse;">
                <tr>
                    <td style="padding: 6px 0; color: #6b7280; width: 140px;">Description:</td>
                    <td style="padding: 6px 0; color: #1f2937; font-weight: 600;">${result.desc}</td>
                </tr>
                <tr>
                    <td style="padding: 6px 0; color: #6b7280;">Date:</td>
                    <td style="padding: 6px 0; color: #1f2937; font-weight: 600;">${new Date(result.date).toLocaleDateString()}</td>
                </tr>
                <tr>
                    <td style="padding: 6px 0; color: #6b7280;">Time:</td>
                    <td style="padding: 6px 0; color: #1f2937; font-weight: 600;">${result.time}</td>
                </tr>
                <tr>
                    <td style="padding: 6px 0; color: #6b7280;">Professional:</td>
                    <td style="padding: 6px 0; color: #1f2937; font-weight: 600;">${professionalName}</td>
                </tr>
                <tr>
                    <td style="padding: 6px 0; color: #6b7280;">Status:</td>
                    <td style="padding: 6px 0; color: #ef4444; font-weight: 800;">DECLINED / REJECTED</td>
                </tr>
            </table>
        </div>
        
        <p style="font-size: 12px; color: #9ca3af; margin-bottom: 0;">Best regards,<br/>The OnDemand Team</p>
    </div>
</div>`;
                await sendEmail({
                    to: result.email,
                    subject: "Your service booking request is declined",
                    message: userHtml
                });
            } catch (err) {
                console.error("Error sending reject booking email to user:", err);
            }
        })();

        res.json({ message: "agency professional Reject Request Success", result });
    } catch (error) {
        console.error("Error reject Request professional account:", error);
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
});

exports.isCancelRequestAgencyProfessional = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "Booking ID is required" });
        }

        const result = await BookService.findByIdAndUpdate(id, { status: "reject" }, { new: true })
            .populate("professionalId")
            .populate("agencyProfessionalId");

        if (!result) {
            return res.status(404).json({ message: "Booking not found" });
        }

        // Send email to user
        (async () => {
            try {
                const professionalName = result.professionalId?.name || result.agencyProfessionalId?.name || "Professional";
                const userHtml = `<div style="font-family: 'Inter', system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border-radius: 24px; background: #ffffff; border: 1px solid #f0f0f5; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);">
    <div style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); padding: 30px; border-radius: 20px; text-align: center; color: #ffffff;">
        <h1 style="margin: 0; font-size: 24px; font-weight: 800; tracking-tight">Booking Cancelled</h1>
        <p style="margin: 8px 0 0 0; opacity: 0.9; font-size: 14px;">The service request was cancelled</p>
    </div>
    <div style="padding: 24px 12px; color: #374151; line-height: 1.6;">
        <p style="font-size: 15px; margin-top: 0;">Hi <strong>${result.name}</strong>,</p>
        <p style="font-size: 14px;">This is to confirm that your service booking request with <strong>${professionalName}</strong> has been cancelled.</p>
        
        <div style="background: #f8fafc; border: 1px solid #f1f5f9; border-radius: 16px; padding: 20px; margin: 24px 0;">
            <h3 style="margin: 0 0 16px 0; font-size: 15px; color: #1f2937; border-b: 1px solid #e2e8f0; padding-bottom: 8px;">Cancellation Details</h3>
            <table style="width: 100%; font-size: 13px; border-collapse: collapse;">
                <tr>
                    <td style="padding: 6px 0; color: #6b7280; width: 140px;">Description:</td>
                    <td style="padding: 6px 0; color: #1f2937; font-weight: 600;">${result.desc}</td>
                </tr>
                <tr>
                    <td style="padding: 6px 0; color: #6b7280;">Date:</td>
                    <td style="padding: 6px 0; color: #1f2937; font-weight: 600;">${new Date(result.date).toLocaleDateString()}</td>
                </tr>
                <tr>
                    <td style="padding: 6px 0; color: #6b7280;">Time:</td>
                    <td style="padding: 6px 0; color: #1f2937; font-weight: 600;">${result.time}</td>
                </tr>
                <tr>
                    <td style="padding: 6px 0; color: #6b7280;">Professional:</td>
                    <td style="padding: 6px 0; color: #1f2937; font-weight: 600;">${professionalName}</td>
                </tr>
                <tr>
                    <td style="padding: 6px 0; color: #6b7280;">Status:</td>
                    <td style="padding: 6px 0; color: #ef4444; font-weight: 800;">CANCELLED</td>
                </tr>
            </table>
        </div>
        
        <p style="font-size: 12px; color: #9ca3af; margin-bottom: 0;">Best regards,<br/>The OnDemand Team</p>
    </div>
</div>`;
                await sendEmail({
                    to: result.email,
                    subject: "Your service booking request is cancelled",
                    message: userHtml
                });
            } catch (err) {
                console.error("Error sending cancel booking email to user:", err);
            }
        })();

        res.json({ message: "agency professional Cancel Request Success", result });
    } catch (error) {
        console.error("Error reject Request professional account:", error);
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
});

//for professional
exports.getProfessionalBooking = asyncHandler(async (req, res) => {
    try {
        const result = await BookService.find({ professionalId: req.user }).populate("customerId")
        res.status(200).json({ message: 'Bookings fetched successfully.', result });
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
})
//for agency professional
exports.getAgencyProfessionalBooking = asyncHandler(async (req, res) => {
    try {
        const result = await BookService.find({ agencyProfessionalId: req.user }).populate("customerId")
        res.status(200).json({ message: 'Bookings fetched successfully.', result });
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
})



