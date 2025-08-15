import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Session, User } from '@supabase/supabase-js';

interface Profile {
  full_name?: string;
  cpf?: string;
  whatsapp?: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  isLoading: boolean;
  user: User | null;
  profile: Profile | null;
  login: (email, password) => Promise<any>;
  logout: () => Promise<any>;
  signUp: (email, password, options) => Promise<any>;
  updateProfile: (profileData: Profile) => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getSessionAndProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        setProfile(session.user.user_metadata as Profile);
      }
      setIsLoading(false);
    };

    getSessionAndProfile();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setProfile(session?.user?.user_metadata as Profile || null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const login = async (email, password) => {
    return await supabase.auth.signInWithPassword({ email, password });
  };

  const logout = async () => {
    return await supabase.auth.signOut();
  };
  
  const signUp = async (email, password, options) => {
    return await supabase.auth.signUp({ email, password, options });
  };

  const updateProfile = async (profileData: Profile) => {
    const { data, error } = await supabase.auth.updateUser({
      data: profileData
    });
    if (!error && data.user) {
      setProfile(data.user.user_metadata as Profile);
    }
    return { data, error };
  };

  const value = {
    isLoggedIn: !!session,
    isLoading,
    user,
    profile,
    login,
    logout,
    signUp,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};