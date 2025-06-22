
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, CheckCircle, Circle, Plus, Clock, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AddCustomCareDialog from './AddCustomCareDialog';

const CareScheduleCard = ({ pet }) => {
  const [completedCares, setCompletedCares] = useState(new Set());
  const [customCares, setCustomCares] = useState([]);
  const [filterStage, setFilterStage] = useState('all');
  const [filterDate, setFilterDate] = useState('all');
  const { toast } = useToast();

  const getAgeInMonths = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    return (today.getFullYear() - birth.getFullYear()) * 12 + today.getMonth() - birth.getMonth();
  };

  const currentAge = getAgeInMonths(pet.birthDate);

  const defaultCareSchedule = [
    {
      id: 'v10-1',
      title: 'Primeira dose V10',
      description: 'Primeira vacinação múltipla contra cinomose, hepatite, parainfluenza, parvovirose, etc.',
      ageInMonths: 1,
      category: 'vaccination',
      stage: 'filhote',
      priority: 'high'
    },
    {
      id: 'deworming-1',
      title: 'Vermífugo',
      description: 'Primeira aplicação de vermífugo para controle de parasitas intestinais',
      ageInMonths: 2,
      category: 'medication',
      stage: 'filhote',
      priority: 'high'
    },
    {
      id: 'v10-2',
      title: 'Segunda dose V10',
      description: 'Reforço da vacinação múltipla',
      ageInMonths: 2.5,
      category: 'vaccination',
      stage: 'filhote',
      priority: 'high'
    },
    {
      id: 'v10-3',
      title: 'Terceira dose V10',
      description: 'Última dose da série inicial de vacinação múltipla',
      ageInMonths: 3.5,
      category: 'vaccination',
      stage: 'filhote',
      priority: 'high'
    },
    {
      id: 'rabies-1',
      title: 'Vacina Antirrábica',
      description: 'Primeira dose da vacina contra raiva',
      ageInMonths: 4,
      category: 'vaccination',
      stage: 'filhote',
      priority: 'high'
    },
    {
      id: 'castration',
      title: 'Castração recomendada',
      description: 'Período ideal para castração (consulte seu veterinário)',
      ageInMonths: 6,
      category: 'surgery',
      stage: 'jovem',
      priority: 'medium'
    },
    {
      id: 'deworming-2',
      title: 'Vermífugo (reforço)',
      description: 'Segunda aplicação de vermífugo',
      ageInMonths: 6,
      category: 'medication',
      stage: 'jovem',
      priority: 'medium'
    },
    {
      id: 'annual-checkup',
      title: 'Consulta anual',
      description: 'Consulta de rotina e check-up geral',
      ageInMonths: 12,
      category: 'checkup',
      stage: 'adulto',
      priority: 'medium'
    },
    {
      id: 'rabies-annual',
      title: 'Reforço antirrábica',
      description: 'Reforço anual da vacina antirrábica',
      ageInMonths: 12,
      category: 'vaccination',
      stage: 'adulto',
      priority: 'high'
    },
    {
      id: 'v10-annual',
      title: 'Reforço V10',
      description: 'Reforço anual da vacinação múltipla',
      ageInMonths: 12,
      category: 'vaccination',
      stage: 'adulto',
      priority: 'high'
    }
  ];

  const allCares = [...defaultCareSchedule, ...customCares];

  const getStatusByAge = (careAgeInMonths) => {
    if (currentAge >= careAgeInMonths + 1) return 'overdue';
    if (currentAge >= careAgeInMonths) return 'current';
    return 'upcoming';
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'vaccination': return '💉';
      case 'medication': return '💊';
      case 'surgery': return '🏥';
      case 'checkup': return '🩺';
      default: return '📝';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'vaccination': return 'bg-blue-100 text-blue-800';
      case 'medication': return 'bg-green-100 text-green-800';
      case 'surgery': return 'bg-purple-100 text-purple-800';
      case 'checkup': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-red-200 bg-red-50';
      case 'medium': return 'border-yellow-200 bg-yellow-50';
      case 'low': return 'border-green-200 bg-green-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const getStatusColor = (status, isCompleted) => {
    if (isCompleted) return 'bg-green-100 text-green-800';
    switch (status) {
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'current': return 'bg-blue-100 text-blue-800';
      case 'upcoming': return 'bg-gray-100 text-gray-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusText = (status, isCompleted) => {
    if (isCompleted) return 'Concluído';
    switch (status) {
      case 'overdue': return 'Atrasado';
      case 'current': return 'Atual';
      case 'upcoming': return 'Futuro';
      default: return '';
    }
  };

  const toggleCompletion = (careId) => {
    const newCompleted = new Set(completedCares);
    if (newCompleted.has(careId)) {
      newCompleted.delete(careId);
      toast({
        title: "Cuidado desmarcado",
        description: "O cuidado foi marcado como não concluído.",
      });
    } else {
      newCompleted.add(careId);
      toast({
        title: "Cuidado concluído",
        description: "O cuidado foi marcado como concluído!",
      });
    }
    setCompletedCares(newCompleted);
  };

  const addCustomCare = (newCare) => {
    const customCare = {
      ...newCare,
      id: `custom-${Date.now()}`,
      category: 'custom'
    };
    setCustomCares([...customCares, customCare]);
  };

  const filteredCares = allCares.filter(care => {
    const stageMatch = filterStage === 'all' || care.stage === filterStage;
    const status = getStatusByAge(care.ageInMonths);
    const dateMatch = filterDate === 'all' || 
      (filterDate === 'current' && status === 'current') ||
      (filterDate === 'overdue' && status === 'overdue') ||
      (filterDate === 'upcoming' && status === 'upcoming') ||
      (filterDate === 'completed' && completedCares.has(care.id));
    
    return stageMatch && dateMatch;
  });

  const sortedCares = filteredCares.sort((a, b) => a.ageInMonths - b.ageInMonths);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-500" />
              Cronograma de Cuidados
            </CardTitle>
            <AddCustomCareDialog onAddCare={addCustomCare} />
          </div>
          <p className="text-sm text-gray-600">
            {pet.name} tem atualmente {currentAge} meses
          </p>
        </CardHeader>
        <CardContent>
          {/* Filtros */}
          <div className="flex gap-4 mb-6 flex-wrap">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <Select value={filterStage} onValueChange={setFilterStage}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as fases</SelectItem>
                  <SelectItem value="filhote">Filhote</SelectItem>
                  <SelectItem value="jovem">Jovem</SelectItem>
                  <SelectItem value="adulto">Adulto</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Select value={filterDate} onValueChange={setFilterDate}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="overdue">Atrasados</SelectItem>
                <SelectItem value="current">Atuais</SelectItem>
                <SelectItem value="upcoming">Futuros</SelectItem>
                <SelectItem value="completed">Concluídos</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Lista de cuidados */}
          <div className="space-y-4">
            {sortedCares.map((care) => {
              const isCompleted = completedCares.has(care.id);
              const status = getStatusByAge(care.ageInMonths);
              
              return (
                <div 
                  key={care.id} 
                  className={`p-4 rounded-lg border-2 ${getPriorityColor(care.priority)}`}
                >
                  <div className="flex items-start gap-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleCompletion(care.id)}
                      className="p-1 h-auto"
                    >
                      {isCompleted ? (
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      ) : (
                        <Circle className="h-6 w-6 text-gray-400" />
                      )}
                    </Button>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <span className="text-lg">{getCategoryIcon(care.category)}</span>
                        <h3 className={`text-lg font-semibold ${isCompleted ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                          {care.title}
                        </h3>
                        <Badge className={getStatusColor(status, isCompleted)}>
                          {getStatusText(status, isCompleted)}
                        </Badge>
                        <Badge className={getCategoryColor(care.category)}>
                          {care.stage}
                        </Badge>
                        <span className="text-sm text-gray-500 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {care.ageInMonths} mês{care.ageInMonths !== 1 ? 'es' : ''}
                        </span>
                      </div>
                      
                      <p className={`${isCompleted ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
                        {care.description}
                      </p>
                      
                      {care.priority === 'high' && !isCompleted && status === 'overdue' && (
                        <div className="bg-red-100 border border-red-200 rounded p-2 text-sm text-red-800">
                          ⚠️ Cuidado atrasado - recomenda-se agendar o quanto antes
                        </div>
                      )}
                      
                      {care.priority === 'high' && !isCompleted && status === 'current' && (
                        <div className="bg-blue-100 border border-blue-200 rounded p-2 text-sm text-blue-800">
                          📅 É hora deste cuidado - agende com seu veterinário
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {sortedCares.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Nenhum cuidado encontrado com os filtros selecionados.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Estatísticas */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="bg-green-100 rounded-full w-12 h-12 mx-auto mb-2 flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Concluídos</h3>
            <p className="text-2xl font-bold text-green-600">{completedCares.size}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="bg-red-100 rounded-full w-12 h-12 mx-auto mb-2 flex items-center justify-center">
              <Clock className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Atrasados</h3>
            <p className="text-2xl font-bold text-red-600">
              {allCares.filter(care => 
                getStatusByAge(care.ageInMonths) === 'overdue' && 
                !completedCares.has(care.id)
              ).length}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="bg-blue-100 rounded-full w-12 h-12 mx-auto mb-2 flex items-center justify-center">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Atuais</h3>
            <p className="text-2xl font-bold text-blue-600">
              {allCares.filter(care => 
                getStatusByAge(care.ageInMonths) === 'current' && 
                !completedCares.has(care.id)
              ).length}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="bg-gray-100 rounded-full w-12 h-12 mx-auto mb-2 flex items-center justify-center">
              <Plus className="h-6 w-6 text-gray-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Personalizados</h3>
            <p className="text-2xl font-bold text-gray-600">{customCares.length}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CareScheduleCard;
