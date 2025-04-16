
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Newspaper, Award, ExternalLink } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

// Types for news and schemes
interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  publishedAt: string;
  imageUrl?: string;
  url: string;
}

interface SchemeItem {
  id: string;
  title: string;
  description: string;
  ministry: string;
  imageUrl?: string;
  url: string;
}

// Mock data fetching functions (to be replaced with actual API)
const fetchNews = async (): Promise<NewsItem[]> => {
  // This would be replaced with actual API call
  // Example: return await fetch('https://api.agrinews.com/latest').then(res => res.json());
  
  // Mock data for demonstration
  return [
    {
      id: '1',
      title: 'Wheat Production Expected to Increase by 5% This Year',
      summary: 'According to the Agriculture Ministry, wheat production across India is expected to increase by 5% this year due to favorable weather conditions.',
      source: 'AgriNews India',
      publishedAt: '2025-04-15',
      imageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=600&auto=format&fit=crop',
      url: '#'
    },
    {
      id: '2',
      title: 'New Drought-Resistant Rice Variety Developed by ICAR',
      summary: 'Indian Council of Agricultural Research has developed a new drought-resistant rice variety that requires 40% less water than traditional varieties.',
      source: 'Krishi Jagran',
      publishedAt: '2025-04-14',
      imageUrl: 'https://images.unsplash.com/photo-1626523551561-91245535a2c7?q=80&w=600&auto=format&fit=crop',
      url: '#'
    },
    {
      id: '3',
      title: 'Sustainable Farming Practices Gain Popularity in Southern States',
      summary: 'Farmers in Tamil Nadu and Kerala are increasingly adopting sustainable farming practices leading to reduced chemical usage and higher profits.',
      source: 'Rural Voice',
      publishedAt: '2025-04-12',
      imageUrl: 'https://images.unsplash.com/photo-1593355139740-8238092fa6ae?q=80&w=600&auto=format&fit=crop',
      url: '#'
    },
    {
      id: '4',
      title: 'Record Vegetable Exports from India in Last Quarter',
      summary: 'India has seen a record increase in vegetable exports in the last quarter, with a 12% growth compared to the same period last year.',
      source: 'AgriExport Times',
      publishedAt: '2025-04-10',
      imageUrl: 'https://images.unsplash.com/photo-1607305387299-a3d9611cd469?q=80&w=600&auto=format&fit=crop',
      url: '#'
    }
  ];
};

const fetchSchemes = async (): Promise<SchemeItem[]> => {
  // This would be replaced with actual API call
  // Example: return await fetch('https://api.gov.in/agriculture/schemes').then(res => res.json());
  
  // Mock data for demonstration
  return [
    {
      id: '1',
      title: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
      description: 'Income support of ₹6,000 per year in three equal installments to all land-holding farmer families.',
      ministry: 'Ministry of Agriculture & Farmers Welfare',
      imageUrl: 'https://images.unsplash.com/photo-1589220019762-9b400e8dd373?q=80&w=600&auto=format&fit=crop',
      url: 'https://pmkisan.gov.in/'
    },
    {
      id: '2',
      title: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
      description: 'Comprehensive risk insurance providing coverage from pre-sowing to post-harvest against non-preventable natural risks.',
      ministry: 'Ministry of Agriculture & Farmers Welfare',
      imageUrl: 'https://images.unsplash.com/photo-1557234195-6099a7a9facb?q=80&w=600&auto=format&fit=crop',
      url: 'https://pmfby.gov.in/'
    },
    {
      id: '3',
      title: 'Paramparagat Krishi Vikas Yojana (PKVY)',
      description: 'Promoting organic farming through adoption of organic villages by cluster approach and PGS certification.',
      ministry: 'Ministry of Agriculture & Farmers Welfare',
      imageUrl: 'https://images.unsplash.com/photo-1627920769597-55a1d57c0f89?q=80&w=600&auto=format&fit=crop',
      url: '#'
    },
    {
      id: '4',
      title: 'National Mission for Sustainable Agriculture (NMSA)',
      description: 'Promoting sustainable agriculture through climate change adaptation measures, enhancing agriculture productivity in rainfed areas.',
      ministry: 'Ministry of Agriculture & Farmers Welfare',
      imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=600&auto=format&fit=crop',
      url: '#'
    }
  ];
};

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('en-IN', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  }).format(date);
};

