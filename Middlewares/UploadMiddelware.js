// middlewares/uploadMiddleware.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Define the directory path
const uploadDir = path.join(__dirname, '../uploads/profilePics');

// Check if the directory exists, and create it if it doesn't
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Set up multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Use the defined directory
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

// Create upload directories for units
const unitImagesDir = path.join(__dirname, '../uploads/unitImages');
const unitInvoicesDir = path.join(__dirname, '../uploads/unitInvoices');

if (!fs.existsSync(unitImagesDir)) {
    fs.mkdirSync(unitImagesDir, { recursive: true });
}

if (!fs.existsSync(unitInvoicesDir)) {
    fs.mkdirSync(unitInvoicesDir, { recursive: true });
}

// Multer storage for unit files
const unitFilesStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Route images and invoices to different folders
        if (file.fieldname === 'images') {
            console.log('Saving image:', file.originalname, 'to', unitImagesDir);
            cb(null, unitImagesDir);
        } else if (file.fieldname === 'invoices') {
            console.log('Saving invoice:', file.originalname, 'to', unitInvoicesDir);
            cb(null, unitInvoicesDir);
        } else {
            cb(null, uploadDir);
        }
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const filename = uniqueSuffix + '-' + file.originalname;
        console.log('Generated filename:', filename);
        cb(null, filename);
    }
});

const upload = multer({ storage: storage });
const unitUpload = multer({ storage: unitFilesStorage });

module.exports = { upload, unitUpload };
