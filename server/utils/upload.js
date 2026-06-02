const multer = require("multer")
const path = require("path")
const fs = require("fs")

const uploadDir = path.join(__dirname, "../uploads")

// Ensure upload directory exists
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true })
}

const heroStorage = multer.diskStorage({
    destination: (req, file, next) => {
        next(null, uploadDir)
    },
    filename: (req, file, next) => {
        const fn = Date.now() + path.extname(file.originalname)
        next(null, fn)
    },
})
//                                                          👇same as formik.value.hero in Blogs.jsx
exports.upload = multer({ storage: heroStorage }).single("image")

