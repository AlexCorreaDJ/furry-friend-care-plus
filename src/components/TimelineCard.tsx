import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Syringe, Heart, Scissors, Shield, Calendar, Users, CheckCircle, Clock, AlertTriangle, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import TimelineEvent from './TimelineEvent';
import TimelineTip from './TimelineTip';

interface TimelineCardProps {
  pet: any;
}

const TimelineCard = ({ pet }: TimelineCardProps) => {
  const [completedMilestones, setCompletedMilestones] = useState<string[]>([]);
  const { toast } = useToast();
  
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

  const toggleMilestone = (eventId: string, milestoneId: string) => {
    const fullId = `${eventId}-${milestoneId}`;
    setCompletedMilestones(prev => 
      prev.includes(fullId) 
        ? prev.filter(id => id !== fullId)
        : [...prev, fullId]
    );
    
    toast({
      title: completedMilestones.includes(fullId) ? "Marco desmarcado" : "Marco concluído!",
      description: completedMilestones.includes(fullId) 
        ? "O marco foi desmarcado." 
        : "Parabéns pelo progresso!",
    });
  };

  const timelineEvents = [
    {
      id: "vaccines-0-2",
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
      ],
      milestones: [
        { id: "first-vaccine", text: "Primeira vacina aplicada", critical: true },
        { id: "vet-checkup", text: "Primeira consulta veterinária", critical: true },
        { id: "feeding-plan", text: "Plano alimentar estabelecido", critical: false }
      ],
      actions: [
        { type: "schedule", text: "Agendar vacinação" },
        { type: "learn", text: "Aprender sobre cuidados" }
      ]
    },
    {
      id: "boosters-2-4",
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
      ],
      milestones: [
        { id: "second-vaccine", text: "Segunda dose de vacina", critical: true },
        { id: "rabies-vaccine", text: "Vacina antirrábica", critical: true },
        { id: "deworming", text: "Vermifugação realizada", critical: true },
        { id: "weight-check", text: "Controle de peso", critical: false }
      ],
      actions: [
        { type: "schedule", text: "Agendar reforços" },
        { type: "track", text: "Acompanhar peso" }
      ]
    },
    {
      id: "socialization-4-6",
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
      ],
      milestones: [
        { id: "socialization", text: "Programa de socialização iniciado", critical: true },
        { id: "castration-eval", text: "Avaliação para castração", critical: false },
        { id: "third-vaccine", text: "Terceira dose vacinal", critical: true },
        { id: "basic-training", text: "Comandos básicos iniciados", critical: false }
      ],
      actions: [
        { type: "learn", text: "Tutorial de socialização" },
        { type: "schedule", text: "Consultar sobre castração" }
      ]
    },
    {
      id: "development-6-12",
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
      ],
      milestones: [
        { id: "sit-command", text: "Comando 'sentar' dominado", critical: false },
        { id: "stay-command", text: "Comando 'ficar' dominado", critical: false },
        { id: "come-command", text: "Comando 'vir' dominado", critical: false },
        { id: "leash-training", text: "Caminhada na coleira", critical: true },
        { id: "weight-management", text: "Peso ideal mantido", critical: true }
      ],
      actions: [
        { type: "train", text: "Iniciar adestramento" },
        { type: "track", text: "Monitorar desenvolvimento" }
      ]
    },
    {
      id: "adult-care-12+",
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
      ],
      milestones: [
        { id: "annual-checkup", text: "Check-up anual realizado", critical: true },
        { id: "vaccine-boosters", text: "Reforços vacinais em dia", critical: true },
        { id: "dental-care", text: "Cuidados dentários estabelecidos", critical: true },
        { id: "exercise-routine", text: "Rotina de exercícios", critical: false }
      ],
      actions: [
        { type: "schedule", text: "Agendar check-up" },
        { type: "track", text: "Monitorar saúde" }
      ]
    }
  ];

  const handleAction = (actionType: string, eventTitle: string) => {
    switch (actionType) {
      case 'schedule':
        toast({
          title: "Agendamento",
          description: `Lembre-se de agendar os cuidados para a fase: ${eventTitle}`,
        });
        break;
      case 'learn':
        toast({
          title: "Tutorial",
          description: "Acesse a seção de tutoriais para aprender mais!",
        });
        break;
      case 'train':
        toast({
          title: "Adestramento",
          description: "Acesse a seção de desenvolvimento para começar o treinamento!",
        });
        break;
      case 'track':
        toast({
          title: "Acompanhamento",
          description: "Use a seção de cuidados para monitorar o progresso!",
        });
        break;
    }
  };

  const getCompletionPercentage = () => {
    const totalMilestones = timelineEvents.reduce((acc, event) => acc + event.milestones.length, 0);
    const completedCount = completedMilestones.length;
    return totalMilestones > 0 ? Math.round((completedCount / totalMilestones) * 100) : 0;
  };

  const getCurrentPhaseInfo = () => {
    const currentEvent = timelineEvents.find(event => event.status === 'current');
    if (!currentEvent) return null;
    
    const completedInPhase = completedMilestones.filter(id => 
      id.startsWith(currentEvent.id)
    ).length;
    
    return {
      title: currentEvent.title,
      completed: completedInPhase,
      total: currentEvent.milestones.length,
      percentage: Math.round((completedInPhase / currentEvent.milestones.length) * 100)
    };
  };

  const currentPhase = getCurrentPhaseInfo();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Cronograma de Desenvolvimento
          </CardTitle>
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              {pet.name} tem {currentAge} meses
            </p>
            <Badge className="bg-blue-100 text-blue-800">
              {getCompletionPercentage()}% Concluído
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current Phase Progress */}
          {currentPhase && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-blue-900">Fase Atual: {currentPhase.title}</h3>
                <span className="text-sm text-blue-700">{currentPhase.completed}/{currentPhase.total}</span>
              </div>
              <div className="bg-blue-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${currentPhase.percentage}%` }}
                ></div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {timelineEvents.map((event, index) => (
              <div key={event.id} className="relative">
                {/* Timeline line */}
                {index < timelineEvents.length - 1 && (
                  <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-gray-200"></div>
                )}
                
                <TimelineEvent
                  event={event}
                  isLast={index === timelineEvents.length - 1}
                />
                
                {/* Enhanced Event Details */}
                <div className="ml-16 mt-4 space-y-3">
                  {/* Milestones */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Marcos desta fase
                    </h4>
                    <div className="grid gap-2">
                      {event.milestones.map((milestone) => {
                        const isCompleted = completedMilestones.includes(`${event.id}-${milestone.id}`);
                        return (
                          <div 
                            key={milestone.id}
                            className="flex items-center gap-3 p-2 rounded hover:bg-white cursor-pointer transition-colors"
                            onClick={() => toggleMilestone(event.id, milestone.id)}
                          >
                            <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                              isCompleted 
                                ? 'bg-green-500 border-green-500' 
                                : 'border-gray-300'
                            }`}>
                              {isCompleted && <CheckCircle className="h-3 w-3 text-white" />}
                            </div>
                            <span className={`text-sm ${isCompleted ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                              {milestone.text}
                            </span>
                            {milestone.critical && (
                              <AlertTriangle className="h-3 w-3 text-orange-500" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 flex-wrap">
                    {event.actions.map((action, actionIndex) => (
                      <Button
                        key={actionIndex}
                        variant="outline"
                        size="sm"
                        onClick={() => handleAction(action.type, event.title)}
                        className="flex items-center gap-1"
                      >
                        {action.type === 'schedule' && <Calendar className="h-3 w-3" />}
                        {action.type === 'learn' && <BookOpen className="h-3 w-3" />}
                        {action.type === 'train' && <Users className="h-3 w-3" />}
                        {action.type === 'track' && <Clock className="h-3 w-3" />}
                        {action.text}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <TimelineTip currentAge={currentAge} />
        </CardContent>
      </Card>

      {/* Progress Summary */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardHeader>
          <CardTitle className="text-green-900">Resumo do Progresso</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{completedMilestones.length}</div>
              <div className="text-sm text-green-800">Marcos Concluídos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{currentAge}</div>
              <div className="text-sm text-blue-800">Meses de Idade</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{getCompletionPercentage()}%</div>
              <div className="text-sm text-purple-800">Progresso Total</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TimelineCard;
