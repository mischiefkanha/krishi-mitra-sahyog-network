import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, ThumbsUp } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

interface CropRecommendationResult {
  crop: string;
  confidence: number;
  description: string;
  suitable: boolean;
  tips: string[];
}

const cropDescriptions = {
  'rice': 'Rice is a staple food crop in India, requiring high rainfall and humidity.',
  'wheat': 'Wheat is a rabi crop that grows well in moderately cool environments.',
  'maize': 'Maize is an important cereal crop that thrives in well-drained soil and moderate temperatures.',
  'cotton': 'Cotton is a cash crop that thrives in warm weather and well-drained soil.',
  'sugarcane': 'Sugarcane is a tropical crop that requires hot and humid conditions.',
  'jute': 'Jute is a rain-fed crop that grows well in hot and humid climate.',
  'coffee': 'Coffee is a subtropical crop that prefers shade and humidity.',
  'coconut': 'Coconut grows well in coastal regions with sandy soil and high humidity.',
  'tea': 'Tea is grown in hilly regions with well-drained soil and cool temperatures.',
};

const getCropInfo = (crop: string) => {
  const lcCrop = crop.toLowerCase();
  
  const description = cropDescriptions[lcCrop as keyof typeof cropDescriptions] || 
    `${crop} is a crop that grows in specific conditions based on soil and climate factors.`;
  
  const tips = [
    `Optimal planting season for ${crop}`,
    `Ensure proper irrigation for ${crop}`,
    `Monitor for common pests that affect ${crop}`
  ];
  
  return {
    description,
    tips
  };
};

const CropRecommendation = () => {
  const [soilType, setSoilType] = useState('');
  const [soilpH, setSoilpH] = useState('');
  const [temperature, setTemperature] = useState('');
  const [humidity, setHumidity] = useState('');
  const [rainfall, setRainfall] = useState('');
  const [location, setLocation] = useState('');
  const [nitrogen, setNitrogen] = useState('');
  const [phosphorus, setPhosphorus] = useState('');
  const [potassium, setPotassium] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<CropRecommendationResult[]>([]);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Call our edge function
      const { data, error } = await supabase.functions.invoke('crop-recommendation', {
        body: {
          soilType,
          nitrogen: parseFloat(nitrogen),
          phosphorus: parseFloat(phosphorus),
          potassium: parseFloat(potassium),
          ph: parseFloat(soilpH),
          temperature: parseFloat(temperature),
          humidity: parseFloat(humidity),
          rainfall: parseFloat(rainfall)
        }
      });
      
      if (error) throw error;
      
      const recommendedCrop = data.recommendedCrop;
      const confidence = data.confidence;
      
      // Get crop info
      const { description, tips } = getCropInfo(recommendedCrop);
      
      // Create the result
      const newResults = [
        {
          crop: recommendedCrop,
          confidence: confidence * 100,
          description,
          suitable: true,
          tips
        }
      ];
      
      // Save to database
      if (user) {
        const { error: dbError } = await supabase
          .from('crop_recommendations')
          .insert({
            user_id: user.id,
            soil_type: soilType,
            nitrogen: parseFloat(nitrogen),
            phosphorus: parseFloat(phosphorus),
            potassium: parseFloat(potassium),
            ph: parseFloat(soilpH),
            temperature: parseFloat(temperature),
            humidity: parseFloat(humidity),
            rainfall: parseFloat(rainfall),
            recommended_crop: recommendedCrop,
            confidence: confidence
          });
        
        if (dbError) {
          console.error("Failed to save to database:", dbError);
        }
      }
      
      setResults(newResults);
      
      toast({
        title: "Recommendations Ready",
        description: "We've analyzed your data and prepared crop recommendations.",
      });
    } catch (error: any) {
      console.error("Error in crop recommendation:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to get crop recommendations.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Crop Recommendation System</h1>
            <p className="text-xl text-gray-600">
              Get AI-powered recommendations for the best crops to grow based on your specific soil and climate conditions.
            </p>
          </div>
          
          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="soilType">Soil Type</Label>
                    <Select value={soilType} onValueChange={setSoilType} required>
                      <SelectTrigger id="soilType">
                        <SelectValue placeholder="Select soil type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="clay">Clay</SelectItem>
                        <SelectItem value="loamy">Loamy</SelectItem>
                        <SelectItem value="sandy">Sandy</SelectItem>
                        <SelectItem value="black">Black</SelectItem>
                        <SelectItem value="red">Red</SelectItem>
                        <SelectItem value="silt">Silt</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="nitrogen">Nitrogen (kg/ha)</Label>
                    <Input 
                      id="nitrogen" 
                      type="number" 
                      placeholder="e.g., 80" 
                      min="0" 
                      value={nitrogen}
                      onChange={(e) => setNitrogen(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phosphorus">Phosphorus (kg/ha)</Label>
                    <Input 
                      id="phosphorus" 
                      type="number" 
                      placeholder="e.g., 45" 
                      min="0" 
                      value={phosphorus}
                      onChange={(e) => setPhosphorus(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="potassium">Potassium (kg/ha)</Label>
                    <Input 
                      id="potassium" 
                      type="number" 
                      placeholder="e.g., 60" 
                      min="0" 
                      value={potassium}
                      onChange={(e) => setPotassium(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="soilpH">Soil pH Level</Label>
                    <Input 
                      id="soilpH" 
                      type="number" 
                      placeholder="e.g., 6.5" 
                      min="0" 
                      max="14" 
                      step="0.1"
                      value={soilpH}
                      onChange={(e) => setSoilpH(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="temperature">Average Temperature (°C)</Label>
                    <Input 
                      id="temperature" 
                      type="number" 
                      placeholder="e.g., 25" 
                      min="0" 
                      max="50"
                      value={temperature}
                      onChange={(e) => setTemperature(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="humidity">Humidity (%)</Label>
                    <Input 
                      id="humidity" 
                      type="number" 
                      placeholder="e.g., 60" 
                      min="0" 
                      max="100"
                      value={humidity}
                      onChange={(e) => setHumidity(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="rainfall">Annual Rainfall (mm)</Label>
                    <Input 
                      id="rainfall" 
                      type="number" 
                      placeholder="e.g., 1200" 
                      min="0"
                      value={rainfall}
                      onChange={(e) => setRainfall(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Location (District/State)</Label>
                    <Input 
                      id="location" 
                      placeholder="e.g., Pune, Maharashtra" 
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full md:w-auto bg-primary-600 hover:bg-primary-700" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    'Get Crop Recommendations'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
          
          {results.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommended Crops</h2>
              <div className="space-y-6">
                {results.map((result, index) => (
                  <Card key={index} className={`border-l-4 ${result.suitable ? 'border-l-green-500' : 'border-l-yellow-500'}`}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">{result.crop}</h3>
                          <div className="flex items-center mb-4">
                            <div className="bg-gray-200 h-2 rounded-full w-32 mr-2">
                              <div 
                                className={`h-2 rounded-full ${result.suitable ? 'bg-green-500' : 'bg-yellow-500'}`} 
                                style={{ width: `${result.confidence}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600">{result.confidence.toFixed(0)}% match</span>
                          </div>
                          <p className="text-gray-700 mb-4">{result.description}</p>
                        </div>
                        {result.suitable && (
                          <div className="bg-green-100 p-2 rounded-full">
                            <ThumbsUp className="h-6 w-6 text-green-600" />
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-4">
                        <h4 className="font-medium text-gray-900 mb-2">Farming Tips:</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          {result.tips.map((tip, i) => (
                            <li key={i} className="text-gray-700">{tip}</li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CropRecommendation;
