import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Palette } from 'lucide-react';

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
  return (
    <Card className="bg-sidebar-background border-sidebar-border">
      <CardHeader>
        <CardTitle className="text-sidebar-foreground flex items-center gap-2">
          <Palette className="w-4 h-4" />
          Color Selection
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Text Color */}
        <div className="space-y-3">
          <Label className="text-sidebar-foreground text-sm font-medium">Text Color</Label>
          <div className="flex gap-3">
            <div 
              className="w-12 h-12 rounded-lg border border-sidebar-border cursor-pointer"
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
                className="bg-sidebar-accent text-sidebar-foreground border-sidebar-border"
                placeholder="#000000"
              />
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full text-xs text-sidebar-foreground hover:bg-sidebar-accent"
              >
                Choose
              </Button>
            </div>
          </div>
        </div>

        {/* Background Color */}
        <div className="space-y-3">
          <Label className="text-sidebar-foreground text-sm font-medium">Background Color</Label>
          <div className="flex gap-3">
            <div 
              className="w-12 h-12 rounded-lg border border-sidebar-border cursor-pointer"
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
                className="bg-sidebar-accent text-sidebar-foreground border-sidebar-border"
                placeholder="#FFFFFF"
              />
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full text-xs text-sidebar-foreground hover:bg-sidebar-accent"
              >
                Choose
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ColorSelector;