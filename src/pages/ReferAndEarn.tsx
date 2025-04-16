
import { useTranslation } from "@/context/LanguageContext";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Share2 } from "lucide-react";

const ReferAndEarnPage = () => {
  const { language } = useTranslation();

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">
          {language === 'en' ? 'Refer & Earn' : 'संदर्भित करें और कमाएं'}
        </h1>
        <p className="text-gray-600 mb-8">
          {language === 'en' 
            ? 'Invite other farmers to join KrishiMitra and earn rewards for each successful referral.' 
            : 'अन्य शेतकऱ्यांना कृषिमित्रमध्ये सामील होण्यासाठी आमंत्रित करा आणि प्रत्येक यशस्वी संदर्भासाठी बक्षिसे मिळवा.'}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === 'en' ? 'Share Your Referral Link' : 'आपली संदर्भ लिंक शेअर करा'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <p className="mb-3 text-gray-700">
                    {language === 'en' 
                      ? 'Copy your unique referral link and share it with other farmers.' 
                      : 'आपली अद्वितीय संदर्भ लिंक कॉपी करा आणि इतर शेतकऱ्यांसोबत शेअर करा.'}
                  </p>
                  <div className="flex gap-2">
                    <Input 
                      readOnly 
                      value="https://krishimitra.com/register?ref=USER123" 
                      className="bg-gray-50"
                    />
                    <Button variant="outline" size="icon">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">
                    {language === 'en' ? 'Or share via' : 'किंवा यामार्फत शेअर करा'}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="outline" className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#25D366">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413"/>
                      </svg>
                      WhatsApp
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Share2 className="h-4 w-4" />
                      {language === 'en' ? 'More Options' : 'अधिक पर्याय'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === 'en' ? 'Rewards' : 'बक्षिसे'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="bg-green-50 text-green-700 rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold mt-0.5">✓</div>
                    <span>
                      {language === 'en'
                        ? '₹100 added to your wallet for each successful referral'
                        : 'प्रत्येक यशस्वी संदर्भासाठी आपल्या वॉलेटमध्ये ₹100 जमा केले'}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="bg-green-50 text-green-700 rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold mt-0.5">✓</div>
                    <span>
                      {language === 'en'
                        ? 'Bonus seeds for 5+ referrals'
                        : '5+ संदर्भांसाठी बोनस बियाणे'}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="bg-green-50 text-green-700 rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold mt-0.5">✓</div>
                    <span>
                      {language === 'en'
                        ? 'Free consultation with experts for 10+ referrals'
                        : '10+ संदर्भांसाठी तज्ञांसह मोफत परामर्श'}
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ReferAndEarnPage;
