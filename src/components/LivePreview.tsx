import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
interface LivePreviewProps {
  textColor: string;
  backgroundColor: string;
}
const LivePreview: React.FC<LivePreviewProps> = ({
  textColor,
  backgroundColor
}) => {
  return (
    <div>
      {/* Mobile-First Full Width Preview */}
      <Card className="border-2 border-border overflow-hidden rounded-none md:rounded-lg" style={{
        backgroundColor,
        color: textColor
      }}>
        <div className="p-4 md:p-6 space-y-4 md:space-y-6" style={{
          backgroundColor,
          color: textColor
        }}>
          {/* Header - Responsive Layout */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b" style={{
            borderColor: textColor + '20'
          }}>
            <div className="flex items-center gap-3">
              <div className="text-base md:text-lg font-bold">Your Brand</div>
            </div>
            <div className="flex items-center gap-3 md:gap-4 text-sm overflow-x-auto">
              <span className="whitespace-nowrap">Home</span>
              <span className="whitespace-nowrap">About</span>
              <span className="whitespace-nowrap">Contact</span>
            </div>
          </div>

          {/* Hero Section - Mobile Optimized */}
          <div className="text-center py-4 md:py-6">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4">Welcome to Our Platform</h1>
            <div className="space-y-3 mb-6">
              <p className="text-lg md:text-xl lg:text-2xl font-semibold opacity-95">
                Large Text (24px) - AA at 3:1 contrast
              </p>
              <p className="text-base md:text-lg opacity-90">
                Normal Text (18px) - Readable size
              </p>
              <p className="text-sm md:text-base opacity-80">
                Normal Text (16px) - Needs ≥4.5:1 for AA
              </p>
            </div>
            <Button 
              className="w-full sm:w-auto px-6 py-3 md:py-2 rounded-none md:rounded-md font-medium text-base md:text-sm transition-transform active:scale-95" 
              style={{
                backgroundColor: textColor,
                color: backgroundColor,
                border: `1px solid ${textColor}`
              }}
            >
              Get Started Button
            </Button>
          </div>

          {/* Content Cards - Full width on mobile */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="p-4 rounded-none md:rounded-md" style={{
              backgroundColor: textColor + '10',
              color: textColor
            }}>
              <h3 className="font-semibold mb-2 text-sm md:text-base">Card Title</h3>
              <p className="text-xs md:text-sm opacity-80 mb-3">
                More content with text readability in 
                different contexts and layouts.
              </p>
              <div className="text-xs opacity-60">View Details →</div>
            </Card>

            <Card className="p-4 rounded-none md:rounded-md" style={{
              backgroundColor: textColor + '10',
              color: textColor
            }}>
              <h3 className="font-semibold mb-2 text-sm md:text-base">Another Card</h3>
              <p className="text-xs md:text-sm opacity-80 mb-3">
                Testing readability across various 
                interface components.
              </p>
              <div className="text-xs opacity-60">View Details →</div>
            </Card>
          </div>

          {/* Form Elements - Mobile Friendly */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm md:text-base">Form Elements</h3>
            <div className="space-y-3">
              <label className="block text-xs md:text-sm font-medium">Input Label</label>
              <div className="w-full p-3 md:p-2 rounded-none md:rounded border text-sm" style={{
                borderColor: textColor + '40',
                backgroundColor: backgroundColor,
                color: textColor,
                minHeight: '44px' // Better touch target for mobile
              }}>
                Placeholder text with descriptive text
              </div>
              
              <div className="flex items-center gap-3 py-1">
                <div className="w-5 h-5 border rounded flex-shrink-0" style={{
                  borderColor: textColor + '60'
                }} />
                <span className="text-xs md:text-sm">Checkbox with descriptive text</span>
              </div>
              
              {/* Button Group - Stack on mobile, full width */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  className="w-full sm:w-auto px-4 py-3 sm:py-2 rounded-none md:rounded text-sm transition-transform active:scale-95" 
                  style={{
                    backgroundColor: textColor + '20',
                    color: textColor,
                    border: `1px solid ${textColor + '40'}`,
                    minHeight: '44px'
                  }}
                >
                  Secondary Button
                </Button>
                <Button 
                  className="w-full sm:w-auto px-4 py-3 sm:py-2 rounded-none md:rounded text-sm transition-transform active:scale-95" 
                  style={{
                    backgroundColor: textColor,
                    color: backgroundColor,
                    minHeight: '44px'
                  }}
                >
                  Primary Button
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile Typography Showcase */}
          <div className="space-y-3 pt-4 border-t" style={{ borderColor: textColor + '20' }}>
            <h4 className="font-semibold text-xs md:text-sm opacity-75">Typography Test</h4>
            <div className="space-y-2 text-xs md:text-sm">
              <div className="opacity-90">✓ This text should be clearly readable</div>
              <div className="opacity-80">✓ Secondary information remains accessible</div>
              <div className="opacity-70">✓ Supporting text maintains legibility</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
export default LivePreview;