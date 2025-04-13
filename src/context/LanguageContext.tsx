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
    tutorials: 'Tutorials',
    forum: 'Community Forum',
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
    phoneNumber: 'Phone Number',
    address: 'Address',
    bio: 'Bio',
    enterFirstName: 'Enter your first name',
    enterLastName: 'Enter your last name',
    enterPhone: 'Enter your phone number',
    enterAddress: 'Enter your address',
    bioPlaceholder: 'Tell us a little about yourself',
    saveChanges: 'Save Changes',
    saving: 'Saving...',
    saveProfile: 'Save Profile',
    myProfile: 'My Profile',
    profileInfo: 'Profile Information',
    changePhoto: 'Change Photo',
    myActivity: 'My Activity',
    profileUpdated: 'Profile Updated',
    profileUpdateSuccess: 'Your profile has been successfully updated.',
    updateFailed: 'Update Failed',
    profileUpdateError: 'There was a problem updating your profile.',
    pleaseLogin: 'Please log in to view your profile.',
    // Reports
    reportGenerated: 'Report Generated',
    cropReportDownloaded: 'Crop recommendation report has been downloaded.',
    diseaseReportDownloaded: 'Disease detection report has been downloaded.',
    activityReportDownloaded: 'Activity report has been downloaded.',
    reportGenerationFailed: 'Report Generation Failed',
    reportGenerationError: 'There was a problem generating your report.',
    // Dashboard
    overview: 'Overview',
    crops: 'Crops',
    diseases: 'Diseases',
    activity: 'Activity Overview',
    cropDistribution: 'Crop Distribution',
    recentCropRecommendations: 'Recent Crop Recommendations',
    recentDiseaseDetections: 'Recent Disease Detections',
    downloadReports: 'Download Reports',
    downloadCropRecommendations: 'Download Crop Recommendations',
    downloadDiseaseDetections: 'Download Disease Detections',
    downloadCompleteActivity: 'Download Complete Activity',
    // Feedback
    feedbackLabel: 'Send Feedback',
    feedbackName: 'Your Name',
    feedbackEmail: 'Your Email',
    feedbackMessage: 'Message',
    feedbackCategory: 'Category',
    feedbackSubmit: 'Submit Feedback',
    feedbackSuccess: 'Thank you for your feedback!',
    // Table headers
    date: 'Date',
    crop: 'Crop',
    soilType: 'Soil Type',
    confidence: 'Confidence',
    disease: 'Disease',
    noCropRecommendations: 'No crop recommendations found.',
    noDiseaseDetections: 'No disease detections found.',
    // Crop Recommendation
    recommendationsReady: 'Recommendations Ready',
    recommendationsMessage: 'We\'ve analyzed your data and prepared crop recommendations.',
    error: 'Error',
    cropRecommendationError: 'Failed to get crop recommendations.',
    cropRecommendationSystem: 'Crop Recommendation System',
    cropRecommendationDescription: 'Get AI-powered recommendations for the best crops to grow based on your specific soil and climate conditions.',
    selectSoilType: 'Select soil type',
    clay: 'Clay',
    loamy: 'Loamy',
    sandy: 'Sandy',
    black: 'Black',
    red: 'Red',
    silt: 'Silt',
    nitrogen: 'Nitrogen (kg/ha)',
    nitrogenExample: 'e.g., 80',
    phosphorus: 'Phosphorus (kg/ha)',
    phosphorusExample: 'e.g., 45',
    potassium: 'Potassium (kg/ha)',
    potassiumExample: 'e.g., 60',
    soilPH: 'Soil pH Level',
    soilPHExample: 'e.g., 6.5',
    avgTemperature: 'Average Temperature (°C)',
    temperatureExample: 'e.g., 25',
    humidity: 'Humidity (%)',
    humidityExample: 'e.g., 60',
    rainfall: 'Annual Rainfall (mm)',
    rainfallExample: 'e.g., 1200',
    location: 'Location (District/State)',
    locationExample: 'e.g., Pune, Maharashtra',
    analyzing: 'Analyzing...',
    getCropRecommendations: 'Get Crop Recommendations',
    recommendedCrops: 'Recommended Crops',
    match: 'match',
    farmingTips: 'Farming Tips',
    // New translations for added features
    nearbyAgricultureServices: 'Nearby Agriculture Services',
    findNearbyServices: 'Find fertilizer, pesticide dealers and more near you',
    locationError: 'Location Error',
    tryAgain: 'Try Again',
    nearbyServices: 'Nearby Services',
    noServicesFound: 'No agriculture services found nearby.',
    distance: 'Distance',
    refresh: 'Refresh',
    // Tutorials
    tutorialsTitle: 'Agricultural Tutorials',
    tutorialsDescription: 'Learn farming techniques through video lessons',
    uploadTutorial: 'Upload Tutorial',
    tutorialTitle: 'Tutorial Title',
    tutorialDescription: 'Tutorial Description',
    tutorialCategory: 'Category',
    tutorialVideo: 'Video',
    upload: 'Upload',
    uploading: 'Uploading...',
    cropCare: 'Crop Care',
    diseasePrevention: 'Disease Prevention',
    organicFarming: 'Organic Farming',
    waterManagement: 'Water Management',
    soilHealth: 'Soil Health',
    farmEquipment: 'Farm Equipment',
    viewAll: 'View All',
    // Forum
    communityForum: 'Community Forum',
    askQuestion: 'Ask a Question',
    questionTitle: 'Question Title',
    questionDetails: 'Question Details',
    postQuestion: 'Post Question',
    category: 'Category',
    sortBy: 'Sort By',
    newest: 'Newest',
    mostVoted: 'Most Voted',
    searchQuestions: 'Search questions...',
    replies: 'Replies',
    votes: 'Votes',
    views: 'Views',
    reply: 'Reply',
    yourAnswer: 'Your Answer',
    postAnswer: 'Post Answer',
    upvote: 'Upvote',
    downvote: 'Downvote',
    // Voice input
    tapToSpeak: 'Tap to speak',
    listening: 'Listening...',
    processingVoice: 'Processing voice...',
    microphonePermission: 'Please allow microphone access'
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
    tutorials: 'ट्युटोरियल्स',
    forum: 'समुदाय मंच',
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
    phoneNumber: 'फोन नंबर',
    address: 'पत्ता',
    bio: 'परिचय',
    enterFirstName: 'तुमचे पहिले नाव प्रविष्ट करा',
    enterLastName: 'तुमचे आडनाव प्रविष्ट करा',
    enterPhone: 'तुमचा फोन नंबर प्रविष्ट करा',
    enterAddress: 'तुमचा पत्ता प्रविष्ट करा',
    bioPlaceholder: 'स्वतःबद्दल थोडे सांगा',
    saveChanges: 'बदल जतन करा',
    saving: 'जतन करत आहे...',
    saveProfile: 'प्रोफाइल जतन करा',
    myProfile: 'माझे प्रोफाइल',
    profileInfo: 'प्रोफाइल माहिती',
    changePhoto: 'फोटो बदला',
    myActivity: 'माझी क्रियाकलाप',
    profileUpdated: 'प्रोफाइल अपडेट केले',
    profileUpdateSuccess: 'तुमचे प्रोफाइल यशस्वीरित्या अपडेट केले गेले आहे.',
    updateFailed: 'अपडेट अयशस्वी',
    profileUpdateError: 'तुमचे प्रोफाइल अपडेट करण्यात समस्या आली.',
    pleaseLogin: 'कृपया तुमचे प्रोफाइल पाहण्यासाठी लॉग इन करा.',
    // Reports
    reportGenerated: 'अहवाल तयार झाला',
    cropReportDownloaded: 'पीक शिफारस अहवाल डाउनलोड केला गेला आहे.',
    diseaseReportDownloaded: 'रोग शोध अहवाल डाउनलोड केला गेला आहे.',
    activityReportDownloaded: 'क्रियाकलाप अहवाल डाउनलोड केला गेला आहे.',
    reportGenerationFailed: 'अहवाल निर्मिती अयशस्वी',
    reportGenerationError: 'तुमचा अहवाल तयार करण्यात समस्या आली.',
    // Dashboard
    overview: 'आढावा',
    crops: 'पिके',
    diseases: 'रोग',
    activity: 'क्रियाकलाप आढावा',
    cropDistribution: 'पीक वितरण',
    recentCropRecommendations: 'अलीकडील पीक शिफारशी',
    recentDiseaseDetections: 'अलीकडील रोग शोध',
    downloadReports: 'अहवाल डाउनलोड करा',
    downloadCropRecommendations: 'पीक शिफारशी डाउनलोड करा',
    downloadDiseaseDetections: 'रोग शोध डाउनलोड करा',
    downloadCompleteActivity: 'संपूर्ण क्रियाकलाप डाउनलोड करा',
    // Feedback
    feedbackLabel: 'अभिप्राय पाठवा',
    feedbackName: 'तुमचे नाव',
    feedbackEmail: 'तुमचा ईमेल',
    feedbackMessage: 'संदेश',
    feedbackCategory: 'श्रेणी',
    feedbackSubmit: 'अभिप्राय सबमिट करा',
    feedbackSuccess: 'तुमच्या अभिप्रायासाठी धन्यवाद!',
    // Table headers
    date: 'दिनांक',
    crop: 'पीक',
    soilType: 'माती प्रकार',
    confidence: 'विश्वास',
    disease: 'रोग',
    noCropRecommendations: 'पीक शिफारशी आढळल्या नाहीत.',
    noDiseaseDetections: 'रोग शोध आढळले नाहीत.',
    // Crop Recommendation
    recommendationsReady: 'शिफारशी तयार आहेत',
    recommendationsMessage: 'आम्ही आपला डेटा विश्लेषित केला आहे आणि पीक शिफारशी तयार केल्या आहेत.',
    error: 'त्रुटी',
    cropRecommendationError: 'पीक शिफारशी मिळविण्यात अयशस्वी.',
    cropRecommendationSystem: 'पीक शिफारस प्रणाली',
    cropRecommendationDescription: 'आपल्या विशिष्ट माती आणि हवामान परिस्थितीच्या आधारे वाढवण्यासाठी सर्वोत्तम पिकांसाठी AI-संचालित शिफारशी मिळवा.',
    selectSoilType: 'माती प्रकार निवडा',
    clay: 'चिकणमाती',
    loamy: 'मुरमाड',
    sandy: 'वाळूयुक्त',
    black: 'काळी',
    red: 'लाल',
    silt: 'गाळ',
    nitrogen: 'नायट्रोजन (kg/ha)',
    nitrogenExample: 'उदा., 80',
    phosphorus: 'फॉस्फरस (kg/ha)',
    phosphorusExample: 'उदा., 45',
    potassium: 'पोटॅशियम (kg/ha)',
    potassiumExample: 'उदा., 60',
    soilPH: 'माती pH स्तर',
    soilPHExample: 'उदा., 6.5',
    avgTemperature: 'सरासरी तापमान (°C)',
    temperatureExample: 'उदा., 25',
    humidity: 'आर्द्रता (%)',
    humidityExample: 'उदा., 60',
    rainfall: 'वार्षिक पाऊस (mm)',
    rainfallExample: 'उदा., 1200',
    location: 'स्थान (जिल्हा/राज्य)',
    locationExample: 'उदा., पुणे, महाराष्ट्र',
    analyzing: 'विश्लेषण करत आहे...',
    getCropRecommendations: 'पीक शिफारशी मिळवा',
    recommendedCrops: 'शिफारस केलेली पिके',
    match: 'जुळणी',
    farmingTips: 'शेती टिप्स',
    // New translations for added features
    nearbyAgricultureServices: 'जवळपासच्या कृषि सेवा',
    findNearbyServices: 'जवळपासचे खते, कीटकनाशके विक्रेते आणि इतर शोधा',
    locationError: 'स्थान त्रुटी',
    tryAgain: 'पुन्हा प्रयत्न करा',
    nearbyServices: 'जवळपासच्या सेवा',
    noServicesFound: 'जवळपास कोणत्याही कृषि सेवा आढळल्या नाहीत.',
    distance: 'अंतर',
    refresh: 'रिफ्रेश करा',
    // Tutorials
    tutorialsTitle: 'शेती ट्युटोरियल्स',
    tutorialsDescription: 'व्हिडिओ धड्यांद्वारे शेती तंत्र शिका',
    uploadTutorial: 'ट्युटोरियल अपलोड करा',
    tutorialTitle: 'ट्युटोरियल शीर्षक',
    tutorialDescription: 'ट्युटोरियल वर्णन',
    tutorialCategory: 'श्रेणी',
    tutorialVideo: 'व्हिडिओ',
    upload: 'अपलोड करा',
    uploading: 'अपलोड करत आहे...',
    cropCare: 'पीक संगोपन',
    diseasePrevention: 'रोग प्रतिबंध',
    organicFarming: 'सेंद्रिय शेती',
    waterManagement: 'पाणी व्यवस्थापन',
    soilHealth: 'माती आरोग्य',
    farmEquipment: 'शेती उपकरणे',
    viewAll: 'सर्व पहा',
    // Forum
    communityForum: 'समुदाय मंच',
    askQuestion: 'प्रश्न विचारा',
    questionTitle: 'प्रश्न शीर्षक',
    questionDetails: 'प्रश्न तपशील',
    postQuestion: 'प्रश्न पोस्ट करा',
    category: 'श्रेणी',
    sortBy: 'क्रमवारी लावा',
    newest: 'नवीनतम',
    mostVoted: 'सर्वाधिक मतदान',
    searchQuestions: 'प्रश्न शोधा...',
    replies: 'उत्तरे',
    votes: 'मते',
    views: 'दृश्ये',
    reply: 'उत्तर द्या',
    yourAnswer: 'तुमचे उत्तर',
    postAnswer: 'उत्तर पोस्ट करा',
    upvote: 'मत द्या',
    downvote: 'नकारात्मक मत',
    // Voice input
    tapToSpeak: 'बोलण्यासाठी टॅप करा',
    listening: 'ऐकत आहे...',
    processingVoice: 'आवाज प्रक्रिया करत आहे...',
    microphonePermission: 'कृपया मायक्रोफोन अॅक्सेस द्या'
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
