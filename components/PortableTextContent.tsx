--- START OF FILE src/components/PortableTextContent.tsx ---
import React from 'react';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import { urlFor } from '../sanity';
import type { SanityImage } from '../types';

interface PortableTextContentProps {
  blocks: any[]; // Sanity Portable Text blocks
}

const components: PortableTextComponents = {
  types: {
    image: ({ value }: { value: SanityImage & { alt?: string } }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <img
          className="my-8 w-full h-auto object-cover rounded-lg shadow-lg"
          alt={value.alt || 'Blog post image'}
          loading="lazy"
          src={urlFor(value).width(800).url() || ''}
        />
      );
    },
  },
  block: {
    h1: ({ children }) => <h1 className="text-4xl font-bold my-4">{children}</h1>,
    h2: ({ children }) => <h2 className="text-3xl font-bold my-3">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl font-bold my-2">{children}</h3>,
    normal: ({ children }) => <p className="mb-4">{children}</p>,
    blockquote: ({ children }) => <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4">{children}</blockquote>,
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-5 my-4">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-5 my-4">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="mb-2">{children}</li>,
    number: ({ children }) => <li className="mb-2">{children}</li>,
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      return (
        <a href={value.href} rel={rel} className="text-brand-primary hover:underline">
          {children}
        </a>
      );
    },
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
  },
};

const PortableTextContent: React.FC<PortableTextContentProps> = ({ blocks }) => {
  if (!blocks) return null;
  return <PortableText value={blocks} components={components} />;
};

export default PortableTextContent;
--- END OF FILE src/components/PortableTextContent.tsx ---