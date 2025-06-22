
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Dog, Cat, Camera } from "lucide-react";

const PetRegistration = ({ onPetRegistered, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    breed: '',
    birthDate: '',
    gender: '',
    weight: '',
    medicalHistory: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateAge = (birthDate) => {
    if (!birthDate) return '';
    const today = new Date();
    const birth = new Date(birthDate);
    const months = (today.getFullYear() - birth.getFullYear()) * 12 + today.getMonth() - birth.getMonth();
    
    if (months < 12) {
      return `${months} meses`;
    } else {
      const years = Math.floor(months / 12);
      return `${years} ano${years > 1 ? 's' : ''}`;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.species && formData.birthDate) {
      const age = calculateAge(formData.birthDate);
      onPetRegistered({ ...formData, age });
    }
  };

  const dogBreeds = [
    'Labrador', 'Golden Retriever', 'Bulldog', 'Pastor Alemão', 'Beagle',
    'Poodle', 'Rottweiler', 'Yorkshire', 'Chihuahua', 'Boxer', 'SRD (Sem Raça Definida)'
  ];

  const catBreeds = [
    'Persa', 'Siamês', 'Maine Coon', 'British Shorthair', 'Ragdoll',
    'Bengal', 'Sphynx', 'Angorá', 'SRD (Sem Raça Definida)'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onCancel} className="p-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Cadastrar Novo Pet</h1>
              <p className="text-sm text-gray-600">Preencha as informações do seu companheiro</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Dog className="h-5 w-5 text-blue-500" />
              Informações Básicas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Photo Upload Placeholder */}
              <div className="flex flex-col items-center gap-4">
                <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center border-2 border-dashed border-gray-300">
                  <Camera className="h-8 w-8 text-gray-400" />
                </div>
                <Button type="button" variant="outline" size="sm">
                  Adicionar Foto
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome do Pet *</Label>
                  <Input
                    id="name"
                    placeholder="Ex: Rex, Mimi, Bolinha..."
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Espécie *</Label>
                  <Select value={formData.species} onValueChange={(value) => handleInputChange('species', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a espécie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dog">
                        <div className="flex items-center gap-2">
                          <Dog className="h-4 w-4" />
                          Cachorro
                        </div>
                      </SelectItem>
                      <SelectItem value="cat">
                        <div className="flex items-center gap-2">
                          <Cat className="h-4 w-4" />
                          Gato
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Raça</Label>
                  <Select 
                    value={formData.breed} 
                    onValueChange={(value) => handleInputChange('breed', value)}
                    disabled={!formData.species}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a raça" />
                    </SelectTrigger>
                    <SelectContent>
                      {(formData.species === 'dog' ? dogBreeds : catBreeds).map((breed) => (
                        <SelectItem key={breed} value={breed}>
                          {breed}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="birthDate">Data de Nascimento *</Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) => handleInputChange('birthDate', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Sexo</Label>
                  <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o sexo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Macho</SelectItem>
                      <SelectItem value="female">Fêmea</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weight">Peso Atual (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    step="0.1"
                    placeholder="Ex: 5.5"
                    value={formData.weight}
                    onChange={(e) => handleInputChange('weight', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="medicalHistory">Histórico Médico (Opcional)</Label>
                <textarea
                  id="medicalHistory"
                  className="w-full p-3 border border-gray-300 rounded-md resize-none h-24"
                  placeholder="Descreva qualquer condição médica, alergia ou tratamento anterior..."
                  value={formData.medicalHistory}
                  onChange={(e) => handleInputChange('medicalHistory', e.target.value)}
                />
              </div>

              <div className="flex gap-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-blue-500 hover:bg-blue-600"
                  disabled={!formData.name || !formData.species || !formData.birthDate}
                >
                  Cadastrar Pet
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PetRegistration;
