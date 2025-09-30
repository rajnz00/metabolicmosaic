import React from 'react';
import { products } from '../data/products';
import type { Product } from '../types';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
    <div className="group relative">
        <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
            <img
                src={product.imageUrl}
                alt={product.name}
                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
            />
        </div>
        <div className="mt-4 flex justify-between">
            <div>
                <h3 className="text-md text-gray-700 font-semibold">
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.name}
                </h3>
                <p className="mt-1 text-sm text-gray-500">{product.description}</p>
            </div>
            <p className="text-md font-medium text-gray-900">${product.price.toFixed(2)}</p>
        </div>
        {product.stripeLink && (
    <a
        href={product.stripeLink}
        className="mt-4 w-full block text-center bg-brand-primary text-white py-2 px-4 rounded-md font-semibold hover:bg-brand-secondary transition-colors"
    >
        Buy Now
    </a>
)}
        )}
    </div>
);

const ProductsPage: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl">Our Products</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            High-quality equipment and supplements to support your health and performance goals.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;