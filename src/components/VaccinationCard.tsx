
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Vaccine, Plus, Calendar, CheckCircle, AlertCircle } from "lucide-react";

const VaccinationCard = ({ pet }) => {
  const [vaccinations, setVaccinations] = useState([
    {
      id: 1,
      name: 'V10 - 1ª Dose',
      ageRecommended: '45 dias',
      status: 'applied',
      appliedDate: '2024-05-15',
      nextDue: null
    },
    {
      id: 2,
      name: 'V10 - 2ª Dose',
      ageRecommended: '75 dias',
      status: 'applied',
      appliedDate: '2024-06-10',
      nextDue: null
    },
    {
      id: 3,
      name: 'Antirrábica',
      ageRecommended: '4 meses',
      status: 'pending',
      appliedDate: null,
      nextDue: '2024-07-15'
    },
    {
      id: 4,
      name: 'V10 - Reforço Anual',
      ageRecommended: '1 ano',
      status: 'scheduled',
      appliedDate: null,
      nextDue: '2025-05-15'
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'applied':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-red-100 text-red-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'applied':
        return 'Aplicada';
      case 'pending':
        return 'Atrasada';
      case 'scheduled':
        return 'Agendada';
      default:
        return 'Não aplicada';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'applied':
        return <CheckCircle className="h-4 w-4" />;
      case 'pending':
        return <AlertCircle className="h-4 w-4" />;
      case 'scheduled':
        return <Calendar className="h-4 w-4" />;
      default:
        return <Vaccine className="h-4 w-4" />;
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
              <Vaccine className="h-5 w-5 text-blue-500" />
              Carteira de Vacinação
            </CardTitle>
            <Button className="bg-green-500 hover:bg-green-600">
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Vacina
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {vaccinations.map((vaccination) => (
              <div
                key={vaccination.id}
                className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className={`p-2 rounded-full ${getStatusColor(vaccination.status)}`}>
                  {getStatusIcon(vaccination.status)}
                </div>
                
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{vaccination.name}</h3>
                  <p className="text-sm text-gray-600">
                    Recomendada aos {vaccination.ageRecommended}
                  </p>
                </div>

                <div className="text-right">
                  <Badge className={getStatusColor(vaccination.status)}>
                    {getStatusText(vaccination.status)}
                  </Badge>
                  {vaccination.appliedDate && (
                    <p className="text-xs text-gray-600 mt-1">
                      Aplicada em {formatDate(vaccination.appliedDate)}
                    </p>
                  )}
                  {vaccination.nextDue && (
                    <p className="text-xs text-gray-600 mt-1">
                      Vence em {formatDate(vaccination.nextDue)}
                    </p>
                  )}
                </div>
              </div>
            ))}
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
