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

  const getPassBadge = (passed: boolean, label: string) => {
    return (
      <div className="flex items-center justify-between p-3 rounded-lg bg-sidebar-accent">
        <span className="text-sm text-sidebar-foreground">{label}</span>
        <div className="flex items-center gap-2">
          {getPassIcon(passed)}
          <span className={`text-sm font-medium ${passed ? 'text-primary' : 'text-destructive'}`}>
            {passed ? 'Passes' : 'Fails'}
          </span>
        </div>
      </div>
    );
  };

  return (
    <Card className="border-sidebar-border">
      <CardHeader>
        <CardTitle className="text-sidebar-foreground flex items-center gap-2">
          <TrendingUp className="w-4 h-4" />
          Color Contrast Results
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Contrast Ratio Display */}
        <div className="text-center py-4">
          <div className="text-4xl font-bold text-primary mb-2">
            {result.ratio.toFixed(2)}
          </div>
          <p className="text-sidebar-foreground text-sm">Contrast Ratio</p>
        </div>

        {/* WCAG AA Results */}
        <div className="space-y-3">
          <h3 className="text-sidebar-foreground font-medium text-sm">WCAG AA Compliance</h3>
          <div className="space-y-2">
            {getPassBadge(result.aaLarge, 'Large Text')}
            {getPassBadge(result.aaNormal, 'Normal Text')}
          </div>
        </div>

        {/* WCAG AAA Results */}
        <div className="space-y-3">
          <h3 className="text-sidebar-foreground font-medium text-sm">WCAG AAA Compliance</h3>
          <div className="space-y-2">
            {getPassBadge(result.aaaLarge, 'Large Text')}
            {getPassBadge(result.aaaNormal, 'Normal Text')}
          </div>
        </div>

        {/* Guidelines */}
        <div className="p-4 bg-sidebar-accent rounded-lg">
          <h4 className="text-sidebar-foreground font-medium text-sm mb-2">WCAG Color Contrast Guidelines</h4>
          <div className="space-y-1 text-xs text-sidebar-foreground opacity-80">
            <div>• Level AA: Minimum Standard</div>
            <div>• Large text ≥3:1 contrast</div>
            <div>• Normal text ≥4.5:1 contrast</div>
            <div>• Level AAA: Enhanced Standard</div>
            <div>• Large text ≥4.5:1 contrast</div>
            <div>• Normal text ≥7:1 contrast</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContrastResults;