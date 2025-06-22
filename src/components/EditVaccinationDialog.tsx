
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import VaccinationListItem from './VaccinationListItem';
import VaccinationEditForm from './VaccinationEditForm';

interface EditVaccinationDialogProps {
  vaccinations: any[];
  onUpdateVaccinations: (vaccinations: any[]) => void;
}

const EditVaccinationDialog = ({ vaccinations, onUpdateVaccinations }: EditVaccinationDialogProps) => {
  const [open, setOpen] = useState(false);
  const [editingVaccine, setEditingVaccine] = useState<any>(null);
  const { toast } = useToast();

  const handleEdit = (vaccine: any) => {
    setEditingVaccine(vaccine);
  };

  const handleUpdate = (updatedVaccine: any) => {
    const updatedVaccinations = vaccinations.map(v => 
      v.id === editingVaccine.id ? updatedVaccine : v
    );

    onUpdateVaccinations(updatedVaccinations);
    setEditingVaccine(null);
    
    toast({
      title: "Sucesso",
      description: "Vacina atualizada com sucesso!",
    });
  };

  const handleDelete = (vaccineId: number) => {
    const updatedVaccinations = vaccinations.filter(v => v.id !== vaccineId);
    onUpdateVaccinations(updatedVaccinations);
    
    toast({
      title: "Sucesso",
      description: "Vacina removida com sucesso!",
    });
  };

  const handleCancel = () => {
    setEditingVaccine(null);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
          <Edit className="h-4 w-4 mr-2" />
          Editar Histórico
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Histórico de Vacinação</DialogTitle>
        </DialogHeader>
        
        {!editingVaccine ? (
          <div className="space-y-4">
            {vaccinations.map((vaccine) => (
              <VaccinationListItem
                key={vaccine.id}
                vaccine={vaccine}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <VaccinationEditForm
            vaccine={editingVaccine}
            onUpdate={handleUpdate}
            onCancel={handleCancel}
          />
        )}
        
        {!editingVaccine && (
          <div className="flex justify-end">
            <Button onClick={() => setOpen(false)}>Fechar</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditVaccinationDialog;
