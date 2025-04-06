
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
    const roboflowApiKey = Deno.env.get('ROBOFLOW_API_KEY');
    if (!roboflowApiKey) {
      throw new Error('ROBOFLOW_API_KEY is not set');
    }

    // Extract the image base64 from the request
    const { imageBase64 } = await req.json();
    if (!imageBase64) {
      throw new Error('No image provided');
    }

    // Call the Roboflow API
    const response = await fetch(
      `https://detect.roboflow.com/plant-disease-detection/1?api_key=${roboflowApiKey}`, 
      {
        method: "POST",
        body: imageBase64.split(',')[1], // Remove the base64 prefix
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    );

    const result = await response.json();

    // Process the result to extract disease information
    // Map common plant diseases to descriptions and treatments
    const diseaseInfo = {
      "bacterial_leaf_blight": {
        name: "Bacterial Leaf Blight",
        description: "A destructive bacterial disease affecting rice plants, causing yellowing and drying of leaves.",
        treatment: [
          "Use disease-resistant rice varieties",
          "Practice proper field sanitation",
          "Apply copper-based bactericides",
          "Ensure good drainage"
        ],
        severity: "medium"
      },
      "brown_spot": {
        name: "Brown Spot",
        description: "A fungal disease causing brown lesions on leaves, reducing photosynthesis and yield.",
        treatment: [
          "Use balanced fertilization",
          "Apply fungicides containing mancozeb or propiconazole",
          "Maintain proper plant spacing",
          "Remove infected plant debris"
        ],
        severity: "medium"
      },
      "late_blight": {
        name: "Late Blight",
        description: "A destructive disease affecting tomatoes and potatoes, causing dark lesions and rapid plant death.",
        treatment: [
          "Apply fungicides preventatively before symptoms appear",
          "Remove infected plants",
          "Ensure good air circulation",
          "Avoid overhead irrigation"
        ],
        severity: "high"
      },
      "healthy": {
        name: "Healthy Plant",
        description: "No disease detected. The plant appears to be healthy.",
        treatment: [
          "Continue regular maintenance",
          "Monitor for early signs of disease",
          "Ensure proper watering and fertilization"
        ],
        severity: "low"
      }
    };

    // Process result and extract the detected disease
    let detectedDisease = "unknown";
    let confidence = 0;

    if (result.predictions && result.predictions.length > 0) {
      // Sort predictions by confidence and get the highest one
      const sortedPredictions = result.predictions.sort((a, b) => b.confidence - a.confidence);
      detectedDisease = sortedPredictions[0].class.toLowerCase();
      confidence = sortedPredictions[0].confidence;
    }

    // Get disease information or use default
    const disease = diseaseInfo[detectedDisease] || {
      name: detectedDisease.charAt(0).toUpperCase() + detectedDisease.slice(1).replace(/_/g, ' '),
      description: "Information not available for this disease.",
      treatment: ["Consult with an agricultural expert for treatment options."],
      severity: "unknown"
    };

    return new Response(
      JSON.stringify({
        diseaseName: disease.name,
        confidence: confidence,
        description: disease.description,
        treatment: disease.treatment,
        severity: disease.severity
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error("Error in disease detection:", error);
    
    return new Response(
      JSON.stringify({
        error: error.message || 'An error occurred during disease detection',
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
