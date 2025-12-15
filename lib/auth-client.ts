import { useState, useEffect } from 'react';

// Temporary placeholder for auth client to avoid Turbopack issues
// This file will be replaced with proper implementation when the issue is resolved

export const signIn = {
  social: async ({ provider }: { provider: string }) => {
    window.location.href = `/api/auth/signin/${provider}`;
  },
};

export const signOut = async () => {
  try {
    const response = await fetch('/api/auth/signout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    
    if (response.ok) {
      window.location.href = '/';
    }
  } catch (error) {
    console.error('Sign out error:', error);
  }
};

export const useSession = () => {
  const [session, setSession] = useState<number>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch('/api/auth/session');
        if (res.ok) {
          const data = await res.json();
          setSession(data);
        }
      } catch (error) {
        console.error('Session check failed:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  return { 
    data: session, 
    isPending: loading,
    update: async () => {
      const res = await fetch('/api/auth/session');
      const data = await res.json();
      setSession(data);
      return data;
    }
  };
};

export const signUp = async () => {
  console.warn("Auth client not available due to Turbopack compatibility issues");
  return { data: null, error: new Error("Not implemented") };
};

export const checkout = async () => {
  console.warn("Auth client not available due to Turbopack compatibility issues");
  return { error: new Error("Not implemented") };
};

export const customer = async () => {
  console.warn("Auth client not available due to Turbopack compatibility issues");
  return { error: new Error("Not implemented") };
};