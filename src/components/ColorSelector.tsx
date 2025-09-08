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
  onBackgroundColorChange,
}) => {
  const handleSwapColors = () => {
    onTextColorChange(backgroundColor);
    onBackgroundColorChange(textColor);
  };

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Palette className="w-5 h-5" />
          Color Selection
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Text Color */}
        <div className="space-y-3">
          <Label className="text-foreground text-sm font-medium">Text Color</Label>
          <div className="flex items-center gap-3">
            <div 
              className="w-16 h-16 rounded-lg border-2 border-border cursor-pointer shadow-sm"
              style={{ backgroundColor: textColor }}
              onClick={() => document.getElementById('text-color-input')?.click()}
            />
            <div className="flex-1 space-y-2">
              <Input
                id="text-color-input"
                type="color"
                value={textColor}
                onChange={(e) => onTextColorChange(e.target.value)}
                className="opacity-0 absolute w-0 h-0"
              />
              <Input
                type="text"
                value={textColor.toUpperCase()}
                onChange={(e) => onTextColorChange(e.target.value)}
                className="bg-background text-foreground border-border text-center font-mono"
                placeholder="#000000"
              />
            </div>
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <Button 
            variant="outline"
            size="sm"
            onClick={handleSwapColors}
            className="gap-2 border-border hover:bg-accent"
          >
            <ArrowUpDown className="w-4 h-4" />
            Swap Colors
          </Button>
        </div>

        {/* Background Color */}
        <div className="space-y-3">
          <Label className="text-foreground text-sm font-medium">Background Color</Label>
          <div className="flex items-center gap-3">
            <div 
              className="w-16 h-16 rounded-lg border-2 border-border cursor-pointer shadow-sm"
              style={{ backgroundColor: backgroundColor }}
              onClick={() => document.getElementById('bg-color-input')?.click()}
            />
            <div className="flex-1 space-y-2">
              <Input
                id="bg-color-input"
                type="color"
                value={backgroundColor}
                onChange={(e) => onBackgroundColorChange(e.target.value)}
                className="opacity-0 absolute w-0 h-0"
              />
              <Input
                type="text"
                value={backgroundColor.toUpperCase()}
                onChange={(e) => onBackgroundColorChange(e.target.value)}
                className="bg-background text-foreground border-border text-center font-mono"
                placeholder="#FFFFFF"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ColorSelector;