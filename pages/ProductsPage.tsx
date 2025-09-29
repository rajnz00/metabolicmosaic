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
            
                href={product.stripeLink}
                className="mt-4 w-full block text-center bg-brand-primary text-white py-2 px-4 rounded-md font-semibold hover:bg-brand-secondary transition-colors opacity-0 group-hover:opacity-100"
            >
                Add to cart
            </a>
        )}
    </div>
);