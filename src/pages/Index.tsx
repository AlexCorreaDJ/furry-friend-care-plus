
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Heart, Calendar, Syringe, Dog, Cat, Plus, Bell, AlertCircle } from "lucide-react";
import { useState } from 'react';
import PetRegistration from '@/components/PetRegistration';
import PetDashboard from '@/components/PetDashboard';
import Auth from '@/components/Auth';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pets, setPets] = useState([]);
  const [showRegistration, setShowRegistration] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  const handlePetRegistered = (newPet) => {
    const petWithProgress = {
      ...newPet,
      id: Date.now(),
      vaccinationProgress: 60, // Simulação de progresso
      nextEvent: {
        type: 'vaccination',
        title: 'Vacina Antirrábica',
        date: '2025-01-15',
        daysLeft: 24
      },
      notifications: 2
    };
    setPets([...pets, petWithProgress]);
    setShowRegistration(false);
  };

  const handlePetSelect = (pet) => {
    setSelectedPet(pet);
  };

  const calculateAge = (birthDate) => {
    if (!birthDate) return 'Idade não informada';
    
    const today = new Date();
    const birth = new Date(birthDate);
    const diffTime = Math.abs(today - birth);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffMonths / 12);
    
    if (diffYears > 0) {
      const remainingMonths = diffMonths % 12;
      return remainingMonths > 0 ? `${diffYears} ano${diffYears > 1 ? 's' : ''} e ${remainingMonths} mês${remainingMonths > 1 ? 'es' : ''}` : `${diffYears} ano${diffYears > 1 ? 's' : ''}`;
    } else if (diffMonths > 0) {
      return `${diffMonths} mês${diffMonths > 1 ? 'es' : ''}`;
    } else {
      return `${diffDays} dia${diffDays > 1 ? 's' : ''}`;
    }
  };

  const getEventIcon = (eventType) => {
    switch (eventType) {
      case 'vaccination':
        return <Syringe className="h-4 w-4" />;
      case 'consultation':
        return <Heart className="h-4 w-4" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };

  const getEventColor = (daysLeft) => {
    if (daysLeft <= 7) return 'text-red-600 bg-red-50';
    if (daysLeft <= 14) return 'text-orange-600 bg-orange-50';
    return 'text-green-600 bg-green-50';
  };

  // Show Auth screen if not authenticated
  if (!isAuthenticated) {
    return <Auth onAuthSuccess={handleAuthSuccess} />;
  }

  if (selectedPet) {
    return <PetDashboard pet={selectedPet} onBack={() => setSelectedPet(null)} />;
  }

  if (showRegistration) {
    return (
      <PetRegistration
        onPetRegistered={handlePetRegistered}
        onCancel={() => setShowRegistration(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-500 p-2 rounded-lg">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">PetCare+</h1>
                <p className="text-sm text-gray-600">Carteira digital de saúde para pets</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {pets.some(pet => pet.notifications > 0) && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {pets.reduce((total, pet) => total + (pet.notifications || 0), 0)}
                  </span>
                )}
              </Button>
              <Button
                onClick={() => setShowRegistration(true)}
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Cadastrar Pet
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {pets.length === 0 ? (
          /* Empty State */
          <div className="text-center py-16">
            <div className="bg-white rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center shadow-lg">
              <Dog className="h-12 w-12 text-blue-500" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Bem-vindo ao PetCare+
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              A carteira digital completa para cuidar da saúde e bem-estar do seu pet. 
              Registre vacinas, acompanhe o crescimento e receba lembretes importantes.
            </p>
            <Button
              onClick={() => setShowRegistration(true)}
              size="lg"
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 text-lg"
            >
              <Plus className="h-5 w-5 mr-2" />
              Cadastrar Primeiro Pet
            </Button>
            
            {/* Features Preview */}
            <div className="grid md:grid-cols-3 gap-6 mt-16 text-left">
              <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="text-center">
                  <div className="bg-blue-100 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                    <Syringe className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">Carteira de Vacinação</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Mantenha o histórico de vacinas sempre atualizado com lembretes automáticos
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="text-center">
                  <div className="bg-green-100 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle className="text-lg">Linha do Tempo</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Acompanhe cada fase da vida do seu pet com cuidados personalizados
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="text-center">
                  <div className="bg-purple-100 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                    <Heart className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle className="text-lg">Cuidado Completo</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Tutoriais, dicas e acompanhamento veterinário em um só lugar
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          /* Pets Home Dashboard */
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Meus Pets</h2>
              <Badge variant="outline" className="text-gray-600">
                {pets.length} pet{pets.length > 1 ? 's' : ''} cadastrado{pets.length > 1 ? 's' : ''}
              </Badge>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pets.map((pet) => (
                <Card
                  key={pet.id}
                  className="bg-white shadow-lg hover:shadow-xl transition-all cursor-pointer transform hover:scale-105 relative"
                  onClick={() => handlePetSelect(pet)}
                >
                  {pet.notifications > 0 && (
                    <div className="absolute -top-2 -right-2 z-10">
                      <div className="bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold">
                        {pet.notifications}
                      </div>
                    </div>
                  )}
                  
                  <CardContent className="p-6">
                    {/* Pet Header */}
                    <div className="flex items-center gap-4 mb-4">
                      <Avatar className="w-16 h-16">
                        <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 text-white text-xl font-bold">
                          {pet.species === 'dog' ? <Dog className="h-8 w-8" /> : <Cat className="h-8 w-8" />}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900">{pet.name}</h3>
                        <p className="text-gray-600 capitalize">{pet.breed}</p>
                        <p className="text-sm text-gray-500">{calculateAge(pet.birthDate)}</p>
                      </div>
                    </div>

                    {/* Vaccination Progress */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Vacinas</span>
                        <span className="text-sm text-gray-600">{pet.vaccinationProgress || 0}%</span>
                      </div>
                      <Progress value={pet.vaccinationProgress || 0} className="h-2" />
                    </div>

                    {/* Next Event */}
                    {pet.nextEvent && (
                      <div className={`p-3 rounded-lg mb-4 ${getEventColor(pet.nextEvent.daysLeft)}`}>
                        <div className="flex items-center gap-2 mb-1">
                          {getEventIcon(pet.nextEvent.type)}
                          <span className="text-sm font-medium">{pet.nextEvent.title}</span>
                        </div>
                        <p className="text-xs">
                          {pet.nextEvent.daysLeft === 0 
                            ? 'Hoje!' 
                            : `Em ${pet.nextEvent.daysLeft} dia${pet.nextEvent.daysLeft > 1 ? 's' : ''}`
                          }
                        </p>
                      </div>
                    )}

                    {/* Tags */}
                    <div className="flex gap-2 flex-wrap">
                      <Badge variant="secondary" className="text-xs">
                        {pet.species === 'dog' ? 'Cachorro' : 'Gato'}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {pet.weight}kg
                      </Badge>
                      {pet.nextEvent?.daysLeft <= 7 && (
                        <Badge variant="destructive" className="text-xs flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          Urgente
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      {pets.length > 0 && (
        <Button
          onClick={() => setShowRegistration(true)}
          size="lg"
          className="fixed bottom-6 right-6 rounded-full w-14 h-14 bg-green-500 hover:bg-green-600 shadow-lg hover:shadow-xl transition-all"
        >
          <Plus className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
};

export default Index;
