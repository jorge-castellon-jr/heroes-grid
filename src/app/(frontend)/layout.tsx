"use client"
import React, { useState, useEffect } from 'react';
import { RangerColorBar } from '@/ui/RangerColorBar';
import { SideNavigation } from '@/ui/SideNavigation';
import { BackgroundEffects } from '@/ui/BackgroundEffects';
import { Menu } from 'lucide-react';
import clsx from 'clsx';
import { ThemeProvider } from './ThemeProvider';
import './styles.css'
import { useTheme } from 'next-themes';

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme } = useTheme();

  // Handle responsive sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsExpanded(false);
      } else {
        setIsExpanded(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <html lang='en'>
      <head></head>
      <body suppressHydrationWarning>
        <ThemeProvider defaultTheme='dark'>
          <div className={`min-h-screen ${theme === 'dark' ? 'dark text-white' : 'text-gray-900'}`}>
            <BackgroundEffects />
            <RangerColorBar />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={clsx(
                "md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg",
                theme === 'dark'
                  ? "bg-gray-800 text-white hover:bg-gray-700"
                  : "bg-white text-gray-900 hover:bg-gray-100"
              )}
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
              <div
                className="md:hidden fixed inset-0 bg-black/50 z-40"
                onClick={() => setIsMobileMenuOpen(false)}
              />
            )}

            <SideNavigation
              isExpanded={isExpanded}
              onToggle={() => setIsExpanded(!isExpanded)}
              isMobileMenuOpen={isMobileMenuOpen}
              onMobileClose={() => setIsMobileMenuOpen(false)}
            />

            <main
              className={clsx(
                "transition-all duration-300 p-4 sm:p-6 md:p-8",
                {
                  'md:ml-64': isExpanded,
                  'md:ml-20': !isExpanded,
                  'ml-0': true
                }
              )}
            >
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
