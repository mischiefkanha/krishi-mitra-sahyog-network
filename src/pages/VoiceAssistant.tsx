
import { useTranslation } from "@/context/LanguageContext";
import Layout from "@/components/layout/Layout";

const VoiceAssistantPage = () => {
  const { language } = useTranslation();

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">
          {language === 'en' ? 'Voice Assistant' : 'आवाज सहाय्यक'}
        </h1>
        <p className="text-gray-600 mb-8">
          {language === 'en' 
            ? 'Use voice commands to navigate the app and get information about farming.' 
            : 'शेतीविषयी माहिती मिळवण्यासाठी व्हॉइस कमांड वापरा.'}
        </p>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-50 rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-600"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
            </div>
            <h2 className="text-xl font-medium mb-2">
              {language === 'en' ? 'Voice Assistant Coming Soon' : 'व्हॉइस असिस्टंट लवकरच येत आहे'}
            </h2>
            <p className="text-gray-600">
              {language === 'en'
                ? 'We are working on bringing voice assistant functionality to help you navigate KrishiMitra more easily.'
                : 'आम्ही कृषिमित्र अधिक सहजपणे नेव्हिगेट करण्यात आपली मदत करण्यासाठी व्हॉइस असिस्टंट फंक्शनॅलिटी आणण्याचे काम करत आहोत.'}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VoiceAssistantPage;
