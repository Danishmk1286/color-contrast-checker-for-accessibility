import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Heart, Star, Share2, Github, X, ExternalLink } from 'lucide-react';

const GitHubAppreciationPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if popup has been shown before via localStorage (with expiry) or cookie
    const hasShown = getWithExpiry('github-appreciation-shown') || getCookie('github-appreciation-shown');
    if (!hasShown) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 8000); // 8 seconds for faster loading
      return () => clearTimeout(timer);
    }
  }, []);

  // Cookie/localStorage helper functions with expiry
  const setCookie = (name: string, value: string, days: number) => {
    const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
    const secure = window.location.protocol === 'https:' ? ';Secure' : '';
    document.cookie = `${name}=${value};expires=${expires};path=/;SameSite=Strict${secure}`;
  };

  const getCookie = (name: string): string | null => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length);
    }
    return null;
  };

  const setWithExpiry = (key: string, value: string, days: number) => {
    try {
      const item = { value, expiry: Date.now() + days * 24 * 60 * 60 * 1000 };
      localStorage.setItem(key, JSON.stringify(item));
    } catch {}
  };

  const getWithExpiry = (key: string): string | null => {
    try {
      const str = localStorage.getItem(key);
      if (!str) return null;
      const item = JSON.parse(str);
      if (item && typeof item.expiry === 'number' && Date.now() < item.expiry) {
        return item.value as string;
      }
      localStorage.removeItem(key);
      return null;
    } catch {
      return null;
    }
  };

  const handleClose = () => {
    setWithExpiry('github-appreciation-shown', 'true', 30);
    setCookie('github-appreciation-shown', 'true', 30);
    setIsVisible(false);
  };

  const handleGitHubAction = (action: string) => {
    // Track the action for analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'github_action', {
        event_category: 'engagement',
        event_label: action
      });
    }

    // Persist choice for 30 days
    setWithExpiry('github-appreciation-shown', 'true', 30);
    setCookie('github-appreciation-shown', 'true', 30);
    
    // Open GitHub repository
    window.open('https://github.com/danishmk1286/color-contrast-checker-for-accessibility', '_blank');
    
    // Close popup after action
    setTimeout(() => {
      setIsVisible(false);
    }, 1000);
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = 'Check out this amazing WCAG Color Contrast Checker tool! 🎨✨';
    
    let shareUrl = '';
    
    try {
      switch (platform) {
        case 'twitter':
          shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
          break;
        case 'linkedin':
          shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
          break;
        case 'facebook':
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
          break;
        default:
          return;
      }
      
      // Persist choice for 30 days
      setWithExpiry('github-appreciation-shown', 'true', 30);
      setCookie('github-appreciation-shown', 'true', 30);

      window.open(shareUrl, '_blank', 'width=600,height=400');
      setIsVisible(false);
    } catch (error) {
      // Handle share failures gracefully
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'share_error', {
          event_category: 'error',
          event_label: error.toString()
        });
      }
      // Keep popup open if share fails
    }
  };

  return (
    <Dialog open={isVisible} onOpenChange={setIsVisible}>
      <DialogContent className="max-w-md mx-auto p-0 border-border">
        {/* Accessible title and description for screen readers */}
        <DialogHeader className="sr-only">
          <DialogTitle>Support the Color Contrast Checker</DialogTitle>
          <DialogDescription>Star or share the project on GitHub to support development.</DialogDescription>
        </DialogHeader>
        <Card className="border-0 shadow-none">
          <CardHeader className="relative pb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="absolute right-2 top-2 h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
              <span className="sr-only">Close</span>
            </Button>
            
            <div className="text-center pt-2">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/60 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-primary-foreground animate-pulse" />
              </div>
              
              <CardTitle className="text-xl text-foreground mb-2">
                Enjoying our tool? 🎨
              </CardTitle>
              
              <p className="text-sm text-muted-foreground leading-relaxed">
                If this Color Contrast Checker helped you create more accessible designs, 
                show some love on GitHub and help others discover it!
              </p>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* GitHub Actions */}
            <div className="space-y-3">
              <Button
                onClick={() => handleGitHubAction('star')}
                className="w-full gap-3 bg-[#24292e] hover:bg-[#24292e]/90 text-white"
                size="lg"
              >
                <Github className="w-5 h-5" />
                <Star className="w-4 h-4" />
                Star on GitHub
                <ExternalLink className="w-4 h-4" />
              </Button>
              
              <Button
                onClick={() => handleGitHubAction('fork')}
                variant="outline"
                className="w-full gap-3"
                size="lg"
              >
                <Github className="w-5 h-5" />
                View Repository
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
            
            {/* Social Share */}
            <div className="pt-4 border-t border-border">
              <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                <Share2 className="w-4 h-4" />
                Share with others:
              </h4>
              
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare('twitter')}
                  className="gap-2 text-xs"
                >
                  𝕏 Twitter
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare('linkedin')}
                  className="gap-2 text-xs"
                >
                  💼 LinkedIn
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare('facebook')}
                  className="gap-2 text-xs"
                >
                  📘 Facebook
                </Button>
              </div>
            </div>
            
            <Button
              variant="ghost"
              onClick={handleClose}
              className="w-full text-muted-foreground hover:text-foreground"
              size="sm"
            >
              Maybe later
            </Button>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default GitHubAppreciationPopup;