
import { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, LineChart, PieChart, Cell, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Pie } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { ArrowUpRight, Sprout, Bug, ShoppingBag, Clipboard, AlertTriangle } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Sample data for charts
  const cropData = [
    { name: 'Rice', value: 35 },
    { name: 'Wheat', value: 25 },
    { name: 'Cotton', value: 15 },
    { name: 'Sugarcane', value: 25 },
  ];

  const activityData = [
    { month: 'Jan', crops: 4, disease: 2, market: 5 },
    { month: 'Feb', crops: 3, disease: 1, market: 6 },
    { month: 'Mar', crops: 5, disease: 3, market: 7 },
    { month: 'Apr', crops: 6, disease: 2, market: 8 },
    { month: 'May', crops: 8, disease: 4, market: 9 },
    { month: 'Jun', crops: 7, disease: 3, market: 10 },
  ];

  const recentTransactions = [
    { id: 1, item: 'Rice (50kg)', amount: '₹2,500', status: 'Completed', date: '2023-04-01' },
    { id: 2, item: 'Wheat (25kg)', amount: '₹1,200', status: 'Pending', date: '2023-03-29' },
    { id: 3, item: 'Cotton (10kg)', amount: '₹900', status: 'Completed', date: '2023-03-25' },
    { id: 4, item: 'Sugarcane (100kg)', amount: '₹1,800', status: 'Completed', date: '2023-03-20' },
  ];

  const recentAlerts = [
    { id: 1, message: 'Possible pest infestation detected in rice crops', severity: 'High', date: '2023-04-02' },
    { id: 2, message: 'Weather alert: Heavy rainfall expected next week', severity: 'Medium', date: '2023-04-01' },
    { id: 3, message: 'Market price for wheat increased by 5%', severity: 'Low', date: '2023-03-30' },
  ];

  const COLORS = ['#4CAF50', '#2E7D32', '#81C784', '#C8E6C9'];

  const chartConfig = {
    crops: { label: "Crops", color: "#4CAF50" },
    disease: { label: "Disease", color: "#FF9800" },
    market: { label: "Market", color: "#2196F3" }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-primary-900 mb-6">Farmer Dashboard</h1>
        
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 w-full max-w-md mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="crops">Crops</TabsTrigger>
            <TabsTrigger value="market">Market</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Crop Recommendations</CardTitle>
                  <Sprout className="h-4 w-4 text-primary-700" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">+2 from last month</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Disease Detections</CardTitle>
                  <Bug className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8</div>
                  <p className="text-xs text-muted-foreground">+1 from last month</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Market Listings</CardTitle>
                  <ShoppingBag className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5</div>
                  <p className="text-xs text-muted-foreground">+3 from last month</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
                  <Clipboard className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">Same as last month</p>
                </CardContent>
              </Card>
            </div>
            
            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Activity Overview</CardTitle>
                  <CardDescription>Your activities over the last 6 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer className="h-80" config={chartConfig}>
                    <LineChart data={activityData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line type="monotone" dataKey="crops" stroke="#4CAF50" strokeWidth={2} />
                      <Line type="monotone" dataKey="disease" stroke="#FF9800" strokeWidth={2} />
                      <Line type="monotone" dataKey="market" stroke="#2196F3" strokeWidth={2} />
                    </LineChart>
                  </ChartContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Crop Distribution</CardTitle>
                  <CardDescription>Types of crops you've grown</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
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
                </CardContent>
              </Card>
            </div>
            
            {/* Recent Activity Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>Your latest marketplace activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentTransactions.map((tx) => (
                        <TableRow key={tx.id}>
                          <TableCell>{tx.item}</TableCell>
                          <TableCell>{tx.amount}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              tx.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {tx.status}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <a href="/marketplace" className="text-sm text-primary-700 flex items-center">
                    View all transactions
                    <ArrowUpRight className="ml-1 h-4 w-4" />
                  </a>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Alerts & Notifications</CardTitle>
                  <CardDescription>Important updates for your farm</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentAlerts.map((alert) => (
                      <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg border">
                        <AlertTriangle className={`h-5 w-5 flex-shrink-0 ${
                          alert.severity === 'High' ? 'text-red-500' :
                          alert.severity === 'Medium' ? 'text-orange-500' :
                          'text-blue-500'
                        }`} />
                        <div>
                          <p className="text-sm font-medium">{alert.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">{alert.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="crops" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Crop Management</CardTitle>
                <CardDescription>Detailed information about your crops</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-8 text-muted-foreground">
                  Detailed crop management interface will be available soon.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="market" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Market Analytics</CardTitle>
                <CardDescription>Insights on prices and demand</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-8 text-muted-foreground">
                  Market analytics will be available in the next update.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Dashboard;
