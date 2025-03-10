import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ message: "Method not allowed" });

  try {
    const client = await clientPromise;
    const db = client.db("testdb");
    const files = await db.collection("uploads").find({}).toArray();

    res.status(200).json({ files });
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ message: "Failed to retrieve files", error: error.message });
  }
}
