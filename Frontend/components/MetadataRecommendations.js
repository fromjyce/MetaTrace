import { Upload, FolderSearch, List, BrainCog, Smile, Frown } from "lucide-react";
import { useState, useEffect } from 'react';
import AILoader from "./AILoader";

const MetadataAndRecommendations = ({ metadata, onBackToUpload }) => {
  const [aiRecommendations, setAiRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (metadata) {
      fetchRecommendations();
    }
  }, [metadata]);

  const fetchRecommendations = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://metatrace.onrender.com/recommend/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(metadata),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch recommendations');
      }

      const data = await response.json();
      setAiRecommendations(data);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <FolderSearch className="w-6 h-6 mr-2 text-[#ef4d31ff] text-2xl" />
          <h3 className="text-2xl font-bold text-[#1b1b1cff] epilogue">
            File Analysis for <span className="text-[#ef4d31ff]">{metadata?.filename || "File"}</span>
          </h3>
        </div>
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
          <div className="flex items-center mb-4">
            <List className="w-5 h-5 mr-2 text-[#ef4d31ff]" />
            <h4 className="text-lg font-bold epilogue">Metadata</h4>
          </div>
          <div className="overflow-y-auto max-h-80">
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
          <div className="flex items-center mb-4">
            <BrainCog className="w-5 h-5 mr-2 text-[#ef4d31ff]" />
            <h4 className="text-lg font-bold epilogue">AI Recommendations</h4>
          </div>
          <div className="overflow-y-auto max-h-80">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <AILoader />
              </div>
            ) : aiRecommendations ? (
              <div className="flex flex-col items-center justify-center text-center">
                {aiRecommendations.anomaly_detected ? (
                  <Frown className="w-16 h-16 text-[#ef4d31ff] mb-4" />
                ) : (
                  <Smile className="w-16 h-16 text-[#4CBB17] mb-4" />
                )}
                <p className="text-sm text-[#000000] poppins mb-4">
                  <strong>{aiRecommendations.reason}</strong>
                </p>
                {aiRecommendations.anomaly_detected ? (
                  <>
                    <p className="text-sm text-[#000000] poppins mb-2">
                      <strong>Recommendations</strong>
                    </p>
                    <ul className="text-sm text-gray-700 poppins">
                      {(aiRecommendations.recommendations || []).map((rec, index) => (
                        <li key={index}>{rec}</li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <>
                    <p className="text-sm text-[#000000] poppins mb-2">
                      <strong>Best Practices</strong>
                    </p>
                    <ul className="text-sm text-gray-700 poppins">
                      {(aiRecommendations.best_practices || []).map((practice, index) => (
                        <li key={index}>{practice}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            ) : (
              <p className="text-sm text-gray-700 poppins">No recommendations available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetadataAndRecommendations;