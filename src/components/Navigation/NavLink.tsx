import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  icon: LucideIcon;
}

export default function NavLink({ href, children, isActive, onClick, icon: Icon }: NavLinkProps) {
  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        onClick?.();
      }}
      className={`h-16 flex items-center px-3 text-sm font-medium transition-colors duration-200 relative
        ${
          isActive
            ? 'text-gray-900'
            : 'text-gray-500 hover:text-gray-700'
        }`}
    >
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4" />
        <span>{children}</span>
      </div>
      {isActive && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500" />
      )}
    </a>
  );
}