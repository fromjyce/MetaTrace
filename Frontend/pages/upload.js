import Navbar from '@/components/Navbar';
import Head from 'next/head';
import { useState } from 'react';
import { CloudUpload } from 'lucide-react';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [fileEnter, setFileEnter] = useState(false);
  const [recentUploads, setRecentUploads] = useState([
    {
      name: 'example-image.jpg',
      uploadDate: '2025-01-16',
      metadata: { size: '2MB', type: 'image/jpeg' },
    },
    {
      name: 'document.pdf',
      uploadDate: '2025-01-14',
      metadata: { size: '1MB', type: 'application/pdf' },
    },
  ]);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      const newFile = {
        name: uploadedFile.name,
        uploadDate: new Date().toLocaleDateString(),
        metadata: { size: 'N/A', type: uploadedFile.type },
      };
      setRecentUploads([newFile, ...recentUploads]);
      setFile(uploadedFile);
    }
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    setFileEnter(false);
    if (e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      const newFile = {
        name: droppedFile.name,
        uploadDate: new Date().toLocaleDateString(),
        metadata: { size: 'N/A', type: droppedFile.type },
      };
      setRecentUploads([newFile, ...recentUploads]);
      setFile(droppedFile);
    }
  };

  return (
    <>
      <Head>
        <title>Upload your File | MetaTrace</title>
      </Head>
      <div className="min-h-screen bg-[#f7f7f7ff]">
  <Navbar />
  <div className="px-4 py-5 flex flex-col justify-center min-h-[80vh]">
    <h2 className="text-3xl font-black mb-2 epilogue text-center">
      Upload Your <span className="text-[#f74b25ff]">File</span>
    </h2>
    <p className="text-gray-600 mb-6 text-lg text-center">
      Securely upload and manage your files in one place.
    </p>
    <div
  onClick={() => document.getElementById('file-upload').click()}
  onDragOver={(e) => {
    e.preventDefault();
    setFileEnter(true);
  }}
  onDragLeave={() => setFileEnter(false)}
  onDrop={handleFileDrop}
  className={`${
    fileEnter ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-100'
  } border-dashed border-2 rounded-lg p-8 w-full flex flex-col items-center justify-center cursor-pointer transition-all`}
>
  <CloudUpload className="w-16 h-16 text-gray-500 mb-4" />
  <p className="text-gray-700 font-semibold">
    Drag & drop your files here or click to upload
  </p>
  <input
    type="file"
    onChange={handleFileChange}
    className="hidden"
    id="file-upload"
  />
</div>
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Recent Uploads</h3>
      <div className="space-y-4 w-full">
        {recentUploads.map((upload, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-white shadow-lg rounded w-full"
          >
            <div>
              <h4 className="font-semibold">{upload.name}</h4>
              <p className="text-sm text-gray-500">Uploaded on: {upload.uploadDate}</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                Metadata
              </button>
              <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                Delete
              </button>
              <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>
    </>
  );
};

export default Upload;
