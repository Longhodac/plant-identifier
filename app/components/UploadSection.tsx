import React from "react";

interface UploadSectionProps {
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function UploadSection({
  fileInputRef,
  handleImageUpload,
}: UploadSectionProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
      <div className="text-center">
        <div className="border-3 border-dashed border-green-300 rounded-xl p-12 hover:border-green-400 transition-colors">
          <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <svg
              className="w-12 h-12 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Upload Plant Photo
          </h3>
          <p className="text-gray-500 mb-6">
            Choose a clear photo of the plant you want to identify
          </p>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="bg-green-600 hover:bg-green-700 text-white font-medium px-8 py-3 rounded-lg transition-colors"
          >
            Select Image
          </button>
        </div>
      </div>
    </div>
  );
}
