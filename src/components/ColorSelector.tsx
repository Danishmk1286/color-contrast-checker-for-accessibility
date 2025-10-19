import React, { useState, useCallback, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
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

  // Convert RGB to HSL
  const rgbToHsl = (r: number, g: number, b: number): { h: number; s: number; l: number } => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }

    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  };

  // Convert HSL to RGB
  const hslToRgb = (h: number, s: number, l: number): { r: number; g: number; b: number } => {
    h /= 360;
    s /= 100;
    l /= 100;
    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }

    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
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

  const ColorControl = React.memo(({ 
    color, 
    onChange, 
    label 
  }: { 
    color: string; 
    onChange: (color: string) => void; 
    label: string;
  }) => {
    const [colorMode, setColorMode] = useState<'rgb' | 'hsl'>('rgb');
    
    const rgb = useMemo(() => hexToRgb(color), [color]);
    const hsl = useMemo(() => rgbToHsl(rgb.r, rgb.g, rgb.b), [rgb.r, rgb.g, rgb.b]);
    
    const handleRgbChange = useCallback((channel: 'r' | 'g' | 'b', value: number) => {
      const newRgb = { ...rgb, [channel]: value };
      onChange(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
    }, [rgb, onChange]);

    const handleHslChange = useCallback((channel: 'h' | 's' | 'l', value: number) => {
      const newHsl = { ...hsl, [channel]: value };
      const newRgb = hslToRgb(newHsl.h, newHsl.s, newHsl.l);
      onChange(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
    }, [hsl, onChange]);
    
    const handleHexChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      if (/^#[0-9A-F]{6}$/i.test(val)) {
        onChange(val);
      }
    }, [onChange]);
    
    const handleColorPickerChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    }, [onChange]);

    return (
      <div className="space-y-3 p-4 rounded-lg bg-muted/30 border-2 border-border/50">
        <Label className="text-foreground text-base sm:text-sm font-bold block">{label}</Label>
        
        {/* Color Picker + Hex Display */}
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={color}
            onChange={handleColorPickerChange}
            className="w-16 h-16 sm:w-14 sm:h-14 rounded-lg border-2 border-border cursor-pointer"
          />
          <div className="flex-1 relative">
            <Input
              type="text"
              value={color.toUpperCase()}
              onChange={handleHexChange}
              className="font-mono text-base sm:text-sm font-semibold pr-10"
              placeholder="#FFFFFF"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleCopyColor(color, label)}
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
            >
              <Copy className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* RGB/HSL Tabs */}
        <Tabs value={colorMode} onValueChange={(v) => setColorMode(v as 'rgb' | 'hsl')} className="w-full">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="rgb">RGB</TabsTrigger>
            <TabsTrigger value="hsl">HSL</TabsTrigger>
          </TabsList>
          
          <TabsContent value="rgb" className="space-y-3 pt-3">
            {/* Red Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <Label className="text-xs sm:text-sm font-medium">Red</Label>
                <span className="text-xs sm:text-sm font-mono text-muted-foreground">{rgb.r}</span>
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
                <Label className="text-xs sm:text-sm font-medium">Green</Label>
                <span className="text-xs sm:text-sm font-mono text-muted-foreground">{rgb.g}</span>
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
                <Label className="text-xs sm:text-sm font-medium">Blue</Label>
                <span className="text-xs sm:text-sm font-mono text-muted-foreground">{rgb.b}</span>
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

          <TabsContent value="hsl" className="space-y-3 pt-3">
            {/* Hue Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <Label className="text-xs sm:text-sm font-medium">Hue</Label>
                <span className="text-xs sm:text-sm font-mono text-muted-foreground">{hsl.h}°</span>
              </div>
              <Slider
                value={[hsl.h]}
                onValueChange={([value]) => handleHslChange('h', value)}
                max={360}
                step={1}
                className="w-full"
              />
            </div>

            {/* Saturation Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <Label className="text-xs sm:text-sm font-medium">Saturation</Label>
                <span className="text-xs sm:text-sm font-mono text-muted-foreground">{hsl.s}%</span>
              </div>
              <Slider
                value={[hsl.s]}
                onValueChange={([value]) => handleHslChange('s', value)}
                max={100}
                step={1}
                className="w-full"
              />
            </div>

            {/* Lightness Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <Label className="text-xs sm:text-sm font-medium">Lightness</Label>
                <span className="text-xs sm:text-sm font-mono text-muted-foreground">{hsl.l}%</span>
              </div>
              <Slider
                value={[hsl.l]}
                onValueChange={([value]) => handleHslChange('l', value)}
                max={100}
                step={1}
                className="w-full"
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    );
  });

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
