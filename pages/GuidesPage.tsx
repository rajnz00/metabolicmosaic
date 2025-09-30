import React from 'react';
import { guides } from '../data/guides';
import type { Guide } from '../types';

const GuideCard: React.FC<{ guide: Guide }> = ({ guide }) => (
  <div className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
    <div className="aspect-w-3 aspect-h-2 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-64">
      <img
        src={guide.imageUrl}
        alt={guide.name}
        className="h-full w-full object-cover object-center sm:h-full sm:w-full"
      />
    </div>
    <div className="flex flex-1 flex-col space-y-2 p-4">
      <h3 className="text-lg font-semibold text-gray-900">
          {guide.name}
      </h3>
      <p className="text-sm text-gray-500 flex-grow">{guide.description}</p>
      <div className="flex flex-1 flex-col justify-end">
        <p className="text-xl font-bold text-gray-900">${guide.price.toFixed(2)}</p>
      </div>
    </div>
    <a
        href={guide.stripeLink}
        className="w-full bg-brand-primary text-white py-2 px-4 font-semibold hover:bg-brand-secondary transition-colors text-center"
    >
        Buy Now
    </a>
  </div>
);

const GuidesPage: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl">Programs & Guides</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Expert-designed plans and resources to help you achieve your health and fitness goals.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {guides.map((guide) => (
            <GuideCard key={guide.id} guide={guide} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GuidesPage;