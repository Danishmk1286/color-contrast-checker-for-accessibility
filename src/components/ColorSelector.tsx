import React, { useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Palette, ArrowUpDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ColorControl from '@/components/ColorControl';

interface ColorSelectorProps {
  textColor: string;
  backgroundColor: string;
  onTextColorChange: (color: string) => void;
  onBackgroundColorChange: (color: string) => void;
}

const ColorSelector: React.FC<ColorSelectorProps> = ({
  textColor,
  backgroundColor,
  onTextColorChange,
  onBackgroundColorChange
}) => {
  const { toast } = useToast();

  const handleSwapColors = useCallback(() => {
    onTextColorChange(backgroundColor);
    onBackgroundColorChange(textColor);
  }, [backgroundColor, textColor, onTextColorChange, onBackgroundColorChange]);

  const handleCopyColor = useCallback((color: string, label: string) => {
    navigator.clipboard.writeText(color);
    toast({
      title: "Color copied!",
      description: `${label} ${color} copied to clipboard`,
    });
  }, [toast]);

  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-3 px-4 sm:px-6 pt-4 sm:pt-6">
        <CardTitle className="text-card-foreground flex items-center gap-2 text-base sm:text-lg">
          <Palette className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
          Color Selection
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 px-4 sm:px-6 pb-4 sm:pb-6">
        <ColorControl 
          color={backgroundColor}
          onChange={onBackgroundColorChange}
          label="Background Colour"
          onCopy={handleCopyColor}
        />
        
        <div className="relative py-3">
          <Separator className="absolute top-1/2 -translate-y-1/2" />
          <div className="relative flex justify-center">
            <span className="bg-card px-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">
              or
            </span>
          </div>
        </div>
        
        <ColorControl 
          color={textColor}
          onChange={onTextColorChange}
          label="Foreground Colour"
          onCopy={handleCopyColor}
        />

        {/* Swap Button */}
        <div className="flex justify-center pt-1">
          <Button 
            variant="outline" 
            onClick={handleSwapColors}
            className="gap-2 w-full sm:w-auto"
            size="sm"
          >
            <ArrowUpDown className="w-4 h-4" />
            Swap Colors
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ColorSelector;
