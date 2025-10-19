import React, { useState, useCallback, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Copy } from 'lucide-react';
import { hexToRgb, rgbToHex, rgbToHsl, hslToRgb } from '@/lib/colorUtils';

interface ColorControlProps {
  color: string;
  onChange: (color: string) => void;
  label: string;
  onCopy: (color: string, label: string) => void;
}

const ColorControl = React.memo<ColorControlProps>(({ 
  color, 
  onChange, 
  label,
  onCopy
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

  const handleCopyClick = useCallback(() => {
    onCopy(color, label);
  }, [color, label, onCopy]);

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
            onClick={handleCopyClick}
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

ColorControl.displayName = 'ColorControl';

export default ColorControl;
