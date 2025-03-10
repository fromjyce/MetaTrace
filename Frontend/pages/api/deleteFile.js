import { MongoClient, ObjectId } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const { id } = req.query;

    const client = await MongoClient.connect(process.env.MONGO_URI);
    const db = client.db();
    const collection = db.collection('uploads');

    try {
      const result = await collection.deleteOne({ _id: new ObjectId(id) });
      if (result.deletedCount === 1) {
        res.status(200).json({ message: 'File deleted successfully' });
      } else {
        res.status(404).json({ message: 'File not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error deleting file', error });
    } finally {
      client.close();
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}