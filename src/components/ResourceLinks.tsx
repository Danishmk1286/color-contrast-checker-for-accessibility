import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Book, Globe, Users, Award, Shield } from 'lucide-react';

const ResourceLinks: React.FC = () => {
  const resources = [
    {
      category: "Official WCAG Guidelines",
      icon: <Book className="w-4 h-4 md:w-5 md:h-5" />,
      links: [
        {
          title: "WCAG 2.1 Guidelines - W3C",
          url: "https://www.w3.org/WAI/WCAG21/Understanding/",
          description: "Official Web Content Accessibility Guidelines 2.1 documentation"
        },
        {
          title: "WCAG 2.2 Guidelines - W3C", 
          url: "https://www.w3.org/WAI/WCAG22/Understanding/",
          description: "Latest WCAG 2.2 accessibility guidelines and techniques"
        },
        {
          title: "WebAIM Contrast Checker",
          url: "https://webaim.org/resources/contrastchecker/",
          description: "Alternative contrast checking tool by WebAIM organization"
        }
      ]
    },
    {
      category: "Government & Legal Resources",
      icon: <Shield className="w-4 h-4 md:w-5 md:h-5" />,
      links: [
        {
          title: "Section 508 Standards - GSA",
          url: "https://www.section508.gov/",
          description: "US Federal accessibility standards for government websites"
        },
        {
          title: "ADA Compliance Guidelines",
          url: "https://www.ada.gov/resources/web-guidance/",
          description: "Americans with Disabilities Act web accessibility guidance"
        },
        {
          title: "EN 301 549 European Standard",
          url: "https://www.etsi.org/deliver/etsi_en/301500_301599/301549/03.02.01_60/en_301549v030201p.pdf",
          description: "European accessibility standard for ICT products and services"
        }
      ]
    },
    {
      category: "Design & Development Tools",
      icon: <Globe className="w-4 h-4 md:w-5 md:h-5" />,
      links: [
        {
          title: "Colour Contrast Analyser - TPG",
          url: "https://www.tpgi.com/color-contrast-checker/",
          description: "Professional contrast analysis tool by accessibility experts"
        },
        {
          title: "Stark Accessibility Plugin",
          url: "https://www.getstark.co/",
          description: "Accessibility plugins for Figma, Sketch, and Adobe XD"
        },
        {
          title: "axe DevTools Browser Extension",
          url: "https://www.deque.com/axe/devtools/",
          description: "Automated accessibility testing in your browser"
        },
        {
          title: "Lighthouse Accessibility Audit",
          url: "https://developers.google.com/web/tools/lighthouse",
          description: "Google's automated accessibility auditing tool"
        }
      ]
    },
    {
      category: "Educational Resources",
      icon: <Users className="w-4 h-4 md:w-5 md:h-5" />,
      links: [
        {
          title: "WebAIM Training Materials",
          url: "https://webaim.org/training/",
          description: "Comprehensive web accessibility training and certification"
        },
        {
          title: "A11Y Project Checklist",
          url: "https://www.a11yproject.com/checklist/",
          description: "Community-driven accessibility checklist and resources"
        },
        {
          title: "Deque University",
          url: "https://dequeuniversity.com/",
          description: "Professional accessibility training and certification programs"
        },
        {
          title: "MDN Accessibility Docs",
          url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility",
          description: "Mozilla's comprehensive accessibility documentation for developers"
        }
      ]
    },
    {
      category: "Industry Standards & Certification",
      icon: <Award className="w-4 h-4 md:w-5 md:h-5" />,
      links: [
        {
          title: "IAAP Certification",
          url: "https://www.accessibilityassociation.org/s/certification",
          description: "International Association of Accessibility Professionals certification"
        },
        {
          title: "ISO/IEC 40500:2012",
          url: "https://www.iso.org/standard/58625.html",
          description: "International standard identical to WCAG 2.0"
        },
        {
          title: "VPAT Templates - GSA",
          url: "https://www.section508.gov/sell/vpat/",
          description: "Voluntary Product Accessibility Template for compliance documentation"
        }
      ]
    }
  ];

  return (
    <section className="py-8 md:py-12 lg:py-16 px-4 sm:px-6 bg-card/20 border-t border-border">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-8 md:mb-12 px-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 md:mb-4 leading-tight">
            Essential Accessibility Resources & Guidelines
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Comprehensive collection of official guidelines, tools, and educational resources for web accessibility compliance and best practices.
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {resources.map((category, index) => (
            <Card key={index} className="h-full flex flex-col hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-3 md:pb-4">
                <CardTitle className="flex items-center gap-2 md:gap-3 text-base md:text-lg leading-tight">
                  {category.icon}
                  <span className="line-clamp-2">{category.category}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 md:space-y-4 flex-grow">
                {category.links.map((link, linkIndex) => (
                  <div key={linkIndex} className="border-l-2 border-primary/20 pl-3 md:pl-4 pb-3 last:pb-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="font-medium text-foreground text-sm md:text-base leading-tight line-clamp-2">
                        {link.title}
                      </h4>
                      <ExternalLink className="w-3 h-3 md:w-4 md:h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                    </div>
                    <p className="text-xs md:text-sm text-muted-foreground mb-2 md:mb-3 leading-relaxed line-clamp-3">
                      {link.description}
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-7 md:h-8 px-2 md:px-3 text-xs w-full sm:w-auto"
                      onClick={() => window.open(link.url, '_blank', 'noopener,noreferrer')}
                    >
                      Visit Resource
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 md:mt-12 text-center">
          <Card className="p-4 md:p-6 bg-primary/5 border-primary/20 hover:shadow-md transition-all duration-300">
            <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-3 md:mb-4">
              <Badge variant="secondary" className="text-xs md:text-sm">WCAG 2.1 & 2.2 Compliant</Badge>
              <Badge variant="secondary" className="text-xs md:text-sm">Section 508 Compatible</Badge>
              <Badge variant="secondary" className="text-xs md:text-sm">ADA Guidelines</Badge>
              <Badge variant="secondary" className="text-xs md:text-sm">EN 301 549 Standard</Badge>
            </div>
            <p className="text-sm md:text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed px-2">
              Our color contrast checker adheres to all major accessibility standards and guidelines. 
              Use these resources to deepen your understanding of web accessibility and create truly inclusive digital experiences.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ResourceLinks;