
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Calendar, Building2, Hash, Camera, Syringe } from "lucide-react";

interface VaccinationDetailsModalProps {
  vaccination: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const VaccinationDetailsModal = ({ vaccination, open, onOpenChange }: VaccinationDetailsModalProps) => {
  if (!vaccination) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'applied':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-orange-100 text-orange-800';
      case 'upcoming':
        return 'bg-gray-100 text-gray-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'applied':
        return 'Aplicada';
      case 'pending':
        return 'Pendente';
      case 'upcoming':
        return 'Próxima';
      default:
        return 'Não aplicada';
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Não informado';
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Syringe className="h-5 w-5 text-blue-500" />
            Detalhes da Vacina
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Header with name and status */}
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-900">{vaccination.name}</h3>
            <Badge className={getStatusColor(vaccination.status)}>
              {getStatusText(vaccination.status)}
            </Badge>
          </div>

          {/* Details grid */}
          <div className="grid gap-4">
            {/* Manufacturer */}
            <div className="flex items-start gap-3">
              <Building2 className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <label className="text-sm font-medium text-gray-700">Fabricante</label>
                <p className="text-gray-900">{vaccination.manufacturer || 'Não informado'}</p>
              </div>
            </div>

            {/* Batch */}
            <div className="flex items-start gap-3">
              <Hash className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <label className="text-sm font-medium text-gray-700">Lote</label>
                <p className="text-gray-900">{vaccination.batch || 'Não informado'}</p>
              </div>
            </div>

            {/* Applied date */}
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <label className="text-sm font-medium text-gray-700">Data Aplicada</label>
                <p className="text-gray-900">{formatDate(vaccination.appliedDate)}</p>
              </div>
            </div>

            {/* Next dose */}
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <label className="text-sm font-medium text-gray-700">Próxima Dose</label>
                <p className="text-gray-900">{formatDate(vaccination.nextDue)}</p>
              </div>
            </div>

            {/* Photo attachment */}
            <div className="flex items-start gap-3">
              <Camera className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <label className="text-sm font-medium text-gray-700">Comprovante</label>
                {vaccination.proofPhoto ? (
                  <div className="mt-2">
                    <img 
                      src={vaccination.proofPhoto} 
                      alt="Comprovante de vacinação"
                      className="max-w-full h-auto rounded-lg border border-gray-300 max-h-60"
                    />
                  </div>
                ) : (
                  <p className="text-gray-500">Nenhuma foto anexada</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VaccinationDetailsModal;
