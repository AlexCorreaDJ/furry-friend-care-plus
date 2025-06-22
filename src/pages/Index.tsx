
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Calendar, Syringe, Dog, Cat, Plus } from "lucide-react";
import { useState } from 'react';
import PetRegistration from '@/components/PetRegistration';
import PetDashboard from '@/components/PetDashboard';

const Index = () => {
  const [pets, setPets] = useState([]);
  const [showRegistration, setShowRegistration] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);

  const handlePetRegistered = (newPet) => {
    setPets([...pets, { ...newPet, id: Date.now() }]);
    setShowRegistration(false);
  };

  const handlePetSelect = (pet) => {
    setSelectedPet(pet);
  };

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
          /* Pets Grid */
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Meus Pets</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pets.map((pet) => (
                <Card
                  key={pet.id}
                  className="bg-white shadow-lg hover:shadow-xl transition-all cursor-pointer transform hover:scale-105"
                  onClick={() => handlePetSelect(pet)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="bg-gradient-to-br from-blue-400 to-purple-500 rounded-full w-16 h-16 flex items-center justify-center text-white text-2xl font-bold">
                        {pet.species === 'dog' ? <Dog className="h-8 w-8" /> : <Cat className="h-8 w-8" />}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900">{pet.name}</h3>
                        <p className="text-gray-600 capitalize">{pet.breed}</p>
                        <p className="text-sm text-gray-500">{pet.age}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        {pet.species === 'dog' ? 'Cachorro' : 'Gato'}
                      </span>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        {pet.weight}kg
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
