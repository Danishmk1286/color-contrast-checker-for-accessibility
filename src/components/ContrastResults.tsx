import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, TrendingUp, Smartphone, Monitor, AlertCircle, Lightbulb, Info } from 'lucide-react';

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

  const getSemanticExplanation = () => {
    const { ratio } = result;
    
    if (ratio >= 7) {
      return {
        status: 'excellent',
        why: `Your contrast ratio of ${ratio.toFixed(2)}:1 exceeds all WCAG standards, including the strict AAA level for normal text.`,
        impact: 'This provides excellent readability for all users, including those with severe visual impairments, color blindness, or viewing content in bright sunlight.',
        suggestion: 'Your color combination is highly accessible. No changes needed!'
      };
    } else if (ratio >= 4.5) {
      return {
        status: 'good',
        why: `Your contrast ratio of ${ratio.toFixed(2)}:1 meets WCAG AA standards for all text sizes and AAA for large text.`,
        impact: 'This provides good readability for most users, including those with moderate low vision. However, users with severe visual impairments may still face challenges with normal-sized text.',
        suggestion: 'Consider increasing contrast to 7:1 for AAA compliance on normal text, especially for critical content like error messages or important calls-to-action.'
      };
    } else if (ratio >= 3) {
      return {
        status: 'minimal',
        why: `Your contrast ratio of ${ratio.toFixed(2)}:1 only meets WCAG AA standards for large text (18px+ or 14px+ bold). It fails for normal text.`,
        impact: 'Users with low vision, older adults, or those viewing in poor lighting conditions will struggle to read normal-sized text. This excludes a significant portion of your audience.',
        suggestion: `Increase the contrast to at least 4.5:1. Try ${ratio < 4 ? 'darkening the background or brightening the text' : 'adjusting either color more dramatically'}. For dark backgrounds, use lighter text (#E0E0E0 or brighter). For light backgrounds, use darker text (#333333 or darker).`
      };
    } else {
      return {
        status: 'poor',
        why: `Your contrast ratio of ${ratio.toFixed(2)}:1 fails all WCAG standards. This is below the minimum 3:1 required even for large text.`,
        impact: 'This color combination is not accessible. Many users, especially those with visual impairments, color blindness, or viewing on mobile devices in bright light, will not be able to read this text at all.',
        suggestion: `Immediate action required: Choose colors with much stronger contrast. If using a dark background, use white or very light text (#FFFFFF, #F5F5F5). If using a light background, use black or very dark text (#000000, #1A1A1A). Aim for at least 4.5:1, preferably 7:1.`
      };
    }
  };

  const explanation = getSemanticExplanation();

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

        {/* Semantic Explanation Section */}
        <div className="pt-6 sm:pt-4 border-t border-border space-y-4">
          <div className={`p-4 rounded-lg border ${
            explanation.status === 'excellent' ? 'bg-success/10 border-success/30' :
            explanation.status === 'good' ? 'bg-primary/10 border-primary/30' :
            explanation.status === 'minimal' ? 'bg-yellow-500/10 border-yellow-500/30' :
            'bg-destructive/10 border-destructive/30'
          }`}>
            <div className="flex items-start gap-3 mb-3">
              <AlertCircle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                explanation.status === 'excellent' ? 'text-success' :
                explanation.status === 'good' ? 'text-primary' :
                explanation.status === 'minimal' ? 'text-yellow-600' :
                'text-destructive'
              }`} />
              <div>
                <h4 className="font-semibold text-foreground mb-1">Why This Matters</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{explanation.why}</p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-muted/50 border border-border">
            <div className="flex items-start gap-3 mb-3">
              <Info className="w-5 h-5 mt-0.5 text-primary flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-foreground mb-1">User Impact</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{explanation.impact}</p>
              </div>
            </div>
          </div>

          <div className={`p-4 rounded-lg border ${
            explanation.status === 'excellent' || explanation.status === 'good' 
              ? 'bg-primary/5 border-primary/20' 
              : 'bg-yellow-500/5 border-yellow-500/20'
          }`}>
            <div className="flex items-start gap-3">
              <Lightbulb className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                explanation.status === 'excellent' || explanation.status === 'good' 
                  ? 'text-primary' 
                  : 'text-yellow-600'
              }`} />
              <div>
                <h4 className="font-semibold text-foreground mb-1">
                  {explanation.status === 'excellent' || explanation.status === 'good' 
                    ? 'Recommendation' 
                    : 'How to Fix'}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{explanation.suggestion}</p>
              </div>
            </div>
          </div>
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