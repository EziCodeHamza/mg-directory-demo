import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();

  return (
    <header className="bg-navy text-white shadow-lg relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <span className="text-navy font-heading font-bold text-base">MG</span>
          </div>
          <div>
            <h1 className="font-heading text-lg sm:text-xl font-semibold text-gold leading-tight">
              The Mastectomy Guide
            </h1>
            <p className="text-[10px] sm:text-xs text-gray-400 tracking-wider uppercase leading-tight">
              Certified Therapist Directory
            </p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className={`text-sm font-medium transition-colors ${
              location.pathname === '/' ? 'text-gold' : 'text-gray-300 hover:text-gold'
            }`}
          >
            Find a Therapist
          </Link>
          <Link
            to="/apply"
            className={`text-sm font-medium transition-colors ${
              location.pathname === '/apply' ? 'text-gold' : 'text-gray-300 hover:text-gold'
            }`}
          >
            Apply to List
          </Link>
          <a
            href="https://mastectomyguide.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-gray-300 hover:text-gold transition-colors"
          >
            About MG
            <svg className="w-3 h-3 inline-block ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </nav>

        <div className="md:hidden flex items-center gap-3">
          <Link
            to="/apply"
            className="text-xs text-gold border border-gold/60 rounded-lg px-3 py-1.5 hover:bg-gold/10 transition-colors"
          >
            Apply
          </Link>
          <Link
            to="/"
            className="text-xs text-gray-300 border border-gray-600 rounded-lg px-3 py-1.5 hover:text-gold hover:border-gold/60 transition-colors"
          >
            Directory
          </Link>
        </div>
      </div>
    </header>
  );
}
