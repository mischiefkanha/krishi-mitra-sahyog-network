
import { ArrowRight, Leaf, Shield, ShoppingBag, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import LatestNewsAndSchemes from '@/components/home/LatestNewsAndSchemes';
import FarmerFeatures from '@/components/home/FarmerFeatures';
import WeatherAlert from '@/components/features/WeatherAlert';
import { useTranslation } from '@/context/LanguageContext';

const Index = () => {
  const { language } = useTranslation();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-pattern py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {language === 'en' 
                  ? 'Growing Better Futures for Indian Farmers'
                  : 'भारतीय शेतकऱ्यांसाठी उज्ज्वल भविष्य निर्माण'
                }
              </h1>
              <p className="text-xl text-white/90 mb-8">
                {language === 'en'
                  ? 'KrishiMitra helps farmers make data-driven decisions, detect crop diseases early, and sell directly to buyers for better profits.'
                  : 'कृषिमित्र शेतकऱ्यांना डेटा-आधारित निर्णय घेण्यास, पिकांचे रोग लवकर शोधण्यास आणि अधिक नफ्यासाठी थेट खरेदीदारांना विक्री करण्यास मदत करते.'
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <Button size="lg" className="bg-primary-600 hover:bg-primary-700 text-white">
                    {language === 'en' ? 'Get Started' : 'सुरू करा'}
                  </Button>
                </Link>
                <Link to="/about">
                  <Button size="lg" variant="outline" className="border-primary-600 text-primary-600 hover:bg-primary-50">
                    {language === 'en' ? 'Learn More' : 'अधिक जाणून घ्या'}
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <img 
                src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1000&auto=format&fit=crop" 
                alt="Indian Farmer" 
                className="rounded-lg shadow-xl max-w-full h-auto" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Latest Agricultural News & Schemes Section */}
      <LatestNewsAndSchemes />

      {/* New Farmer Features */}
      <FarmerFeatures />

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {language === 'en' ? 'How KrishiMitra Helps You' : 'कृषिमित्र आपली कशी मदत करते'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {language === 'en'
                ? 'Our platform combines AI technology with agricultural expertise to support farmers at every stage'
                : 'आमचे प्लॅटफॉर्म शेतकऱ्यांना प्रत्येक टप्प्यावर सहाय्य करण्यासाठी AI तंत्रज्ञान आणि कृषी तज्ञता एकत्र करते'
              }
            </p>
          </div>
          
          {/* Weather Alert Feature Highlight */}
          <div className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="md:col-span-2">
                <h3 className="text-2xl font-semibold mb-4">
                  {language === 'en' 
                    ? 'Smart Weather Alerts for Your Crops' 
                    : 'तुमच्या पिकांसाठी स्मार्ट हवामान सूचना'
                  }
                </h3>
                <p className="text-lg text-gray-700 mb-6">
                  {language === 'en'
                    ? 'Get personalized weather alerts based on your location and crop type. Our system analyzes weather patterns and sends you timely notifications to protect your crops from adverse weather conditions.'
                    : 'आपल्या स्थान आणि पीक प्रकारावर आधारित वैयक्तिकृत हवामान सूचना मिळवा. आमची प्रणाली हवामान पॅटर्न विश्लेषित करते आणि आपल्या पिकांना प्रतिकूल हवामान परिस्थितीपासून संरक्षित करण्यासाठी आपल्याला वेळेवर सूचना पाठवते.'
                  }
                </p>
                <Link to="/weather-alerts">
                  <Button className="bg-primary-600 hover:bg-primary-700 text-white">
                    {language === 'en' ? 'Set Up Weather Alerts' : 'हवामान सूचना सेट करा'}
                  </Button>
                </Link>
              </div>
              <div className="md:col-span-1">
                <div className="max-w-sm mx-auto">
                  <WeatherAlert />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="bg-primary-50 w-14 h-14 rounded-full flex items-center justify-center mb-5">
                <Leaf className="text-primary-600 h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {language === 'en' ? 'Crop Recommendations' : 'पीक शिफारशी'}
              </h3>
              <p className="text-gray-600 mb-4">
                {language === 'en'
                  ? 'Get personalized crop suggestions based on your soil, climate, and location for better yields.'
                  : 'चांगल्या उत्पादनासाठी आपल्या माती, हवामान आणि स्थानावर आधारित वैयक्तिकृत पीक सूचना मिळवा.'
                }
              </p>
              <Link to="/crop-recommendation" className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center">
                {language === 'en' ? 'Learn more' : 'अधिक जाणून घ्या'} <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="bg-primary-50 w-14 h-14 rounded-full flex items-center justify-center mb-5">
                <Shield className="text-primary-600 h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {language === 'en' ? 'Disease Detection' : 'रोग शोध'}
              </h3>
              <p className="text-gray-600 mb-4">
                {language === 'en'
                  ? 'Upload photos of your crops to detect diseases early and get treatment recommendations.'
                  : 'रोग लवकर शोधण्यासाठी आणि उपचार शिफारसी मिळवण्यासाठी आपल्या पिकांचे फोटो अपलोड करा.'
                }
              </p>
              <Link to="/disease-detection" className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center">
                {language === 'en' ? 'Learn more' : 'अधिक जाणून घ्या'} <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="bg-primary-50 w-14 h-14 rounded-full flex items-center justify-center mb-5">
                <ShoppingBag className="text-primary-600 h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {language === 'en' ? 'Marketplace' : 'बाजारपेठ'}
              </h3>
              <p className="text-gray-600 mb-4">
                {language === 'en'
                  ? 'Sell your produce directly to buyers, cutting out middlemen and increasing your profits.'
                  : 'मध्यस्थ कापून आणि आपला नफा वाढवून, आपला माल थेट खरेदीदारांना विका.'
                }
              </p>
              <Link to="/marketplace" className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center">
                {language === 'en' ? 'Learn more' : 'अधिक जाणून घ्या'} <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="bg-primary-50 w-14 h-14 rounded-full flex items-center justify-center mb-5">
                <MessageCircle className="text-primary-600 h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {language === 'en' ? 'Ask an Expert' : 'तज्ञांना विचारा'}
              </h3>
              <p className="text-gray-600 mb-4">
                {language === 'en'
                  ? 'Connect with agriculture experts via chat, audio, or video for personalized advice.'
                  : 'वैयक्तिकृत सल्ल्यासाठी चॅट, ऑडिओ किंवा व्हिडिओद्वारे कृषी तज्ञांशी संपर्क साधा.'
                }
              </p>
              <Link to="/ask-expert" className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center">
                {language === 'en' ? 'Learn more' : 'अधिक जाणून घ्या'} <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {language === 'en' ? 'How It Works' : 'हे कसे काम करते'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {language === 'en'
                ? 'Our simple process helps you make the most of KrishiMitra\'s features'
                : 'आमची साधी प्रक्रिया आपल्याला कृषिमित्राच्या वैशिष्ट्यांचा जास्तीत जास्त फायदा घेण्यास मदत करते'
              }
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="bg-white p-8 rounded-lg border border-gray-100 shadow-sm text-center h-full">
                <div className="bg-secondary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-secondary-600 text-2xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Create Your Account</h3>
                <p className="text-gray-600">
                  Sign up as a farmer or buyer. Complete your profile with your farm details or buying preferences.
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 0L40 20L20 40L0 20L20 0Z" fill="#FEE2E2" />
                  <path d="M17 20H23M23 20L20 17M23 20L20 23" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="relative">
              <div className="bg-white p-8 rounded-lg border border-gray-100 shadow-sm text-center h-full">
                <div className="bg-secondary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-secondary-600 text-2xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Use Our Tools</h3>
                <p className="text-gray-600">
                  Get crop recommendations, detect diseases, or list your products on the marketplace.
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 0L40 20L20 40L0 20L20 0Z" fill="#FEE2E2" />
                  <path d="M17 20H23M23 20L20 17M23 20L20 23" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            
            {/* Step 3 */}
            <div>
              <div className="bg-white p-8 rounded-lg border border-gray-100 shadow-sm text-center h-full">
                <div className="bg-secondary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-secondary-600 text-2xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Grow & Profit</h3>
                <p className="text-gray-600">
                  Improve your crop yields, reduce losses from diseases, and increase your profits by selling directly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              {language === 'en' ? 'Ready to Transform Your Farming?' : 'आपली शेती बदलण्यासाठी तयार आहात?'}
            </h2>
            <p className="text-xl mb-8">
              {language === 'en'
                ? 'Join thousands of farmers across India who are already benefiting from KrishiMitra\'s tools and marketplace.'
                : 'हजारो भारतीय शेतकऱ्यांना सामील व्हा जे आधीच कृषिमित्राच्या साधनांचा आणि बाजारपेठेचा फायदा घेत आहेत.'
              }
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/register">
                <Button size="lg" className="bg-white text-primary-800 hover:bg-gray-100">
                  {language === 'en' ? 'Register Now' : 'आताच नोंदणी करा'}
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-primary-700">
                  {language === 'en' ? 'Contact Us' : 'संपर्क करा'}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Farmer Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from farmers who have transformed their agricultural practices with KrishiMitra
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-gray-50 p-8 rounded-lg border border-gray-100 shadow-sm">
              <div className="flex items-center mb-6">
                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Rajesh Kumar" className="w-14 h-14 rounded-full object-cover mr-4" />
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">Rajesh Kumar</h4>
                  <p className="text-gray-600">Wheat Farmer, Punjab</p>
                </div>
              </div>
              <p className="text-gray-700 italic mb-6">
                "The crop recommendation system helped me choose the right wheat variety for my soil. My yield increased by 30% this season!"
              </p>
              <div className="flex text-yellow-400">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-gray-50 p-8 rounded-lg border border-gray-100 shadow-sm">
              <div className="flex items-center mb-6">
                <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Lakshmi Devi" className="w-14 h-14 rounded-full object-cover mr-4" />
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">Lakshmi Devi</h4>
                  <p className="text-gray-600">Vegetable Farmer, Karnataka</p>
                </div>
              </div>
              <p className="text-gray-700 italic mb-6">
                "I caught tomato blight early thanks to the disease detection tool. It saved my entire crop and thousands of rupees in potential losses."
              </p>
              <div className="flex text-yellow-400">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-gray-50 p-8 rounded-lg border border-gray-100 shadow-sm">
              <div className="flex items-center mb-6">
                <img src="https://randomuser.me/api/portraits/men/68.jpg" alt="Arjun Singh" className="w-14 h-14 rounded-full object-cover mr-4" />
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">Arjun Singh</h4>
                  <p className="text-gray-600">Fruit Farmer, Himachal Pradesh</p>
                </div>
              </div>
              <p className="text-gray-700 italic mb-6">
                "The marketplace feature helped me connect directly with restaurants in the city. I'm making 40% more profit than when I sold through middlemen."
              </p>
              <div className="flex text-yellow-400">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;

