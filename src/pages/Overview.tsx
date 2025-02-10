import React from 'react';
import AreasSection from '../components/Overview/AreasSection';
import ErrandsSection from '../components/Overview/ErrandsSection';
import { Area } from '../types/area';

interface OverviewProps {
  onAreaClick: (area: Area) => void;
}

export default function Overview({ onAreaClick }: OverviewProps) {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AreasSection onAreaClick={onAreaClick} />
        <ErrandsSection />
      </div>
    </div>
  );
}