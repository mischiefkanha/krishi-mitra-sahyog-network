
import { useTranslation } from "@/context/LanguageContext";
import Layout from "@/components/layout/Layout";
import AskExpert from "@/components/features/AskExpert";

const AskExpertPage = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">
          {t('askExpertTitle') || 'Ask an Agricultural Expert'}
        </h1>
        <p className="text-gray-600 mb-8">
          {t('askExpertDescription') || 'Connect with agriculture experts for personalized advice on your farming challenges.'}
        </p>
        
        <AskExpert />
      </div>
    </Layout>
  );
};

export default AskExpertPage;
