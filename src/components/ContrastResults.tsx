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
      <div className="flex items-center justify-between p-3 rounded-lg bg-sidebar-accent">
        <div className="flex items-center gap-3">
          <div className="bg-sidebar-background px-2 py-1 rounded text-xs font-medium text-sidebar-foreground">
            {label}
          </div>
          <span className="text-sm text-sidebar-foreground">{size}</span>
        </div>
        <div className="flex items-center gap-2">
          {getPassIcon(passed)}
          <span className={`text-sm font-medium ${passed ? 'text-primary' : 'text-destructive'}`}>
            {passed ? 'Readable' : 'Not Readable'}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-sidebar-background/95 backdrop-blur-sm border-2 border-sidebar-border rounded-lg p-1 shadow-lg">
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
              <div className="text-sm text-sidebar-foreground mb-2">Contrast</div>
              <div className="text-5xl font-bold text-sidebar-foreground mb-1">
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
          </CardContent>
        </Card>
      </div>

      <div className="bg-sidebar-background/95 backdrop-blur-sm border-2 border-sidebar-border rounded-lg p-1 shadow-lg">
        <Card className="border-sidebar-border">
          <CardHeader>
            <CardTitle className="text-sidebar-foreground flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              WCAG Color Contrast Guidelines
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Level AA Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="bg-primary px-2 py-1 rounded text-xs font-medium text-primary-foreground">
                  Level AA
                </div>
                <span className="text-sm text-sidebar-foreground font-medium">Minimum Standard</span>
              </div>
              <div className="space-y-2 text-sm text-sidebar-foreground">
                <div>• Normal text: <span className="font-medium text-primary">4.5:1</span></div>
                <div>• Large text: <span className="font-medium text-primary">3:1</span></div>
              </div>
            </div>

            {/* Level AAA Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="bg-primary px-2 py-1 rounded text-xs font-medium text-primary-foreground">
                  Level AAA
                </div>
                <span className="text-sm text-sidebar-foreground font-medium">Enhanced Standard</span>
              </div>
              <div className="space-y-2 text-sm text-sidebar-foreground">
                <div>• Normal text: <span className="font-medium text-primary">7:1</span></div>
                <div>• Large text: <span className="font-medium text-primary">4.5:1</span></div>
              </div>
            </div>

            {/* Definition */}
            <div className="pt-4 border-t border-sidebar-border">
              <p className="text-xs text-sidebar-foreground opacity-80">
                Large text is defined as 18pt+ or 14pt+ when bold.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContrastResults;