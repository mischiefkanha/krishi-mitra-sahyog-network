
import { useTranslation } from "@/context/LanguageContext";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const NewsPage = () => {
  const { language } = useTranslation();

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">
          {language === 'en' ? 'Government Schemes & Agricultural News' : 'सरकारी योजना आणि कृषी समाचार'}
        </h1>
        <p className="text-gray-600 mb-8">
          {language === 'en' 
            ? 'Stay updated with the latest agricultural news and government schemes for farmers.' 
            : 'नवीनतम कृषी बातम्या आणि शेतकरी योजनांसह अद्ययावत राहा.'}
        </p>

        <Tabs defaultValue="schemes" className="w-full">
          <TabsList className="grid w-full md:w-[400px] grid-cols-2">
            <TabsTrigger value="schemes">
              {language === 'en' ? 'Government Schemes' : 'सरकारी योजना'}
            </TabsTrigger>
            <TabsTrigger value="news">
              {language === 'en' ? 'Agricultural News' : 'कृषी बातम्या'}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="schemes" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Example schemes */}
              <Card>
                <CardHeader>
                  <CardTitle>{language === 'en' ? 'PM Kisan Samman Nidhi' : 'पीएम किसान सम्मान निधी'}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    {language === 'en'
                      ? 'Direct benefit transfer scheme providing income support to farmers. Apply online now.'
                      : 'शेतकऱ्यांना उत्पन्न समर्थन देणारी थेट लाभ हस्तांतरण योजना. आता ऑनलाइन अर्ज करा.'}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{language === 'en' ? 'Soil Health Card Scheme' : 'मृदा आरोग्य कार्ड योजना'}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    {language === 'en'
                      ? 'Get your soil tested and receive a Soil Health Card with crop-wise recommendations.'
                      : 'आपली माती तपासून घ्या आणि पीक-निहाय शिफारशींसह मृदा आरोग्य कार्ड प्राप्त करा.'}
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="news" className="mt-6">
            <div className="space-y-6">
              {/* Example news */}
              <Card>
                <CardHeader>
                  <CardTitle>{language === 'en' ? 'Record Agricultural Production Expected This Year' : 'यंदा विक्रमी कृषी उत्पादनाची अपेक्षा'}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-2">
                    {language === 'en' ? 'Published on April 10, 2025' : '१० एप्रिल, २०२५ रोजी प्रकाशित'}
                  </p>
                  <p className="text-gray-700">
                    {language === 'en'
                      ? 'The Ministry of Agriculture has forecasted a record production of food grains this year, with favorable monsoon conditions.'
                      : 'कृषी मंत्रालयाने यंदा अनुकूल मान्सून परिस्थितींसह अन्नधान्याचे विक्रमी उत्पादन होण्याचा अंदाज वर्तवला आहे.'}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{language === 'en' ? 'New Initiative to Support Farmers' Market Access' : 'शेतकऱ्यांच्या बाजारपेठ प्रवेशास समर्थन देण्यासाठी नवीन पुढाकार'}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-2">
                    {language === 'en' ? 'Published on April 5, 2025' : '५ एप्रिल, २०२५ रोजी प्रकाशित'}
                  </p>
                  <p className="text-gray-700">
                    {language === 'en'
                      ? 'The government has announced a new initiative to connect farmers directly with retail chains and exporters.'
                      : 'सरकारने शेतकऱ्यांना थेट किरकोळ साखळ्या आणि निर्यातदारांशी जोडण्यासाठी नवीन उपक्रमाची घोषणा केली आहे.'}
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default NewsPage;
