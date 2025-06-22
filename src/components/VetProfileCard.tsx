
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, Phone, MapPin, Plus, Calendar } from "lucide-react";

const VetProfileCard = ({ pet }) => {
  const [vetInfo, setVetInfo] = useState({
    name: '',
    clinic: '',
    phone: '',
    address: '',
    notes: ''
  });

  const [consultations, setConsultations] = useState([
    {
      id: 1,
      date: '2024-05-15',
      reason: 'Consulta de rotina e vacinação',
      observations: 'Animal saudável, aplicada vacina V10. Próxima consulta em 30 dias.',
      vet: 'Dr. João Silva'
    },
    {
      id: 2,
      date: '2024-04-10',
      reason: 'Primeira consulta',
      observations: 'Exame físico normal. Orientações sobre alimentação e cuidados básicos.',
      vet: 'Dr. João Silva'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);

  const handleInputChange = (field, value) => {
    setVetInfo(prev => ({ ...prev, [field]: value }));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <div className="space-y-6">
      {/* Vet Profile */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500" />
            Veterinário de Confiança
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!vetInfo.name ? (
            <div className="text-center py-8">
              <div className="bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Heart className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Cadastre seu Veterinário
              </h3>
              <p className="text-gray-600 mb-4">
                Mantenha os dados do veterinário sempre à mão
              </p>
              <Button 
                onClick={() => setShowAddForm(true)}
                className="bg-blue-500 hover:bg-blue-600"
              >
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Veterinário
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center">
                  <Heart className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{vetInfo.name}</h3>
                  <p className="text-gray-600">{vetInfo.clinic}</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">{vetInfo.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">{vetInfo.address}</span>
                </div>
              </div>
              
              {vetInfo.notes && (
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-blue-800 text-sm">{vetInfo.notes}</p>
                </div>
              )}
            </div>
          )}

          {showAddForm && (
            <div className="mt-6 space-y-4 p-4 border rounded-lg bg-gray-50">
              <h4 className="font-semibold">Informações do Veterinário</h4>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="vetName">Nome do Veterinário</Label>
                  <Input
                    id="vetName"
                    placeholder="Dr. João Silva"
                    value={vetInfo.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="clinic">Clínica/Hospital</Label>
                  <Input
                    id="clinic"
                    placeholder="Pet Care Veterinária"
                    value={vetInfo.clinic}
                    onChange={(e) => handleInputChange('clinic', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    placeholder="(11) 99999-9999"
                    value={vetInfo.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Endereço</Label>
                  <Input
                    id="address"
                    placeholder="Rua das Flores, 123"
                    value={vetInfo.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes">Observações</Label>
                <textarea
                  id="notes"
                  className="w-full p-3 border border-gray-300 rounded-md resize-none h-20"
                  placeholder="Especialidades, horários de atendimento, etc..."
                  value={vetInfo.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                />
              </div>
              
              <div className="flex gap-2">
                <Button
                  onClick={() => setShowAddForm(false)}
                  variant="outline"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={() => setShowAddForm(false)}
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  Salvar
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Consultation History */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-green-500" />
              Histórico de Consultas
            </CardTitle>
            <Button className="bg-green-500 hover:bg-green-600">
              <Plus className="h-4 w-4 mr-2" />
              Nova Consulta
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {consultations.map((consultation) => (
              <div key={consultation.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{consultation.reason}</h3>
                  <span className="text-sm text-gray-500">{formatDate(consultation.date)}</span>
                </div>
                <p className="text-gray-600 text-sm mb-2">{consultation.observations}</p>
                <div className="flex items-center gap-2">
                  <div className="bg-blue-100 rounded-full w-6 h-6 flex items-center justify-center">
                    <Heart className="h-3 w-3 text-blue-600" />
                  </div>
                  <span className="text-xs text-gray-500">{consultation.vet}</span>
                </div>
              </div>
            ))}
            
            {consultations.length === 0 && (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Nenhuma consulta registrada ainda</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Emergency Contact */}
      <Card className="bg-red-50 border-red-200">
        <CardHeader>
          <CardTitle className="text-red-900">🚨 Emergência</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-red-800 font-semibold">Hospital Veterinário 24h</p>
            <p className="text-red-700">(11) 3333-4444</p>
            <p className="text-red-700 text-sm">
              Em caso de emergência, ligue primeiro para o veterinário de confiança. 
              Se não conseguir contato, procure o hospital 24h mais próximo.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VetProfileCard;
