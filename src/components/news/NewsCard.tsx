
import { Calendar, ExternalLink, Share2, Bookmark } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { type NewsArticle } from '@/types/news';

interface NewsCardProps {
  article: NewsArticle;
  isArticleSaved: boolean;
  onSaveArticle: (articleId: string) => Promise<void>;
  onRemoveArticle: (articleId: string) => Promise<void>;
  onShareArticle: (title: string, url: string) => void;
  formatDate: (date: string) => string;
}

export const NewsCard = ({ 
  article, 
  isArticleSaved, 
  onSaveArticle, 
  onRemoveArticle,
  onShareArticle,
  formatDate 
}: NewsCardProps) => {
  return (
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
              if (isArticleSaved) {
                onRemoveArticle(article.id);
              } else {
                onSaveArticle(article.id);
              }
            }}
          >
            <Bookmark 
              className={`mr-1 h-4 w-4 ${isArticleSaved ? 'fill-primary-600' : ''}`} 
            />
            {isArticleSaved ? 'Saved' : 'Save'}
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onShareArticle(article.title, article.source_url)}
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
  );
};
