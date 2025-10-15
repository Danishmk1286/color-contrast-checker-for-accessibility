import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Palette, ArrowUpDown, Copy } from 'lucide-react';
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
      <div className="space-y-4">
        <Label className="text-foreground text-sm font-medium">{label}</Label>
        
        {/* Hex Display */}
        <div className="relative">
          <div 
            className="w-full p-6 rounded-lg border-2 border-border flex items-center justify-between group cursor-pointer hover:border-primary/50 transition-colors"
            style={{ backgroundColor: color }}
          >
            <span className="text-4xl font-bold font-mono" style={{ 
              color: label.includes('Background') ? textColor : backgroundColor,
              textShadow: '0 0 20px rgba(0,0,0,0.1)'
            }}>
              {color.toUpperCase()}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleCopyColor(color, label)}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ 
                color: label.includes('Background') ? textColor : backgroundColor 
              }}
            >
              <Copy className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* RGB/HSL Tabs */}
        <Tabs defaultValue="rgb" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="rgb" className="flex-1">RGB</TabsTrigger>
            <TabsTrigger value="hsl" className="flex-1">HSL</TabsTrigger>
          </TabsList>
          
          <TabsContent value="rgb" className="space-y-4 pt-4">
            {/* Red Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label className="text-sm">Red {rgb.r}</Label>
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
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label className="text-sm">Green {rgb.g}</Label>
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
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label className="text-sm">Blue {rgb.b}</Label>
              </div>
              <Slider
                value={[rgb.b]}
                onValueChange={([value]) => handleRgbChange('b', value)}
                max={255}
                step={1}
                className="w-full"
              />
            </div>
          </TabsContent>

          <TabsContent value="hsl" className="pt-4">
            <p className="text-sm text-muted-foreground text-center py-4">HSL controls coming soon</p>
          </TabsContent>
        </Tabs>
      </div>
    );
  };

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-card-foreground flex items-center gap-3">
          <Palette className="w-5 h-5 text-primary" />
          Color Selection
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <ColorControl 
            color={backgroundColor}
            onChange={onBackgroundColorChange}
            label="Background colour"
          />
          
          <ColorControl 
            color={textColor}
            onChange={onTextColorChange}
            label="Foreground colour"
          />
        </div>

        {/* Swap Button */}
        <div className="flex justify-center pt-2">
          <Button 
            variant="outline" 
            onClick={handleSwapColors}
            className="gap-2"
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