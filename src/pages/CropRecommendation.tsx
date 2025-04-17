import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Loader2, MicIcon, Download } from 'lucide-react';
import { Leaf } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { generateCropRecommendationReport } from '@/utils/pdfGenerator';

interface CropRecommendationResult {
  recommendedCrop: string;
  confidence: number;
  apiResponse: any;
}

const soilTypes = [
  'Clay', 'Sandy', 'Loamy', 'Black', 'Red', 'Silty', 'Peaty', 'Chalky'
];

const CropRecommendation = () => {
  const [soilType, setSoilType] = useState('');
  const [nitrogen, setNitrogen] = useState(50);
  const [phosphorus, setPhosphorus] = useState(50);
  const [potassium, setPotassium] = useState(50);
  const [ph, setPh] = useState(7);
  const [temperature, setTemperature] = useState(25);
  const [humidity, setHumidity] = useState(50);
  const [rainfall, setRainfall] = useState(100);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CropRecommendationResult | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [activeVoiceField, setActiveVoiceField] = useState<string | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();
  const { t, language: preferredLanguage } = useLanguage();
  
  const startListening = (field: string) => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast({
        title: "Voice input not supported",
        description: "Your browser doesn't support voice input. Please use a modern browser.",
        variant: "destructive"
      });
      return;
    }

    setActiveVoiceField(field);
    setIsListening(true);

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = preferredLanguage === 'en' ? 'en-US' : 
                       preferredLanguage === 'hi' ? 'hi-IN' : 'mr-IN';
    recognition.interimResults = false;

    recognition.start();

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      const numValue = parseFloat(transcript.replace(/[^0-9.]/g, ''));

      if (!isNaN(numValue)) {
        switch (field) {
          case 'nitrogen':
            setNitrogen(Math.min(100, Math.max(0, numValue)));
            break;
          case 'phosphorus':
            setPhosphorus(Math.min(100, Math.max(0, numValue)));
            break;
          case 'potassium':
            setPotassium(Math.min(100, Math.max(0, numValue)));
            break;
          case 'ph':
            setPh(Math.min(14, Math.max(0, numValue)));
            break;
          case 'temperature':
            setTemperature(Math.min(50, Math.max(-10, numValue)));
            break;
          case 'humidity':
            setHumidity(Math.min(100, Math.max(0, numValue)));
            break;
          case 'rainfall':
            setRainfall(Math.min(1000, Math.max(0, numValue)));
            break;
        }

        toast({
          title: "Voice input received",
          description: `Value set to ${numValue}`,
        });
      } else if (field === 'soilType') {
        const lowercaseTranscript = transcript.toLowerCase();
        const matchedSoil = soilTypes.find(soil => 
          lowercaseTranscript.includes(soil.toLowerCase())
        );
        
        if (matchedSoil) {
          setSoilType(matchedSoil);
          toast({
            title: "Voice input received",
            description: `Soil type set to ${matchedSoil}`,
          });
        } else {
          toast({
            title: "Voice input unclear",
            description: "Could not detect soil type. Please try again or select manually.",
            variant: "destructive"
          });
        }
      }
      
      setIsListening(false);
      setActiveVoiceField(null);
    };

    recognition.onerror = () => {
      setIsListening(false);
      setActiveVoiceField(null);
      toast({
        title: "Voice input error",
        description: "There was an error processing your voice input. Please try again.",
        variant: "destructive"
      });
    };

    recognition.onend = () => {
      setIsListening(false);
      setActiveVoiceField(null);
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!soilType) {
      toast({
        title: "Missing Information",
        description: "Please select a soil type",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('crop-recommendation', {
        body: {
          soilType,
          nitrogen,
          phosphorus,
          potassium,
          ph,
          temperature,
          humidity,
          rainfall
        }
      });
      
      if (error) throw error;
      
      setResult(data);
      
      if (user) {
        await supabase.from('crop_recommendations').insert({
          user_id: user.id,
          soil_type: soilType,
          nitrogen,
          phosphorus,
          potassium,
          ph,
          temperature,
          humidity,
          rainfall,
          recommended_crop: data.recommendedCrop,
          confidence: data.confidence
        });
      }
      
      toast({
        title: "Recommendation Ready",
        description: "We've analyzed your inputs and have recommendations ready.",
      });
    } catch (error: any) {
      console.error('Error getting crop recommendations:', error);
      toast({
        title: "Error",
        description: error.message || "There was a problem getting recommendations. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadReport = async () => {
    if (!result) return;
    
    try {
      const reportData = [{
        id: 'current',
        soil_type: soilType,
        recommended_crop: result.recommendedCrop,
        confidence: result.confidence,
        timestamp: new Date().toISOString(),
        nitrogen,
        phosphorus,
        potassium,
        ph,
        temperature,
        humidity,
        rainfall
      }];
      
      await generateCropRecommendationReport(reportData);
      
      toast({
        title: "Report Generated",
        description: "Your crop recommendation report has been downloaded.",
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
          {t('cropRecommendation')}
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>{t('enterSoilDetails')}</CardTitle>
                <CardDescription>
                  {t('cropRecommendationDesc')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="soilType">{t('soilType')}</Label>
                      <Button 
                        type="button" 
                        size="sm" 
                        variant="outline" 
                        onClick={() => startListening('soilType')}
                        disabled={isListening}
                        className="flex items-center gap-1"
                      >
                        {activeVoiceField === 'soilType' ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <MicIcon className="h-4 w-4" />
                        )}
                        {t('speak')}
                      </Button>
                    </div>
                    <Select value={soilType} onValueChange={setSoilType}>
                      <SelectTrigger>
                        <SelectValue placeholder={t('selectSoilType')} />
                      </SelectTrigger>
                      <SelectContent>
                        {soilTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="nitrogen">
                          {t('nitrogen')} (N): {nitrogen} kg/ha
                        </Label>
                        <Button 
                          type="button" 
                          size="sm" 
                          variant="outline" 
                          onClick={() => startListening('nitrogen')}
                          disabled={isListening}
                          className="flex items-center gap-1"
                        >
                          {activeVoiceField === 'nitrogen' ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <MicIcon className="h-4 w-4" />
                          )}
                          {t('speak')}
                        </Button>
                      </div>
                      <Slider 
                        id="nitrogen"
                        min={0} 
                        max={100} 
                        step={1} 
                        value={[nitrogen]} 
                        onValueChange={(value) => setNitrogen(value[0])} 
                      />
                      <Input 
                        type="number"
                        value={nitrogen}
                        onChange={(e) => setNitrogen(Number(e.target.value))}
                        min={0}
                        max={100}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="phosphorus">
                          {t('phosphorus')} (P): {phosphorus} kg/ha
                        </Label>
                        <Button 
                          type="button" 
                          size="sm" 
                          variant="outline" 
                          onClick={() => startListening('phosphorus')}
                          disabled={isListening}
                          className="flex items-center gap-1"
                        >
                          {activeVoiceField === 'phosphorus' ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <MicIcon className="h-4 w-4" />
                          )}
                          {t('speak')}
                        </Button>
                      </div>
                      <Slider 
                        id="phosphorus"
                        min={0} 
                        max={100} 
                        step={1} 
                        value={[phosphorus]} 
                        onValueChange={(value) => setPhosphorus(value[0])} 
                      />
                      <Input 
                        type="number"
                        value={phosphorus}
                        onChange={(e) => setPhosphorus(Number(e.target.value))}
                        min={0}
                        max={100}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="potassium">
                          {t('potassium')} (K): {potassium} kg/ha
                        </Label>
                        <Button 
                          type="button" 
                          size="sm" 
                          variant="outline" 
                          onClick={() => startListening('potassium')}
                          disabled={isListening}
                          className="flex items-center gap-1"
                        >
                          {activeVoiceField === 'potassium' ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <MicIcon className="h-4 w-4" />
                          )}
                          {t('speak')}
                        </Button>
                      </div>
                      <Slider 
                        id="potassium"
                        min={0} 
                        max={100} 
                        step={1} 
                        value={[potassium]} 
                        onValueChange={(value) => setPotassium(value[0])} 
                      />
                      <Input 
                        type="number"
                        value={potassium}
                        onChange={(e) => setPotassium(Number(e.target.value))}
                        min={0}
                        max={100}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="ph">
                          {t('ph')}: {ph}
                        </Label>
                        <Button 
                          type="button" 
                          size="sm" 
                          variant="outline" 
                          onClick={() => startListening('ph')}
                          disabled={isListening}
                          className="flex items-center gap-1"
                        >
                          {activeVoiceField === 'ph' ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <MicIcon className="h-4 w-4" />
                          )}
                          {t('speak')}
                        </Button>
                      </div>
                      <Slider 
                        id="ph"
                        min={0} 
                        max={14} 
                        step={0.1} 
                        value={[ph]} 
                        onValueChange={(value) => setPh(value[0])} 
                      />
                      <Input 
                        type="number"
                        value={ph}
                        onChange={(e) => setPh(Number(e.target.value))}
                        min={0}
                        max={14}
                        step={0.1}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="temperature">
                          {t('temperature')}: {temperature}°C
                        </Label>
                        <Button 
                          type="button" 
                          size="sm" 
                          variant="outline" 
                          onClick={() => startListening('temperature')}
                          disabled={isListening}
                          className="flex items-center gap-1"
                        >
                          {activeVoiceField === 'temperature' ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <MicIcon className="h-4 w-4" />
                          )}
                          {t('speak')}
                        </Button>
                      </div>
                      <Slider 
                        id="temperature"
                        min={-10} 
                        max={50} 
                        step={0.1} 
                        value={[temperature]} 
                        onValueChange={(value) => setTemperature(value[0])} 
                      />
                      <Input 
                        type="number"
                        value={temperature}
                        onChange={(e) => setTemperature(Number(e.target.value))}
                        min={-10}
                        max={50}
                        step={0.1}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="humidity">
                          {t('humidity')}: {humidity}%
                        </Label>
                        <Button 
                          type="button" 
                          size="sm" 
                          variant="outline" 
                          onClick={() => startListening('humidity')}
                          disabled={isListening}
                          className="flex items-center gap-1"
                        >
                          {activeVoiceField === 'humidity' ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <MicIcon className="h-4 w-4" />
                          )}
                          {t('speak')}
                        </Button>
                      </div>
                      <Slider 
                        id="humidity"
                        min={0} 
                        max={100} 
                        step={1} 
                        value={[humidity]} 
                        onValueChange={(value) => setHumidity(value[0])} 
                      />
                      <Input 
                        type="number"
                        value={humidity}
                        onChange={(e) => setHumidity(Number(e.target.value))}
                        min={0}
                        max={100}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="rainfall">
                          {t('rainfall')}: {rainfall} mm
                        </Label>
                        <Button 
                          type="button" 
                          size="sm" 
                          variant="outline" 
                          onClick={() => startListening('rainfall')}
                          disabled={isListening}
                          className="flex items-center gap-1"
                        >
                          {activeVoiceField === 'rainfall' ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <MicIcon className="h-4 w-4" />
                          )}
                          {t('speak')}
                        </Button>
                      </div>
                      <Slider 
                        id="rainfall"
                        min={0} 
                        max={1000} 
                        step={1} 
                        value={[rainfall]} 
                        onValueChange={(value) => setRainfall(value[0])} 
                      />
                      <Input 
                        type="number"
                        value={rainfall}
                        onChange={(e) => setRainfall(Number(e.target.value))}
                        min={0}
                        max={1000}
                      />
                    </div>
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-primary-600 hover:bg-primary-700 mt-6"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t('analyzing')}
                      </>
                    ) : (
                      t('getCropRecommendation')
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className={result ? "border-primary-500" : ""}>
              <CardHeader>
                <CardTitle>{t('recommendation')}</CardTitle>
                <CardDescription>
                  {result ? t('basedOnYourInputs') : t('fillFormForRecommendation')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {result ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-center">
                      <div className="bg-primary-50 dark:bg-primary-900/20 w-32 h-32 rounded-full flex items-center justify-center mb-4">
                        <Leaf className="h-16 w-16 text-primary-600 dark:text-primary-400" />
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-center text-primary-800 dark:text-primary-300">
                      {result.recommendedCrop}
                    </h3>
                    
                    <div className="bg-muted p-4 rounded-md">
                      <p className="font-medium">{t('confidence')}: {(result.confidence * 100).toFixed(1)}%</p>
                      <p className="mt-2 text-sm">{t('soilType')}: {soilType}</p>
                      <p className="text-sm">N-P-K: {nitrogen}-{phosphorus}-{potassium}</p>
                      <p className="text-sm">pH: {ph}</p>
                    </div>
                    
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p>{t('temperatureValue')}: {temperature}°C</p>
                      <p>{t('humidityValue')}: {humidity}%</p>
                      <p>{t('rainfallValue')}: {rainfall} mm</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      {t('enterSoilDetailsToGetRecommendation')}
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
      </div>
    </Layout>
  );
};

export default CropRecommendation;
