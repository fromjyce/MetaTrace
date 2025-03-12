import Navbar from '@/components/Navbar';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { CloudUpload } from 'lucide-react';
import Footer from '@/components/Footer';
import RecentUploads from '@/components/RecentUploads';
import MetadataModal from '@/components/MetadataModal';
import { useRouter } from 'next/router';
import MetadataAndRecommendations from '@/components/MetadataRecommendations';

const Upload = () => {
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [fileEnter, setFileEnter] = useState(false);
  const [recentUploads, setRecentUploads] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFileMetadata, setSelectedFileMetadata] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showMetadata, setShowMetadata] = useState(false);
  const [recentUploadMetadata, setRecentUploadMetadata] = useState(null);

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

  useEffect(() => {
    fetchUserEmail();
  }, []);

  useEffect(() => {
    if (userEmail) {
      fetchUploadedFiles();
    }
  }, [userEmail]);

  const fetchUserEmail = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
  
    try {
      const response = await fetch('/api/auth/profile', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch user profile');
      }
  
      const userData = await response.json();
      setUserEmail(userData.email);
    } catch (error) {
      router.push('/login');
    }
  };

  const validateFileType = (file) => {
    return allowedFileTypes.includes(file.type);
  };

  const fetchUploadedFiles = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/upload?email=${encodeURIComponent(userEmail)}`);
      const data = await response.json();
      
      if (response.ok) {
        const sortedFiles = data.files.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        const top5Files = sortedFiles.slice(0, 5);
        
        setRecentUploads(top5Files || []);
      } else {
        console.error("❌ Fetch error:", data.message);
      }
    } catch (error) {
      console.error("❌ Error fetching files:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = async (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      if (!validateFileType(uploadedFile)) {
        alert("Unsupported file type. Please upload a valid file.");
        return;
      }
  
      const formData = new FormData();
      formData.append("file", uploadedFile);
      formData.append("email", userEmail);
  
      setUploading(true);
  
      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
  
        const data = await response.json();
  
        if (!response.ok) throw new Error(data.message || 'Upload failed');
        setSelectedFileMetadata({
          ...data.metadata,
          filename: uploadedFile.name,
        });
        setShowMetadata(true);
        fetchUploadedFiles();
        setFile(uploadedFile);
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("Upload failed. Please try again.");
      } finally {
        setUploading(false);
      }
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
      handleFileChange({ target: { files: e.dataTransfer.files } });
    }
  };

  const handleMetadataClick = (upload) => {
    setRecentUploadMetadata(upload);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleDelete = (deletedUpload) => {
    setRecentUploads((prevUploads) => prevUploads.filter((upload) => upload._id !== deletedUpload._id));
  };

  const handleModDelete = async (deletedUpload) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this file?');
    if (confirmDelete) {
      try {
        const response = await fetch(`/api/deleteFile?id=${deletedUpload._id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          console.error('Failed to delete the file');
        }
        setRecentUploads((prevUploads) => prevUploads.filter((upload) => upload._id !== deletedUpload._id));
        handleModalClose();
      } catch (error) {
        console.error('Error deleting file:', error);
        alert('❌ Failed to delete file. Please try again.');
      }
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
            {showMetadata ? (
              <MetadataAndRecommendations
              metadata={selectedFileMetadata}
              onBackToUpload={() => setShowMetadata(false)}
            />
            ) : (
              <div className="upload-container">
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
              </div>
            )}
    
            <RecentUploads
              uploads={recentUploads}
              onMetadataClick={handleMetadataClick}
              onDelete={handleDelete}
              loading={loading}
            />
            <MetadataModal
              isOpen={isModalOpen}
              fileMetadata={recentUploadMetadata}
              onClose={handleModalClose}
              onDelete={handleModDelete}
            />
          </div>
        </div>
        <Footer />
      </>
    );
};

export default Upload;