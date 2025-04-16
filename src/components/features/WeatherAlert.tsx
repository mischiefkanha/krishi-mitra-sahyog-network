
import { useState, useEffect } from "react";
import { useTranslation } from "@/context/LanguageContext";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CloudRain, Sun, Wind, Thermometer, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface WeatherAlertProps {
  location?: string;
  cropType?: string;
}

const WeatherAlert = ({ location = "Your Location", cropType = "Rice" }: WeatherAlertProps) => {
  const { t, language } = useTranslation();
  const { toast } = useToast();
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Mock weather data - in a real app, this would come from an API
  useEffect(() => {
    setTimeout(() => {
      setWeatherData({
        temperature: 28,
        humidity: 75,
        condition: "rain",
        forecast: [
          { day: "Today", temp: 28, condition: "rain" },
          { day: "Tomorrow", temp: 27, condition: "cloudy" },
          { day: "Day 3", temp: 30, condition: "sunny" },
        ],
        alerts: [
          {
            type: "heavy_rain",
            message: "Heavy rainfall expected in your area in the next 48 hours.",
            recommendation: "Consider delaying pesticide application as it may be washed away."
          }
        ]
      });
      setLoading(false);
    }, 1000);
  }, []);

  const handleSubscribe = () => {
    toast({
      title: language === 'en' ? "Alerts Activated" : "सूचना सक्रिय",
      description: language === 'en' 
        ? "You will now receive weather alerts for your crops." 
        : "आपल्याला आता आपल्या पिकांसाठी हवामान सूचना मिळतील.",
      variant: "default",
    });
  };

  const getWeatherIcon = (condition: string) => {
    switch(condition) {
      case "rain": 
        return <CloudRain className="h-8 w-8 text-blue-500" />;
      case "sunny": 
        return <Sun className="h-8 w-8 text-yellow-500" />;
      case "cloudy": 
        return <Cloud className="h-8 w-8 text-gray-500" />;
      default: 
        return <Thermometer className="h-8 w-8 text-red-500" />;
    }
  };

  if (loading) {
    return (
      <Card className="w-full">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="mt-4">{language === 'en' ? "Loading weather data..." : "हवामान डेटा लोड करत आहे..."}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{language === 'en' ? "Weather Alert" : "हवामान सतर्कता"}</span>
          <span className="text-sm font-normal text-muted-foreground">
            {location}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {weatherData?.alerts?.length > 0 && (
          <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-md flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-amber-800">
                {weatherData.alerts[0].message}
              </p>
              <p className="text-sm text-amber-700 mt-1">
                <span className="font-medium">{language === 'en' ? "Recommendation: " : "शिफारस: "}</span>
                {weatherData.alerts[0].recommendation}
              </p>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            {weatherData && getWeatherIcon(weatherData.condition)}
            <div>
              <p className="text-2xl font-semibold">
                {weatherData?.temperature}°C
              </p>
              <p className="text-sm text-muted-foreground">
                {language === 'en' ? "Humidity: " : "आर्द्रता: "}
                {weatherData?.humidity}%
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">
              {language === 'en' ? "For your crop: " : "आपल्या पिकासाठी: "}
              {cropType}
            </p>
            <p className="text-xs text-green-600">
              {language === 'en' ? "Optimal conditions" : "अनुकूल परिस्थिती"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4">
          {weatherData?.forecast.map((day: any, idx: number) => (
            <div key={idx} className="text-center p-2 bg-gray-50 rounded-md">
              <p className="text-xs">{day.day}</p>
              <div className="flex justify-center my-1">
                {getWeatherIcon(day.condition)}
              </div>
              <p className="font-medium">{day.temp}°C</p>
            </div>
          ))}
        </div>

        <Button 
          onClick={handleSubscribe} 
          className="w-full"
        >
          {language === 'en' ? "Subscribe to Crop Alerts" : "पीक सूचना सदस्यता घ्या"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default WeatherAlert;

// Missing component - adding Cloud component
import { Cloud } from "lucide-react";
