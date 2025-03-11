import formidable from "formidable";
import { v2 as cloudinary } from "cloudinary";
import { MongoClient } from "mongodb";
import fs from "fs";
import fetch from "node-fetch";
import FormData from "form-data"; // Import the form-data library

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
        const email = Array.isArray(fields.email) ? fields.email[0] : fields.email;

        if (!file || !email) {
          return res.status(400).json({ message: "Missing file or user email" });
        }
        const uploadResult = await cloudinary.uploader.upload(file.filepath, {
          folder: "uploads",
        });
        const fastApiFormData = new FormData();
        fastApiFormData.append("file", fs.createReadStream(file.filepath), file.originalFilename); // Append file as a stream
        fastApiFormData.append("email", email);

        const fastApiResponse = await fetch("http://127.0.0.1:8000/upload/", {
          method: "POST",
          body: fastApiFormData,
          headers: fastApiFormData.getHeaders(),
        });

        const fastApiData = await fastApiResponse.json();
        const { message, ...metadataWithoutMessage } = fastApiData;
        const client = new MongoClient(MONGODB_URI);
        await client.connect();
        const db = client.db(DB_NAME);

        await db.collection("uploads").insertOne({
          email,
          filename: file.originalFilename,
          cloudinaryUrl: uploadResult.secure_url,
          type: file.mimetype,
          size: file.size,
          uploadDate: new Date(),
          metadata: metadataWithoutMessage,
        });

        await client.close();
        fs.unlinkSync(file.filepath);

        res.status(200).json({ message: "✅ File uploaded successfully!", url: uploadResult.secure_url });
      });
    } catch (error) {
      console.error("❌ Server Error:", error);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  } else if (req.method === "GET") {
    try {
      const { email } = req.query;
      if (!email) {
        return res.status(400).json({ message: "User email is required" });
      }

      const client = new MongoClient(MONGODB_URI);
      await client.connect();
      const db = client.db(DB_NAME);
      const files = await db.collection("uploads")
        .find({ email })
        .sort({ uploadDate: -1 })
        .toArray();

      await client.close();

      // Ensure response is always sent
      if (!files || files.length === 0) {
        return res.status(200).json({ message: "No files found", files: [] });
      }

      res.status(200).json({ files });
    } catch (error) {
      console.error("❌ Error fetching uploads:", error);
      res.status(500).json({ message: "Failed to fetch uploaded files", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}