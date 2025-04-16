import { useTranslation } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, MicOff, Volume2, Loader2, HelpCircle } from "lucide-react";
import { useState } from "react";

const VoiceAssistantPage = () => {
  const { language } = useTranslation();
  const { theme } = useTheme();
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState("");

  const getTranslation = (en: string, mr: string) => {
    return language === 'en' ? en : mr;
  };

  const toggleListening = () => {
    if (isListening) {
      setIsListening(false);
      // In a real implementation, we would stop the speech recognition here
    } else {
      setIsListening(true);
      setIsProcessing(true);
      // Simulate processing
      setTimeout(() => {
        setIsProcessing(false);
        setTranscript(
          getTranslation(
            "How can I help you with your farming today?",
            "आज मी तुमच्या शेतीमध्ये कशी मदत करू शकतो?"
          )
        );
      }, 1500);
    }
  };

  const handleSpeakResponse = () => {
    // In a real implementation, this would use text-to-speech API
    if ('speechSynthesis' in window && transcript) {
      const speech = new SpeechSynthesisUtterance();
      speech.text = transcript;
      speech.lang = language === 'en' ? 'en-US' : 'mr-IN';
      window.speechSynthesis.speak(speech);
    }
  };

  return (
    <Layout>
      <div className="container py-12 mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">
            {getTranslation('Voice Assistant', 'आवाज सहाय्यक')}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            {getTranslation(
              'Use voice commands to navigate the app and get information about farming in your preferred language.', 
              'आपल्या पसंतीच्या भाषेत अॅप नेव्हिगेट करण्यासाठी आणि शेतीविषयी माहिती मिळवण्यासाठी व्हॉइस कमांड वापरा.'
            )}
          </p>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
            <div className={`p-10 ${isListening ? 'bg-primary-50 dark:bg-primary-900/30' : 'bg-gray-50 dark:bg-gray-900/50'}`}>
              <div className="flex flex-col items-center">
                <div 
                  className={`relative inline-flex items-center justify-center w-32 h-32 rounded-full mb-6 transition-all
                    ${isListening 
                      ? 'bg-primary-100 dark:bg-primary-900/50 ring-4 ring-primary-200 dark:ring-primary-800' 
                      : 'bg-gray-100 dark:bg-gray-800'}`}
                >
                  <button 
                    onClick={toggleListening}
                    className={`absolute inset-4 rounded-full flex items-center justify-center transition-all
                      ${isListening 
                        ? 'bg-primary-600 text-white pulsate'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <Loader2 size={40} className="animate-spin text-primary-100" />
                    ) : isListening ? (
                      <MicOff size={40} />
                    ) : (
                      <Mic size={40} />
                    )}
                  </button>
                </div>
                <h2 className="text-xl md:text-2xl font-semibold mb-3">
                  {isProcessing
                    ? getTranslation('Listening...', 'ऐकत आहे...')
                    : isListening
                    ? getTranslation('Tap to stop', 'थांबवण्यासाठी टॅप करा')
                    : getTranslation('Tap to speak', 'बोलण्यासाठी टॅप करा')}
                </h2>
                {!isListening && (
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {getTranslation(
                      'Press the microphone button and ask any farming related question',
                      'मायक्रोफोन बटण दाबा आणि कोणताही शेतीशी संबंधित प्रश्न विचारा'
                    )}
                  </p>
                )}
              </div>
            </div>
            
            {transcript && (
              <div className="p-6">
                <Card className="bg-primary-50 dark:bg-primary-900/30 border-none">
                  <CardContent className="p-4 relative">
                    <p className="text-lg">{transcript}</p>
                    {transcript && (
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="absolute top-2 right-2"
                        onClick={handleSpeakResponse}
                      >
                        <Volume2 size={16} />
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
            
            <div className="p-6 border-t border-gray-100 dark:border-gray-700">
              <h3 className="font-medium mb-3 flex items-center gap-2">
                <HelpCircle size={16} className="text-primary-600" />
                {getTranslation('Try asking', 'विचारण्याचा प्रयत्न करा')}:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Button variant="outline" size="sm" className="justify-start">
                  {getTranslation('"What crops are suitable for sandy soil?"', '"वाळूच्या मातीसाठी कोणती पिके योग्य आहेत?"')}
                </Button>
                <Button variant="outline" size="sm" className="justify-start">
                  {getTranslation('"How to prevent tomato leaf diseases?"', '"टोमॅटोच्या पानांचे रोग कसे टाळावेत?"')}
                </Button>
                <Button variant="outline" size="sm" className="justify-start">
                  {getTranslation('"Current market price of wheat"', '"गव्हाची सध्याची बाजार किंमत"')}
                </Button>
                <Button variant="outline" size="sm" className="justify-start">
                  {getTranslation('"Weather forecast for next week"', '"पुढील आठवड्याचा हवामान अंदाज"')}
                </Button>
              </div>
            </div>
          </div>
          
          <div className="mt-12">
            <h3 className="text-xl font-semibold mb-6">
              {getTranslation('Enhanced Features Coming Soon', 'सुधारित वैशिष्ट्ये लवकरच येत आहेत')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="h-12 w-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-600"><rect width="8" height="14" x="8" y="6" rx="4" /><path d="m19 7-3 3" /><path d="m19 17-3-3" /><line x1="5" x2="5" y1="7" y2="17" /></svg>
                  </div>
                  <h4 className="text-lg font-medium mb-2">
                    {getTranslation('Voice Controls', 'आवाज नियंत्रणे')}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {getTranslation(
                      'Navigate through the app using only voice commands',
                      'केवळ व्हॉइस कमांड वापरून अॅप नेव्हिगेट करा'
                    )}
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="h-12 w-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-600"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" x2="12" y1="19" y2="22" /></svg>
                  </div>
                  <h4 className="text-lg font-medium mb-2">
                    {getTranslation('Multiple Languages', 'अनेक भाषा')}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {getTranslation(
                      'Support for Hindi, Marathi, and other regional languages',
                      'हिंदी, मराठी आणि इतर प्रादेशिक भाषांसाठी समर्थन'
                    )}
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="h-12 w-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-600"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><path d="M12 17h.01" /></svg>
                  </div>
                  <h4 className="text-lg font-medium mb-2">
                    {getTranslation('Expert Advice', 'तज्ञ सल्ला')}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {getTranslation(
                      'Get real-time farming advice from agricultural experts',
                      'कृषी तज्ञांकडून रिअल-टाइम शेती सल्ला मिळवा'
                    )}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <style>
        {`
          @keyframes pulsate {
            0% {
              box-shadow: 0 0 0 0 rgba(76, 175, 80, 0.7);
            }
            70% {
              box-shadow: 0 0 0 10px rgba(76, 175, 80, 0);
            }
            100% {
              box-shadow: 0 0 0 0 rgba(76, 175, 80, 0);
            }
          }
          
          .pulsate {
            animation: pulsate 1.5s infinite;
          }
        `}
      </style>
    </Layout>
  );
};

export default VoiceAssistantPage;
