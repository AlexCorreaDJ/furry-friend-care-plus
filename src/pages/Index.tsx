
import React from 'react';
import { useState } from 'react';
import PetRegistration from '@/components/PetRegistration';
import PetDashboard from '@/components/PetDashboard';
import NotificationsScreen from '@/components/NotificationsScreen';
import Auth from '@/components/Auth';
import Header from '@/components/Header';
import EmptyState from '@/components/EmptyState';
import PetList from '@/components/PetList';
import FloatingActionButton from '@/components/FloatingActionButton';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pets, setPets] = useState([]);
  const [showRegistration, setShowRegistration] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
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
    const diffTime = Math.abs(today.getTime() - birth.getTime());
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

  const getTotalNotifications = () => {
    return pets.reduce((total, pet) => total + (pet.notifications || 0), 0);
  };

  // Show Auth screen if not authenticated
  if (!isAuthenticated) {
    return <Auth onAuthSuccess={handleAuthSuccess} />;
  }

  if (showNotifications) {
    return (
      <NotificationsScreen 
        pets={pets}
        onBack={() => setShowNotifications(false)} 
      />
    );
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
      <Header
        totalNotifications={getTotalNotifications()}
        onAddPet={() => setShowRegistration(true)}
        onShowNotifications={() => setShowNotifications(true)}
      />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {pets.length === 0 ? (
          <EmptyState onAddPet={() => setShowRegistration(true)} />
        ) : (
          <PetList
            pets={pets}
            onPetSelect={handlePetSelect}
            calculateAge={calculateAge}
          />
        )}
      </div>

      {/* Floating Action Button */}
      {pets.length > 0 && (
        <FloatingActionButton onClick={() => setShowRegistration(true)} />
      )}
    </div>
  );
};

export default Index;
