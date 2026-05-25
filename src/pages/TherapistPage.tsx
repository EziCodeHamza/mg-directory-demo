import { useParams, Link } from 'react-router-dom';
import therapistsData from '@/data/therapists.json';
import type { Therapist } from '@/types';
import MapView from '@/components/MapView';
import { useEffect, useState } from 'react';

export default function TherapistPage() {
  const { slug } = useParams<{ slug: string }>();
  const [therapist, setTherapist] = useState<Therapist | undefined>(undefined);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const found = (therapistsData as Therapist[]).find((t) => t.slug === slug);
    setTherapist(found);
    setLoaded(true);
    window.scrollTo(0, 0);
  }, [slug]);

  if (!loaded) {
    return (
      <div className="flex-1 bg-cream flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-gray-400 mt-3">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!therapist) {
    return (
      <div className="flex-1 bg-cream flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-navy/5 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="font-heading text-2xl text-navy">Therapist Not Found</h2>
          <p className="text-gray-400 mt-2 text-sm">
            The therapist you&apos;re looking for doesn&apos;t exist in our directory.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gold hover:text-gold-dark mt-6 font-medium transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Directory
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-cream">
      {/* ===== Hero Section ===== */}
      <div className="bg-navy relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-8 left-8 w-48 h-48 border border-gold/[0.08] rounded-full" />
          <div className="absolute bottom-[-2rem] right-[-2rem] w-72 h-72 border border-gold/[0.05] rounded-full" />
          <div className="absolute top-1/2 left-1/3 w-32 h-32 border border-gold/[0.04] rounded-full" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
          {/* Back link */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gold/60 hover:text-gold text-sm mb-8 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Directory
          </Link>

          {/* Profile header */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
            <img
              src={therapist.photo}
              alt={therapist.name}
              className="w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover border-4 border-gold shadow-xl shrink-0"
            />
            <div className="text-center sm:text-left">
              <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
                {therapist.name}
              </h1>
              <p className="text-gold text-base sm:text-lg mt-2">
                {therapist.city}, {therapist.province}
                <span className="text-gold/50 mx-1.5">·</span>
                {therapist.country}
              </p>
              <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-4">
                {therapist.specialties.map((s) => (
                  <span
                    key={s}
                    className="text-xs sm:text-sm px-3 py-1 bg-gold/[0.08] text-gold border border-gold/[0.15] rounded-full"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-6">
                <a
                  href={`mailto:${therapist.email}`}
                  className="inline-flex items-center gap-2 bg-gold text-navy px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gold-light transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Contact
                </a>
                {therapist.website && (
                  <a
                    href={therapist.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white/10 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-white/20 transition-colors border border-white/10"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                    Website
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Content ===== */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-6 sm:space-y-8">
        {/* Bio */}
        <section className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-gray-100">
          <h2 className="font-heading text-xl font-semibold text-navy mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-gold rounded-full" />
            About
          </h2>
          <p className="text-gray-600 leading-relaxed text-[15px]">{therapist.bio}</p>
        </section>

        {/* Specialties */}
        <section className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-gray-100">
          <h2 className="font-heading text-xl font-semibold text-navy mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-gold rounded-full" />
            Specialties
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {therapist.specialties.map((s) => (
              <div key={s} className="flex items-center gap-3 p-3 bg-cream/60 rounded-lg">
                <div className="w-8 h-8 bg-gold/10 rounded-full flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm text-navy/80 font-medium">{s}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Location */}
        <section className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
          <div className="p-6 sm:p-8 pb-4">
            <h2 className="font-heading text-xl font-semibold text-navy flex items-center gap-2">
              <span className="w-1 h-6 bg-gold rounded-full" />
              Location
            </h2>
            <p className="text-gray-500 mt-1 text-sm">
              {therapist.city}, {therapist.province}, {therapist.country}
            </p>
          </div>
          <div className="h-56 sm:h-72">
            <MapView
              therapists={[therapist]}
              selectedTherapist={therapist.id}
              onSelectTherapist={() => {}}
            />
          </div>
        </section>

        {/* Back button */}
        <div className="text-center pt-4 pb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-navy text-white px-6 py-3 rounded-lg font-medium hover:bg-navy-light transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Directory
          </Link>
        </div>
      </div>
    </div>
  );
}
