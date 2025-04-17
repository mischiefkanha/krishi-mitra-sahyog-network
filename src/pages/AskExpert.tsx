import { useState, useRef, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage, useTranslation } from '@/context/LanguageContext';
import { Send, Mic, User2, Bot, Loader2, Copy, VolumeX, Volume2 } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Message interface for the chat
interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const AskExpert = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: 'नमस्कार! मी कृषिमित्र सहाय्यक आहे. आपल्याला शेती संबंधित कोणत्याही प्रश्नांची उत्तरे देण्यास मला आनंद होईल. कृपया आपला प्रश्न विचारा.',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [preferredLanguage, setPreferredLanguage] = useState<'en' | 'mr' | 'hi'>('mr'); // Specify as LanguageCode type
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { language, setLanguage } = useLanguage();

  // Automatically scroll to the bottom of the chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Update language context when preferred language changes
  useEffect(() => {
    setLanguage(preferredLanguage);
  }, [preferredLanguage, setLanguage]);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;
    
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
      // Call the AI chat function
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: { message: inputMessage }
      });
      
      if (error) throw error;
      
      // Add assistant message to chat
      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: data.response,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      
    } catch (error: any) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
      
      // Add error message from assistant
      setMessages(prev => [
        ...prev, 
        {
          role: 'assistant',
          content: "Sorry, I'm having trouble connecting right now. Please try again in a moment.",
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsLoading(false);
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

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Card className="min-h-[80vh] flex flex-col">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-primary-900 dark:text-primary-400">
              KrishiMitra Expert Assistant
            </CardTitle>
            <CardDescription>
              Ask questions about farming practices, crop management, or any agricultural concerns
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
                <Label htmlFor="voice-responses">Auto-read responses</Label>
              </div>
              <Select value={preferredLanguage} onValueChange={setPreferredLanguage}>
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
                      <AvatarFallback className={msg.role === 'user' ? 'bg-primary-200' : 'bg-green-200'}>
                        {msg.role === 'user' ? <User2 className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                      </AvatarFallback>
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
                        {msg.role === 'assistant' && (
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
                  placeholder={preferredLanguage === 'en' ? "Type your message..." : preferredLanguage === 'hi' ? "अपना संदेश टाइप करें..." : "तुमचा संदेश टाइप करा..."}
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
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AskExpert;
