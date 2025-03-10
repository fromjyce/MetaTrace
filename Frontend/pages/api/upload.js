import dotenv from "dotenv";
dotenv.config();
import formidable from "formidable";
import { MongoClient } from "mongodb";
import fs from "fs";
import path from "path";
import mime from "mime-types";

export const config = { api: { bodyParser: false } };

const MONGODB_URI = process.env.MONGO_URI;
const DB_NAME = "testdb";
const UPLOADS_DIR = "/uploads"; // Static folder for serving files

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const uploadDir = path.join(process.cwd(), "public", UPLOADS_DIR);
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const form = formidable({
        multiples: false,
        uploadDir: uploadDir,
        keepExtensions: true,
      });

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

        const newFileName = `${Date.now()}_${file.originalFilename}`;
        const newFilePath = path.join(uploadDir, newFileName);
        fs.renameSync(file.filepath, newFilePath); // Rename file properly

        const client = new MongoClient(MONGODB_URI);
        await client.connect();
        const db = client.db(DB_NAME);

        // Save file details with a public URL
        await db.collection("uploads").insertOne({
          email,
          filename: file.originalFilename,
          storedName: newFileName,
          fileUrl: `${UPLOADS_DIR}/${newFileName}`, // Accessible via frontend
          type: mime.lookup(newFilePath) || "unknown",
          size: file.size,
          uploadDate: new Date(),
        });

        await client.close();
        res.status(200).json({ message: "✅ File uploaded successfully!", filename: file.originalFilename });
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
      const files = await db.collection("uploads").find({ email }).sort({ uploadDate: -1 }).toArray();
      await client.close();

      res.status(200).json({ files: files || [] });
    } catch (error) {
      console.error("❌ Error fetching uploads:", error);
      res.status(500).json({ message: "Failed to fetch uploaded files" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
