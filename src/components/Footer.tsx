import React from 'react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Linkedin, Github, Share2, Star, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const handleShareReview = () => {
    const url = window.location.href;
    const text = 'Check out this amazing WCAG Color Contrast Checker! 🎨 It helped me create more accessible designs. Highly recommend! ⭐';
    
    if (navigator.share) {
      navigator.share({
        title: 'Color Contrast Checker Review',
        text: text,
        url: url
      });
    } else {
      // Fallback to Twitter
      const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
      window.open(shareUrl, '_blank');
    }
  };

  const handleGitHubStar = () => {
    window.open('https://github.com/danishmk1286/color-contrast-checker-for-accessibility', '_blank');
  };

  return (
    <footer className="mt-12 bg-card/50 border-t">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* GitHub Feedback Section */}
        <div className="text-center mb-8 p-6 bg-primary/5 rounded-lg border border-primary/20">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-primary animate-pulse" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Love this tool? ⭐ Star us on GitHub!
          </h3>
          <p className="text-muted-foreground mb-4 max-w-2xl mx-auto">
            Help others discover this Color Contrast Checker by starring our repository and sharing your positive experience. Your support helps us improve accessibility for everyone!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Button 
              onClick={handleGitHubStar}
              className="gap-2 bg-[#24292e] hover:bg-[#24292e]/90 text-white"
            >
              <Github className="w-4 h-4" />
              <Star className="w-4 h-4" />
              Star on GitHub
            </Button>
            <Button 
              onClick={handleShareReview}
              variant="outline"
              className="gap-2"
            >
              <Share2 className="w-4 h-4" />
              Share Review
            </Button>
          </div>
        </div>

        <Separator className="mb-6" />
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6">
          <div className="text-sm text-muted-foreground">
            © 2024 Color Vision Check Buddy. All rights reserved.
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Created by</span>
            <a 
              href="https://www.linkedin.com/in/danishmk1286/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-primary hover:text-primary/80 transition-colors font-medium"
            >
              <Linkedin className="w-4 h-4" />
              Danish Khan
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
