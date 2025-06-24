
import { useState, useEffect } from 'react';

export const useNotifications = () => {
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    // Verificar se estamos em um ambiente que suporta notificações
    if (typeof window !== 'undefined' && 'Notification' in window) {
      checkPermissions();
    }
  }, []);

  const checkPermissions = async () => {
    try {
      const permission = await Notification.requestPermission();
      setPermissionGranted(permission === 'granted');
    } catch (error) {
      console.error('Error checking notification permissions:', error);
    }
  };

  const initializeNotifications = async () => {
    try {
      if (typeof window !== 'undefined' && 'Notification' in window) {
        const permission = await Notification.requestPermission();
        setPermissionGranted(permission === 'granted');
        console.log('Notification permission:', permission);
      }
    } catch (error) {
      console.error('Error initializing notifications:', error);
    }
  };

  const scheduleLocalNotification = async (title: string, body: string, scheduledAt?: Date) => {
    if (!permissionGranted) {
      console.warn('Notification permission not granted');
      return;
    }

    try {
      // Para web, criar uma notificação simples
      if (typeof window !== 'undefined' && 'Notification' in window) {
        new Notification(title, {
          body,
          icon: '/favicon.ico'
        });
      }
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
