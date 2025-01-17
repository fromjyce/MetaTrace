import Navbar from '@/components/Navbar';
import Head from 'next/head';
import { useState } from 'react';
import { CloudUpload } from 'lucide-react';
import Footer from '@/components/Footer';
import RecentUploads from '@/components/RecentUploads';
import MetadataModal from '@/components/MetadataModal';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [fileEnter, setFileEnter] = useState(false);
  const [recentUploads, setRecentUploads] = useState([
    {
      name: 'example-image.jpg',
      uploadDate: '2025-01-16',
      metadata: { size: '2MB', type: 'image/jpeg'},
    },
    {
      name: 'document.pdf',
      uploadDate: '2025-01-14',
      metadata: { size: '1MB', type: 'application/pdf' },
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFileMetadata, setSelectedFileMetadata] = useState(null);

  const allowedFileTypes = [
    // Images
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/svg+xml',
    // Documents
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/csv',
    // Videos
    'video/mp4',
    'video/webm',
    'video/quicktime',
    // Audio
    'audio/mpeg',
    'audio/wav',
    'audio/ogg',
    // Compressed Files
    'application/zip',
    'application/x-tar',
    'application/gzip',
  ];
  
  const validateFileType = (file) => {
    return allowedFileTypes.includes(file.type);
  };
  
  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      if (!validateFileType(uploadedFile)) {
        alert('Unsupported file type. Please upload a valid file.');
        return;
      }
      const newFile = {
        name: uploadedFile.name,
        uploadDate: new Date().toLocaleDateString(),
        metadata: { size: (uploadedFile.size / 1024 / 1024).toFixed(2) + ' MB', type: uploadedFile.type },
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
      if (!validateFileType(droppedFile)) {
        alert('Unsupported file type. Please upload a valid file.');
        return;
      }
      const newFile = {
        name: droppedFile.name,
        uploadDate: new Date().toLocaleDateString(),
        metadata: { size: (droppedFile.size / 1024 / 1024).toFixed(2) + ' MB', type: droppedFile.type },
      };
      setRecentUploads([newFile, ...recentUploads]);
      setFile(droppedFile);
    }
  };
  

  const handleMetadataClick = (upload) => {
    setSelectedFileMetadata(upload);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
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
          <RecentUploads
            uploads={recentUploads}
            onMetadataClick={handleMetadataClick}
            onDelete={(file) => console.log('Delete:', file)}
            onDownload={(file) => console.log('Download:', file)}
          />
          <MetadataModal
            isOpen={isModalOpen}
            fileMetadata={selectedFileMetadata}
            onClose={handleModalClose}
          />
        </div>
        </div>
      <Footer />
    </>
  );
};

export default Upload;
