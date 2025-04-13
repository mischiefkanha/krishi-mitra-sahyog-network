
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ThumbsUp, ThumbsDown, MessageCircle, Calendar, Tag, Search, Filter, SortDesc, ArrowUpRight, Send } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import VoiceInput from '@/components/VoiceInput';

interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  category: string;
  createdAt: string;
  votes: {
    up: number;
    down: number;
  };
  replies: {
    id: string;
    author: {
      id: string;
      name: string;
      avatar?: string;
    };
    content: string;
    createdAt: string;
    votes: {
      up: number;
      down: number;
    };
  }[];
  views: number;
}

// Mock categories
const categories = [
  { value: 'crop', label: 'Crop' },
  { value: 'soil', label: 'Soil' },
  { value: 'weather', label: 'Weather' },
  { value: 'pests', label: 'Pests & Diseases' },
  { value: 'equipment', label: 'Equipment' },
  { value: 'market', label: 'Market & Pricing' },
  { value: 'general', label: 'General' },
];

// Mock forum data
const mockPosts: ForumPost[] = [
  {
    id: '1',
    title: 'Best time to sow wheat in Maharashtra?',
    content: 'I\'m planning to sow wheat in my field near Pune. With the changing weather patterns, what is the best time to sow wheat now? Has anyone had success with early or late sowing?',
    author: {
      id: 'user1',
      name: 'Rajesh Patil',
      avatar: 'https://i.pravatar.cc/150?u=1'
    },
    category: 'crop',
    createdAt: '2025-03-15T10:30:00Z',
    votes: {
      up: 12,
      down: 2
    },
    replies: [
      {
        id: 'reply1',
        author: {
          id: 'user2',
          name: 'Amit Kumar',
          avatar: 'https://i.pravatar.cc/150?u=2'
        },
        content: 'In Pune area, mid-November to early December is still the best time. I\'ve been sowing around November 20th with good results. Make sure soil moisture is adequate.',
        createdAt: '2025-03-15T11:45:00Z',
        votes: {
          up: 8,
          down: 0
        }
      },
      {
        id: 'reply2',
        author: {
          id: 'user3',
          name: 'Sunil Verma',
          avatar: 'https://i.pravatar.cc/150?u=3'
        },
        content: 'I tried early sowing last year (late October) and had issues with rust disease. Stick to traditional timing for now.',
        createdAt: '2025-03-15T14:20:00Z',
        votes: {
          up: 6,
          down: 1
        }
      }
    ],
    views: 89
  },
  {
    id: '2',
    title: 'Organic solutions for mango tree pests?',
    content: 'My mango trees have some kind of black spots on leaves and fruits. I want to avoid chemical pesticides. Can anyone suggest organic remedies that have worked for them?',
    author: {
      id: 'user4',
      name: 'Priya Sharma',
      avatar: 'https://i.pravatar.cc/150?u=4'
    },
    category: 'pests',
    createdAt: '2025-03-14T09:15:00Z',
    votes: {
      up: 18,
      down: 0
    },
    replies: [
      {
        id: 'reply3',
        author: {
          id: 'user5',
          name: 'Deepak Singh',
          avatar: 'https://i.pravatar.cc/150?u=5'
        },
        content: 'Sounds like anthracnose or powdery mildew. Try neem oil solution (5ml neem oil + few drops of soap in 1L water) sprayed every 7-10 days. Works well for me.',
        createdAt: '2025-03-14T10:05:00Z',
        votes: {
          up: 15,
          down: 0
        }
      }
    ],
    views: 127
  },
  {
    id: '3',
    title: 'How to test soil pH at home?',
    content: 'I need to check soil pH but testing labs are far from my village. Are there reliable ways to test soil pH at home with simple materials?',
    author: {
      id: 'user6',
      name: 'Mohan Rao',
      avatar: 'https://i.pravatar.cc/150?u=6'
    },
    category: 'soil',
    createdAt: '2025-03-13T16:40:00Z',
    votes: {
      up: 25,
      down: 1
    },
    replies: [
      {
        id: 'reply4',
        author: {
          id: 'user7',
          name: 'Dr. Anjali Pawar',
          avatar: 'https://i.pravatar.cc/150?u=7'
        },
        content: 'You can make a simple vinegar/baking soda test. Take two samples of soil. Add vinegar to one - if it fizzes, soil is alkaline. Add baking soda solution to the other - if it fizzes, soil is acidic. No reaction in either means neutral soil. Not precise but gives a general idea.',
        createdAt: '2025-03-13T17:30:00Z',
        votes: {
          up: 32,
          down: 0
        }
      },
      {
        id: 'reply5',
        author: {
          id: 'user8',
          name: 'Vikram Desai',
          avatar: 'https://i.pravatar.cc/150?u=8'
        },
        content: 'You can also buy pH test strips online very cheaply. Mix soil with distilled water, let it settle, then test the water.',
        createdAt: '2025-03-13T18:15:00Z',
        votes: {
          up: 16,
          down: 0
        }
      }
    ],
    views: 205
  }
];

