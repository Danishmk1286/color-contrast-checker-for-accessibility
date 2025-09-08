import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Monitor, Smartphone } from 'lucide-react';

interface LivePreviewProps {
  textColor: string;
  backgroundColor: string;
}

const LivePreview: React.FC<LivePreviewProps> = ({ textColor, backgroundColor }) => {
  return (
    <div className="space-y-6">
      {/* Preview Header */}
      <div className="flex items-center gap-2">
        <Monitor className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-semibold text-foreground">Live Preview</h2>
      </div>
      
      {/* Simple Preview Section */}
      <Card 
        className="border-2 border-border shadow-lg overflow-hidden"
        style={{ backgroundColor, color: textColor }}
      >
        <div className="p-8 space-y-6" style={{ backgroundColor, color: textColor }}>
          {/* Sample Content */}
          <div className="space-y-4">
            <h1 className="text-2xl font-bold">Sample Heading</h1>
            <p className="text-lg">
              Large text (18px+) - AA needs 3:1 contrast ratio
            </p>
            <p className="text-base">
              Normal text (16px) - AA needs 4.5:1 contrast ratio  
            </p>
            <p className="text-sm">
              Small text (14px) - Requires highest contrast
            </p>
          </div>

          {/* Sample Button */}
          <div className="pt-4">
            <Button 
              className="px-6 py-3 rounded-lg font-semibold"
              style={{ 
                backgroundColor: textColor, 
                color: backgroundColor,
                border: `2px solid ${textColor}`
              }}
            >
              Sample Button
            </Button>
          </div>

          {/* Text Variations */}
          <div className="pt-4 border-t" style={{ borderColor: textColor + '30' }}>
            <div className="grid grid-cols-1 gap-3">
              <div className="font-bold">Bold Text Sample</div>
              <div className="italic">Italic Text Sample</div>
              <div className="underline">Underlined Text</div>
              <div className="opacity-80">Secondary Text (80% opacity)</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LivePreview;