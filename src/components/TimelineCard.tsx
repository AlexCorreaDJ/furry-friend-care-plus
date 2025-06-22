
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Syringe, Heart, Scissors, Shield, Calendar, Users } from "lucide-react";
import TimelineEvent from './TimelineEvent';
import TimelineTip from './TimelineTip';

interface TimelineCardProps {
  pet: any;
}

const TimelineCard = ({ pet }: TimelineCardProps) => {
  
  const calculateAge = (birthDate: string) => {
    if (!birthDate) return 0;
    
    const today = new Date();
    const birth = new Date(birthDate);
    const diffTime = Math.abs(today.getTime() - birth.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffMonths = Math.floor(diffDays / 30);
    
    return diffMonths;
  };

  const currentAge = calculateAge(pet.birthDate);

  const getStatus = (minAge: number, maxAge: number): "completed" | "current" | "upcoming" => {
    if (currentAge >= maxAge) return "completed";
    if (currentAge >= minAge) return "current";
    return "upcoming";
  };

  const timelineEvents = [
    {
      age: "0-2 meses",
      ageRange: [0, 2] as [number, number],
      title: "Primeiras Vacinas",
      description: "Início do protocolo vacinal básico para proteção inicial.",
      icon: Syringe,
      status: getStatus(0, 2),
      tasks: [
        "Primeira dose da V8 ou V10",
        "Exame clínico veterinário",
        "Orientações sobre alimentação"
      ]
    },
    {
      age: "2-4 meses",
      ageRange: [2, 4] as [number, number],
      title: "Reforços e Vermifugação",
      description: "Continuação do protocolo vacinal e controle de parasitas.",
      icon: Heart,
      status: getStatus(2, 4),
      tasks: [
        "Segunda dose da V8/V10",
        "Primeira dose antirrábica",
        "Vermifugação"
      ]
    },
    {
      age: "4-6 meses",
      ageRange: [4, 6] as [number, number],
      title: "Socialização e Castração",
      description: "Período ideal para socialização e procedimentos cirúrgicos.",
      icon: Users,
      status: getStatus(4, 6),
      tasks: [
        "Socialização controlada",
        "Castração (se recomendado)",
        "Terceira dose vacinal"
      ]
    },
    {
      age: "6-12 meses",
      ageRange: [6, 12] as [number, number],
      title: "Desenvolvimento e Adestramento",
      description: "Fase de crescimento e aprendizado de comandos básicos.",
      icon: Calendar,
      status: getStatus(6, 12),
      tasks: [
        "Adestramento básico",
        "Controle de peso",
        "Reforços vacinais anuais"
      ]
    },
    {
      age: "1+ anos",
      ageRange: [12, 999] as [number, number],
      title: "Manutenção e Cuidados Adultos",
      description: "Cuidados de rotina para manter a saúde em dia.",
      icon: Shield,
      status: currentAge >= 12 ? "current" as const : "upcoming" as const,
      tasks: [
        "Check-ups semestrais",
        "Reforços vacinais anuais",
        "Controle de peso e dieta"
      ]
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Cronograma de Desenvolvimento
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {timelineEvents.map((event, index) => (
            <TimelineEvent
              key={index}
              event={event}
              isLast={index === timelineEvents.length - 1}
            />
          ))}
        </div>
        
        <TimelineTip currentAge={currentAge} />
      </CardContent>
    </Card>
  );
};

export default TimelineCard;
