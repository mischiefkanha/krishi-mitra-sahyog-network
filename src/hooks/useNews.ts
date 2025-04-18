
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import type { NewsArticle, SavedArticle } from '@/types/news';
import { useAuth } from '@/context/AuthContext';

export const useNews = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [savedArticles, setSavedArticles] = useState<SavedArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('news_articles')
        .select('*')
        .order('published_at', { ascending: false });

      if (error) throw error;
      
      if (data) {
        setArticles(data);
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSavedArticles = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('saved_articles')
        .select(`
          *,
          article:news_articles(*)
        `)
        .eq('user_id', user.id);

      if (error) throw error;
      
      if (data) {
        setSavedArticles(data);
      }
    } catch (error) {
      console.error('Error fetching saved articles:', error);
    }
  };

  const saveArticle = async (articleId: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please login to save articles",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('saved_articles')
        .insert({ 
          user_id: user.id, 
          article_id: articleId 
        } as any);

      if (error) throw error;
      
      toast({
        title: "Article Saved",
        description: "This article has been saved to your bookmarks",
      });
      
      fetchSavedArticles();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save the article",
        variant: "destructive",
      });
    }
  };

  const removeSavedArticle = async (articleId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('saved_articles')
        .delete()
        .eq('user_id', user.id)
        .eq('article_id', articleId);

      if (error) throw error;
      
      toast({
        title: "Article Removed",
        description: "This article has been removed from your bookmarks",
      });
      
      fetchSavedArticles();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to remove the article",
        variant: "destructive",
      });
    }
  };

  const shareArticle = (title: string, url: string) => {
    if (navigator.share) {
      navigator.share({
        title: title,
        url: url,
      }).then(() => {
        toast({
          title: "Shared",
          description: "The article has been shared",
        });
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(url);
      toast({
        title: "Link Copied",
        description: "The article link has been copied to clipboard",
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const isArticleSaved = (articleId: string) => {
    return savedArticles.some(saved => saved.article_id === articleId);
  };

  const getFilteredArticles = () => {
    return articles.filter(article => {
      const matchesCategory = activeCategory === 'all' || article.category === activeCategory;
      const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           article.summary.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  };

  useEffect(() => {
    fetchArticles();
    if (user) {
      fetchSavedArticles();
    }
  }, [user]);

  return {
    loading,
    articles: getFilteredArticles(),
    categories: ['all', ...new Set(articles.map(article => article.category))],
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    isArticleSaved,
    saveArticle,
    removeSavedArticle,
    shareArticle,
    formatDate,
  };
};
