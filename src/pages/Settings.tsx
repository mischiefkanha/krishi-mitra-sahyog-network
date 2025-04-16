
import { useTranslation } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Moon, Sun, Bell, Smartphone, Wifi, WifiOff } from "lucide-react";

const SettingsPage = () => {
  const { language, setLanguage } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">
          {language === 'en' ? 'Settings' : 'सेटिंग्ज'}
        </h1>
        <p className="text-gray-600 mb-8">
          {language === 'en' 
            ? 'Customize your KrishiMitra experience with these settings.' 
            : 'या सेटिंग्जसह आपला कृषिमित्र अनुभव सानुकूलित करा.'}
        </p>

        <Tabs defaultValue="appearance" className="w-full">
          <TabsList className="grid w-full md:w-[500px] grid-cols-3">
            <TabsTrigger value="appearance">
              {language === 'en' ? 'Appearance' : 'दिसावा'}
            </TabsTrigger>
            <TabsTrigger value="language">
              {language === 'en' ? 'Language' : 'भाषा'}
            </TabsTrigger>
            <TabsTrigger value="notifications">
              {language === 'en' ? 'Notifications' : 'सूचना'}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="appearance" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>{language === 'en' ? 'Appearance' : 'दिसावा'}</CardTitle>
                <CardDescription>
                  {language === 'en' 
                    ? 'Customize how KrishiMitra looks on your device.' 
                    : 'कृषिमित्र आपल्या डिव्हाइसवर कसे दिसते ते सानुकूलित करा.'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="theme-toggle">
                      {language === 'en' ? 'Dark Mode' : 'डार्क मोड'}
                    </Label>
                    <p className="text-sm text-gray-500">
                      {language === 'en' 
                        ? 'Switch between light and dark themes.' 
                        : 'लाइट आणि डार्क थीम दरम्यान स्विच करा.'}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Sun className={`h-4 w-4 ${theme === 'light' ? 'text-yellow-500' : 'text-gray-400'}`} />
                    <Switch 
                      id="theme-toggle"
                      checked={theme === 'dark'} 
                      onCheckedChange={toggleTheme}
                    />
                    <Moon className={`h-4 w-4 ${theme === 'dark' ? 'text-blue-400' : 'text-gray-400'}`} />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="text-size">
                      {language === 'en' ? 'Text Size' : 'मजकूर आकार'}
                    </Label>
                    <p className="text-sm text-gray-500">
                      {language === 'en' 
                        ? 'Adjust the text size for easier reading.' 
                        : 'सुलभ वाचनासाठी मजकूर आकार समायोजित करा.'}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">A-</Button>
                    <Button variant="outline" size="sm">A+</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="language" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>{language === 'en' ? 'Language' : 'भाषा'}</CardTitle>
                <CardDescription>
                  {language === 'en' 
                    ? 'Choose your preferred language.' 
                    : 'आपली पसंतीची भाषा निवडा.'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button 
                    variant={language === 'en' ? 'default' : 'outline'} 
                    className={language === 'en' ? 'bg-primary-600 hover:bg-primary-700' : ''}
                    onClick={() => setLanguage('en')}
                  >
                    English
                  </Button>
                  <Button 
                    variant={language === 'mr' ? 'default' : 'outline'}
                    className={language === 'mr' ? 'bg-primary-600 hover:bg-primary-700' : ''}
                    onClick={() => setLanguage('mr')}
                  >
                    मराठी (Marathi)
                  </Button>
                  <Button 
                    variant="outline" 
                    disabled
                  >
                    हिंदी (Hindi) - Coming Soon
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>{language === 'en' ? 'Notifications' : 'सूचना'}</CardTitle>
                <CardDescription>
                  {language === 'en' 
                    ? 'Manage your notification preferences.' 
                    : 'आपल्या सूचना प्राधान्यांचे व्यवस्थापन करा.'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="weather-alerts">
                      {language === 'en' ? 'Weather Alerts' : 'हवामान सूचना'}
                    </Label>
                    <p className="text-sm text-gray-500">
                      {language === 'en' 
                        ? 'Receive notifications about weather changes affecting your crops.' 
                        : 'आपल्या पिकांवर परिणाम करणाऱ्या हवामान बदलांबद्दल सूचना प्राप्त करा.'}
                    </p>
                  </div>
                  <Switch id="weather-alerts" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="crop-calendar">
                      {language === 'en' ? 'Crop Calendar Reminders' : 'पीक कॅलेंडर स्मरणपत्रे'}
                    </Label>
                    <p className="text-sm text-gray-500">
                      {language === 'en' 
                        ? 'Get reminders for important farming activities.' 
                        : 'महत्त्वपूर्ण शेती क्रियाकलापांसाठी स्मरणपत्रे मिळवा.'}
                    </p>
                  </div>
                  <Switch id="crop-calendar" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="market-rates">
                      {language === 'en' ? 'Market Rate Updates' : 'बाजार दर अपडेट्स'}
                    </Label>
                    <p className="text-sm text-gray-500">
                      {language === 'en' 
                        ? 'Get notified about significant changes in crop prices.' 
                        : 'पीक किंमतींमधील महत्त्वपूर्ण बदलांबद्दल सूचित करा.'}
                    </p>
                  </div>
                  <Switch id="market-rates" defaultChecked />
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between mb-4">
                    <Label htmlFor="offline-mode">
                      {language === 'en' ? 'Offline Mode' : 'ऑफलाइन मोड'}
                    </Label>
                    <div className="flex items-center space-x-2">
                      <WifiOff className="h-4 w-4 text-gray-400" />
                      <Switch id="offline-mode" />
                      <Wifi className="h-4 w-4 text-blue-400" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">
                    {language === 'en' 
                      ? 'Enable offline mode to use KrishiMitra with limited functionality when you have no internet connection.'
                      : 'आपल्याकडे इंटरनेट कनेक्शन नसताना मर्यादित कार्यक्षमतेसह कृषिमित्र वापरण्यासाठी ऑफलाइन मोड सक्षम करा.'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default SettingsPage;
