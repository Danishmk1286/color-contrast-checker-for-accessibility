import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Home, BookOpen, Info, Share, Menu, X } from 'lucide-react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleShareClick = () => {
    const url = window.location.href;
    const text = 'Check out this amazing WCAG Color Contrast Checker! 🎨';
    
    if (navigator.share) {
      navigator.share({
        title: 'Color Contrast Checker',
        text: text,
        url: url
      });
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
            <div className="w-7 h-7 md:w-8 md:h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-xs md:text-sm font-bold text-primary-foreground">W</span>
            </div>
            <span className="text-base md:text-lg font-semibold text-foreground hidden sm:block">
              Color Contrast Checker
            </span>
            <span className="text-sm font-semibold text-foreground sm:hidden">
              WCAG
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <Button variant="ghost" asChild className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
              <Link to="/">
                <Home className="w-4 h-4" />
                <span className="hidden lg:inline">Checker</span>
              </Link>
            </Button>
            <Button variant="ghost" asChild className="gap-2 text-muted-foreground hover:text-foreground hover:bg-muted">
              <Link to="/blog">
                <BookOpen className="w-4 h-4" />
                <span className="hidden lg:inline">Blog</span>
              </Link>
            </Button>
            <Button variant="ghost" asChild className="gap-2 text-muted-foreground hover:text-foreground hover:bg-muted">
              <Link to="/about">
                <Info className="w-4 h-4" />
                <span className="hidden lg:inline">About</span>
              </Link>
            </Button>
          </nav>

          {/* Desktop Actions & Mobile Menu */}
          <div className="flex items-center gap-1 md:gap-2">
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
                      <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center">
                        <span className="text-xs font-bold text-primary-foreground">W</span>
                      </div>
                      <span className="text-sm font-semibold">Menu</span>
                    </div>
                  </div>

                  {/* Mobile Navigation */}
                  <nav className="flex flex-col gap-2 py-6">
                    <Button 
                      variant="ghost" 
                      asChild 
                      className="justify-start gap-3 h-12 text-base"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Link to="/">
                        <Home className="w-5 h-5" />
                        Color Checker
                      </Link>
                    </Button>
                    <Button 
                      variant="ghost" 
                      asChild 
                      className="justify-start gap-3 h-12 text-base"
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
                      className="justify-start gap-3 h-12 text-base"
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
                      className="justify-start gap-3 h-12 text-base"
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