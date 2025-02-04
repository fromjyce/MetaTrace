import mongoose from "mongoose";

const FileMetadataSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  uploadDate: { type: Date, default: Date.now },
  metadata: { type: Object, required: true }, // This can store the extracted metadata
});

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  files: [FileMetadataSchema], // Embed files array with metadata
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);
