import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  textColor: string;
  backgroundColor: string;
}

const ContrastResults: React.FC<ContrastResultsProps> = ({ result }) => {
  const getPassIcon = (passed: boolean) => {
    return passed ? 
      <CheckCircle className="w-3.5 h-3.5 sm:w-3 sm:h-3 text-success" /> : 
      <XCircle className="w-3.5 h-3.5 sm:w-3 sm:h-3 text-destructive" />;
  };

  const getPassBadge = (passed: boolean, label: string, size: string) => {
    return (
      <div className="flex items-center justify-between p-2.5 sm:p-2 rounded-lg bg-muted/30 border border-border/30">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-primary">{label}</span>
          <span className="text-xs text-muted-foreground hidden sm:inline">•</span>
          <span className="text-xs text-muted-foreground">{size}</span>
        </div>
        <div className="flex items-center gap-1.5">
          {getPassIcon(passed)}
          <span className={`text-xs font-semibold ${passed ? 'text-success' : 'text-destructive'}`}>
            {passed ? 'Pass' : 'Fail'}
          </span>
        </div>
      </div>
    );
  };

  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-3 px-4 sm:px-6 pt-4 sm:pt-6">
        <CardTitle className="text-foreground flex items-center gap-2 text-base sm:text-lg">
          <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
          Contrast Results
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 px-4 sm:px-6 pb-4 sm:pb-6">
        {/* Contrast Ratio Display */}
        <div className="text-center py-4 sm:py-5 bg-gradient-to-br from-muted to-muted/50 rounded-lg border border-border/50">
          <div className="text-xs text-muted-foreground mb-1 font-medium">Contrast Ratio</div>
          <div className="text-3xl sm:text-4xl font-bold text-foreground mb-1.5">
            {result.ratio.toFixed(2)}<span className="text-xl sm:text-2xl text-muted-foreground">:1</span>
          </div>
          <div className="text-xs sm:text-sm text-muted-foreground">
            {result.ratio >= 4.5 ? '✅ Great contrast' : result.ratio >= 3 ? '⚠️ Fair contrast' : '❌ Poor contrast'}
          </div>
        </div>

        {/* WCAG Badges - Compact */}
        <div className="space-y-2">
          {getPassBadge(result.aaNormal, 'AA', 'Normal (16px)')}
          {getPassBadge(result.aaLarge, 'AA', 'Large (18px+)')}
          {getPassBadge(result.aaaNormal, 'AAA', 'Normal (16px)')}
          {getPassBadge(result.aaaLarge, 'AAA', 'Large (18px+)')}
        </div>
      </CardContent>
    </Card>
  );
};

export default ContrastResults;
