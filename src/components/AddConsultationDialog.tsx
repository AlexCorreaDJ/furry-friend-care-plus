
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";

interface AddConsultationDialogProps {
  onAddConsultation: (consultation: {
    date: string;
    reason: string;
    observations: string;
    vet: string;
  }) => void;
}

const AddConsultationDialog = ({ onAddConsultation }: AddConsultationDialogProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    reason: '',
    observations: '',
    vet: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.date || !formData.reason) {
      return;
    }

    onAddConsultation({
      date: formData.date,
      reason: formData.reason,
      observations: formData.observations,
      vet: formData.vet
    });

    // Reset form
    setFormData({
      date: '',
      reason: '',
      observations: '',
      vet: ''
    });

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-500 hover:bg-green-600">
          <Plus className="h-4 w-4 mr-2" />
          Nova Consulta
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Adicionar Nova Consulta</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Data da Consulta *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="vet">Veterinário</Label>
              <Input
                id="vet"
                placeholder="Dr. João Silva"
                value={formData.vet}
                onChange={(e) => handleInputChange('vet', e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="reason">Motivo da Consulta *</Label>
            <Input
              id="reason"
              placeholder="Consulta de rotina, vacinação, etc."
              value={formData.reason}
              onChange={(e) => handleInputChange('reason', e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="observations">Observações</Label>
            <Textarea
              id="observations"
              placeholder="Descreva os procedimentos realizados, recomendações, etc."
              value={formData.observations}
              onChange={(e) => handleInputChange('observations', e.target.value)}
              className="h-24"
            />
          </div>
          
          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-green-500 hover:bg-green-600"
            >
              Salvar Consulta
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddConsultationDialog;
