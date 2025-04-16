
import { useTranslation } from "@/context/LanguageContext";
import Layout from "@/components/layout/Layout";
import MarketRatesComponent from "@/components/features/MarketRates";

const MarketRatesPage = () => {
  const { language } = useTranslation();

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">
          {language === 'en' ? 'Local Mandi Market Rates' : 'स्थानिक मंडी बाजार दर'}
        </h1>
        <p className="text-gray-600 mb-8">
          {language === 'en' 
            ? 'Get real-time price information for your crops from local agricultural markets.' 
            : 'स्थानिक कृषी बाजारांमधून आपल्या पिकांची रिअल-टाइम किंमत माहिती मिळवा.'}
        </p>
        
        <MarketRatesComponent />
      </div>
    </Layout>
  );
};

export default MarketRatesPage;
