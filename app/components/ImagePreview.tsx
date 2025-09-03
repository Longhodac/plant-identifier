import Image from "next/image";

interface ImagePreviewProps {
  selectedImage: string;
  resetUpload: () => void;
  identifyPlant: () => void;
  isLoading: boolean;
  hasPlantInfo: boolean;
}

export default function ImagePreview({
  selectedImage,
  resetUpload,
  identifyPlant,
  isLoading,
  hasPlantInfo,
}: ImagePreviewProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">Uploaded Image</h3>
        <button
          onClick={resetUpload}
          className="text-red-500 hover:text-red-700 text-sm font-medium"
        >
          Remove
        </button>
      </div>
      <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
        <Image
          src={selectedImage}
          alt="Plant to identify"
          fill
          className="object-cover"
        />
      </div>
      {!hasPlantInfo && !isLoading && (
        <button
          onClick={identifyPlant}
          className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition-colors"
        >
          Identify Plant
        </button>
      )}
    </div>
  );
}
