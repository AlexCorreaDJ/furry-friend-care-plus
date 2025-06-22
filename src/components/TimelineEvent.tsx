
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";

interface TimelineEventProps {
  event: {
    age: string;
    ageRange: number[];
    title: string;
    description: string;
    icon: LucideIcon;
    status: 'completed' | 'current' | 'upcoming';
    tasks: string[];
  };
  isLast: boolean;
}

const TimelineEvent = ({ event, isLast }: TimelineEventProps) => {
  const Icon = event.icon;
  const isActive = event.status === 'current';

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'current':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'upcoming':
        return 'bg-gray-100 text-gray-600 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Concluído';
      case 'current':
        return 'Atual';
      case 'upcoming':
        return 'Futuro';
      default:
        return '';
    }
  };

  return (
    <div className="relative">
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gray-200"></div>
      )}
      
      <div className={`flex gap-4 p-4 rounded-lg border-2 transition-all ${
        isActive ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'
      }`}>
        <div className={`p-3 rounded-full flex-shrink-0 ${
          event.status === 'completed' 
            ? 'bg-green-500 text-white' 
            : event.status === 'current'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-300 text-gray-600'
        }`}>
          <Icon className="h-5 w-5" />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-semibold text-gray-900">
              {event.title}
            </h3>
            <Badge className={getStatusColor(event.status)}>
              {getStatusText(event.status)}
            </Badge>
            <span className="text-sm text-gray-500 font-medium">
              {event.age}
            </span>
          </div>
          
          <p className="text-gray-600 mb-3">{event.description}</p>
          
          <ul className="space-y-1">
            {event.tasks.map((task, taskIndex) => (
              <li key={taskIndex} className="flex items-center gap-2 text-sm">
                <div className={`w-2 h-2 rounded-full ${
                  event.status === 'completed' 
                    ? 'bg-green-500' 
                    : event.status === 'current'
                    ? 'bg-blue-500'
                    : 'bg-gray-300'
                }`}></div>
                <span className={event.status === 'completed' ? 'line-through text-gray-500' : ''}>
                  {task}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TimelineEvent;
