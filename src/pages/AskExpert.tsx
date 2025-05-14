
import { useState, useRef, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage, useTranslation } from '@/context/LanguageContext';
import { Send, Mic, User2, Bot, Loader2, Copy, VolumeX, Volume2, Calendar, Video } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/context/AuthContext';

// Message interface for the chat
interface ChatMessage {
  role: 'user' | 'expert';
  content: string;
  timestamp: Date;
  expert?: {
    name: string;
    avatar?: string;
  }
}

interface Expert {
  id: string;
  name: string;
  specialty: string;
  avatar_url: string | null;
  available: boolean;
  status: 'available' | 'busy' | 'offline';
}

// Define type for language code to match the LanguageContext
type LanguageCode = 'en' | 'mr' | 'hi';

const AskExpert = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'expert',
      content: 'नमस्कार! मी कृषिमित्र सल्लागार आहे. आपल्याला शेती संबंधित कोणत्याही प्रश्नांची उत्तरे देण्यास मला आनंद होईल. कृपया आपला प्रश्न विचारा.',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [preferredLanguage, setPreferredLanguage] = useState<LanguageCode>('mr');
  const [experts, setExperts] = useState<Expert[]>([]);
  const [selectedExpert, setSelectedExpert] = useState<string | null>(null);
  const [availableExperts, setAvailableExperts] = useState<Expert[]>([]);
  const [loadingExperts, setLoadingExperts] = useState(true);
  const [activeTab, setActiveTab] = useState('chat');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { language, setLanguage } = useLanguage();
  const { user } = useAuth();

  // Automatically scroll to the bottom of the chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Update language context when preferred language changes
  useEffect(() => {
    setLanguage(preferredLanguage);
  }, [preferredLanguage, setLanguage]);

  // Fetch available experts
  useEffect(() => {
    const fetchExperts = async () => {
      setLoadingExperts(true);
      try {
        // In a real implementation, fetch experts from the database
        const { data, error } = await supabase
          .from('profiles')
          .select('id, first_name, last_name, avatar_url, bio, role')
          .eq('role', 'expert');
          
        if (error) throw error;
        
        if (data) {
          const expertsList: Expert[] = data.map(expert => ({
            id: expert.id,
            name: `${expert.first_name || ''} ${expert.last_name || ''}`,
            specialty: expert.bio || 'Agriculture Expert',
            avatar_url: expert.avatar_url,
            available: Math.random() > 0.3, // Randomly set availability for demo
            status: Math.random() > 0.3 ? 'available' : Math.random() > 0.5 ? 'busy' : 'offline'
          }));
          
          setExperts(expertsList);
          setAvailableExperts(expertsList.filter(e => e.status === 'available'));
        }
      } catch (error) {
        console.error('Error fetching experts:', error);
        // Fallback to mock data if there's an error
        const mockExperts: Expert[] = [
          {
            id: '1',
            name: 'Dr. Rajesh Sharma',
            specialty: 'Crop Science Expert',
            avatar_url: "https://randomuser.me/api/portraits/men/32.jpg",
            available: true,
            status: 'available'
          },
          {
            id: '2',
            name: 'Dr. Meena Patel',
            specialty: 'Soil Science Expert',
            avatar_url: "https://randomuser.me/api/portraits/women/44.jpg",
            available: true,
            status: 'available'
          },
          {
            id: '3',
            name: 'Dr. Sunil Kumar',
            specialty: 'Pest Control Specialist',
            avatar_url: "https://randomuser.me/api/portraits/men/45.jpg",
            available: false,
            status: 'offline'
          },
          {
            id: '4',
            name: 'Dr. Priya Singh',
            specialty: 'Agricultural Economics',
            avatar_url: "https://randomuser.me/api/portraits/women/68.jpg",
            available: true,
            status: 'busy'
          }
        ];
        
        setExperts(mockExperts);
        setAvailableExperts(mockExperts.filter(e => e.status === 'available'));
      } finally {
        setLoadingExperts(false);
      }
    };
    
    fetchExperts();
  }, []);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;
    if (!selectedExpert) {
      toast({
        title: preferredLanguage === 'en' ? "Select an Expert" : "तज्ञ निवडा",
        description: preferredLanguage === 'en' ? "Please select an expert to chat with" : "कृपया चॅट करण्यासाठी एक तज्ञ निवडा",
        variant: "destructive"
      });
      return;
    }
    
    // Add user message to chat
    const userMessage: ChatMessage = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    
    try {
      // Find the selected expert
      const expert = experts.find(e => e.id === selectedExpert);
      
      // In a real system, this would send a notification to the actual expert
      // For now, we'll simulate a response after a short delay
      setTimeout(() => {
        // Simulated expert response
        const expertResponses = [
          "Based on your description, it sounds like your crop might have a fungal infection. Could you send a photo for a more accurate diagnosis?",
          "The yellowing leaves could indicate nitrogen deficiency. When did you last apply fertilizer?",
          "Given the current weather conditions in your region, I would recommend delaying irrigation for 2-3 days.",
          "This is a common issue during this season. I suggest adjusting your watering schedule and applying neem oil as a natural remedy."
        ];
        
        // Translate responses based on preferred language
        // For now using English responses, in a real implementation these would be translated
        
        const expertMessage: ChatMessage = {
          role: 'expert',
          content: expertResponses[Math.floor(Math.random() * expertResponses.length)],
          timestamp: new Date(),
          expert: {
            name: expert?.name || 'Expert',
            avatar: expert?.avatar_url || undefined
          }
        };
        
        setMessages(prev => [...prev, expertMessage]);
        setIsLoading(false);
        
        // Store chat history in the database
        if (user) {
          storeChatHistory(userMessage.content, expertMessage.content);
        }
      }, 2000);
      
    } catch (error: any) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
      
      setIsLoading(false);
    }
  };

  // Store chat history in the database
  const storeChatHistory = async (userMessage: string, expertResponse: string) => {
    try {
      await supabase.from('chat_history').insert({
        user_id: user?.id,
        user_message: userMessage,
        ai_response: expertResponse
      });
    } catch (error) {
      console.error('Error storing chat history:', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const startVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast({
        title: "Voice input not supported",
        description: "Your browser doesn't support voice input. Please use a modern browser.",
        variant: "destructive"
      });
      return;
    }

    setIsListening(true);

    // @ts-ignore
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    // Set language based on preference
    recognition.lang = preferredLanguage === 'en' ? 'en-US' : 
                       preferredLanguage === 'hi' ? 'hi-IN' : 'mr-IN';
    
    recognition.interimResults = false;
    
    recognition.start();

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputMessage(transcript);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
      toast({
        title: "Voice input error",
        description: "There was an error processing your voice input. Please try again.",
        variant: "destructive"
      });
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };

  const speakMessage = (text: string) => {
    if (!('speechSynthesis' in window)) {
      toast({
        title: "Text-to-speech not supported",
        description: "Your browser doesn't support text-to-speech. Please use a modern browser.",
        variant: "destructive"
      });
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    if (isSpeaking) {
      setIsSpeaking(false);
      return;
    }

    setIsSpeaking(true);

    const speech = new SpeechSynthesisUtterance(text);
    
    // Set language based on preference
    speech.lang = preferredLanguage === 'en' ? 'en-US' : 
                  preferredLanguage === 'hi' ? 'hi-IN' : 'mr-IN';
    
    speech.onend = () => {
      setIsSpeaking(false);
    };

    speech.onerror = () => {
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(speech);
  };

  const copyMessageToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Message has been copied to your clipboard.",
    });
  };

  // Create a type-safe handler for the Select component
  const handleLanguageChange = (value: string) => {
    // Validate that the value is a valid LanguageCode before setting it
    if (value === 'en' || value === 'mr' || value === 'hi') {
      setPreferredLanguage(value);
    }
  };

  const selectExpert = (expertId: string) => {
    setSelectedExpert(expertId);
    const expert = experts.find(e => e.id === expertId);
    
    if (expert) {
      // Add a welcome message from the expert
      const welcomeMessage = preferredLanguage === 'en' 
        ? `Hello, I'm ${expert.name}, specialized in ${expert.specialty}. How can I help you today?`
        : preferredLanguage === 'hi'
          ? `नमस्ते, मैं ${expert.name} हूं, ${expert.specialty} में विशेषज्ञ हूं। मैं आज आपकी कैसे मदद कर सकता हूं?`
          : `नमस्कार, मी ${expert.name} आहे, ${expert.specialty} मध्ये तज्ञ आहे. मी आज आपली कशी मदत करू शकतो?`;
          
      setMessages([{
        role: 'expert',
        content: welcomeMessage,
        timestamp: new Date(),
        expert: {
          name: expert.name,
          avatar: expert.avatar_url || undefined
        }
      }]);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Card className="min-h-[80vh] flex flex-col">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-primary-900 dark:text-primary-400">
              {preferredLanguage === 'en' 
                ? 'KrishiMitra Expert Consultation'
                : preferredLanguage === 'hi'
                  ? 'कृषिमित्र विशेषज्ञ परामर्श'
                  : 'कृषिमित्र तज्ज्ञ सल्लामसलत'}
            </CardTitle>
            <CardDescription>
              {preferredLanguage === 'en'
                ? 'Connect with agricultural experts for personalized guidance on farming practices, crop management, and more'
                : preferredLanguage === 'hi'
                  ? 'कृषि प्रथाओं, फसल प्रबंधन और अधिक पर व्यक्तिगत मार्गदर्शन के लिए कृषि विशेषज्ञों से जुड़ें'
                  : 'शेती पद्धती, पीक व्यवस्थापन आणि अधिक यावर वैयक्तिक मार्गदर्शनासाठी कृषी तज्ज्ञांशी जोडा'}
            </CardDescription>
            <div className="flex justify-between items-center mt-2">
              <div className="flex items-center space-x-2">
                <Switch 
                  id="voice-responses" 
                  checked={isSpeaking}
                  onCheckedChange={(checked) => {
                    if (!checked) {
                      window.speechSynthesis.cancel();
                    }
                    setIsSpeaking(checked);
                  }}
                />
                <Label htmlFor="voice-responses">
                  {preferredLanguage === 'en' ? 'Auto-read responses' : 'स्वयंचलित वाचन प्रतिसाद'}
                </Label>
              </div>
              <Select onValueChange={handleLanguageChange} value={preferredLanguage}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="hi">हिंदी (Hindi)</SelectItem>
                  <SelectItem value="mr">मराठी (Marathi)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-grow flex flex-col">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="chat">
                  {preferredLanguage === 'en' ? 'Chat with Expert' : 'तज्ज्ञांशी चॅट करा'}
                </TabsTrigger>
                <TabsTrigger value="video">
                  <Video className="h-4 w-4 mr-2" />
                  {preferredLanguage === 'en' ? 'Video Call' : 'व्हिडिओ कॉल'}
                </TabsTrigger>
                <TabsTrigger value="schedule">
                  <Calendar className="h-4 w-4 mr-2" />
                  {preferredLanguage === 'en' ? 'Schedule' : 'वेळापत्रक'}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="chat" className="flex-grow flex flex-col">
                {!selectedExpert ? (
                  <div className="flex-grow flex flex-col space-y-6 p-4">
                    <div className="text-center">
                      <h3 className="text-lg font-medium mb-2">
                        {preferredLanguage === 'en' 
                          ? 'Select an Expert to Begin Consultation' 
                          : 'सल्लामसलत सुरू करण्यासाठी तज्ञ निवडा'}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-6">
                        {preferredLanguage === 'en'
                          ? 'Our agricultural experts are available to answer your farming questions'
                          : 'आमचे कृषी तज्ज्ञ आपल्या शेतीविषयक प्रश्नांची उत्तरे देण्यासाठी उपलब्ध आहेत'}
                      </p>
                    </div>
                    
                    {loadingExperts ? (
                      <div className="flex justify-center my-8">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {experts.map(expert => (
                          <div 
                            key={expert.id}
                            onClick={() => expert.status === 'available' && selectExpert(expert.id)} 
                            className={`p-4 border rounded-md transition-all ${
                              expert.status === 'available' 
                                ? 'hover:border-primary hover:shadow-sm cursor-pointer' 
                                : 'opacity-60 cursor-not-allowed'
                            }`}
                          >
                            <div className="flex items-center gap-3 mb-2">
                              <Avatar>
                                <AvatarImage src={expert.avatar_url || undefined} />
                                <AvatarFallback>{expert.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{expert.name}</p>
                                <p className="text-sm text-muted-foreground">{expert.specialty}</p>
                              </div>
                            </div>
                            <div className="flex items-center mt-2">
                              <span className={`h-2 w-2 rounded-full mr-2 ${
                                expert.status === 'available' ? 'bg-green-500' : 
                                expert.status === 'busy' ? 'bg-amber-500' : 'bg-gray-300'
                              }`} />
                              <span className="text-xs">
                                {expert.status === 'available' 
                                  ? preferredLanguage === 'en' ? 'Available now' : 'आता उपलब्ध' 
                                  : expert.status === 'busy'
                                    ? preferredLanguage === 'en' ? 'Busy' : 'व्यस्त'
                                    : preferredLanguage === 'en' ? 'Offline' : 'ऑफलाइन'}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex-grow flex flex-col">
                    <div className="flex-grow overflow-y-auto mb-4 space-y-4 max-h-[60vh] min-h-[40vh]">
                      {messages.map((msg, index) => (
                        <div
                          key={index}
                          className={`flex ${
                            msg.role === 'user' ? 'justify-end' : 'justify-start'
                          }`}
                        >
                          <div
                            className={`flex max-w-[80%] ${
                              msg.role === 'user'
                                ? 'flex-row-reverse items-end'
                                : 'items-start'
                            }`}
                          >
                            <Avatar className={`h-8 w-8 ${msg.role === 'user' ? 'ml-2' : 'mr-2'}`}>
                              {msg.role === 'user' ? (
                                <AvatarFallback className="bg-primary-200">
                                  <User2 className="h-4 w-4" />
                                </AvatarFallback>
                              ) : (
                                <>
                                  <AvatarImage src={msg.expert?.avatar} />
                                  <AvatarFallback className="bg-green-200">
                                    {msg.expert?.name.charAt(0) || 'E'}
                                  </AvatarFallback>
                                </>
                              )}
                            </Avatar>
                            <div
                              className={`rounded-lg p-3 ${
                                msg.role === 'user'
                                  ? 'bg-primary-600 text-white'
                                  : 'bg-muted'
                              }`}
                            >
                              <p className="whitespace-pre-wrap">{msg.content}</p>
                              <div className="flex items-center justify-end mt-1 gap-1">
                                {msg.role === 'expert' && (
                                  <>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-5 w-5 rounded-full opacity-70 hover:opacity-100"
                                      onClick={() => copyMessageToClipboard(msg.content)}
                                    >
                                      <Copy className="h-3 w-3" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-5 w-5 rounded-full opacity-70 hover:opacity-100"
                                      onClick={() => speakMessage(msg.content)}
                                    >
                                      {isSpeaking ? (
                                        <VolumeX className="h-3 w-3" />
                                      ) : (
                                        <Volume2 className="h-3 w-3" />
                                      )}
                                    </Button>
                                  </>
                                )}
                                <span className="text-xs opacity-50">
                                  {msg.timestamp.toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  })}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                    <div className="mt-auto pt-4 border-t relative">
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          sendMessage();
                        }}
                        className="flex space-x-2"
                      >
                        <Textarea
                          value={inputMessage}
                          onChange={(e) => setInputMessage(e.target.value)}
                          onKeyDown={handleKeyPress}
                          placeholder={preferredLanguage === 'en' 
                            ? "Type your question to the expert..." 
                            : preferredLanguage === 'hi' 
                              ? "विशेषज्ञ से अपना प्रश्न पूछें..." 
                              : "तज्ञाला तुमचा प्रश्न विचारा..."}
                          className="flex-grow resize-none"
                          disabled={isLoading}
                          rows={1}
                        />
                        <div className="flex flex-col space-y-2">
                          <Button
                            type="button"
                            size="icon"
                            variant="outline"
                            onClick={startVoiceInput}
                            disabled={isLoading || isListening}
                          >
                            {isListening ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Mic className="h-4 w-4" />
                            )}
                          </Button>
                          <Button type="submit" size="icon" disabled={isLoading || !inputMessage.trim()}>
                            {isLoading ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Send className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="video" className="flex-grow">
                <Card className="h-full flex flex-col">
                  <CardContent className="pt-6 flex-grow flex flex-col justify-center items-center">
                    <div className="text-center py-8 max-w-md mx-auto">
                      <Video className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">
                        {preferredLanguage === 'en' ? 'Video Consultation' : 'व्हिडिओ सल्लामसलत'}
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        {preferredLanguage === 'en' 
                          ? 'Connect face-to-face with agriculture experts for detailed guidance.' 
                          : 'सविस्तर मार्गदर्शनासाठी कृषी तज्ञांशी समोरासमोर कनेक्ट करा.'}
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Button variant="outline" className="flex items-center gap-2">
                          {preferredLanguage === 'en' ? 'Join Waiting Room' : 'प्रतीक्षा कक्षात सामील व्हा'}
                        </Button>
                        <Button className="flex items-center gap-2">
                          {preferredLanguage === 'en' ? 'Schedule Call' : 'कॉल शेड्यूल करा'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="schedule" className="flex-grow">
                <Card className="h-full flex flex-col">
                  <CardContent className="pt-6 flex-grow flex flex-col justify-center items-center">
                    <div className="text-center py-8 max-w-md mx-auto">
                      <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">
                        {preferredLanguage === 'en' ? 'Schedule a Consultation' : 'सल्लामसलतीचे नियोजन करा'}
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        {preferredLanguage === 'en' 
                          ? 'Book an appointment with an agriculture expert at your convenient time.' 
                          : 'आपल्या सोयीच्या वेळी कृषी तज्ञांसोबत अपॉइंटमेंट बुक करा.'}
                      </p>
                      
                      <Button className="mx-auto">
                        {preferredLanguage === 'en' ? 'Check Available Slots' : 'उपलब्ध स्लॉट तपासा'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AskExpert;
