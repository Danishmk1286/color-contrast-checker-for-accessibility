import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Palette, ArrowUpDown } from 'lucide-react';

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
  const handleSwapColors = () => {
    onTextColorChange(backgroundColor);
    onBackgroundColorChange(textColor);
  };

  return (
    <Card className="border-border bg-card rounded-none md:rounded-lg">
      <CardHeader className="pb-4">
        <CardTitle className="text-card-foreground flex items-center gap-2 text-lg">
          <Palette className="w-5 h-5" />
          Color Selection
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 md:p-6 pt-0">
        <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-12 md:gap-4 md:items-center">
          {/* Color Inputs - Stack on mobile, side by side on desktop */}
          <div className="md:col-span-10 space-y-4">
            {/* Text Color Row */}
            <div className="space-y-3">
              <Label className="text-foreground text-sm font-medium">Text Color (Foreground)</Label>
              <div className="flex gap-3">
                <div 
                  className="w-12 h-12 md:w-10 md:h-10 rounded-lg border border-border cursor-pointer flex-shrink-0 transition-transform active:scale-95" 
                  style={{ backgroundColor: textColor }}
                  onClick={() => document.getElementById('text-color-input')?.click()} 
                />
                <div className="flex-1">
                  <Input 
                    id="text-color-input" 
                    type="color" 
                    value={textColor} 
                    onChange={e => onTextColorChange(e.target.value)} 
                    className="opacity-0 absolute w-0 h-0" 
                  />
                  <Input 
                    type="text" 
                    value={textColor.toUpperCase()} 
                    onChange={e => onTextColorChange(e.target.value)} 
                    className="bg-muted text-foreground border-border h-12 md:h-10 text-base md:text-sm rounded-none md:rounded-md"
                    placeholder="#000000" 
                  />
                </div>
              </div>
            </div>

            {/* Background Color Row */}
            <div className="space-y-3">
              <Label className="text-foreground text-sm font-medium">Background Color</Label>
              <div className="flex gap-3">
                <div 
                  className="w-12 h-12 md:w-10 md:h-10 rounded-lg border border-border cursor-pointer flex-shrink-0 transition-transform active:scale-95" 
                  style={{ backgroundColor: backgroundColor }}
                  onClick={() => document.getElementById('bg-color-input')?.click()} 
                />
                <div className="flex-1">
                  <Input 
                    id="bg-color-input" 
                    type="color" 
                    value={backgroundColor} 
                    onChange={e => onBackgroundColorChange(e.target.value)} 
                    className="opacity-0 absolute w-0 h-0" 
                  />
                  <Input 
                    type="text" 
                    value={backgroundColor.toUpperCase()} 
                    onChange={e => onBackgroundColorChange(e.target.value)} 
                    className="bg-muted text-foreground border-border h-12 md:h-10 text-base md:text-sm rounded-none md:rounded-md"
                    placeholder="#FFFFFF" 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Swap Button - Center on mobile, right side on desktop */}
          <div className="flex justify-center md:col-span-2 md:justify-center">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleSwapColors}
              className="text-muted-foreground hover:text-foreground hover:bg-muted border-border h-12 w-12 md:h-10 md:w-10 p-0 transition-transform active:scale-95 rounded-full md:rounded-md"
              aria-label="Swap colors"
            >
              <ArrowUpDown className="w-5 h-5 md:w-4 md:h-4" />
            </Button>
          </div>
        </div>

        {/* Mobile Helper Text */}
        <div className="mt-4 text-xs text-muted-foreground text-center md:hidden">
          Tap the color squares to open color picker
        </div>
      </CardContent>
    </Card>
  );
};

export default ColorSelector;