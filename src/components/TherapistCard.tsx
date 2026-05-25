import { Link } from 'react-router-dom';
import type { Therapist } from '@/types';

interface TherapistCardProps {
  therapist: Therapist;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export default function TherapistCard({ therapist, isSelected, onSelect }: TherapistCardProps) {
  return (
    <div
      id={`card-${therapist.id}`}
      className={`p-4 sm:p-5 border-b border-gray-100 cursor-pointer transition-all duration-300 ${
        isSelected
          ? 'bg-gold/[0.06] border-l-[3px] border-l-gold'
          : 'border-l-[3px] border-l-transparent hover:bg-cream/60'
      }`}
      onMouseEnter={() => onSelect(therapist.id)}
      onMouseLeave={() => onSelect('')}
      onClick={() => onSelect(therapist.id)}
    >
      <div className="flex gap-4">
        <img
          src={therapist.photo}
          alt={therapist.name}
          className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover shrink-0 transition-all duration-300 ${
            isSelected ? 'border-2 border-gold shadow-md' : 'border-2 border-gray-200'
          }`}
          loading="lazy"
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-heading font-semibold text-navy text-base leading-tight">
            {therapist.name}
          </h3>
          <p className="text-sm text-gray-500 mt-0.5">
            {therapist.city}, {therapist.province}
            <span className="text-gray-300 mx-1">·</span>
            {therapist.country}
          </p>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {therapist.specialties.slice(0, 3).map((s) => (
              <span
                key={s}
                className="text-[11px] px-2 py-0.5 bg-navy/[0.05] text-navy/70 rounded-full font-medium"
              >
                {s}
              </span>
            ))}
            {therapist.specialties.length > 3 && (
              <span className="text-[11px] px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full">
                +{therapist.specialties.length - 3}
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 mt-2 line-clamp-2 leading-relaxed">
            {therapist.bio}
          </p>
          <Link
            to={`/therapist/${therapist.slug}`}
            className="inline-flex items-center gap-1 text-sm text-gold hover:text-gold-dark font-medium mt-2 transition-colors group"
            onClick={(e) => e.stopPropagation()}
          >
            View Profile
            <svg
              className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
