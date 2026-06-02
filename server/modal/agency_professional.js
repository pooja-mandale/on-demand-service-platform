const mongoose = require("mongoose");

const agency_professionalSchema = new mongoose.Schema({
    agencyProfessionalId: { type: mongoose.Types.ObjectId, ref: "agency", require: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    experience: { type: Number, min: 0, required: true },
    phone: { type: String, required: true },
    address: { type: String },
    categories: {
        type: String,
        enum: ['plumber', 'electrician', 'cleaner'],
        required: true
    },
    price: { type: Number, required: true },
    availability: { type: Boolean, default: true },
    isActiveAccount: { type: Boolean, default: true },
    image: { type: String, required: true },

});

module.exports = mongoose.model("agency_professional", agency_professionalSchema);



// password
// p1:p112
// p2:p212
// p3:p312