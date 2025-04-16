
import { useState } from "react";
import { useTranslation } from "@/context/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarClock, CloudRain, MessageCircle, BarChart4, Award, Share2, Video, Wifi, Coffee } from "lucide-react";
import { Link } from "react-router-dom";

const FarmerFeatures = () => {
  const { t, language } = useTranslation();
  const [activeTab, setActiveTab] = useState("tools");

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          {language === 'en' ? 'Smart Farming Tools' : 'स्मार्ट शेती साधने'}
        </h2>

        <Tabs defaultValue="tools" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="tools">
              {language === 'en' ? 'Smart Tools' : 'स्मार्ट साधने'}
            </TabsTrigger>
            <TabsTrigger value="market">
              {language === 'en' ? 'Market Data' : 'बाजार माहिती'}
            </TabsTrigger>
            <TabsTrigger value="community">
              {language === 'en' ? 'Community' : 'समुदाय'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tools" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Weather Alerts Card */}
              <Card className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <div className="bg-primary-100 p-4 flex items-center justify-center">
                    <CloudRain size={40} className="text-primary-600" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">
                      {language === 'en' ? 'Weather Alerts' : 'हवामान सूचना'}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {language === 'en' 
                        ? 'Get crop-specific alerts based on weather changes in your area.' 
                        : 'आपल्या क्षेत्रात हवामान बदलांवर आधारित पीक-विशिष्ट सूचना मिळवा.'}
                    </p>
                    <Link to="/weather-alerts">
                      <Button variant="outline" size="sm" className="w-full">
                        {language === 'en' ? 'Setup Alerts' : 'सूचना सेटअप करा'}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Crop Calendar Card */}
              <Card className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <div className="bg-green-100 p-4 flex items-center justify-center">
                    <CalendarClock size={40} className="text-green-600" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">
                      {language === 'en' ? 'Crop Calendar' : 'पीक कॅलेंडर'}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {language === 'en' 
                        ? 'Personalized schedule for sowing, irrigation and harvesting.' 
                        : 'पेरणी, सिंचन आणि कापणीसाठी वैयक्तिकृत वेळापत्रक.'}
                    </p>
                    <Link to="/crop-calendar">
                      <Button variant="outline" size="sm" className="w-full">
                        {language === 'en' ? 'View Calendar' : 'कॅलेंडर पहा'}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Expert Advice Card */}
              <Card className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <div className="bg-blue-100 p-4 flex items-center justify-center">
                    <MessageCircle size={40} className="text-blue-600" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">
                      {language === 'en' ? 'Ask an Expert' : 'तज्ञांना विचारा'}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {language === 'en' 
                        ? 'Connect with agriculture experts via chat, call, or video.' 
                        : 'चॅट, कॉल किंवा व्हिडिओद्वारे कृषी तज्ञांशी कनेक्ट करा.'}
                    </p>
                    <Badge className="mb-2 bg-green-500">
                      {language === 'en' ? 'Live Now' : 'आता लाइव्ह'}
                    </Badge>
                    <Link to="/ask-expert">
                      <Button variant="outline" size="sm" className="w-full">
                        {language === 'en' ? 'Connect Now' : 'आता कनेक्ट करा'}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-center mt-6">
              <Link to="/all-tools">
                <Button variant="link">
                  {language === 'en' ? 'See all farming tools' : 'सर्व शेती साधने पहा'} →
                </Button>
              </Link>
            </div>
          </TabsContent>

          <TabsContent value="market" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Market Rates Card */}
              <Card className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <div className="bg-amber-100 p-4 flex items-center justify-center">
                    <BarChart4 size={40} className="text-amber-600" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">
                      {language === 'en' ? 'Local Mandi Rates' : 'स्थानिक मंडी दर'}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {language === 'en' 
                        ? 'Get real-time crop prices from local markets with trend analysis.' 
                        : 'स्थानिक बाजारातील रिअल-टाइम पीक किंमती ट्रेंड विश्लेषणासह मिळवा.'}
                    </p>
                    <Link to="/market-rates">
                      <Button variant="outline" size="sm" className="w-full">
                        {language === 'en' ? 'Check Prices' : 'किंमती तपासा'}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Offline Mode Card */}
              <Card className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <div className="bg-violet-100 p-4 flex items-center justify-center">
                    <Wifi size={40} className="text-violet-600" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">
                      {language === 'en' ? 'Offline Mode' : 'ऑफलाइन मोड'}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {language === 'en' 
                        ? 'Access important information even without internet connection.' 
                        : 'इंटरनेट कनेक्शन शिवायही महत्त्वपूर्ण माहिती मिळवा.'}
                    </p>
                    <Link to="/settings">
                      <Button variant="outline" size="sm" className="w-full">
                        {language === 'en' ? 'Enable Offline Mode' : 'ऑफलाइन मोड सक्षम करा'}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="community" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Success Stories Card */}
              <Card className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <div className="bg-green-100 p-4 flex items-center justify-center">
                    <Award size={40} className="text-green-600" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">
                      {language === 'en' ? 'Success Stories' : 'यश गाथा'}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {language === 'en' 
                        ? 'Learn from real experiences of successful farmers.' 
                        : 'यशस्वी शेतकऱ्यांच्या वास्तविक अनुभवांमधून शिका.'}
                    </p>
                    <Link to="/success-stories">
                      <Button variant="outline" size="sm" className="w-full">
                        {language === 'en' ? 'Read Stories' : 'गोष्टी वाचा'}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Referral Program Card */}
              <Card className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <div className="bg-blue-100 p-4 flex items-center justify-center">
                    <Share2 size={40} className="text-blue-600" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">
                      {language === 'en' ? 'Refer & Earn' : 'शेअर करा आणि कमवा'}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {language === 'en' 
                        ? 'Invite fellow farmers and get rewards for every sign-up.' 
                        : 'सहशेतकऱ्यांना आमंत्रित करा आणि प्रत्येक साइन-अपसाठी बक्षिसे मिळवा.'}
                    </p>
                    <Link to="/referral-program">
                      <Button variant="outline" size="sm" className="w-full">
                        {language === 'en' ? 'Start Referring' : 'शेअर करणे सुरू करा'}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Educational Videos Card */}
              <Card className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <div className="bg-red-100 p-4 flex items-center justify-center">
                    <Video size={40} className="text-red-600" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">
                      {language === 'en' ? 'Educational Videos' : 'शैक्षणिक व्हिडिओ'}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {language === 'en' 
                        ? 'Watch short videos on farming techniques and best practices.' 
                        : 'शेती तंत्रे आणि सर्वोत्तम पद्धतींवर लहान व्हिडिओ पहा.'}
                    </p>
                    <Link to="/edu-videos">
                      <Button variant="outline" size="sm" className="w-full">
                        {language === 'en' ? 'Watch Now' : 'आता पहा'}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default FarmerFeatures;
