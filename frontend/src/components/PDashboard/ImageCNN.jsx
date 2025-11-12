import React, { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import {
  Camera,
  Upload,
  Loader2,
  Sparkles,
  X,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import Webcam from "react-webcam";
import axios from "axios";

export default function ImageAnalyzer() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [showCamera, setShowCamera] = useState(false);

  const fileInputRef = useRef(null);
  const webcamRef = useRef(null);
  const cameraInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
      setAnalysisResult(null);
    }
  };
  // Handle mobile Camera
  const handleCameraCapture = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
      setAnalysisResult(null);
    }
  };

  // Handle desktop Camera
  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    fetch(imageSrc)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], "camera.jpg", { type: "image/jpeg" });
        setSelectedImage(file);
        setImagePreview(imageSrc);
        setShowCamera(false);
      });
  };

  // ---- Connect to HF Flask Backend ----
  const analyzeImage = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    setAnalysisResult(null);

    const formData = new FormData();
    formData.append("file", selectedImage);

    try {
     const response = await axios.post(
      "https://suhassgowda-PD-CNN-ML.hf.space/predict",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    
    const { prediction, probability, overlay_url } = response.data;
    const formattedResult = `Prediction: ${prediction}\nProbability: ${(probability * 100).toFixed(2)}%`;
      setAnalysisResult({
      text: formattedResult,
      overlay_url: overlay_url || null,
      prediction,
    });
  } catch (error) {
    console.error("Error analyzing image:", error);
    setAnalysisResult({
      text: "Error: Unable to analyze image. Please try again later.",
      overlay_url: null,
    });
  } finally {
    setIsAnalyzing(false);
  }
};

  const handleClear = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setAnalysisResult(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (cameraInputRef.current) cameraInputRef.current.value = "";
  };

 const getRiskBadge = () => {
  if (!analysisResult || !analysisResult.prediction) return null;

  const pred = analysisResult.prediction.toLowerCase();

  if (pred.includes("parkinson")) {
    return (
      <Badge className="bg-red-100 text-red-700">
        <AlertCircle className="w-3 h-3 mr-1" /> Parkinson's Detected
      </Badge>
    );
  } else {
    return (
      <Badge className="bg-green-100 text-green-700">
        <CheckCircle className="w-3 h-3 mr-1" /> Healthy
      </Badge>
    );
  }
};

  return (
    <Card className="border-none shadow-xl bg-gradient-to-br from-blue-50 to-purple-50">
      <CardHeader className="border-b border-slate-200 pb-4">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Sparkles className="w-6 h-6 text-purple-600" />
          Parkinson's Disease Screening Tool
        </CardTitle>
        <p className="text-sm text-slate-600 mt-1">
          AI-powered analysis using image upload
        </p>
      </CardHeader>

      <CardContent className="p-6">
        {showCamera ? (
          <div className="flex flex-col items-center gap-4">
            <Webcam
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={{
                facingMode: "environment", // back camera on mobile
              }}
              className="rounded-lg shadow-lg max-w-full"
            />
            <div className="flex gap-3">
              <Button onClick={capturePhoto} className="bg-green-600">
                Capture
              </Button>
              <Button
                onClick={() => setShowCamera(false)}
                variant="outline"
                className="border-slate-300"
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
        <>
        {!imagePreview && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              onClick={() => fileInputRef.current?.click()}
              className="h-32 bg-blue-700 text-white flex flex-col gap-2 shadow-lg"
            >
              <Upload className="w-8 h-8" /> Upload Photo
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />

            <Button
              onClick={() => cameraInputRef.current?.click()}
              className="h-32 bg-purple-700 text-white flex flex-col gap-2 shadow-lg"
            >
              <Camera className="w-8 h-8" /> Take Photo
            </Button>
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleCameraCapture}
              className="hidden"
            />
          </div>
        )}

        {imagePreview && (
          <div className="space-y-4 mt-4">
            <div className="relative bg-white p-4 rounded-lg shadow">
              <Button
                onClick={handleClear}
                variant="outline"
                size="sm"
                className="absolute top-4 right-4"
              >
                <X className="w-4 h-4 mr-1" /> Clear
              </Button>
              <img
                src={imagePreview}
                alt="Selected"
                className="max-h-96 mx-auto rounded-lg"
              />
            </div>

            {!analysisResult && (
              <Button
                onClick={analyzeImage}
                disabled={isAnalyzing}
                className="w-full h-14 bg-green-600 hover:bg-green-700 text-lg"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" /> Analyze Image
                  </>
                )}
              </Button>
            )}
          </div>
        )}
        </>
        )}

        {/* Analysis Result */}
         {analysisResult && (
          <div className="bg-white rounded-xl p-6 shadow-lg mt-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Analysis Complete</h3>
                  <p className="text-sm text-slate-600">Image Analysis</p>
                </div>
              </div>
              {getRiskBadge()}
            </div>

            <div className="text-slate-700 whitespace-pre-wrap leading-relaxed">
              {analysisResult.text}
            </div>

            {analysisResult.overlay_url && (
              <div className="mt-4 text-center">
                <p className="text-sm text-slate-600 mb-2">Grad-CAM Visualization:</p>
                <img
                  src={analysisResult.overlay_url}
                  alt="Model heatmap overlay"
                  className="max-h-80 rounded-lg mx-auto shadow-md"
                />
              </div>
            )}

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mt-4">
              <p className="text-xs text-slate-600">
                <strong>Disclaimer:</strong> This AI-powered screening tool is a
                demo and does not replace medical diagnosis. Consult a neurologist for
                clinical evaluation.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}