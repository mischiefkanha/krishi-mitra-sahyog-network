
import { useTranslation } from "@/context/LanguageContext";
import Layout from "@/components/layout/Layout";
import WeatherAlert from "@/components/features/WeatherAlert";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MapPin } from "lucide-react";

const WeatherAlertsPage = () => {
  const { language } = useTranslation();
  const [location, setLocation] = useState("");
  const [cropType, setCropType] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLocationDetect = () => {
    setIsLoading(true);
    // Simulate location detection
    setTimeout(() => {
      setLocation("Pune, Maharashtra");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">
          {language === 'en' ? 'Weather Alerts for Your Crops' : 'तुमच्या पिकांसाठी हवामान सूचना'}
        </h1>
        <p className="text-gray-600 mb-8">
          {language === 'en' 
            ? 'Get personalized weather alerts based on your location and crop type to protect your harvest.' 
            : 'आपल्या पिकांचे संरक्षण करण्यासाठी आपल्या स्थान आणि पीक प्रकारावर आधारित वैयक्तिकृत हवामान सूचना मिळवा.'}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <WeatherAlert location={location || undefined} cropType={cropType || undefined} />
            
            <Card className="mt-6">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">
                  {language === 'en' ? 'Customize Your Weather Alerts' : 'आपल्या हवामान सूचना कस्टमाइज करा'}
                </h3>
                
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 space-y-2">
                      <Label htmlFor="location">
                        {language === 'en' ? 'Your Location' : 'आपले स्थान'}
                      </Label>
                      <div className="flex gap-2">
                        <Input 
                          id="location"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          placeholder={language === 'en' ? "Enter your location" : "आपले स्थान प्रविष्ट करा"}
                          className="flex-1"
                        />
                        <Button 
                          variant="outline" 
                          onClick={handleLocationDetect}
                          disabled={isLoading}
                        >
                          <MapPin className="h-4 w-4 mr-2" />
                          {language === 'en' ? 'Detect' : 'शोधा'}
                        </Button>
                      </div>
                    </div>
                    <div className="flex-1 space-y-2">
                      <Label htmlFor="crop-type">
                        {language === 'en' ? 'Crop Type' : 'पीक प्रकार'}
                      </Label>
                      <Select value={cropType} onValueChange={setCropType}>
                        <SelectTrigger id="crop-type">
                          <SelectValue placeholder={language === 'en' ? "Select crop" : "पीक निवडा"} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Rice">
                            {language === 'en' ? 'Rice' : 'तांदूळ'}
                          </SelectItem>
                          <SelectItem value="Wheat">
                            {language === 'en' ? 'Wheat' : 'गहू'}
                          </SelectItem>
                          <SelectItem value="Cotton">
                            {language === 'en' ? 'Cotton' : 'कापूस'}
                          </SelectItem>
                          <SelectItem value="Sugarcane">
                            {language === 'en' ? 'Sugarcane' : 'ऊस'}
                          </SelectItem>
                          <SelectItem value="Tomatoes">
                            {language === 'en' ? 'Tomatoes' : 'टोमॅटो'}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>
                      {language === 'en' ? 'Alert Types' : 'सूचना प्रकार'}
                    </Label>
                    <div className="flex flex-wrap gap-2">
                      {['Heavy Rain', 'Drought', 'Frost', 'Heat Wave', 'Strong Winds'].map((alert) => (
                        <div key={alert} className="flex items-center">
                          <input 
                            type="checkbox" 
                            id={alert} 
                            className="mr-2" 
                            defaultChecked 
                          />
                          <label htmlFor={alert} className="text-sm">
                            {language === 'en' ? alert : 
                              alert === 'Heavy Rain' ? 'जोरदार पाऊस' : 
                              alert === 'Drought' ? 'दुष्काळ' : 
                              alert === 'Frost' ? 'हिमपात' : 
                              alert === 'Heat Wave' ? 'उष्णता लाट' : 
                              'जोरदार वारे'}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full">
                    {language === 'en' ? 'Save Alert Preferences' : 'सूचना प्राधान्ये जतन करा'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-1">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">
                  {language === 'en' ? 'Recent Weather Alerts' : 'अलीकडील हवामान सूचना'}
                </h3>

                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="p-3 bg-gray-50 rounded-md border border-gray-100">
                        <div className="flex justify-between items-start mb-2">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            i % 3 === 0 ? 'bg-amber-100 text-amber-800' : 
                            i % 3 === 1 ? 'bg-blue-100 text-blue-800' : 
                            'bg-red-100 text-red-800'
                          }`}>
                            {i % 3 === 0 ? (language === 'en' ? 'Heavy Rain' : 'जोरदार पाऊस') : 
                             i % 3 === 1 ? (language === 'en' ? 'Strong Winds' : 'जोरदार वारे') : 
                             (language === 'en' ? 'Heat Warning' : 'उष्णता चेतावणी')}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(2025, 3, 10 + i).toLocaleDateString(
                              language === 'en' ? 'en-US' : 'mr-IN', 
                              { day: 'numeric', month: 'short' }
                            )}
                          </span>
                        </div>
                        <p className="text-sm">
                          {language === 'en'
                            ? `Weather alert for ${i % 3 === 0 ? 'heavy rainfall' : i % 3 === 1 ? 'strong winds' : 'extreme heat'} in your area. Take precautions for your ${i % 2 === 0 ? 'rice' : 'wheat'} crop.`
                            : `आपल्या क्षेत्रात ${i % 3 === 0 ? 'जोरदार पावसाची' : i % 3 === 1 ? 'जोरदार वाऱ्याची' : 'अत्यंत उष्णतेची'} हवामान सूचना. आपल्या ${i % 2 === 0 ? 'तांदूळ' : 'गहू'} पिकासाठी खबरदारी घ्या.`
                          }
                        </p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WeatherAlertsPage;
