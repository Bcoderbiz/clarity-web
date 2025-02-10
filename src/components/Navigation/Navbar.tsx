import React, { useState } from 'react';
import { Menu, X, Home, Calendar, Target, Users, User } from 'lucide-react';
import NavLink from './NavLink';
import MobileMenu from './MobileMenu';

const navigationItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Schedule', href: '/schedule', icon: Calendar },
  { name: 'Overview', href: '/overview', icon: Target },
  { name: 'Social', href: '/social', icon: Users },
  { name: 'Profile', href: '/profile', icon: User },
];

interface NavbarProps {
  activePage: string;
  onPageChange: (page: string) => void;
}

export default function Navbar({ activePage, onPageChange }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-white shadow-sm h-16 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          {/* Logo */}
          <div className="flex-shrink-0">
            <span className="text-xl font-semibold">Clarity</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navigationItems.map((item) => (
              <NavLink
                key={item.name}
                href={item.href}
                isActive={activePage === item.name}
                onClick={() => onPageChange(item.name)}
                icon={item.icon}
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <MobileMenu
        isOpen={isOpen}
        items={navigationItems}
        activeItem={activePage}
        onItemClick={(name) => {
          onPageChange(name);
          setIsOpen(false);
        }}
      />
    </nav>
  );
}