const MetadataAndRecommendations = ({ metadata, onBackToUpload }) => {
  console.log("Metadata in Container:", metadata); // Debugging: Log the metadata

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-[#1b1b1cff] epilogue">
          File Analysis for {metadata?.filename || "File"}
        </h3>
        <button
          onClick={onBackToUpload}
          className="p-2 bg-[#f74b25ff] text-white rounded-lg hover:bg-[#d22b2b] transition-colors"
        >
          Upload Another File
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Half: Metadata */}
        <div className="bg-[#f7f7f7ff] p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-4 epilogue">Metadata</h4>
          <pre className="text-sm text-gray-700 poppins whitespace-pre-wrap break-words">
            {JSON.stringify(metadata, null, 2)}
          </pre>
        </div>

        {/* Right Half: AI Recommendations */}
        <div className="bg-[#f7f7f7ff] p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-4 epilogue">AI Recommendations</h4>
          <p className="text-sm text-gray-700 poppins">
            AI recommendations will be displayed here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MetadataAndRecommendations;