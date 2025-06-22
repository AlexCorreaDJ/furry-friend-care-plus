
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dog, Plus, Syringe, Calendar, Heart } from "lucide-react";

interface EmptyStateProps {
  onAddPet: () => void;
}

const EmptyState = ({ onAddPet }: EmptyStateProps) => {
  return (
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
        onClick={onAddPet}
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
  );
};

export default EmptyState;
