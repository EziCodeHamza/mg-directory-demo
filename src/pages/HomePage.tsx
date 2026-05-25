import { useState, useMemo } from 'react';
import therapistsData from '@/data/therapists.json';
import type { Therapist } from '@/types';
import FilterBar from '@/components/FilterBar';
import TherapistCard from '@/components/TherapistCard';
import MapView from '@/components/MapView';

const therapists = therapistsData as Therapist[];

export default function HomePage() {
  const [search, setSearch] = useState('');
  const [country, setCountry] = useState('');
  const [selectedTherapist, setSelectedTherapist] = useState<string | null>(null);
  const [showMap, setShowMap] = useState(false);

  const countries = useMemo(() => {
    const set = new Set(therapists.map((t) => t.country));
    return Array.from(set).sort();
  }, []);

  const filteredTherapists = useMemo(() => {
    return therapists.filter((t) => {
      const searchLower = search.toLowerCase();
      const matchesSearch =
        !search ||
        t.name.toLowerCase().includes(searchLower) ||
        t.city.toLowerCase().includes(searchLower) ||
        t.province.toLowerCase().includes(searchLower) ||
        t.specialties.some((s) => s.toLowerCase().includes(searchLower));
      const matchesCountry = !country || t.country === country;
      return matchesSearch && matchesCountry;
    });
  }, [search, country]);

  const handleFilter = (filters: { search: string; country: string }) => {
    setSearch(filters.search);
    setCountry(filters.country);
  };

  const handleSelectTherapist = (id: string) => {
    setSelectedTherapist(id || null);
    if (id) {
      setTimeout(() => {
        const cardEl = document.getElementById(`card-${id}`);
        if (cardEl) {
          cardEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 100);
    }
  };

  return (
    <div className="flex-1 flex flex-col md:flex-row min-h-0">
      {/* ===== LEFT: Listings Panel ===== */}
      <div className="w-full md:w-[400px] lg:w-[460px] flex flex-col bg-white border-r border-gray-100 shrink-0 md:h-full overflow-hidden">
        {/* Filter bar */}
        <div className="shrink-0">
          <FilterBar
            onFilter={handleFilter}
            countries={countries}
            resultCount={filteredTherapists.length}
            totalCount={therapists.length}
          />
        </div>

        {/* Mobile map toggle */}
        <div className="md:hidden shrink-0 px-4 pb-3 pt-2">
          <button
            onClick={() => setShowMap(!showMap)}
            className={`w-full py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all ${
              showMap
                ? 'bg-navy-light text-white'
                : 'bg-navy text-white hover:bg-navy-light'
            }`}
          >
            {showMap ? (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                Show Listings ({filteredTherapists.length})
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Show Map View
              </>
            )}
          </button>
        </div>

        {/* Scrollable listings */}
        <div className={`flex-1 overflow-y-auto listings-scroll min-h-0 ${showMap ? 'hidden md:block' : 'block'}`}>
          {filteredTherapists.length === 0 ? (
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-cream rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 className="font-heading text-lg text-navy">No therapists found</h3>
              <p className="text-sm text-gray-400 mt-2">Try adjusting your search or filters</p>
            </div>
          ) : (
            filteredTherapists.map((therapist) => (
              <TherapistCard
                key={therapist.id}
                therapist={therapist}
                isSelected={selectedTherapist === therapist.id}
                onSelect={handleSelectTherapist}
              />
            ))
          )}
        </div>

        {/* Footer */}
        <div className="shrink-0 p-3 border-t border-gray-100 bg-cream/30 hidden md:block">
          <p className="text-[11px] text-gray-400 text-center">
            The Mastectomy Guide · Certified Therapist Directory
          </p>
        </div>
      </div>

      {/* ===== RIGHT: Map Panel ===== */}
      <div className={`flex-1 min-h-[300px] md:min-h-0 ${showMap ? 'block' : 'hidden md:block'}`}>
        <MapView
          therapists={filteredTherapists}
          selectedTherapist={selectedTherapist}
          onSelectTherapist={handleSelectTherapist}
        />
      </div>
    </div>
  );
}
