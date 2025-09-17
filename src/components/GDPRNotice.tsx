import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { X, Cookie, Shield } from 'lucide-react';

const GDPRNotice: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Prefer localStorage with expiry, fallback to cookie
    const stored = getWithExpiry('gdpr-accepted') || getCookie('gdpr-accepted');
    if (!stored) {
      setIsVisible(true);
    }
  }, []);

  // Cookie/localStorage helpers with expiry
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

  const handleAccept = () => {
    setWithExpiry('gdpr-accepted', 'true', 365); // 1 year expiry
    setCookie('gdpr-accepted', 'true', 365);
    setIsVisible(false);
  };

  const handleDecline = () => {
    setWithExpiry('gdpr-accepted', 'declined', 365); // 1 year expiry
    setCookie('gdpr-accepted', 'declined', 365);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <Card className="max-w-4xl mx-auto border-border bg-card shadow-lg">
        <CardContent className="p-4 md:p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Cookie className="w-5 h-5 text-primary" />
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-semibold text-foreground">Privacy & Cookies</h3>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                We use essential cookies and local storage to enhance your experience on our Color Contrast Checker. 
                This includes saving your color preferences and settings. We respect your privacy and don't track 
                personal information. By continuing to use our site, you consent to our use of these technologies.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={handleAccept}
                  size="sm" 
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Accept & Continue
                </Button>
                <Button 
                  onClick={handleDecline}
                  variant="outline" 
                  size="sm"
                  className="border-border text-muted-foreground hover:text-foreground"
                >
                  Decline
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary hover:text-primary/80"
                  asChild
                >
                  <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">
                    Learn More
                  </a>
                </Button>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDecline}
              className="flex-shrink-0 h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GDPRNotice;