import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import ColorSelector from '@/components/ColorSelector';
import ContrastResults from '@/components/ContrastResults';
import LivePreview from '@/components/LivePreview';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Zap, Shield, Eye, Palette, CheckCircle, Users, TrendingUp, Award } from 'lucide-react';

interface ContrastResult {
  ratio: number;
  aaLarge: boolean;
  aaNormal: boolean;
  aaaLarge: boolean;
  aaaNormal: boolean;
}

const Index = () => {
  const [textColor, setTextColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [contrastResult, setContrastResult] = useState<ContrastResult | null>(null);

  // Convert hex to RGB
  const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  // Calculate relative luminance
  const getLuminance = (r: number, g: number, b: number): number => {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  // Calculate contrast ratio
  const getContrastRatio = (color1: string, color2: string): number => {
    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);
    
    if (!rgb1 || !rgb2) return 0;
    
    const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
    const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
    
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    
    return (brightest + 0.05) / (darkest + 0.05);
  };

  // Check WCAG compliance
  const checkCompliance = (ratio: number): ContrastResult => {
    return {
      ratio,
      aaLarge: ratio >= 3,
      aaNormal: ratio >= 4.5,
      aaaLarge: ratio >= 4.5,
      aaaNormal: ratio >= 7
    };
  };

  useEffect(() => {
    const ratio = getContrastRatio(textColor, backgroundColor);
    setContrastResult(checkCompliance(ratio));
  }, [textColor, backgroundColor]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-background to-background/50 py-16 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            WCAG 2.1 Compliant
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Color Contrast Checker &<br />
            <span className="text-primary">Color Palette Generator</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Professional Color Contrast Checker and Color Palette Generator for WCAG color accessibility compliance testing. Ensure your designs meet AA and AAA accessibility standards for optimal user experience.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge variant="outline" className="gap-2 py-2 px-4">
              <Shield className="w-4 h-4" />
              WCAG 2.1 Compliant
            </Badge>
            <Badge variant="outline" className="gap-2 py-2 px-4">
              <Eye className="w-4 h-4" />
              Real-time Preview
            </Badge>
            <Badge variant="outline" className="gap-2 py-2 px-4">
              <Palette className="w-4 h-4" />
              AA & AAA Testing
            </Badge>
            <Badge variant="outline" className="gap-2 py-2 px-4">
              <CheckCircle className="w-4 h-4" />
              Color Palette Generator
            </Badge>
          </div>
        </div>
      </section>

      {/* Main Tool Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-10 gap-8">
            {/* Left Sidebar - Controls */}
            <div className="lg:col-span-3 space-y-6 sticky top-24 self-start">
              <div className="bg-sidebar-background/95 backdrop-blur-sm border-2 border-sidebar-border rounded-lg p-1 shadow-lg">
                <ColorSelector
                  textColor={textColor}
                  backgroundColor={backgroundColor}
                  onTextColorChange={setTextColor}
                  onBackgroundColorChange={setBackgroundColor}
                />
              </div>
              
              {contrastResult && (
                <ContrastResults result={contrastResult} />
              )}
            </div>

            {/* Right Side - Live Preview */}
            <div className="lg:col-span-7">
              <LivePreview 
                textColor={textColor}
                backgroundColor={backgroundColor}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Use Section */}
      <section className="py-16 px-4 bg-card/30">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Use Our Color Contrast Checker & Color Palette Generator?
          </h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-3xl mx-auto">
            Our professional WCAG color contrast checker ensures your designs are accessible, compliant and provide the best user experiences for everyone. Generate perfect color palettes that meet accessibility standards.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Shield className="w-8 h-8 text-primary" />,
                title: "WCAG Accessibility Compliance",
                description: "Ensure full compliance with WCAG guidelines and meet industry accessibility standards using our precision color contrast checker and fully compliant evaluations."
              },
              {
                icon: <Award className="w-8 h-8 text-primary" />,
                title: "Legal Protection",
                description: "Reduce legal risk and ensure regulatory compliance. Our comprehensive accessibility testing helps protect against accessibility-related lawsuits."
              },
              {
                icon: <Users className="w-8 h-8 text-primary" />,
                title: "Better User Experience",
                description: "Improve readability and usability for all users including those with visual impairments. Make your content usable and understandable."
              },
              {
                icon: <TrendingUp className="w-8 h-8 text-primary" />,
                title: "SEO Benefits",
                description: "Improve your search engine ranking with accessible design. Search engines favor sites that meet accessibility standards and rankings when your site easily readable and usable."
              }
            ].map((feature, index) => (
              <Card key={index} className="text-center p-6 border-border hover:shadow-lg transition-all duration-300">
                <div className="mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tool Suite Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">
            Discover Our Complete Color Tool Suite
          </h2>
          <p className="text-lg text-muted-foreground mb-12">
            Beyond just a color contrast checker, we offer comprehensive suite of color tools designed for designers and developers who prioritize accessibility and beautiful design.
          </p>
          
          <Card className="p-8 bg-primary/5 border-primary/20">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                <Palette className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Tints and Shades Generator
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Create perfect tints, shades, and tones from any base color. Generate harmonious color variations that maintain accessibility standards throughout your design system. Perfect for building cohesive color palettes.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              <Badge variant="secondary">Color Variations</Badge>
              <Badge variant="secondary">Accessibility Focused</Badge>
              <Badge variant="secondary">Design System Ready</Badge>
              <Badge variant="secondary">Export Options</Badge>
            </div>
            <Button className="gap-2" size="lg">
              Try Tints & Shades Generator
              <CheckCircle className="w-4 h-4" />
            </Button>
          </Card>
        </div>
      </section>

      {/* Professional Features */}
      <section className="py-16 px-4 bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
            Professional Color Palette Generator Features
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-12">
            Beyond just a color contrast checker, our tool serves as a comprehensive color palette generator for designers and developers who prioritize accessibility.
          </p>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                title: "Real-time Testing",
                description: "Instant feedback with comprehensive platform against WCAG standards as you adjust colors.",
                features: ["Live contrast ratios", "Multiple text sizes", "Different use contexts"]
              },
              {
                title: "Multiple Text Sizes",
                description: "Test colors against different text sizes and weights per real website scenarios.",
                features: ["Large text testing", "Normal text analysis", "Small text scenarios"]
              },
              {
                title: "Visual Interface Preview",
                description: "See exactly how your color combinations look in context before deployment.",
                features: ["Component previews", "Card interfaces", "Form elements"]
              }
            ].map((feature, index) => (
              <Card key={index} className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {feature.description}
                </p>
                <ul className="space-y-2">
                  {feature.features.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Palette className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-lg font-semibold text-foreground">Color Contrast Checker</span>
              </div>
              <p className="text-muted-foreground mb-4">
                Professional Color Contrast Checker and Color Palette Generator to verify WCAG compliance and ensure your color choices meet AA and AAA accessibility standards.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-3">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">WCAG Guidelines</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Accessibility Policy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Color Use Guidelines</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-3">Connect</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Made with ❤️ by</li>
                <li>
                  <a 
                    href="https://www.linkedin.com/in/danishmk1286/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors"
                  >
                    Danish MK
                  </a>
                </li>
                <li>
                  <a 
                    href="https://github.com/danishmk1286" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>Built with ❤️ in Lovable</p>
            <p className="mt-2">
              Tool guides, tips and helpful content for understanding best practices for using WCAG as your content is available to everyone regardless of accessibility needs.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
