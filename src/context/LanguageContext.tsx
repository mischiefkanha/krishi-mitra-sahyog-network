
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define available languages
type LanguageCode = 'en' | 'mr' | 'hi';

// Interface for the translations
interface Translations {
  [key: string]: {
    en: string;
    mr: string;
    hi: string;
  };
}

// Translation function type
type TranslationFunction = (key: string) => string;

// Context interface
interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
  t: TranslationFunction;
}

// Define translations
const translations: Translations = {
  // General
  dashboard: {
    en: 'Dashboard',
    mr: 'डॅशबोर्ड',
    hi: 'डैशबोर्ड'
  },
  home: {
    en: 'Home',
    mr: 'मुख्यपृष्ठ',
    hi: 'होम'
  },
  profile: {
    en: 'Profile',
    mr: 'प्रोफाइल',
    hi: 'प्रोफाइल'
  },
  settings: {
    en: 'Settings',
    mr: 'सेटिंग्ज',
    hi: 'सेटिंग्स'
  },
  login: {
    en: 'Login',
    mr: 'लॉगिन',
    hi: 'लॉगिन'
  },
  signup: {
    en: 'Sign Up',
    mr: 'साइन अप',
    hi: 'साइन अप'
  },
  logout: {
    en: 'Logout',
    mr: 'लॉगआउट',
    hi: 'लॉगआउट'
  },
  
  // Crop Recommendation
  cropRecommendation: {
    en: 'Crop Recommendation',
    mr: 'पीक शिफारस',
    hi: 'फसल की सिफारिश'
  },
  cropRecommendationDesc: {
    en: 'Enter soil details and environmental conditions to get personalized crop recommendations',
    mr: 'वैयक्तिकृत पीक शिफारसी मिळवण्यासाठी मातीची माहिती आणि पर्यावरणीय परिस्थिती प्रविष्ट करा',
    hi: 'व्यक्तिगत फसल सिफारिशें प्राप्त करने के लिए मिट्टी विवरण और पर्यावरणीय स्थितियां दर्ज करें'
  },
  enterSoilDetails: {
    en: 'Enter Soil Details',
    mr: 'मातीची माहिती प्रविष्ट करा',
    hi: 'मिट्टी का विवरण दर्ज करें'
  },
  soilType: {
    en: 'Soil Type',
    mr: 'मातीचा प्रकार',
    hi: 'मिट्टी का प्रकार'
  },
  selectSoilType: {
    en: 'Select soil type',
    mr: 'मातीचा प्रकार निवडा',
    hi: 'मिट्टी का प्रकार चुनें'
  },
  nitrogen: {
    en: 'Nitrogen',
    mr: 'नायट्रोजन',
    hi: 'नाइट्रोजन'
  },
  phosphorus: {
    en: 'Phosphorus',
    mr: 'फॉस्फरस',
    hi: 'फास्फोरस'
  },
  potassium: {
    en: 'Potassium',
    mr: 'पोटॅशियम',
    hi: 'पोटैशियम'
  },
  ph: {
    en: 'pH Level',
    mr: 'पीएच स्तर',
    hi: 'पीएच स्तर'
  },
  temperature: {
    en: 'Temperature',
    mr: 'तापमान',
    hi: 'तापमान'
  },
  humidity: {
    en: 'Humidity',
    mr: 'आर्द्रता',
    hi: 'आर्द्रता'
  },
  rainfall: {
    en: 'Rainfall',
    mr: 'पाऊस',
    hi: 'वर्षा'
  },
  getCropRecommendation: {
    en: 'Get Crop Recommendation',
    mr: 'पीक शिफारस मिळवा',
    hi: 'फसल की सिफारिश प्राप्त करें'
  },
  recommendation: {
    en: 'Recommendation',
    mr: 'शिफारस',
    hi: 'सिफारिश'
  },
  basedOnYourInputs: {
    en: 'Based on your inputs',
    mr: 'आपल्या प्रविष्टींवर आधारित',
    hi: 'आपके इनपुट के आधार पर'
  },
  fillFormForRecommendation: {
    en: 'Fill the form to get recommendation',
    mr: 'शिफारस मिळवण्यासाठी फॉर्म भरा',
    hi: 'सिफारिश प्राप्त करने के लिए फॉर्म भरें'
  },
  confidence: {
    en: 'Confidence',
    mr: 'विश्वास',
    hi: 'विश्वास'
  },
  temperatureValue: {
    en: 'Temperature',
    mr: 'तापमान',
    hi: 'तापमान'
  },
  humidityValue: {
    en: 'Humidity',
    mr: 'आर्द्रता',
    hi: 'आर्द्रता'
  },
  rainfallValue: {
    en: 'Rainfall',
    mr: 'पाऊस',
    hi: 'वर्षा'
  },
  downloadReport: {
    en: 'Download Report',
    mr: 'अहवाल डाउनलोड करा',
    hi: 'रिपोर्ट डाउनलोड करें'
  },
  enterSoilDetailsToGetRecommendation: {
    en: 'Enter soil details to get crop recommendations',
    mr: 'पीक शिफारसी मिळवण्यासाठी मातीची माहिती प्रविष्ट करा',
    hi: 'फसल की सिफारिशें प्राप्त करने के लिए मिट्टी का विवरण दर्ज करें'
  },
  analyzing: {
    en: 'Analyzing...',
    mr: 'विश्लेषण करत आहे...',
    hi: 'विश्लेषण कर रहा है...'
  },
  speak: {
    en: 'Speak',
    mr: 'बोला',
    hi: 'बोलें'
  },
  
  // Disease Detection
  diseaseDetection: {
    en: 'Disease Detection',
    mr: 'रोग निदान',
    hi: 'रोग पहचान'
  },
  diseaseDetectionDesc: {
    en: 'Upload a photo of your crop to detect diseases',
    mr: 'रोग शोधण्यासाठी आपल्या पिकाचा फोटो अपलोड करा',
    hi: 'रोगों का पता लगाने के लिए अपनी फसल की एक तस्वीर अपलोड करें'
  },
  uploadImage: {
    en: 'Upload Image',
    mr: 'प्रतिमा अपलोड करा',
    hi: 'छवि अपलोड करें'
  },
  dragDropImage: {
    en: 'Drag and drop image here, or click to browse',
    mr: 'इथे प्रतिमा ड्रॅग आणि ड्रॉप करा, किंवा ब्राउझ करण्यासाठी क्लिक करा',
    hi: 'यहां छवि खींचें और छोड़ें, या ब्राउज़ करने के लिए क्लिक करें'
  },
  browse: {
    en: 'Browse Files',
    mr: 'फाइल्स ब्राउझ करा',
    hi: 'फ़ाइलें ब्राउज़ करें'
  },
  takePhoto: {
    en: 'Take Photo',
    mr: 'फोटो काढा',
    hi: 'फोटो लें'
  },
  results: {
    en: 'Results',
    mr: 'परिणाम',
    hi: 'परिणाम'
  },
  detectionResults: {
    en: 'Disease detection results',
    mr: 'रोग निदान परिणाम',
    hi: 'रोग पहचान परिणाम'
  },
  uploadImageForResults: {
    en: 'Upload an image to see results',
    mr: 'परिणाम पाहण्यासाठी प्रतिमा अपलोड करा',
    hi: 'परिणाम देखने के लिए एक छवि अपलोड करें'
  },
  description: {
    en: 'Description',
    mr: 'वर्णन',
    hi: 'विवरण'
  },
  recommendedTreatment: {
    en: 'Recommended Treatment',
    mr: 'शिफारस केलेले उपचार',
    hi: 'अनुशंसित उपचार'
  },
  consultExpertAdvice: {
    en: 'Please consult with an agricultural expert for professional advice on treatment.',
    mr: 'कृपया उपचारांबद्दल व्यावसायिक सल्ल्यासाठी कृषी तज्ञांचा सल्ला घ्या.',
    hi: 'उपचार पर पेशेवर सलाह के लिए कृपया एक कृषि विशेषज्ञ से परामर्श करें।'
  },
  uploadImageToSeeResults: {
    en: 'Upload an image of your crop to detect diseases',
    mr: 'रोग शोधण्यासाठी आपल्या पिकाची प्रतिमा अपलोड करा',
    hi: 'रोगों का पता लगाने के लिए अपनी फसल की एक छवि अपलोड करें'
  },
  analyzingImage: {
    en: 'Analyzing image...',
    mr: 'प्रतिमा विश्लेषण करत आहे...',
    hi: 'छवि का विश्लेषण कर रहा है...'
  },
  changeImage: {
    en: 'Change Image',
    mr: 'प्रतिमा बदला',
    hi: 'छवि बदलें'
  },
  severeSeverity: {
    en: 'Severe',
    mr: 'गंभीर',
    hi: 'गंभीर'
  },
  moderateSeverity: {
    en: 'Moderate',
    mr: 'मध्यम',
    hi: 'मध्यम'
  },
  earlyStageSeverity: {
    en: 'Early Stage',
    mr: 'सुरुवातीचा टप्पा',
    hi: 'प्रारंभिक अवस्था'
  },
  healthySeverity: {
    en: 'Healthy',
    mr: 'निरोगी',
    hi: 'स्वस्थ'
  },
  
  // Dashboard
  overview: {
    en: 'Overview',
    mr: 'अवलोकन',
    hi: 'अवलोकन'
  },
  crops: {
    en: 'Crops',
    mr: 'पिके',
    hi: 'फसलें'
  },
  diseases: {
    en: 'Diseases',
    mr: 'रोग',
    hi: 'रोग'
  },
  activity: {
    en: 'Activity',
    mr: 'क्रियाकलाप',
    hi: 'गतिविधि'
  },
  cropDistribution: {
    en: 'Crop Distribution',
    mr: 'पीक वितरण',
    hi: 'फसल वितरण'
  },
  recentCropRecommendations: {
    en: 'Recent Crop Recommendations',
    mr: 'अलीकडील पीक शिफारसी',
    hi: 'हाल की फसल सिफारिशें'
  },
  recentDiseaseDetections: {
    en: 'Recent Disease Detections',
    mr: 'अलीकडील रोग निदान',
    hi: 'हाल के रोग का पता लगाना'
  },
  downloadReports: {
    en: 'Download Reports',
    mr: 'अहवाल डाउनलोड करा',
    hi: 'रिपोर्ट डाउनलोड करें'
  }
};

// Create context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: () => '',
});

// Provider component
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<LanguageCode>(() => {
    // Initialize language from localStorage or default to 'en'
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('language');
      return (savedLanguage === 'en' || savedLanguage === 'mr' || savedLanguage === 'hi') 
        ? savedLanguage 
        : 'en';
    }
    return 'en';
  });

  // Save language preference to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', language);
    }
  }, [language]);

  // Translation function
  const t: TranslationFunction = (key) => {
    if (translations[key]?.[language]) {
      return translations[key][language];
    }
    // Fallback to English if translation is missing
    if (translations[key]?.en) {
      return translations[key].en;
    }
    // Return key if no translation exists
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook for using the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Alternate hook that focuses only on translations
export const useTranslation = () => {
  const { language, t } = useContext(LanguageContext);
  return { language, t };
};

export default LanguageContext;
