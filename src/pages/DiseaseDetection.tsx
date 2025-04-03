
import { useState, useRef } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Camera, Upload, X, Loader2, AlertTriangle } from 'lucide-react';

interface DetectionResult {
  disease: string;
  confidence: number;
  description: string;
  treatment: string[];
  severity: 'low' | 'medium' | 'high';
}

const DiseaseDetection = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    } else {
      toast({
        title: "Invalid File",
        description: "Please upload an image file (JPEG, PNG, etc.)",
        variant: "destructive",
      });
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAnalyze = () => {
    if (!selectedImage) return;
    
    setIsLoading(true);
    
    // Simulate API call to disease detection service
    setTimeout(() => {
      setIsLoading(false);
      
      // Mock result
      setResult({
        disease: 'Tomato Late Blight',
        confidence: 94,
        description: 'Late blight is a disease of tomato and potato plants that is caused by the fungus-like organism Phytophthora infestans. It spreads quickly in warm, humid conditions.',
        treatment: [
          'Remove and destroy infected plant parts',
          'Apply copper-based fungicide every 7-10 days',
          'Improve air circulation around plants',
          'Avoid overhead watering'
        ],
        severity: 'medium'
      });
      
      toast({
        title: "Analysis Complete",
        description: "We've detected the crop disease. See results below.",
      });
    }, 2000);
  };
  
  const captureImage = () => {
    // This would typically launch the device camera
    // For demo, we'll just simulate it
    toast({
      title: "Camera Feature",
      description: "In a full implementation, this would access your device camera.",
    });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low':
        return 'bg-yellow-500';
      case 'medium':
        return 'bg-orange-500';
      case 'high':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Crop Disease Detection</h1>
            <p className="text-xl text-gray-600">
              Upload an image of your crop to detect diseases and get treatment recommendations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <Card>
                <CardContent className="p-6">
                  <div
                    className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center h-64 cursor-pointer transition-colors ${
                      isDragging ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-primary-400'
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {selectedImage ? (
                      <div className="relative w-full h-full">
                        <img
                          src={selectedImage}
                          alt="Crop"
                          className="w-full h-full object-contain"
                        />
                        <button
                          className="absolute top-2 right-2 bg-red-100 rounded-full p-1 hover:bg-red-200"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveImage();
                          }}
                        >
                          <X className="h-5 w-5 text-red-600" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <Upload className="h-12 w-12 text-gray-400 mb-4" />
                        <p className="text-gray-600 text-center mb-2">
                          Drag and drop an image here, or click to browse
                        </p>
                        <p className="text-gray-500 text-sm text-center">
                          Supports JPEG, PNG (max 10MB)
                        </p>
                      </>
                    )}
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  
                  <div className="flex space-x-4 mt-4">
                    <Button
                      className="w-full bg-primary-600 hover:bg-primary-700 flex items-center justify-center"
                      onClick={handleAnalyze}
                      disabled={!selectedImage || isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        'Analyze Image'
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      className="w-1/3 flex items-center justify-center"
                      onClick={captureImage}
                    >
                      <Camera className="mr-2 h-4 w-4" />
                      Camera
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              {result ? (
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <h3 className="text-xl font-semibold text-gray-900 mr-3">{result.disease}</h3>
                      <div className={`px-2 py-1 rounded text-white text-xs font-medium ${getSeverityColor(result.severity)}`}>
                        {result.severity.charAt(0).toUpperCase() + result.severity.slice(1)} Severity
                      </div>
                    </div>
                    
                    <div className="flex items-center mb-4">
                      <div className="bg-gray-200 h-2 rounded-full w-32 mr-2">
                        <div 
                          className="h-2 rounded-full bg-primary-600" 
                          style={{ width: `${result.confidence}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{result.confidence}% confidence</span>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">Description:</h4>
                      <p className="text-gray-700">{result.description}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Treatment Recommendations:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {result.treatment.map((item, i) => (
                          <li key={i} className="text-gray-700">{item}</li>
                        ))}
                      </ul>
                    </div>
                    
                    {result.severity === 'high' && (
                      <div className="mt-4 bg-red-50 p-4 rounded-lg flex items-start">
                        <AlertTriangle className="h-5 w-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                        <p className="text-red-700 text-sm">
                          This disease is highly severe and requires immediate action. 
                          Consider consulting an agricultural expert for additional guidance.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 bg-gray-50 rounded-lg border border-gray-200">
                  <img src="/placeholder.svg" alt="Disease Detection" className="w-32 h-32 mb-4 opacity-30" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Disease Detected Yet</h3>
                  <p className="text-gray-600">
                    Upload an image of your crop and click "Analyze Image" to detect diseases and get treatment recommendations.
                  </p>
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="bg-primary-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload className="h-6 w-6 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Image</h3>
                  <p className="text-gray-600">
                    Take a clear photo of the affected part of your crop and upload it to our system.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="bg-primary-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Analysis</h3>
                  <p className="text-gray-600">
                    Our AI model analyzes the image to identify the disease, its severity, and confidence level.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="bg-primary-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Get Treatment</h3>
                  <p className="text-gray-600">
                    Receive detailed information about the disease and specific treatment recommendations.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DiseaseDetection;
