
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Syringe, Plus, Calendar, CheckCircle, AlertCircle, Clock, Edit } from "lucide-react";

const VaccinationCard = ({ pet }) => {
  const [vaccinations, setVaccinations] = useState([
    {
      id: 1,
      name: 'V10 - 1ª Dose',
      expectedDate: '2024-05-15',
      status: 'applied',
      appliedDate: '2024-05-15',
      nextDue: null
    },
    {
      id: 2,
      name: 'V10 - 2ª Dose',
      expectedDate: '2024-06-10',
      status: 'applied',
      appliedDate: '2024-06-10',
      nextDue: null
    },
    {
      id: 3,
      name: 'Antirrábica',
      expectedDate: '2024-07-15',
      status: 'pending',
      appliedDate: null,
      nextDue: '2024-07-15'
    },
    {
      id: 4,
      name: 'V10 - Reforço Anual',
      expectedDate: '2025-05-15',
      status: 'upcoming',
      appliedDate: null,
      nextDue: '2025-05-15'
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'applied':
        return 'bg-green-500';
      case 'pending':
        return 'bg-orange-500';
      case 'upcoming':
        return 'bg-gray-400';
      default:
        return 'bg-gray-400';
    }
  };

  const getStatusBadgeColor = (status) => {
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

  const getStatusText = (status) => {
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

  const getStatusIcon = (status) => {
    switch (status) {
      case 'applied':
        return '✅';
      case 'pending':
        return '⚠️';
      case 'upcoming':
        return '🕗';
      default:
        return '⭕';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Syringe className="h-5 w-5 text-blue-500" />
              Carteira de Vacinação
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                <Edit className="h-4 w-4 mr-2" />
                Editar Histórico
              </Button>
              <Button className="bg-green-500 hover:bg-green-600">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Vacina
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            
            <div className="space-y-8">
              {vaccinations.map((vaccination, index) => (
                <div key={vaccination.id} className="relative flex items-start gap-6">
                  {/* Timeline dot */}
                  <div className={`relative z-10 w-12 h-12 rounded-full ${getStatusColor(vaccination.status)} flex items-center justify-center text-white font-bold shadow-lg`}>
                    <span className="text-lg">{getStatusIcon(vaccination.status)}</span>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{vaccination.name}</h3>
                        <Badge className={getStatusBadgeColor(vaccination.status)}>
                          {getStatusText(vaccination.status)}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>Data esperada: {formatDate(vaccination.expectedDate)}</span>
                        </div>
                        
                        {vaccination.appliedDate && (
                          <div className="flex items-center gap-2 text-green-600">
                            <CheckCircle className="h-4 w-4" />
                            <span>Aplicada em: {formatDate(vaccination.appliedDate)}</span>
                          </div>
                        )}
                        
                        {vaccination.nextDue && vaccination.status !== 'applied' && (
                          <div className="flex items-center gap-2 text-orange-600">
                            <AlertCircle className="h-4 w-4" />
                            <span>
                              {vaccination.status === 'pending' ? 'Atrasada desde' : 'Programada para'}: {formatDate(vaccination.nextDue)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vaccination Tips */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">Dicas de Vacinação</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-blue-800">
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 mt-0.5 text-blue-600" />
              <span className="text-sm">
                Mantenha sempre um intervalo de 21 dias entre doses da mesma vacina
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 mt-0.5 text-blue-600" />
              <span className="text-sm">
                Aguarde 7 dias após a última dose antes de levar seu pet para passear
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 mt-0.5 text-blue-600" />
              <span className="text-sm">
                Leve sempre a carteira de vacinação nas consultas veterinárias
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default VaccinationCard;
