
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Scale, TrendingUp, Plus, Calendar } from "lucide-react";
import AddWeightDialog from './AddWeightDialog';

interface WeightControlScreenProps {
  pet: any;
  onBack: () => void;
}

const WeightControlScreen = ({ pet, onBack }: WeightControlScreenProps) => {
  const [weightRecords, setWeightRecords] = useState([
    {
      id: 1,
      weight: 8.5,
      date: '2024-12-15',
      notes: 'Peso ideal para a idade'
    },
    {
      id: 2,
      weight: 7.2,
      date: '2024-11-15',
      notes: 'Crescimento normal'
    },
    {
      id: 3,
      weight: 5.8,
      date: '2024-10-15',
      notes: 'Primeira pesagem'
    }
  ]);

  const [showAddWeight, setShowAddWeight] = useState(false);

  const handleAddWeight = (newWeight: any) => {
    const weightRecord = {
      id: Date.now(),
      weight: parseFloat(newWeight.weight),
      date: newWeight.date,
      notes: newWeight.notes || ''
    };
    setWeightRecords([weightRecord, ...weightRecords]);
    setShowAddWeight(false);
  };

  const getIdealWeightRange = () => {
    // Simulação baseada na raça e idade
    const baseWeight = 8.0;
    return {
      min: baseWeight - 1.0,
      max: baseWeight + 1.5
    };
  };

  const getCurrentWeight = () => {
    return weightRecords.length > 0 ? weightRecords[0].weight : 0;
  };

  const getWeightTrend = () => {
    if (weightRecords.length < 2) return 'stable';
    const current = weightRecords[0].weight;
    const previous = weightRecords[1].weight;
    const diff = current - previous;
    
    if (diff > 0.3) return 'increasing';
    if (diff < -0.3) return 'decreasing';
    return 'stable';
  };

  const getWeightStatus = () => {
    const current = getCurrentWeight();
    const ideal = getIdealWeightRange();
    
    if (current < ideal.min) return 'underweight';
    if (current > ideal.max) return 'overweight';
    return 'ideal';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ideal': return 'text-green-600 bg-green-100';
      case 'underweight': return 'text-yellow-600 bg-yellow-100';
      case 'overweight': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ideal': return 'Peso ideal';
      case 'underweight': return 'Abaixo do peso';
      case 'overweight': return 'Acima do peso';
      default: return 'Sem dados';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing': return '📈';
      case 'decreasing': return '📉';
      default: return '➡️';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const idealRange = getIdealWeightRange();
  const currentWeight = getCurrentWeight();
  const weightStatus = getWeightStatus();
  const weightTrend = getWeightTrend();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
          
          <Button 
            onClick={() => setShowAddWeight(true)}
            className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Registrar Peso
          </Button>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Controle de Peso
          </h1>
          <p className="text-lg text-gray-600 mb-2">{pet?.name || 'Seu Pet'}</p>
          <Badge className={getStatusColor(weightStatus)}>
            {getStatusText(weightStatus)}
          </Badge>
        </div>

        {/* Current Status */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2 text-lg">
                <Scale className="h-5 w-5 text-blue-500" />
                Peso Atual
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{currentWeight} kg</div>
              <p className="text-sm text-gray-600">
                Última pesagem: {weightRecords.length > 0 ? formatDate(weightRecords[0].date) : 'N/A'}
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2 text-lg">
                <TrendingUp className="h-5 w-5 text-green-500" />
                Tendência
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl mb-2">{getTrendIcon(weightTrend)}</div>
              <p className="text-sm text-gray-600 capitalize">{weightTrend === 'stable' ? 'Estável' : weightTrend === 'increasing' ? 'Subindo' : 'Descendo'}</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-lg">Peso Ideal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-gray-900">
                {idealRange.min} - {idealRange.max} kg
              </div>
              <p className="text-sm text-gray-600">Para esta idade e raça</p>
            </CardContent>
          </Card>
        </div>

        {/* Weight Progress */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Progresso do Peso</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span>Mínimo ({idealRange.min} kg)</span>
                <span>Ideal</span>
                <span>Máximo ({idealRange.max} kg)</span>
              </div>
              <div className="relative">
                <div className="bg-gray-200 rounded-full h-4">
                  {/* Ideal range */}
                  <div 
                    className="bg-green-300 h-4 rounded-full absolute"
                    style={{ 
                      left: `${((idealRange.min - 3) / 12) * 100}%`,
                      width: `${((idealRange.max - idealRange.min) / 12) * 100}%`
                    }}
                  ></div>
                  {/* Current weight indicator */}
                  <div 
                    className="absolute top-0 w-1 h-4 bg-blue-600 rounded"
                    style={{ left: `${((currentWeight - 3) / 12) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>3kg</span>
                  <span>6kg</span>
                  <span>9kg</span>
                  <span>12kg</span>
                  <span>15kg</span>
                </div>
              </div>
              <div className="text-center text-sm text-gray-600">
                <span className="inline-flex items-center gap-1">
                  <div className="w-3 h-3 bg-blue-600 rounded"></div>
                  Peso atual: {currentWeight} kg
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weight History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Histórico de Peso
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weightRecords.map((record, index) => (
                <div key={record.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <div className="font-semibold text-gray-900">{record.weight} kg</div>
                    <div className="text-sm text-gray-600">{formatDate(record.date)}</div>
                    {record.notes && (
                      <div className="text-sm text-gray-500 mt-1">{record.notes}</div>
                    )}
                  </div>
                  <div className="text-right">
                    {index > 0 && (
                      <Badge variant="outline" className="text-xs">
                        {record.weight > weightRecords[index - 1].weight ? '+' : ''}
                        {(record.weight - weightRecords[index - 1].weight).toFixed(1)} kg
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tips */}
        <Card className="mt-8 bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-900">💡 Dicas para Controle de Peso</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-blue-800">
              <li className="flex items-start gap-2">
                <Scale className="h-4 w-4 mt-0.5 text-blue-600" />
                <span className="text-sm">
                  Pese seu pet sempre no mesmo horário e condições
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Scale className="h-4 w-4 mt-0.5 text-blue-600" />
                <span className="text-sm">
                  Monitore o peso semanalmente durante o crescimento
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Scale className="h-4 w-4 mt-0.5 text-blue-600" />
                <span className="text-sm">
                  Consulte o veterinário se houver mudanças bruscas
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Scale className="h-4 w-4 mt-0.5 text-blue-600" />
                <span className="text-sm">
                  Ajuste a alimentação conforme orientação profissional
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Add Weight Dialog */}
      <AddWeightDialog 
        open={showAddWeight}
        onOpenChange={setShowAddWeight}
        onAddWeight={handleAddWeight}
      />
    </div>
  );
};

export default WeightControlScreen;
