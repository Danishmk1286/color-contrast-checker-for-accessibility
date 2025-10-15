import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, TrendingUp, Smartphone, Monitor, AlertCircle, Lightbulb, Info, Sparkles, Loader2 } from 'lucide-react';
import { useAccessibilityAI } from '@/hooks/useAccessibilityAI';

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

// Helper function to generate accessible color alternatives
const generateAccessibleColor = (textColor: string, bgColor: string, currentRatio: number): { text: string; bg: string } => {
  // Parse hex colors
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  };

  const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + [r, g, b].map(x => {
      const hex = Math.round(x).toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    }).join('');
  };

  const bgRgb = hexToRgb(bgColor);
  const textRgb = hexToRgb(textColor);
  
  // Calculate luminance
  const getLuminance = (rgb: { r: number; g: number; b: number }) => {
    const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(val => {
      const v = val / 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  const bgLum = getLuminance(bgRgb);
  const textLum = getLuminance(textRgb);

  // If contrast is already good, return original colors
  if (currentRatio >= 4.5) {
    return { text: textColor, bg: bgColor };
  }

  // Determine if we should lighten or darken
  const shouldLightenText = bgLum < 0.5;

  // Adjust text color for better contrast
  let newTextRgb = { ...textRgb };
  if (shouldLightenText) {
    // Lighten the text
    const factor = 1 + (4.5 - currentRatio) * 0.3;
    newTextRgb.r = Math.min(255, textRgb.r * factor);
    newTextRgb.g = Math.min(255, textRgb.g * factor);
    newTextRgb.b = Math.min(255, textRgb.b * factor);
  } else {
    // Darken the text
    const factor = 1 - (4.5 - currentRatio) * 0.2;
    newTextRgb.r = Math.max(0, textRgb.r * factor);
    newTextRgb.g = Math.max(0, textRgb.g * factor);
    newTextRgb.b = Math.max(0, textRgb.b * factor);
  }

  return {
    text: rgbToHex(newTextRgb.r, newTextRgb.g, newTextRgb.b),
    bg: bgColor
  };
}

const ContrastResults: React.FC<ContrastResultsProps> = ({ result, textColor, backgroundColor }) => {
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
  const { generateExplanation, isModelLoaded } = useAccessibilityAI();
  const [aiEnhanced, setAiEnhanced] = useState(false);
  const [aiExplanation, setAiExplanation] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    // Auto-generate AI explanation when model is loaded and there are issues
    if (isModelLoaded && result.ratio < 7 && !aiEnhanced) {
      handleAIEnhance();
    }
  }, [isModelLoaded, result.ratio]);

  const handleAIEnhance = async () => {
    setIsGenerating(true);
    const aiResult = await generateExplanation(result.ratio, textColor, backgroundColor);
    setAiExplanation(aiResult);
    setAiEnhanced(true);
    setIsGenerating(false);
  };

  const displayExplanation = aiEnhanced && aiExplanation ? aiExplanation : explanation;

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
    <Card className="border-border bg-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-foreground flex items-center gap-2 text-lg">
          <TrendingUp className="w-5 h-5 text-primary" />
          Contrast Results
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Contrast Ratio Display */}
        <div className="text-center py-4 bg-gradient-to-br from-muted to-muted/50 rounded-lg border border-border/50">
          <div className="text-xs text-muted-foreground mb-1 font-medium">Contrast Ratio</div>
          <div className="text-3xl font-bold text-foreground mb-1">
            {result.ratio.toFixed(2)}:1
          </div>
          <div className="text-sm font-medium">
            {result.ratio >= 4.5 ? (
              <span className="text-success">✓ Passes AA</span>
            ) : result.ratio >= 3 ? (
              <span className="text-yellow-600">⚠ Large text only</span>
            ) : (
              <span className="text-destructive">✗ Needs improvement</span>
            )}
          </div>
        </div>

        {/* WCAG Compliance Badges - Simplified */}
        <div className="grid grid-cols-2 gap-2">
          <div className={`p-3 rounded-lg border text-center ${result.aaNormal ? 'bg-success/10 border-success/30' : 'bg-muted border-border'}`}>
            <div className="text-xs font-semibold mb-1 flex items-center justify-center gap-1">
              {result.aaNormal ? <CheckCircle className="w-3 h-3 text-success" /> : <XCircle className="w-3 h-3 text-muted-foreground" />}
              AA Normal
            </div>
            <div className="text-xs text-muted-foreground">4.5:1</div>
          </div>
          
          <div className={`p-3 rounded-lg border text-center ${result.aaLarge ? 'bg-success/10 border-success/30' : 'bg-muted border-border'}`}>
            <div className="text-xs font-semibold mb-1 flex items-center justify-center gap-1">
              {result.aaLarge ? <CheckCircle className="w-3 h-3 text-success" /> : <XCircle className="w-3 h-3 text-muted-foreground" />}
              AA Large
            </div>
            <div className="text-xs text-muted-foreground">3:1</div>
          </div>
          
          <div className={`p-3 rounded-lg border text-center ${result.aaaNormal ? 'bg-success/10 border-success/30' : 'bg-muted border-border'}`}>
            <div className="text-xs font-semibold mb-1 flex items-center justify-center gap-1">
              {result.aaaNormal ? <CheckCircle className="w-3 h-3 text-success" /> : <XCircle className="w-3 h-3 text-muted-foreground" />}
              AAA Normal
            </div>
            <div className="text-xs text-muted-foreground">7:1</div>
          </div>
          
          <div className={`p-3 rounded-lg border text-center ${result.aaaLarge ? 'bg-success/10 border-success/30' : 'bg-muted border-border'}`}>
            <div className="text-xs font-semibold mb-1 flex items-center justify-center gap-1">
              {result.aaaLarge ? <CheckCircle className="w-3 h-3 text-success" /> : <XCircle className="w-3 h-3 text-muted-foreground" />}
              AAA Large
            </div>
            <div className="text-xs text-muted-foreground">4.5:1</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContrastResults;