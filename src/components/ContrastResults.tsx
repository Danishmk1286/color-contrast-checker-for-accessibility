import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, TrendingUp, Smartphone, Monitor } from 'lucide-react';

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

  const getPassBadge = (passed: boolean, label: string, size: string, deviceType: string) => {
    const IconComponent = deviceType === 'smartphone' ? Smartphone : Monitor;
    
    return (
      <div className="flex items-center justify-between p-3 sm:p-2.5 rounded-lg sm:rounded-xl bg-muted/30 sm:bg-muted/50 border-0 sm:border border-border/50">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="bg-primary/20 sm:bg-primary/10 px-2 py-1 sm:px-3 sm:py-1.5 rounded sm:rounded-lg text-xs sm:text-sm font-medium text-primary border-0 sm:border border-primary/20">
            {label}
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <IconComponent className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />
            <span className="text-xs sm:text-sm text-foreground font-medium">{size}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          {getPassIcon(passed)}
          <span className={`text-xs sm:text-sm font-semibold ${passed ? 'text-success' : 'text-destructive'}`}>
            {passed ? 'Pass' : 'Fail'}
          </span>
        </div>
      </div>
    );
  };

  return (
    <Card className="border-border bg-card rounded-lg sm:rounded-none md:rounded-lg shadow-sm sm:shadow-none md:shadow-sm">
      <CardHeader className="pb-4 sm:pb-3 px-6 sm:px-4 md:px-6 pt-6 sm:pt-4 md:pt-6 text-center sm:text-left">
        <CardTitle className="text-foreground flex items-center justify-center sm:justify-start gap-3 text-lg sm:text-base">
          <TrendingUp className="w-6 h-6 sm:w-4 sm:h-4 text-primary" />
          Contrast Results
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 sm:space-y-4 px-6 sm:px-4 md:px-6 pb-6 sm:pb-4 md:pb-6">
        {/* Contrast Ratio Display - Enhanced mobile */}
        <div className="text-center py-6 sm:py-3 bg-gradient-to-br from-muted to-muted/50 rounded-xl sm:rounded-lg border border-border/50">
          <div className="text-sm sm:text-xs text-muted-foreground mb-3 sm:mb-1 font-medium">Contrast Ratio</div>
          <div className="text-4xl sm:text-3xl font-bold text-foreground mb-2">
            {result.ratio.toFixed(2)}
          </div>
          <div className="text-sm text-muted-foreground">
            {result.ratio >= 4.5 ? '✅ Great contrast' : result.ratio >= 3 ? '⚠️ Fair contrast' : '❌ Poor contrast'}
          </div>
        </div>

        {/* WCAG Results - Mobile optimized */}
        <div className="space-y-3 sm:space-y-2">
          {getPassBadge(result.aaNormal, 'AA', 'Normal Text (16px)', 'smartphone')}
          {getPassBadge(result.aaLarge, 'AA', 'Large Text (18px+)', 'monitor')}
          {getPassBadge(result.aaaNormal, 'AAA', 'Normal Text (16px)', 'smartphone')}
          {getPassBadge(result.aaaLarge, 'AAA', 'Large Text (18px+)', 'monitor')}
        </div>

        {/* Guidelines - Enhanced mobile layout */}
        <div className="pt-6 sm:pt-3 border-t border-border">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-3 text-sm sm:text-xs">
            <div className="p-4 sm:p-3 bg-primary/5 rounded-lg border border-primary/10">
              <div className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                Level AA
              </div>
              <div className="space-y-1 text-muted-foreground">
                <div>Normal: 4.5:1</div>
                <div>Large: 3:1</div>
              </div>
            </div>
            <div className="p-4 sm:p-3 bg-secondary/50 rounded-lg border border-border/50">
              <div className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-muted-foreground" />
                Level AAA
              </div>
              <div className="space-y-1 text-muted-foreground">
                <div>Normal: 7:1</div>
                <div>Large: 4.5:1</div>
              </div>
            </div>
          </div>
          <div className="mt-4 sm:mt-3 p-3 bg-muted/50 rounded-lg">
            <p className="text-sm sm:text-xs text-muted-foreground text-center">
              💡 Large text: 18px+ (24px) or 14px+ bold (18.5px)
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContrastResults;