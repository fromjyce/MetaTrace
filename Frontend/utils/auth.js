import connectDB from "@/pages/api/db";

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const db = await connectDB();
            const usersCollection = db.collection("users");

            const { email, password } = req.body;
            const user = await usersCollection.findOne({ email });

            if (user && user.password === password) {
                res.status(200).json({ message: "Login successful!" });
            } else {
                res.status(401).json({ error: "Invalid credentials" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}
