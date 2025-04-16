
import { ArrowRight, Leaf, Shield, ShoppingBag, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import LatestNewsAndSchemes from '@/components/home/LatestNewsAndSchemes';

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-pattern py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Growing Better Futures for Indian Farmers
              </h1>
              <p className="text-xl text-gray-700 mb-8">
                KrishiMitra helps farmers make data-driven decisions, detect crop diseases early, and sell directly to buyers for better profits.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <Button size="lg" className="bg-primary-600 hover:bg-primary-700 text-white">
                    Get Started
                  </Button>
                </Link>
                <Link to="/about">
                  <Button size="lg" variant="outline" className="border-primary-600 text-primary-600 hover:bg-primary-50">
                    Learn More
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

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How KrishiMitra Helps You</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform combines AI technology with agricultural expertise to support farmers at every stage
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="bg-primary-50 w-14 h-14 rounded-full flex items-center justify-center mb-5">
                <Leaf className="text-primary-600 h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Crop Recommendations</h3>
              <p className="text-gray-600 mb-4">
                Get personalized crop suggestions based on your soil, climate, and location for better yields.
              </p>
              <Link to="/crop-recommendation" className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center">
                Learn more <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="bg-primary-50 w-14 h-14 rounded-full flex items-center justify-center mb-5">
                <Shield className="text-primary-600 h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Disease Detection</h3>
              <p className="text-gray-600 mb-4">
                Upload photos of your crops to detect diseases early and get treatment recommendations.
              </p>
              <Link to="/disease-detection" className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center">
                Learn more <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="bg-primary-50 w-14 h-14 rounded-full flex items-center justify-center mb-5">
                <ShoppingBag className="text-primary-600 h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Marketplace</h3>
              <p className="text-gray-600 mb-4">
                Sell your produce directly to buyers, cutting out middlemen and increasing your profits.
              </p>
              <Link to="/marketplace" className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center">
                Learn more <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="bg-primary-50 w-14 h-14 rounded-full flex items-center justify-center mb-5">
                <MessageCircle className="text-primary-600 h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Farming Assistant</h3>
              <p className="text-gray-600 mb-4">
                Get instant answers to your farming questions with our AI-powered chatbot assistant.
              </p>
              <Link to="/assistant" className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center">
                Learn more <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our simple process helps you make the most of KrishiMitra's features
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
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Farming?</h2>
            <p className="text-xl mb-8">
              Join thousands of farmers across India who are already benefiting from KrishiMitra's tools and marketplace.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/register">
                <Button size="lg" className="bg-white text-primary-800 hover:bg-gray-100">
                  Register Now
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-primary-700">
                  Contact Us
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
                <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="Pratap Singh" className="w-14 h-14 rounded-full object-cover mr-4" />
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">Pratap Singh</h4>
                  <p className="text-gray-600">Rice Farmer, Uttar Pradesh</p>
                </div>
              </div>
              <p className="text-gray-700 italic mb-6">
                "I sold my rice directly to buyers through the marketplace and earned 40% more than I would through middlemen. This platform is a game-changer!"
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
