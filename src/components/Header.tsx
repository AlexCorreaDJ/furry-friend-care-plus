
import React from 'react';
import { Button } from "@/components/ui/button";
import { Heart, Bell, Plus } from "lucide-react";

interface HeaderProps {
  totalNotifications: number;
  onAddPet: () => void;
  onShowNotifications?: () => void;
}

const Header = ({ totalNotifications, onAddPet, onShowNotifications }: HeaderProps) => {
  return (
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
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              onClick={onShowNotifications}
            >
              <Bell className="h-5 w-5" />
              {totalNotifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalNotifications}
                </span>
              )}
            </Button>
            <Button
              onClick={onAddPet}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Cadastrar Pet
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
