
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Bell, Calendar, Syringe, Heart, Clock, Check, MoreHorizontal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import NotificationItem from './NotificationItem';

interface NotificationsScreenProps {
  onBack: () => void;
  pets: any[];
}

const NotificationsScreen = ({ onBack, pets }: NotificationsScreenProps) => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'vaccination',
      petName: 'Buddy',
      title: 'Vacina V10',
      description: 'Segunda dose da vacina V10',
      dueDate: '2025-01-25',
      priority: 'high',
      status: 'upcoming',
      daysLeft: 3,
      isRead: false
    },
    {
      id: 2,
      type: 'birthday',
      petName: 'Luna',
      title: 'Aniversário do pet',
      description: 'Luna faz 1 ano amanhã!',
      dueDate: '2025-01-23',
      priority: 'medium',
      status: 'upcoming',
      daysLeft: 1,
      isRead: false
    },
    {
      id: 3,
      type: 'checkup',
      petName: 'Max',
      title: 'Consulta de rotina',
      description: 'Check-up anual vencido',
      dueDate: '2025-01-15',
      priority: 'high',
      status: 'overdue',
      daysLeft: -7,
      isRead: false
    },
    {
      id: 4,
      type: 'medication',
      petName: 'Bella',
      title: 'Vermífugo',
      description: 'Aplicação de vermífugo',
      dueDate: '2025-01-24',
      priority: 'medium',
      status: 'upcoming',
      daysLeft: 2,
      isRead: false
    },
    {
      id: 5,
      type: 'vaccination',
      petName: 'Charlie',
      title: 'Vacina Antirrábica',
      description: 'Reforço anual da antirrábica',
      dueDate: '2025-01-26',
      priority: 'high',
      status: 'upcoming',
      daysLeft: 4,
      isRead: true
    }
  ]);

  const handleMarkAsRead = (notificationId: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId 
          ? { ...notif, isRead: true }
          : notif
      )
    );
    
    toast({
      title: "Notificação marcada como lida",
      description: "A notificação foi marcada como lida.",
    });
  };

  const handleSnooze = (notificationId: number, days: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId 
          ? { 
              ...notif, 
              dueDate: new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              daysLeft: notif.daysLeft + days,
              isRead: false
            }
          : notif
      )
    );
    
    toast({
      title: "Notificação adiada",
      description: `Lembrete adiado por ${days} dia${days > 1 ? 's' : ''}.`,
    });
  };

  const handleDismiss = (notificationId: number) => {
    setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
    
    toast({
      title: "Notificação removida",
      description: "A notificação foi removida da lista.",
    });
  };

  const unreadNotifications = notifications.filter(n => !n.isRead);
  const overdueNotifications = notifications.filter(n => n.status === 'overdue');
  const upcomingNotifications = notifications.filter(n => n.status === 'upcoming');

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'vaccination': return <Syringe className="h-4 w-4" />;
      case 'birthday': return <Heart className="h-4 w-4" />;
      case 'checkup': return <Calendar className="h-4 w-4" />;
      case 'medication': return <Clock className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'vaccination': return 'text-blue-600';
      case 'birthday': return 'text-pink-600';
      case 'checkup': return 'text-green-600';
      case 'medication': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
          
          <div className="flex items-center gap-2">
            <Bell className="h-6 w-6 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Notificações</h1>
            {unreadNotifications.length > 0 && (
              <Badge variant="destructive">
                {unreadNotifications.length}
              </Badge>
            )}
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="bg-red-100 rounded-full w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                <Clock className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Atrasadas</h3>
              <p className="text-2xl font-bold text-red-600">{overdueNotifications.length}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="bg-blue-100 rounded-full w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Próximas</h3>
              <p className="text-2xl font-bold text-blue-600">{upcomingNotifications.length}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="bg-orange-100 rounded-full w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                <Bell className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Não lidas</h3>
              <p className="text-2xl font-bold text-orange-600">{unreadNotifications.length}</p>
            </CardContent>
          </Card>
        </div>

        {/* Notificações Atrasadas */}
        {overdueNotifications.length > 0 && (
          <Card className="mb-6 border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-900 flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Eventos Perdidos ({overdueNotifications.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {overdueNotifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onMarkAsRead={handleMarkAsRead}
                  onSnooze={handleSnooze}
                  onDismiss={handleDismiss}
                  getTypeIcon={getTypeIcon}
                  getTypeColor={getTypeColor}
                />
              ))}
            </CardContent>
          </Card>
        )}

        {/* Próximas Notificações */}
        {upcomingNotifications.length > 0 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                Próximos Lembretes ({upcomingNotifications.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingNotifications
                .sort((a, b) => a.daysLeft - b.daysLeft)
                .map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onMarkAsRead={handleMarkAsRead}
                    onSnooze={handleSnooze}
                    onDismiss={handleDismiss}
                    getTypeIcon={getTypeIcon}
                    getTypeColor={getTypeColor}
                  />
                ))}
            </CardContent>
          </Card>
        )}

        {notifications.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <div className="bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Bell className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Nenhuma notificação
              </h3>
              <p className="text-gray-600">
                Você está em dia com todos os cuidados dos seus pets!
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default NotificationsScreen;
