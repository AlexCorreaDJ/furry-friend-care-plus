
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Edit, Trash2, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EditVaccinationDialogProps {
  vaccinations: any[];
  onUpdateVaccinations: (vaccinations: any[]) => void;
}

const EditVaccinationDialog = ({ vaccinations, onUpdateVaccinations }: EditVaccinationDialogProps) => {
  const [open, setOpen] = useState(false);
  const [editingVaccine, setEditingVaccine] = useState<any>(null);
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

  const handleEdit = (vaccine: any) => {
    setEditingVaccine(vaccine);
    setFormData({
      name: vaccine.name,
      expectedDate: vaccine.expectedDate,
      status: vaccine.status,
      appliedDate: vaccine.appliedDate || '',
      nextDue: vaccine.nextDue || '',
      manufacturer: vaccine.manufacturer || '',
      batch: vaccine.batch || '',
      proofPhoto: vaccine.proofPhoto || null
    });
  };

  const handleUpdate = (e: React.FormEvent) => {
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
      ...editingVaccine,
      name: formData.name,
      expectedDate: formData.expectedDate,
      status: formData.status,
      appliedDate: formData.status === 'applied' ? formData.appliedDate || formData.expectedDate : null,
      nextDue: formData.status === 'pending' ? formData.expectedDate : (formData.nextDue || null),
      manufacturer: formData.manufacturer || null,
      batch: formData.batch || null,
      proofPhoto: formData.proofPhoto
    };

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
              <div key={vaccine.id} className="flex items-center justify-between p-3 border rounded-lg">
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
                    onClick={() => handleEdit(vaccine)}
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
                        <AlertDialogAction onClick={() => handleDelete(vaccine.id)}>
                          Excluir
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <form onSubmit={handleUpdate} className="space-y-4">
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
              <Button type="button" variant="outline" onClick={() => setEditingVaccine(null)}>
                Voltar
              </Button>
              <Button type="submit">Salvar Alterações</Button>
            </div>
          </form>
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
