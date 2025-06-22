
import React from 'react';
import { Badge } from "@/components/ui/badge";
import PetCard from './PetCard';

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

interface PetListProps {
  pets: Pet[];
  onPetSelect: (pet: Pet) => void;
  calculateAge: (birthDate: string) => string;
}

const PetList = ({ pets, onPetSelect, calculateAge }: PetListProps) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Meus Pets</h2>
        <Badge variant="outline" className="text-gray-600">
          {pets.length} pet{pets.length > 1 ? 's' : ''} cadastrado{pets.length > 1 ? 's' : ''}
        </Badge>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pets.map((pet) => (
          <PetCard
            key={pet.id}
            pet={pet}
            onSelect={onPetSelect}
            calculateAge={calculateAge}
          />
        ))}
      </div>
    </div>
  );
};

export default PetList;
