
import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { useTranslation } from '@/context/LanguageContext';
import { generateCropRecommendationReport, generateDiseaseDetectionReport, generateActivityReport } from '@/utils/pdfGenerator';
import { Download, UserCircle, Save, Camera } from 'lucide-react';

interface ProfileFormData {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  bio: string;
  avatarUrl: string | null;
}

interface ProfileData {
  id: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  address: string | null;
  bio: string | null;
  avatar_url: string | null;
}

const Profile = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const { toast } = useToast();
  
  const [isLoading, setIsLoading] = useState(false);
  const [cropData, setCropData] = useState<any[]>([]);
  const [diseaseData, setDiseaseData] = useState<any[]>([]);
  const [formData, setFormData] = useState<ProfileFormData>({
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    bio: '',
    avatarUrl: null
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchProfileData();
      fetchUserActivity();
    }
  }, [user]);

  const fetchProfileData = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error) throw error;
      
      if (data) {
        const profileData = data as ProfileData;
        setFormData({
          firstName: profileData.first_name || '',
          lastName: profileData.last_name || '',
          phone: profileData.phone || '',
          address: profileData.address || '',
          bio: profileData.bio || '',
          avatarUrl: profileData.avatar_url
        });
        
        if (profileData.avatar_url) {
          setPreviewUrl(profileData.avatar_url);
        }
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchUserActivity = async () => {
    if (!user) return;
    
    try {
      // Fetch crop recommendations
      const { data: cropRecommendations } = await supabase
        .from('crop_recommendations')
        .select('*')
        .eq('user_id', user.id)
        .order('timestamp', { ascending: false });
      
      // Fetch disease detections
      const { data: diseaseDetections } = await supabase
        .from('disease_detections')
        .select('*')
        .eq('user_id', user.id)
        .order('timestamp', { ascending: false });
      
      if (cropRecommendations) setCropData(cropRecommendations);
      if (diseaseDetections) setDiseaseData(diseaseDetections);
      
    } catch (error) {
      console.error('Error fetching user activity:', error);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const saveProfile = async () => {
    if (!user) return;
    
    setIsLoading(true);
    
    try {
      let avatarUrl = formData.avatarUrl;
      
      // Upload new avatar if selected
      if (avatarFile) {
        const fileExt = avatarFile.name.split('.').pop();
        const fileName = `${user.id}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        
        const { error: uploadError, data } = await supabase.storage
          .from('avatars')
          .upload(fileName, avatarFile);
        
        if (uploadError) throw uploadError;
        
        // Get public URL
        const { data: publicUrlData } = supabase.storage
          .from('avatars')
          .getPublicUrl(fileName);
          
        avatarUrl = publicUrlData.publicUrl;
      }
      
      // Update profile data
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone: formData.phone,
          address: formData.address,
          bio: formData.bio,
          avatar_url: avatarUrl,
          updated_at: new Date().toISOString()
        });
      
      if (error) throw error;
      
      toast({
        title: t('Profile Updated'),
        description: t('Your profile has been successfully updated.'),
      });
      
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: t('Update Failed'),
        description: t('There was a problem updating your profile.'),
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generateReport = async (reportType: 'crop' | 'disease' | 'all') => {
    try {
      if (reportType === 'crop') {
        await generateCropRecommendationReport(cropData);
        toast({
          title: t('Report Generated'),
          description: t('Crop recommendation report has been downloaded.'),
        });
      } else if (reportType === 'disease') {
        await generateDiseaseDetectionReport(diseaseData);
        toast({
          title: t('Report Generated'),
          description: t('Disease detection report has been downloaded.'),
        });
      } else {
        await generateActivityReport(cropData, diseaseData);
        toast({
          title: t('Report Generated'),
          description: t('Activity report has been downloaded.'),
        });
      }
    } catch (error) {
      console.error('Error generating report:', error);
      toast({
        title: t('Report Generation Failed'),
        description: t('There was a problem generating your report.'),
        variant: 'destructive',
      });
    }
  };

  if (!user) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <p>{t('Please log in to view your profile.')}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">{t('My Profile')}</h1>
        
        <Tabs defaultValue="profile" className="w-full">
          <TabsList>
            <TabsTrigger value="profile">{t('Profile Information')}</TabsTrigger>
            <TabsTrigger value="activity">{t('My Activity')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('Personal Information')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3 flex flex-col items-center space-y-4">
                    <Avatar className="w-32 h-32">
                      <AvatarImage src={previewUrl || ''} />
                      <AvatarFallback>
                        <UserCircle className="w-20 h-20" />
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex items-center gap-2">
                      <label htmlFor="avatar-upload" className="cursor-pointer">
                        <div className="flex items-center gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-9 px-4 py-2 rounded-md text-sm font-medium">
                          <Camera className="w-4 h-4" />
                          {t('Change Photo')}
                        </div>
                        <input
                          id="avatar-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleAvatarChange}
                        />
                      </label>
                    </div>
                    
                    <div className="text-sm text-gray-500">
                      {user.email}
                    </div>
                  </div>
                  
                  <div className="md:w-2/3 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">{t('First Name')}</Label>
                        <Input 
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleFormChange}
                          placeholder={t('Enter your first name')}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="lastName">{t('Last Name')}</Label>
                        <Input 
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleFormChange}
                          placeholder={t('Enter your last name')}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">{t('Phone Number')}</Label>
                      <Input 
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleFormChange}
                        placeholder={t('Enter your phone number')}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address">{t('Address')}</Label>
                      <Input 
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleFormChange}
                        placeholder={t('Enter your address')}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bio">{t('Bio')}</Label>
                      <Textarea 
                        id="bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleFormChange}
                        placeholder={t('Tell us a little about yourself')}
                        rows={4}
                      />
                    </div>
                    
                    <Button 
                      onClick={saveProfile} 
                      disabled={isLoading}
                      className="mt-4"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {isLoading ? t('Saving...') : t('Save Profile')}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="activity" className="space-y-6">
            <div className="flex flex-wrap gap-4 mb-6">
              <Button variant="outline" onClick={() => generateReport('crop')}>
                <Download className="w-4 h-4 mr-2" />
                {t('Download Crop Recommendations')}
              </Button>
              
              <Button variant="outline" onClick={() => generateReport('disease')}>
                <Download className="w-4 h-4 mr-2" />
                {t('Download Disease Detections')}
              </Button>
              
              <Button variant="outline" onClick={() => generateReport('all')}>
                <Download className="w-4 h-4 mr-2" />
                {t('Download Complete Activity')}
              </Button>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>{t('Recent Crop Recommendations')}</CardTitle>
              </CardHeader>
              <CardContent>
                {cropData.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{t('Date')}</TableHead>
                        <TableHead>{t('Crop')}</TableHead>
                        <TableHead>{t('Soil Type')}</TableHead>
                        <TableHead>{t('Confidence')}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cropData.slice(0, 5).map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            {new Date(item.timestamp).toLocaleDateString()}
                          </TableCell>
                          <TableCell>{item.recommended_crop}</TableCell>
                          <TableCell>{item.soil_type}</TableCell>
                          <TableCell>
                            {item.confidence ? `${(item.confidence * 100).toFixed(0)}%` : 'N/A'}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <p className="text-center py-4">{t('No crop recommendations found.')}</p>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>{t('Recent Disease Detections')}</CardTitle>
              </CardHeader>
              <CardContent>
                {diseaseData.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{t('Date')}</TableHead>
                        <TableHead>{t('Disease')}</TableHead>
                        <TableHead>{t('Confidence')}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {diseaseData.slice(0, 5).map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            {new Date(item.timestamp).toLocaleDateString()}
                          </TableCell>
                          <TableCell>{item.disease_name}</TableCell>
                          <TableCell>
                            {item.confidence ? `${(item.confidence * 100).toFixed(0)}%` : 'N/A'}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <p className="text-center py-4">{t('No disease detections found.')}</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Profile;
