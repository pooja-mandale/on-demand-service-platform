const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const Admin = require("./modal/Admin");
const Customer = require("./modal/Customer");
const Agency = require("./modal/Agency");
const Professional = require("./modal/Professional");

const seedDatabase = async () => {
    try {
        const mongoUri = process.env.MONGO_URL 
            || "mongodb+srv://olx-user:hRwJZKPhgqQyKN5O@cluster0.yjpqbyl.mongodb.net/on-demand-service";

        console.log("Connecting to MongoDB...");
        await mongoose.connect(mongoUri);
        console.log("Connected to MongoDB 🌻");

        const defaultAvatar = process.env.DEFAULT_AVTAR 
            || "https://res.cloudinary.com/da5klmpqb/image/upload/v1721291355/download_w2o5rv.jpg";

        // 1. Seed Admin
        const adminEmail = "admin@gmail.com";
        const adminHash = await bcrypt.hash("Admin@123", 10);
        await Admin.deleteMany({ email: adminEmail });
        await Admin.create({
            name: "System Admin",
            email: adminEmail,
            password: adminHash,
        });
        console.log("✅ Admin seeded: admin@gmail.com / Admin@123");

        // 2. Seed Customer
        const customerEmail = "customer@gmail.com";
        const customerHash = await bcrypt.hash("Customer@123", 10);
        await Customer.deleteMany({ email: customerEmail });
        await Customer.create({
            name: "Demo Customer",
            email: customerEmail,
            password: customerHash,
            image: defaultAvatar
        });
        console.log("✅ Customer seeded: customer@gmail.com / Customer@123");

        // 3. Seed Agency
        const agencyEmail = "agency@gmail.com";
        const agencyHash = await bcrypt.hash("Agency@123", 10);
        await Agency.deleteMany({ email: agencyEmail });
        await Agency.create({
            name: "Demo Agency",
            email: agencyEmail,
            password: agencyHash,
            address: "123 Agency Street, Metro City",
            phone: "9876543210",
            description: "Top-tier home service provider agency"
        });
        console.log("✅ Agency seeded: agency@gmail.com / Agency@123");

        // 4. Seed Professional
        const proEmail = "professional@gmail.com";
        const proHash = await bcrypt.hash("Professional@123", 10);
        await Professional.deleteMany({ email: proEmail });
        await Professional.create({
            name: "Demo Professional",
            email: proEmail,
            password: proHash,
            phone: "9876543210",
            address: "456 Expert Ave, Metro City",
            categories: "plumber",
            experience: 5,
            image: defaultAvatar,
            availability: true,
            isActiveAccount: true,
            price: 500
        });
        console.log("✅ Professional seeded: professional@gmail.com / Professional@123");

        console.log("\n🎉 ALL CREDENTIALS SEEDED SUCCESSFULLY!");
        process.exit(0);
    } catch (error) {
        console.error("❌ Error seeding database:", error);
        process.exit(1);
    }
};

seedDatabase();
