import { Upload } from "lucide-react";

const MetadataAndRecommendations = ({ metadata, onBackToUpload }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-[#1b1b1cff] epilogue">
          File Analysis for <span className="text-[#ef4d31ff]">{metadata?.filename || "File"}</span>
        </h3>
        <button
          onClick={onBackToUpload}
          className="p-3 rounded-lg hover:bg-[#D22B2B] bg-[#ef4d31ff] transition-colors flex items-center justify-center font-semibold epilogue"
        >
          <Upload className="w-5 h-5 mr-2 text-md text-[#000000]" />
          <span className='text-[#000000] text-md'>Upload</span>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#f7f7f7ff] p-4 rounded-lg">
          <h4 className="text-lg font-bold mb-4 epilogue">Meta<span className="text-[#ef4d31ff]">data</span></h4>
          <div className="overflow-y-auto max-h-96">
            <ul className="list-none text-sm poppins">
              {metadata ? (
                Object.entries(metadata).map(([key, value]) => (
                  <li className="mb-2 flex items-center" key={key}>
                    <span className="font-medium capitalize mr-2">{key}:</span>
                    <span className="whitespace-pre-wrap break-words">
                      {typeof value === "object" ? JSON.stringify(value, null, 2) : value}
                    </span>
                  </li>
                ))
              ) : (
                <li className="text-gray-500 poppins">No metadata available</li>
              )}
            </ul>
          </div>
        </div>
        <div className="bg-[#f7f7f7ff] p-4 rounded-lg">
          <h4 className="text-lg font-bold mb-4 epilogue">AI <span className="text-[#ef4d31ff]">Recommendations</span></h4>
          <div className="overflow-y-auto max-h-96">
            <p className="text-sm text-gray-700 poppins">
              AI recommendations will be displayed here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetadataAndRecommendations;