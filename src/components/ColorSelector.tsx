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
    <Card className="border-border bg-card rounded-lg sm:rounded-none md:rounded-lg shadow-sm sm:shadow-none md:shadow-sm">
      <CardHeader className="pb-6 sm:pb-4 px-6 sm:px-4 md:px-6 pt-6 sm:pt-4 md:pt-6">
        <CardTitle className="text-card-foreground flex items-center justify-center sm:justify-start gap-3 text-xl sm:text-lg">
          <Palette className="w-6 h-6 sm:w-5 sm:h-5 text-primary" />
          Color Selection
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6 sm:px-4 md:p-6 pb-6 sm:pb-4 md:pb-6 pt-0">
        <div className="space-y-6 sm:space-y-4 md:space-y-0 md:grid md:grid-cols-12 md:gap-4 md:items-center">
          {/* Color Inputs - Professional mobile spacing */}
          <div className="md:col-span-10 space-y-6 sm:space-y-4">
            {/* Text Color Row */}
            <div className="space-y-4 sm:space-y-3">
              <Label className="text-foreground text-base sm:text-sm font-medium">Text Color (Foreground)</Label>
              <div className="flex gap-4 sm:gap-3">
                <div 
                  className="w-14 h-14 sm:w-12 sm:h-12 md:w-10 md:h-10 rounded-xl sm:rounded-lg border-2 sm:border border-border cursor-pointer flex-shrink-0 transition-all active:scale-95 hover:shadow-sm" 
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
                    className="bg-muted text-foreground border-border h-14 sm:h-12 md:h-10 text-lg sm:text-base md:text-sm rounded-xl sm:rounded-lg md:rounded-md font-mono tracking-wider"
                    placeholder="#000000" 
                  />
                </div>
              </div>
            </div>

            {/* Background Color Row */}
            <div className="space-y-4 sm:space-y-3">
              <Label className="text-foreground text-base sm:text-sm font-medium">Background Color</Label>
              <div className="flex gap-4 sm:gap-3">
                <div 
                  className="w-14 h-14 sm:w-12 sm:h-12 md:w-10 md:h-10 rounded-xl sm:rounded-lg border-2 sm:border border-border cursor-pointer flex-shrink-0 transition-all active:scale-95 hover:shadow-sm" 
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
                    className="bg-muted text-foreground border-border h-14 sm:h-12 md:h-10 text-lg sm:text-base md:text-sm rounded-xl sm:rounded-lg md:rounded-md font-mono tracking-wider"
                    placeholder="#FFFFFF" 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Swap Button - Professional mobile design */}
          <div className="flex justify-center md:col-span-2 md:justify-center pt-2 sm:pt-0">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleSwapColors}
              className="text-muted-foreground hover:text-foreground hover:bg-muted border-border h-14 w-14 sm:h-12 sm:w-12 md:h-10 md:w-10 p-0 transition-all active:scale-95 rounded-xl sm:rounded-full md:rounded-md shadow-sm hover:shadow-md"
              aria-label="Swap colors"
            >
              <ArrowUpDown className="w-6 h-6 sm:w-5 sm:h-5 md:w-4 md:h-4" />
            </Button>
          </div>
        </div>

        {/* Mobile Helper Text - Enhanced */}
        <div className="mt-6 sm:mt-4 md:hidden p-4 bg-primary/5 rounded-lg border border-primary/20">
          <p className="text-sm text-muted-foreground text-center">
            <span className="font-medium">💡 Tip:</span> Tap the color squares to open color picker or type hex codes directly
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ColorSelector;