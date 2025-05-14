
import { useState, useEffect } from 'react'
import { Routes, Route, BrowserRouter, Navigate, Outlet } from 'react-router-dom'
import Index from './pages/Index'
import Login from './pages/Login'
import Register from './pages/Register'
import ResetPassword from './pages/ResetPassword'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import CropRecommendation from './pages/CropRecommendation'
import DiseaseDetection from './pages/DiseaseDetection'
import CropCalendar from './pages/CropCalendar'
import MarketRates from './pages/MarketRates'
import WeatherAlerts from './pages/WeatherAlerts'
import VoiceAssistant from './pages/VoiceAssistant'
import Forum from './pages/Forum'
import AskExpert from './pages/AskExpert'
import News from './pages/News'
import SuccessStories from './pages/SuccessStories'
import Tutorials from './pages/Tutorials'
import Feedback from './pages/Feedback'
import TestBackend from './pages/TestBackend'
import ReferAndEarn from './pages/ReferAndEarn'
import Marketplace from './pages/Marketplace'
import NotFound from './pages/NotFound'
import { ThemeProvider } from './context/ThemeContext'
import { LanguageProvider } from './context/LanguageContext'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import { Toaster } from "@/components/ui/toaster"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AdminRoute from './components/AdminRoute'
import Admin from './pages/Admin'
import AdminUsers from './pages/AdminUsers'

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              
              {/* Protected Routes */}
              <Route element={<ProtectedRoute><Outlet /></ProtectedRoute>}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/crop-recommendation" element={<CropRecommendation />} />
                <Route path="/disease-detection" element={<DiseaseDetection />} />
                <Route path="/crop-calendar" element={<CropCalendar />} />
                <Route path="/market-rates" element={<MarketRates />} />
                <Route path="/weather-alerts" element={<WeatherAlerts />} />
                <Route path="/voice-assistant" element={<VoiceAssistant />} />
                <Route path="/forum" element={<Forum />} />
                <Route path="/ask-expert" element={<AskExpert />} />
                <Route path="/news" element={<News />} />
                <Route path="/success-stories" element={<SuccessStories />} />
                <Route path="/tutorials" element={<Tutorials />} />
                <Route path="/feedback" element={<Feedback />} />
                <Route path="/test-backend" element={<TestBackend />} />
                <Route path="/refer" element={<ReferAndEarn />} />
                <Route path="/marketplace" element={<Marketplace />} />
              </Route>
              
              {/* Admin Routes */}
              <Route element={<AdminRoute><Outlet /></AdminRoute>}>
                <Route path="/admin" element={<Admin />} />
                <Route path="/admin/users" element={<AdminUsers />} />
              </Route>
              
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </QueryClientProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App
