import Navbar from '@/components/Navbar';
import Head from 'next/head';
import { useState } from 'react';
import { CloudUpload, Info, Trash2, Download } from 'lucide-react';
import Footer from '@/components/Footer';

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
        <div className="px-9 flex flex-col py-8 justify-center">
          <h2 className="text-3xl font-black mb-2 epilogue text-center">
            Upload Your <span className="text-[#f74b25ff]">File</span>
          </h2>
          <p className="text-[#5e5e5eff] poppins mb-4 text-lg text-center">
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
              fileEnter
                ? 'border-[#1b1b1cff] bg-[#fbb3a3]'
                : 'border-[#1b1b1cff] bg-[#fbb3a3]'
            } border-dashed border-2 rounded-lg p-8 w-full flex flex-col items-center justify-center cursor-pointer transition-all`}
          >
            <CloudUpload className="w-16 h-16 text-[#1c1c1cff] mb-4" />
            <p className="text-[#1c1c1cff] font-semibold poppins">
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
            <h3 className="text-xl font-semibold mb-4 epilogue">
                Your Recent <span className="text-[#f74b25ff]">Uploads</span>
            </h3>
            <div className="space-y-4 w-full">
                {recentUploads.map((upload, index) => (
                <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-[#eceaea] shadow-lg rounded w-full"
                >
                    <div className="flex items-center space-x-4 w-1/3">
                    <img
                        src="/placeholder-logo.png"
                        alt="File Logo"
                        className="w-8 h-8 object-cover"
                    />
                    <h4 className="font-semibold truncate epilogue">{upload.name}</h4>
                    </div>
                    <div className="text-center w-1/3">
                    <p className="text-sm text-gray-500 poppins">
                        <span className="font-medium">Uploaded on:</span> {upload.uploadDate}
                    </p>
                    </div>
                    <div className="flex items-center space-x-4 justify-end w-1/3">
                    <button
                        className="p-2 bg-[#4CBB17] text-white rounded hover:bg-green-600"
                        aria-label="View Metadata"
                    >
                        <Info className="w-5 h-5" />
                    </button>
                    <button
                        className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                        aria-label="Delete File"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>
                    <button
                        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        aria-label="Download File"
                    >
                        <Download className="w-5 h-5" />
                    </button>
                    </div>
                </div>
                ))}
            </div>
            </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Upload;
