import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Home, BookOpen, Info, Share } from 'lucide-react';

const Header = () => {
  return (
    <header className="border-b border-border bg-background sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <span className="text-sm font-bold text-white">W</span>
            </div>
            <span className="text-lg font-semibold text-foreground">Color Contrast Checker</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            <Button variant="ghost" asChild className="gap-2 bg-green-600 text-white hover:bg-green-700">
              <Link to="/">
                <Home className="w-4 h-4" />
                Checker
              </Link>
            </Button>
            <Button variant="ghost" asChild className="gap-2 text-muted-foreground hover:text-foreground hover:bg-muted">
              <Link to="/blog">
                <BookOpen className="w-4 h-4" />
                Blog
              </Link>
            </Button>
            <Button variant="ghost" asChild className="gap-2 text-muted-foreground hover:text-foreground hover:bg-muted">
              <Link to="/about">
                <Info className="w-4 h-4" />
                About
              </Link>
            </Button>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground hover:bg-muted">
              <Share className="w-4 h-4" />
              Share
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;