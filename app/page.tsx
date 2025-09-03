"use client";

import { useState, useRef } from "react";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import UploadSection from "./components/UploadSection";
import ImagePreview from "./components/ImagePreview";
import PlantResults from "./components/PlantResults";
import FeaturesSection from "./components/FeaturesSection";

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

export default function PlantIdentifier() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [plantInfo, setPlantInfo] = useState<PlantInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setPlantInfo(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const identifyPlant = async () => {
    if (!selectedImage) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/identify-plant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: selectedImage,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to identify plant");
      }

      const data = await response.json();
      setPlantInfo(data);
    } catch (err) {
      setError("Failed to identify the plant. Please try again.");
      console.error("Error identifying plant:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const resetUpload = () => {
    setSelectedImage(null);
    setPlantInfo(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-full mb-6">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v6a4 4 0 004 4h4V5z"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Plant Identifier
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload a photo of any plant and discover its name, care
            instructions, and interesting facts powered by AI
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {!selectedImage ? (
            <UploadSection
              fileInputRef={fileInputRef}
              handleImageUpload={handleImageUpload}
            />
          ) : (
            <div className="grid lg:grid-cols-2 gap-8">
              <ImagePreview
                selectedImage={selectedImage}
                resetUpload={resetUpload}
                identifyPlant={identifyPlant}
                isLoading={isLoading}
                hasPlantInfo={!!plantInfo}
              />
              <PlantResults
                isLoading={isLoading}
                error={error}
                plantInfo={plantInfo}
                identifyPlant={identifyPlant}
              />
            </div>
          )}
        </div>

        <FeaturesSection />
      </div>

      <Footer />
    </div>
  );
}
