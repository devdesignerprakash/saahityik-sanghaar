import multer from 'multer';
import fs from 'fs';
import path from 'path';
import cloudinary from '../configuration/cloudinary.config.js';

// Temporary disk storage using multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = './uploads/';
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath);
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9) + ext;
        cb(null, uniqueName);
    }
});

const upload = multer({ storage });

const optionalImageUpload = (req, res, next) => {
    const uploadMiddleware = upload.single('image');

    uploadMiddleware(req, res, async (err) => {
        try {
            if (err instanceof multer.MulterError || err) {
                return res.status(400).json({ error: 'Multer Error', details: err.message });
            }

            if (!req.file) return next(); // No file uploaded

            const localPath = req.file.path;

            // Upload to Cloudinary
            const result = await cloudinary.uploader.upload(localPath, {
                folder: 'uploads',
                resource_type: 'image'
            });

            // Remove local file
            fs.unlinkSync(localPath);

            // Attach URL to request
            req.imageUrl = result.secure_url;
            next();

        } catch (error) {
            return res.status(500).json({ error: 'Upload failed', details: error.message });
        }
    });
};

export default optionalImageUpload;
