
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Camera, FileUpIcon, Save, User } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/context/LanguageContext';

// Define form schema
const profileSchema = z.object({
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address').optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  bio: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const Profile = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('personal');

  // Initialize form
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: user?.email || '',
      phone: '',
      address: '',
      bio: '',
    },
  });

  // Fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      try {
        setIsLoading(true);
        
        // Get profile data from public.profiles table
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
          
        if (error) throw error;
        
        if (data) {
          // Update form with fetched data
          form.reset({
            first_name: data.first_name || '',
            last_name: data.last_name || '',
            email: user.email || '',
            phone: data.phone || '',
            address: data.address || '',
            bio: data.bio || '',
          });
          
          // Set profile image if exists
          if (data.avatar_url) {
            setProfileImage(data.avatar_url);
          }
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast({
          title: 'Error',
          description: 'Failed to load profile data.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [user, form, toast]);

  // Handle form submission
  const onSubmit = async (data: ProfileFormValues) => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          first_name: data.first_name,
          last_name: data.last_name,
          phone: data.phone,
          address: data.address,
          bio: data.bio,
          updated_at: new Date().toISOString(),
        });
        
      if (error) throw error;
      
      toast({
        title: 'Profile updated',
        description: 'Your profile information has been saved successfully.',
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: 'Error',
        description: 'Failed to update profile. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle profile image upload
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!user || !event.target.files || event.target.files.length === 0) return;
    
    try {
      setIsLoading(true);
      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}/avatar.${fileExt}`;
      
      // Upload image to storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });
        
      if (uploadError) throw uploadError;
      
      // Get public URL
      const { data: urlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);
      
      const avatarUrl = urlData.publicUrl;
      
      // Update profile with new avatar URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: avatarUrl })
        .eq('id', user.id);
        
      if (updateError) throw updateError;
      
      setProfileImage(avatarUrl);
      toast({
        title: 'Success',
        description: 'Profile picture updated successfully.',
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: 'Error',
        description: 'Failed to upload profile picture.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Render profile info placeholder if user is loading
  if (!user) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <p>Please log in to view your profile.</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">{t('profile')}</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - User Card */}
          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4 relative">
                <Avatar className="h-24 w-24">
                  {profileImage ? (
                    <AvatarImage src={profileImage} alt="Profile" />
                  ) : (
                    <AvatarFallback className="bg-primary-100 text-primary-800">
                      <User className="h-12 w-12" />
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="absolute bottom-0 right-1/3 bg-primary-600 rounded-full p-1">
                  <label htmlFor="avatar-upload" className="cursor-pointer">
                    <Camera className="h-4 w-4 text-white" />
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
              <CardTitle>{form.watch('first_name')} {form.watch('last_name')}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">Member Since</span>
                  <span>{new Date(user.created_at || '').toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">Email</span>
                  <span>{user.email}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">Phone</span>
                  <span>{form.watch('phone') || 'Not set'}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => setActiveTab('personal')}>
                Edit Profile
              </Button>
            </CardFooter>
          </Card>
          
          {/* Right Column - Tabs */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full mb-4">
                <TabsTrigger value="personal" className="flex-1">{t('personalInfo')}</TabsTrigger>
                <TabsTrigger value="activity" className="flex-1">Activity</TabsTrigger>
                <TabsTrigger value="documents" className="flex-1">Documents</TabsTrigger>
              </TabsList>
              
              {/* Personal Info Tab */}
              <TabsContent value="personal">
                <Card>
                  <CardHeader>
                    <CardTitle>{t('personalInfo')}</CardTitle>
                    <CardDescription>
                      Update your personal information and profile details
                    </CardDescription>
                  </CardHeader>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="first_name">{t('firstName')}</Label>
                          <Input
                            id="first_name"
                            {...form.register('first_name')}
                            placeholder="John"
                          />
                          {form.formState.errors.first_name && (
                            <p className="text-sm text-red-500">
                              {form.formState.errors.first_name.message}
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="last_name">{t('lastName')}</Label>
                          <Input
                            id="last_name"
                            {...form.register('last_name')}
                            placeholder="Doe"
                          />
                          {form.formState.errors.last_name && (
                            <p className="text-sm text-red-500">
                              {form.formState.errors.last_name.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">{t('email')}</Label>
                        <Input
                          id="email"
                          type="email"
                          {...form.register('email')}
                          disabled
                          placeholder="john.doe@example.com"
                        />
                        <p className="text-sm text-muted-foreground">
                          Your email address cannot be changed.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">{t('phone')}</Label>
                        <Input
                          id="phone"
                          {...form.register('phone')}
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">{t('address')}</Label>
                        <Textarea
                          id="address"
                          {...form.register('address')}
                          placeholder="123 Main St, City, Country"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          {...form.register('bio')}
                          placeholder="Tell us about yourself..."
                        />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        type="submit" 
                        disabled={isLoading} 
                        className="ml-auto flex items-center gap-2"
                      >
                        <Save className="h-4 w-4" />
                        {t('saveChanges')}
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>
              
              {/* Activity Tab */}
              <TabsContent value="activity">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>View your recent activities and services</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border-b pb-4">
                        <h3 className="font-medium mb-1">Crop Recommendations</h3>
                        <p className="text-sm text-muted-foreground">
                          You've received {0} crop recommendations in the last 30 days.
                        </p>
                        <Button variant="link" className="px-0" asChild>
                          <a href="/crop-recommendation">Get new crop recommendations</a>
                        </Button>
                      </div>
                      <div className="border-b pb-4">
                        <h3 className="font-medium mb-1">Disease Detections</h3>
                        <p className="text-sm text-muted-foreground">
                          You've performed {0} disease detections in the last 30 days.
                        </p>
                        <Button variant="link" className="px-0" asChild>
                          <a href="/disease-detection">Detect crop diseases</a>
                        </Button>
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Marketplace Activity</h3>
                        <p className="text-sm text-muted-foreground">
                          You have {0} active listings in the marketplace.
                        </p>
                        <Button variant="link" className="px-0" asChild>
                          <a href="/marketplace">Visit marketplace</a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Documents Tab */}
              <TabsContent value="documents">
                <Card>
                  <CardHeader>
                    <CardTitle>Documents & Reports</CardTitle>
                    <CardDescription>Access and download your documents and reports</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <FileUpIcon className="h-6 w-6 text-blue-500" />
                            <div>
                              <h3 className="font-medium">Crop Recommendations Report</h3>
                              <p className="text-sm text-muted-foreground">
                                Summary of all crop recommendations
                              </p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Download
                          </Button>
                        </div>
                      </div>
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <FileUpIcon className="h-6 w-6 text-green-500" />
                            <div>
                              <h3 className="font-medium">Disease Detection History</h3>
                              <p className="text-sm text-muted-foreground">
                                Complete history of disease detections
                              </p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Download
                          </Button>
                        </div>
                      </div>
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <FileUpIcon className="h-6 w-6 text-orange-500" />
                            <div>
                              <h3 className="font-medium">Farming Calendar</h3>
                              <p className="text-sm text-muted-foreground">
                                Personalized farming calendar based on your crops
                              </p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Download
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
