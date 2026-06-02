const mongoose = require("mongoose")
const agencyAdminSchema = new mongoose.Schema({
    agencyId: { type: mongoose.Types.ObjectId, ref: "agency" },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    address: { type: String, required: true },
    phone: { type: String, required: true, minlength: 10, maxlength: 10 },
    description: { type: String },
});


module.exports = mongoose.model("agency", agencyAdminSchema)





