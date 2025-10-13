import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, ArrowLeftRight, AlertCircle, CheckCircle } from 'lucide-react';

interface AdaptiveUISimulationProps {
  currentTextColor: string;
  currentBgColor: string;
  suggestedTextColor: string;
  suggestedBgColor: string;
  hasIssue: boolean;
}

const AdaptiveUISimulation: React.FC<AdaptiveUISimulationProps> = ({
  currentTextColor,
  currentBgColor,
  suggestedTextColor,
  suggestedBgColor,
  hasIssue,
}) => {
  const [viewMode, setViewMode] = useState<'split' | 'toggle'>('split');
  const [showCurrent, setShowCurrent] = useState(true);

  const UIExample = ({ textColor, bgColor, label, isAccessible }: { 
    textColor: string; 
    bgColor: string; 
    label: string;
    isAccessible: boolean;
  }) => (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <Badge variant={isAccessible ? "default" : "destructive"} className="text-xs">
          {isAccessible ? (
            <><CheckCircle className="w-3 h-3 mr-1" /> Accessible</>
          ) : (
            <><AlertCircle className="w-3 h-3 mr-1" /> Issues Found</>
          )}
        </Badge>
      </div>

      {/* Button Example */}
      <div>
        <p className="text-xs text-muted-foreground mb-2">Button Component</p>
        <button
          style={{ 
            backgroundColor: bgColor, 
            color: textColor,
            transition: 'all 0.2s ease-out'
          }}
          className="px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          Click Me
        </button>
      </div>

      {/* Alert Example */}
      <div>
        <p className="text-xs text-muted-foreground mb-2">Alert Component</p>
        <div
          style={{ 
            backgroundColor: bgColor, 
            color: textColor,
            transition: 'all 0.2s ease-out'
          }}
          className="p-3 rounded-lg border border-border/20"
        >
          <p className="text-sm font-medium mb-1">Important Notice</p>
          <p className="text-xs">This is an example alert message to test readability.</p>
        </div>
      </div>

      {/* Card Example */}
      <div>
        <p className="text-xs text-muted-foreground mb-2">Card Component</p>
        <div
          style={{ 
            backgroundColor: bgColor, 
            color: textColor,
            transition: 'all 0.2s ease-out'
          }}
          className="p-4 rounded-lg border border-border/20"
        >
          <h3 className="font-semibold mb-2">Card Title</h3>
          <p className="text-sm">This card demonstrates how your color choices affect real UI components and content readability.</p>
        </div>
      </div>

      {/* Text Example */}
      <div>
        <p className="text-xs text-muted-foreground mb-2">Text Content</p>
        <div
          style={{ 
            backgroundColor: bgColor, 
            color: textColor,
            transition: 'all 0.2s ease-out'
          }}
          className="p-4 rounded-lg"
        >
          <h4 className="font-bold text-base mb-2">Large Heading Text</h4>
          <p className="text-sm leading-relaxed">
            Normal body text at standard size. This helps you evaluate readability for longer content blocks.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-foreground flex items-center gap-2">
            <Eye className="w-5 h-5 text-primary" />
            Real-Time UI Simulation
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'split' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('split')}
              className="text-xs"
            >
              Split View
            </Button>
            <Button
              variant={viewMode === 'toggle' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('toggle')}
              className="text-xs"
            >
              <ArrowLeftRight className="w-3 h-3" />
            </Button>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          See how your colors perform in real UI components. {hasIssue ? 'Compare current issues with accessible alternatives.' : 'Your colors look great!'}
        </p>
      </CardHeader>
      <CardContent>
        {viewMode === 'split' ? (
          <div className="grid md:grid-cols-2 gap-6">
            <UIExample
              textColor={currentTextColor}
              bgColor={currentBgColor}
              label="Current Colors"
              isAccessible={!hasIssue}
            />
            {hasIssue && (
              <UIExample
                textColor={suggestedTextColor}
                bgColor={suggestedBgColor}
                label="Accessible Alternative"
                isAccessible={true}
              />
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-center">
              <Button
                variant="outline"
                onClick={() => setShowCurrent(!showCurrent)}
                className="gap-2"
              >
                <ArrowLeftRight className="w-4 h-4" />
                {showCurrent ? 'Show Accessible Version' : 'Show Current Version'}
              </Button>
            </div>
            <div className="animate-fade-in">
              <UIExample
                textColor={showCurrent ? currentTextColor : suggestedTextColor}
                bgColor={showCurrent ? currentBgColor : suggestedBgColor}
                label={showCurrent ? 'Current Colors' : 'Accessible Alternative'}
                isAccessible={!showCurrent || !hasIssue}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdaptiveUISimulation;
