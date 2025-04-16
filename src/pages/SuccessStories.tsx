
import { useTranslation } from "@/context/LanguageContext";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SuccessStoriesPage = () => {
  const { language } = useTranslation();

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">
          {language === 'en' ? 'Farmer Success Stories' : 'शेतकरी यशोगाथा'}
        </h1>
        <p className="text-gray-600 mb-8">
          {language === 'en' 
            ? 'Read about how other farmers have succeeded using modern agricultural techniques and our platform.' 
            : 'आधुनिक कृषी तंत्रज्ञान आणि आमच्या प्लॅटफॉर्मचा वापर करून इतर शेतकऱ्यांनी कसे यश मिळवले आहे याबद्दल वाचा.'}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Example success stories */}
          <Card>
            <CardHeader>
              <CardTitle>{language === 'en' ? 'From Struggle to Success' : 'संघर्षातून यशाकडे'}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gray-100 rounded-md mb-4">
                {/* Image placeholder */}
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  {language === 'en' ? 'Farmer Image' : 'शेतकरी चित्र'}
                </div>
              </div>
              <p className="text-gray-700">
                {language === 'en'
                  ? 'How a farmer from Maharashtra increased crop yields by 40% using modern techniques.'
                  : 'महाराष्ट्रातील एका शेतकऱ्याने आधुनिक तंत्रांचा वापर करून पीक उत्पादनात 40% वाढ कशी केली.'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{language === 'en' ? 'Organic Revolution' : 'सेंद्रिय क्रांती'}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gray-100 rounded-md mb-4">
                {/* Image placeholder */}
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  {language === 'en' ? 'Farmer Image' : 'शेतकरी चित्र'}
                </div>
              </div>
              <p className="text-gray-700">
                {language === 'en'
                  ? 'A small farmer who transitioned to organic farming and saw profits double within two years.'
                  : 'एका छोट्या शेतकऱ्याने सेंद्रिय शेतीकडे संक्रमण केले आणि दोन वर्षांत नफा दुप्पट झाला.'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{language === 'en' ? 'Tech Adoption' : 'तंत्रज्ञान स्वीकार'}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gray-100 rounded-md mb-4">
                {/* Image placeholder */}
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  {language === 'en' ? 'Farmer Image' : 'शेतकरी चित्र'}
                </div>
              </div>
              <p className="text-gray-700">
                {language === 'en'
                  ? 'How technology helped a traditional farmer overcome climate challenges.'
                  : 'तंत्रज्ञानाने एका पारंपारिक शेतकऱ्याला हवामान आव्हानांवर मात करण्यात कशी मदत केली.'}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default SuccessStoriesPage;
