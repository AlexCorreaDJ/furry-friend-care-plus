
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Play, CheckCircle, Clock } from "lucide-react";

interface BasicTrainingTutorialProps {
  onBack: () => void;
}

const BasicTrainingTutorial = ({ onBack }: BasicTrainingTutorialProps) => {
  const [completedCommands, setCompletedCommands] = useState<string[]>([]);

  const commands = [
    {
      id: 'sit',
      name: 'Sentar',
      description: 'Ensine seu pet a sentar quando você disser "senta"',
      steps: [
        'Segure um petisco acima da cabeça do pet',
        'Mova lentamente para trás, fazendo o pet olhar para cima',
        'Quando ele sentar naturalmente, diga "senta" e dê o petisco',
        'Repita 5-10 vezes por sessão, 2-3 vezes ao dia'
      ],
      duration: '5-10 minutos',
      difficulty: 'Fácil'
    },
    {
      id: 'stay',
      name: 'Ficar',
      description: 'Ensine seu pet a permanecer parado até receber permissão',
      steps: [
        'Comece com o pet sentado',
        'Mostre a palma da mão e diga "fica"',
        'Dê um passo para trás e espere 2-3 segundos',
        'Volte e recompense se ele não se moveu',
        'Aumente gradualmente a distância e o tempo'
      ],
      duration: '10-15 minutos',
      difficulty: 'Médio'
    },
    {
      id: 'come',
      name: 'Vir',
      description: 'Ensine seu pet a vir quando chamado',
      steps: [
        'Comece em casa, sem distrações',
        'Chame o nome do pet seguido de "vem"',
        'Quando ele vier, recompense com petisco e carinho',
        'Pratique em diferentes cômodos da casa',
        'Só pratique ao ar livre quando dominar em casa'
      ],
      duration: '10-15 minutos',
      difficulty: 'Médio'
    },
    {
      id: 'down',
      name: 'Deitar',
      description: 'Ensine seu pet a deitar quando comandado',
      steps: [
        'Comece com o pet sentado',
        'Segure um petisco no chão na frente das patas',
        'Puxe lentamente para frente enquanto diz "deita"',
        'Quando ele deitar, dê o petisco imediatamente',
        'Pratique até ele deitar só com o comando verbal'
      ],
      duration: '10-15 minutos',
      difficulty: 'Médio'
    }
  ];

  const toggleCommandComplete = (commandId: string) => {
    setCompletedCommands(prev => 
      prev.includes(commandId) 
        ? prev.filter(id => id !== commandId)
        : [...prev, commandId]
    );
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Fácil': return 'bg-green-100 text-green-800';
      case 'Médio': return 'bg-yellow-100 text-yellow-800';
      case 'Difícil': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

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

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Tutorial de Adestramento Básico
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Aprenda os comandos essenciais para educar seu pet. Pratique com paciência e sempre recompense o bom comportamento!
          </p>
        </div>

        {/* Progress */}
        <Card className="mb-8 bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-900">
              <CheckCircle className="h-5 w-5" />
              Progresso dos Comandos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-blue-800">Comandos dominados</span>
              <span className="font-semibold text-blue-900">{completedCommands.length} de {commands.length}</span>
            </div>
            <div className="bg-blue-200 rounded-full h-3">
              <div 
                className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${(completedCommands.length / commands.length) * 100}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>

        {/* Commands */}
        <div className="space-y-6">
          {commands.map((command) => {
            const isCompleted = completedCommands.includes(command.id);
            
            return (
              <Card 
                key={command.id} 
                className={`border-2 transition-all ${
                  isCompleted 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-white border-gray-200 hover:shadow-lg'
                }`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-full ${
                        isCompleted ? 'bg-green-500' : 'bg-blue-500'
                      } text-white`}>
                        {isCompleted ? (
                          <CheckCircle className="h-6 w-6" />
                        ) : (
                          <Play className="h-6 w-6" />
                        )}
                      </div>
                      <div>
                        <CardTitle className="text-xl text-gray-900">
                          {command.name}
                        </CardTitle>
                        <p className="text-gray-600">{command.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge className={getDifficultyColor(command.difficulty)}>
                        {command.difficulty}
                      </Badge>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {command.duration}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Passo a passo:</h4>
                      <ol className="space-y-2">
                        {command.steps.map((step, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <span className="bg-blue-100 text-blue-800 text-sm font-semibold min-w-[24px] h-6 rounded-full flex items-center justify-center">
                              {index + 1}
                            </span>
                            <span className="text-gray-700">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                    
                    <div className="flex gap-3 pt-4">
                      <Button
                        onClick={() => toggleCommandComplete(command.id)}
                        className={`${
                          isCompleted 
                            ? 'bg-green-600 hover:bg-green-700' 
                            : 'bg-blue-600 hover:bg-blue-700'
                        } text-white`}
                      >
                        {isCompleted ? 'Comando dominado!' : 'Marcar como dominado'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Tips */}
        <Card className="mt-8 bg-yellow-50 border-yellow-200">
          <CardHeader>
            <CardTitle className="text-yellow-900">💡 Dicas Importantes</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-yellow-800">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 mt-0.5 text-yellow-600" />
                <span className="text-sm">
                  Sessões curtas (5-15 min) são mais eficazes que treinos longos
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 mt-0.5 text-yellow-600" />
                <span className="text-sm">
                  Sempre termine o treino com algo que o pet já sabe fazer
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 mt-0.5 text-yellow-600" />
                <span className="text-sm">
                  Use petiscos pequenos e saborosos como recompensa
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 mt-0.5 text-yellow-600" />
                <span className="text-sm">
                  Seja paciente - cada pet aprende no seu próprio ritmo
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BasicTrainingTutorial;
