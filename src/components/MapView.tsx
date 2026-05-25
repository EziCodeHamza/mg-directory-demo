import { useState, useCallback, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import type { Therapist } from '@/types';

interface MapViewProps {
  therapists: Therapist[];
  selectedTherapist: string | null;
  onSelectTherapist: (id: string) => void;
}

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const mapOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: false,
  styles: [
    { featureType: 'administrative', elementType: 'labels.text.fill', stylers: [{ color: '#444444' }] },
    { featureType: 'administrative.country', elementType: 'labels.text', stylers: [{ visibility: 'on' }] },
    { featureType: 'landscape', elementType: 'all', stylers: [{ color: '#f5f1eb' }] },
    { featureType: 'poi', elementType: 'all', stylers: [{ visibility: 'off' }] },
    { featureType: 'road', elementType: 'all', stylers: [{ saturation: -100 }, { lightness: 45 }] },
    { featureType: 'road.highway', elementType: 'all', stylers: [{ visibility: 'simplified' }] },
    { featureType: 'road.arterial', elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
    { featureType: 'transit', elementType: 'all', stylers: [{ visibility: 'off' }] },
    { featureType: 'water', elementType: 'all', stylers: [{ color: '#c9d6df' }, { visibility: 'on' }] },
  ],
};

function createMarkerSvg(isActive: boolean): string {
  const fill = isActive ? '#C9A84C' : '#0B1C2C';
  const stroke = isActive ? '#0B1C2C' : '#C9A84C';
  const size = isActive ? 28 : 22;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${Math.round(size * 1.5)}" viewBox="0 0 24 36">
    <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 24 12 24s12-15 12-24C24 5.4 18.6 0 12 0z" fill="${fill}" stroke="${stroke}" stroke-width="1.5"/>
    <circle cx="12" cy="11" r="4" fill="${stroke}"/>
  </svg>`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createMarkerIcon(isActive: boolean): any {
  const svg = createMarkerSvg(isActive);
  const size = isActive ? 28 : 22;
  return {
    url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`,
    scaledSize: { width: size, height: Math.round(size * 1.5) },
    anchor: { x: size / 2, y: Math.round(size * 1.5) },
  };
}

/* ========== FALLBACK MAP (no API key) ========== */

