
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Heart, Pill, Syringe } from "lucide-react";
import TimelineEvent from './TimelineEvent';
import TimelineTip from './TimelineTip';

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
            {timelineEvents.map((event, index) => (
              <TimelineEvent
                key={index}
                event={event}
                isLast={index === timelineEvents.length - 1}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      <TimelineTip currentAge={currentAge} />
    </div>
  );
};

export default TimelineCard;
