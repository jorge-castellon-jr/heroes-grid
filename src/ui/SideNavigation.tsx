"use client"
import React from 'react';
import { ChevronLeft, ChevronRight, Power, Users, Cpu, Box, Layers, Sun, Moon, X } from 'lucide-react';
import { clsx } from 'clsx';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';

interface SideNavigationProps {
  isExpanded: boolean;
  onToggle: () => void;
  isMobileMenuOpen: boolean;
  onMobileClose: () => void;
}

export function SideNavigation({ isExpanded, onToggle, isMobileMenuOpen, onMobileClose }: SideNavigationProps) {
  const router = useRouter();
  const pathname = usePathname()
  const { theme, setTheme } = useTheme();

  const navItems = [
    {
      icon: Users,
      label: 'Rangers',
      path: '/rangers',
      isActive: pathname.startsWith('/rangers')
    },
    {
      icon: Box,
      label: 'Cards',
      path: '/cards',
      isActive: pathname.startsWith('/cards')
    },
    {
      icon: Cpu,
      label: 'Zords',
      path: '/zords',
      isActive: pathname.startsWith('/zords')
    },
    {
      icon: Layers,
      label: 'Megazords',
      path: '/megazords',
      isActive: pathname.startsWith('/megazords')
    },
  ];

  const handleNavigation = (path: string) => {
    router.push(path);
    onMobileClose();
  };

  return (
    <nav
      className={clsx(
        "fixed md:top-2 bg-gradient-to-b border-r transition-all duration-300 z-50 h-screen",
        theme === 'dark'
          ? "from-gray-900 to-black border-white/10 text-white"
          : "from-white to-gray-50 border-gray-200 text-gray-900",
        {
          'w-full md:w-64 inset-0': isMobileMenuOpen,
          'md:w-64': isExpanded && !isMobileMenuOpen,
          'md:w-20': !isExpanded && !isMobileMenuOpen,
          'left-0 md:left-0': isMobileMenuOpen,
          '-left-full md:left-0': !isMobileMenuOpen
        }
      )}
    >
      {/* Mobile Close Button */}
      <button
        onClick={onMobileClose}
        className={clsx(
          "md:hidden absolute right-4 top-4",
          theme === 'dark' ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"
        )}
      >
        <X className="w-6 h-6" />
      </button>

      {/* Toggle Button - Hidden on Mobile */}
      <button
        onClick={onToggle}
        className="hidden md:flex absolute -right-3 top-8 w-6 h-6 bg-red-600 rounded-full items-center justify-center hover:bg-red-500 transition-colors z-50 text-white"
      >
        {isExpanded ? (
          <ChevronLeft className="w-4 h-4" />
        ) : (
          <ChevronRight className="w-4 h-4" />
        )}
      </button>

      {/* Logo */}
      <div className="p-6 flex items-center space-x-4">
        <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center transform hover:scale-110 transition-transform text-white">
          <Power className="w-6 h-6" />
        </div>
        <div className={clsx(
          "font-bold text-lg whitespace-nowrap transition-opacity duration-300",
          (isExpanded || isMobileMenuOpen) ? "opacity-100" : "opacity-0"
        )}>
          Power Rangers
        </div>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 px-4 py-8 space-y-2">
        {navItems.map((item) => {

          return (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={clsx(
                "w-full p-3 flex items-center rounded-lg transition-all duration-300 group",
                item.isActive
                  ? "bg-red-600/20 text-red-500"
                  : theme === 'dark'
                    ? "hover:bg-white/5 text-gray-400 hover:text-white"
                    : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
              )}
            >
              <item.icon className={clsx(
                "w-6 h-6 transition-transform duration-300",
                item.isActive ? "text-red-500" : ""
              )} />
              <span className={clsx(
                "ml-4 transition-all duration-300 whitespace-nowrap",
                (isExpanded || isMobileMenuOpen) ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 absolute"
              )}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Theme Toggle */}
      <div className="px-4 pb-8">
        <button
          onClick={() => theme === 'dark' ? setTheme('light') : setTheme('dark')}
          className={clsx(
            "w-full p-3 flex items-center rounded-lg transition-all duration-300 group",
            theme === 'dark'
              ? "hover:bg-white/5 text-gray-400 hover:text-white"
              : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
          )}
        >
          {theme === 'dark' ? (
            <Sun className="w-6 h-6" />
          ) : (
            <Moon className="w-6 h-6" />
          )}
          <span className={clsx(
            "ml-4 transition-all duration-300 whitespace-nowrap",
            (isExpanded || isMobileMenuOpen) ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 absolute"
          )}>
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </span>
        </button>
      </div>
    </nav>
  );
}
