
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Check, MoreHorizontal, X, Clock } from "lucide-react";

interface NotificationItemProps {
  notification: {
    id: number;
    type: string;
    petName: string;
    title: string;
    description: string;
    dueDate: string;
    priority: string;
    status: string;
    daysLeft: number;
    isRead: boolean;
  };
  onMarkAsRead: (id: number) => void;
  onSnooze: (id: number, days: number) => void;
  onDismiss: (id: number) => void;
  getTypeIcon: (type: string) => React.ReactNode;
  getTypeColor: (type: string) => string;
}

const NotificationItem = ({
  notification,
  onMarkAsRead,
  onSnooze,
  onDismiss,
  getTypeIcon,
  getTypeColor
}: NotificationItemProps) => {
  const formatDaysLeft = (daysLeft: number) => {
    if (daysLeft === 0) return 'Hoje';
    if (daysLeft === 1) return 'Amanhã';
    if (daysLeft === -1) return 'Ontem';
    if (daysLeft > 0) return `Em ${daysLeft} dias`;
    return `${Math.abs(daysLeft)} dias atrás`;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={`p-4 rounded-lg border ${notification.isRead ? 'bg-gray-50 opacity-75' : 'bg-white'} ${notification.status === 'overdue' ? 'border-red-200' : 'border-gray-200'}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          <div className={`p-2 rounded-lg ${notification.isRead ? 'bg-gray-100' : 'bg-blue-50'}`}>
            <div className={getTypeColor(notification.type)}>
              {getTypeIcon(notification.type)}
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className={`font-semibold ${notification.isRead ? 'text-gray-500' : 'text-gray-900'}`}>
                {notification.title}
              </h3>
              <Badge variant="outline" className="text-xs">
                {notification.petName}
              </Badge>
              <Badge className={getPriorityColor(notification.priority)}>
                {notification.priority === 'high' ? 'Alta' : notification.priority === 'medium' ? 'Média' : 'Baixa'}
              </Badge>
            </div>
            
            <p className={`text-sm mb-2 ${notification.isRead ? 'text-gray-400' : 'text-gray-600'}`}>
              {notification.description}
            </p>
            
            <div className="flex items-center gap-2 text-xs">
              <Badge className={getStatusColor(notification.status)}>
                {formatDaysLeft(notification.daysLeft)}
              </Badge>
              <span className="text-gray-500">
                {new Date(notification.dueDate).toLocaleDateString('pt-BR')}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {!notification.isRead && (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onMarkAsRead(notification.id)}
              className="text-green-600 hover:text-green-700"
            >
              <Check className="h-4 w-4" />
            </Button>
          )}
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="ghost">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {!notification.isRead && (
                <DropdownMenuItem onClick={() => onMarkAsRead(notification.id)}>
                  <Check className="h-4 w-4 mr-2" />
                  Marcar como lida
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={() => onSnooze(notification.id, 1)}>
                <Clock className="h-4 w-4 mr-2" />
                Adiar 1 dia
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onSnooze(notification.id, 3)}>
                <Clock className="h-4 w-4 mr-2" />
                Adiar 3 dias
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onSnooze(notification.id, 7)}>
                <Clock className="h-4 w-4 mr-2" />
                Adiar 1 semana
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onDismiss(notification.id)}
                className="text-red-600"
              >
                <X className="h-4 w-4 mr-2" />
                Remover
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
