
import { CapacitorConfig } from '@capacitor/core';

const config: CapacitorConfig = {
  appId: 'app.lovable.3512841d8d8d49b6a1d02a16c5bc260b',
  appName: 'furry-friend-care-plus',
  webDir: 'dist',
  server: {
    url: 'https://3512841d-8d8d-49b6-a1d0-2a16c5bc260b.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    StatusBar: {
      style: 'LIGHT_CONTENT',
      backgroundColor: '#3B82F6'
    }
  }
};

export default config;
