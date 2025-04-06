
import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';

interface TestResult {
  status: 'success' | 'error' | 'loading' | 'idle';
  message: string;
  response?: any;
}

const TestBackend = () => {
  const { user, signIn, signUp, signOut } = useAuth();
  const { toast } = useToast();
  const [cropResult, setCropResult] = useState<TestResult>({ status: 'idle', message: 'Not tested' });
  const [diseaseResult, setDiseaseResult] = useState<TestResult>({ status: 'idle', message: 'Not tested' });
  const [chatResult, setChatResult] = useState<TestResult>({ status: 'idle', message: 'Not tested' });
  const [authResult, setAuthResult] = useState<TestResult>({ status: 'idle', message: 'Not tested' });
  const [testImage, setTestImage] = useState<string | null>(null);
  
  // Generate a sample test image using a placeholder
  useEffect(() => {
    // This creates a simple canvas with a red spot that could represent a diseased area
    const canvas = document.createElement('canvas');
    canvas.width = 300;
    canvas.height = 300;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Green background (healthy leaf)
      ctx.fillStyle = '#4CAF50';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Red spots (disease)
      ctx.fillStyle = '#FF5722';
      ctx.beginPath();
      ctx.arc(150, 150, 50, 0, 2 * Math.PI);
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(100, 100, 30, 0, 2 * Math.PI);
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(200, 80, 25, 0, 2 * Math.PI);
      ctx.fill();
      
      setTestImage(canvas.toDataURL('image/png'));
    }
  }, []);

  const testCropRecommendation = async () => {
    setCropResult({ status: 'loading', message: 'Testing crop recommendation API...' });
    
    try {
      const sampleData = {
        soilType: "loamy",
        nitrogen: 90,
        phosphorus: 40,
        potassium: 40,
        ph: 6.5,
        temperature: 28,
        humidity: 70,
        rainfall: 200
      };
      
      const { data, error } = await supabase.functions.invoke('crop-recommendation', {
        body: sampleData
      });
      
      if (error) throw error;
      
      setCropResult({
        status: 'success',
        message: `Successfully received crop recommendation: ${data.recommendedCrop}`,
        response: data
      });
      
      toast({
        title: "Crop Recommendation Test Successful",
        description: `Recommended crop: ${data.recommendedCrop}`,
      });
    } catch (error: any) {
      console.error("Crop recommendation test failed:", error);
      setCropResult({
        status: 'error',
        message: `Error: ${error.message || 'Unknown error'}`,
        response: error
      });
      
      toast({
        title: "Crop Recommendation Test Failed",
        description: error.message || "Unknown error occurred",
        variant: "destructive"
      });
    }
  };

  const testDiseaseDetection = async () => {
    if (!testImage) {
      toast({
        title: "Test Image Not Ready",
        description: "Please wait for the test image to be generated",
        variant: "destructive"
      });
      return;
    }
    
    setDiseaseResult({ status: 'loading', message: 'Testing disease detection API...' });
    
    try {
      const { data, error } = await supabase.functions.invoke('disease-detection', {
        body: { imageBase64: testImage }
      });
      
      if (error) throw error;
      
      setDiseaseResult({
        status: 'success',
        message: `Successfully detected disease: ${data.diseaseName}`,
        response: data
      });
      
      toast({
        title: "Disease Detection Test Successful",
        description: `Detected: ${data.diseaseName}`,
      });
    } catch (error: any) {
      console.error("Disease detection test failed:", error);
      setDiseaseResult({
        status: 'error',
        message: `Error: ${error.message || 'Unknown error'}`,
        response: error
      });
      
      toast({
        title: "Disease Detection Test Failed",
        description: error.message || "Unknown error occurred",
        variant: "destructive"
      });
    }
  };

  const testChatbot = async () => {
    setChatResult({ status: 'loading', message: 'Testing chatbot API...' });
    
    try {
      const testQuestion = "How to increase tomato yield?";
      
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: { message: testQuestion }
      });
      
      if (error) throw error;
      
      setChatResult({
        status: 'success',
        message: 'Successfully received chatbot response',
        response: data
      });
      
      toast({
        title: "Chatbot Test Successful",
        description: "AI responded with relevant information about tomato yields",
      });
    } catch (error: any) {
      console.error("Chatbot test failed:", error);
      setChatResult({
        status: 'error',
        message: `Error: ${error.message || 'Unknown error'}`,
        response: error
      });
      
      toast({
        title: "Chatbot Test Failed",
        description: error.message || "Unknown error occurred",
        variant: "destructive"
      });
    }
  };

  const testAuthentication = async () => {
    setAuthResult({ status: 'loading', message: 'Testing authentication...' });
    
    try {
      // Create a test user with a random email
      const testEmail = `test-user-${Math.floor(Math.random() * 10000)}@example.com`;
      const testPassword = "TestPassword123!";
      
      // Try to sign up
      const { error: signUpError } = await signUp(testEmail, testPassword);
      if (signUpError) {
        // If user might already exist, try logging in
        const { error: signInError } = await signIn(testEmail, testPassword);
        if (signInError) throw new Error(signInError.message || "Authentication failed");
      }
      
      // Check if we have a user object
      if (!user) {
        throw new Error("No user object after authentication");
      }
      
      setAuthResult({
        status: 'success',
        message: `Successfully authenticated as ${user.email}`,
        response: { user }
      });
      
      toast({
        title: "Authentication Test Successful",
        description: `Logged in as ${user.email}`,
      });
    } catch (error: any) {
      console.error("Authentication test failed:", error);
      setAuthResult({
        status: 'error',
        message: `Error: ${error.message || 'Unknown error'}`,
        response: error
      });
      
      toast({
        title: "Authentication Test Failed",
        description: error.message || "Unknown error occurred",
        variant: "destructive"
      });
    }
  };

  const formatResponse = (response: any) => {
    return (
      <pre className="bg-gray-100 p-4 rounded-md text-xs overflow-auto max-h-64">
        {JSON.stringify(response, null, 2)}
      </pre>
    );
  };

  const ResultCard = ({ result, title }: { result: TestResult, title: string }) => {
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {title}
            {result.status === 'success' && <CheckCircle2 className="text-green-500 h-5 w-5" />}
            {result.status === 'error' && <XCircle className="text-red-500 h-5 w-5" />}
            {result.status === 'loading' && <Loader2 className="animate-spin h-5 w-5" />}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <p className={`font-medium ${
              result.status === 'success' ? 'text-green-600' :
              result.status === 'error' ? 'text-red-600' :
              'text-gray-600'
            }`}>
              {result.message}
            </p>
          </div>
          {result.response && (
            <>
              <p className="text-sm font-medium mb-2">Response:</p>
              {formatResponse(result.response)}
            </>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Backend API Testing</h1>
        <p className="text-gray-600 mb-8">
          This page tests all backend endpoints to ensure they are working correctly.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Test Controls */}
          <div>
            <h2 className="text-xl font-bold mb-4">Run Tests</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <Button 
                      onClick={testCropRecommendation} 
                      disabled={cropResult.status === 'loading'}
                      className="w-full"
                    >
                      {cropResult.status === 'loading' ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Testing...
                        </>
                      ) : 'Test Crop Recommendation API'}
                    </Button>
                  </div>
                  
                  <div>
                    <Button 
                      onClick={testDiseaseDetection} 
                      disabled={diseaseResult.status === 'loading' || !testImage}
                      className="w-full"
                    >
                      {diseaseResult.status === 'loading' ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Testing...
                        </>
                      ) : 'Test Disease Detection API'}
                    </Button>
                  </div>
                  
                  <div>
                    <Button 
                      onClick={testChatbot} 
                      disabled={chatResult.status === 'loading'}
                      className="w-full"
                    >
                      {chatResult.status === 'loading' ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Testing...
                        </>
                      ) : 'Test Chatbot API'}
                    </Button>
                  </div>
                  
                  <div>
                    <Button 
                      onClick={testAuthentication} 
                      disabled={authResult.status === 'loading'}
                      className="w-full"
                    >
                      {authResult.status === 'loading' ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Testing...
                        </>
                      ) : 'Test Authentication'}
                    </Button>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div>
                    <Button 
                      onClick={() => {
                        testCropRecommendation();
                        setTimeout(testDiseaseDetection, 1000);
                        setTimeout(testChatbot, 2000);
                        setTimeout(testAuthentication, 3000);
                      }}
                      variant="outline"
                      className="w-full"
                    >
                      Run All Tests
                    </Button>
                  </div>
                </div>
                
                {testImage && (
                  <div className="mt-6">
                    <p className="text-sm font-medium mb-2">Test Image (for Disease Detection):</p>
                    <img 
                      src={testImage} 
                      alt="Test Plant Disease" 
                      className="w-full max-w-xs mx-auto border rounded-md"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Test Results */}
          <div>
            <h2 className="text-xl font-bold mb-4">Test Results</h2>
            <ResultCard result={cropResult} title="Crop Recommendation" />
            <ResultCard result={diseaseResult} title="Disease Detection" />
            <ResultCard result={chatResult} title="Chatbot" />
            <ResultCard result={authResult} title="Authentication" />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TestBackend;
