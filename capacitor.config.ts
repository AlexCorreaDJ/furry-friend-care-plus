
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
    },
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert']
    },
    LocalNotifications: {
      smallIcon: 'ic_stat_icon_config_sample',
      iconColor: '#488AFF',
      sound: 'beep.wav'
    }
  },
  android: {
    allowMixedContent: true,
    permissions: [
      'android.permission.INTERNET',
      'android.permission.ACCESS_NETWORK_STATE',
      'android.permission.VIBRATE',
      'android.permission.RECEIVE_BOOT_COMPLETED',
      'android.permission.WAKE_LOCK',
      'android.permission.POST_NOTIFICATIONS',
      'com.google.android.c2dm.permission.RECEIVE'
    ]
  }
};

export default config;
