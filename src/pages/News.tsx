
import { useTranslation } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, Download, ExternalLink, Share2, Bookmark } from "lucide-react";

const NewsPage = () => {
  const { language } = useTranslation();
  const { theme } = useTheme();

  const getTranslation = (en: string, mr: string) => {
    return language === 'en' ? en : mr;
  };

  return (
    <Layout>
      <div className="container py-8 mx-auto">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
            {getTranslation('Government Schemes & Agricultural News', 'सरकारी योजना आणि कृषी समाचार')}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8 text-center max-w-2xl mx-auto">
            {getTranslation(
              'Stay updated with the latest agricultural news and government schemes for farmers.', 
              'नवीनतम कृषी बातम्या आणि शेतकरी योजनांसह अद्ययावत राहा.'
            )}
          </p>

          <Tabs defaultValue="schemes" className="w-full">
            <div className="flex justify-center">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="schemes" className="text-base py-3">
                  {getTranslation('Government Schemes', 'सरकारी योजना')}
                </TabsTrigger>
                <TabsTrigger value="news" className="text-base py-3">
                  {getTranslation('Agricultural News', 'कृषी बातम्या')}
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="schemes" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Featured scheme */}
                <Card className="col-span-1 md:col-span-2 overflow-hidden border-2 border-primary-100 dark:border-primary-900">
                  <div className="bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/30 dark:to-primary-800/30 p-2">
                    <Badge className="bg-primary-600">{getTranslation('Featured Scheme', 'मुख्य योजना')}</Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-2xl">
                      {getTranslation('PM Kisan Samman Nidhi', 'पीएम किसान सम्मान निधी')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-gray-700 dark:text-gray-300">
                        {getTranslation(
                          'Direct benefit transfer scheme providing income support of ₹6,000 per year to all land-holding farmer families in three equal installments. Apply online through the official portal.',
                          'सर्व जमीनधारक शेतकरी कुटुंबांना दरवर्षी तीन समान हप्त्यांमध्ये ₹६,००० चे उत्पन्न समर्थन देणारी थेट लाभ हस्तांतरण योजना. अधिकृत पोर्टलद्वारे ऑनलाइन अर्ज करा.'
                        )}
                      </p>
                      <div className="flex flex-wrap gap-4 pt-2">
                        <Button variant="default" className="gap-2">
                          <ExternalLink size={16} />
                          {getTranslation('Apply Now', 'आता अर्ज करा')}
                        </Button>
                        <Button variant="outline" className="gap-2">
                          <Download size={16} />
                          {getTranslation('Download Guidelines', 'मार्गदर्शक तत्त्वे डाउनलोड करा')}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">{getTranslation('Soil Health Card Scheme', 'मृदा आरोग्य कार्ड योजना')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-gray-700 dark:text-gray-300">
                        {getTranslation(
                          'Get your soil tested and receive a Soil Health Card with crop-wise recommendations for optimal fertilizer usage.',
                          'आपली माती तपासून घ्या आणि इष्टतम खते वापरासाठी पीक-निहाय शिफारशींसह मृदा आरोग्य कार्ड प्राप्त करा.'
                        )}
                      </p>
                      <Button variant="outline" className="gap-2">
                        <ExternalLink size={16} />
                        {getTranslation('Learn More', 'अधिक जाणून घ्या')}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">{getTranslation('Pradhan Mantri Fasal Bima Yojana', 'प्रधानमंत्री फसल बीमा योजना')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-gray-700 dark:text-gray-300">
                        {getTranslation(
                          'Crop insurance scheme to provide financial support to farmers in case of crop failure due to natural calamities.',
                          'नैसर्गिक आपत्तींमुळे पिकांच्या नुकसानीच्या स्थितीत शेतकऱ्यांना आर्थिक सहाय्य देणारी पीक विमा योजना.'
                        )}
                      </p>
                      <Button variant="outline" className="gap-2">
                        <ExternalLink size={16} />
                        {getTranslation('Check Eligibility', 'पात्रता तपासा')}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-center mt-8">
                <Button variant="outline" className="gap-2">
                  {getTranslation('View All Schemes', 'सर्व योजना पहा')}
                  <ExternalLink size={16} />
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="news" className="mt-8">
              <div className="space-y-8">
                <Card className="overflow-hidden">
                  <div className="md:flex">
                    <div className="md:w-1/3 h-48 md:h-auto relative">
                      <img 
                        src="https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFybWluZ3xlbnwwfHwwfHx8MA%3D%3D" 
                        alt="Record Agricultural Production" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="md:w-2/3">
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline" className="flex items-center gap-1 text-sm">
                            <CalendarDays size={14} />
                            {getTranslation('April 10, 2025', '१० एप्रिल, २०२५')}
                          </Badge>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon">
                              <Share2 size={16} />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Bookmark size={16} />
                            </Button>
                          </div>
                        </div>
                        <CardTitle className="text-2xl">
                          {getTranslation('Record Agricultural Production Expected This Year', 'यंदा विक्रमी कृषी उत्पादनाची अपेक्षा')}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700 dark:text-gray-300">
                          {getTranslation(
                            'The Ministry of Agriculture has forecasted a record production of food grains this year, with favorable monsoon conditions expected across most agricultural regions.',
                            'कृषी मंत्रालयाने यंदा अनुकूल मान्सून परिस्थिती बहुतेक कृषी क्षेत्रात अपेक्षित असल्याने अन्नधान्याचे विक्रमी उत्पादन होण्याचा अंदाज वर्तवला आहे.'
                          )}
                        </p>
                        <Button variant="link" className="mt-2 p-0 h-auto font-medium">
                          {getTranslation('Read Full Article', 'संपूर्ण लेख वाचा')}
                        </Button>
                      </CardContent>
                    </div>
                  </div>
                </Card>

                <Card className="overflow-hidden">
                  <div className="md:flex">
                    <div className="md:w-1/3 h-48 md:h-auto relative">
                      <img 
                        src="https://images.unsplash.com/photo-1609167830220-7164aa360951?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG1hcmtldCUyMGZhcm18ZW58MHx8MHx8fDA%3D" 
                        alt="Farmers Market Initiative" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="md:w-2/3">
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline" className="flex items-center gap-1 text-sm">
                            <CalendarDays size={14} />
                            {getTranslation('April 5, 2025', '५ एप्रिल, २०२५')}
                          </Badge>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon">
                              <Share2 size={16} />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Bookmark size={16} />
                            </Button>
                          </div>
                        </div>
                        <CardTitle className="text-2xl">
                          {getTranslation("New Initiative to Support Farmers' Market Access", 'शेतकऱ्यांच्या बाजारपेठ प्रवेशास समर्थन देण्यासाठी नवीन पुढाकार')}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700 dark:text-gray-300">
                          {getTranslation(
                            'The government has announced a new initiative to connect farmers directly with retail chains and exporters, eliminating middlemen and ensuring better prices for agricultural products.',
                            'सरकारने शेतकऱ्यांना थेट किरकोळ साखळ्या आणि निर्यातदारांशी जोडण्यासाठी नवीन उपक्रमाची घोषणा केली आहे, ज्यामुळे मध्यस्थ नष्ट होतील आणि कृषी उत्पादनांसाठी चांगल्या किंमती मिळतील.'
                          )}
                        </p>
                        <Button variant="link" className="mt-2 p-0 h-auto font-medium">
                          {getTranslation('Read Full Article', 'संपूर्ण लेख वाचा')}
                        </Button>
                      </CardContent>
                    </div>
                  </div>
                </Card>

                <Card className="overflow-hidden">
                  <div className="md:flex">
                    <div className="md:w-1/3 h-48 md:h-auto relative">
                      <img 
                        src="https://images.unsplash.com/photo-1584423886556-a8ee209c7819?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDN8fHRlY2hub2xvZ3klMjBmYXJtaW5nfGVufDB8fDB8fHww" 
                        alt="Smart Farming Technology" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="md:w-2/3">
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline" className="flex items-center gap-1 text-sm">
                            <CalendarDays size={14} />
                            {getTranslation('March 28, 2025', '२८ मार्च, २०२५')}
                          </Badge>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon">
                              <Share2 size={16} />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Bookmark size={16} />
                            </Button>
                          </div>
                        </div>
                        <CardTitle className="text-2xl">
                          {getTranslation('Smart Farming Technologies Gaining Popularity', 'स्मार्ट शेती तंत्रज्ञान लोकप्रिय होत आहे')}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700 dark:text-gray-300">
                          {getTranslation(
                            'Adoption of smart farming technologies like IoT sensors, drones, and AI-based crop monitoring systems is on the rise, helping farmers boost productivity and reduce resource waste.',
                            'IoT सेन्सर्स, ड्रोन आणि AI-आधारित पीक निरीक्षण प्रणालींसारख्या स्मार्ट शेती तंत्रज्ञानाचा स्वीकार वाढत आहे, जे शेतकऱ्यांना उत्पादकता वाढविण्यास आणि संसाधन वाया घालवण्यात मदत करत आहे.'
                          )}
                        </p>
                        <Button variant="link" className="mt-2 p-0 h-auto font-medium">
                          {getTranslation('Read Full Article', 'संपूर्ण लेख वाचा')}
                        </Button>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="flex justify-center mt-8">
                <Button variant="outline" className="gap-2">
                  {getTranslation('View All News', 'सर्व बातम्या पहा')}
                  <ExternalLink size={16} />
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default NewsPage;
