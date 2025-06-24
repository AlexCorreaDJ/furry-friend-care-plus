import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ArrowLeft, Calendar, Syringe, Heart, Users, BookOpen, GraduationCap, Trash2 } from "lucide-react";
import VaccinationCard from './VaccinationCard';
import TimelineCard from './TimelineCard';
import CareScheduleCard from './CareScheduleCard';
import VetProfileCard from './VetProfileCard';
import TutorialsScreen from './TutorialsScreen';
import DevelopmentTrainingScreen from './DevelopmentTrainingScreen';
import ResponsiveLayout from './ResponsiveLayout';
import { useScreenDimensions } from '@/hooks/useScreenDimensions';

interface PetDashboardProps {
  pet: any;
  onBack: () => void;
  onDelete: (petId: number) => void;
}

const PetDashboard = ({ pet, onBack, onDelete }: PetDashboardProps) => {
  const [activeScreen, setActiveScreen] = useState<'dashboard' | 'tutorials' | 'development'>('dashboard');
  const { isSmallScreen, isPortrait } = useScreenDimensions();

  const calculateAge = (birthDate: string) => {
    if (!birthDate) return '0 meses';
    
    const today = new Date();
    const birth = new Date(birthDate);
    const diffTime = Math.abs(today.getTime() - birth.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffMonths / 12);
    
    if (diffYears > 0) {
      return `${diffYears} ano${diffYears > 1 ? 's' : ''}`;
    } else {
      return `${diffMonths} mes${diffMonths !== 1 ? 'es' : ''}`;
    }
  };

  const handleDeletePet = () => {
    onDelete(pet.id);
  };

  if (activeScreen === 'tutorials') {
    return <TutorialsScreen onBack={() => setActiveScreen('dashboard')} />;
  }

  if (activeScreen === 'development') {
    return <DevelopmentTrainingScreen pet={pet} onBack={() => setActiveScreen('dashboard')} />;
  }

  return (
    <ResponsiveLayout>
      <div className={`flex ${isSmallScreen ? 'flex-col gap-4' : 'flex-row items-center justify-between'} mb-6`}>
        <Button 
          variant="outline" 
          onClick={onBack}
          className="flex items-center gap-2 touch-optimized"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar aos Pets
        </Button>
        
        <div className={`flex ${isSmallScreen ? 'flex-col gap-2' : 'gap-3'}`}>
          <Button 
            onClick={() => setActiveScreen('development')}
            className={`flex items-center gap-2 bg-purple-600 hover:bg-purple-700 touch-optimized ${isSmallScreen ? 'w-full' : ''}`}
          >
            <GraduationCap className="h-4 w-4" />
            Desenvolvimento
          </Button>
          
          <Button 
            onClick={() => setActiveScreen('tutorials')}
            className={`flex items-center gap-2 bg-green-600 hover:bg-green-700 touch-optimized ${isSmallScreen ? 'w-full' : ''}`}
          >
            <BookOpen className="h-4 w-4" />
            Tutoriais
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button 
                variant="destructive"
                className={`flex items-center gap-2 touch-optimized ${isSmallScreen ? 'w-full' : ''}`}
              >
                <Trash2 className="h-4 w-4" />
                Excluir Pet
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className={isSmallScreen ? 'w-[90vw] max-w-md' : ''}>
              <AlertDialogHeader>
                <AlertDialogTitle>Excluir Pet</AlertDialogTitle>
                <AlertDialogDescription>
                  Tem certeza que deseja excluir {pet?.name}? Esta ação não pode ser desfeita e todos os dados do pet serão perdidos permanentemente.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className={isSmallScreen ? 'flex-col gap-2' : ''}>
                <AlertDialogCancel className={isSmallScreen ? 'w-full' : ''}>Cancelar</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={handleDeletePet} 
                  className={`bg-red-600 hover:bg-red-700 ${isSmallScreen ? 'w-full' : ''}`}
                >
                  Excluir
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="space-y-6">
        {/* Pet Info Card - responsivo */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className={`flex items-center ${isSmallScreen ? 'flex-col text-center gap-4' : 'gap-4'}`}>
            <div className={`${isSmallScreen ? 'w-20 h-20' : 'w-16 h-16'} bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold`}>
              {pet?.name?.charAt(0).toUpperCase() || 'P'}
            </div>
            <div>
              <h1 className={`${isSmallScreen ? 'text-xl' : 'text-2xl'} font-bold text-gray-900`}>{pet?.name || 'Pet'}</h1>
              <p className="text-gray-600 capitalize">{pet?.breed || 'Raça não informada'}</p>
              <p className="text-sm text-gray-500">{calculateAge(pet?.birthDate)}</p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="vacinacao" className="space-y-6">
          <TabsList className={`grid w-full ${isSmallScreen && isPortrait ? 'grid-cols-2 gap-1' : 'grid-cols-4'}`}>
            <TabsTrigger value="vacinacao" className={`flex items-center gap-2 ${isSmallScreen ? 'text-xs px-2' : ''}`}>
              <Syringe className="h-4 w-4" />
              {isSmallScreen ? 'Vacina' : 'Vacinação'}
            </TabsTrigger>
            <TabsTrigger value="cronograma" className={`flex items-center gap-2 ${isSmallScreen ? 'text-xs px-2' : ''}`}>
              <Calendar className="h-4 w-4" />
              {isSmallScreen ? 'Tempo' : 'Cronograma'}
            </TabsTrigger>
            <TabsTrigger value="cuidados" className={`flex items-center gap-2 ${isSmallScreen ? 'text-xs px-2' : ''}`}>
              <Heart className="h-4 w-4" />
              Cuidados
            </TabsTrigger>
            <TabsTrigger value="veterinario" className={`flex items-center gap-2 ${isSmallScreen ? 'text-xs px-2' : ''}`}>
              <Users className="h-4 w-4" />
              {isSmallScreen ? 'Vet' : 'Veterinário'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="vacinacao">
            <VaccinationCard pet={pet} />
          </TabsContent>

          <TabsContent value="cronograma">
            <TimelineCard pet={pet} />
          </TabsContent>

          <TabsContent value="cuidados">
            <CareScheduleCard pet={pet} />
          </TabsContent>

          <TabsContent value="veterinario">
            <VetProfileCard pet={pet} />
          </TabsContent>
        </Tabs>
      </div>
    </ResponsiveLayout>
  );
};

export default PetDashboard;
