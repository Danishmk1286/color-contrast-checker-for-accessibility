import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Home, BookOpen, Info, Share, Menu } from 'lucide-react';
import logoImage from '@/assets/logo.png';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Helper function to check if a path is active
  const isActivePath = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  // Helper function to get navigation link classes
  const getNavLinkClasses = (path: string) => {
    const baseClasses = "gap-2 transition-all duration-200";
    return isActivePath(path)
      ? `${baseClasses} bg-primary text-primary-foreground hover:bg-primary/90`
      : `${baseClasses} text-muted-foreground hover:text-foreground hover:bg-muted`;
  };

  // Helper function to get mobile navigation link classes
  const getMobileNavLinkClasses = (path: string) => {
    const baseClasses = "justify-start gap-3 h-12 text-base transition-all duration-200";
    return isActivePath(path)
      ? `${baseClasses} bg-primary text-primary-foreground hover:bg-primary/90`
      : `${baseClasses} text-muted-foreground hover:text-foreground hover:bg-muted`;
  };

  const handleShareClick = async () => {
    const url = window.location.href;
    const text = 'Check out this amazing WCAG Color Contrast Checker! 🎨';
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Color Contrast Checker',
          text: text,
          url: url
        });
      } catch (error) {
        // If share fails (permission denied or not supported), fallback to Twitter
        const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        window.open(shareUrl, '_blank');
      }
    } else {
      // Fallback to Twitter
      const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
      window.open(shareUrl, '_blank');
    }
  };

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-6 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 md:gap-3">
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg flex items-center justify-center">
              <img src={logoImage} alt="WCAG Contrast Checker Logo" className="w-full h-full rounded-lg" />
            </div>
            <span className="text-base md:text-lg font-semibold text-foreground hidden sm:block">
              Color Contrast Checker
            </span>
            <span className="text-sm font-semibold text-foreground sm:hidden">
              WCAG
            </span>
          </Link>

          {/* Right side - Navigation and Actions */}
          <div className="flex items-center gap-1 md:gap-2">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2 mr-2">
              <Button variant="ghost" asChild className={getNavLinkClasses('/')}>
                <Link to="/">
                  <Home className="w-4 h-4" />
                  <span className="hidden lg:inline">Home</span>
                </Link>
              </Button>
              <Button variant="ghost" asChild className={getNavLinkClasses('/blog')}>
                <Link to="/blog">
                  <BookOpen className="w-4 h-4" />
                  <span className="hidden lg:inline">Blog</span>
                </Link>
              </Button>
              <Button variant="ghost" asChild className={getNavLinkClasses('/about')}>
                <Link to="/about">
                  <Info className="w-4 h-4" />
                  <span className="hidden lg:inline">About</span>
                </Link>
              </Button>
            </nav>

            {/* Desktop Share Button */}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleShareClick}
              className="gap-2 text-muted-foreground hover:text-foreground hover:bg-muted hidden md:flex"
            >
              <Share className="w-4 h-4" />
              <span className="hidden lg:inline">Share</span>
            </Button>
            
            <ThemeToggle />
            
            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                  <Menu className="w-4 h-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[350px]">
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-border">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md flex items-center justify-center">
                        <img src={logoImage} alt="WCAG Contrast Checker Logo" className="w-full h-full rounded-md" />
                      </div>
                      <span className="text-sm font-semibold">Navigation</span>
                    </div>
                  </div>

                  {/* Mobile Navigation */}
                  <nav className="flex flex-col gap-2 py-6">
                    <Button 
                      variant="ghost" 
                      asChild 
                      className={getMobileNavLinkClasses('/')}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Link to="/">
                        <Home className="w-5 h-5" />
                        Home
                      </Link>
                    </Button>
                    <Button 
                      variant="ghost" 
                      asChild 
                      className={getMobileNavLinkClasses('/blog')}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Link to="/blog">
                        <BookOpen className="w-5 h-5" />
                        Blog & Resources
                      </Link>
                    </Button>
                    <Button 
                      variant="ghost" 
                      asChild 
                      className={getMobileNavLinkClasses('/about')}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Link to="/about">
                        <Info className="w-5 h-5" />
                        About Tool
                      </Link>
                    </Button>
                    <Button 
                      variant="ghost" 
                      onClick={() => {
                        handleShareClick();
                        setIsMobileMenuOpen(false);
                      }}
                      className="justify-start gap-3 h-12 text-base text-muted-foreground hover:text-foreground hover:bg-muted"
                    >
                      <Share className="w-5 h-5" />
                      Share Tool
                    </Button>
                  </nav>

                  {/* Mobile Footer */}
                  <div className="mt-auto pt-4 border-t border-border">
                    <div className="text-xs text-muted-foreground text-center">
                      WCAG 2.1 Compliant Tool
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;