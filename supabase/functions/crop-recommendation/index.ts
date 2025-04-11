
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
    const { soilType, nitrogen, phosphorus, potassium, ph, temperature, humidity, rainfall, location = "RegionX" } = await req.json();
    
    // Format the URL with query parameters
    const apiUrl = new URL("https://magicloops.dev/api/loop/473e2be6-11eb-4b70-a1a6-34c1cbbac813/run");
    
    // Add query parameters
    apiUrl.searchParams.append("soil_type", soilType);
    apiUrl.searchParams.append("N", nitrogen.toString());
    apiUrl.searchParams.append("P", phosphorus.toString());
    apiUrl.searchParams.append("K", potassium.toString());
    apiUrl.searchParams.append("pH", ph.toString());
    apiUrl.searchParams.append("temp", temperature.toString());
    apiUrl.searchParams.append("humidity", humidity.toString());
    apiUrl.searchParams.append("rainfall", rainfall.toString());
    apiUrl.searchParams.append("location", location);
    
    console.log(`Calling MagicLoops API: ${apiUrl.toString()}`);
    
    // Call the MagicLoops API
    const response = await fetch(apiUrl.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const result = await response.json();
    
    // Parse the result to extract recommended crop
    let recommendedCrop = '';
    let confidence = 0.85; // Default confidence
    
    if (result.result && typeof result.result === 'string') {
      recommendedCrop = result.result.trim();
    } else {
      console.error("Unexpected response format:", result);
      recommendedCrop = "Rice"; // Default if API fails
    }

    return new Response(
      JSON.stringify({
        recommendedCrop,
        confidence,
        apiResponse: result, // Include the full API response for debugging
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
