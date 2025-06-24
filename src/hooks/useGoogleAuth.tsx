
import { useState } from 'react';
import { GoogleAuth } from '@capacitor-community/google-auth';
import { Capacitor } from '@capacitor/core';

interface GoogleUser {
  id: string;
  email: string;
  name: string;
  imageUrl: string;
}

export const useGoogleAuth = () => {
  const [user, setUser] = useState<GoogleUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const initializeGoogleAuth = async () => {
    if (Capacitor.isNativePlatform()) {
      await GoogleAuth.initialize({
        clientId: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com', // Usuário precisa configurar
        scopes: ['profile', 'email'],
        grantOfflineAccess: true,
      });
    }
  };

  const signInWithGoogle = async () => {
    setIsLoading(true);
    try {
      await initializeGoogleAuth();
      const result = await GoogleAuth.signIn();
      
      const googleUser: GoogleUser = {
        id: result.id,
        email: result.email,
        name: result.name,
        imageUrl: result.imageUrl
      };
      
      setUser(googleUser);
      console.log('Google sign in success:', googleUser);
      return googleUser;
    } catch (error) {
      console.error('Google sign in error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await GoogleAuth.signOut();
      setUser(null);
    } catch (error) {
      console.error('Google sign out error:', error);
    }
  };

  return {
    user,
    isLoading,
    signInWithGoogle,
    signOut
  };
};
