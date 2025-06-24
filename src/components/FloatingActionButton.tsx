
import React from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface FloatingActionButtonProps {
  onClick: () => void;
  className?: string;
}

const FloatingActionButton = ({ onClick, className }: FloatingActionButtonProps) => {
  return (
    <Button
      onClick={onClick}
      size="lg"
      className={cn(
        "fixed bottom-6 right-6 rounded-full w-14 h-14 bg-green-500 hover:bg-green-600 shadow-lg hover:shadow-xl transition-all",
        className
      )}
    >
      <Plus className="h-6 w-6" />
    </Button>
  );
};

export default FloatingActionButton;
