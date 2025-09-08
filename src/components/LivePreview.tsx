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
  return <div>
      
      
      {/* Comprehensive Preview */}
      <Card className="border-2 border-border overflow-hidden" style={{
      backgroundColor,
      color: textColor
    }}>
        <div className="p-6 space-y-6" style={{
        backgroundColor,
        color: textColor
      }}>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b" style={{
          borderColor: textColor + '20'
        }}>
            <div className="flex items-center gap-3">
              <div className="text-lg font-bold">Your Brand</div>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span>Home</span>
              <span>About</span>
              <span>Contact</span>
            </div>
          </div>

          {/* Hero Section with Text Size Examples */}
          <div className="text-center py-6">
            <h1 className="text-3xl font-bold mb-4">Welcome to Our Platform</h1>
            <div className="space-y-3 mb-6">
              <p className="text-2xl font-semibold opacity-95">
                Large AA Text (24px) - Passes AA at 3:1 contrast
              </p>
              <p className="text-lg opacity-90">
                Large AA Text (18px+) - Should be easily readable
              </p>
              <p className="opacity-80">
                Normal AA Text (16px) - Needs ≥4.5:1 contrast for AA
              </p>
              <p className="text-sm opacity-70">
                Small AA Text (14px) - Needs highest contrast
              </p>
            </div>
            <Button className="px-6 py-2 rounded-md font-medium" style={{
            backgroundColor: textColor,
            color: backgroundColor,
            border: `1px solid ${textColor}`
          }}>
              Get Started Button
            </Button>
          </div>

          {/* Content Sections */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-4" style={{
            backgroundColor: textColor + '10',
            color: textColor
          }}>
              <h3 className="font-semibold mb-2">Card Title</h3>
              <p className="text-sm opacity-80">
                More content with text readability in 
                different contexts and layouts.
              </p>
              <div className="mt-3 text-xs opacity-60">View Details →</div>
            </Card>

            <Card className="p-4" style={{
            backgroundColor: textColor + '10',
            color: textColor
          }}>
              <h3 className="font-semibold mb-2">Another Card</h3>
              <p className="text-sm opacity-80">
                Testing readability across various 
                interface components.
              </p>
              <div className="mt-3 text-xs opacity-60">View Details →</div>
            </Card>
          </div>

          {/* Form Elements */}
          <div className="space-y-4">
            <h3 className="font-semibold">Form Elements</h3>
            <div className="space-y-3">
              <label className="block text-sm font-medium">Input Label</label>
              <div className="w-full p-3 rounded border text-sm" style={{
              borderColor: textColor + '40',
              backgroundColor: backgroundColor,
              color: textColor
            }}>
                Placeholder text with descriptive text
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border rounded" style={{
                borderColor: textColor + '60'
              }} />
                <span className="text-sm">Checkbox with descriptive text</span>
              </div>
              
              <div className="flex gap-3">
                <Button className="px-4 py-2 rounded text-sm" style={{
                backgroundColor: textColor + '20',
                color: textColor,
                border: `1px solid ${textColor + '40'}`
              }}>
                  Secondary Button
                </Button>
                <Button className="px-4 py-2 rounded text-sm" style={{
                backgroundColor: textColor,
                color: backgroundColor
              }}>
                  Primary Button
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>;
};
export default LivePreview;