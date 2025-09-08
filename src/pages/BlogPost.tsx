import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, CalendarDays, Clock, User, Share } from 'lucide-react';

const BlogPost = () => {
  const { id } = useParams();
  
  const blogPosts = {
    '1': {
      title: "Understanding WCAG 2.1 Color Contrast Guidelines: A Complete Guide",
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
    '2': {
      title: "Color Accessibility in Modern Web Design: Best Practices and Tools",
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
  };

  const post = blogPosts[id as keyof typeof blogPosts];

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Post Not Found</h1>
          <Link to="/blog">
            <Button className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Button>
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Button */}
        <Link to="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        {/* Article */}
        <article className="space-y-8">
          {/* Header */}
          <header className="space-y-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4" />
                <span>{new Date(post.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
              <Button variant="ghost" size="sm" className="gap-2 ml-auto">
                <Share className="w-4 h-4" />
                Share
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </header>

          {/* Content */}
          <div 
            className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-ul:text-muted-foreground prose-ol:text-muted-foreground prose-li:text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Footer */}
          <footer className="pt-8 border-t border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Written by</p>
                <p className="font-medium text-foreground">{post.author}</p>
              </div>
              <Button variant="outline" className="gap-2">
                <Share className="w-4 h-4" />
                Share Article
              </Button>
            </div>
          </footer>
        </article>

        {/* Related Posts */}
        <section className="mt-16 pt-8 border-t border-border">
          <h2 className="text-2xl font-bold text-foreground mb-6">Related Articles</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {Object.entries(blogPosts)
              .filter(([postId]) => postId !== id)
              .map(([postId, relatedPost]) => (
                <Link 
                  key={postId}
                  to={`/blog/${postId}`}
                  className="group block p-6 rounded-lg border border-border hover:border-primary/50 transition-all duration-200"
                >
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary mb-2 transition-colors">
                    {relatedPost.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {relatedPost.date} • {relatedPost.readTime}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {relatedPost.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </Link>
              ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default BlogPost;