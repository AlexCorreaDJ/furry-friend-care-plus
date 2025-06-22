
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Play, CheckCircle, Clock, Star } from "lucide-react";

interface BasicTrainingTutorialProps {
  onBack: () => void;
}

const BasicTrainingTutorial = ({ onBack }: BasicTrainingTutorialProps) => {
  const [completedCommands, setCompletedCommands] = useState<string[]>([]);

  const commandCategories = {
    basicos: {
      name: 'Comandos Básicos',
      description: 'Fundamentos essenciais do adestramento'
    },
    intermediarios: {
      name: 'Comandos Intermediários', 
      description: 'Para pets que já dominam o básico'
    },
    avancados: {
      name: 'Comandos Avançados',
      description: 'Truques e comandos especializados'
    },
    comportamento: {
      name: 'Correção de Comportamento',
      description: 'Soluções para problemas comuns'
    }
  };

  const commands = [
    // Comandos Básicos
    {
      id: 'sit',
      category: 'basicos',
      name: 'Sentar',
      description: 'Ensine seu pet a sentar quando você disser "senta"',
      steps: [
        'Segure um petisco acima da cabeça do pet',
        'Mova lentamente para trás, fazendo o pet olhar para cima',
        'Quando ele sentar naturalmente, diga "senta" e dê o petisco',
        'Repita 5-10 vezes por sessão, 2-3 vezes ao dia',
        'Pratique sem petisco gradualmente'
      ],
      duration: '5-10 minutos',
      difficulty: 'Fácil'
    },
    {
      id: 'stay',
      category: 'basicos',
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
      category: 'basicos',
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
      category: 'basicos',
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
    },
    {
      id: 'paw',
      category: 'basicos',
      name: 'Dar a Pata',
      description: 'Comando básico para socialização e cumprimentos',
      steps: [
        'Com o pet sentado, segure um petisco fechado na mão',
        'Coloque a mão na altura do peito dele',
        'Espere ele levantar a pata para tentar pegar',
        'No momento que levantar, diga "pata" e recompense',
        'Repita até ele dar a pata apenas com o comando'
      ],
      duration: '5-10 minutos',
      difficulty: 'Fácil'
    },
    {
      id: 'wait',
      category: 'basicos',
      name: 'Esperar',
      description: 'Ensine paciência na hora da comida e passeios',
      steps: [
        'Prepare a comida com o pet observando',
        'Antes de colocar no chão, diga "espera"',
        'Se ele se aproximar, levante a comida',
        'Só coloque quando ele ficar quieto',
        'Libere com "pode" após alguns segundos'
      ],
      duration: '5-15 minutos',
      difficulty: 'Médio'
    },

    // Comandos Intermediários
    {
      id: 'heel',
      category: 'intermediarios',
      name: 'Junto',
      description: 'Caminhar ao lado sem puxar a guia',
      steps: [
        'Comece em casa com o pet na coleira',
        'Mantenha petiscos na mão do lado que ele deve ficar',
        'Caminhe devagar, recompensando quando estiver na posição',
        'Se puxar, pare e espere ele voltar',
        'Use comando "junto" constantemente'
      ],
      duration: '15-20 minutos',
      difficulty: 'Médio'
    },
    {
      id: 'drop',
      category: 'intermediarios',
      name: 'Largar',
      description: 'Soltar objetos na boca quando comandado',
      steps: [
        'Deixe o pet pegar um brinquedo',
        'Ofereça um petisco mais interessante',
        'Quando abrir a boca, diga "larga"',
        'Recompense imediatamente quando soltar',
        'Pratique com diferentes objetos'
      ],
      duration: '10-15 minutos',
      difficulty: 'Médio'
    },
    {
      id: 'place',
      category: 'intermediarios',
      name: 'Lugar',
      description: 'Ir para um local específico e ficar lá',
      steps: [
        'Escolha uma cama ou tapete como "lugar"',
        'Leve o pet até lá e diga "lugar"',
        'Recompense quando ele pisar no local',
        'Pratique enviando de diferentes distâncias',
        'Aumente o tempo que deve ficar lá'
      ],
      duration: '15-20 minutos',
      difficulty: 'Médio'
    },
    {
      id: 'touch',
      category: 'intermediarios',
      name: 'Tocar',
      description: 'Tocar a mão com o focinho',
      steps: [
        'Estenda a mão fechada na frente do pet',
        'Quando ele cheirar e encostar o focinho, diga "toca"',
        'Recompense imediatamente o contato',
        'Pratique com a mão aberta gradualmente',
        'Use em situações de redirecionamento'
      ],
      duration: '5-10 minutos',
      difficulty: 'Fácil'
    },
    {
      id: 'back',
      category: 'intermediarios',
      name: 'Para Trás',
      description: 'Recuar quando necessário',
      steps: [
        'Fique de frente para o pet',
        'Caminhe lentamente em direção a ele',
        'Quando ele recuar, diga "para trás"',
        'Recompense o movimento de recuo',
        'Pratique em diferentes situações'
      ],
      duration: '10-15 minutos',
      difficulty: 'Médio'
    },
    {
      id: 'focus',
      category: 'intermediarios',
      name: 'Olhar/Focar',
      description: 'Manter contato visual e atenção',
      steps: [
        'Segure um petisco próximo ao seu rosto',
        'Quando o pet olhar nos seus olhos, diga "olha"',
        'Recompense o contato visual',
        'Aumente gradualmente o tempo de contato',
        'Pratique em ambientes com distrações'
      ],
      duration: '5-10 minutos',
      difficulty: 'Médio'
    },

    // Comandos Avançados
    {
      id: 'roll',
      category: 'avancados',
      name: 'Rolar',
      description: 'Rolar completamente de um lado para outro',
      steps: [
        'Comece com o pet deitado',
        'Segure um petisco próximo ao ombro dele',
        'Mova o petisco lentamente sobre as costas',
        'Quando rolar, diga "rola" e recompense',
        'Pratique dos dois lados'
      ],
      duration: '15-20 minutos',
      difficulty: 'Difícil'
    },
    {
      id: 'play_dead',
      category: 'avancados',
      name: 'Fingir de Morto',
      description: 'Deitar de lado e ficar imóvel',
      steps: [
        'Com o pet deitado, use petisco para guiá-lo de lado',
        'Quando deitar de lado, diga "morreu" e espere',
        'Recompense depois de alguns segundos parado',
        'Aumente gradualmente o tempo',
        'Use comando de liberação como "vivo"'
      ],
      duration: '15-25 minutos',
      difficulty: 'Difícil'
    },
    {
      id: 'spin',
      category: 'avancados',
      name: 'Girar',
      description: 'Girar em círculo completo',
      steps: [
        'Com o pet em pé, segure petisco próximo ao nariz',
        'Mova a mão em círculo lentamente',
        'Quando completar o giro, diga "gira"',
        'Recompense o movimento completo',
        'Pratique nos dois sentidos'
      ],
      duration: '10-15 minutos',
      difficulty: 'Médio'
    },
    {
      id: 'bow',
      category: 'avancados',
      name: 'Reverência',
      description: 'Abaixar a frente mantendo traseiro alto',
      steps: [
        'Com o pet em pé, segure petisco no chão',
        'Puxe para frente fazendo ele abaixar a frente',
        'Impeça que deite completamente',
        'Quando fizer a posição, diga "reverência"',
        'Recompense a postura correta'
      ],
      duration: '15-20 minutos',
      difficulty: 'Difícil'
    },
    {
      id: 'high_five',
      category: 'avancados',
      name: 'Bater Palma',
      description: 'Levantar a pata e "bater palma"',
      steps: [
        'Evolução do comando "dar a pata"',
        'Levante sua mão mais alto',
        'Quando ele levantar a pata, encoste na sua',
        'Diga "bate aqui" no momento do contato',
        'Pratique com ambas as patas'
      ],
      duration: '10-15 minutos',
      difficulty: 'Médio'
    },

    // Correção de Comportamento
    {
      id: 'quiet',
      category: 'comportamento',
      name: 'Quieto',
      description: 'Parar de latir quando comandado',
      steps: [
        'Espere o pet latir naturalmente',
        'Quando parar por um momento, diga "quieto"',
        'Recompense imediatamente o silêncio',
        'Aumente gradualmente o tempo de silêncio',
        'Nunca grite para ele parar de latir'
      ],
      duration: '10-20 minutos',
      difficulty: 'Difícil'
    },
    {
      id: 'off',
      category: 'comportamento',
      name: 'Descer',
      description: 'Descer de móveis ou pessoas',
      steps: [
        'Quando o pet subir onde não deve, diga "desce"',
        'Não empurre, mas guie com petisco',
        'Recompense quando descer voluntariamente',
        'Redirecione para local apropriado',
        'Seja consistente sempre'
      ],
      duration: '5-15 minutos',
      difficulty: 'Médio'
    },
    {
      id: 'gentle',
      category: 'comportamento',
      name: 'Devagar',
      description: 'Pegar petiscos ou brinquedos com cuidado',
      steps: [
        'Ofereça petisco fechado na mão',
        'Se ele tentar pegar com força, feche a mão',
        'Só abra quando ele se aproximar devagar',
        'Diga "devagar" antes de oferecer',
        'Recompense a delicadeza'
      ],
      duration: '5-10 minutos',
      difficulty: 'Médio'
    },
    {
      id: 'leave_it',
      category: 'comportamento',
      name: 'Deixa',
      description: 'Ignorar objetos ou comida no chão',
      steps: [
        'Coloque petisco no chão e cubra com a mão',
        'Quando ele tentar pegar, diga "deixa"',
        'Só permita acesso quando parar de tentar',
        'Pratique com diferentes objetos',
        'Recompense quando ignorar o item'
      ],
      duration: '15-20 minutos',
      difficulty: 'Difícil'
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

  const getCommandsByCategory = (category: string) => {
    return commands.filter(command => command.category === category);
  };

  const totalCommands = commands.length;
  const completedCount = completedCommands.length;

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
              <span className="font-semibold text-blue-900">{completedCount} de {totalCommands}</span>
            </div>
            <div className="bg-blue-200 rounded-full h-3">
              <div 
                className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${(completedCount / totalCommands) * 100}%` }}
              ></div>
            </div>
            <div className="flex items-center gap-4 mt-3 text-sm text-blue-700">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4" />
                <span>{Math.round((completedCount / totalCommands) * 100)}% concluído</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs for Categories */}
        <Tabs defaultValue="basicos" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basicos">Básicos</TabsTrigger>
            <TabsTrigger value="intermediarios">Intermediários</TabsTrigger>
            <TabsTrigger value="avancados">Avançados</TabsTrigger>
            <TabsTrigger value="comportamento">Comportamento</TabsTrigger>
          </TabsList>

          {Object.entries(commandCategories).map(([categoryKey, category]) => (
            <TabsContent key={categoryKey} value={categoryKey} className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{category.name}</h2>
                <p className="text-gray-600">{category.description}</p>
              </div>

              <div className="space-y-6">
                {getCommandsByCategory(categoryKey).map((command) => {
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
            </TabsContent>
          ))}
        </Tabs>

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
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 mt-0.5 text-yellow-600" />
                <span className="text-sm">
                  Pratique em diferentes ambientes para generalizar o aprendizado
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
