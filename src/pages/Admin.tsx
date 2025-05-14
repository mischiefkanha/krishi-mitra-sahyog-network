
import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { Link } from 'react-router-dom';
import {
  Loader2, 
  User, 
  Tractor, 
  Leaf, 
  MessageSquare, 
  BarChart, 
  Users, 
  Settings, 
  RefreshCw,
  ShieldAlert,
  Activity,
  Calendar,
  CheckCircle,
  AlertTriangle,
  BellRing,
  Database
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalExperts: 0,
    totalFarmers: 0,
    activeUsers: 0,
    cropRecommendations: 0,
    diseaseDetections: 0,
    forumPosts: 0,
    chatMessages: 0
  });
  const { toast } = useToast();
  const { user } = useAuth();

  // Fetch overview statistics
  const fetchStats = async () => {
    setLoading(true);
    try {
      // Get user counts
      const { count: totalUsers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      const { count: experts } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'expert');

      const { count: farmers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'farmer');

      // Get counts of various activities
      const { count: recommendations } = await supabase
        .from('crop_recommendations')
        .select('*', { count: 'exact', head: true });

      const { count: detections } = await supabase
        .from('disease_detections')
        .select('*', { count: 'exact', head: true });

      const { count: posts } = await supabase
        .from('forum_posts')
        .select('*', { count: 'exact', head: true });

      const { count: messages } = await supabase
        .from('chat_history')
        .select('*', { count: 'exact', head: true });

      setStats({
        totalUsers: totalUsers || 0,
        totalExperts: experts || 0,
        totalFarmers: farmers || 0,
        activeUsers: Math.floor((totalUsers || 0) * 0.7), // Estimate active users as 70% of total
        cropRecommendations: recommendations || 0,
        diseaseDetections: detections || 0,
        forumPosts: posts || 0,
        chatMessages: messages || 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
      toast({
        title: "Error",
        description: "Failed to fetch statistics",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchStats();
  }, []);

  const StatCard = ({ title, value, icon: Icon, description, trend = null }: { 
    title: string; 
    value: number; 
    icon: any;
    description?: string;
    trend?: { value: number; isPositive: boolean } | null;
  }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value.toLocaleString()}</div>
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
        {trend && (
          <div className={`flex items-center text-xs mt-2 ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {trend.isPositive ? '↑' : '↓'} {trend.value}% from last month
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
              <p className="text-muted-foreground">Monitor and manage your KrishiMitra platform.</p>
            </div>
            
            <div className="flex gap-3">
              <Link to="/admin/users">
                <Button variant="outline" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  User Management
                </Button>
              </Link>
              
              <Button 
                variant="outline"
                onClick={fetchStats}
                className="flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Refresh Data
              </Button>
            </div>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard 
                      title="Total Users" 
                      value={stats.totalUsers} 
                      icon={Users} 
                      trend={{ value: 12, isPositive: true }}
                    />
                    <StatCard 
                      title="Farmers" 
                      value={stats.totalFarmers} 
                      icon={Tractor} 
                      description={`${Math.round((stats.totalFarmers/stats.totalUsers || 0) * 100)}% of total users`}
                    />
                    <StatCard 
                      title="Experts" 
                      value={stats.totalExperts} 
                      icon={User} 
                      description={`${Math.round((stats.totalExperts/stats.totalUsers || 0) * 100)}% of total users`}
                    />
                    <StatCard 
                      title="Active Users" 
                      value={stats.activeUsers} 
                      icon={Activity} 
                      trend={{ value: 8, isPositive: true }}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard 
                      title="Crop Recommendations" 
                      value={stats.cropRecommendations} 
                      icon={Leaf} 
                      trend={{ value: 5, isPositive: true }}
                    />
                    <StatCard 
                      title="Disease Detections" 
                      value={stats.diseaseDetections} 
                      icon={AlertTriangle} 
                      trend={{ value: 15, isPositive: true }}
                    />
                    <StatCard 
                      title="Forum Posts" 
                      value={stats.forumPosts} 
                      icon={MessageSquare} 
                      trend={{ value: 3, isPositive: false }}
                    />
                    <StatCard 
                      title="Chat Messages" 
                      value={stats.chatMessages} 
                      icon={MessageSquare} 
                      trend={{ value: 24, isPositive: true }}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <Card className="col-span-1">
                      <CardHeader>
                        <CardTitle>Service Usage Overview</CardTitle>
                        <CardDescription>Most popular platform services</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">Crop Recommendations</span>
                              <span className="text-sm text-muted-foreground">42%</span>
                            </div>
                            <Progress value={42} />
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">Disease Detections</span>
                              <span className="text-sm text-muted-foreground">28%</span>
                            </div>
                            <Progress value={28} />
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">AI Chat Assistant</span>
                              <span className="text-sm text-muted-foreground">18%</span>
                            </div>
                            <Progress value={18} />
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">Forum Activity</span>
                              <span className="text-sm text-muted-foreground">12%</span>
                            </div>
                            <Progress value={12} />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="col-span-1">
                      <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                        <CardDescription>Latest system events</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-start">
                            <div className="mr-3 mt-0.5">
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            </div>
                            <div>
                              <p className="font-medium">New expert registered</p>
                              <p className="text-sm text-muted-foreground">
                                A new agricultural expert joined the platform
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                10 minutes ago
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <div className="mr-3 mt-0.5">
                              <Leaf className="h-5 w-5 text-green-500" />
                            </div>
                            <div>
                              <p className="font-medium">50 new crop recommendations</p>
                              <p className="text-sm text-muted-foreground">
                                Generated for farmers in Karnataka region
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                1 hour ago
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <div className="mr-3 mt-0.5">
                              <Database className="h-5 w-5 text-blue-500" />
                            </div>
                            <div>
                              <p className="font-medium">System backup completed</p>
                              <p className="text-sm text-muted-foreground">
                                Automatic database backup was successful
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                3 hours ago
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <div className="mr-3 mt-0.5">
                              <AlertTriangle className="h-5 w-5 text-amber-500" />
                            </div>
                            <div>
                              <p className="font-medium">Unusual login activity</p>
                              <p className="text-sm text-muted-foreground">
                                Multiple login attempts from unknown location
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                5 hours ago
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full">View All Activity</Button>
                      </CardFooter>
                    </Card>
                  </div>
                </>
              )}
            </TabsContent>
            
            <TabsContent value="analytics" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>User Growth Analytics</CardTitle>
                  <CardDescription>Monthly user registration statistics</CardDescription>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center">
                  <div className="text-center">
                    <BarChart className="h-16 w-16 mx-auto text-muted-foreground/50" />
                    <h3 className="mt-4 text-lg font-medium">Analytics Visualization Coming Soon</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Advanced analytics visualization will be implemented in the next update
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Geographic Distribution</CardTitle>
                    <CardDescription>User distribution by region</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">
                        Geographic map visualization coming soon
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Service Usage Trends</CardTitle>
                    <CardDescription>Monthly usage of platform services</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">
                        Usage trend visualization coming soon
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="activity" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>System Activity Log</CardTitle>
                  <CardDescription>Recent system events and activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-5">
                    {[1, 2, 3, 4, 5].map((item) => (
                      <div key={item} className="flex items-start border-b pb-4 last:border-0 last:pb-0">
                        <div className="mr-4 mt-0.5">
                          <div className={`h-9 w-9 rounded-full flex items-center justify-center 
                            ${item % 3 === 0 ? 'bg-green-100' : item % 3 === 1 ? 'bg-blue-100' : 'bg-amber-100'}`}>
                            {item % 3 === 0 ? (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            ) : item % 3 === 1 ? (
                              <User className="h-5 w-5 text-blue-500" />
                            ) : (
                              <BellRing className="h-5 w-5 text-amber-500" />
                            )}
                          </div>
                        </div>
                        <div>
                          <p className="font-medium">
                            {item % 3 === 0 ? 'Task Completed' : item % 3 === 1 ? 'User Activity' : 'System Notification'}
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {item % 3 === 0 
                              ? 'Scheduled data processing completed successfully' 
                              : item % 3 === 1 
                                ? 'New user registration detected from Delhi region' 
                                : 'System update scheduled for next week'}
                          </p>
                          <div className="flex items-center mt-2 text-xs text-muted-foreground">
                            <Calendar className="h-3.5 w-3.5 mr-1" />
                            <span>
                              {new Date(Date.now() - item * 3600000).toLocaleDateString()} • 
                              {new Date(Date.now() - item * 3600000).toLocaleTimeString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Load More</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Settings</CardTitle>
                  <CardDescription>Configure system-wide settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium">General Settings</h3>
                    <div className="mt-3 space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                          <p className="text-sm text-muted-foreground">
                            Put the site in maintenance mode for all users except admins
                          </p>
                        </div>
                        <Switch id="maintenance-mode" />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="user-registration">User Registration</Label>
                          <p className="text-sm text-muted-foreground">
                            Allow new user registrations
                          </p>
                        </div>
                        <Switch id="user-registration" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="email-notifications">Email Notifications</Label>
                          <p className="text-sm text-muted-foreground">
                            Send email notifications for system events
                          </p>
                        </div>
                        <Switch id="email-notifications" defaultChecked />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium">Feature Toggle</h3>
                    <div className="mt-3 space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="crop-ai">Crop AI Recommendations</Label>
                          <p className="text-sm text-muted-foreground">
                            Enable AI-based crop recommendations
                          </p>
                        </div>
                        <Switch id="crop-ai" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="disease-detection">Disease Detection</Label>
                          <p className="text-sm text-muted-foreground">
                            Enable AI-based disease detection
                          </p>
                        </div>
                        <Switch id="disease-detection" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="marketplace">Marketplace</Label>
                          <p className="text-sm text-muted-foreground">
                            Enable marketplace features
                          </p>
                        </div>
                        <Switch id="marketplace" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="forum">Community Forum</Label>
                          <p className="text-sm text-muted-foreground">
                            Enable community forum
                          </p>
                        </div>
                        <Switch id="forum" defaultChecked />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-3">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Settings</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
