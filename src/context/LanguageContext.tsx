
import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'mr';

// Translation dictionary
export const translations = {
  en: {
    // Navigation
    home: 'Home',
    dashboard: 'Dashboard',
    cropRecommendation: 'Crop Recommendation',
    diseaseDetection: 'Disease Detection',
    marketplace: 'Marketplace',
    profile: 'Profile',
    feedback: 'Feedback',
    // Auth
    login: 'Login',
    register: 'Register',
    signOut: 'Sign Out',
    // Profile
    personalInfo: 'Personal Information',
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email',
    phone: 'Phone',
    address: 'Address',
    saveChanges: 'Save Changes',
    // Dashboard
    overview: 'Overview',
    crops: 'Crops',
    diseases: 'Diseases',
    activity: 'Activity Overview',
    cropDistribution: 'Crop Distribution',
    recentCropRecommendations: 'Recent Crop Recommendations',
    recentDiseaseDetections: 'Recent Disease Detections',
    downloadReports: 'Download Reports',
    // Feedback
    feedbackLabel: 'Send Feedback',
    feedbackName: 'Your Name',
    feedbackEmail: 'Your Email',
    feedbackMessage: 'Message',
    feedbackCategory: 'Category',
    feedbackSubmit: 'Submit Feedback',
    feedbackSuccess: 'Thank you for your feedback!',
  },
  mr: {
    // Navigation
    home: 'मुख्यपृष्ठ',
    dashboard: 'डॅशबोर्ड',
    cropRecommendation: 'पीक शिफारस',
    diseaseDetection: 'रोग शोध',
    marketplace: 'बाजारपेठ',
    profile: 'प्रोफाइल',
    feedback: 'अभिप्राय',
    // Auth
    login: 'लॉग इन',
    register: 'नोंदणी करा',
    signOut: 'साइन आउट',
    // Profile
    personalInfo: 'वैयक्तिक माहिती',
    firstName: 'पहिले नाव',
    lastName: 'आडनाव',
    email: 'ईमेल',
    phone: 'फोन',
    address: 'पत्ता',
    saveChanges: 'बदल जतन करा',
    // Dashboard
    overview: 'आढावा',
    crops: 'पिके',
    diseases: 'रोग',
    activity: 'क्रियाकलाप आढावा',
    cropDistribution: 'पीक वितरण',
    recentCropRecommendations: 'अलीकडील पीक शिफारसी',
    recentDiseaseDetections: 'अलीकडील रोग शोध',
    downloadReports: 'अहवाल डाउनलोड करा',
    // Feedback
    feedbackLabel: 'अभिप्राय पाठवा',
    feedbackName: 'तुमचे नाव',
    feedbackEmail: 'तुमचा ईमेल',
    feedbackMessage: 'संदेश',
    feedbackCategory: 'श्रेणी',
    feedbackSubmit: 'अभिप्राय सबमिट करा',
    feedbackSuccess: 'तुमच्या अभिप्रायासाठी धन्यवाद!',
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations.en) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language');
    return (savedLanguage as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Translation function
  const t = (key: keyof typeof translations.en): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
