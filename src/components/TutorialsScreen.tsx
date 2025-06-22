
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
          'Sempre deixe água fresca disponível'
        ],
        tips: [
          'Evite mudanças bruscas na alimentação',
          'Monitore o peso semanalmente',
          'Consulte o veterinário sobre suplementos'
        ]
      }
    },
    {
      id: '2',
      title: 'Banho e Higiene Básica',
      category: 'higiene',
      ageGroup: 'filhote',
      thumbnail: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=300&h=200&fit=crop',
      type: 'video',
      content: {
        description: 'Como dar banho e manter a higiene do seu pet de forma segura.',
        steps: [
          'Use água morna e produtos específicos para pets',
          'Comece molhando as patas e depois o corpo',
          'Evite água nos ouvidos e olhos',
          'Seque bem após o banho'
        ],
        tips: [
          'Filhotes só devem tomar banho após completar vacinação',
          'Use toalhas macias e secador em temperatura baixa',
          'Recompense com petiscos para criar associação positiva'
        ]
      }
    },
    {
      id: '3',
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
          'Use reforço positivo constantemente'
        ],
        tips: [
          'O período crítico é entre 3-14 semanas',
          'Mantenha experiências sempre positivas',
          'Consulte um adestrador se necessário'
        ]
      }
    },
    {
      id: '4',
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
          'Reforços anuais a partir de 1 ano'
        ],
        tips: [
          'Mantenha carteirinha sempre atualizada',
          'Não atrase as doses de reforço',
          'Consulte sobre vacinas opcionais (gripe canina, leishmaniose)'
        ]
      }
    },
    {
      id: '5',
      title: 'Primeiros Socorros Básicos',
      category: 'primeiros-socorros',
      ageGroup: 'adulto',
      thumbnail: 'https://images.unsplash.com/photo-1517022812141-23620dba5c23?w=300&h=200&fit=crop',
      type: 'video',
      content: {
        description: 'Saiba como agir em emergências até chegar ao veterinário.',
        steps: [
          'Mantenha a calma e avalie a situação',
          'Contenha o animal de forma segura',
          'Aplique pressão em ferimentos que sangram',
          'Transporte com cuidado para o veterinário'
        ],
        tips: [
          'Tenha sempre o contato do veterinário de emergência',
          'Monte um kit de primeiros socorros',
          'Nunca medique sem orientação veterinária'
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
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                Tutoriais para Pets Idosos em Breve
              </h3>
              <p className="text-gray-500">
                Estamos preparando conteúdo especializado para cuidados com pets idosos.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TutorialsScreen;
