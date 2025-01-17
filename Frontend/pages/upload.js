import Navbar from '@/components/Navbar';
import Head from 'next/head';
import { useState } from 'react';

const Upload = () => {
  const [file, setFile] = useState(null);
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
    setFile(e.target.files[0]);
  };
  const handleFileUpload = () => {
    if (file) {
      const newFile = {
        name: file.name,
        uploadDate: new Date().toLocaleDateString(),
        metadata: { size: 'N/A', type: file.type },
      };
      setRecentUploads([newFile, ...recentUploads]);
    }
  };
  const handleMetadataClick = (filename) => {
    alert(`Show metadata for ${filename}`);
  };
  const handleDelete = (filename) => {
    setRecentUploads(recentUploads.filter(file => file.name !== filename));
  };
  const handleDownload = (filename) => {
    alert(`Download ${filename}`);
  };

  return (
    <>
      <Head>
        <title>Upload your File | MetaTrace</title>
      </Head>
      <div className="min-h-screen bg-[#f7f7f7ff]">
        <Navbar />
        <div className="container mx-auto px-4 py-5">
          <h2 className="text-2xl font-black mb-3 epilogue">Upload Your <span className='text-[#f74b25ff]'>File</span></h2>
          <div className="bg-white p-4 rounded shadow-lg">
            <input
              type="file"
              onChange={handleFileChange}
              className="border border-gray-300 p-2 mb-4 w-full"
            />
            <button
              onClick={handleFileUpload}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Upload
            </button>
          </div>
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Recent Uploads</h3>
            <div className="space-y-4">
              {recentUploads.map((upload, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white shadow-lg rounded">
                  <div>
                    <h4 className="font-semibold">{upload.name}</h4>
                    <p className="text-sm text-gray-500">Uploaded on: {upload.uploadDate}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleMetadataClick(upload.name)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Metadata
                    </button>
                    <button
                      onClick={() => handleDelete(upload.name)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleDownload(upload.name)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
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
