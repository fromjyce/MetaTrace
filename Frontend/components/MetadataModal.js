import { X, Copy, Trash2, Download } from 'lucide-react';

const MetadataModal = ({ isOpen, fileMetadata, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#f4f4f4] rounded-lg shadow-lg p-6 w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1 text-[#5e5e5eff] hover:text-[#1a1a1aff]"
        >
          <X className="w-5 h-5" />
        </button>
        <h3 className="text-lg text-[#1a1a1aff] text-center epilogue font-bold mb-4">
          Metadata of <span className="text-[#f74b25ff]">{fileMetadata?.name || 'N/A'}</span>
        </h3>
        <ul className="list-none text-sm poppins mb-8">
          {fileMetadata ? (
            <>
              <li className="mb-2">
                <span className="font-medium capitalize">Name:</span> {fileMetadata.name}
              </li>
              <li className="mb-2">
                <span className="font-medium capitalize">Upload Date:</span> {fileMetadata.uploadDate}
              </li>
              {fileMetadata.metadata ? (
                Object.entries(fileMetadata.metadata).map(([key, value]) => (
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
  );
};

export default MetadataModal;