function MapFallback({
  therapists,
  selectedId,
  onSelect,
}: {
  therapists: Therapist[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const lats = therapists.map((t) => t.lat);
  const lngs = therapists.map((t) => t.lng);
  const minLat = Math.min(...lats) - 3;
  const maxLat = Math.max(...lats) + 3;
  const minLng = Math.min(...lngs) - 8;
  const maxLng = Math.max(...lngs) + 8;

  const getX = (lng: number) => ((lng - minLng) / (maxLng - minLng)) * 80 + 10;
  const getY = (lat: number) => ((maxLat - lat) / (maxLat - minLat)) * 75 + 12;

  const selectedData = selectedId ? therapists.find((t) => t.id === selectedId) : null;

  return (
    <div ref={containerRef} className="w-full h-full bg-navy relative overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-[0.03]">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute w-full border-t border-white"
            style={{ top: `${(i + 1) * 5}%` }}
          />
        ))}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute h-full border-l border-white"
            style={{ left: `${(i + 1) * 5}%` }}
          />
        ))}
      </div>

      {/* Decorative circles */}
      <div className="absolute top-[15%] left-[20%] w-64 h-64 border border-gold/[0.06] rounded-full" />
      <div className="absolute bottom-[20%] right-[15%] w-80 h-80 border border-gold/[0.04] rounded-full" />

      {/* Title */}
      <div className="absolute top-4 left-4 z-10">
        <h3 className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-body">
          Therapist Locations
        </h3>
        <p className="text-white/20 text-[9px] mt-0.5">{therapists.length} providers</p>
      </div>

      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full z-0" style={{ pointerEvents: 'none' }}>
        {therapists.map((t, i) => {
          if (i === 0) return null;
          const prev = therapists[i - 1];
          return (
            <line
              key={`line-${t.id}`}
              x1={`${getX(prev.lng)}%`}
              y1={`${getY(prev.lat)}%`}
              x2={`${getX(t.lng)}%`}
              y2={`${getY(t.lat)}%`}
              stroke="rgba(201,168,76,0.08)"
              strokeWidth="1"
            />
          );
        })}
      </svg>

      {/* Markers */}
      {therapists.map((t) => {
        const x = getX(t.lng);
        const y = getY(t.lat);
        const isActive = selectedId === t.id;

        return (
          <button
            key={t.id}
            onClick={() => onSelect(t.id)}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 group"
            style={{ left: `${x}%`, top: `${y}%`, zIndex: isActive ? 20 : 10 }}
          >
            {/* Pulse ring for active */}
            {isActive && (
              <div className="absolute inset-0 w-6 h-6 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 rounded-full bg-gold/20 animate-ping" />
            )}
            <div
              className={`w-3.5 h-3.5 rounded-full border-2 transition-all duration-300 ${
                isActive
                  ? 'bg-gold border-gold scale-[2] shadow-lg shadow-gold/30'
                  : 'bg-navy-light border-gold/50 hover:bg-gold/80 hover:scale-150 hover:border-gold'
              }`}
            />
            {/* City label */}
            <div
              className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-medium transition-all duration-300 ${
                isActive
                  ? 'opacity-100 -bottom-5 text-gold'
                  : 'opacity-0 group-hover:opacity-100 -bottom-5 text-white/70'
              }`}
            >
              {t.city}
            </div>
          </button>
        );
      })}

      {/* Selected therapist info popup */}
      {selectedData && (
        <div className="absolute bottom-4 left-4 right-4 bg-white rounded-xl p-4 shadow-2xl z-30 max-w-sm mx-auto">
          <div className="flex items-start gap-3">
            <img
              src={selectedData.photo}
              alt={selectedData.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-gold/30"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-heading font-semibold text-navy text-sm">{selectedData.name}</h4>
              <p className="text-xs text-gray-500 mt-0.5">
                {selectedData.city}, {selectedData.province}
              </p>
              <div className="flex flex-wrap gap-1 mt-1.5">
                {selectedData.specialties.slice(0, 2).map((s) => (
                  <span key={s} className="text-[10px] px-1.5 py-0.5 bg-navy/[0.05] text-navy/70 rounded-full">
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <Link
              to={`/therapist/${selectedData.slug}`}
              className="text-xs bg-gold text-navy px-3 py-1.5 rounded-lg font-medium hover:bg-gold-light transition-colors shrink-0"
            >
              View
            </Link>
          </div>
        </div>
      )}

      {/* API key hint */}
      <div className="absolute bottom-4 right-4 bg-navy-light/60 backdrop-blur-sm text-white/25 text-[10px] px-3 py-1.5 rounded-lg z-10">
        Add Google Maps API key for interactive map
      </div>
    </div>
  );
}

/* ========== GOOGLE MAPS COMPONENT ========== */

function GoogleMapView({
  therapists,
  selectedTherapist,
  onSelectTherapist,
}: MapViewProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [map, setMap] = useState<any>(null);
  const [activeInfoWindow, setActiveInfoWindow] = useState<string | null>(null);
  const isInitialFit = useRef(true);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onLoad = useCallback(
    (mapInstance: any) => {
      setMap(mapInstance);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const bounds = new (window as any).google.maps.LatLngBounds();
      therapists.forEach((t) => bounds.extend({ lat: t.lat, lng: t.lng }));
      mapInstance.fitBounds(bounds, 60);
      isInitialFit.current = true;
    },
    [therapists]
  );

  useEffect(() => {
    if (!map || !selectedTherapist) return;
    const therapist = therapists.find((t) => t.id === selectedTherapist);
    if (!therapist) return;

    if (isInitialFit.current) {
      isInitialFit.current = false;
    }
    map.panTo({ lat: therapist.lat, lng: therapist.lng });
    map.setZoom(7);
    setActiveInfoWindow(selectedTherapist);
  }, [selectedTherapist, therapists, map]);

  const handleMarkerClick = (id: string) => {
    setActiveInfoWindow(id);
    onSelectTherapist(id);
  };

  const selectedData = activeInfoWindow ? therapists.find((t) => t.id === activeInfoWindow) : null;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={{ lat: 49.0, lng: -95.0 }}
      zoom={4}
      options={mapOptions}
      onLoad={onLoad}
    >
      {therapists.map((therapist) => (
        <Marker
          key={therapist.id}
          position={{ lat: therapist.lat, lng: therapist.lng }}
          icon={createMarkerIcon(selectedTherapist === therapist.id)}
          onClick={() => handleMarkerClick(therapist.id)}
          animation={selectedTherapist === therapist.id ? 1 : undefined}
        />
      ))}

      {selectedData && (
        <InfoWindow
          position={{ lat: selectedData.lat, lng: selectedData.lng }}
          onCloseClick={() => setActiveInfoWindow(null)}
        >
          <div className="p-1 min-w-[180px] max-w-[240px]">
            <h4 className="font-semibold text-sm text-[#0B1C2C]">{selectedData.name}</h4>
            <p className="text-xs text-gray-500 mt-0.5">
              {selectedData.city}, {selectedData.province}
            </p>
            <div className="flex flex-wrap gap-1 mt-1.5">
              {selectedData.specialties.slice(0, 3).map((s) => (
                <span key={s} className="text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                  {s}
                </span>
              ))}
            </div>
            <Link
              to={`/therapist/${selectedData.slug}`}
              className="inline-block mt-2 text-xs bg-[#C9A84C] text-[#0B1C2C] px-3 py-1.5 rounded font-medium hover:bg-[#d4b86a] transition-colors"
            >
              View Profile
            </Link>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

/* ========== MAIN EXPORT ========== */

export default function MapView({ therapists, selectedTherapist, onSelectTherapist }: MapViewProps) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <MapFallback
        therapists={therapists}
        selectedId={selectedTherapist}
        onSelect={onSelectTherapist}
      />
    );
  }

  return (
    <LoadScript
      googleMapsApiKey={apiKey}
      loadingElement={
        <MapFallback
          therapists={therapists}
          selectedId={selectedTherapist}
          onSelect={onSelectTherapist}
        />
      }
    >
      <GoogleMapView
        therapists={therapists}
        selectedTherapist={selectedTherapist}
        onSelectTherapist={onSelectTherapist}
      />
    </LoadScript>
  );
}
