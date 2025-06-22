
import React from 'react';
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Edit, Trash2 } from "lucide-react";

interface VaccinationListItemProps {
  vaccine: any;
  onEdit: (vaccine: any) => void;
  onDelete: (vaccineId: number) => void;
}

const VaccinationListItem = ({ vaccine, onEdit, onDelete }: VaccinationListItemProps) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'applied': return 'Aplicada';
      case 'pending': return 'Pendente';
      case 'upcoming': return 'Próxima';
      default: return 'Não aplicada';
    }
  };

  return (
    <div className="flex items-center justify-between p-3 border rounded-lg">
      <div>
        <h4 className="font-medium">{vaccine.name}</h4>
        <p className="text-sm text-gray-600">
          {formatDate(vaccine.expectedDate)} - {getStatusText(vaccine.status)}
        </p>
      </div>
      <div className="flex gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => onEdit(vaccine)}
        >
          <Edit className="h-3 w-3" />
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
              <Trash2 className="h-3 w-3" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
              <AlertDialogDescription>
                Tem certeza que deseja remover a vacina "{vaccine.name}"? Esta ação não pode ser desfeita.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={() => onDelete(vaccine.id)}>
                Excluir
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default VaccinationListItem;
