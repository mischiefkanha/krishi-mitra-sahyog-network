
import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { 
  MessageSquare, 
  ThumbsUp, 
  MessageSquarePlus, 
  Calendar, 
  ArrowUp, 
  ArrowDown, 
  Filter, 
  Search, 
  User, 
  Plus,
  Clock 
} from 'lucide-react';

interface ForumPost {
  id: string;
  title: string;
  content: string;
  category: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  upvotes: number;
  downvotes: number;
  comment_count: number;
  author: {
    first_name: string;
    last_name: string;
    avatar_url: string;
  };
}

interface Comment {
  id: string;
  content: string;
  user_id: string;
  post_id: string;
  created_at: string;
  author: {
    first_name: string;
    last_name: string;
    avatar_url: string;
  };
}

const forumCategories = [
  'Crop Management',
  'Pest Control',
  'Weather Updates',
  'Equipment',
  'Market Prices',
  'Sustainable Farming',
  'Government Schemes',
  'General Discussion',
];

const postFormSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }).max(100, {
    message: "Title cannot exceed 100 characters.",
  }),
  content: z.string().min(20, {
    message: "Content must be at least 20 characters.",
  }),
  category: z.string({
    required_error: "Please select a category.",
  }),
});

type PostFormValues = z.infer<typeof postFormSchema>;

const commentFormSchema = z.object({
  content: z.string().min(5, {
    message: "Comment must be at least 5 characters.",
  }),
});

type CommentFormValues = z.infer<typeof commentFormSchema>;

