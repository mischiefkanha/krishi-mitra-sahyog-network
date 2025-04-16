
import { useTranslation } from "@/context/LanguageContext";
import Layout from "@/components/layout/Layout";
import CropCalendarComponent from "@/components/features/CropCalendar";

const CropCalendarPage = () => {
  const { language } = useTranslation();

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">
          {language === 'en' ? 'Personalized Crop Calendar' : 'वैयक्तिकृत पीक दिनदर्शिका'}
        </h1>
        <p className="text-gray-600 mb-8">
          {language === 'en' 
            ? 'Track important farming activities, get timely reminders, and plan your agriculture activities effectively.' 
            : 'महत्त्वपूर्ण शेती क्रियाकलापांचा मागोवा घ्या, वेळेवर स्मरणपत्रे मिळवा आणि आपल्या शेती क्रियाकलापांचे प्रभावीपणे नियोजन करा.'}
        </p>
        
        <CropCalendarComponent />
      </div>
    </Layout>
  );
};

export default CropCalendarPage;
