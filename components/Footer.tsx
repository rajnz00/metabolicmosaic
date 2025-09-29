import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-dark text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
             <Link to="/" className="flex items-center space-x-2">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-primary" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 014 0v.414a1.5 1.5 0 01-2.121 1.061 6.01 6.01 0 01-1.785 1.066 6.002 6.002 0 01-3.212 0c-1.13-.398-1.987-1.22-2.312-2.253a.5.5 0 01.44- C5.05 8.343 4.792 8.15 4.332 8.027z" clipRule="evenodd" />
                </svg>
               <span className="text-xl font-bold">MetabolicMosaic</span>
             </Link>
            <p className="text-gray-400 text-base">
              Connecting the pieces of health, nutrition, and exercise for peak performance.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">Navigate</h3>
                <ul className="mt-4 space-y-4">
                  <li><Link to="/about" className="text-base text-gray-400 hover:text-white">About</Link></li>
                  <li><Link to="/blog" className="text-base text-gray-400 hover:text-white">Blog</Link></li>
                  <li><Link to="/contact" className="text-base text-gray-400 hover:text-white">Contact</Link></li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">Shop</h3>
                <ul className="mt-4 space-y-4">
                  <li><Link to="/products" className="text-base text-gray-400 hover:text-white">Products</Link></li>
                  <li><Link to="/guides" className="text-base text-gray-400 hover:text-white">Guides</Link></li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-1 md:gap-8">
               <div>
                <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">Legal</h3>
                <ul className="mt-4 space-y-4">
                  <li><a href="#" className="text-base text-gray-400 hover:text-white">Privacy</a></li>
                  <li><a href="#" className="text-base text-gray-400 hover:text-white">Terms</a></li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">Follow Us</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a 
                      href="https://www.youtube.com/@MetabolicMosaic" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base text-gray-400 hover:text-white flex items-center gap-2"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                      YouTube
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-base text-gray-400 xl:text-center">&copy; {currentYear} MetabolicMosaic. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;