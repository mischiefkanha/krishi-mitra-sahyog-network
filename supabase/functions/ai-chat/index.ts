
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const openAiApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAiApiKey) {
      throw new Error('OPENAI_API_KEY is not set');
    }

    const { message } = await req.json();
    
    if (!message) {
      throw new Error('No message provided');
    }

    // Call the OpenAI API with the farming assistant system prompt
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: 'You are KrishiMitra, an expert farming assistant. You help farmers with agricultural advice, crop selection, disease prevention, cultivation techniques, pest management, soil health, water management, sustainable farming practices, and market information. Your responses should be practical, accessible, and specifically tailored to the context of farming. Keep your responses concise and informative.' 
          },
          { 
            role: 'user', 
            content: message 
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      }),
    });

    const result = await response.json();
    
    if (result.error) {
      throw new Error(`OpenAI API error: ${result.error.message}`);
    }
    
    const aiResponse = result.choices[0].message.content;

    return new Response(
      JSON.stringify({ response: aiResponse }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error("Error in AI chat:", error);
    
    return new Response(
      JSON.stringify({
        error: error.message || 'An error occurred while processing your message',
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
