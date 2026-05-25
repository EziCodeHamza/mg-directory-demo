interface FilterBarProps {
  onFilter: (filters: { search: string; country: string }) => void;
  countries: string[];
  resultCount: number;
  totalCount: number;
}

export default function FilterBar({ onFilter, countries, resultCount, totalCount }: FilterBarProps) {
  const handleChange = (field: string, value: string) => {
    // Read current values from the inputs directly
    const searchEl = document.getElementById('filter-search') as HTMLInputElement;
    const countryEl = document.getElementById('filter-country') as HTMLSelectElement;
    
    const search = field === 'search' ? value : searchEl?.value || '';
    const country = field === 'country' ? value : countryEl?.value || '';
    
    onFilter({ search, country });
  };

  return (
    <div className="p-4 bg-white border-b border-gray-100">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            id="filter-search"
            type="text"
            placeholder="Search by name, city, or specialty..."
            onChange={(e) => handleChange('search', e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold bg-cream/50 font-body"
          />
        </div>
        <select
          id="filter-country"
          onChange={(e) => handleChange('country', e.target.value)}
          className="px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold bg-cream/50 font-body min-w-[140px]"
        >
          <option value="">All Countries</option>
          {countries.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <p className="text-xs text-gray-400 mt-2 text-center">
        Showing {resultCount} of {totalCount} certified therapists
      </p>
    </div>
  );
}
