import Navbar from '@/components/Navbar';
import Head from 'next/head';
import { useState } from 'react';
import { CloudUpload, Info, Trash2, Download, X, Copy, ArrowRight } from 'lucide-react';
import Footer from '@/components/Footer';
import Link from 'next/link';

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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFileMetadata, setSelectedFileMetadata] = useState(null);

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

  const openMetadataModal = (upload) => {
    setSelectedFileMetadata(upload);
    setIsModalOpen(true);
  };  

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFileMetadata(null);
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
          <h3 className="text-xl font-semibold mb-4 epilogue flex justify-between items-center">
              <span>
                Your Recent <span className="text-[#f74b25ff]">Uploads</span>
              </span>
              <Link href="/view-more" passHref>
                <button className="flex items-center text-[#1b1b1c] text-sm font-semibold hover:text-[#f74b25ff]">
                  View More
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </Link>
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
                      onClick={() => openMetadataModal(upload)}
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

        {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#f4f4f4] rounded-lg shadow-lg p-6 w-96 relative">
              <button
                onClick={closeModal}
                className="absolute top-3 right-3 p-1 text-[#5e5e5eff] hover:text-[#1a1a1aff]"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-lg text-[#1a1a1aff] text-center epilogue font-bold mb-4">
                Metadata of <span className="text-[#f74b25ff]">{selectedFileMetadata ? selectedFileMetadata.name : 'N/A'}</span>
              </h3>
              <ul className="list-none text-sm poppins mb-8">
                {selectedFileMetadata ? (
                <>
                <li className="mb-2">
                    <span className="font-medium capitalize">Name:</span> {selectedFileMetadata.name}
                </li>
                <li className="mb-2">
                    <span className="font-medium capitalize">Upload Date:</span> {selectedFileMetadata.uploadDate}
                </li>
                {selectedFileMetadata.metadata ? (
                    Object.entries(selectedFileMetadata.metadata).map(([key, value]) => (
                    <li className="mb-2" key={key}>
                        <span className="font-medium capitalize">{key}:</span> {value}
                    </li>
                    ))
                ) : (
                    <li className="mb-2 text-gray-500">No metadata available</li>
                )}
                </>
            ) : (
                <li className="text-gray-500">No file selected</li>
            )}
            </ul>
              <div className="flex justify-end space-x-4 mt-4">
                <button className="p-2 bg-[#4CBB17] text-white rounded hover:bg-green-600" aria-label="Copy File">
                  <Copy className="w-5 h-5" />
                </button>
                <button className="p-2 bg-red-500 text-white rounded hover:bg-red-600" aria-label="Delete File">
                  <Trash2 className="w-5 h-5" />
                </button>
                <button className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600" aria-label="Download File">
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>          
            )}
                </div>
      <Footer />
    </>
  );
};

export default Upload;
