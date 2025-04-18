
import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar, Clock, ExternalLink, Search, Share2, Bookmark } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase, tables } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

interface NewsArticle {
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

interface SavedArticle {
  id: string;
  user_id: string;
  article_id: string;
  created_at: string;
  article: NewsArticle;
}

const News = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [savedArticles, setSavedArticles] = useState<SavedArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchArticles();
    if (user) {
      fetchSavedArticles();
    }
  }, [user]);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      // Using the tables constant for type safety
      const { data, error } = await supabase
        .from(tables.newsArticles)
        .select('*')
        .order('published_at', { ascending: false });

      if (error) throw error;
      
      if (data) {
        setArticles(data as unknown as NewsArticle[]);
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
        .from(tables.savedArticles)
        .select(`
          *,
          article:${tables.newsArticles}(*)
        `)
        .eq('user_id', user.id);

      if (error) throw error;
      
      if (data) {
        setSavedArticles(data as unknown as SavedArticle[]);
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
        .from(tables.savedArticles)
        .insert({ 
          user_id: user.id, 
          article_id: articleId 
        });

      if (error) throw error;
      
      toast({
        title: "Article Saved",
        description: "This article has been saved to your bookmarks",
      });
      
      // Refresh saved articles
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
        .from(tables.savedArticles)
        .delete()
        .eq('user_id', user.id)
        .eq('article_id', articleId);

      if (error) throw error;
      
      toast({
        title: "Article Removed",
        description: "This article has been removed from your bookmarks",
      });
      
      // Refresh saved articles
      fetchSavedArticles();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to remove the article",
        variant: "destructive",
      });
    }
  };

  const isArticleSaved = (articleId: string) => {
    return savedArticles.some(saved => saved.article_id === articleId);
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
      // Fallback for browsers that don't support the Web Share API
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

  const filteredArticles = articles.filter(article => {
    const matchesCategory = activeCategory === 'all' || article.category === activeCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ['all', ...new Set(articles.map(article => article.category))];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Agricultural News & Updates</h1>
        
        <div className="mb-8">
          <div className="relative w-full md:w-1/2 mb-4">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
            <Input 
              className="pl-10" 
              placeholder="Search news articles..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
            <TabsList className="mb-4 flex flex-wrap overflow-auto">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category} className="capitalize">
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
            
            <TabsContent value={activeCategory}>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {loading ? (
                  // Loading skeletons
                  Array.from({ length: 6 }).map((_, i) => (
                    <Card key={i} className="overflow-hidden">
                      <div className="aspect-video w-full">
                        <Skeleton className="h-full w-full" />
                      </div>
                      <CardHeader>
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                      </CardHeader>
                      <CardContent>
                        <Skeleton className="h-20 w-full" />
                      </CardContent>
                      <CardFooter>
                        <Skeleton className="h-9 w-full" />
                      </CardFooter>
                    </Card>
                  ))
                ) : filteredArticles.length > 0 ? (
                  filteredArticles.map((article) => (
                    <Card key={article.id} className="overflow-hidden flex flex-col h-full">
                      <div className="aspect-video w-full overflow-hidden">
                        <img
                          src={article.image_url || '/placeholder.svg'}
                          alt={article.title}
                          className="h-full w-full object-cover transition-transform hover:scale-105"
                        />
                      </div>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <Badge variant="outline" className="capitalize">
                            {article.category}
                          </Badge>
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="mr-1 h-3 w-3" />
                            <span>{formatDate(article.published_at)}</span>
                          </div>
                        </div>
                        <CardTitle className="line-clamp-2 hover:text-primary-600 transition-colors">
                          <a href={article.source_url} target="_blank" rel="noopener noreferrer">
                            {article.title}
                          </a>
                        </CardTitle>
                        <CardDescription className="text-xs text-gray-500">
                          Source: {article.source}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <p className="line-clamp-3 text-gray-700 dark:text-gray-300">
                          {article.summary}
                        </p>
                      </CardContent>
                      <CardFooter className="flex justify-between items-center">
                        <div className="flex space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => {
                              if (isArticleSaved(article.id)) {
                                removeSavedArticle(article.id);
                              } else {
                                saveArticle(article.id);
                              }
                            }}
                          >
                            <Bookmark 
                              className={`mr-1 h-4 w-4 ${isArticleSaved(article.id) ? 'fill-primary-600' : ''}`} 
                            />
                            {isArticleSaved(article.id) ? 'Saved' : 'Save'}
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => shareArticle(article.title, article.source_url)}
                          >
                            <Share2 className="mr-1 h-4 w-4" />
                            Share
                          </Button>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          asChild
                        >
                          <a href={article.source_url} target="_blank" rel="noopener noreferrer">
                            Read <ExternalLink className="ml-1 h-3 w-3" />
                          </a>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-full text-center py-8">
                    <p className="text-gray-500">No articles found matching your criteria</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default News;
