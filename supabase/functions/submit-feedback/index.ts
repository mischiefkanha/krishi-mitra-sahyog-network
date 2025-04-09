
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'
import { serve } from 'https://deno.land/std@0.190.0/http/server.ts'

const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
const adminEmail = 'info@krishimitra.com' // Change this to your admin email

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
}

interface FeedbackPayload {
  name: string
  email: string
  category: 'suggestion' | 'bug' | 'question' | 'other'
  message: string
  user_id: string | null
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: corsHeaders,
      status: 204
    })
  }
  
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey)
    
    // Get the feedback data from the request
    const data: FeedbackPayload = await req.json()
    
    // Store feedback in the database
    const { error: dbError } = await supabase
      .from('feedback')
      .insert([
        {
          name: data.name,
          email: data.email,
          category: data.category,
          message: data.message,
          user_id: data.user_id,
        },
      ])
    
    if (dbError) throw dbError
    
    // Send email notification to admin (commented out as it requires mail setup)
    /*
    const { error: mailError } = await supabase.functions.invoke('send-email', {
      body: {
        to: adminEmail,
        subject: `New Feedback: ${data.category}`,
        html: `
          <h2>New Feedback Submission</h2>
          <p><strong>From:</strong> ${data.name} (${data.email})</p>
          <p><strong>Category:</strong> ${data.category}</p>
          <p><strong>Message:</strong></p>
          <p>${data.message}</p>
          <hr>
          <p>This message was sent from the KrishiMitra feedback form.</p>
        `,
      },
    })
    
    if (mailError) throw mailError
    */
    
    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
      status: 200
    })
    
  } catch (error) {
    console.error('Error processing feedback:', error)
    
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
      status: 400
    })
  }
})
