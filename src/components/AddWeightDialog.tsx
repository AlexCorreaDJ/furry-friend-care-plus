
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Scale } from "lucide-react";

interface AddWeightDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddWeight: (weight: { weight: string; date: string; notes: string }) => void;
}

const AddWeightDialog = ({ open, onOpenChange, onAddWeight }: AddWeightDialogProps) => {
  const [weight, setWeight] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!weight || parseFloat(weight) <= 0) {
      alert('Por favor, insira um peso válido');
      return;
    }

    if (!date) {
      alert('Por favor, selecione uma data');
      return;
    }

    onAddWeight({
      weight,
      date,
      notes
    });

    // Reset form
    setWeight('');
    setDate(new Date().toISOString().split('T')[0]);
    setNotes('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Scale className="h-5 w-5 text-green-500" />
            Registrar Novo Peso
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="weight">Peso (kg)</Label>
            <Input
              id="weight"
              type="number"
              step="0.1"
              min="0"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Ex: 8.5"
              className="mt-1"
              required
            />
          </div>

          <div>
            <Label htmlFor="date">Data da Pesagem</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1"
              required
            />
          </div>

          <div>
            <Label htmlFor="notes">Observações (opcional)</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ex: Após vacinação, crescimento normal, etc."
              className="mt-1 resize-none"
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              Registrar Peso
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddWeightDialog;
