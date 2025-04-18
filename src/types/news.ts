
export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  image_url: string;
  source: string;
  source_url: string;
  published_at: string;
  created_at: string;
}

export interface SavedArticle {
  id: string;
  user_id: string;
  article_id: string;
  created_at: string;
  article: NewsArticle;
}
