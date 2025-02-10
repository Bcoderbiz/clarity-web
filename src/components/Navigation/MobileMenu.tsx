import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  items: Array<{ name: string; href: string; icon: LucideIcon }>;
  activeItem: string;
  onItemClick: (name: string) => void;
}

export default function MobileMenu({ isOpen, items, activeItem, onItemClick }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="md:hidden">
      <div className="pt-2 pb-3 space-y-1 bg-white shadow-lg">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                onItemClick(item.name);
              }}
              className={`flex items-center gap-3 px-3 py-2 text-base font-medium transition-colors duration-200
                ${
                  activeItem === item.name
                    ? 'bg-orange-50 text-orange-500'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                }`}
            >
              <Icon className="h-5 w-5" />
              {item.name}
            </a>
          );
        })}
      </div>
    </div>
  );
}