const Forum = () => {
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<ForumPost | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCommentDialogOpen, setIsCommentDialogOpen] = useState(false);
  
  const { user, profile } = useAuth();
  const { toast } = useToast();

  const postForm = useForm<PostFormValues>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: "",
      content: "",
      category: "",
    },
  });

  const commentForm = useForm<CommentFormValues>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: {
      content: "",
    },
  });

  useEffect(() => {
    fetchPosts();
  }, [sortBy, activeCategory]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      
      let query = supabase
        .from('forum_posts')
        .select(`
          *,
          author:profiles(first_name, last_name, avatar_url)
        `);
      
      if (activeCategory !== 'all') {
        query = query.eq('category', activeCategory);
      }
      
      if (sortBy === 'recent') {
        query = query.order('created_at', { ascending: false });
      } else if (sortBy === 'popular') {
        query = query.order('upvotes', { ascending: false });
      } else if (sortBy === 'comments') {
        query = query.order('comment_count', { ascending: false });
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      if (data) {
        setPosts(data as ForumPost[]);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast({
        title: "Failed to fetch posts",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async (postId: string) => {
    try {
      setLoadingComments(true);
      
      const { data, error } = await supabase
        .from('forum_comments')
        .select(`
          *,
          author:profiles(first_name, last_name, avatar_url)
        `)
        .eq('post_id', postId)
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      
      if (data) {
        setComments(data as Comment[]);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
      toast({
        title: "Failed to fetch comments",
        variant: "destructive",
      });
    } finally {
      setLoadingComments(false);
    }
  };

  const viewPost = (post: ForumPost) => {
    setSelectedPost(post);
    fetchComments(post.id);
  };

  const createPost = async (data: PostFormValues) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please login to create a post",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const { error } = await supabase
        .from('forum_posts')
        .insert({
          title: data.title,
          content: data.content,
          category: data.category,
          user_id: user.id,
        });
      
      if (error) throw error;
      
      toast({
        title: "Post Created",
        description: "Your post has been published successfully",
      });
      
      postForm.reset();
      fetchPosts();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create post",
        variant: "destructive",
      });
    }
  };

  const createComment = async (data: CommentFormValues) => {
    if (!user || !selectedPost) return;
    
    try {
      const { error } = await supabase
        .from('forum_comments')
        .insert({
          content: data.content,
          user_id: user.id,
          post_id: selectedPost.id,
        });
      
      if (error) throw error;
      
      // Update comment count in the post
      const { error: updateError } = await supabase
        .from('forum_posts')
        .update({ comment_count: selectedPost.comment_count + 1 })
        .eq('id', selectedPost.id);
        
      if (updateError) throw updateError;
      
      toast({
        title: "Comment Added",
        description: "Your comment has been added successfully",
      });
      
      commentForm.reset();
      setIsCommentDialogOpen(false);
      fetchComments(selectedPost.id);
      
      // Update the local post object
      setSelectedPost({
        ...selectedPost,
        comment_count: selectedPost.comment_count + 1,
      });
      
      // Update the posts list
      setPosts(prev => prev.map(post => 
        post.id === selectedPost.id 
          ? { ...post, comment_count: post.comment_count + 1 } 
          : post
      ));
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to add comment",
        variant: "destructive",
      });
    }
  };

  const handleVote = async (postId: string, voteType: 'up' | 'down') => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please login to vote",
        variant: "destructive",
      });
      return;
    }
    
    try {
      // Check if user already voted on this post
      const { data: existingVote, error: voteCheckError } = await supabase
        .from('forum_votes')
        .select('*')
        .eq('user_id', user.id)
        .eq('post_id', postId)
        .single();
      
      if (voteCheckError && voteCheckError.code !== 'PGRST116') {
        // PGRST116 is "no rows returned" which is expected if no vote exists
        throw voteCheckError;
      }
      
      // Get current post state
      const currentPost = posts.find(p => p.id === postId);
      if (!currentPost) return;
      
      let newUpvotes = currentPost.upvotes;
      let newDownvotes = currentPost.downvotes;
      
      // Handle voting logic
      if (existingVote) {
        // User already voted, check if they're changing their vote
        if (existingVote.vote_type === voteType) {
          // Remove vote
          await supabase
            .from('forum_votes')
            .delete()
            .eq('id', existingVote.id);
          
          if (voteType === 'up') {
            newUpvotes = Math.max(0, newUpvotes - 1);
          } else {
            newDownvotes = Math.max(0, newDownvotes - 1);
          }
        } else {
          // Change vote type
          await supabase
            .from('forum_votes')
            .update({ vote_type: voteType })
            .eq('id', existingVote.id);
          
          if (voteType === 'up') {
            newUpvotes += 1;
            newDownvotes = Math.max(0, newDownvotes - 1);
          } else {
            newDownvotes += 1;
            newUpvotes = Math.max(0, newUpvotes - 1);
          }
        }
      } else {
        // New vote
        await supabase
          .from('forum_votes')
          .insert({
            user_id: user.id,
            post_id: postId,
            vote_type: voteType,
          });
        
        if (voteType === 'up') {
          newUpvotes += 1;
        } else {
          newDownvotes += 1;
        }
      }
      
      // Update post vote counts in database
      const { error: updateError } = await supabase
        .from('forum_posts')
        .update({
          upvotes: newUpvotes,
          downvotes: newDownvotes,
        })
        .eq('id', postId);
      
      if (updateError) throw updateError;
      
      // Update UI
      setPosts(prev => prev.map(post =>
        post.id === postId
          ? { ...post, upvotes: newUpvotes, downvotes: newDownvotes }
          : post
      ));
      
      if (selectedPost?.id === postId) {
        setSelectedPost({
          ...selectedPost,
          upvotes: newUpvotes,
          downvotes: newDownvotes,
        });
      }
      
    } catch (error) {
      console.error('Error handling vote:', error);
      toast({
        title: "Voting Failed",
        description: "There was an error processing your vote",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return 'just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    }
  };

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getInitials = (firstName?: string, lastName?: string) => {
    if (!firstName && !lastName) return 'U';
    return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase();
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Farmer Community Forum</h1>
            <p className="text-gray-600">Join discussions, ask questions, and share your farming knowledge</p>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-primary-600 hover:bg-primary-700">
                <Plus className="mr-2 h-4 w-4" />
                Create Post
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Create New Post</DialogTitle>
                <DialogDescription>
                  Share your ideas, questions, or experiences with the farming community.
                </DialogDescription>
              </DialogHeader>
              
              <Form {...postForm}>
                <form onSubmit={postForm.handleSubmit(createPost)} className="space-y-4">
                  <FormField
                    control={postForm.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter a descriptive title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={postForm.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <FormControl>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                              {forumCategories.map((category) => (
                                <SelectItem key={category} value={category}>
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={postForm.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Content</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Write your post here..." 
                            rows={5} 
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <DialogFooter>
                    <Button type="submit" className="w-full md:w-auto">
                      Publish Post
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
              <div className="p-4 border-b flex flex-wrap gap-4 items-center justify-between">
                <div className="relative flex-grow max-w-md">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                  <Input 
                    className="pl-10" 
                    placeholder="Search discussions..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    <Filter className="mr-2 h-4 w-4 text-gray-500" />
                    <Select onValueChange={setSortBy} defaultValue={sortBy}>
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="recent">Most Recent</SelectItem>
                        <SelectItem value="popular">Most Upvoted</SelectItem>
                        <SelectItem value="comments">Most Comments</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
                <div className="p-2 border-b overflow-x-auto">
                  <TabsList className="h-9">
                    <TabsTrigger value="all" className="h-8">All</TabsTrigger>
                    {forumCategories.map((category) => (
                      <TabsTrigger key={category} value={category} className="h-8">
                        {category}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>
                
                <TabsContent value={activeCategory} className="p-4">
                  {loading ? (
                    <div className="space-y-4">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <Card key={i} className="bg-gray-50 dark:bg-gray-800 border">
                          <CardHeader className="pb-2">
                            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                          </CardHeader>
                          <CardContent className="pb-2">
                            <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                          </CardContent>
                          <CardFooter>
                            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  ) : filteredPosts.length > 0 ? (
                    <div className="space-y-4">
                      {filteredPosts.map((post) => (
                        <Card 
                          key={post.id} 
                          className="hover:border-primary-200 dark:hover:border-primary-800 transition-colors cursor-pointer"
                          onClick={() => viewPost(post)}
                        >
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle className="text-lg hover:text-primary-600 transition-colors">
                                  {post.title}
                                </CardTitle>
                                <CardDescription>
                                  <div className="flex items-center gap-1 mt-1">
                                    <Badge variant="outline">{post.category}</Badge>
                                    <span className="text-xs text-gray-500 flex items-center">
                                      <Clock className="h-3 w-3 mr-1" />
                                      {formatDate(post.created_at)}
                                    </span>
                                  </div>
                                </CardDescription>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="pb-2">
                            <p className="line-clamp-2 text-gray-700 dark:text-gray-300">
                              {post.content}
                            </p>
                          </CardContent>
                          <CardFooter>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                              <div className="flex items-center">
                                <Avatar className="h-6 w-6 mr-2">
                                  <AvatarImage src={post.author?.avatar_url} />
                                  <AvatarFallback>
                                    {getInitials(post.author?.first_name, post.author?.last_name)}
                                  </AvatarFallback>
                                </Avatar>
                                <span>
                                  {post.author?.first_name} {post.author?.last_name}
                                </span>
                              </div>
                              <div className="flex items-center">
                                <MessageSquare className="h-4 w-4 mr-1" />
                                {post.comment_count}
                              </div>
                              <div className="flex items-center">
                                <ThumbsUp className="h-4 w-4 mr-1" />
                                {post.upvotes}
                              </div>
                            </div>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <MessageSquare className="h-12 w-12 mx-auto text-gray-400" />
                      <h3 className="mt-2 text-lg font-medium">No discussions yet</h3>
                      <p className="text-gray-500 mt-1">Start the conversation by creating a new post</p>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="mt-4">
                            <Plus className="mr-2 h-4 w-4" />
                            Create Post
                          </Button>
                        </DialogTrigger>
                        {/* Dialog content is the same as above */}
                      </Dialog>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
          
          <div className="lg:col-span-4 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Community Guidelines</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>Be respectful and considerate to other members</li>
                  <li>Share verified information and reliable resources</li>
                  <li>Keep discussions relevant to farming and agriculture</li>
                  <li>Provide constructive feedback and solutions</li>
                  <li>Avoid promotional content and spam</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Active Discussions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {posts.slice(0, 5).map((post) => (
                    <div 
                      key={post.id}
                      className="pb-2 border-b last:border-0 cursor-pointer hover:text-primary-600"
                      onClick={() => viewPost(post)}
                    >
                      <p className="font-medium line-clamp-1">{post.title}</p>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>{formatDate(post.created_at)}</span>
                        <span>{post.comment_count} comments</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Post Details Dialog */}
      <Dialog open={!!selectedPost} onOpenChange={(open) => !open && setSelectedPost(null)}>
        <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedPost && (
            <>
              <DialogHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <DialogTitle className="text-xl">{selectedPost.title}</DialogTitle>
                    <DialogDescription className="flex items-center gap-2 mt-1">
                      <Badge variant="outline">{selectedPost.category}</Badge>
                      <span className="text-xs flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {formatDate(selectedPost.created_at)}
                      </span>
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              
              <div className="border-b border-gray-200 dark:border-gray-700 py-4">
                <div className="flex items-start">
                  <Avatar className="h-10 w-10 mr-4">
                    <AvatarImage src={selectedPost.author?.avatar_url} />
                    <AvatarFallback>
                      {getInitials(selectedPost.author?.first_name, selectedPost.author?.last_name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">
                      {selectedPost.author?.first_name} {selectedPost.author?.last_name}
                    </p>
                    <p className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 mt-2">
                      {selectedPost.content}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center mt-4 space-x-3">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleVote(selectedPost.id, 'up')}
                    className={user ? 'cursor-pointer' : 'cursor-not-allowed'}
                  >
                    <ArrowUp className="h-4 w-4 mr-1" />
                    {selectedPost.upvotes}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleVote(selectedPost.id, 'down')}
                    className={user ? 'cursor-pointer' : 'cursor-not-allowed'}
                  >
                    <ArrowDown className="h-4 w-4 mr-1" />
                    {selectedPost.downvotes}
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">
                    {selectedPost.comment_count} {selectedPost.comment_count === 1 ? 'Comment' : 'Comments'}
                  </h3>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setIsCommentDialogOpen(true)}
                    disabled={!user}
                  >
                    <MessageSquarePlus className="h-4 w-4 mr-2" />
                    Add Comment
                  </Button>
                </div>
                
                {loadingComments ? (
                  <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="flex items-start space-x-4">
                        <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                          <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : comments.length > 0 ? (
                  <div className="space-y-4">
                    {comments.map((comment) => (
                      <div key={comment.id} className="border-t pt-4 first:border-0 first:pt-0">
                        <div className="flex items-start">
                          <Avatar className="h-8 w-8 mr-3">
                            <AvatarImage src={comment.author?.avatar_url} />
                            <AvatarFallback>
                              {getInitials(comment.author?.first_name, comment.author?.last_name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center">
                              <p className="font-medium">
                                {comment.author?.first_name} {comment.author?.last_name}
                              </p>
                              <span className="text-xs text-gray-500 ml-2">
                                {formatDate(comment.created_at)}
                              </span>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 mt-1">
                              {comment.content}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <MessageSquare className="h-10 w-10 mx-auto text-gray-400" />
                    <p className="text-gray-500 mt-2">No comments yet. Be the first to comment!</p>
                  </div>
                )}
              </div>
              
              {/* Comment Dialog */}
              <Dialog open={isCommentDialogOpen} onOpenChange={setIsCommentDialogOpen}>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add a Comment</DialogTitle>
                    <DialogDescription>
                      Share your thoughts about this discussion
                    </DialogDescription>
                  </DialogHeader>
                  
                  <Form {...commentForm}>
                    <form onSubmit={commentForm.handleSubmit(createComment)} className="space-y-4">
                      <FormField
                        control={commentForm.control}
                        name="content"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Textarea 
                                placeholder="Write your comment here..." 
                                rows={4} 
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <DialogFooter>
                        <Button type="submit">
                          Post Comment
                        </Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Forum;
