import { Info, Trash2, Download, ArrowRight, FileImage, FileText, FileVideo, FileMusic, FileArchive, File } from 'lucide-react';

const getFileIcon = (fileType) => {
  if (fileType.startsWith('image')) {
    return <FileImage className="w-7 h-7 object-cover text-[#f74b25ff]" />;
  } else if (fileType === 'application/pdf' || fileType.includes('word') || fileType === 'text/plain' || fileType.includes('excel')) {
    return <FileText className="w-7 h-7 object-cover text-[#f74b25ff]" />;
  } else if (fileType.startsWith('video')) {
    return <FileVideo className="w-7 h-7 object-cover text-[#f74b25ff]" />;
  } else if (fileType.startsWith('audio')) {
    return <FileMusic className="w-7 h-7 object-cover text-[#f74b25ff]" />;
  } else if (fileType === 'application/zip' || fileType.includes('tar')) {
    return <FileArchive className="w-7 h-7 object-cover text-[#f74b25ff]" />;
  } else {
    return <File className="w-7 h-7 object-cover text-[#f74b25ff]" />;
  }
};

const handleDownload = (upload) => {
  const dataStr = JSON.stringify(upload, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = window.URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${upload.filename}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

export default function FileList({ files, onDelete, onMetadataClick }) {
  const handleDelete = async (upload) => {
    if (!onDelete) {
      console.error("onDelete function is not defined.");
      return;
    }
  
    const confirmDelete = window.confirm("Are you sure you want to delete this file?");
    if (confirmDelete) {
      try {
        const response = await fetch(`/api/deleteFile?id=${upload._id}`, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          onDelete(upload); // Call onDelete to update UI
        } else {
          console.error("Failed to delete the file");
        }
      } catch (error) {
        console.error("Error deleting the file:", error);
      }
    }
  };


  return (
    <div className="bg-[#fefefa] rounded-xl shadow-md p-6">
      <table className="w-full text-left table-auto">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">File Name</th>
            <th className="py-2 px-4 border-b">Upload Date</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file) => (
            <tr key={file._id}>
              <td className="py-2 px-4 border-b">{file.filename}</td>
              <td className="py-2 px-4 border-b">
                {new Date(file.uploadDate).toLocaleDateString()}
              </td>
              <td className="py-2 px-4 border-b flex items-center space-x-4 justify-end w-1/3">
              <button
                className="p-2 bg-[#4CBB17] text-white rounded hover:bg-[#2E8B57]"
                aria-label="View Metadata"
                onClick={() => onMetadataClick(file)}
              >
                <Info className="w-5 h-5" />
              </button>
              <button
                className="p-2 bg-[#FF4433] text-white rounded hover:bg-[#D22B2B]"
                aria-label="Delete File"
                onClick={() => handleDelete(file)}
              >
                <Trash2 className="w-5 h-5" />
              </button>
              <button
                className="p-2 bg-[#4169E1] text-white rounded hover:bg-[#0F52BA]"
                aria-label="Download File"
                onClick={() => handleDownload(file)}
              >
                <Download className="w-5 h-5" />
              </button>
              </td> 
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}