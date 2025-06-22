import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Heart, Pill, Syringe } from "lucide-react";

const TimelineCard = ({ pet }) => {
  const getAgeInMonths = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    return (today.getFullYear() - birth.getFullYear()) * 12 + today.getMonth() - birth.getMonth();
  };

  const currentAge = getAgeInMonths(pet.birthDate);

  const timelineEvents = [
    {
      age: '1-2 meses',
      ageRange: [1, 2],
      title: 'Primeiros Cuidados',
      description: 'Desmame, primeiras consultas e adaptação ao novo lar',
      icon: Heart,
      status: currentAge >= 2 ? 'completed' : 'current',
      tasks: [
        'Primeira consulta veterinária',
        'Início da ração adequada para filhotes',
        'Adaptação ao novo ambiente'
      ]
    },
    {
      age: '2-4 meses',
      ageRange: [2, 4],
      title: 'Protocolo de Vacinação',
      description: 'Período crítico para imunização básica',
      icon: Syringe,
      status: currentAge >= 4 ? 'completed' : currentAge >= 2 ? 'current' : 'upcoming',
      tasks: [
        'V10 - 1ª dose (45 dias)',
        'V10 - 2ª dose (75 dias)',
        'Antirrábica (4 meses)'
      ]
    },
    {
      age: '4-6 meses',
      ageRange: [4, 6],
      title: 'Desenvolvimento e Socialização',
      description: 'Período ideal para adestramento e socialização',
      icon: Heart,
      status: currentAge >= 6 ? 'completed' : currentAge >= 4 ? 'current' : 'upcoming',
      tasks: [
        'Início do adestramento básico',
        'Socialização com outros animais',
        'Troca de ração (filhote para jovem)'
      ]
    },
    {
      age: '6-12 meses',
      ageRange: [6, 12],
      title: 'Castração e Cuidados',
      description: 'Período recomendado para castração',
      icon: Pill,
      status: currentAge >= 12 ? 'completed' : currentAge >= 6 ? 'current' : 'upcoming',
      tasks: [
        'Avaliar castração (6-8 meses)',
        'Consultas de acompanhamento',
        'Mudança gradual da ração'
      ]
    },
    {
      age: '1+ anos',
      ageRange: [12, 999],
      title: 'Vida Adulta',
      description: 'Manutenção da saúde e reforços anuais',
      icon: Calendar,
      status: currentAge >= 12 ? 'current' : 'upcoming',
      tasks: [
        'Reforço anual das vacinas',
        'Consultas semestrais',
        'Ração para adultos'
      ]
    }
  ];

  const getStatusColor = (status) => {
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

  const getStatusText = (status) => {
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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-500" />
            Linha do Tempo de Cuidados
          </CardTitle>
          <p className="text-sm text-gray-600">
            {pet.name} tem atualmente {pet.age} ({currentAge} meses)
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {timelineEvents.map((event, index) => {
              const Icon = event.icon;
              const isActive = event.status === 'current';
              
              return (
                <div key={index} className="relative">
                  {/* Timeline line */}
                  {index < timelineEvents.length - 1 && (
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
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Tips */}
      <Card className="bg-green-50 border-green-200">
        <CardHeader>
          <CardTitle className="text-green-900">💡 Dica da Fase Atual</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-green-800">
            {currentAge < 4 
              ? "Esta é uma fase crucial! Mantenha o protocolo de vacinação em dia e evite contato com animais não vacinados."
              : currentAge < 12 
              ? "Fase ideal para socialização e adestramento. Aproveite para ensinar comandos básicos!"
              : "Mantenha consultas regulares e não esqueça dos reforços anuais das vacinas."
            }
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TimelineCard;
