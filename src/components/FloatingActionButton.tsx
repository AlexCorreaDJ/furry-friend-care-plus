
import React from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface FloatingActionButtonProps {
  onClick: () => void;
}

const FloatingActionButton = ({ onClick }: FloatingActionButtonProps) => {
  return (
    <Button
      onClick={onClick}
      size="lg"
      className="fixed bottom-6 right-6 rounded-full w-14 h-14 bg-green-500 hover:bg-green-600 shadow-lg hover:shadow-xl transition-all"
    >
      <Plus className="h-6 w-6" />
    </Button>
  );
};

export default FloatingActionButton;
