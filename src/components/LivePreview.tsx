import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
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
      {/* Professional Mobile-First Preview */}
      <Card className="border-2 border-border overflow-hidden rounded-xl sm:rounded-none md:rounded-lg shadow-lg sm:shadow-none md:shadow-lg" style={{
        backgroundColor,
        color: textColor
      }}>
        <div className="p-6 sm:p-4 md:p-6 space-y-8 sm:space-y-4 md:space-y-6" style={{
          backgroundColor,
          color: textColor
        }}>
          {/* Header - Professional mobile design */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-3 pb-6 sm:pb-4 border-b-2 sm:border-b" style={{
            borderColor: textColor + '30'
          }}>
            <div className="flex items-center gap-4 sm:gap-3">
              <div className="text-xl sm:text-base md:text-lg font-bold">Your Brand</div>
            </div>
            <div className="flex items-center gap-5 sm:gap-3 md:gap-4 text-base sm:text-sm overflow-x-auto pb-1">
              <span className="whitespace-nowrap font-medium">Home</span>
              <span className="whitespace-nowrap">About</span>
              <span className="whitespace-nowrap">Contact</span>
            </div>
          </div>

          {/* Hero Section - Enhanced mobile layout */}
          <div className="text-center py-8 sm:py-4 md:py-6">
            <h1 className="text-2xl sm:text-xl md:text-2xl lg:text-3xl font-bold mb-6 sm:mb-4 leading-tight">Welcome to Our Platform</h1>
            <div className="space-y-4 sm:space-y-3 mb-8 sm:mb-6">
              <p className="text-xl sm:text-lg md:text-xl lg:text-2xl font-semibold opacity-95 leading-relaxed">
                Large Text (24px) - AA at 3:1 contrast
              </p>
              <p className="text-lg sm:text-base md:text-lg opacity-90 leading-relaxed">
                Normal Text (18px) - Readable size
              </p>
              <p className="text-base sm:text-sm md:text-base opacity-80 leading-relaxed">
                Normal Text (16px) - Needs ≥4.5:1 for AA
              </p>
            </div>
            <Button 
              className="w-full sm:w-auto px-8 py-4 sm:px-6 sm:py-3 md:py-2 rounded-xl sm:rounded-none md:rounded-md font-medium text-lg sm:text-base md:text-sm transition-all active:scale-98 shadow-lg hover:shadow-xl" 
              style={{
                backgroundColor: textColor,
                color: backgroundColor,
                border: `2px solid ${textColor}`,
                minHeight: '56px'
              }}
            >
              Get Started Button
            </Button>
          </div>

          {/* Content Cards - Professional mobile spacing */}
          <div className="grid gap-6 sm:gap-4 md:grid-cols-2">
            <Card className="p-6 sm:p-4 rounded-xl sm:rounded-none md:rounded-md shadow-md border-0 sm:border" style={{
              backgroundColor: textColor + '15',
              color: textColor,
              borderColor: textColor + '20'
            }}>
              <h3 className="font-semibold mb-3 sm:mb-2 text-lg sm:text-sm md:text-base">Card Title</h3>
              <p className="text-base sm:text-xs md:text-sm opacity-85 mb-4 sm:mb-3 leading-relaxed">
                More content with text readability in 
                different contexts and layouts.
              </p>
              <div className="text-sm sm:text-xs opacity-70 font-medium">View Details →</div>
            </Card>

            <Card className="p-6 sm:p-4 rounded-xl sm:rounded-none md:rounded-md shadow-md border-0 sm:border" style={{
              backgroundColor: textColor + '15',
              color: textColor,
              borderColor: textColor + '20'
            }}>
              <h3 className="font-semibold mb-3 sm:mb-2 text-lg sm:text-sm md:text-base">Another Card</h3>
              <p className="text-base sm:text-xs md:text-sm opacity-85 mb-4 sm:mb-3 leading-relaxed">
                Testing readability across various 
                interface components.
              </p>
              <div className="text-sm sm:text-xs opacity-70 font-medium">View Details →</div>
            </Card>
          </div>

          {/* Form Elements - Professional mobile design */}
          <div className="space-y-6 sm:space-y-4">
            <h3 className="font-semibold text-lg sm:text-sm md:text-base">Form Elements</h3>
            <div className="space-y-5 sm:space-y-3">
              <label className="block text-base sm:text-xs md:text-sm font-medium opacity-90">Input Label</label>
              <div className="w-full p-4 sm:p-3 md:p-2 rounded-xl sm:rounded-none md:rounded border-2 sm:border text-base sm:text-sm" style={{
                borderColor: textColor + '40',
                backgroundColor: backgroundColor,
                color: textColor,
                minHeight: '56px' // Professional mobile touch target
              }}>
                Placeholder text with descriptive text
              </div>
              
              <div className="flex items-center gap-4 sm:gap-3 py-2 sm:py-1">
                <div className="w-6 h-6 sm:w-5 sm:h-5 border-2 sm:border rounded-md sm:rounded flex-shrink-0" style={{
                  borderColor: textColor + '60'
                }} />
                <span className="text-base sm:text-xs md:text-sm">Checkbox with descriptive text</span>
              </div>
              
              {/* Button Group - Professional mobile layout */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-3 pt-2">
                <Button 
                  className="w-full sm:w-auto px-6 py-4 sm:px-4 sm:py-3 sm:py-2 rounded-xl sm:rounded-none md:rounded text-base sm:text-sm transition-all active:scale-98 shadow-md" 
                  style={{
                    backgroundColor: textColor + '20',
                    color: textColor,
                    border: `2px solid ${textColor + '40'}`,
                    minHeight: '56px'
                  }}
                >
                  Secondary Button
                </Button>
                <Button 
                  className="w-full sm:w-auto px-6 py-4 sm:px-4 sm:py-3 sm:py-2 rounded-xl sm:rounded-none md:rounded text-base sm:text-sm transition-all active:scale-98 shadow-md" 
                  style={{
                    backgroundColor: textColor,
                    color: backgroundColor,
                    minHeight: '56px'
                  }}
                >
                  Primary Button
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile Typography Showcase - Enhanced */}
          <div className="space-y-4 sm:space-y-3 pt-6 sm:pt-4 border-t-2 sm:border-t" style={{ borderColor: textColor + '30' }}>
            <h4 className="font-semibold text-base sm:text-xs md:text-sm opacity-75 mb-3 sm:mb-2">Typography Test</h4>
            <div className="space-y-3 sm:space-y-2 text-base sm:text-xs md:text-sm">
              <div className="opacity-90 flex items-center gap-3 sm:gap-2">
                <CheckCircle className="w-5 h-5 sm:w-4 sm:h-4 text-current opacity-70" />
                This text should be clearly readable
              </div>
              <div className="opacity-80 flex items-center gap-3 sm:gap-2">
                <CheckCircle className="w-5 h-5 sm:w-4 sm:h-4 text-current opacity-70" />
                Secondary information remains accessible
              </div>
              <div className="opacity-70 flex items-center gap-3 sm:gap-2">
                <CheckCircle className="w-5 h-5 sm:w-4 sm:h-4 text-current opacity-70" />
                Supporting text maintains legibility
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
export default LivePreview;