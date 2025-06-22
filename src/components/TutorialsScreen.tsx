
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Utensils, Droplets, Users, Syringe, HelpCircle, Play, ArrowLeft, Star } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Tutorial {
  id: string;
  title: string;
  category: 'alimentacao' | 'higiene' | 'comportamento' | 'vacinacao' | 'primeiros-socorros';
  ageGroup: 'filhote' | 'adulto' | 'idoso';
  thumbnail: string;
  type: 'text' | 'video';
  content: {
    description: string;
    steps: string[];
    tips: string[];
  };
  isFavorited?: boolean;
}

interface TutorialsScreenProps {
  onBack: () => void;
}

const TutorialsScreen = ({ onBack }: TutorialsScreenProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTutorial, setSelectedTutorial] = useState<Tutorial | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const categories = [
    { id: 'all', name: 'Todos', icon: Heart },
    { id: 'alimentacao', name: 'Alimentação', icon: Utensils },
    { id: 'higiene', name: 'Higiene', icon: Droplets },
    { id: 'comportamento', name: 'Comportamento', icon: Users },
    { id: 'vacinacao', name: 'Vacinação', icon: Syringe },
    { id: 'primeiros-socorros', name: 'Primeiros Socorros', icon: HelpCircle },
  ];

  const tutorials: Tutorial[] = [
    // Filhote - Alimentação
    {
      id: '1',
      title: 'Alimentação para Filhotes',
      category: 'alimentacao',
      ageGroup: 'filhote',
      thumbnail: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=300&h=200&fit=crop',
      type: 'text',
      content: {
        description: 'Aprenda como alimentar adequadamente seu filhote para garantir um crescimento saudável.',
        steps: [
          'Ofereça ração específica para filhotes até 12 meses',
          'Divida a alimentação em 3-4 refeições por dia',
          'Mantenha horários regulares de alimentação',
          'Sempre deixe água fresca disponível',
          'Evite dar comida humana, especialmente chocolate, cebola e alho'
        ],
        tips: [
          'Evite mudanças bruscas na alimentação',
          'Monitore o peso semanalmente',
          'Consulte o veterinário sobre suplementos',
          'A quantidade varia conforme o peso e raça do filhote'
        ]
      }
    },
    {
      id: '2',
      title: 'Introdução de Alimentos Sólidos',
      category: 'alimentacao',
      ageGroup: 'filhote',
      thumbnail: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=300&h=200&fit=crop',
      type: 'text',
      content: {
        description: 'Como fazer a transição do leite materno para alimentos sólidos de forma gradual.',
        steps: [
          'Inicie a transição entre 3-4 semanas de idade',
          'Umedeça a ração seca com água morna ou leite próprio para filhotes',
          'Ofereça pequenas porções várias vezes ao dia',
          'Diminua gradualmente a quantidade de líquido',
          'Complete a transição até as 8 semanas'
        ],
        tips: [
          'Tenha paciência - alguns filhotes demoram mais para se adaptar',
          'Use ração de alta qualidade específica para filhotes',
          'Mantenha sempre água limpa disponível',
          'Observe sinais de intolerância alimentar'
        ]
      }
    },

    // Filhote - Higiene
    {
      id: '3',
      title: 'Banho e Higiene Básica',
      category: 'higiene',
      ageGroup: 'filhote',
      thumbnail: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=300&h=200&fit=crop',
      type: 'text',
      content: {
        description: 'Como dar banho e manter a higiene do seu pet de forma segura.',
        steps: [
          'Use água morna e produtos específicos para pets',
          'Comece molhando as patas e depois o corpo',
          'Evite água nos ouvidos e olhos',
          'Seque bem após o banho',
          'Escove os pelos antes e depois do banho'
        ],
        tips: [
          'Filhotes só devem tomar banho após completar vacinação',
          'Use toalhas macias e secador em temperatura baixa',
          'Recompense com petiscos para criar associação positiva',
          'Banhos quinzenais são suficientes para a maioria dos pets'
        ]
      }
    },
    {
      id: '4',
      title: 'Cuidados com Dentes e Unhas',
      category: 'higiene',
      ageGroup: 'filhote',
      thumbnail: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=300&h=200&fit=crop',
      type: 'text',
      content: {
        description: 'Mantenha a saúde bucal e das unhas do seu filhote desde cedo.',
        steps: [
          'Escove os dentes 2-3 vezes por semana com pasta específica',
          'Use dedeira ou escova macia para filhotes',
          'Corte as unhas a cada 2-3 semanas',
          'Corte apenas a ponta branca, evitando a parte rosada',
          'Ofereça brinquedos para mastigar e limpar os dentes'
        ],
        tips: [
          'Comece cedo para acostumar o filhote',
          'Nunca use pasta de dente humana',
          'Se as unhas fazem barulho no chão, está na hora de cortar',
          'Procure um veterinário se houver sangramento nas gengivas'
        ]
      }
    },

    // Filhote - Comportamento
    {
      id: '5',
      title: 'Socialização de Filhotes',
      category: 'comportamento',
      ageGroup: 'filhote',
      thumbnail: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=300&h=200&fit=crop',
      type: 'text',
      content: {
        description: 'A importância da socialização precoce para o desenvolvimento comportamental.',
        steps: [
          'Apresente novos sons, cheiros e texturas gradualmente',
          'Permita interação supervisionada com outros pets',
          'Exponha a diferentes ambientes de forma controlada',
          'Use reforço positivo constantemente',
          'Organize encontros com pessoas de diferentes idades'
        ],
        tips: [
          'O período crítico é entre 3-14 semanas',
          'Mantenha experiências sempre positivas',
          'Consulte um adestrador se necessário',
          'Evite situações que possam assustar o filhote'
        ]
      }
    },
    {
      id: '6',
      title: 'Ensino de Necessidades no Local Correto',
      category: 'comportamento',
      ageGroup: 'filhote',
      thumbnail: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=300&h=200&fit=crop',
      type: 'text',
      content: {
        description: 'Como ensinar seu filhote a fazer as necessidades no local adequado.',
        steps: [
          'Estabeleça horários fixos para levar o filhote ao local',
          'Leve-o após acordar, comer e brincar',
          'Recompense imediatamente quando fizer no local correto',
          'Nunca brigue quando fizer no lugar errado',
          'Limpe acidentes com produtos enzimáticos'
        ],
        tips: [
          'Seja consistente e paciente',
          'Filhotes precisam sair a cada 2-3 horas',
          'Use comandos verbais específicos',
          'Acidentes são normais durante o aprendizado'
        ]
      }
    },

    // Filhote - Vacinação
    {
      id: '7',
      title: 'Calendário de Vacinação',
      category: 'vacinacao',
      ageGroup: 'filhote',
      thumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300&h=200&fit=crop',
      type: 'text',
      content: {
        description: 'Entenda o protocolo vacinal completo para filhotes.',
        steps: [
          '6-8 semanas: Primeira dose V8/V10',
          '10-12 semanas: Segunda dose V8/V10',
          '14-16 semanas: Terceira dose V8/V10 + Antirrábica',
          'Reforços anuais a partir de 1 ano',
          'Vermifugação a cada 15 dias até 6 meses'
        ],
        tips: [
          'Mantenha carteirinha sempre atualizada',
          'Não atrase as doses de reforço',
          'Consulte sobre vacinas opcionais (gripe canina, leishmaniose)',
          'Evite contato com outros animais antes da vacinação completa'
        ]
      }
    },

    // Adulto - Alimentação
    {
      id: '8',
      title: 'Alimentação Balanceada para Adultos',
      category: 'alimentacao',
      ageGroup: 'adulto',
      thumbnail: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=300&h=200&fit=crop',
      type: 'text',
      content: {
        description: 'Como manter uma dieta equilibrada para pets adultos.',
        steps: [
          'Ofereça ração premium adequada para a idade',
          'Divida em 2 refeições diárias',
          'Controle as porções conforme peso e atividade',
          'Mantenha horários regulares de alimentação',
          'Monitore o peso mensalmente'
        ],
        tips: [
          'Ajuste a quantidade conforme o nível de atividade',
          'Pets castrados tendem a ganhar peso mais facilmente',
          'Ofereça petiscos com moderação (máximo 10% da dieta)',
          'Consulte o veterinário sobre dietas especiais se necessário'
        ]
      }
    },
    {
      id: '9',
      title: 'Controle de Peso e Obesidade',
      category: 'alimentacao',
      ageGroup: 'adulto',
      thumbnail: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=300&h=200&fit=crop',
      type: 'text',
      content: {
        description: 'Prevenção e tratamento da obesidade em pets adultos.',
        steps: [
          'Avalie o escore corporal mensalmente',
          'Reduza petiscos e guloseimas',
          'Aumente a atividade física gradualmente',
          'Use ração light se recomendado pelo veterinário',
          'Monitore o progresso semanalmente'
        ],
        tips: [
          'Obesidade pode causar diabetes e problemas articulares',
          'Envolva toda a família no controle alimentar',
          'Exercícios aquáticos são excelentes para pets com sobrepeso',
          'Seja paciente - perda de peso saudável é gradual'
        ]
      }
    },

    // Adulto - Higiene
    {
      id: '10',
      title: 'Rotina de Higiene para Adultos',
      category: 'higiene',
      ageGroup: 'adulto',
      thumbnail: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=300&h=200&fit=crop',
      type: 'text',
      content: {
        description: 'Mantenha a higiene adequada do seu pet adulto.',
        steps: [
          'Banhos mensais ou conforme necessário',
          'Escovação diária para pelos longos, semanal para curtos',
          'Limpeza de ouvidos quinzenal',
          'Escovação dental 3x por semana',
          'Corte de unhas mensal'
        ],
        tips: [
          'Use produtos específicos para a pele do animal',
          'Observe sinais de problemas de pele ou parasitas',
          'Mantenha sempre produtos de higiene à mão',
          'Crie uma rotina para facilitar o processo'
        ]
      }
    },

    // Adulto - Comportamento
    {
      id: '11',
      title: 'Enriquecimento Ambiental',
      category: 'comportamento',
      ageGroup: 'adulto',
      thumbnail: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=300&h=200&fit=crop',
      type: 'text',
      content: {
        description: 'Como proporcionar estímulos adequados para pets adultos.',
        steps: [
          'Ofereça brinquedos variados e rotativos',
          'Crie desafios alimentares com brinquedos puzzle',
          'Estabeleça rotina de exercícios diários',
          'Proporcione interação social regular',
          'Mude ocasionalmente o ambiente interno'
        ],
        tips: [
          'Pets entediados podem desenvolver comportamentos destrutivos',
          'Combine exercícios físicos e mentais',
          'Adapte atividades conforme a idade e limitações',
          'Observe os brinquedos preferidos do seu pet'
        ]
      }
    },

    // Adulto - Primeiros Socorros
    {
      id: '12',
      title: 'Primeiros Socorros Básicos',
      category: 'primeiros-socorros',
      ageGroup: 'adulto',
      thumbnail: 'https://images.unsplash.com/photo-1517022812141-23620dba5c23?w=300&h=200&fit=crop',
      type: 'text',
      content: {
        description: 'Saiba como agir em emergências até chegar ao veterinário.',
        steps: [
          'Mantenha a calma e avalie a situação',
          'Contenha o animal de forma segura',
          'Aplique pressão em ferimentos que sangram',
          'Transporte com cuidado para o veterinário',
          'Documente o que aconteceu para relatar ao veterinário'
        ],
        tips: [
          'Tenha sempre o contato do veterinário de emergência',
          'Monte um kit de primeiros socorros',
          'Nunca medique sem orientação veterinária',
          'Mantenha números de emergência sempre acessíveis'
        ]
      }
    },
    {
      id: '13',
      title: 'Intoxicação e Envenenamento',
      category: 'primeiros-socorros',
      ageGroup: 'adulto',
      thumbnail: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=300&h=200&fit=crop',
      type: 'text',
      content: {
        description: 'Como identificar e agir em casos de intoxicação.',
        steps: [
          'Identifique a substância ingerida se possível',
          'Remova o animal da fonte de intoxicação',
          'NÃO induza vômito sem orientação veterinária',
          'Leve imediatamente ao veterinário',
          'Guarde embalagem da substância para mostrar ao veterinário'
        ],
        tips: [
          'Chocolate, uva, cebola e alho são tóxicos para pets',
          'Produtos de limpeza devem ficar fora do alcance',
          'Observe sintomas como vômito, diarreia e letargia',
          'Aja rapidamente - tempo é crucial em intoxicações'
        ]
      }
    },

    // Idoso - Alimentação
    {
      id: '14',
      title: 'Alimentação para Pets Idosos',
      category: 'alimentacao',
      ageGroup: 'idoso',
      thumbnail: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=300&h=200&fit=crop',
      type: 'text',
      content: {
        description: 'Ajuste a dieta conforme as necessidades de pets idosos.',
        steps: [
          'Use ração específica para pets sênior (7+ anos)',
          'Divida em refeições menores e mais frequentes',
          'Adicione suplementos se recomendado pelo veterinário',
          'Monitore a hidratação constantemente',
          'Adapte textura se houver problemas dentários'
        ],
        tips: [
          'Pets idosos podem ter menos apetite',
          'Problemas renais são comuns nessa idade',
          'Mantenha peso ideal para evitar sobrecarga articular',
          'Consulte veterinário sobre dieta terapêutica'
        ]
      }
    },

    // Idoso - Cuidados Especiais
    {
      id: '15',
      title: 'Cuidados com Articulações',
      category: 'primeiros-socorros',
      ageGroup: 'idoso',
      thumbnail: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=300&h=200&fit=crop',
      type: 'text',
      content: {
        description: 'Como cuidar das articulações de pets idosos.',
        steps: [
          'Proporcione cama ortopédica confortável',
          'Mantenha exercícios leves e regulares',
          'Evite saltos e exercícios de alto impacto',
          'Use rampas para acessar locais altos',
          'Observe sinais de dor ou dificuldade de movimento'
        ],
        tips: [
          'Calor pode aliviar dores articulares',
          'Fisioterapia veterinária pode ajudar',
          'Medicamentos devem ser prescritos pelo veterinário',
          'Massagens suaves podem proporcionar alívio'
        ]
      }
    },

    // Idoso - Higiene
    {
      id: '16',
      title: 'Higiene Especial para Idosos',
      category: 'higiene',
      ageGroup: 'idoso',
      thumbnail: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=300&h=200&fit=crop',
      type: 'text',
      content: {
        description: 'Adapte a rotina de higiene para pets mais velhos.',
        steps: [
          'Use banho seco se o pet tiver dificuldades',
          'Escove mais frequentemente para evitar nós',
          'Limpe ao redor dos olhos diariamente',
          'Monitore unhas - podem crescer mais rápido',
          'Use produtos suaves específicos para pele sensível'
        ],
        tips: [
          'Pets idosos podem ter pele mais sensível',
          'Atenção especial para higiene íntima',
          'Banhos mornos são mais confortáveis',
          'Seque bem para evitar fungos e bactérias'
        ]
      }
    }
  ];

  const filteredTutorials = tutorials.filter(tutorial => 
    selectedCategory === 'all' || tutorial.category === selectedCategory
  );

  const toggleFavorite = (tutorialId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(tutorialId)) {
      newFavorites.delete(tutorialId);
    } else {
      newFavorites.add(tutorialId);
    }
    setFavorites(newFavorites);
  };

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.icon : Heart;
  };

  if (selectedTutorial) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Button 
              variant="outline" 
              onClick={() => setSelectedTutorial(null)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
            <h1 className="text-2xl font-bold">{selectedTutorial.title}</h1>
            <Button
              variant="outline"
              size="sm"
              onClick={() => toggleFavorite(selectedTutorial.id)}
              className="ml-auto"
            >
              <Star className={`h-4 w-4 ${favorites.has(selectedTutorial.id) ? 'fill-yellow-400 text-yellow-400' : ''}`} />
            </Button>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="mb-6">
                <img 
                  src={selectedTutorial.thumbnail} 
                  alt={selectedTutorial.title}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                {selectedTutorial.type === 'video' && (
                  <div className="flex items-center gap-2 text-blue-600 mb-4">
                    <Play className="h-5 w-5" />
                    <span className="text-sm font-medium">Conteúdo em Vídeo</span>
                  </div>
                )}
              </div>

              <div className="prose max-w-none">
                <h3 className="text-lg font-semibold mb-3">Descrição</h3>
                <p className="text-gray-600 mb-6">{selectedTutorial.content.description}</p>

                <h3 className="text-lg font-semibold mb-3">Passo a Passo</h3>
                <ol className="space-y-2 mb-6">
                  {selectedTutorial.content.steps.map((step, index) => (
                    <li key={index} className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full text-sm flex items-center justify-center">
                        {index + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>

                <h3 className="text-lg font-semibold mb-3">Dicas Importantes</h3>
                <ul className="space-y-2">
                  {selectedTutorial.content.tips.map((tip, index) => (
                    <li key={index} className="flex gap-3">
                      <span className="text-green-500 mt-1">💡</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
          <h1 className="text-3xl font-bold">Tutoriais de Cuidados</h1>
        </div>

        <Tabs defaultValue="filhote" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="filhote">Filhote</TabsTrigger>
            <TabsTrigger value="adulto">Adulto</TabsTrigger>
            <TabsTrigger value="idoso">Idoso</TabsTrigger>
          </TabsList>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="flex items-center gap-2"
                >
                  <Icon className="h-4 w-4" />
                  {category.name}
                </Button>
              );
            })}
          </div>

          <TabsContent value="filhote" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTutorials
                .filter(tutorial => tutorial.ageGroup === 'filhote')
                .map((tutorial) => {
                  const CategoryIcon = getCategoryIcon(tutorial.category);
                  return (
                    <Card key={tutorial.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardContent className="p-4">
                        <div className="relative mb-4">
                          <img 
                            src={tutorial.thumbnail} 
                            alt={tutorial.title}
                            className="w-full h-40 object-cover rounded-md"
                          />
                          {tutorial.type === 'video' && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-md">
                              <Play className="h-12 w-12 text-white" />
                            </div>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(tutorial.id);
                            }}
                            className="absolute top-2 right-2 bg-white"
                          >
                            <Star className={`h-4 w-4 ${favorites.has(tutorial.id) ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                          </Button>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <CategoryIcon className="h-4 w-4 text-blue-600" />
                            <Badge variant="outline" className="text-xs">
                              {categories.find(cat => cat.id === tutorial.category)?.name}
                            </Badge>
                          </div>
                          
                          <h3 className="font-semibold text-lg">{tutorial.title}</h3>
                          
                          <p className="text-gray-600 text-sm line-clamp-2">
                            {tutorial.content.description}
                          </p>
                          
                          <Button 
                            className="w-full" 
                            onClick={() => setSelectedTutorial(tutorial)}
                          >
                            Ver Tutorial
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
            </div>
          </TabsContent>

          <TabsContent value="adulto" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTutorials
                .filter(tutorial => tutorial.ageGroup === 'adulto')
                .map((tutorial) => {
                  const CategoryIcon = getCategoryIcon(tutorial.category);
                  return (
                    <Card key={tutorial.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardContent className="p-4">
                        <div className="relative mb-4">
                          <img 
                            src={tutorial.thumbnail} 
                            alt={tutorial.title}
                            className="w-full h-40 object-cover rounded-md"
                          />
                          {tutorial.type === 'video' && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-md">
                              <Play className="h-12 w-12 text-white" />
                            </div>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(tutorial.id);
                            }}
                            className="absolute top-2 right-2 bg-white"
                          >
                            <Star className={`h-4 w-4 ${favorites.has(tutorial.id) ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                          </Button>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <CategoryIcon className="h-4 w-4 text-blue-600" />
                            <Badge variant="outline" className="text-xs">
                              {categories.find(cat => cat.id === tutorial.category)?.name}
                            </Badge>
                          </div>
                          
                          <h3 className="font-semibold text-lg">{tutorial.title}</h3>
                          
                          <p className="text-gray-600 text-sm line-clamp-2">
                            {tutorial.content.description}
                          </p>
                          
                          <Button 
                            className="w-full" 
                            onClick={() => setSelectedTutorial(tutorial)}
                          >
                            Ver Tutorial
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
            </div>
          </TabsContent>

          <TabsContent value="idoso" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTutorials
                .filter(tutorial => tutorial.ageGroup === 'idoso')
                .map((tutorial) => {
                  const CategoryIcon = getCategoryIcon(tutorial.category);
                  return (
                    <Card key={tutorial.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardContent className="p-4">
                        <div className="relative mb-4">
                          <img 
                            src={tutorial.thumbnail} 
                            alt={tutorial.title}
                            className="w-full h-40 object-cover rounded-md"
                          />
                          {tutorial.type === 'video' && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-md">
                              <Play className="h-12 w-12 text-white" />
                            </div>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(tutorial.id);
                            }}
                            className="absolute top-2 right-2 bg-white"
                          >
                            <Star className={`h-4 w-4 ${favorites.has(tutorial.id) ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                          </Button>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <CategoryIcon className="h-4 w-4 text-blue-600" />
                            <Badge variant="outline" className="text-xs">
                              {categories.find(cat => cat.id === tutorial.category)?.name}
                            </Badge>
                          </div>
                          
                          <h3 className="font-semibold text-lg">{tutorial.title}</h3>
                          
                          <p className="text-gray-600 text-sm line-clamp-2">
                            {tutorial.content.description}
                          </p>
                          
                          <Button 
                            className="w-full" 
                            onClick={() => setSelectedTutorial(tutorial)}
                          >
                            Ver Tutorial
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TutorialsScreen;
