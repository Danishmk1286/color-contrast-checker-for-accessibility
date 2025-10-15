import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Palette, ArrowUpDown, Copy, Pipette } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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

  // Convert hex to RGB
  const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  };

  // Convert RGB to hex
  const rgbToHex = (r: number, g: number, b: number): string => {
    return '#' + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
  };

  const handleSwapColors = () => {
    onTextColorChange(backgroundColor);
    onBackgroundColorChange(textColor);
  };

  const handleCopyColor = (color: string, label: string) => {
    navigator.clipboard.writeText(color);
    toast({
      title: "Color copied!",
      description: `${label} ${color} copied to clipboard`,
    });
  };

  const ColorControl = ({ 
    color, 
    onChange, 
    label 
  }: { 
    color: string; 
    onChange: (color: string) => void; 
    label: string;
  }) => {
    const rgb = hexToRgb(color);
    
    const handleRgbChange = (channel: 'r' | 'g' | 'b', value: number) => {
      const newRgb = { ...rgb, [channel]: value };
      onChange(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
    };

    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-foreground text-sm font-semibold">{label}</Label>
        </div>
        
        {/* Color Picker + Hex Input Row */}
        <div className="flex gap-3 items-center">
          <div className="relative group">
            <Input
              type="color"
              value={color}
              onChange={(e) => onChange(e.target.value)}
              className="w-16 h-16 cursor-pointer border-2 border-border rounded-lg overflow-hidden p-1 hover:border-primary transition-colors"
              title="Pick a color"
            />
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <div className="bg-popover text-popover-foreground text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap">
                <Pipette className="w-3 h-3 inline mr-1" />
                Pick color
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="relative">
              <Input
                type="text"
                value={color.toUpperCase()}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^#[0-9A-F]{6}$/i.test(value)) {
                    onChange(value);
                  }
                }}
                className="font-mono text-lg font-bold uppercase pr-12"
                placeholder="#FFFFFF"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleCopyColor(color, label)}
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                title="Copy to clipboard"
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* RGB Sliders */}
        <div className="space-y-3 pt-2">
          {/* Red Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <Label className="text-xs text-muted-foreground">Red</Label>
              <span className="text-xs font-mono font-medium text-foreground">{rgb.r}</span>
            </div>
            <Slider
              value={[rgb.r]}
              onValueChange={([value]) => handleRgbChange('r', value)}
              max={255}
              step={1}
              className="w-full"
            />
          </div>

          {/* Green Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <Label className="text-xs text-muted-foreground">Green</Label>
              <span className="text-xs font-mono font-medium text-foreground">{rgb.g}</span>
            </div>
            <Slider
              value={[rgb.g]}
              onValueChange={([value]) => handleRgbChange('g', value)}
              max={255}
              step={1}
              className="w-full"
            />
          </div>

          {/* Blue Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <Label className="text-xs text-muted-foreground">Blue</Label>
              <span className="text-xs font-mono font-medium text-foreground">{rgb.b}</span>
            </div>
            <Slider
              value={[rgb.b]}
              onValueChange={([value]) => handleRgbChange('b', value)}
              max={255}
              step={1}
              className="w-full"
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-4">
        <CardTitle className="text-card-foreground flex items-center gap-2 text-lg">
          <Palette className="w-5 h-5 text-primary" />
          Choose Colors
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-1">Pick colors or adjust with sliders</p>
      </CardHeader>
      <CardContent className="space-y-5">
        <ColorControl 
          color={backgroundColor}
          onChange={onBackgroundColorChange}
          label="Background Color"
        />
        
        <ColorControl 
          color={textColor}
          onChange={onTextColorChange}
          label="Text Color"
        />

        {/* Swap Button */}
        <div className="flex justify-center pt-2">
          <Button 
            variant="outline" 
            onClick={handleSwapColors}
            className="gap-2 w-full"
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