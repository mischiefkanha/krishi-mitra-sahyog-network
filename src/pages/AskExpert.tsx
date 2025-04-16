
import { useTranslation } from "@/context/LanguageContext";
import Layout from "@/components/layout/Layout";
import AskExpert from "@/components/features/AskExpert";

const AskExpertPage = () => {
  const { language } = useTranslation();

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">
          {language === 'en' 
            ? 'Ask an Agricultural Expert' 
            : 'कृषी तज्ञांना विचारा'}
        </h1>
        <p className="text-gray-600 mb-8">
          {language === 'en'
            ? 'Connect with agriculture experts for personalized advice on your farming challenges.'
            : 'आपल्या शेती आव्हानांवर वैयक्तिकृत सल्ल्यासाठी कृषी तज्ञांशी संपर्क साधा.'}
        </p>
        
        <AskExpert />
      </div>
    </Layout>
  );
};

export default AskExpertPage;
