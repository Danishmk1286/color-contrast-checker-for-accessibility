import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Layout from '@/components/Layout';
import SEOHead from '@/components/SEOHead';
import ResourceLinks from '@/components/ResourceLinks';
import ColorSelector from '@/components/ColorSelector';
import ContrastResults from '@/components/ContrastResults';
import LivePreview from '@/components/LivePreview';
import AdaptiveUISimulation from '@/components/AdaptiveUISimulation';
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
  const [textColor, setTextColor] = useState('#ffffff');
  const [backgroundColor, setBackgroundColor] = useState('#4a4d4a');
  const [contrastResult, setContrastResult] = useState<ContrastResult | null>(null);

  // Convert hex to RGB
  const hexToRgb = (hex: string): {
    r: number;
    g: number;
    b: number;
  } | null => {
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
  return <>
    <SEOHead />
    <Layout>
      {/* Hero Section - Mobile centered */}
      <section className="bg-gradient-to-b from-background to-background/50 px-6 sm:px-4 md:px-4 py-10 sm:py-8 md:py-[52px]">
        <div className="w-full md:container md:mx-auto text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 sm:mb-6">
            <Zap className="w-4 h-4" />
            WCAG 2.1 AA & AAA Compliant
          </div>
          
          <h1 className="text-4xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 sm:mb-6 leading-tight px-2 sm:px-0">
            Free Color Contrast Checker &<br />
            <span className="text-primary">WCAG Accessibility Tool</span>
          </h1>
          
          <p className="text-xl sm:text-lg md:text-xl text-muted-foreground mb-8 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-2 sm:px-0">
            Professional free WCAG color contrast checker and accessibility testing tool. Ensure your website colors meet AA and AAA compliance standards for inclusive web design. Test contrast ratios, generate accessible color palettes, and create barrier-free digital experiences.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 sm:gap-3 md:gap-4 mb-8 px-2 sm:px-0">
            <Badge variant="outline" className="gap-2 py-3 px-4 sm:py-2 sm:px-3 md:px-4 text-sm sm:text-xs md:text-sm">
              <Shield className="w-4 h-4 sm:w-3 sm:h-3 md:w-4 md:h-4" />
              WCAG 2.1 & 2.2 Compliant
            </Badge>
            <Badge variant="outline" className="gap-2 py-3 px-4 sm:py-2 sm:px-3 md:px-4 text-sm sm:text-xs md:text-sm">
              <Eye className="w-4 h-4 sm:w-3 sm:h-3 md:w-4 md:h-4" />
              Real-time Testing
            </Badge>
            <Badge variant="outline" className="gap-2 py-3 px-4 sm:py-2 sm:px-3 md:px-4 text-sm sm:text-xs md:text-sm">
              <Palette className="w-4 h-4 sm:w-3 sm:h-3 md:w-4 md:h-4" />
              AA & AAA Standards
            </Badge>
            <Badge variant="outline" className="gap-2 py-3 px-4 sm:py-2 sm:px-3 md:px-4 text-sm sm:text-xs md:text-sm">
              <CheckCircle className="w-4 h-4 sm:w-3 sm:h-3 md:w-4 md:h-4" />
              Free Accessibility Tool
            </Badge>
          </div>
        </div>
      </section>

      {/* Main Tool Section - Balanced mobile spacing, desktop sticky sidebar */}
      <section className="py-6 sm:py-6 md:py-8 px-0 md:px-4 lg:py-0">
        <div className="w-full md:container md:mx-auto md:max-w-7xl">
          <div className="grid gap-4 sm:gap-4 md:gap-6 lg:grid-cols-10 lg:gap-8">
            {/* Controls Section - Desktop no scroll, mobile centered */}
            <div className="px-6 sm:px-4 md:px-0 lg:col-span-4 space-y-4 sm:space-y-4 lg:sticky lg:top-4 lg:self-start lg:h-fit">
              <ColorSelector textColor={textColor} backgroundColor={backgroundColor} onTextColorChange={setTextColor} onBackgroundColorChange={setBackgroundColor} />
              
              {contrastResult && (
                <ContrastResults 
                  result={contrastResult} 
                  textColor={textColor}
                  backgroundColor={backgroundColor}
                />
              )}
            </div>

            {/* Live Preview Section - Mobile centered */}
            <div className="px-6 sm:px-4 md:px-0 lg:col-span-6 space-y-6">
              <div>
                <div className="mb-4 sm:mb-4 lg:hidden text-center sm:text-left">
                  <h2 className="text-xl sm:text-lg font-semibold text-foreground mb-2">Live Contrast Preview</h2>
                  <p className="text-base sm:text-sm text-muted-foreground">See how your colors perform in real website interfaces and components</p>
                </div>
                <LivePreview textColor={textColor} backgroundColor={backgroundColor} />
              </div>

              {/* Adaptive UI Simulation */}
              {contrastResult && (
                <div className="animate-fade-in">
                  <AdaptiveUISimulation
                    currentTextColor={textColor}
                    currentBgColor={backgroundColor}
                    suggestedTextColor={
                      contrastResult.ratio >= 4.5
                        ? textColor
                        : contrastResult.ratio < 3
                        ? (backgroundColor === '#ffffff' || backgroundColor.toLowerCase() === '#fff' ? '#000000' : '#ffffff')
                        : textColor
                    }
                    suggestedBgColor={backgroundColor}
                    hasIssue={contrastResult.ratio < 4.5}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Why Use Section - Mobile centered */}
      <section className="py-8 md:py-12 px-4 bg-card/30 my-[20px] lg:py-[68px]">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Why Use Our Color Contrast Checker & Color Palette Generator?
          </h2>
          <p className="text-base md:text-lg text-muted-foreground mb-8 md:mb-12 max-w-3xl mx-auto">
            Our professional WCAG color contrast checker ensures your designs are accessible, compliant and provide the best user experiences for everyone. Generate perfect color palettes that meet accessibility standards.
          </p>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[{
            icon: <Shield className="w-6 h-6 md:w-8 md:h-8 text-primary" />,
            title: "WCAG Accessibility Compliance",
            description: "Ensure full compliance with WCAG guidelines and meet industry accessibility standards using our precision color contrast checker and fully compliant evaluations."
          }, {
            icon: <Award className="w-6 h-6 md:w-8 md:h-8 text-primary" />,
            title: "Legal Protection",
            description: "Reduce legal risk and ensure regulatory compliance. Our comprehensive accessibility testing helps protect against accessibility-related lawsuits."
          }, {
            icon: <Users className="w-6 h-6 md:w-8 md:h-8 text-primary" />,
            title: "Better User Experience",
            description: "Improve readability and usability for all users including those with visual impairments. Make your content usable and understandable."
          }, {
            icon: <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-primary" />,
            title: "SEO Benefits",
            description: "Improve your search engine ranking with accessible design. Search engines favor sites that meet accessibility standards and rankings when your site easily readable and usable."
          }].map((feature, index) => <Card key={index} className="text-center p-4 md:p-6 border-border hover:shadow-lg transition-all duration-300">
                <div className="mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-base md:text-lg font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Tool Suite Section - Mobile centered, balanced spacing */}
      <section className="py-8 md:py-12 px-4 bg-card/30 lg:py-[28px]">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Discover Our Complete Color Tool Suite
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              Beyond just a color contrast checker, we offer comprehensive suite of color tools designed for designers and developers who prioritize accessibility and beautiful design.
            </p>
          </div>
          
          <Card className="p-6 md:p-8 text-center border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/20 rounded-full flex items-center justify-center">
                <Palette className="w-6 h-6 md:w-8 md:h-8 text-primary" />
              </div>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4">
              Tints and Shades Generator
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto text-sm md:text-base">
              Create perfect tints, shades, and tones from any base color. Generate harmonious color variations that maintain accessibility standards throughout your design system. Perfect for building cohesive color palettes.
            </p>
            <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-6">
              <Badge variant="secondary" className="text-xs md:text-sm">Color Variations</Badge>
              <Badge variant="secondary" className="text-xs md:text-sm">Accessibility Focused</Badge>
              <Badge variant="secondary" className="text-xs md:text-sm">Design System Ready</Badge>
              <Badge variant="secondary" className="text-xs md:text-sm">Export Options</Badge>
            </div>
            <Button className="gap-2 w-full sm:w-auto px-6 py-3 sm:px-4 sm:py-2 text-base sm:text-sm h-auto whitespace-normal leading-tight" size="lg" asChild>
              <a href="https://tintandshadesgenerator.com" target="_blank" rel="noopener noreferrer">
                Try Tints & Shades Generator
                <CheckCircle className="w-4 h-4 sm:w-3 sm:h-3 flex-shrink-0" />
              </a>
            </Button>
          </Card>
        </div>
      </section>

      {/* Professional Features - Mobile centered, consistent spacing */}
      <section className="py-8 md:py-12 lg:py-16 px-4 bg-card/30">
        <div className="container mx-auto max-w-6xl py-0">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground text-center mb-8 md:mb-12">
            Professional Color Palette Generator Features
          </h2>
          <p className="text-base md:text-lg text-muted-foreground text-center mb-8 md:mb-12 max-w-3xl mx-auto">
            Beyond just a color contrast checker, our tool serves as a comprehensive color palette generator for designers and developers who prioritize accessibility.
          </p>
          
          <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
            {[{
            title: "Real-time Testing",
            description: "Instant feedback with comprehensive platform against WCAG standards as you adjust colors.",
            features: ["Live contrast ratios", "Multiple text sizes", "Interactive previews"]
          }, {
            title: "Multiple Text Sizes",
            description: "Test colors against different text sizes and weights per real website scenarios.",
            features: ["Large text testing", "Normal text analysis", "Interactive previews"]
          }, {
            title: "Visual Interface Preview",
            description: "See exactly how your color combinations look in context before deployment.",
            features: ["Component previews", "Card interfaces", "Form elements"]
          }].map((feature, index) => <Card key={index} className="p-4 md:p-6 text-center">
                <h3 className="text-lg md:text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {feature.description}
                </p>
                <ul className="space-y-2">
                  {feature.features.map((item, itemIndex) => <li key={itemIndex} className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      {item}
                    </li>)}
                </ul>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Resource Links Section - Bottom of page */}
      <ResourceLinks />
    </Layout>
  </>;
};
export default Index;