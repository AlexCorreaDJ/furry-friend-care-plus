
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TimelineTipProps {
  currentAge: number;
}

const TimelineTip = ({ currentAge }: TimelineTipProps) => {
  const getTipMessage = () => {
    if (currentAge < 4) {
      return "Esta é uma fase crucial! Mantenha o protocolo de vacinação em dia e evite contato com animais não vacinados.";
    } else if (currentAge < 12) {
      return "Fase ideal para socialização e adestramento. Aproveite para ensinar comandos básicos!";
    } else {
      return "Mantenha consultas regulares e não esqueça dos reforços anuais das vacinas.";
    }
  };

  return (
    <Card className="bg-green-50 border-green-200">
      <CardHeader>
        <CardTitle className="text-green-900">💡 Dica da Fase Atual</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-green-800">
          {getTipMessage()}
        </p>
      </CardContent>
    </Card>
  );
};

export default TimelineTip;