const Forum = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [posts, setPosts] = useState<ForumPost[]>(mockPosts);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [sortMethod, setSortMethod] = useState<string>('newest');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [newQuestionOpen, setNewQuestionOpen] = useState(false);
  const [activePost, setActivePost] = useState<ForumPost | null>(null);
  const [questionForm, setQuestionForm] = useState({
    title: '',
    content: '',
    category: ''
  });
  const [replyText, setReplyText] = useState('');

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setQuestionForm({
      ...questionForm,
      [field]: e.target.value
    });
  };

  const handleVoiceInput = (field: string) => (text: string) => {
    setQuestionForm({
      ...questionForm,
      [field]: text
    });
  };

  const handleReplyVoiceInput = (text: string) => {
    setReplyText(text);
  };

  const handleCategoryChange = (value: string) => {
    setQuestionForm({
      ...questionForm,
      category: value
    });
  };

  const handlePostQuestion = () => {
    // In a real app, this would save to Firestore
    const newPost: ForumPost = {
      id: `post-${Date.now()}`,
      title: questionForm.title,
      content: questionForm.content,
      author: {
        id: user?.id || 'anonymous',
        name: user?.email?.split('@')[0] || 'Anonymous User',
        avatar: undefined
      },
      category: questionForm.category,
      createdAt: new Date().toISOString(),
      votes: {
        up: 0,
        down: 0
      },
      replies: [],
      views: 0
    };
    
    setPosts([newPost, ...posts]);
    setNewQuestionOpen(false);
    setQuestionForm({
      title: '',
      content: '',
      category: ''
    });
    
    toast({
      title: "Question Posted",
      description: "Your question has been posted successfully.",
    });
  };

  const handlePostReply = () => {
    if (!activePost || !replyText.trim()) return;
    
    // In a real app, this would save to Firestore
    const newReply = {
      id: `reply-${Date.now()}`,
      author: {
        id: user?.id || 'anonymous',
        name: user?.email?.split('@')[0] || 'Anonymous User',
        avatar: undefined
      },
      content: replyText,
      createdAt: new Date().toISOString(),
      votes: {
        up: 0,
        down: 0
      }
    };
    
    const updatedPost = {
      ...activePost,
      replies: [...activePost.replies, newReply]
    };
    
    setPosts(posts.map(post => post.id === activePost.id ? updatedPost : post));
    setActivePost(updatedPost);
    setReplyText('');
    
    toast({
      title: "Reply Posted",
      description: "Your reply has been posted successfully.",
    });
  };

  const handleVote = (postId: string, replyId: string | null, voteType: 'up' | 'down') => {
    // In a real app, this would update in Firestore
    setPosts(posts.map(post => {
      if (replyId === null && post.id === postId) {
        // Vote on the main post
        return {
          ...post,
          votes: {
            ...post.votes,
            [voteType]: post.votes[voteType] + 1
          }
        };
      } else if (post.id === postId) {
        // Vote on a reply
        return {
          ...post,
          replies: post.replies.map(reply => {
            if (reply.id === replyId) {
              return {
                ...reply,
                votes: {
                  ...reply.votes,
                  [voteType]: reply.votes[voteType] + 1
                }
              };
            }
            return reply;
          })
        };
      }
      return post;
    }));
    
    // If we're in the post detail view, update activePost too
    if (activePost && activePost.id === postId) {
      if (replyId === null) {
        setActivePost({
          ...activePost,
          votes: {
            ...activePost.votes,
            [voteType]: activePost.votes[voteType] + 1
          }
        });
      } else {
        setActivePost({
          ...activePost,
          replies: activePost.replies.map(reply => {
            if (reply.id === replyId) {
              return {
                ...reply,
                votes: {
                  ...reply.votes,
                  [voteType]: reply.votes[voteType] + 1
                }
              };
            }
            return reply;
          })
        });
      }
    }
  };

  const handleOpenPost = (post: ForumPost) => {
    // In a real app, this would increment view count in Firestore
    const updatedPost = {
      ...post,
      views: post.views + 1
    };
    
    setPosts(posts.map(p => p.id === post.id ? updatedPost : p));
    setActivePost(updatedPost);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Filter and sort posts
  const filteredPosts = posts
    .filter(post => {
      const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
      const matchesSearch = searchQuery === '' || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        post.content.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortMethod === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else if (sortMethod === 'mostVoted') {
        return (b.votes.up - b.votes.down) - (a.votes.up - a.votes.down);
      } else {
        return b.views - a.views;
      }
    });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-primary-900 dark:text-primary-400">{t('communityForum')}</h1>
          <Dialog open={newQuestionOpen} onOpenChange={setNewQuestionOpen}>
            <DialogTrigger asChild>
              <Button>
                {t('askQuestion')}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>{t('askQuestion')}</DialogTitle>
                <DialogDescription>
                  Share your farming questions with the community
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label htmlFor="title" className="flex items-center gap-2 text-sm font-medium">
                    {t('questionTitle')}
                    <VoiceInput onResult={handleVoiceInput('title')} />
                  </label>
                  <Input
                    id="title"
                    value={questionForm.title}
                    onChange={handleInputChange('title')}
                    placeholder="Be specific and clear"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="content" className="flex items-center gap-2 text-sm font-medium">
                    {t('questionDetails')}
                    <VoiceInput onResult={handleVoiceInput('content')} />
                  </label>
                  <Textarea
                    id="content"
                    value={questionForm.content}
                    onChange={handleInputChange('content')}
                    placeholder="Include all relevant details"
                    rows={5}
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">
                    {t('category')}
                  </label>
                  <Select value={questionForm.category} onValueChange={handleCategoryChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button
                  onClick={handlePostQuestion}
                  disabled={!questionForm.title || !questionForm.content || !questionForm.category}
                >
                  {t('postQuestion')}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        {/* Main forum content */}
        <div className="grid grid-cols-1 gap-6">
          {/* If a post is active, show it and its replies */}
          {activePost ? (
            <div className="space-y-6">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setActivePost(null)}
                className="mb-4"
              >
                ← Back to forum
              </Button>
              
              {/* Active post */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{activePost.title}</CardTitle>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5 mr-1" />
                      {formatDate(activePost.createdAt)}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Tag className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                    <span className="text-sm capitalize">
                      {activePost.category}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <AvatarImage src={activePost.author.avatar} />
                      <AvatarFallback>{activePost.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-medium">{activePost.author.name}</div>
                      <div className="mt-2">{activePost.content}</div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <div className="flex items-center gap-4">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleVote(activePost.id, null, 'up')} 
                      className="flex items-center gap-1"
                    >
                      <ThumbsUp className="h-4 w-4" />
                      <span>{activePost.votes.up}</span>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleVote(activePost.id, null, 'down')} 
                      className="flex items-center gap-1"
                    >
                      <ThumbsDown className="h-4 w-4" />
                      <span>{activePost.votes.down}</span>
                    </Button>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      {activePost.replies.length} replies
                    </div>
                    <div>{activePost.views} views</div>
                  </div>
                </CardFooter>
              </Card>
              
              {/* Replies */}
              {activePost.replies.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-medium">{activePost.replies.length} Replies</h3>
                  {activePost.replies.map(reply => (
                    <Card key={reply.id}>
                      <CardContent className="pt-4">
                        <div className="flex items-start gap-4">
                          <Avatar>
                            <AvatarImage src={reply.author.avatar} />
                            <AvatarFallback>{reply.author.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <div className="font-medium">{reply.author.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {formatDate(reply.createdAt)}
                              </div>
                            </div>
                            <div className="mt-2">{reply.content}</div>
                            <div className="mt-4 flex items-center gap-4">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleVote(activePost.id, reply.id, 'up')} 
                                className="flex items-center gap-1"
                              >
                                <ThumbsUp className="h-4 w-4" />
                                <span>{reply.votes.up}</span>
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleVote(activePost.id, reply.id, 'down')} 
                                className="flex items-center gap-1"
                              >
                                <ThumbsDown className="h-4 w-4" />
                                <span>{reply.votes.down}</span>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
              
              {/* Reply form */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{t('yourAnswer')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-2 mb-4">
                    <Textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Write your answer here..."
                      rows={4}
                      className="flex-1"
                    />
                    <VoiceInput 
                      onResult={handleReplyVoiceInput} 
                      className="flex-shrink-0 self-start"
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button 
                    onClick={handlePostReply}
                    disabled={!replyText.trim()}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    {t('postAnswer')}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ) : (
            <>
              {/* Search and filter controls */}
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                  <Input
                    placeholder={t('searchQuestions')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={activeCategory} onValueChange={setActiveCategory}>
                    <SelectTrigger className="w-[160px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder={t('category')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map(category => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={sortMethod} onValueChange={setSortMethod}>
                    <SelectTrigger className="w-[160px]">
                      <SortDesc className="h-4 w-4 mr-2" />
                      <SelectValue placeholder={t('sortBy')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">{t('newest')}</SelectItem>
                      <SelectItem value="mostVoted">{t('mostVoted')}</SelectItem>
                      <SelectItem value="mostViewed">Most Viewed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* Post list */}
              {filteredPosts.length === 0 ? (
                <div className="text-center py-16">
                  <MessageCircle className="h-12 w-12 mx-auto text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">No questions found</h3>
                  <p className="mt-2 text-muted-foreground">
                    Try changing your filters or be the first to ask a question!
                  </p>
                  <Button className="mt-4" onClick={() => setNewQuestionOpen(true)}>
                    {t('askQuestion')}
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredPosts.map(post => (
                    <Card key={post.id} className="cursor-pointer hover:border-primary/50" onClick={() => handleOpenPost(post)}>
                      <CardContent className="pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4">
                          <div>
                            <h3 className="font-medium text-lg">{post.title}</h3>
                            <p className="line-clamp-2 text-sm mt-1 text-muted-foreground">{post.content}</p>
                            <div className="flex items-center gap-3 mt-3">
                              <div className="flex items-center">
                                <Avatar className="h-6 w-6 mr-2">
                                  <AvatarImage src={post.author.avatar} />
                                  <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span className="text-sm">{post.author.name}</span>
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {formatDate(post.createdAt)}
                              </div>
                              <div className="flex items-center">
                                <Tag className="h-3 w-3 mr-1" />
                                <span className="text-xs capitalize">{post.category}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex flex-col items-center px-3 py-1">
                              <div className="text-base font-medium">
                                {post.votes.up - post.votes.down}
                              </div>
                              <div className="text-xs">{t('votes')}</div>
                            </div>
                            <div className="flex flex-col items-center px-3 py-1">
                              <div className="text-base font-medium">
                                {post.replies.length}
                              </div>
                              <div className="text-xs">{t('replies')}</div>
                            </div>
                            <div className="flex flex-col items-center px-3 py-1">
                              <div className="text-base font-medium">
                                {post.views}
                              </div>
                              <div className="text-xs">{t('views')}</div>
                            </div>
                            <Button variant="ghost" size="sm" className="ml-2">
                              <ArrowUpRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Forum;
