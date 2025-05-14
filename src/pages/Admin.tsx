import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { Loader2, User, Tractor, Leaf, MessageSquare, BarChart, Users, Settings, RefreshCw } from 'lucide-react';

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
  const [users, setUsers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [userTypeFilter, setUserTypeFilter] = useState('all');
  const { toast } = useToast();

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
        activeUsers: 0, // Could be calculated based on recent activity
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

  // Fetch users for user management
  const fetchUsers = async () => {
    setLoading(true);
    try {
      let query = supabase.from('profiles').select('*');
      
      if (userTypeFilter !== 'all') {
        query = query.eq('role', userTypeFilter);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: "Error",
        description: "Failed to fetch user data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Update user role
  const updateUserRole = async (userId: string, newRole: 'farmer' | 'expert' | 'admin') => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', userId);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "User role updated successfully",
      });
      
      fetchUsers(); // Refresh user list
    } catch (error) {
      console.error('Error updating user role:', error);
      toast({
        title: "Error",
        description: "Failed to update user role",
        variant: "destructive",
      });
    }
  };

  // Initial data fetch
  useEffect(() => {
    if (activeTab === 'overview') {
      fetchStats();
    } else if (activeTab === 'users') {
      fetchUsers();
    }
  }, [activeTab, userTypeFilter]);

  // Filter users based on search term
  const filteredUsers = users.filter(user => {
    const fullName = `${user.first_name || ''} ${user.last_name || ''}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase()) || 
           (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase()));
  });

  const StatCard = ({ title, value, icon: Icon }: { title: string; value: number; icon: any }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-muted-foreground">Monitor and manage your KrishiMitra platform.</p>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="users">User Management</TabsTrigger>
              <TabsTrigger value="content">Content Moderation</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title="Total Users" value={stats.totalUsers} icon={Users} />
                <StatCard title="Farmers" value={stats.totalFarmers} icon={Tractor} />
                <StatCard title="Experts" value={stats.totalExperts} icon={User} />
                <StatCard title="Active Users" value={stats.activeUsers} icon={Users} />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title="Crop Recommendations" value={stats.cropRecommendations} icon={Leaf} />
                <StatCard title="Disease Detections" value={stats.diseaseDetections} icon={Leaf} />
                <StatCard title="Forum Posts" value={stats.forumPosts} icon={MessageSquare} />
                <StatCard title="Chat Messages" value={stats.chatMessages} icon={MessageSquare} />
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Platform Activity</CardTitle>
                  <CardDescription>Recent activities across the platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Activity chart will be implemented here</p>
                  {/* Add charts or activity logs here */}
                </CardContent>
              </Card>
              
              <div className="flex justify-end">
                <Button 
                  variant="outline" 
                  onClick={() => fetchStats()}
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  Refresh Data
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="users" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>View and manage user accounts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                    <div className="w-full md:w-64">
                      <Label htmlFor="search">Search Users</Label>
                      <Input
                        id="search"
                        placeholder="Search by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    
                    <div className="w-full md:w-auto">
                      <Label htmlFor="filter">Filter by Type</Label>
                      <Select value={userTypeFilter} onValueChange={setUserTypeFilter}>
                        <SelectTrigger className="w-full md:w-[180px]">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Users</SelectItem>
                          <SelectItem value="farmer">Farmers</SelectItem>
                          <SelectItem value="expert">Experts</SelectItem>
                          <SelectItem value="admin">Admins</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Button 
                      variant="outline"
                      onClick={fetchUsers}
                      className="mt-4 md:mt-6"
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Refresh
                    </Button>
                  </div>
                  
                  {loading ? (
                    <div className="flex justify-center items-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : (
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Join Date</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredUsers.length > 0 ? (
                            filteredUsers.map((user) => (
                              <TableRow key={user.id}>
                                <TableCell className="font-medium">
                                  {user.first_name} {user.last_name}
                                </TableCell>
                                <TableCell>{user.email || 'N/A'}</TableCell>
                                <TableCell>
                                  <Select
                                    defaultValue={user.role || 'farmer'}
                                    onValueChange={(value) => updateUserRole(user.id, value as 'farmer' | 'expert' | 'admin')}
                                  >
                                    <SelectTrigger className="w-[120px]">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="farmer">Farmer</SelectItem>
                                      <SelectItem value="expert">Expert</SelectItem>
                                      <SelectItem value="admin">Admin</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </TableCell>
                                <TableCell>{new Date(user.created_at || '').toLocaleDateString()}</TableCell>
                                <TableCell className="text-right">
                                  <Button variant="ghost" size="sm">View Details</Button>
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={5} className="h-24 text-center">
                                No users found.
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="content" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Content Moderation</CardTitle>
                  <CardDescription>Manage platform content</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="news">
                    <TabsList>
                      <TabsTrigger value="news">News Articles</TabsTrigger>
                      <TabsTrigger value="forum">Forum Posts</TabsTrigger>
                      <TabsTrigger value="comments">Comments</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="news" className="py-4">
                      <p>News article moderation interface will be implemented here.</p>
                    </TabsContent>
                    
                    <TabsContent value="forum" className="py-4">
                      <p>Forum post moderation interface will be implemented here.</p>
                    </TabsContent>
                    
                    <TabsContent value="comments" className="py-4">
                      <p>Comment moderation interface will be implemented here.</p>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Settings</CardTitle>
                  <CardDescription>Configure platform settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">General Settings</h3>
                    <p className="text-sm text-muted-foreground">Configure general platform settings.</p>
                    {/* Add settings controls here */}
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium">Feature Toggle</h3>
                    <p className="text-sm text-muted-foreground">Enable or disable platform features.</p>
                    {/* Add feature toggles here */}
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium">API Configurations</h3>
                    <p className="text-sm text-muted-foreground">Manage API keys and integrations.</p>
                    {/* Add API config here */}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
