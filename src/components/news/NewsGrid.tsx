
import { Skeleton } from '@/components/ui/skeleton';
import { type NewsArticle } from '@/types/news';
import { NewsCard } from './NewsCard';

interface NewsGridProps {
  loading: boolean;
  articles: NewsArticle[];
  isArticleSaved: (articleId: string) => boolean;
  onSaveArticle: (articleId: string) => Promise<void>;
  onRemoveArticle: (articleId: string) => Promise<void>;
  onShareArticle: (title: string, url: string) => void;
  formatDate: (date: string) => string;
}

export const NewsGrid = ({
  loading,
  articles,
  isArticleSaved,
  onSaveArticle,
  onRemoveArticle,
  onShareArticle,
  formatDate,
}: NewsGridProps) => {
  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <LoadingSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="col-span-full text-center py-12 px-4 rounded-lg bg-primary/5 border border-primary/10">
        <p className="text-muted-foreground">No articles found matching your criteria</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article, index) => (
        <div 
          key={article.id}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <NewsCard
            article={article}
            isArticleSaved={isArticleSaved(article.id)}
            onSaveArticle={onSaveArticle}
            onRemoveArticle={onRemoveArticle}
            onShareArticle={onShareArticle}
            formatDate={formatDate}
          />
        </div>
      ))}
    </div>
  );
};

const LoadingSkeleton = () => (
  <div className="overflow-hidden rounded-xl border border-primary/10 shadow-lg dark:shadow-primary-900/10 bg-card animate-pulse">
    <div className="aspect-video w-full">
      <Skeleton className="h-full w-full" />
    </div>
    <div className="p-6">
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-3/4 mb-4" />
      <Skeleton className="h-20 w-full mb-4" />
      <div className="flex justify-between">
        <Skeleton className="h-9 w-24" />
        <Skeleton className="h-9 w-24" />
      </div>
    </div>
  </div>
);
