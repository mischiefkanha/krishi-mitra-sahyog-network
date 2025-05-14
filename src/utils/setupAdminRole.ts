
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

export async function setupAdminUser(userId: string) {
  try {
    // First, check if the user already has a role
    const { data: profile, error: fetchError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .single();
      
    if (fetchError) throw fetchError;
    
    // If the user doesn't have a role or it's not admin, update it
    if (!profile || profile.role !== 'admin') {
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ role: 'admin' })
        .eq('id', userId);
        
      if (updateError) throw updateError;
      
      console.log('User has been set as admin');
      return true;
    } else {
      console.log('User is already an admin');
      return false;
    }
  } catch (error) {
    console.error('Error setting up admin user:', error);
    return false;
  }
}

// Hook to check if the current user is an admin
export function useIsAdmin() {
  const { profile } = useAuth();
  return profile?.role === 'admin';
}
