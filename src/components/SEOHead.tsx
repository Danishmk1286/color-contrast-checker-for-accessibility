import React from 'react';
import { Helmet } from 'react-helmet';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  structuredData?: object;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = "Free WCAG color contrast Accessibility Checker",
  description = "Free WCAG color contrast checker and color palette generator. Test color accessibility, ensure AA/AAA compliance, and create accessible designs. Professional web accessibility tool for designers and developers.",
  keywords = "color contrast checker, wcag contrast, colour and contrast, wcag contrast ratio, wcag contrast standards, WCAG accessibility, WCAG Accessibility Tool, contrast ratio calculator, AA compliance, AAA compliance, accessibility testing, color accessibility",
  canonicalUrl = "https://www.thecolorcontrastchecker.com/",
  ogImage = "https://www.thecolorcontrastchecker.com/assets/og-image.png",
  structuredData
}) => {
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Color Contrast Checker & WCAG Accessibility Tool",
    "description": "Professional WCAG color contrast checker and color palette generator for web accessibility testing",
    "url": canonicalUrl,
    "applicationCategory": "DesignApplication",
    "operatingSystem": "Web Browser",
    "browserRequirements": "HTML5, CSS3, JavaScript",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "creator": {
      "@type": "Person",
      "name": "Danish Khan",
      "sameAs": "https://www.linkedin.com/in/danishmk1286/"
    },
    "featureList": [
      "WCAG 2.1 AA/AAA compliance testing",
      "Real-time contrast ratio calculation",
      "Color palette generation",
      "Multiple color format support",
      "Accessibility guidelines validation",
      "Live preview interface",
      "Mobile-responsive design"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "127",
      "bestRating": "5"
    }
  };

  const finalStructuredData = structuredData || defaultStructuredData;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="author" content="Danish Khan" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Color Contrast Checker" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />
      
      {/* Additional SEO Tags */}
      <meta name="theme-color" content="#3B82F6" />
      <meta name="msapplication-TileColor" content="#3B82F6" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(finalStructuredData)}
      </script>
    </Helmet>
  );
};

export default SEOHead;