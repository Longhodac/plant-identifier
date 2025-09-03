interface PlantInfo {
  name: string;
  scientificName: string;
  family: string;
  description: string;
  careInstructions: string;
  sunlight: string;
  water: string;
  difficulty: string;
}

interface PlantResultsProps {
  isLoading: boolean;
  error: string | null;
  plantInfo: PlantInfo | null;
  identifyPlant: () => void;
}

export default function PlantResults({
  isLoading,
  error,
  plantInfo,
  identifyPlant,
}: PlantResultsProps) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="flex flex-col items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mb-4"></div>
          <p className="text-gray-600">Analyzing your plant...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  if (plantInfo) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {plantInfo.name}
            </h2>
            <p className="text-lg text-gray-600 italic">
              {plantInfo.scientificName}
            </p>
            <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mt-2">
              {plantInfo.family}
            </span>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Description
            </h3>
            <p className="text-gray-600">{plantInfo.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-medium text-yellow-800 mb-1">Sunlight</h4>
              <p className="text-sm text-yellow-700">{plantInfo.sunlight}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-1">Water</h4>
              <p className="text-sm text-blue-700">{plantInfo.water}</p>
            </div>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-medium text-purple-800 mb-1">
              Difficulty Level
            </h4>
            <p className="text-sm text-purple-700">{plantInfo.difficulty}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Care Instructions
            </h3>
            <p className="text-gray-600">{plantInfo.careInstructions}</p>
          </div>

          <button
            onClick={identifyPlant}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition-colors"
          >
            Re-identify Plant
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="flex flex-col items-center justify-center h-full text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-700 mb-2">
          Ready to Identify
        </h3>
        <p className="text-gray-500">
          Click "Identify Plant" to analyze your photo
        </p>
      </div>
    </div>
  );
}
