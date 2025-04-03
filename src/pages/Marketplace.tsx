
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { MapPin, Filter, Search, ShoppingBag, Phone, Star, Clock, ChevronDown } from 'lucide-react';

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would filter products from the API
    // For now, we'll just log the search
    console.log(`Searching for: ${searchQuery} in category: ${category}`);
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
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Agricultural Marketplace</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect directly with buyers and sellers of agricultural products without middlemen.
          </p>
        </div>
        
        <Tabs defaultValue="buy" className="mb-12" onValueChange={(value) => setActiveTab(value)}>
          <div className="flex justify-center">
            <TabsList className="w-full max-w-md">
              <TabsTrigger value="buy" className="w-1/2">Buy Products</TabsTrigger>
              <TabsTrigger value="sell" className="w-1/2">Sell Products</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="buy" className="mt-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-8">
              <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
                <div className="flex-grow relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    placeholder="Search products, categories..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="w-full md:w-40">
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="grains">Grains</SelectItem>
                      <SelectItem value="vegetables">Vegetables</SelectItem>
                      <SelectItem value="fruits">Fruits</SelectItem>
                      <SelectItem value="spices">Spices</SelectItem>
                      <SelectItem value="fiber">Fiber</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="md:w-auto bg-primary-600 hover:bg-primary-700">
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </Button>
              </form>
            </div>
            
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="w-full lg:w-64 space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <Filter className="mr-2 h-5 w-5" />
                      Filters
                    </h3>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="text-sm font-medium text-gray-700 block mb-2">Price Range</label>
                        <div className="flex space-x-2">
                          <Input placeholder="Min" type="number" className="w-1/2" />
                          <Input placeholder="Max" type="number" className="w-1/2" />
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-gray-700 block mb-2">Distance</label>
                        <Select defaultValue="50">
                          <SelectTrigger>
                            <SelectValue placeholder="Maximum distance" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="10">Within 10 km</SelectItem>
                            <SelectItem value="25">Within 25 km</SelectItem>
                            <SelectItem value="50">Within 50 km</SelectItem>
                            <SelectItem value="100">Within 100 km</SelectItem>
                            <SelectItem value="any">Any distance</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-gray-700 block mb-2">Product Type</label>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <input type="checkbox" id="organic" className="rounded text-primary-600 focus:ring-primary-500" />
                            <label htmlFor="organic" className="ml-2 text-gray-700">Organic Only</label>
                          </div>
                          <div className="flex items-center">
                            <input type="checkbox" id="verified" className="rounded text-primary-600 focus:ring-primary-500" />
                            <label htmlFor="verified" className="ml-2 text-gray-700">Verified Sellers Only</label>
                          </div>
                        </div>
                      </div>
                      
                      <Button variant="outline" className="w-full">Apply Filters</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Current Market Prices</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-700">Rice (Common)</span>
                        <span className="font-medium">₹28-32/kg</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-700">Wheat</span>
                        <span className="font-medium">₹24-28/kg</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-700">Tomatoes</span>
                        <span className="font-medium">₹20-30/kg</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-700">Potatoes</span>
                        <span className="font-medium">₹15-18/kg</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-700">Onions</span>
                        <span className="font-medium">₹20-25/kg</span>
                      </div>
                      <div className="border-t border-gray-200 pt-2 mt-2 text-center">
                        <Button variant="link" className="text-primary-600 p-0 h-auto text-sm">
                          View Full Price List
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="flex-grow">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <p className="text-gray-700">{filterProducts().length} results found</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-700">Sort by:</span>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-[160px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="recent">Most Recent</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                        <SelectItem value="rating">Highest Rated</SelectItem>
                        <SelectItem value="distance">Nearest First</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filterProducts().map((product) => (
                    <Card key={product.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <div className="relative h-48">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                        {product.organic && (
                          <Badge className="absolute top-2 right-2 bg-green-500">Organic</Badge>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 truncate">{product.name}</h3>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 mr-1" />
                            <span className="text-sm">{product.rating}</span>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center mb-3">
                          <div className="text-primary-700 font-bold">
                            ₹{product.price}/{product.unit}
                          </div>
                          <div className="text-sm text-gray-600">
                            Available: {product.quantity} {product.unit}
                          </div>
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-600 mb-3">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{product.location} ({product.distance} km)</span>
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-600 mb-4">
                          <div className="flex items-center mr-3">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{product.listedDate}</span>
                          </div>
                          {product.seller.verified && (
                            <Badge variant="outline" className="text-green-600 border-green-600">
                              Verified Seller
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button className="w-full bg-primary-600 hover:bg-primary-700">
                            <ShoppingBag className="mr-2 h-4 w-4" />
                            Buy Now
                          </Button>
                          <Button variant="outline" className="px-3">
                            <Phone className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                {filterProducts().length === 0 && (
                  <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
                    <img src="/placeholder.svg" alt="No results" className="w-20 h-20 mx-auto mb-4 opacity-30" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                    <p className="text-gray-600">
                      Try adjusting your search or filter criteria
                    </p>
                  </div>
                )}
                
                {filterProducts().length > 0 && (
                  <div className="flex justify-center mt-8">
                    <Button variant="outline" className="flex items-center">
                      Load More
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="sell" className="mt-6">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">List Your Product for Sale</h2>
              
              <form className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 block">Product Name</label>
                  <Input placeholder="e.g., Organic Rice, Fresh Tomatoes" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 block">Category</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="grains">Grains</SelectItem>
                        <SelectItem value="vegetables">Vegetables</SelectItem>
                        <SelectItem value="fruits">Fruits</SelectItem>
                        <SelectItem value="spices">Spices</SelectItem>
                        <SelectItem value="fiber">Fiber</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 block">Is it Organic?</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 block">Price (₹)</label>
                    <Input type="number" placeholder="e.g., 25" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 block">Unit</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kg">per kg</SelectItem>
                        <SelectItem value="quintal">per quintal</SelectItem>
                        <SelectItem value="ton">per ton</SelectItem>
                        <SelectItem value="dozen">per dozen</SelectItem>
                        <SelectItem value="piece">per piece</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 block">Available Quantity</label>
                    <Input type="number" placeholder="e.g., 500" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 block">Description</label>
                  <textarea 
                    className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" 
                    placeholder="Describe your product quality, harvest date, etc."
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 block">Product Images</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="mt-4 flex justify-center text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                      >
                        <span>Upload files</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      PNG, JPG, GIF up to 10MB (max 5 images)
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 block">Location</label>
                    <Input placeholder="e.g., Village, District, State" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 block">Contact Number</label>
                    <Input placeholder="Your mobile number" />
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button type="submit" className="w-full bg-primary-600 hover:bg-primary-700">
                    List Product for Sale
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
