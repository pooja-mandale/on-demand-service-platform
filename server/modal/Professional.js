const mongoose = require("mongoose");

const normal_professionalSchema = new mongoose.Schema({
    professionalId: { type: mongoose.Types.ObjectId, ref: "professional" },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String },
    categories: {
        type: String,
        enum: ['plumber', 'electrician', 'cleaner'],
        required: true,
    },
    experience: {
        type: Number,
        min: 0,
        required: true,
    },
    image: { type: String, required: true },
    availability: { type: Boolean, default: true },
    isActiveAccount: { type: Boolean, default: true },
    price: { type: Number, required: true }
});



module.exports = mongoose.model("professional", normal_professionalSchema);




