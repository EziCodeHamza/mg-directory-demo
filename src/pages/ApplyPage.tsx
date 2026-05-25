import { useState } from 'react';
import { Link } from 'react-router-dom';

const SPECIALTIES = [
  'Post-Mastectomy Massage',
  'Scar Tissue Therapy',
  'Lymphatic Drainage',
  'Oncology Massage',
  'Breast Surgery Recovery',
];

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  businessName: string;
  city: string;
  province: string;
  country: string;
  website: string;
  bio: string;
  specialties: string[];
  isCertified: boolean;
}

export default function ApplyPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    businessName: '',
    city: '',
    province: '',
    country: '',
    website: '',
    bio: '',
    specialties: [],
    isCertified: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): Record<string, string> => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Name is required';
    if (!formData.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = 'Please enter a valid email';
    if (!formData.phone.trim()) errs.phone = 'Phone number is required';
    if (!formData.city.trim()) errs.city = 'City is required';
    if (!formData.province.trim()) errs.province = 'Province/State is required';
    if (!formData.country.trim()) errs.country = 'Country is required';
    if (!formData.bio.trim()) errs.bio = 'A short bio is required';
    if (formData.specialties.length === 0) errs.specialties = 'Please select at least one specialty';
    if (!formData.isCertified) errs.isCertified = 'You must confirm your certification';
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSubmitted(true);
      window.scrollTo(0, 0);
    }
  };

  const updateField = (field: keyof FormData, value: string | boolean | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const toggleSpecialty = (specialty: string) => {
    const updated = formData.specialties.includes(specialty)
      ? formData.specialties.filter((s) => s !== specialty)
      : [...formData.specialties, specialty];
    updateField('specialties', updated);
  };

  // ===== Success State =====
  if (submitted) {
    return (
      <div className="flex-1 bg-cream flex items-center justify-center px-4 py-16">
        <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-sm border border-gray-100 max-w-md text-center">
          <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="font-heading text-2xl font-semibold text-navy">Application Submitted</h2>
          <p className="text-gray-600 mt-4 leading-relaxed">
            Thank you for applying. Our team will review your submission and be in touch within 3-5
            business days.
          </p>
          <Link
            to="/"
            className="inline-block mt-8 bg-gold text-navy px-6 py-3 rounded-lg font-medium hover:bg-gold-light transition-colors"
          >
            Back to Directory
          </Link>
        </div>
      </div>
    );
  }

  // ===== Form =====
  return (
    <div className="flex-1 bg-cream">
      {/* Hero header */}
      <div className="bg-navy relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-4 right-16 w-40 h-40 border border-gold/[0.06] rounded-full" />
          <div className="absolute bottom-[-1rem] left-[-1rem] w-48 h-48 border border-gold/[0.04] rounded-full" />
        </div>
        <div className="relative max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-14 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gold/60 hover:text-gold text-sm mb-6 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Directory
          </Link>
          <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            Apply to Be Listed
          </h1>
          <p className="text-gray-400 mt-3 text-sm sm:text-base">
            Join our directory of certified post-mastectomy massage therapists
          </p>
        </div>
      </div>

      {/* Form body */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-navy mb-1.5">Full Name *</label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => updateField('fullName', e.target.value)}
              className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold font-body text-sm ${
                errors.fullName ? 'border-red-300 bg-red-50/30' : 'border-gray-200'
              }`}
              placeholder="Your full name"
            />
            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">Email Address *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => updateField('email', e.target.value)}
                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold font-body text-sm ${
                  errors.email ? 'border-red-300 bg-red-50/30' : 'border-gray-200'
                }`}
                placeholder="your@email.com"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">Phone Number *</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold font-body text-sm ${
                  errors.phone ? 'border-red-300 bg-red-50/30' : 'border-gray-200'
                }`}
                placeholder="+1 (555) 123-4567"
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>
          </div>

          {/* Business Name */}
          <div>
            <label className="block text-sm font-medium text-navy mb-1.5">
              Business Name <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <input
              type="text"
              value={formData.businessName}
              onChange={(e) => updateField('businessName', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold font-body text-sm"
              placeholder="Your business or clinic name"
            />
          </div>

          {/* Location */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">City *</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => updateField('city', e.target.value)}
                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold font-body text-sm ${
                  errors.city ? 'border-red-300 bg-red-50/30' : 'border-gray-200'
                }`}
                placeholder="City"
              />
              {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">Province / State *</label>
              <input
                type="text"
                value={formData.province}
                onChange={(e) => updateField('province', e.target.value)}
                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold font-body text-sm ${
                  errors.province ? 'border-red-300 bg-red-50/30' : 'border-gray-200'
                }`}
                placeholder="Province or State"
              />
              {errors.province && <p className="text-red-500 text-xs mt-1">{errors.province}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">Country *</label>
              <input
                type="text"
                value={formData.country}
                onChange={(e) => updateField('country', e.target.value)}
                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold font-body text-sm ${
                  errors.country ? 'border-red-300 bg-red-50/30' : 'border-gray-200'
                }`}
                placeholder="Country"
              />
              {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
            </div>
          </div>

          {/* Website */}
          <div>
            <label className="block text-sm font-medium text-navy mb-1.5">
              Website URL <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <input
              type="url"
              value={formData.website}
              onChange={(e) => updateField('website', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold font-body text-sm"
              placeholder="https://yourwebsite.com"
            />
          </div>

          {/* Profile Photo */}
          <div>
            <label className="block text-sm font-medium text-navy mb-1.5">
              Profile Photo <span className="text-gray-400 font-normal">(optional for demo)</span>
            </label>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-cream border-2 border-dashed border-gray-300 flex items-center justify-center shrink-0">
                <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <button
                type="button"
                className="px-4 py-2.5 text-sm border border-gray-200 rounded-lg hover:bg-cream transition-colors font-body text-gray-600"
              >
                Choose Photo
              </button>
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-navy mb-1.5">Short Bio *</label>
            <textarea
              value={formData.bio}
              onChange={(e) => updateField('bio', e.target.value)}
              rows={4}
              className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold font-body text-sm resize-none ${
                errors.bio ? 'border-red-300 bg-red-50/30' : 'border-gray-200'
              }`}
              placeholder="Tell patients about your experience, approach, and what makes your practice special..."
            />
            {errors.bio && <p className="text-red-500 text-xs mt-1">{errors.bio}</p>}
          </div>

          {/* Specialties */}
          <div>
            <label className="block text-sm font-medium text-navy mb-3">Specialties *</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SPECIALTIES.map((specialty) => {
                const isSelected = formData.specialties.includes(specialty);
                return (
                  <button
                    type="button"
                    key={specialty}
                    onClick={() => toggleSpecialty(specialty)}
                    className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-all text-left ${
                      isSelected
                        ? 'border-gold bg-gold/[0.05]'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-cream/50'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-all ${
                        isSelected ? 'bg-gold border-gold' : 'border-gray-300'
                      }`}
                    >
                      {isSelected && (
                        <svg className="w-3 h-3 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className="text-sm text-gray-700">{specialty}</span>
                  </button>
                );
              })}
            </div>
            {errors.specialties && <p className="text-red-500 text-xs mt-1">{errors.specialties}</p>}
          </div>

          {/* Certification Checkbox */}
          <div
            className={`p-4 border rounded-lg transition-colors ${
              errors.isCertified ? 'border-red-300 bg-red-50/30' : 'border-gold/20 bg-gold/[0.03]'
            }`}
          >
            <label className="flex items-start gap-3 cursor-pointer">
              <div className="pt-0.5">
                <input
                  type="checkbox"
                  checked={formData.isCertified}
                  onChange={(e) => updateField('isCertified', e.target.checked)}
                  className="w-5 h-5 rounded border-gray-300 text-gold accent-[#C9A84C]"
                />
              </div>
              <span className="text-sm text-gray-700 leading-relaxed">
                I confirm I am a certified Mastectomy Guide graduate
              </span>
            </label>
            {errors.isCertified && <p className="text-red-500 text-xs mt-1 ml-8">{errors.isCertified}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-gold text-navy py-3.5 rounded-lg font-semibold text-base hover:bg-gold-light transition-colors shadow-sm"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
}
