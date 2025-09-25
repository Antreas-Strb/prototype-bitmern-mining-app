import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { AuthError } from '@supabase/supabase-js';

interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        try {
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .maybeSingle();

          if (profileError) throw profileError;

          if (!profile) {
            // Create profile if it doesn't exist
            const { error: insertError } = await supabase
              .from('profiles')
              .insert([{
                id: session.user.id,
                name: session.user.user_metadata?.name || 'User',
                role: session.user.user_metadata?.role || 'user',
              }]);

            if (insertError) throw insertError;

            // Fetch the newly created profile
            const { data: newProfile, error: newProfileError } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();

            if (newProfileError) throw newProfileError;

            setUser({
              id: session.user.id,
              name: newProfile.name,
              email: session.user.email || '',
              role: newProfile.role,
            });
          } else {
            setUser({
              id: session.user.id,
              name: profile.name,
              email: session.user.email || '',
              role: profile.role,
            });
          }
        } catch (err) {
          console.error('Error fetching user profile:', err);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) throw error;

      if (data.user) {
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .maybeSingle();

        if (profileError) throw profileError;

        if (!profile) {
          // Create profile if it doesn't exist
          const { error: insertError } = await supabase
            .from('profiles')
            .insert([{
              id: data.user.id,
              name: data.user.user_metadata?.name || 'User',
              role: data.user.user_metadata?.role || 'user',
            }]);

          if (insertError) throw insertError;

          // Fetch the newly created profile
          const { data: newProfile, error: newProfileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', data.user.id)
            .single();

          if (newProfileError) throw newProfileError;

          setUser({
            id: data.user.id,
            name: newProfile.name,
            email: data.user.email || '',
            role: newProfile.role,
          });
        } else {
          setUser({
            id: data.user.id,
            name: profile.name,
            email: data.user.email || '',
            role: profile.role,
          });
        }
        router.push('/dashboard');
      }
    } catch (err) {
      const authError = err as AuthError;
      setError(authError.message);
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            name: name.trim(),
            role: 'user',
          },
        },
      });

      if (error) throw error;

      if (data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: data.user.id,
              name: name.trim(),
              role: 'user',
            },
          ]);

        if (profileError) throw profileError;

        setUser({
          id: data.user.id,
          name: name.trim(),
          email: data.user.email || '',
          role: 'user',
        });
        router.push('/dashboard');
      }
    } catch (err) {
      const authError = err as AuthError;
      setError(authError.message);
      console.error('Registration error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setUser(null);
      router.push('/auth/login');
    } catch (err) {
      console.error('Logout error:', err);
      setError('Failed to log out. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        isLoading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};