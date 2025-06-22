
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Dog, Scale, Syringe, CheckCircle, BookOpen, Calendar, Plus } from "lucide-react";
import BasicTrainingTutorial from './BasicTrainingTutorial';
import WeightControlScreen from './WeightControlScreen';

interface DevelopmentTrainingScreenProps {
  pet: any;
  onBack: () => void;
}

const DevelopmentTrainingScreen = ({ pet, onBack }: DevelopmentTrainingScreenProps) => {
  const [completedItems, setCompletedItems] = useState<string[]>([]);
  const [activeScreen, setActiveScreen] = useState<'main' | 'training' | 'weight' | 'vaccination'>('main');

  const toggleItemComplete = (itemId: string) => {
    setCompletedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleNavigateToVaccination = () => {
    // Navigate back to main dashboard and switch to vaccination tab
    onBack();
    // This would ideally trigger the vaccination tab in the parent component
  };

  const trainingItems = [
    {
      id: 'basic-training',
      icon: Dog,
      title: 'Adestramento básico',
      description: 'Ensine comandos como sentar, deitar, ficar e vir. Reforce com petiscos e treinos curtos e diários.',
      buttonText: 'Ver tutorial completo',
      color: 'bg-blue-500',
      lightColor: 'bg-blue-50 border-blue-200',
      action: () => setActiveScreen('training')
    },
    {
      id: 'weight-control',
      icon: Scale,
      title: 'Controle de peso',
      description: 'Acompanhe o peso do seu pet para evitar obesidade. Consulte o veterinário para ajustar a alimentação.',
      buttonText: 'Registrar novo peso',
      color: 'bg-green-500',
      lightColor: 'bg-green-50 border-green-200',
      action: () => setActiveScreen('weight')
    },
    {
      id: 'vaccine-boosters',
      icon: Syringe,
      title: 'Reforços vacinais anuais',
      description: 'Nessa fase, o pet deve receber reforço das vacinas aplicadas no primeiro ano, como a antirrábica e V10.',
      buttonText: 'Ver carteira de vacinação',
      color: 'bg-purple-500',
      lightColor: 'bg-purple-50 border-purple-200',
      action: handleNavigateToVaccination
    }
  ];

  // Render sub-screens
  if (activeScreen === 'training') {
    return <BasicTrainingTutorial onBack={() => setActiveScreen('main')} />;
  }

  if (activeScreen === 'weight') {
    return <WeightControlScreen pet={pet} onBack={() => setActiveScreen('main')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
        </div>

        {/* Pet Info and Title */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
              {pet?.name?.charAt(0).toUpperCase() || 'P'}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Desenvolvimento e Adestramento
              </h1>
              <p className="text-lg text-gray-600">{pet?.name || 'Seu Pet'}</p>
            </div>
          </div>
          
          <Badge className="bg-blue-100 text-blue-800 text-sm px-3 py-1 mb-4">
            <Calendar className="h-4 w-4 mr-1" />
            Futuro — 6 a 12 meses
          </Badge>
          
          <p className="text-gray-600 max-w-2xl mx-auto">
            Fase de crescimento acelerado e aprendizado. Hora de reforçar bons hábitos e introduzir comandos básicos de obediência.
          </p>
        </div>

        {/* Training Items */}
        <div className="space-y-6">
          {trainingItems.map((item) => {
            const Icon = item.icon;
            const isCompleted = completedItems.includes(item.id);
            
            return (
              <Card 
                key={item.id} 
                className={`${item.lightColor} border-2 transition-all hover:shadow-lg cursor-pointer`}
                onClick={() => toggleItemComplete(item.id)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-full ${item.color} text-white`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-xl text-gray-900">
                        {item.title}
                      </CardTitle>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {isCompleted && (
                        <div className="bg-green-500 p-1 rounded-full">
                          <CheckCircle className="h-5 w-5 text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {item.description}
                  </p>
                  
                  {item.id === 'weight-control' && (
                    <div className="bg-white rounded-lg p-4 mb-4 border">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Peso ideal vs peso atual</span>
                        <span className="font-semibold text-green-600">Em acompanhamento</span>
                      </div>
                      <div className="mt-2 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full w-3/4"></div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex gap-3">
                    <Button 
                      className={`${item.color} hover:opacity-90 text-white flex items-center gap-2`}
                      onClick={(e) => {
                        e.stopPropagation();
                        item.action();
                      }}
                    >
                      {item.id === 'basic-training' && <BookOpen className="h-4 w-4" />}
                      {item.id === 'weight-control' && <Plus className="h-4 w-4" />}
                      {item.id === 'vaccine-boosters' && <Calendar className="h-4 w-4" />}
                      {item.buttonText}
                    </Button>
                    
                    <Button
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleItemComplete(item.id);
                      }}
                      className={isCompleted ? 'bg-green-100 text-green-700 border-green-300' : ''}
                    >
                      {isCompleted ? 'Completo' : 'Marcar como completo'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Progress Summary */}
        <Card className="mt-8 bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Progresso da Fase
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Items concluídos</span>
              <span className="font-semibold">{completedItems.length} de {trainingItems.length}</span>
            </div>
            <div className="bg-gray-200 rounded-full h-3">
              <div 
                className="bg-green-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${(completedItems.length / trainingItems.length) * 100}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Continue acompanhando o desenvolvimento do {pet?.name || 'seu pet'} para garantir um crescimento saudável!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DevelopmentTrainingScreen;
