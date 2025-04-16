
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CropRecommendation from "./pages/CropRecommendation";
import DiseaseDetection from "./pages/DiseaseDetection";
import Marketplace from "./pages/Marketplace";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Feedback from "./pages/Feedback";
import Tutorials from "./pages/Tutorials";
import Forum from "./pages/Forum";
import NotFound from "./pages/NotFound";
import TestBackend from "./pages/TestBackend";
import WeatherAlerts from "./pages/WeatherAlerts";
import CropCalendar from "./pages/CropCalendar";
import AskExpert from "./pages/AskExpert";
import MarketRates from "./pages/MarketRates";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AuthProvider>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route 
                  path="/crop-recommendation" 
                  element={
                    <ProtectedRoute>
                      <CropRecommendation />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/disease-detection" 
                  element={
                    <ProtectedRoute>
                      <DiseaseDetection />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/marketplace" 
                  element={
                    <ProtectedRoute>
                      <Marketplace />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/profile" 
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/feedback" 
                  element={
                    <ProtectedRoute>
                      <Feedback />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/tutorials" 
                  element={
                    <ProtectedRoute>
                      <Tutorials />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/forum" 
                  element={
                    <ProtectedRoute>
                      <Forum />
                    </ProtectedRoute>
                  } 
                />
                {/* New Routes */}
                <Route 
                  path="/weather-alerts" 
                  element={
                    <ProtectedRoute>
                      <WeatherAlerts />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/crop-calendar" 
                  element={
                    <ProtectedRoute>
                      <CropCalendar />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/ask-expert" 
                  element={
                    <ProtectedRoute>
                      <AskExpert />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/market-rates" 
                  element={
                    <ProtectedRoute>
                      <MarketRates />
                    </ProtectedRoute>
                  } 
                />
                <Route path="/test-backend" element={<TestBackend />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AuthProvider>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
