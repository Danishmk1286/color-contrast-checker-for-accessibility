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
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-card-foreground flex items-center gap-2">
          <Palette className="w-4 h-4" />
          Color Selection
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div className="grid grid-cols-12 gap-4 items-center">
          {/* Left Column - 85% width with color inputs */}
          <div className="col-span-10 space-y-4">
            {/* Text Color Row */}
            <div className="space-y-2">
              <Label className="text-foreground text-sm font-medium">Text Color</Label>
              <div className="flex gap-3">
                <div 
                  className="w-10 h-10 rounded-lg border border-border cursor-pointer flex-shrink-0" 
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
                    className="bg-muted text-foreground border-border h-10"
                    placeholder="#000000" 
                  />
                </div>
              </div>
            </div>

            {/* Background Color Row */}
            <div className="space-y-2">
              <Label className="text-foreground text-sm font-medium">Background Color</Label>
              <div className="flex gap-3">
                <div 
                  className="w-10 h-10 rounded-lg border border-border cursor-pointer flex-shrink-0" 
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
                    className="bg-muted text-foreground border-border h-10"
                    placeholder="#FFFFFF" 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Swap Button */}
          <div className="col-span-2 flex justify-center">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleSwapColors}
              className="text-muted-foreground hover:text-foreground hover:bg-muted border-border h-10 w-10 p-0"
            >
              <ArrowUpDown className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ColorSelector;