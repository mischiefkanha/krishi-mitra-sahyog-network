// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://pkdurupsohmxccbosjnt.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrZHVydXBzb2hteGNjYm9zam50Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5MjE5MzYsImV4cCI6MjA1OTQ5NzkzNn0.lMsp90ijyh-VO8QrbvqthGQ81AC2hjKyL13Yr7zCvu4";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

// Force refresh the types to include the new tables 
// by adding this comment to trigger a file update

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

// Helper functions for type safety
export const tables = {
  newsArticles: 'news_articles',
  savedArticles: 'saved_articles',
  profiles: 'profiles',
  forumPosts: 'forum_posts',
  forumComments: 'forum_comments',
  forumVotes: 'forum_votes',
  chatHistory: 'chat_history',
  cropRecommendations: 'crop_recommendations',
  diseaseDetections: 'disease_detections',
  newsArticles: 'news_articles',
  savedArticles: 'saved_articles',
} as const;
