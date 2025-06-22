
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Vaccine, Heart, Dog, Cat, Plus } from "lucide-react";
import VaccinationCard from '@/components/VaccinationCard';
import TimelineCard from '@/components/TimelineCard';
import VetProfileCard from '@/components/VetProfileCard';

const PetDashboard = ({ pet, onBack }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Visão Geral', icon: Heart },
    { id: 'vaccination', label: 'Vacinação', icon: Vaccine },
    { id: 'timeline', label: 'Linha do Tempo', icon: Calendar },
    { id: 'vet', label: 'Veterinário', icon: Heart }
  ];

  const getAgeInMonths = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    return (today.getFullYear() - birth.getFullYear()) * 12 + today.getMonth() - birth.getMonth();
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'vaccination':
        return <VaccinationCard pet={pet} />;
      case 'timeline':
        return <TimelineCard pet={pet} />;
      case 'vet':
        return <VetProfileCard pet={pet} />;
      default:
        return (
          <div className="space-y-6">
            {/* Pet Info Card */}
            <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center gap-6">
                  <div className="bg-white/20 rounded-full w-20 h-20 flex items-center justify-center">
                    {pet.species === 'dog' ? <Dog className="h-10 w-10" /> : <Cat className="h-10 w-10" />}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold">{pet.name}</h2>
                    <p className="text-blue-100 text-lg">{pet.breed}</p>
                    <div className="flex gap-4 mt-2">
                      <span className="text-blue-100">{pet.age}</span>
                      <span className="text-blue-100">•</span>
                      <span className="text-blue-100">{pet.weight}kg</span>
                      <span className="text-blue-100">•</span>
                      <span className="text-blue-100 capitalize">
                        {pet.gender === 'male' ? 'Macho' : 'Fêmea'}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="bg-green-100 rounded-full w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                    <Vaccine className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Vacinas em Dia</h3>
                  <p className="text-2xl font-bold text-green-600">3/5</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <div className="bg-orange-100 rounded-full w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Próxima Consulta</h3>
                  <p className="text-sm text-gray-600">Em 15 dias</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <div className="bg-blue-100 rounded-full w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                    <Heart className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Estado Geral</h3>
                  <Badge className="bg-green-100 text-green-800">Saudável</Badge>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Atividade Recente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <div className="bg-green-500 rounded-full w-8 h-8 flex items-center justify-center">
                      <Vaccine className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">Vacina V10 aplicada</p>
                      <p className="text-sm text-gray-600">Há 2 semanas</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="bg-blue-500 rounded-full w-8 h-8 flex items-center justify-center">
                      <Calendar className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">Consulta de rotina</p>
                      <p className="text-sm text-gray-600">Há 1 mês</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onBack} className="p-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{pet.name}</h1>
              <p className="text-sm text-gray-600">Carteira de saúde digital</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "default" : "ghost"}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 ${
                    activeTab === tab.id 
                      ? "bg-blue-500 text-white" 
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {renderContent()}
      </div>
    </div>
  );
};

export default PetDashboard;
