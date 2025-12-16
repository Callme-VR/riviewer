// Client-side auth wrapper with Turbopack compatibility
"use client";

import { useEffect, useState, useContext, createContext, ReactNode, useCallback } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  email?: string;
  name?: string;
  image?: string;
}

interface Session {
  user: User | null;
  expires: string;
}

interface AuthContextType {
  session: Session | null;
  isLoading: boolean;
  signIn: (provider: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (userData: Record<string, unknown>) => Promise<void>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  const fetchSession = useCallback(async () => {
    try {
      const response = await fetch('/api/auth/session');
      if (response.ok) {
        const data = await response.json();
        setSession(data?.session || null);
      } else {
        setSession(null);
      }
    } catch (error) {
      console.error('Failed to fetch session:', error);
      setSession(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSession();
  }, [fetchSession]);

  const signIn = async (provider: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/auth/signin/${provider}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (response.redirected) {
        window.location.href = response.url;
      }
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      await fetch('/api/auth/signout', { method: 'POST' });
      setSession(null);
      router.push('/login');
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (userData: Record<string, unknown>) => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      
      if (response.ok) {
        const data = await response.json();
        setSession(data.session);
        router.push('/dashboard');
      } else {
        const error = await response.json();
        throw new Error(error.message || 'Sign up failed');
      }
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    session,
    isLoading,
    signIn,
    signOut,
    signUp,
    refreshSession: fetchSession,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { AuthContext };