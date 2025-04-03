
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, ThumbsUp } from 'lucide-react';

interface CropRecommendationResult {
  crop: string;
  confidence: number;
  description: string;
  suitable: boolean;
  tips: string[];
}

const CropRecommendation = () => {
  const [soilType, setSoilType] = useState('');
  const [soilpH, setSoilpH] = useState('');
  const [temperature, setTemperature] = useState('');
  const [humidity, setHumidity] = useState('');
  const [rainfall, setRainfall] = useState('');
  const [location, setLocation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<CropRecommendationResult[]>([]);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Simulated results
      setResults([
        {
          crop: 'Rice',
          confidence: 92,
          description: 'Rice is a staple food crop in India, requiring high rainfall and humidity.',
          suitable: true,
          tips: [
            'Plant in June-July for kharif season',
            'Maintain water level of 5cm during tillering',
            'Consider SRI technique for water conservation'
          ]
        },
        {
          crop: 'Wheat',
          confidence: 68,
          description: 'Wheat is a rabi crop that grows well in moderately cool environments.',
          suitable: false,
          tips: [
            'Not recommended for your current conditions',
            'Consider planting in winter season',
            'Requires less water than your current rainfall'
          ]
        },
        {
          crop: 'Cotton',
          confidence: 85,
          description: 'Cotton is a cash crop that thrives in warm weather and well-drained soil.',
          suitable: true,
          tips: [
            'Plant in April-May',
            'Ensure proper spacing of 60-90cm between plants',
            'Implement integrated pest management for bollworms'
          ]
        }
      ]);
      
      toast({
        title: "Recommendations Ready",
        description: "We've analyzed your data and prepared crop recommendations.",
      });
    }, 2000);
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
                            <span className="text-sm text-gray-600">{result.confidence}% match</span>
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
