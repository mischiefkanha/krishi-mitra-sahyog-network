import { useState, useRef } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { Camera, Upload, AlertTriangle, Download, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { generateDiseaseDetectionReport } from '@/utils/pdfGenerator';

interface DiseaseDetectionResult {
  diseaseName: string;
  confidence: number;
  description: string;
  treatment: string[];
  severity: string;
}

const DiseaseDetection = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DiseaseDetectionResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { user } = useAuth();
  const { t } = useLanguage();
  
  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        processImageFile(file);
      } else {
        toast({
          title: "Invalid File Type",
          description: "Please upload an image file.",
          variant: "destructive"
        });
      }
    }
  };

  const captureImage = () => {
    if (!('mediaDevices' in navigator) || !('getUserMedia' in navigator.mediaDevices)) {
      toast({
        title: "Camera Not Supported",
        description: "Your browser does not support camera access.",
        variant: "destructive"
      });
      return;
    }
    
    const video = document.createElement('video');
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
      .then(stream => {
        const modal = document.createElement('div');
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        modal.style.zIndex = '1000';
        modal.style.display = 'flex';
        modal.style.flexDirection = 'column';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
        
        video.srcObject = stream;
        video.style.maxWidth = '100%';
        video.style.maxHeight = '70vh';
        video.style.transform = 'scaleX(-1)';
        video.play();
        
        const buttonContainer = document.createElement('div');
        buttonContainer.style.marginTop = '20px';
        buttonContainer.style.display = 'flex';
        buttonContainer.style.gap = '10px';
        
        const captureBtn = document.createElement('button');
        captureBtn.textContent = 'Capture';
        captureBtn.style.padding = '10px 20px';
        captureBtn.style.backgroundColor = '#4CAF50';
        captureBtn.style.border = 'none';
        captureBtn.style.color = 'white';
        captureBtn.style.borderRadius = '5px';
        captureBtn.style.cursor = 'pointer';
        
        const cancelBtn = document.createElement('button');
        cancelBtn.textContent = 'Cancel';
        cancelBtn.style.padding = '10px 20px';
        cancelBtn.style.backgroundColor = '#f44336';
        cancelBtn.style.border = 'none';
        cancelBtn.style.color = 'white';
        cancelBtn.style.borderRadius = '5px';
        cancelBtn.style.cursor = 'pointer';
        
        buttonContainer.appendChild(captureBtn);
        buttonContainer.appendChild(cancelBtn);
        
        modal.appendChild(video);
        modal.appendChild(buttonContainer);
        document.body.appendChild(modal);
        
        const cleanup = () => {
          const tracks = stream.getTracks();
          tracks.forEach(track => track.stop());
          document.body.removeChild(modal);
        };
        
        captureBtn.onclick = () => {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          
          if (context) {
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
          }
          
          const imageDataUrl = canvas.toDataURL('image/jpeg');
          setSelectedImage(imageDataUrl);
          
          cleanup();
          
          canvas.toBlob((blob) => {
            if (blob) {
              const file = new File([blob], "captured-image.jpg", { type: "image/jpeg" });
              processImageFile(file);
            }
          }, 'image/jpeg', 0.8);
        };
        
        cancelBtn.onclick = cleanup;
      })
      .catch(error => {
        console.error('Camera access error:', error);
        toast({
          title: "Camera Access Error",
          description: "Could not access camera. Please check permissions.",
          variant: "destructive"
        });
      });
  };

  const processImageFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid File Type",
        description: "Please upload an image file.",
        variant: "destructive"
      });
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
    
    detectDisease(file);
  };

  const detectDisease = async (file: File) => {
    setLoading(true);
    setResult(null);
    
    try {
      const base64Image = await fileToBase64(file);
      
      const { data, error } = await supabase.functions.invoke('disease-detection', {
        body: { imageBase64: base64Image }
      });
      
      if (error) throw error;
      
      setResult(data);
      
      if (user) {
        await supabase.from('disease_detections').insert({
          user_id: user.id,
          disease_name: data.diseaseName,
          confidence: data.confidence,
          image_path: file.name
        });
      }
      
      toast({
        title: data.diseaseName === "Healthy Plant" ? "Good News!" : "Disease Detected",
        description: data.diseaseName === "Healthy Plant" 
          ? "Your plant appears to be healthy." 
          : `We've detected ${data.diseaseName} with ${(data.confidence * 100).toFixed(1)}% confidence.`,
      });
    } catch (error: any) {
      console.error('Error detecting disease:', error);
      toast({
        title: "Error",
        description: error.message || "There was a problem detecting plant disease. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high':
        return 'bg-red-500 hover:bg-red-600';
      case 'medium':
        return 'bg-amber-500 hover:bg-amber-600';
      case 'low':
        return 'bg-green-500 hover:bg-green-600';
      default:
        return 'bg-blue-500 hover:bg-blue-600';
    }
  };

  const handleDownloadReport = async () => {
    if (!result || !selectedImage) return;
    
    try {
      const reportData = [{
        id: 'current',
        disease_name: result.diseaseName,
        confidence: result.confidence,
        timestamp: new Date().toISOString(),
        image: selectedImage
      }];
      
      await generateDiseaseDetectionReport(reportData);
      
      toast({
        title: "Report Generated",
        description: "Your disease detection report has been downloaded.",
      });
    } catch (error) {
      console.error("Error generating report:", error);
      toast({
        title: "Error",
        description: "Failed to generate report. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-primary-900 dark:text-primary-400 mb-6">
          {t('diseaseDetection')}
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('uploadImage')}</CardTitle>
              <CardDescription>
                {t('diseaseDetectionDesc')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                ref={fileInputRef}
                className="hidden"
              />
              
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center ${
                  dragging ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'border-muted-foreground/25'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {selectedImage ? (
                  <div className="space-y-4">
                    <img
                      src={selectedImage}
                      alt="Selected plant"
                      className="max-h-80 mx-auto rounded-lg"
                    />
                    <Button onClick={() => {
                      setSelectedImage(null);
                      setResult(null);
                      if (fileInputRef.current) {
                        fileInputRef.current.value = '';
                      }
                    }} variant="outline">
                      {t('changeImage')}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      {t('dragDropImage')}
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                      <Button
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-2"
                      >
                        <Upload className="h-4 w-4" />
                        {t('browse')}
                      </Button>
                      <Button
                        onClick={captureImage}
                        variant="outline"
                        className="flex items-center gap-2"
                      >
                        <Camera className="h-4 w-4" />
                        {t('takePhoto')}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              
              {loading && (
                <div className="mt-6 space-y-2">
                  <p className="text-center text-sm">{t('analyzingImage')}</p>
                  <Progress value={undefined} className="h-2 w-full" />
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>{t('results')}</CardTitle>
              <CardDescription>
                {result ? t('detectionResults') : t('uploadImageForResults')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {result ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">{result.diseaseName}</h3>
                    <Badge 
                      className={getSeverityColor(result.severity)}
                    >
                      {result.severity === 'low' && result.diseaseName !== 'Healthy Plant' 
                        ? t('earlyStageSeverity')
                        : result.severity === 'medium'
                        ? t('moderateSeverity')
                        : result.severity === 'high'
                        ? t('severeSeverity')
                        : t('healthySeverity')
                      }
                    </Badge>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between text-sm">
                      <span>{t('confidence')}</span>
                      <span>{(result.confidence * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-muted h-2 rounded-full mt-1">
                      <div 
                        className="bg-primary-600 h-2 rounded-full" 
                        style={{ width: `${result.confidence * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="bg-muted p-4 rounded-md">
                    <h4 className="font-medium mb-2">{t('description')}</h4>
                    <p className="text-sm">{result.description}</p>
                  </div>
                  
                  {result.treatment.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">{t('recommendedTreatment')}</h4>
                      <ul className="list-disc list-inside text-sm space-y-1">
                        {result.treatment.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {result.diseaseName !== "Healthy Plant" && (
                    <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-md flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <p className="text-sm">
                        {t('consultExpertAdvice')}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    {t('uploadImageToSeeResults')}
                  </p>
                </div>
              )}
            </CardContent>
            {result && (
              <CardFooter>
                <Button 
                  onClick={handleDownloadReport} 
                  className="w-full flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  {t('downloadReport')}
                </Button>
              </CardFooter>
            )}
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default DiseaseDetection;
