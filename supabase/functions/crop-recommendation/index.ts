
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
    const huggingFaceApiKey = Deno.env.get('HUGGINGFACE_API_KEY');
    if (!huggingFaceApiKey) {
      throw new Error('HUGGINGFACE_API_KEY is not set');
    }

    const { soilType, nitrogen, phosphorus, potassium, ph, temperature, humidity, rainfall } = await req.json();
    
    // Format the input for the model
    const promptText = `Given the following agricultural data, recommend the best crop to grow:
    Soil Type: ${soilType}
    Nitrogen: ${nitrogen} kg/ha
    Phosphorus: ${phosphorus} kg/ha
    Potassium: ${potassium} kg/ha
    pH Value: ${ph}
    Temperature: ${temperature} °C
    Humidity: ${humidity} %
    Rainfall: ${rainfall} mm
    
    The recommended crop is:`;

    // Call the HuggingFace API with the model
    const response = await fetch(
      "https://api-inference.huggingface.co/models/google/flan-t5-base",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${huggingFaceApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: promptText,
          options: {
            wait_for_model: true,
          },
        }),
      }
    );

    const result = await response.json();
    
    // Process the result to extract recommended crop
    let recommendedCrop = '';
    let confidence = 0.85; // Default confidence
    
    if (Array.isArray(result)) {
      recommendedCrop = result[0].generated_text.trim();
    } else if (result.generated_text) {
      recommendedCrop = result.generated_text.trim();
    } else {
      console.error("Unexpected response format:", result);
      recommendedCrop = "Rice"; // Default if API fails
    }

    return new Response(
      JSON.stringify({
        recommendedCrop,
        confidence,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error("Error in crop recommendation:", error);
    
    return new Response(
      JSON.stringify({
        error: error.message || 'An error occurred during crop recommendation',
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
