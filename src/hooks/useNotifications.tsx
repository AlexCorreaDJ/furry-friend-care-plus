
import { useState, useEffect } from 'react';
import { PushNotifications } from '@capacitor/push-notifications';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Capacitor } from '@capacitor/core';

export const useNotifications = () => {
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      initializeNotifications();
    }
  }, []);

  const initializeNotifications = async () => {
    try {
      // Solicitar permissões para notificações push
      const pushPermission = await PushNotifications.requestPermissions();
      
      if (pushPermission.receive === 'granted') {
        setPermissionGranted(true);
        
        // Registrar para notificações push
        await PushNotifications.register();
        
        // Solicitar permissões para notificações locais
        await LocalNotifications.requestPermissions();
      }

      // Listeners para notificações
      PushNotifications.addListener('registration', (token) => {
        console.log('Push registration success, token: ', token.value);
        setToken(token.value);
      });

      PushNotifications.addListener('registrationError', (error) => {
        console.error('Error on registration: ', JSON.stringify(error));
      });

      PushNotifications.addListener('pushNotificationReceived', (notification) => {
        console.log('Push notification received: ', JSON.stringify(notification));
      });

      PushNotifications.addListener('pushNotificationActionPerformed', (notification) => {
        console.log('Push notification action performed', JSON.stringify(notification));
      });

    } catch (error) {
      console.error('Error initializing notifications:', error);
    }
  };

  const scheduleLocalNotification = async (title: string, body: string, scheduledAt: Date) => {
    if (!Capacitor.isNativePlatform()) return;

    try {
      await LocalNotifications.schedule({
        notifications: [{
          title,
          body,
          id: Date.now(),
          schedule: { at: scheduledAt },
          sound: 'beep.wav',
          attachments: undefined,
          actionTypeId: '',
          extra: null
        }]
      });
    } catch (error) {
      console.error('Error scheduling notification:', error);
    }
  };

  return {
    permissionGranted,
    token,
    scheduleLocalNotification,
    initializeNotifications
  };
};
