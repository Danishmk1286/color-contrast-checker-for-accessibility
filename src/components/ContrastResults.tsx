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
      <CheckCircle className="w-4 h-4 text-primary" /> : 
      <XCircle className="w-4 h-4 text-destructive" />;
  };

  const getPassBadge = (passed: boolean, label: string, size: string) => {
    return (
      <div className={`flex items-center justify-between p-4 rounded-lg border-2 ${
        passed 
          ? 'bg-primary/10 border-primary/30' 
          : 'bg-destructive/10 border-destructive/30'
      }`}>
        <div className="flex items-center gap-3">
          <div className="bg-background px-3 py-1 rounded-md text-sm font-semibold text-foreground border">
            {label}
          </div>
          <span className="text-sm font-medium text-muted-foreground">{size}</span>
        </div>
        <div className="flex items-center gap-3">
          {getPassIcon(passed)}
          <span className={`text-base font-bold ${passed ? 'text-primary' : 'text-destructive'}`}>
            {passed ? 'PASS' : 'FAIL'}
          </span>
        </div>
      </div>
    );
  };

  return (
    <Card className="border-border bg-card shadow-lg">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2 text-xl">
          <TrendingUp className="w-6 h-6" />
          Contrast Results
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Contrast Ratio Display */}
        <div className="text-center py-6 bg-accent/50 rounded-lg border">
          <div className="text-lg font-medium text-muted-foreground mb-2">Contrast Ratio</div>
          <div className="text-6xl font-bold text-foreground mb-2">
            {result.ratio.toFixed(2)}
          </div>
          <div className="text-sm text-muted-foreground">
            {result.ratio >= 7 ? 'Excellent' : result.ratio >= 4.5 ? 'Good' : result.ratio >= 3 ? 'Fair' : 'Poor'}
          </div>
        </div>

        {/* WCAG Results */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">WCAG Compliance</h3>
          {getPassBadge(result.aaNormal, 'AA', 'Small Text')}
          {getPassBadge(result.aaLarge, 'AA', 'Large Text')}
          {getPassBadge(result.aaaNormal, 'AAA', 'Small Text')}
          {getPassBadge(result.aaaLarge, 'AAA', 'Large Text')}
        </div>

        {/* Quick Guidelines */}
        <div className="pt-4 border-t border-border">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="font-medium text-primary mb-1">AA Standard</div>
              <div className="text-muted-foreground">Small: 4.5:1</div>
              <div className="text-muted-foreground">Large: 3:1</div>
            </div>
            <div>
              <div className="font-medium text-primary mb-1">AAA Standard</div>
              <div className="text-muted-foreground">Small: 7:1</div>
              <div className="text-muted-foreground">Large: 4.5:1</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContrastResults;