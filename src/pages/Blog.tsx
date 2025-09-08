import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarDays, Clock, ArrowRight, User, Heart, Github, Star, Share2 } from 'lucide-react';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Understanding WCAG 2.1 Color Contrast Guidelines: A Complete Guide",
      excerpt: "Learn everything you need to know about WCAG color contrast requirements, from basic AA compliance to advanced AAA standards. This comprehensive guide covers practical implementation strategies for designers and developers.",
      content: `
        <div class="space-y-6">
          <p class="text-lg text-muted-foreground">Color contrast is one of the most fundamental aspects of web accessibility, yet it's often overlooked in the design process. Understanding WCAG 2.1 color contrast guidelines is essential for creating inclusive digital experiences.</p>
          
          <h2 class="text-2xl font-semibold text-foreground">What is WCAG?</h2>
          <p class="text-muted-foreground">The Web Content Accessibility Guidelines (WCAG) 2.1 are internationally recognized standards developed by the World Wide Web Consortium (W3C). These guidelines ensure that web content is accessible to people with disabilities, including those with visual impairments.</p>
          
          <h2 class="text-2xl font-semibold text-foreground">Understanding Contrast Ratios</h2>
          <p class="text-muted-foreground">Contrast ratio is calculated as the difference in luminance between foreground and background colors. It's expressed as a ratio from 1:1 (no contrast) to 21:1 (maximum contrast).</p>
          
          <div class="bg-card p-6 rounded-lg border">
            <h3 class="text-lg font-semibold mb-3">WCAG AA Requirements:</h3>
            <ul class="space-y-2 text-muted-foreground">
              <li>• Normal text: Minimum 4.5:1 contrast ratio</li>
              <li>• Large text (18pt+ or 14pt+ bold): Minimum 3:1 contrast ratio</li>
              <li>• Non-text elements: Minimum 3:1 contrast ratio</li>
            </ul>
          </div>
          
          <div class="bg-card p-6 rounded-lg border">
            <h3 class="text-lg font-semibold mb-3">WCAG AAA Requirements:</h3>
            <ul class="space-y-2 text-muted-foreground">
              <li>• Normal text: Minimum 7:1 contrast ratio</li>
              <li>• Large text: Minimum 4.5:1 contrast ratio</li>
            </ul>
          </div>
          
          <h2 class="text-2xl font-semibold text-foreground">Practical Implementation</h2>
          <p class="text-muted-foreground">When implementing color contrast in your designs, consider these practical tips:</p>
          
          <ol class="list-decimal list-inside space-y-2 text-muted-foreground ml-4">
            <li>Test early and often during the design process</li>
            <li>Use automated tools for initial screening</li>
            <li>Validate with manual testing</li>
            <li>Consider color blindness and other visual impairments</li>
            <li>Don't rely solely on color to convey information</li>
          </ol>
          
          <h2 class="text-2xl font-semibold text-foreground">Common Mistakes to Avoid</h2>
          <p class="text-muted-foreground">Many designers make these common mistakes when dealing with color contrast:</p>
          
          <ul class="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li>Using low-contrast colors for branding purposes</li>
            <li>Overlooking contrast in interactive states</li>
            <li>Ignoring contrast in form placeholders</li>
            <li>Not testing with different screen brightness levels</li>
          </ul>
          
          <p class="text-muted-foreground">By following WCAG guidelines and testing your color combinations regularly, you can create more accessible and inclusive digital experiences for all users.</p>
        </div>
      `,
      author: "Danish Khan",
      date: "2024-01-15",
      readTime: "8 min read",
      tags: ["WCAG", "Accessibility", "Design", "Guidelines"]
    },
    {
      id: 2,
      title: "Color Accessibility in Modern Web Design: Best Practices and Tools",
      excerpt: "Discover the latest tools, techniques, and strategies for implementing accessible color schemes in modern web applications. From automated testing to design system integration.",
      content: `
        <div class="space-y-6">
          <p class="text-lg text-muted-foreground">In today's digital landscape, creating accessible color schemes is not just a legal requirement—it's a fundamental aspect of inclusive design that benefits all users.</p>
          
          <h2 class="text-2xl font-semibold text-foreground">The Business Case for Color Accessibility</h2>
          <p class="text-muted-foreground">According to the World Health Organization, approximately 1.3 billion people worldwide live with some form of visual impairment. This represents a significant portion of your potential audience that could be excluded by poor color choices.</p>
          
          <div class="bg-card p-6 rounded-lg border">
            <h3 class="text-lg font-semibold mb-3">Benefits of Accessible Color Design:</h3>
            <ul class="space-y-2 text-muted-foreground">
              <li>• Expanded market reach and user base</li>
              <li>• Improved user experience for all users</li>
              <li>• Legal compliance and risk mitigation</li>
              <li>• Better SEO and search engine rankings</li>
              <li>• Enhanced brand reputation</li>
            </ul>
          </div>
          
          <h2 class="text-2xl font-semibold text-foreground">Essential Tools for Color Accessibility</h2>
          <p class="text-muted-foreground">Modern developers and designers have access to powerful tools that make color accessibility testing seamless:</p>
          
          <div class="grid gap-4">
            <div class="bg-card p-4 rounded-lg border">
              <h4 class="font-semibold mb-2">Browser Developer Tools</h4>
              <p class="text-sm text-muted-foreground">Chrome, Firefox, and Safari all include built-in accessibility auditing tools that can identify contrast issues automatically.</p>
            </div>
            
            <div class="bg-card p-4 rounded-lg border">
              <h4 class="font-semibold mb-2">Design Tools Integration</h4>
              <p class="text-sm text-muted-foreground">Figma, Sketch, and Adobe XD offer plugins that check contrast ratios in real-time during the design process.</p>
            </div>
            
            <div class="bg-card p-4 rounded-lg border">
              <h4 class="font-semibold mb-2">Automated Testing</h4>
              <p class="text-sm text-muted-foreground">Tools like axe-core and Lighthouse can be integrated into CI/CD pipelines for continuous accessibility monitoring.</p>
            </div>
          </div>
          
          <h2 class="text-2xl font-semibold text-foreground">Building Accessible Design Systems</h2>
          <p class="text-muted-foreground">Creating a design system with accessibility at its core ensures consistent, compliant color usage across your entire product:</p>
          
          <ol class="list-decimal list-inside space-y-2 text-muted-foreground ml-4">
            <li>Define a primary color palette with tested contrast ratios</li>
            <li>Create semantic color tokens (success, warning, error)</li>
            <li>Establish clear guidelines for color combinations</li>
            <li>Document approved color pairings</li>
            <li>Provide alternative indicators beyond color alone</li>
          </ol>
          
          <h2 class="text-2xl font-semibold text-foreground">Advanced Techniques</h2>
          <p class="text-muted-foreground">Beyond basic contrast compliance, consider these advanced accessibility techniques:</p>
          
          <ul class="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li>Implement focus indicators with sufficient contrast</li>
            <li>Use patterns and textures alongside color coding</li>
            <li>Provide high contrast mode alternatives</li>
            <li>Test with various color vision simulations</li>
            <li>Consider cultural color associations in global products</li>
          </ul>
          
          <div class="bg-primary/10 p-6 rounded-lg border border-primary/20">
            <h3 class="text-lg font-semibold mb-3 text-primary">Pro Tip</h3>
            <p class="text-muted-foreground">Always test your color schemes under different lighting conditions and on various devices. What looks perfect on your high-end monitor might not be accessible on a smartphone in bright sunlight.</p>
          </div>
          
          <p class="text-muted-foreground">By incorporating these practices and tools into your workflow, you'll create more inclusive digital experiences that work for everyone, regardless of their visual abilities.</p>
        </div>
      `,
      author: "Danish Khan",
      date: "2024-01-08",
      readTime: "12 min read",
      tags: ["Tools", "Design Systems", "Best Practices", "UX"]
    }
  ];

  return (
    <Layout>
      <main className="container mx-auto px-4 py-6 sm:py-8 md:py-12 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4">
            Accessibility & WCAG Blog
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Insights, best practices, and updates on web accessibility and color contrast standards
          </p>
        </div>

        {/* Blog Posts */}
        <div className="grid gap-6 sm:gap-8 md:gap-12">
          {blogPosts.map((post, index) => (
            <article key={post.id} className="group">
              <Card className="border-border hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-3 sm:pb-4 p-4 sm:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 sm:gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-2">
                          <User className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CalendarDays className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="text-xs sm:text-sm">{new Date(post.date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}</span>
                        </div>
                        <div className="hidden sm:flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      
                      <CardTitle className="text-xl sm:text-2xl md:text-3xl leading-tight mb-2 sm:mb-3 group-hover:text-primary transition-colors">
                        {post.title}
                      </CardTitle>
                      
                      <CardDescription className="text-sm sm:text-base leading-relaxed">
                        {post.excerpt}
                      </CardDescription>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mt-4">
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      className="gap-2 text-primary hover:text-primary-foreground hover:bg-primary w-full sm:w-auto justify-center sm:justify-start"
                      asChild
                    >
                      <Link to={`/blog/${post.id}`}>
                        Read More
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
              </Card>
            </article>
          ))}
        </div>

        {/* GitHub Feedback Section */}
        <div className="mt-8 sm:mt-12 md:mt-16">
          <div className="text-center p-4 sm:p-6 md:p-8 bg-primary/5 rounded-lg border border-primary/20">
            <div className="flex justify-center mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-primary animate-pulse" />
              </div>
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-foreground mb-2">
              Enjoying our Color Contrast Checker? ⭐
            </h3>
            <p className="text-muted-foreground mb-4 sm:mb-6 max-w-2xl mx-auto text-sm sm:text-base">
              Help others discover this accessibility tool by starring our GitHub repository and sharing your experience. Your support helps us build better tools for everyone!
            </p>
            <div className="flex flex-col gap-2 sm:flex-row sm:gap-3 justify-center items-center">
              <Button 
                onClick={() => window.open('https://github.com/danishmk1286/color-contrast-checker-for-accessibility', '_blank')}
                className="gap-2 bg-[#24292e] hover:bg-[#24292e]/90 text-white w-full sm:w-auto"
                size="default"
              >
                <Github className="w-4 h-4" />
                <Star className="w-4 h-4" />
                Star on GitHub
              </Button>
              <Button 
                onClick={() => {
                  const url = window.location.href;
                  const text = 'Just used this amazing WCAG Color Contrast Checker! 🎨 Perfect for creating accessible designs. Highly recommend! ⭐';
                  if (navigator.share) {
                    navigator.share({ title: 'Color Contrast Checker Review', text, url });
                  } else {
                    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
                    window.open(shareUrl, '_blank');
                  }
                }}
                variant="outline"
                size="default"
                className="gap-2 w-full sm:w-auto"
              >
                <Share2 className="w-4 h-4" />
                Share Your Review
              </Button>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Blog;