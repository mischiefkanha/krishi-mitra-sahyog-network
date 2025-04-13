
import { useState, useRef } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { DialogHeader, DialogFooter } from '@/components/ui/dialog';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { Play, Upload, Video, Clock, CalendarDays, UserCircle2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import VoiceInput from '@/components/VoiceInput';

// Mock data for tutorials (in a real app, this would come from Firebase)
const mockTutorials = [
  {
    id: '1',
    title: 'Organic Pest Control Techniques',
    description: 'Learn how to control pests naturally without chemicals',
    category: 'organicFarming',
    thumbnailUrl: 'https://images.unsplash.com/photo-1592982537447-7440770faee9?q=80&w=400&h=225&auto=format&fit=crop',
    videoUrl: 'https://example.com/video1.mp4',
    author: 'Rajesh Kumar',
    views: 1245,
    createdAt: '2025-03-12T10:30:00Z',
    duration: '8:30'
  },
  {
    id: '2',
    title: 'Identifying Common Plant Diseases',
    description: 'Visual guide to spotting diseases early',
    category: 'diseasePrevention',
    thumbnailUrl: 'https://images.unsplash.com/photo-1547989453-11e67ffb3885?q=80&w=400&h=225&auto=format&fit=crop',
    videoUrl: 'https://example.com/video2.mp4',
    author: 'Priya Sharma',
    views: 987,
    createdAt: '2025-03-10T14:20:00Z',
    duration: '12:45'
  },
  {
    id: '3',
    title: 'Water Conservation in Rice Fields',
    description: 'How to reduce water usage while maintaining crop yield',
    category: 'waterManagement',
    thumbnailUrl: 'https://images.unsplash.com/photo-1626016752955-31abe4c95800?q=80&w=400&h=225&auto=format&fit=crop',
    videoUrl: 'https://example.com/video3.mp4',
    author: 'Sunil Verma',
    views: 756,
    createdAt: '2025-03-05T09:15:00Z',
    duration: '15:20'
  },
  {
    id: '4',
    title: 'Improving Soil Health with Cover Crops',
    description: 'Using companion plants to restore nutrients',
    category: 'soilHealth',
    thumbnailUrl: 'https://images.unsplash.com/photo-1599517868503-aa61842f7b5d?q=80&w=400&h=225&auto=format&fit=crop',
    videoUrl: 'https://example.com/video4.mp4',
    author: 'Anita Desai',
    views: 632,
    createdAt: '2025-02-28T16:45:00Z',
    duration: '10:15'
  },
  {
    id: '5',
    title: 'Proper Use of Tractor Implements',
    description: 'Safety and efficiency with farm equipment',
    category: 'farmEquipment',
    thumbnailUrl: 'https://images.unsplash.com/photo-1591376506758-3ebf630d6077?q=80&w=400&h=225&auto=format&fit=crop',
    videoUrl: 'https://example.com/video5.mp4',
    author: 'Vijay Patel',
    views: 894,
    createdAt: '2025-02-20T11:30:00Z',
    duration: '18:50'
  },
  {
    id: '6',
    title: 'Natural Fertilizers for Vegetable Gardens',
    description: 'Create your own organic fertilizers at home',
    category: 'organicFarming',
    thumbnailUrl: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=400&h=225&auto=format&fit=crop',
    videoUrl: 'https://example.com/video6.mp4',
    author: 'Meena Gupta',
    views: 1076,
    createdAt: '2025-02-15T13:20:00Z',
    duration: '9:40'
  }
];

const categories = [
  { id: 'cropCare', label: 'cropCare' },
  { id: 'diseasePrevention', label: 'diseasePrevention' },
  { id: 'organicFarming', label: 'organicFarming' },
  { id: 'waterManagement', label: 'waterManagement' },
  { id: 'soilHealth', label: 'soilHealth' },
  { id: 'farmEquipment', label: 'farmEquipment' },
];

const Tutorials = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isUploading, setIsUploading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    title: '',
    description: '',
    category: '',
    video: null as File | null
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle form input changes
  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUploadForm({
      ...uploadForm,
      [field]: e.target.value
    });
  };

  // Handle voice input result
  const handleVoiceInput = (field: string) => (text: string) => {
    setUploadForm({
      ...uploadForm,
      [field]: text
    });
  };

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadForm({
        ...uploadForm,
        video: e.target.files[0]
      });
    }
  };

  // Handle category change
  const handleCategoryChange = (value: string) => {
    setUploadForm({
      ...uploadForm,
      category: value
    });
  };

  // Handle upload form submission
  const handleUpload = () => {
    setIsUploading(true);
    
    // For demo purposes, simulate upload delay
    setTimeout(() => {
      toast({
        title: "Upload Success",
        description: "Your tutorial has been uploaded successfully.",
      });
      
      setIsUploading(false);
      setDialogOpen(false);
      setUploadForm({
        title: '',
        description: '',
        category: '',
        video: null
      });
      
      // In a real app, this is where you'd upload to Firebase Storage
      // const storageRef = ref(storage, `tutorials/${Date.now()}_${uploadForm.video.name}`);
      // uploadBytes(storageRef, uploadForm.video)
      //   .then((snapshot) => getDownloadURL(snapshot.ref))
      //   .then((url) => {
      //     // Save tutorial metadata to Firestore
      //     return addDoc(collection(db, 'tutorials'), {
      //       title: uploadForm.title,
      //       description: uploadForm.description,
      //       category: uploadForm.category,
      //       videoUrl: url,
      //       thumbnailUrl: generateThumbnail(url),
      //       author: user.displayName,
      //       authorId: user.uid,
      //       views: 0,
      //       createdAt: serverTimestamp(),
      //       duration: '0:00' // Would be calculated from the actual video
      //     });
      //   })
      //   .then(() => {
      //     toast({
      //       title: "Upload Success",
      //       description: "Your tutorial has been uploaded successfully.",
      //     });
      //     setIsUploading(false);
      //     setDialogOpen(false);
      //   })
      //   .catch((error) => {
      //     console.error("Error uploading tutorial:", error);
      //     toast({
      //       title: "Upload Failed",
      //       description: "There was a problem uploading your tutorial.",
      //       variant: "destructive"
      //     });
      //     setIsUploading(false);
      //   });
    }, 2000);
  };

  // Filter tutorials based on active category
  const filteredTutorials = activeCategory === 'all' 
    ? mockTutorials 
    : mockTutorials.filter(tutorial => tutorial.category === activeCategory);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-primary-900 dark:text-primary-400">{t('tutorialsTitle')}</h1>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Upload className="h-4 w-4 mr-2" />
                {t('uploadTutorial')}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{t('uploadTutorial')}</DialogTitle>
                <DialogDescription>
                  Share your farming knowledge with the community
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label htmlFor="title" className="flex items-center gap-2 text-sm font-medium">
                    {t('tutorialTitle')}
                    <VoiceInput onResult={handleVoiceInput('title')} />
                  </label>
                  <Input 
                    id="title"
                    value={uploadForm.title}
                    onChange={handleInputChange('title')} 
                    placeholder="Enter a descriptive title"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="description" className="flex items-center gap-2 text-sm font-medium">
                    {t('tutorialDescription')}
                    <VoiceInput onResult={handleVoiceInput('description')} />
                  </label>
                  <Textarea 
                    id="description"
                    value={uploadForm.description}
                    onChange={handleInputChange('description')} 
                    placeholder="Explain what this tutorial is about"
                    rows={3} 
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">
                    {t('tutorialCategory')}
                  </label>
                  <Select value={uploadForm.category} onValueChange={handleCategoryChange}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('category')} />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category.id} value={category.id}>
                          {t(category.label)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">
                    {t('tutorialVideo')}
                  </label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="video/*"
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full"
                    >
                      <Video className="h-4 w-4 mr-2" />
                      {uploadForm.video ? uploadForm.video.name : t('tutorialVideo')}
                    </Button>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button 
                  type="submit" 
                  onClick={handleUpload}
                  disabled={isUploading || !uploadForm.title || !uploadForm.description || !uploadForm.category || !uploadForm.video}
                >
                  {isUploading ? (
                    <>
                      <Skeleton className="h-4 w-4 mr-2 rounded-full animate-spin" />
                      {t('uploading')}
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      {t('upload')}
                    </>
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Category tabs */}
        <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory} className="w-full mb-6">
          <TabsList className="flex overflow-x-auto pb-2 mb-2 max-w-full">
            <TabsTrigger value="all">All</TabsTrigger>
            {categories.map(category => (
              <TabsTrigger key={category.id} value={category.id}>
                {t(category.label)}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value={activeCategory} className="mt-4">
            {filteredTutorials.length === 0 ? (
              <div className="text-center py-8">
                <Video className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium">No tutorials found</h3>
                <p className="mt-2 text-gray-500">
                  There are no tutorials in this category yet.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTutorials.map(tutorial => (
                  <Card key={tutorial.id} className="overflow-hidden">
                    <div className="relative aspect-video overflow-hidden">
                      <img 
                        src={tutorial.thumbnailUrl} 
                        alt={tutorial.title}
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <Button variant="outline" size="sm" className="text-white border-white hover:bg-white/20 hover:text-white">
                          <Play className="h-4 w-4 mr-1" />
                          Play
                        </Button>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                        {tutorial.duration}
                      </div>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{tutorial.title}</CardTitle>
                      <CardDescription className="line-clamp-2">
                        {tutorial.description}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="flex justify-between items-center text-sm text-muted-foreground pt-0">
                      <div className="flex items-center">
                        <UserCircle2 className="h-3 w-3 mr-1" />
                        {tutorial.author}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {new Date(tutorial.createdAt).toLocaleDateString()}
                        </span>
                        <span>{tutorial.views} views</span>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Tutorials;