const LatestNewsAndSchemes = () => {
  const isMobile = useIsMobile();
  
  // Fetch the latest news
  const { 
    data: news, 
    isLoading: newsLoading, 
    isError: newsError
  } = useQuery({
    queryKey: ['agriculturalNews'],
    queryFn: fetchNews,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });
  
  // Fetch government schemes
  const { 
    data: schemes, 
    isLoading: schemesLoading, 
    isError: schemesError 
  } = useQuery({
    queryKey: ['governmentSchemes'],
    queryFn: fetchSchemes,
    staleTime: 1000 * 60 * 60 * 24 * 7, // 7 days
  });

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Latest Agricultural News & Schemes</h2>
        
        <Tabs defaultValue="news" className="w-full">
          <div className="flex justify-center mb-6">
            <TabsList>
              <TabsTrigger value="news" className="flex items-center gap-2">
                <Newspaper className="w-4 h-4" />
                <span>Agricultural News</span>
              </TabsTrigger>
              <TabsTrigger value="schemes" className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span>Govt Schemes</span>
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="news" className="mt-2">
            {newsLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <Card key={i} className="h-96 animate-pulse">
                    <div className="bg-gray-200 h-40 rounded-t-lg" />
                    <CardHeader>
                      <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
                      <div className="h-4 bg-gray-200 rounded w-1/2" />
                    </CardHeader>
                    <CardContent>
                      <div className="h-4 bg-gray-200 rounded w-full mb-2" />
                      <div className="h-4 bg-gray-200 rounded w-full mb-2" />
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : newsError ? (
              <div className="text-center py-8 text-red-500">
                <p>Failed to load news. Please try again later.</p>
              </div>
            ) : isMobile ? (
              <Carousel className="w-full">
                <CarouselContent>
                  {news?.map((item) => (
                    <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3">
                      <Card className="h-full flex flex-col">
                        {item.imageUrl && (
                          <div className="relative h-48 overflow-hidden rounded-t-lg">
                            <img
                              src={item.imageUrl}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <CardHeader className="pt-4 pb-2">
                          <CardTitle className="text-lg line-clamp-2">{item.title}</CardTitle>
                          <CardDescription className="flex justify-between">
                            <span>{item.source}</span>
                            <span>{formatDate(item.publishedAt)}</span>
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                          <p className="line-clamp-3 text-muted-foreground">{item.summary}</p>
                        </CardContent>
                        <div className="p-4 pt-0 mt-auto">
                          <a 
                            href={item.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex items-center gap-1 text-primary-700 hover:text-primary-800 font-medium"
                          >
                            Read More <ExternalLink size={16} />
                          </a>
                        </div>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="flex justify-center gap-2 mt-4">
                  <CarouselPrevious className="static translate-y-0" />
                  <CarouselNext className="static translate-y-0" />
                </div>
              </Carousel>
            ) : (
              <ScrollArea className="h-[450px] rounded-md border p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {news?.map((item) => (
                    <Card key={item.id} className="h-full flex flex-col">
                      {item.imageUrl && (
                        <div className="relative h-48 overflow-hidden rounded-t-lg">
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <CardHeader className="pt-4 pb-2">
                        <CardTitle className="text-lg line-clamp-2">{item.title}</CardTitle>
                        <CardDescription className="flex justify-between">
                          <span>{item.source}</span>
                          <span>{formatDate(item.publishedAt)}</span>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <p className="line-clamp-3 text-muted-foreground">{item.summary}</p>
                      </CardContent>
                      <div className="p-4 pt-0 mt-auto">
                        <a 
                          href={item.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex items-center gap-1 text-primary-700 hover:text-primary-800 font-medium"
                        >
                          Read More <ExternalLink size={16} />
                        </a>
                      </div>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            )}
          </TabsContent>
          
          <TabsContent value="schemes" className="mt-2">
            {schemesLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <Card key={i} className="h-96 animate-pulse">
                    <div className="bg-gray-200 h-40 rounded-t-lg" />
                    <CardHeader>
                      <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
                      <div className="h-4 bg-gray-200 rounded w-1/2" />
                    </CardHeader>
                    <CardContent>
                      <div className="h-4 bg-gray-200 rounded w-full mb-2" />
                      <div className="h-4 bg-gray-200 rounded w-full mb-2" />
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : schemesError ? (
              <div className="text-center py-8 text-red-500">
                <p>Failed to load government schemes. Please try again later.</p>
              </div>
            ) : isMobile ? (
              <Carousel className="w-full">
                <CarouselContent>
                  {schemes?.map((scheme) => (
                    <CarouselItem key={scheme.id} className="md:basis-1/2 lg:basis-1/3">
                      <Card className="h-full flex flex-col">
                        {scheme.imageUrl && (
                          <div className="relative h-48 overflow-hidden rounded-t-lg">
                            <img
                              src={scheme.imageUrl}
                              alt={scheme.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <CardHeader>
                          <CardTitle className="line-clamp-2">{scheme.title}</CardTitle>
                          <CardDescription>{scheme.ministry}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                          <p className="line-clamp-3 text-muted-foreground">{scheme.description}</p>
                        </CardContent>
                        <div className="p-4 pt-0 mt-auto">
                          <Button asChild variant="outline" className="w-full">
                            <a href={scheme.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1">
                              Apply Now <ExternalLink size={16} />
                            </a>
                          </Button>
                        </div>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="flex justify-center gap-2 mt-4">
                  <CarouselPrevious className="static translate-y-0" />
                  <CarouselNext className="static translate-y-0" />
                </div>
              </Carousel>
            ) : (
              <ScrollArea className="h-[450px] rounded-md border p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {schemes?.map((scheme) => (
                    <Card key={scheme.id} className="h-full flex flex-col">
                      {scheme.imageUrl && (
                        <div className="relative h-48 overflow-hidden rounded-t-lg">
                          <img
                            src={scheme.imageUrl}
                            alt={scheme.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <CardHeader>
                        <CardTitle className="line-clamp-2">{scheme.title}</CardTitle>
                        <CardDescription>{scheme.ministry}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <p className="line-clamp-3 text-muted-foreground">{scheme.description}</p>
                      </CardContent>
                      <div className="p-4 pt-0 mt-auto">
                        <Button asChild variant="outline" className="w-full">
                          <a href={scheme.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1">
                            Apply Now <ExternalLink size={16} />
                          </a>
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default LatestNewsAndSchemes;
