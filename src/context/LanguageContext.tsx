
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
    // Crop Recommendation
    "Recommendations Ready": "Recommendations Ready",
    "We've analyzed your data and prepared crop recommendations.": "We've analyzed your data and prepared crop recommendations.",
    "Error": "Error",
    "Failed to get crop recommendations.": "Failed to get crop recommendations.",
    "Crop Recommendation System": "Crop Recommendation System",
    "Get AI-powered recommendations for the best crops to grow based on your specific soil and climate conditions.": "Get AI-powered recommendations for the best crops to grow based on your specific soil and climate conditions.",
    "Soil Type": "Soil Type",
    "Select soil type": "Select soil type",
    "Clay": "Clay",
    "Loamy": "Loamy",
    "Sandy": "Sandy",
    "Black": "Black",
    "Red": "Red",
    "Silt": "Silt",
    "Nitrogen (kg/ha)": "Nitrogen (kg/ha)",
    "e.g., 80": "e.g., 80",
    "Phosphorus (kg/ha)": "Phosphorus (kg/ha)",
    "e.g., 45": "e.g., 45",
    "Potassium (kg/ha)": "Potassium (kg/ha)",
    "e.g., 60": "e.g., 60",
    "Soil pH Level": "Soil pH Level",
    "e.g., 6.5": "e.g., 6.5",
    "Average Temperature (°C)": "Average Temperature (°C)",
    "e.g., 25": "e.g., 25",
    "Humidity (%)": "Humidity (%)",
    "e.g., 60": "e.g., 60",
    "Annual Rainfall (mm)": "Annual Rainfall (mm)",
    "e.g., 1200": "e.g., 1200",
    "Location (District/State)": "Location (District/State)",
    "e.g., Pune, Maharashtra": "e.g., Pune, Maharashtra",
    "Analyzing...": "Analyzing...",
    "Get Crop Recommendations": "Get Crop Recommendations",
    "Recommended Crops": "Recommended Crops",
    "match": "match",
    "Farming Tips": "Farming Tips",
    // Profile
    "My Profile": "My Profile",
    "Profile Information": "Profile Information",
    "Personal Information": "Personal Information",
    "Change Photo": "Change Photo",
    "Enter your first name": "Enter your first name",
    "Enter your last name": "Enter your last name",
    "Phone Number": "Phone Number",
    "Enter your phone number": "Enter your phone number",
    "Enter your address": "Enter your address",
    "Bio": "Bio",
    "Tell us a little about yourself": "Tell us a little about yourself",
    "Saving...": "Saving...",
    "Save Profile": "Save Profile",
    "My Activity": "My Activity",
    "Download Crop Recommendations": "Download Crop Recommendations",
    "Download Disease Detections": "Download Disease Detections",
    "Download Complete Activity": "Download Complete Activity",
    "Recent Crop Recommendations": "Recent Crop Recommendations",
    "Recent Disease Detections": "Recent Disease Detections",
    "Date": "Date",
    "Crop": "Crop",
    "Soil Type": "Soil Type",
    "Confidence": "Confidence",
    "Disease": "Disease",
    "No crop recommendations found.": "No crop recommendations found.",
    "No disease detections found.": "No disease detections found.",
    "Please log in to view your profile.": "Please log in to view your profile.",
    "Profile Updated": "Profile Updated",
    "Your profile has been successfully updated.": "Your profile has been successfully updated.",
    "Update Failed": "Update Failed", 
    "There was a problem updating your profile.": "There was a problem updating your profile.",
    "Report Generated": "Report Generated",
    "Crop recommendation report has been downloaded.": "Crop recommendation report has been downloaded.",
    "Disease detection report has been downloaded.": "Disease detection report has been downloaded.",
    "Activity report has been downloaded.": "Activity report has been downloaded.",
    "Report Generation Failed": "Report Generation Failed",
    "There was a problem generating your report.": "There was a problem generating your report.",
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
    // Crop Recommendation
    "Recommendations Ready": "शिफारशी तयार आहेत",
    "We've analyzed your data and prepared crop recommendations.": "आम्ही आपला डेटा विश्लेषित केला आहे आणि पीक शिफारशी तयार केल्या आहेत.",
    "Error": "त्रुटी",
    "Failed to get crop recommendations.": "पीक शिफारशी मिळविण्यात अयशस्वी.",
    "Crop Recommendation System": "पीक शिफारस प्रणाली",
    "Get AI-powered recommendations for the best crops to grow based on your specific soil and climate conditions.": "आपल्या विशिष्ट माती आणि हवामान परिस्थितीच्या आधारे वाढवण्यासाठी सर्वोत्तम पिकांसाठी AI-संचालित शिफारशी मिळवा.",
    "Soil Type": "माती प्रकार",
    "Select soil type": "माती प्रकार निवडा",
    "Clay": "चिकणमाती",
    "Loamy": "मुरमाड",
    "Sandy": "वाळूयुक्त",
    "Black": "काळी",
    "Red": "लाल",
    "Silt": "गाळ",
    "Nitrogen (kg/ha)": "नायट्रोजन (kg/ha)",
    "e.g., 80": "उदा., 80",
    "Phosphorus (kg/ha)": "फॉस्फरस (kg/ha)",
    "e.g., 45": "उदा., 45",
    "Potassium (kg/ha)": "पोटॅशियम (kg/ha)",
    "e.g., 60": "उदा., 60",
    "Soil pH Level": "माती pH स्तर",
    "e.g., 6.5": "उदा., 6.5",
    "Average Temperature (°C)": "सरासरी तापमान (°C)",
    "e.g., 25": "उदा., 25",
    "Humidity (%)": "आर्द्रता (%)",
    "e.g., 60": "उदा., 60",
    "Annual Rainfall (mm)": "वार्षिक पाऊस (mm)",
    "e.g., 1200": "उदा., 1200",
    "Location (District/State)": "स्थान (जिल्हा/राज्य)",
    "e.g., Pune, Maharashtra": "उदा., पुणे, महाराष्ट्र",
    "Analyzing...": "विश्लेषण करत आहे...",
    "Get Crop Recommendations": "पीक शिफारशी मिळवा",
    "Recommended Crops": "शिफारस केलेली पिके",
    "match": "जुळणी",
    "Farming Tips": "शेती टिप्स",
    // Profile
    "My Profile": "माझे प्रोफाइल",
    "Profile Information": "प्रोफाइल माहिती",
    "Personal Information": "वैयक्तिक माहिती",
    "Change Photo": "फोटो बदला",
    "Enter your first name": "तुमचे पहिले नाव प्रविष्ट करा",
    "Enter your last name": "तुमचे आडनाव प्रविष्ट करा",
    "Phone Number": "फोन नंबर",
    "Enter your phone number": "तुमचा फोन नंबर प्रविष्ट करा",
    "Enter your address": "तुमचा पत्ता प्रविष्ट करा",
    "Bio": "परिचय",
    "Tell us a little about yourself": "स्वतःबद्दल थोडे सांगा",
    "Saving...": "जतन करत आहे...",
    "Save Profile": "प्रोफाइल जतन करा",
    "My Activity": "माझी क्रियाकलाप",
    "Download Crop Recommendations": "पीक शिफारशी डाउनलोड करा",
    "Download Disease Detections": "रोग शोध डाउनलोड करा",
    "Download Complete Activity": "संपूर्ण क्रियाकलाप डाउनलोड करा",
    "Recent Crop Recommendations": "अलीकडील पीक शिफारशी",
    "Recent Disease Detections": "अलीकडील रोग शोध",
    "Date": "दिनांक",
    "Crop": "पीक",
    "Soil Type": "माती प्रकार",
    "Confidence": "विश्वास",
    "Disease": "रोग",
    "No crop recommendations found.": "पीक शिफारशी आढळल्या नाहीत.",
    "No disease detections found.": "रोग शोध आढळले नाहीत.",
    "Please log in to view your profile.": "कृपया तुमचे प्रोफाइल पाहण्यासाठी लॉग इन करा.",
    "Profile Updated": "प्रोफाइल अपडेट केले",
    "Your profile has been successfully updated.": "तुमचे प्रोफाइल यशस्वीरित्या अपडेट केले गेले आहे.",
    "Update Failed": "अपडेट अयशस्वी",
    "There was a problem updating your profile.": "तुमचे प्रोफाइल अपडेट करण्यात समस्या आली.",
    "Report Generated": "अहवाल तयार झाला",
    "Crop recommendation report has been downloaded.": "पीक शिफारस अहवाल डाउनलोड केला गेला आहे.",
    "Disease detection report has been downloaded.": "रोग शोध अहवाल डाउनलोड केला गेला आहे.",
    "Activity report has been downloaded.": "क्रियाकलाप अहवाल डाउनलोड केला गेला आहे.",
    "Report Generation Failed": "अहवाल निर्मिती अयशस्वी",
    "There was a problem generating your report.": "तुमचा अहवाल तयार करण्यात समस्या आली.",
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

// Export useTranslation as an alias for useLanguage for better semantic meaning
export const useTranslation = useLanguage;

