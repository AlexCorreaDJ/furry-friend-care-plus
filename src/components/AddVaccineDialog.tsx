
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AddVaccineDialogProps {
  onAddVaccine: (vaccine: any) => void;
}

const AddVaccineDialog = ({ onAddVaccine }: AddVaccineDialogProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    expectedDate: '',
    status: 'pending',
    appliedDate: '',
    nextDue: '',
    manufacturer: '',
    batch: '',
    proofPhoto: null as string | null
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

    const newVaccine = {
      id: Date.now(),
      name: formData.name,
      expectedDate: formData.expectedDate,
      status: formData.status,
      appliedDate: formData.status === 'applied' ? formData.appliedDate || formData.expectedDate : null,
      nextDue: formData.status === 'pending' ? formData.expectedDate : (formData.nextDue || null),
      manufacturer: formData.manufacturer || null,
      batch: formData.batch || null,
      proofPhoto: formData.proofPhoto
    };

    onAddVaccine(newVaccine);
    setFormData({
      name: '',
      expectedDate: '',
      status: 'pending',
      appliedDate: '',
      nextDue: '',
      manufacturer: '',
      batch: '',
      proofPhoto: null
    });
    setOpen(false);
    
    toast({
      title: "Sucesso",
      description: "Vacina adicionada com sucesso!",
    });
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-500 hover:bg-green-600">
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Vacina
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Adicionar Nova Vacina</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome da Vacina</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Ex: V10 - 1ª Dose"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="expectedDate">Data Esperada</Label>
            <Input
              id="expectedDate"
              type="date"
              value={formData.expectedDate}
              onChange={(e) => setFormData({...formData, expectedDate: e.target.value})}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
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
              <Label htmlFor="appliedDate">Data de Aplicação</Label>
              <Input
                id="appliedDate"
                type="date"
                value={formData.appliedDate}
                onChange={(e) => setFormData({...formData, appliedDate: e.target.value})}
              />
            </div>
          )}

          {formData.status === 'upcoming' && (
            <div className="space-y-2">
              <Label htmlFor="nextDue">Próxima Data</Label>
              <Input
                id="nextDue"
                type="date"
                value={formData.nextDue}
                onChange={(e) => setFormData({...formData, nextDue: e.target.value})}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="manufacturer">Fabricante (opcional)</Label>
            <Input
              id="manufacturer"
              value={formData.manufacturer}
              onChange={(e) => setFormData({...formData, manufacturer: e.target.value})}
              placeholder="Ex: Zoetis, Merial"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="batch">Lote (opcional)</Label>
            <Input
              id="batch"
              value={formData.batch}
              onChange={(e) => setFormData({...formData, batch: e.target.value})}
              placeholder="Ex: LOT123456"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="proofPhoto">Comprovante (opcional)</Label>
            <div className="flex items-center gap-2">
              <Input
                id="proofPhoto"
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('proofPhoto')?.click()}
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
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit">Adicionar</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddVaccineDialog;
