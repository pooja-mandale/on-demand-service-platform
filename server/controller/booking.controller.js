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

    // ✅ Just save booking without sending mail
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

    // ✅ Simple response (no email logic)
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
        const { id } = req.params
        console.log(id)

        if (!id) {
            res.status(400).json({ message: "agency Professional ID is required" })
        }

        const result = await BookService.findByIdAndUpdate(id, { status: "accept" })

        if (!result) {
            res.status(404).json({ message: "Professional not found" })
        }

        res.json({ message: "Professional accept Booking successful", result })
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
})
exports.isRejectRequestAgencyProfessional = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params
        const result = await BookService.findByIdAndUpdate(id, { status: "reject" })
        res.json({ message: "agency professional Rejetc Request Success", result })
    } catch (error) {
        console.error("Error reject Request professional account:", error);
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }

})
exports.isCancelRequestAgencyProfessional = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params
        const result = await BookService.findByIdAndUpdate(id, { status: "reject" })
        res.json({ message: "agency professional Rejetc Request Success", result })
    } catch (error) {
        console.error("Error reject Request professional account:", error);
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }

})

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



