import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, TrendingUp } from 'lucide-react';

interface ContrastResult {
  ratio: number;
  aaLarge: boolean;
  aaNormal: boolean;
  aaaLarge: boolean;
  aaaNormal: boolean;
}

interface ContrastResultsProps {
  result: ContrastResult;
}

const ContrastResults: React.FC<ContrastResultsProps> = ({ result }) => {
  const getPassIcon = (passed: boolean) => {
    return passed ? 
      <CheckCircle className="w-4 h-4 text-success" /> : 
      <XCircle className="w-4 h-4 text-destructive" />;
  };

  const getPassBadge = (passed: boolean, label: string, size: string) => {
    return (
      <div className="flex items-center justify-between p-2.5 rounded-md bg-muted">
        <div className="flex items-center gap-2">
          <div className="bg-primary px-2 py-0.5 rounded text-xs font-medium text-primary-foreground">
            {label}
          </div>
          <span className="text-xs text-foreground">{size}</span>
        </div>
        <div className="flex items-center gap-1">
          {getPassIcon(passed)}
          <span className={`text-xs font-medium ${passed ? 'text-success' : 'text-destructive'}`}>
            {passed ? 'Pass' : 'Fail'}
          </span>
        </div>
      </div>
    );
  };

  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-foreground flex items-center gap-2 text-base">
          <TrendingUp className="w-4 h-4" />
          Contrast Results
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Contrast Ratio Display */}
        <div className="text-center py-3 bg-muted rounded-lg">
          <div className="text-xs text-muted-foreground mb-1">Contrast Ratio</div>
          <div className="text-3xl font-bold text-foreground">
            {result.ratio.toFixed(2)}
          </div>
        </div>

        {/* WCAG Results */}
        <div className="space-y-2">
          {getPassBadge(result.aaNormal, 'AA', 'Small Text')}
          {getPassBadge(result.aaLarge, 'AA', 'Large Text')}
          {getPassBadge(result.aaaNormal, 'AAA', 'Small Text')}
          {getPassBadge(result.aaaLarge, 'AAA', 'Large Text')}
        </div>

        {/* Guidelines */}
        <div className="pt-3 border-t border-border">
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="space-y-1">
              <div className="font-medium text-foreground">Level AA</div>
              <div className="text-muted-foreground">Normal: 4.5:1</div>
              <div className="text-muted-foreground">Large: 3:1</div>
            </div>
            <div className="space-y-1">
              <div className="font-medium text-foreground">Level AAA</div>
              <div className="text-muted-foreground">Normal: 7:1</div>
              <div className="text-muted-foreground">Large: 4.5:1</div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Large text: 18pt+ or 14pt+ bold
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContrastResults;