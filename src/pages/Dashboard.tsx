
import { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, LineChart, PieChart, Cell, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Pie } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { ArrowUpRight, Sprout, Bug, ShoppingBag, Clipboard, AlertTriangle, Download } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import { generateCropRecommendationReport, generateDiseaseDetectionReport, generateActivityReport } from '@/utils/pdfGenerator';

interface CropRecommendation {
  id: string;
  soil_type: string;
  recommended_crop: string;
  confidence: number;
  timestamp: string;
  nitrogen?: number;
  phosphorus?: number;
  potassium?: number;
  ph?: number;
}

interface DiseaseDetection {
  id: string;
  disease_name: string;
  confidence: number;
  timestamp: string;
}

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [cropRecommendations, setCropRecommendations] = useState<CropRecommendation[]>([]);
  const [diseaseDetections, setDiseaseDetections] = useState<DiseaseDetection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const { t } = useLanguage();

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    if (!user) return;
    
    setIsLoading(true);
    
    try {
      // Fetch crop recommendations
      const { data: cropData, error: cropError } = await supabase
        .from('crop_recommendations')
        .select('*')
        .order('timestamp', { ascending: false });
        
      if (cropError) throw cropError;
      
      // Fetch disease detections
      const { data: diseaseData, error: diseaseError } = await supabase
        .from('disease_detections')
        .select('*')
        .order('timestamp', { ascending: false });
        
      if (diseaseError) throw diseaseError;
      
      setCropRecommendations(cropData || []);
      setDiseaseDetections(diseaseData || []);
    } catch (error: any) {
      console.error("Error fetching user data:", error);
      toast({
        title: "Error",
        description: "Failed to load your data. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Process crop data for pie chart
  const cropData = cropRecommendations.reduce((acc: { name: string, value: number }[], curr) => {
    const existingIndex = acc.findIndex(item => item.name === curr.recommended_crop);
    
    if (existingIndex >= 0) {
      acc[existingIndex].value += 1;
    } else {
      acc.push({
        name: curr.recommended_crop,
        value: 1
      });
    }
    
    return acc;
  }, []);

  // Group by month for activity chart
  const getActivityData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    return months.map(month => {
      const cropCount = cropRecommendations.filter(item => {
        const itemMonth = new Date(item.timestamp).getMonth();
        return months[itemMonth] === month;
      }).length;
      
      const diseaseCount = diseaseDetections.filter(item => {
        const itemMonth = new Date(item.timestamp).getMonth();
        return months[itemMonth] === month;
      }).length;
      
      return {
        month,
        crops: cropCount,
        disease: diseaseCount,
        market: 0 // Placeholder for market data
      };
    });
  };

  const activityData = getActivityData();
  const COLORS = ['#4CAF50', '#2E7D32', '#81C784', '#C8E6C9', '#A5D6A7', '#66BB6A', '#43A047', '#388E3C'];

  const chartConfig = {
    crops: { label: "Crops", color: "#4CAF50" },
    disease: { label: "Disease", color: "#FF9800" },
    market: { label: "Market", color: "#2196F3" }
  };
  
  // Generate and download reports
  const handleDownloadCropReport = async () => {
    try {
      setIsGeneratingReport(true);
      await generateCropRecommendationReport(cropRecommendations);
      toast({
        title: "Report Generated",
        description: "Your crop recommendations report has been downloaded.",
      });
    } catch (error) {
      console.error("Error generating report:", error);
      toast({
        title: "Error",
        description: "Failed to generate report. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGeneratingReport(false);
    }
  };
  
  const handleDownloadDiseaseReport = async () => {
    try {
      setIsGeneratingReport(true);
      await generateDiseaseDetectionReport(diseaseDetections);
      toast({
        title: "Report Generated",
        description: "Your disease detection report has been downloaded.",
      });
    } catch (error) {
      console.error("Error generating report:", error);
      toast({
        title: "Error",
        description: "Failed to generate report. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGeneratingReport(false);
    }
  };
  
  const handleDownloadActivityReport = async () => {
    try {
      setIsGeneratingReport(true);
      await generateActivityReport(cropRecommendations, diseaseDetections);
      toast({
        title: "Report Generated",
        description: "Your activity report has been downloaded.",
      });
    } catch (error) {
      console.error("Error generating report:", error);
      toast({
        title: "Error",
        description: "Failed to generate report. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGeneratingReport(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-primary-900 dark:text-primary-400">{t('dashboard')}</h1>
          <Button 
            onClick={handleDownloadActivityReport} 
            disabled={isGeneratingReport}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            {t('downloadReports')}
          </Button>
        </div>
        
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 w-full max-w-md mb-6">
            <TabsTrigger value="overview">{t('overview')}</TabsTrigger>
            <TabsTrigger value="crops">{t('crops')}</TabsTrigger>
            <TabsTrigger value="diseases">{t('diseases')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">{t('cropRecommendation')}</CardTitle>
                  <Sprout className="h-4 w-4 text-primary-700" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{cropRecommendations.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {cropRecommendations.length > 0 
                      ? `Last added: ${new Date(cropRecommendations[0].timestamp).toLocaleDateString()}` 
                      : 'No recommendations yet'}
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">{t('diseases')}</CardTitle>
                  <Bug className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{diseaseDetections.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {diseaseDetections.length > 0 
                      ? `Last detected: ${new Date(diseaseDetections[0].timestamp).toLocaleDateString()}` 
                      : 'No detections yet'}
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Market Listings</CardTitle>
                  <ShoppingBag className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0</div>
                  <p className="text-xs text-muted-foreground">Coming soon</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
                  <Clipboard className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0</div>
                  <p className="text-xs text-muted-foreground">Coming soon</p>
                </CardContent>
              </Card>
            </div>
            
            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t('activity')}</CardTitle>
                  <CardDescription>Your activities over the last months</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer id="activity-chart" className="h-80" config={chartConfig}>
                    <LineChart data={activityData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line type="monotone" dataKey="crops" stroke="#4CAF50" strokeWidth={2} />
                      <Line type="monotone" dataKey="disease" stroke="#FF9800" strokeWidth={2} />
                    </LineChart>
                  </ChartContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex justify-between items-start">
                  <div>
                    <CardTitle>{t('cropDistribution')}</CardTitle>
                    <CardDescription>Types of crops recommended for you</CardDescription>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleDownloadCropReport}
                    disabled={isGeneratingReport || cropData.length === 0}
                    className="flex items-center gap-1"
                  >
                    <Download className="h-3 w-3" />
                    Export
                  </Button>
                </CardHeader>
                <CardContent>
                  {cropData.length > 0 ? (
                    <div id="crop-distribution-chart" className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={cropData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {cropData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  ) : (
                    <div className="h-80 flex items-center justify-center">
                      <p className="text-gray-500">No crop recommendations yet</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            {/* Recent Activity Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="flex justify-between items-start">
                  <div>
                    <CardTitle>{t('recentCropRecommendations')}</CardTitle>
                    <CardDescription>Your latest crop analysis results</CardDescription>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleDownloadCropReport}
                    disabled={isGeneratingReport || cropRecommendations.length === 0}
                    className="flex items-center gap-1"
                  >
                    <Download className="h-3 w-3" />
                    Export
                  </Button>
                </CardHeader>
                <CardContent>
                  {cropRecommendations.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Crop</TableHead>
                          <TableHead>Soil Type</TableHead>
                          <TableHead>Confidence</TableHead>
                          <TableHead>Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {cropRecommendations.slice(0, 5).map((rec) => (
                          <TableRow key={rec.id}>
                            <TableCell className="font-medium">{rec.recommended_crop}</TableCell>
                            <TableCell>{rec.soil_type}</TableCell>
                            <TableCell>{(rec.confidence * 100).toFixed(0)}%</TableCell>
                            <TableCell>{new Date(rec.timestamp).toLocaleDateString()}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <p className="text-center py-8 text-muted-foreground">
                      No crop recommendations yet. Try the Crop Recommendation feature.
                    </p>
                  )}
                </CardContent>
                <CardFooter className="flex justify-end">
                  <a href="/crop-recommendation" className="text-sm text-primary-700 flex items-center">
                    Get crop recommendations
                    <ArrowUpRight className="ml-1 h-4 w-4" />
                  </a>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="flex justify-between items-start">
                  <div>
                    <CardTitle>{t('recentDiseaseDetections')}</CardTitle>
                    <CardDescription>Your latest disease analysis results</CardDescription>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleDownloadDiseaseReport}
                    disabled={isGeneratingReport || diseaseDetections.length === 0}
                    className="flex items-center gap-1"
                  >
                    <Download className="h-3 w-3" />
                    Export
                  </Button>
                </CardHeader>
                <CardContent>
                  {diseaseDetections.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Disease</TableHead>
                          <TableHead>Confidence</TableHead>
                          <TableHead>Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {diseaseDetections.slice(0, 5).map((detection) => (
                          <TableRow key={detection.id}>
                            <TableCell className="font-medium">{detection.disease_name}</TableCell>
                            <TableCell>{(detection.confidence * 100).toFixed(0)}%</TableCell>
                            <TableCell>{new Date(detection.timestamp).toLocaleDateString()}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <p className="text-center py-8 text-muted-foreground">
                      No disease detections yet. Try the Disease Detection feature.
                    </p>
                  )}
                </CardContent>
                <CardFooter className="flex justify-end">
                  <a href="/disease-detection" className="text-sm text-primary-700 flex items-center">
                    Detect crop diseases
                    <ArrowUpRight className="ml-1 h-4 w-4" />
                  </a>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="crops" className="space-y-6">
            <Card>
              <CardHeader className="flex justify-between items-center">
                <div>
                  <CardTitle>Crop Recommendation History</CardTitle>
                  <CardDescription>All your crop recommendations</CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  onClick={handleDownloadCropReport}
                  disabled={isGeneratingReport || cropRecommendations.length === 0}
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Export Report
                </Button>
              </CardHeader>
              <CardContent>
                {cropRecommendations.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Recommended Crop</TableHead>
                        <TableHead>Soil Type</TableHead>
                        <TableHead>Nitrogen</TableHead>
                        <TableHead>Phosphorus</TableHead>
                        <TableHead>Potassium</TableHead>
                        <TableHead>pH</TableHead>
                        <TableHead>Confidence</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cropRecommendations.map((rec) => (
                        <TableRow key={rec.id}>
                          <TableCell>{new Date(rec.timestamp).toLocaleDateString()}</TableCell>
                          <TableCell className="font-medium">{rec.recommended_crop}</TableCell>
                          <TableCell>{rec.soil_type}</TableCell>
                          <TableCell>{rec.nitrogen}</TableCell>
                          <TableCell>{rec.phosphorus}</TableCell>
                          <TableCell>{rec.potassium}</TableCell>
                          <TableCell>{rec.ph}</TableCell>
                          <TableCell>{(rec.confidence * 100).toFixed(0)}%</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-12">
                    <Sprout className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-gray-100">No recommendations yet</h3>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                      Get personalized crop recommendations based on your soil and climate conditions.
                    </p>
                    <div className="mt-6">
                      <a 
                        href="/crop-recommendation" 
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none"
                      >
                        Get Crop Recommendations
                      </a>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="diseases" className="space-y-6">
            <Card>
              <CardHeader className="flex justify-between items-center">
                <div>
                  <CardTitle>Disease Detection History</CardTitle>
                  <CardDescription>All your disease detection results</CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  onClick={handleDownloadDiseaseReport}
                  disabled={isGeneratingReport || diseaseDetections.length === 0}
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Export Report
                </Button>
              </CardHeader>
              <CardContent>
                {diseaseDetections.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Disease</TableHead>
                        <TableHead>Confidence</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {diseaseDetections.map((detection) => (
                        <TableRow key={detection.id}>
                          <TableCell>{new Date(detection.timestamp).toLocaleDateString()}</TableCell>
                          <TableCell className="font-medium">{detection.disease_name}</TableCell>
                          <TableCell>{(detection.confidence * 100).toFixed(0)}%</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-12">
                    <Bug className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-gray-100">No disease detections yet</h3>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                      Upload images of your crops to detect diseases and get treatment recommendations.
                    </p>
                    <div className="mt-6">
                      <a 
                        href="/disease-detection" 
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none"
                      >
                        Detect Crop Diseases
                      </a>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Dashboard;
