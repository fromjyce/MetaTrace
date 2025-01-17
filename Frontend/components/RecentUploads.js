import { Info, Trash2, Download, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const RecentUploads = ({ uploads, onMetadataClick, onDelete, onDownload }) => {
  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4 epilogue flex justify-between items-center">
              <span>
                Your Recent <span className="text-[#f74b25ff]">Uploads</span>
              </span>
              <Link href="/profile" passHref>
                <button className="flex items-center text-[#1b1b1c] text-sm font-semibold hover:text-[#f74b25ff]">
                  View More
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </Link>
    </h3>
      <div className="space-y-4 w-full">
        {uploads.map((upload, index) => (
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
                className="p-2 bg-[#4CBB17] text-white rounded hover:bg-[#2E8B57]"
                aria-label="View Metadata"
                onClick={() => onMetadataClick(upload)}
              >
                <Info className="w-5 h-5" />
              </button>
              <button
                className="p-2 bg-[#FF4433] text-white rounded hover:bg-[#D22B2B]"
                aria-label="Delete File"
                onClick={() => onDelete(upload)}
              >
                <Trash2 className="w-5 h-5" />
              </button>
              <button
                className="p-2 bg-[#4169E1] text-white rounded hover:bg-[#0F52BA]"
                aria-label="Download File"
                onClick={() => onDownload(upload)}
              >
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentUploads;
