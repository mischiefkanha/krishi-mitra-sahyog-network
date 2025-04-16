
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useTranslation } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { 
  MapPin, Filter, Search, ShoppingBag, Phone, Star, 
  Clock, ChevronDown, Volume2, Truck, Heart, CheckCircle,
  SlidersHorizontal, CircleDollarSign, Globe, Users
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface Product {
  id: string;
  name: string;
  image: string;
  category: string;
  price: number;
  unit: string;
  location: string;
  distance: number;
  rating: number;
  reviews: number;
  seller: {
    name: string;
    verified: boolean;
  };
  listedDate: string;
  organic: boolean;
  quantity: number;
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Quality Rice',
    image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmljZXxlbnwwfHwwfHx8MA%3D%3D',
    category: 'Grains',
    price: 35,
    unit: 'kg',
    location: 'Ludhiana, Punjab',
    distance: 5.2,
    rating: 4.8,
    reviews: 42,
    seller: {
      name: 'Gurpreet Singh',
      verified: true,
    },
    listedDate: '2 days ago',
    organic: true,
    quantity: 500
  },
  {
    id: '2',
    name: 'Fresh Tomatoes',
    image: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dG9tYXRvfGVufDB8fDB8fHww',
    category: 'Vegetables',
    price: 25,
    unit: 'kg',
    location: 'Nashik, Maharashtra',
    distance: 8.7,
    rating: 4.5,
    reviews: 28,
    seller: {
      name: 'Rahul Patil',
      verified: true,
    },
    listedDate: '1 day ago',
    organic: false,
    quantity: 200
  },
  {
    id: '3',
    name: 'Organic Cotton',
    image: 'https://images.unsplash.com/photo-1605384226435-6b344eb18f83?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y290dG9ufGVufDB8fDB8fHww',
    category: 'Fiber',
    price: 75,
    unit: 'kg',
    location: 'Ahmedabad, Gujarat',
    distance: 12.3,
    rating: 4.9,
    reviews: 56,
    seller: {
      name: 'Pradeep Patel',
      verified: true,
    },
    listedDate: '5 days ago',
    organic: true,
    quantity: 300
  },
  {
    id: '4',
    name: 'Fresh Potatoes',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cG90YXRvZXN8ZW58MHx8MHx8fDA%3D',
    category: 'Vegetables',
    price: 15,
    unit: 'kg',
    location: 'Agra, Uttar Pradesh',
    distance: 7.1,
    rating: 4.2,
    reviews: 19,
    seller: {
      name: 'Vijay Kumar',
      verified: false,
    },
    listedDate: '3 days ago',
    organic: false,
    quantity: 600
  },
  {
    id: '5',
    name: 'Fresh Mangoes',
    image: 'https://images.unsplash.com/photo-1591073113125-e46713c829ed?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFuZ298ZW58MHx8MHx8fDA%3D',
    category: 'Fruits',
    price: 120,
    unit: 'dozen',
    location: 'Ratnagiri, Maharashtra',
    distance: 15.4,
    rating: 4.7,
    reviews: 63,
    seller: {
      name: 'Anand Desai',
      verified: true,
    },
    listedDate: '1 day ago',
    organic: true,
    quantity: 100
  },
  {
    id: '6',
    name: 'Organic Wheat',
    image: 'https://images.unsplash.com/photo-1622686215475-85f9c5595b3d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2hlYXR8ZW58MHx8MHx8fDA%3D',
    category: 'Grains',
    price: 32,
    unit: 'kg',
    location: 'Amritsar, Punjab',
    distance: 4.8,
    rating: 4.6,
    reviews: 38,
    seller: {
      name: 'Harpreet Kaur',
      verified: true,
    },
    listedDate: '4 days ago',
    organic: true,
    quantity: 800
  }
];

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [activeTab, setActiveTab] = useState('buy');
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [showFilters, setShowFilters] = useState(false);
  const { language } = useTranslation();
  const { theme } = useTheme();

  const getTranslation = (en: string, mr: string, hi?: string) => {
    if (language === 'en') return en;
    return mr; // For now we default to Marathi if not English
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would filter products from the API
    console.log(`Searching for: ${searchQuery} in category: ${category}`);
  };

  const playVoiceOver = (text: string) => {
    // In a real implementation, this would use a text-to-speech API
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance();
      speech.text = text;
      speech.lang = language === 'en' ? 'en-US' : 'mr-IN';
      window.speechSynthesis.speak(speech);
    } else {
      console.log('Text-to-speech not supported in this browser');
    }
  };

  const filterProducts = () => {
    let filtered = [...mockProducts];
    
    if (searchQuery) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (category !== 'all') {
      filtered = filtered.filter(product => product.category.toLowerCase() === category.toLowerCase());
    }

    // Filter by price range
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'distance':
        filtered.sort((a, b) => a.distance - b.distance);
        break;
      default:
        // Recent is default
        break;
    }
    
    return filtered;
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">
            {getTranslation('Agricultural Marketplace', 'कृषी बाजारपेठ')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {getTranslation(
              'Connect directly with buyers and sellers of agricultural products without middlemen.',
              'मध्यस्थांशिवाय कृषी उत्पादनांच्या खरेदीदारांशी आणि विक्रेत्यांशी थेट संपर्क साधा.'
            )}
          </p>
        </div>
        
        <Tabs defaultValue="buy" className="mb-8" onValueChange={(value) => setActiveTab(value)}>
          <div className="flex justify-center">
            <TabsList className="w-full max-w-md">
              <TabsTrigger value="buy" className="w-1/2 text-base p-3">
                {getTranslation('Buy Products', 'उत्पादने खरेदी करा')}
              </TabsTrigger>
              <TabsTrigger value="sell" className="w-1/2 text-base p-3">
                {getTranslation('Sell Products', 'उत्पादने विकणे')}
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="buy" className="mt-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-8">
              <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
                <div className="flex-grow relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    placeholder={getTranslation('Search products, categories...', 'उत्पादने, श्रेणी शोधा...')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12 text-base"
                  />
                </div>
                <div className="w-full md:w-40">
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="h-12 text-base">
                      <SelectValue placeholder={getTranslation('Category', 'श्रेणी')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{getTranslation('All Categories', 'सर्व श्रेणी')}</SelectItem>
                      <SelectItem value="grains">{getTranslation('Grains', 'धान्य')}</SelectItem>
                      <SelectItem value="vegetables">{getTranslation('Vegetables', 'भाज्या')}</SelectItem>
                      <SelectItem value="fruits">{getTranslation('Fruits', 'फळे')}</SelectItem>
                      <SelectItem value="spices">{getTranslation('Spices', 'मसाले')}</SelectItem>
                      <SelectItem value="fiber">{getTranslation('Fiber', 'तंतू')}</SelectItem>
                      <SelectItem value="tools">{getTranslation('Tools', 'औजारे')}</SelectItem>
                      <SelectItem value="fertilizers">{getTranslation('Fertilizers', 'खते')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  type="submit" 
                  className="md:w-auto h-12 text-base"
                >
                  <Search className="mr-2 h-5 w-5" />
                  {getTranslation('Search', 'शोध')}
                </Button>
                <Button 
                  type="button"
                  variant="outline" 
                  className="md:w-auto h-12 text-base"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <SlidersHorizontal className="mr-2 h-5 w-5" />
                  {getTranslation('Filters', 'फिल्टर्स')}
                </Button>
              </form>

              {showFilters && (
                <div className="mt-6 border-t pt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <h3 className="font-medium flex items-center">
                      <CircleDollarSign className="mr-2 h-5 w-5 text-primary-600" />
                      {getTranslation('Price Range (₹)', 'किंमत श्रेणी (₹)')}
                    </h3>
                    <div className="px-2">
                      <Slider
                        value={priceRange}
                        min={0}
                        max={500}
                        step={10}
                        onValueChange={(value) => setPriceRange(value as [number, number])}
                        className="mt-2"
                      />
                      <div className="flex justify-between mt-2 text-sm">
                        <span>₹{priceRange[0]}</span>
                        <span>₹{priceRange[1]}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-medium flex items-center">
                      <MapPin className="mr-2 h-5 w-5 text-primary-600" />
                      {getTranslation('Distance', 'अंतर')}
                    </h3>
                    <Select defaultValue="50">
                      <SelectTrigger className="h-12 text-base">
                        <SelectValue placeholder={getTranslation('Maximum distance', 'कमाल अंतर')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">{getTranslation('Within 10 km', '10 किमी मध्ये')}</SelectItem>
                        <SelectItem value="25">{getTranslation('Within 25 km', '25 किमी मध्ये')}</SelectItem>
                        <SelectItem value="50">{getTranslation('Within 50 km', '50 किमी मध्ये')}</SelectItem>
                        <SelectItem value="100">{getTranslation('Within 100 km', '100 किमी मध्ये')}</SelectItem>
                        <SelectItem value="any">{getTranslation('Any distance', 'कोणतेही अंतर')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="font-medium flex items-center">
                      <CheckCircle className="mr-2 h-5 w-5 text-primary-600" />
                      {getTranslation('Product Type', 'उत्पादन प्रकार')}
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Switch id="organic" />
                        <Label htmlFor="organic" className="text-base">
                          {getTranslation('Organic Only', 'केवळ सेंद्रिय')}
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="verified" />
                        <Label htmlFor="verified" className="text-base">
                          {getTranslation('Verified Sellers Only', 'केवळ प्रमाणित विक्रेते')}
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="w-full lg:w-64 space-y-6">
                <Card className="overflow-hidden">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <Filter className="mr-2 h-5 w-5 text-primary-600" />
                      {getTranslation('Categories', 'श्रेणी')}
                    </h3>
                    
                    <div className="space-y-2">
                      <Button variant="ghost" className="w-full justify-start text-base h-10">
                        {getTranslation('All Products', 'सर्व उत्पादने')} 
                        <Badge className="ml-2">{mockProducts.length}</Badge>
                      </Button>
                      <Button variant="ghost" className="w-full justify-start text-base h-10">
                        {getTranslation('Grains', 'धान्य')}
                        <Badge className="ml-2">{mockProducts.filter(p => p.category === 'Grains').length}</Badge>
                      </Button>
                      <Button variant="ghost" className="w-full justify-start text-base h-10">
                        {getTranslation('Vegetables', 'भाज्या')}
                        <Badge className="ml-2">{mockProducts.filter(p => p.category === 'Vegetables').length}</Badge>
                      </Button>
                      <Button variant="ghost" className="w-full justify-start text-base h-10">
                        {getTranslation('Fruits', 'फळे')}
                        <Badge className="ml-2">{mockProducts.filter(p => p.category === 'Fruits').length}</Badge>
                      </Button>
                      <Button variant="ghost" className="w-full justify-start text-base h-10">
                        {getTranslation('Tools & Equipment', 'उपकरणे')}
                        <Badge className="ml-2">12</Badge>
                      </Button>
                      <Button variant="ghost" className="w-full justify-start text-base h-10">
                        {getTranslation('Fertilizers', 'खते')}
                        <Badge className="ml-2">8</Badge>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="overflow-hidden">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">
                      {getTranslation('Current Market Prices', 'सध्याचे बाजार भाव')}
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-700 dark:text-gray-300">{getTranslation('Rice (Common)', 'तांदूळ (सामान्य)')}</span>
                        <span className="font-medium">₹28-32/kg</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-700 dark:text-gray-300">{getTranslation('Wheat', 'गहू')}</span>
                        <span className="font-medium">₹24-28/kg</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-700 dark:text-gray-300">{getTranslation('Tomatoes', 'टोमॅटो')}</span>
                        <span className="font-medium">₹20-30/kg</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-700 dark:text-gray-300">{getTranslation('Potatoes', 'बटाटे')}</span>
                        <span className="font-medium">₹15-18/kg</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-700 dark:text-gray-300">{getTranslation('Onions', 'कांदे')}</span>
                        <span className="font-medium">₹20-25/kg</span>
                      </div>
                      <div className="border-t border-gray-200 pt-2 mt-2 text-center">
                        <Button variant="link" className="text-primary-600 p-0 h-auto text-sm">
                          {getTranslation('View Full Price List', 'संपूर्ण किंमत यादी पहा')}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="flex-grow">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <p className="text-gray-700 dark:text-gray-300">
                      {filterProducts().length} {getTranslation('results found', 'परिणाम सापडले')}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {getTranslation('Sort by:', 'क्रमवारी लावा:')}
                    </span>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-[160px]">
                        <SelectValue placeholder={getTranslation('Sort by', 'क्रमवारी लावा')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="recent">{getTranslation('Most Recent', 'सर्वात अलीकडील')}</SelectItem>
                        <SelectItem value="price-low">{getTranslation('Price: Low to High', 'किंमत: कमी ते जास्त')}</SelectItem>
                        <SelectItem value="price-high">{getTranslation('Price: High to Low', 'किंमत: जास्त ते कमी')}</SelectItem>
                        <SelectItem value="rating">{getTranslation('Highest Rated', 'सर्वोच्च दर्जा')}</SelectItem>
                        <SelectItem value="distance">{getTranslation('Nearest First', 'सर्वात जवळील प्रथम')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filterProducts().map((product) => (
                    <Card key={product.id} className="overflow-hidden hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700">
                      <div className="relative h-48">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                        {product.organic && (
                          <Badge className="absolute top-2 right-2 bg-green-500">
                            {getTranslation('Organic', 'सेंद्रिय')}
                          </Badge>
                        )}
                        <button 
                          className="absolute top-2 left-2 bg-white dark:bg-gray-800 p-2 rounded-full shadow-sm hover:shadow-md transition-shadow"
                          onClick={() => playVoiceOver(`${product.name}. ${getTranslation('Price:', 'किंमत:')} ${product.price} ${getTranslation('rupees per', 'रुपये प्रति')} ${product.unit}`)}
                        >
                          <Volume2 className="h-4 w-4 text-primary-600" />
                        </button>
                        <button className="absolute bottom-2 right-2 bg-white dark:bg-gray-800 p-2 rounded-full shadow-sm hover:shadow-md transition-shadow">
                          <Heart className="h-4 w-4 text-gray-500 hover:text-red-500" />
                        </button>
                      </div>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">{product.name}</h3>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 mr-1" />
                            <span className="text-sm">{product.rating}</span>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center mb-3">
                          <div className="text-primary-700 dark:text-primary-400 font-bold text-lg">
                            ₹{product.price}/{product.unit}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {getTranslation('Available:', 'उपलब्ध:')} {product.quantity} {product.unit}
                          </div>
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-3">
                          <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                          <span className="truncate">{product.location} ({product.distance} km)</span>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{product.listedDate}</span>
                          </div>
                          {product.seller.verified && (
                            <Badge variant="outline" className="text-green-600 border-green-600">
                              {getTranslation('Verified Seller', 'प्रमाणित विक्रेता')}
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button className="w-full text-base h-10">
                            <ShoppingBag className="mr-2 h-4 w-4" />
                            {getTranslation('Buy Now', 'आता खरेदी करा')}
                          </Button>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="outline" className="px-3 h-10">
                                  <Phone className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{getTranslation('Contact Seller', 'विक्रेत्याशी संपर्क साधा')}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                {filterProducts().length === 0 && (
                  <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <img src="/placeholder.svg" alt="No results" className="w-20 h-20 mx-auto mb-4 opacity-30" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                      {getTranslation('No products found', 'कोणतेही उत्पादने सापडले नाहीत')}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {getTranslation('Try adjusting your search or filter criteria', 'आपले शोध किंवा फिल्टर निकष समायोजित करण्याचा प्रयत्न करा')}
                    </p>
                  </div>
                )}
                
                {filterProducts().length > 0 && (
                  <div className="flex justify-center mt-8">
                    <Button variant="outline" className="flex items-center px-6 py-3 text-base">
                      {getTranslation('Load More', 'अधिक लोड करा')}
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="sell" className="mt-6">
            <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                {getTranslation('List Your Product for Sale', 'आपले उत्पादन विक्रीसाठी सूचीबद्ध करा')}
              </h2>
              
              <form className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="product-name" className="text-base">
                    {getTranslation('Product Name', 'उत्पादनाचे नाव')}
                  </Label>
                  <Input 
                    id="product-name"
                    placeholder={getTranslation('e.g., Organic Rice, Fresh Tomatoes', 'उदा., सेंद्रिय तांदूळ, ताजे टोमॅटो')}
                    className="h-12 text-base" 
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-base">
                      {getTranslation('Category', 'श्रेणी')}
                    </Label>
                    <Select>
                      <SelectTrigger id="category" className="h-12 text-base">
                        <SelectValue placeholder={getTranslation('Select category', 'श्रेणी निवडा')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="grains">{getTranslation('Grains', 'धान्य')}</SelectItem>
                        <SelectItem value="vegetables">{getTranslation('Vegetables', 'भाज्या')}</SelectItem>
                        <SelectItem value="fruits">{getTranslation('Fruits', 'फळे')}</SelectItem>
                        <SelectItem value="spices">{getTranslation('Spices', 'मसाले')}</SelectItem>
                        <SelectItem value="fiber">{getTranslation('Fiber', 'तंतू')}</SelectItem>
                        <SelectItem value="tools">{getTranslation('Tools', 'औजारे')}</SelectItem>
                        <SelectItem value="fertilizers">{getTranslation('Fertilizers', 'खते')}</SelectItem>
                        <SelectItem value="other">{getTranslation('Other', 'इतर')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="organic" className="text-base">
                      {getTranslation('Is it Organic?', 'हे सेंद्रिय आहे का?')}
                    </Label>
                    <Select>
                      <SelectTrigger id="organic" className="h-12 text-base">
                        <SelectValue placeholder={getTranslation('Select option', 'पर्याय निवडा')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">{getTranslation('Yes', 'होय')}</SelectItem>
                        <SelectItem value="no">{getTranslation('No', 'नाही')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="price" className="text-base">
                      {getTranslation('Price (₹)', 'किंमत (₹)')}
                    </Label>
                    <Input 
                      id="price"
                      type="number" 
                      placeholder={getTranslation('e.g., 25', 'उदा., 25')} 
                      className="h-12 text-base"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="unit" className="text-base">
                      {getTranslation('Unit', 'एकक')}
                    </Label>
                    <Select>
                      <SelectTrigger id="unit" className="h-12 text-base">
                        <SelectValue placeholder={getTranslation('Select unit', 'एकक निवडा')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kg">{getTranslation('per kg', 'प्रति किलो')}</SelectItem>
                        <SelectItem value="quintal">{getTranslation('per quintal', 'प्रति क्विंटल')}</SelectItem>
                        <SelectItem value="ton">{getTranslation('per ton', 'प्रति टन')}</SelectItem>
                        <SelectItem value="dozen">{getTranslation('per dozen', 'प्रति डझन')}</SelectItem>
                        <SelectItem value="piece">{getTranslation('per piece', 'प्रति नग')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="quantity" className="text-base">
                      {getTranslation('Available Quantity', 'उपलब्ध प्रमाण')}
                    </Label>
                    <Input 
                      id="quantity"
                      type="number" 
                      placeholder={getTranslation('e.g., 500', 'उदा., 500')} 
                      className="h-12 text-base"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-base">
                    {getTranslation('Description', 'वर्णन')}
                  </Label>
                  <textarea 
                    id="description"
                    className="min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none" 
                    placeholder={getTranslation('Describe your product quality, harvest date, etc.', 'आपल्या उत्पादनाची गुणवत्ता, काढणीची तारीख इत्यादी वर्णन करा.')}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-base">
                    {getTranslation('Product Images', 'उत्पादनाची चित्रे')}
                  </Label>
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="mt-4 flex justify-center text-sm text-gray-600 dark:text-gray-400">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                      >
                        <span>{getTranslation('Upload files', 'फाइल्स अपलोड करा')}</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple />
                      </label>
                      <p className="pl-1">{getTranslation('or drag and drop', 'किंवा ड्रॅग आणि ड्रॉप करा')}</p>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {getTranslation('PNG, JPG, GIF up to 10MB (max 5 images)', 'PNG, JPG, GIF 10MB पर्यंत (कमाल 5 प्रतिमा)')}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-base">
                      {getTranslation('Location', 'स्थान')}
                    </Label>
                    <Input 
                      id="location"
                      placeholder={getTranslation('e.g., Village, District, State', 'उदा., गाव, जिल्हा, राज्य')}
                      className="h-12 text-base" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contact" className="text-base">
                      {getTranslation('Contact Number', 'संपर्क क्रमांक')}
                    </Label>
                    <Input 
                      id="contact"
                      placeholder={getTranslation('Your mobile number', 'आपला मोबाईल नंबर')}
                      className="h-12 text-base"
                    />
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button type="submit" className="w-full h-12 text-lg font-medium">
                    <Truck className="mr-2 h-5 w-5" />
                    {getTranslation('List Product for Sale', 'विक्रीसाठी उत्पादन सूचीबद्ध करा')}
                  </Button>
                </div>
              </form>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Marketplace;
