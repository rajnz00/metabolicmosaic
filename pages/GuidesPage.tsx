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