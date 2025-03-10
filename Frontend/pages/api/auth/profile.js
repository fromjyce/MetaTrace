import clientPromise from "@/lib/mongodb";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        console.error("❌ Token Expired:", error.expiredAt);
        return res.status(401).json({ message: "Session expired. Please log in again." });
      } else {
        console.error("❌ Invalid Token:", error.message);
        return res.status(403).json({ message: "Invalid token" });
      }
    }

    console.log("✅ Decoded Token:", decoded);

    const client = await clientPromise;
    const db = client.db("testdb");

    let user = await db.collection("users").findOne({ _id: new ObjectId(decoded.userId) });

    if (!user) {
      console.warn("User not found by _id. Trying email lookup...");
      user = await db.collection("users").findOne({ email: decoded.email });
    }

    console.log("MongoDB Query Result:", user);

    if (!user) {
      console.error("❌ User not found in database.");
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.error("❌ Profile Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
}
