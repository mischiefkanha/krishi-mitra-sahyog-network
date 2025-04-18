
import Layout from '@/components/layout/Layout';
import { NewsSearch } from '@/components/news/NewsSearch';
import { NewsCategories } from '@/components/news/NewsCategories';
import { NewsGrid } from '@/components/news/NewsGrid';
import { useNews } from '@/hooks/useNews';

const News = () => {
  const { 
    loading,
    articles,
    categories,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    isArticleSaved,
    saveArticle,
    removeSavedArticle,
    shareArticle,
    formatDate,
  } = useNews();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Agricultural News & Updates</h1>
        
        <div className="mb-8">
          <NewsSearch 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
          />
          
          <NewsCategories 
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
          
          <NewsGrid 
            loading={loading}
            articles={articles}
            isArticleSaved={isArticleSaved}
            onSaveArticle={saveArticle}
            onRemoveArticle={removeSavedArticle}
            onShareArticle={shareArticle}
            formatDate={formatDate}
          />
        </div>
      </div>
    </Layout>
  );
};

export default News;
