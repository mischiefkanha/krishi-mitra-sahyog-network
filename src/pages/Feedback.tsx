
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { MessageSquare, Send } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/context/LanguageContext';

// Define form schema
const feedbackSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  category: z.enum(['suggestion', 'bug', 'question', 'other'], {
    required_error: 'Please select a category',
  }),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FeedbackFormValues = z.infer<typeof feedbackSchema>;

const Feedback = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form
  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      name: user ? `${user.user_metadata.first_name || ''} ${user.user_metadata.last_name || ''}` : '',
      email: user?.email || '',
      category: 'suggestion',
      message: '',
    },
  });

  // Handle form submission
  const onSubmit = async (data: FeedbackFormValues) => {
    try {
      setIsSubmitting(true);
      
      // Submit feedback to Supabase or an edge function
      const { error } = await supabase.functions.invoke('submit-feedback', {
        body: {
          name: data.name,
          email: data.email,
          category: data.category,
          message: data.message,
          user_id: user?.id || null
        }
      });
      
      if (error) throw error;
      
      toast({
        title: t('feedbackSuccess'),
        description: 'We appreciate your input and will review it promptly.',
      });
      
      form.reset({
        name: user ? `${user.user_metadata.first_name || ''} ${user.user_metadata.last_name || ''}` : '',
        email: user?.email || '',
        category: 'suggestion',
        message: '',
      });
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast({
        title: 'Error',
        description: 'Failed to submit feedback. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-6 w-6 text-primary-700" />
                <CardTitle>{t('feedbackLabel')}</CardTitle>
              </div>
              <CardDescription>
                Share your thoughts, suggestions, or report issues. We appreciate your feedback!
              </CardDescription>
            </CardHeader>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t('feedbackName')}</Label>
                    <Input
                      id="name"
                      {...form.register('name')}
                      placeholder="John Doe"
                    />
                    {form.formState.errors.name && (
                      <p className="text-sm text-red-500">
                        {form.formState.errors.name.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{t('feedbackEmail')}</Label>
                    <Input
                      id="email"
                      type="email"
                      {...form.register('email')}
                      placeholder="john.doe@example.com"
                      defaultValue={user?.email || ''}
                      readOnly={!!user}
                    />
                    {form.formState.errors.email && (
                      <p className="text-sm text-red-500">
                        {form.formState.errors.email.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>{t('feedbackCategory')}</Label>
                  <RadioGroup
                    defaultValue="suggestion"
                    className="flex flex-col space-y-1"
                    {...form.register('category')}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="suggestion" id="suggestion" />
                      <Label htmlFor="suggestion" className="cursor-pointer">Suggestion</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="bug" id="bug" />
                      <Label htmlFor="bug" className="cursor-pointer">Bug Report</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="question" id="question" />
                      <Label htmlFor="question" className="cursor-pointer">Question</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="other" />
                      <Label htmlFor="other" className="cursor-pointer">Other</Label>
                    </div>
                  </RadioGroup>
                  {form.formState.errors.category && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.category.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">{t('feedbackMessage')}</Label>
                  <Textarea
                    id="message"
                    {...form.register('message')}
                    placeholder="Share your thoughts, ideas, or report an issue..."
                    className="min-h-32"
                  />
                  {form.formState.errors.message && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.message.message}
                    </p>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  <Send className="mr-2 h-4 w-4" />
                  {t('feedbackSubmit')}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Feedback;
