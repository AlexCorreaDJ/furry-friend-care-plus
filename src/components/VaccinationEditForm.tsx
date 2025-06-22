
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VaccinationEditFormProps {
  vaccine: any;
  onUpdate: (updatedVaccine: any) => void;
  onCancel: () => void;
}

const VaccinationEditForm = ({ vaccine, onUpdate, onCancel }: VaccinationEditFormProps) => {
  const [formData, setFormData] = useState({
    name: vaccine.name,
    expectedDate: vaccine.expectedDate,
    status: vaccine.status,
    appliedDate: vaccine.appliedDate || '',
    nextDue: vaccine.nextDue || '',
    manufacturer: vaccine.manufacturer || '',
    batch: vaccine.batch || '',
    proofPhoto: vaccine.proofPhoto || null
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.expectedDate) {
      toast({
        title: "Erro",
        description: "Nome da vacina e data esperada são obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    const updatedVaccine = {
      ...vaccine,
      name: formData.name,
      expectedDate: formData.expectedDate,
      status: formData.status,
      appliedDate: formData.status === 'applied' ? formData.appliedDate || formData.expectedDate : null,
      nextDue: formData.status === 'pending' ? formData.expectedDate : (formData.nextDue || null),
      manufacturer: formData.manufacturer || null,
      batch: formData.batch || null,
      proofPhoto: formData.proofPhoto
    };

    onUpdate(updatedVaccine);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData({...formData, proofPhoto: event.target?.result as string});
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="edit-name">Nome da Vacina</Label>
        <Input
          id="edit-name"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="edit-expectedDate">Data Esperada</Label>
        <Input
          id="edit-expectedDate"
          type="date"
          value={formData.expectedDate}
          onChange={(e) => setFormData({...formData, expectedDate: e.target.value})}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="edit-status">Status</Label>
        <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pendente</SelectItem>
            <SelectItem value="applied">Aplicada</SelectItem>
            <SelectItem value="upcoming">Próxima</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {formData.status === 'applied' && (
        <div className="space-y-2">
          <Label htmlFor="edit-appliedDate">Data de Aplicação</Label>
          <Input
            id="edit-appliedDate"
            type="date"
            value={formData.appliedDate}
            onChange={(e) => setFormData({...formData, appliedDate: e.target.value})}
          />
        </div>
      )}

      {formData.status === 'upcoming' && (
        <div className="space-y-2">
          <Label htmlFor="edit-nextDue">Próxima Data</Label>
          <Input
            id="edit-nextDue"
            type="date"
            value={formData.nextDue}
            onChange={(e) => setFormData({...formData, nextDue: e.target.value})}
          />
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="edit-manufacturer">Fabricante (opcional)</Label>
        <Input
          id="edit-manufacturer"
          value={formData.manufacturer}
          onChange={(e) => setFormData({...formData, manufacturer: e.target.value})}
          placeholder="Ex: Zoetis, Merial"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="edit-batch">Lote (opcional)</Label>
        <Input
          id="edit-batch"
          value={formData.batch}
          onChange={(e) => setFormData({...formData, batch: e.target.value})}
          placeholder="Ex: LOT123456"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="edit-proofPhoto">Comprovante (opcional)</Label>
        <div className="flex items-center gap-2">
          <Input
            id="edit-proofPhoto"
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => document.getElementById('edit-proofPhoto')?.click()}
            className="w-full"
          >
            <Upload className="h-4 w-4 mr-2" />
            {formData.proofPhoto ? 'Alterar Foto' : 'Anexar Foto'}
          </Button>
        </div>
        {formData.proofPhoto && (
          <div className="mt-2">
            <img 
              src={formData.proofPhoto} 
              alt="Comprovante"
              className="max-w-full h-auto rounded-lg border border-gray-300 max-h-32"
            />
          </div>
        )}
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Voltar
        </Button>
        <Button type="submit">Salvar Alterações</Button>
      </div>
    </form>
  );
};

export default VaccinationEditForm;
