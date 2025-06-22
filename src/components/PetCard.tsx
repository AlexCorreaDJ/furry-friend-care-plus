
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dog, Cat, Syringe, Calendar, Heart, AlertCircle } from "lucide-react";

interface Pet {
  id: number;
  name: string;
  species: string;
  breed: string;
  birthDate: string;
  weight: number;
  vaccinationProgress?: number;
  nextEvent?: {
    type: string;
    title: string;
    date: string;
    daysLeft: number;
  };
  notifications?: number;
}

interface PetCardProps {
  pet: Pet;
  onSelect: (pet: Pet) => void;
  calculateAge: (birthDate: string) => string;
}

const PetCard = ({ pet, onSelect, calculateAge }: PetCardProps) => {
  const getEventIcon = (eventType: string) => {
    switch (eventType) {
      case 'vaccination':
        return <Syringe className="h-4 w-4" />;
      case 'consultation':
        return <Heart className="h-4 w-4" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };

  const getEventColor = (daysLeft: number) => {
    if (daysLeft <= 7) return 'text-red-600 bg-red-50';
    if (daysLeft <= 14) return 'text-orange-600 bg-orange-50';
    return 'text-green-600 bg-green-50';
  };

  return (
    <Card
      className="bg-white shadow-lg hover:shadow-xl transition-all cursor-pointer transform hover:scale-105 relative"
      onClick={() => onSelect(pet)}
    >
      {pet.notifications && pet.notifications > 0 && (
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
          {pet.nextEvent?.daysLeft && pet.nextEvent.daysLeft <= 7 && (
            <Badge variant="destructive" className="text-xs flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              Urgente
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PetCard;
