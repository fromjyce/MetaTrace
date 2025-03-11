import formidable from "formidable";
import { v2 as cloudinary } from "cloudinary";
import { MongoClient } from "mongodb";
import fs from "fs";

export const config = { api: { bodyParser: false } };

const MONGODB_URI = process.env.MONGO_URI;
const DB_NAME = "testdb";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const form = formidable({ multiples: false });

      form.parse(req, async (err, fields, files) => {
        if (err) {
          console.error("❌ File Upload Error:", err);
          return res.status(500).json({ message: "File upload failed" });
        }

        const file = files.file[0];
        const email = fields.email; // Get email from form

        if (!file || !email) {
          return res.status(400).json({ message: "Missing file or user email" });
        }

        // Upload file to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(file.filepath, {
          folder: "uploads",
        });

        // Remove temp file
        fs.unlinkSync(file.filepath);

        // Store in MongoDB
        const client = new MongoClient(MONGODB_URI);
        await client.connect();
        const db = client.db(DB_NAME);

        await db.collection("uploads").insertOne({
          email,
          filename: file.originalFilename,
          cloudinaryUrl: uploadResult.secure_url, // Public Cloudinary URL
          type: file.mimetype,
          size: file.size,
          uploadDate: new Date(),
        });

        await client.close();
        res.status(200).json({ message: "✅ File uploaded successfully!", url: uploadResult.secure_url });
      });
    } catch (error) {
      console.error("❌ Server Error:", error);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  } 
  else if (req.method === "GET") {
    try {
      const { email } = req.query;
      if (!email) {
        return res.status(400).json({ message: "User email is required" });
      }

      const client = new MongoClient(MONGODB_URI);
      await client.connect();
      const db = client.db(DB_NAME);

      // Retrieve uploaded files for the user
      const files = await db.collection("uploads")
        .find({ email })
        .sort({ uploadDate: -1 })
        .toArray();

      await client.close();
      res.status(200).json({ files: files || [] });
    } catch (error) {
      console.error("❌ Error fetching uploads:", error);
      res.status(500).json({ message: "Failed to fetch uploaded files" });
    }
  } 
  else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
