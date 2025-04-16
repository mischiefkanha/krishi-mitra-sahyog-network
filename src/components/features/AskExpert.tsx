
import { useState } from "react";
import { useTranslation } from "@/context/LanguageContext";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import VoiceInput from "@/components/VoiceInput";
import { Mic, Send, Calendar, Clock, Video, MessageSquare } from "lucide-react";

const AskExpert = () => {
  const { t, language } = useTranslation();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'system',
      content: language === 'en' 
        ? 'Welcome to Ask an Expert. How can we help you today?' 
        : 'तज्ञांना विचारा मध्ये आपले स्वागत आहे. आम्ही आज आपली कशी मदत करू शकतो?'
    }
  ]);
  const [experts, setExperts] = useState([
    {
      id: 1,
      name: language === 'en' ? 'Dr. Rajesh Sharma' : 'डॉ. राजेश शर्मा',
      specialty: language === 'en' ? 'Crop Science' : 'पीक विज्ञान',
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      available: true
    },
    {
      id: 2,
      name: language === 'en' ? 'Dr. Meena Patel' : 'डॉ. मीना पटेल',
      specialty: language === 'en' ? 'Soil Expert' : 'माती तज्ज्ञ',
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      available: true
    },
    {
      id: 3,
      name: language === 'en' ? 'Dr. Sunil Kumar' : 'डॉ. सुनील कुमार',
      specialty: language === 'en' ? 'Pest Control' : 'कीड नियंत्रण',
      image: "https://randomuser.me/api/portraits/men/45.jpg",
      available: false
    }
  ]);
  const [selectedExpert, setSelectedExpert] = useState<number | null>(null);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    setMessages([
      ...messages, 
      {
        id: messages.length + 1,
        sender: 'user',
        content: message
      }
    ]);
    
    setMessage('');
    
    // Simulate expert response after a delay
    setTimeout(() => {
      const expertResponses = [
        language === 'en' 
          ? "Based on your description, it sounds like your crop might have a fungal infection. Could you send a photo?" 
          : "आपल्या वर्णनावरून, असे वाटते की आपल्या पिकाला बुरशीजन्य संसर्ग झाला असावा. आपण फोटो पाठवू शकता का?",
        language === 'en' 
          ? "The yellowing leaves could be a sign of nitrogen deficiency. When did you last apply fertilizer?" 
          : "पिवळे पडणारी पाने नायट्रोजनच्या कमतरतेचे लक्षण असू शकते. आपण शेवटचे खत केव्हा लावले होते?",
        language === 'en' 
          ? "Given the current weather conditions in your area, I would recommend delaying irrigation for another 2-3 days." 
          : "आपल्या क्षेत्रातील सध्याच्या हवामान स्थितीमुळे, मी आणखी 2-3 दिवसांपर्यंत सिंचन लांबवण्याची शिफारस करेन."
      ];
      
      setMessages(prevMessages => [
        ...prevMessages,
        {
          id: prevMessages.length + 1,
          sender: 'expert',
          content: expertResponses[Math.floor(Math.random() * expertResponses.length)]
        }
      ]);
    }, 1000);
  };

  const handleVoiceInput = (result: string) => {
    setMessage(result);
  };

  return (
    <div className="space-y-4">
      <Tabs defaultValue="chat" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="chat">
            <MessageSquare className="h-4 w-4 mr-2" />
            {language === 'en' ? 'Chat' : 'चॅट'}
          </TabsTrigger>
          <TabsTrigger value="video">
            <Video className="h-4 w-4 mr-2" />
            {language === 'en' ? 'Video Call' : 'व्हिडिओ कॉल'}
          </TabsTrigger>
          <TabsTrigger value="schedule">
            <Calendar className="h-4 w-4 mr-2" />
            {language === 'en' ? 'Schedule' : 'वेळापत्रक'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="chat">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>
                  {language === 'en' ? 'Ask an Agriculture Expert' : 'कृषी तज्ञांना विचारा'}
                </span>
                {selectedExpert && (
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={experts.find(e => e.id === selectedExpert)?.image} />
                      <AvatarFallback>EX</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-normal">
                      {experts.find(e => e.id === selectedExpert)?.name}
                    </span>
                  </div>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!selectedExpert ? (
                <div className="space-y-4">
                  <p className="text-center text-muted-foreground">
                    {language === 'en' 
                      ? 'Select an expert to start a conversation' 
                      : 'संभाषण सुरू करण्यासाठी एक तज्ञ निवडा'}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {experts.map(expert => (
                      <div 
                        key={expert.id}
                        onClick={() => setSelectedExpert(expert.id)} 
                        className={`p-4 border rounded-md cursor-pointer transition-all ${
                          expert.available 
                            ? 'hover:border-primary hover:shadow-sm' 
                            : 'opacity-60 cursor-not-allowed'
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <Avatar>
                            <AvatarImage src={expert.image} />
                            <AvatarFallback>{expert.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{expert.name}</p>
                            <p className="text-sm text-muted-foreground">{expert.specialty}</p>
                          </div>
                        </div>
                        <div className="flex items-center mt-2">
                          <span className={`h-2 w-2 rounded-full mr-2 ${
                            expert.available ? 'bg-green-500' : 'bg-gray-300'
                          }`} />
                          <span className="text-xs">
                            {expert.available 
                              ? language === 'en' ? 'Available now' : 'आता उपलब्ध' 
                              : language === 'en' ? 'Unavailable' : 'अनुपलब्ध'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col h-[400px]">
                  <ScrollArea className="flex-1 pr-4 mb-4">
                    <div className="space-y-4">
                      {messages.map(msg => (
                        <div 
                          key={msg.id} 
                          className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div 
                            className={`max-w-[80%] rounded-lg p-3 ${
                              msg.sender === 'user' 
                                ? 'bg-primary text-primary-foreground' 
                                : msg.sender === 'expert' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {msg.content}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>

                  <div className="flex gap-2">
                    <Textarea
                      placeholder={
                        language === 'en' 
                          ? "Type your question here..." 
                          : "आपला प्रश्न येथे टाइप करा..."
                      }
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="flex-1"
                    />
                    <div className="flex flex-col gap-2">
                      <VoiceInput onResult={handleVoiceInput} />
                      <Button size="icon" onClick={handleSendMessage}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="video">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <Video className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">
                  {language === 'en' ? 'Video Consultation' : 'व्हिडिओ सल्लामसलत'}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {language === 'en' 
                    ? 'Connect face-to-face with agriculture experts for detailed guidance.' 
                    : 'सविस्तर मार्गदर्शनासाठी कृषी तज्ञांशी समोरासमोर कनेक्ट करा.'}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {language === 'en' ? 'Join Waiting Room' : 'प्रतीक्षा कक्षात सामील व्हा'}
                  </Button>
                  <Button className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {language === 'en' ? 'Schedule Call' : 'कॉल शेड्यूल करा'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">
                  {language === 'en' ? 'Schedule a Consultation' : 'सल्लामसलतीचे नियोजन करा'}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {language === 'en' 
                    ? 'Book an appointment with an agriculture expert at your convenient time.' 
                    : 'आपल्या सोयीच्या वेळी कृषी तज्ञांसोबत अपॉइंटमेंट बुक करा.'}
                </p>
                
                <Button className="mx-auto">
                  {language === 'en' ? 'Check Available Slots' : 'उपलब्ध स्लॉट तपासा'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AskExpert;
