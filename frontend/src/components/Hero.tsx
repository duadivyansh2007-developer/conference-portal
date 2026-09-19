import React from 'react';
import { 
  Calendar, MapPin, Sparkles, ArrowRight, Download, 
  FileText, Users, Globe, Layers, Award
} from 'lucide-react';
import { CONFERENCE_INFO, FUNDING_AGENCIES } from '../data/conferenceData';

interface HeroProps {
  onRegister: () => void;
  onSubmit: () => void;
  onExploreTracks: () => void;
  onDownloadBrochure: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onRegister,
  onSubmit,
  onExploreTracks,
  onDownloadBrochure
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#fbf6ec] via-[#fcfaf5] to-white border-b border-sand-300">
      {/* Indic Mandala Subtle Watermark Backing */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035] bg-mandala"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 lg:pt-14 lg:pb-24">
        {/* Sanskrit Invocation Badge */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-saffron-100/90 border border-saffron-400/40 text-maroon-900 text-xs sm:text-sm font-serif shadow-sm">
            <span className="text-saffron-600 font-bold text-base">॥</span>
            <span className="font-semibold tracking-widest">{CONFERENCE_INFO.sanskritMotto}</span>
            <span className="text-saffron-600 font-bold text-base">॥</span>
            <span className="hidden md:inline text-sand-600 text-xs font-sans pl-1">
              — {CONFERENCE_INFO.sanskritMottoMeaning}
            </span>
          </div>

          {/* Organizer Header */}
          <div className="space-y-1">
            <span className="text-xs sm:text-sm uppercase tracking-widest font-bold text-maroon-700">
              Department of Applied Sciences, PIET Jaipur presents
            </span>
            <h2 className="text-sm sm:text-base md:text-lg font-medium text-sand-700 max-w-2xl mx-auto">
              International Conference on Indian Knowledge Systems (IKS)
            </h2>
          </div>

          {/* Main Hero Dual Title */}
          <div className="space-y-3 pt-2">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold text-maroon-950 tracking-tight leading-tight">
              IKON <span className="gold-gradient-text">2027</span>
              <span className="text-sand-400 font-light mx-2 sm:mx-4">/</span>
              <span className="text-3xl sm:text-5xl lg:text-6xl text-sand-800">
                PRAKASH <span className="text-saffron-600">2027</span>
              </span>
            </h1>

            <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-xs sm:text-sm font-serif text-maroon-800 italic">
              <span className="bg-sand-100 px-3 py-1 rounded-md border border-sand-200">
                <strong>IKON:</strong> Indian Knowledge Systems for Outreach & Novelty
              </span>
              <span className="hidden sm:inline text-sand-400">•</span>
              <span className="bg-sand-100 px-3 py-1 rounded-md border border-sand-200">
                <strong>PRAKASH:</strong> Promoting Research, Advancement & Knowledge Systems for Sustainable Heritage
              </span>
            </div>
          </div>

          {/* Tagline */}
          <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-sand-800 font-normal leading-relaxed pt-2">
            Harmonizing centuries of profound scientific, mathematical, medical, and philosophical wisdom from ancient India with cutting-edge 21st-century technological frontiers.
          </p>

          {/* Key Event Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 pt-4 text-xs sm:text-sm font-semibold">
            <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-sand-300 text-maroon-900">
              <Calendar className="w-4 h-4 text-saffron-600" />
              <span>26–27 February 2027</span>
            </div>

            <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-sand-300 text-maroon-900">
              <Globe className="w-4 h-4 text-maroon-700" />
              <span className="bg-saffron-100 text-saffron-800 text-[11px] px-2 py-0.5 rounded font-bold">Hybrid</span>
              <span>In-Person & Online</span>
            </div>

            <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-sand-300 text-maroon-900">
              <MapPin className="w-4 h-4 text-saffron-600" />
              <span>PIET Campus, Sitapura, Jaipur</span>
            </div>

            <div className="flex items-center space-x-2 bg-amber-50 px-3.5 py-2 rounded-xl shadow-sm border border-amber-300 text-amber-900">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>NEP 2020 Aligned</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-6 w-full max-w-md sm:max-w-none">
            <button
              onClick={onRegister}
              className="w-full sm:w-auto px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-maroon-800 via-maroon-700 to-saffron-600 hover:from-maroon-900 hover:to-saffron-700 rounded-xl shadow-royal-lg hover:shadow-2xl transition transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
            >
              <span>Register as Delegate</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={onSubmit}
              className="w-full sm:w-auto px-7 py-4 text-base font-bold text-maroon-900 bg-white hover:bg-saffron-50/80 border-2 border-maroon-800/40 rounded-xl shadow-sm hover:shadow transition flex items-center justify-center space-x-2"
            >
              <FileText className="w-5 h-5 text-maroon-700" />
              <span>Submit Abstract / Paper</span>
            </button>

            <button
              onClick={onDownloadBrochure}
              className="w-full sm:w-auto px-6 py-4 text-sm font-semibold text-sand-800 hover:text-maroon-800 bg-sand-100 hover:bg-sand-200 border border-sand-300 rounded-xl transition flex items-center justify-center space-x-2"
            >
              <Download className="w-4 h-4 text-sand-700" />
              <span>Brochure & Schedule</span>
            </button>
          </div>

          {/* Quick Notice on Deadlines */}
          <div className="pt-2 text-xs text-sand-600">
            <span>⚡ Abstract Deadline: <strong>15 Dec 2026</strong></span>
            <span className="mx-2">•</span>
            <span>Fee Tiers: <strong>Faculty ₹2,000 | Scholar ₹1,000 | Foreign $200</strong></span>
            <span className="mx-2">•</span>
            <span>Presentation Certificates & Best Paper Awards</span>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="mt-14 pt-10 border-t border-sand-300/80 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="glass-card p-5 rounded-2xl text-center hover:border-saffron-400 transition shadow-sm">
            <div className="w-10 h-10 mx-auto rounded-full bg-maroon-100 text-maroon-800 flex items-center justify-center mb-2 font-bold">
              <Users className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-display font-extrabold text-maroon-950">100–150</div>
            <div className="text-xs sm:text-sm font-medium text-sand-600 mt-1">Delegates & Scholars</div>
            <div className="text-[11px] text-sand-500">Foreign & Indian Academicians</div>
          </div>

          <div 
            onClick={onExploreTracks}
            className="glass-card p-5 rounded-2xl text-center hover:border-saffron-400 transition shadow-sm cursor-pointer group"
          >
            <div className="w-10 h-10 mx-auto rounded-full bg-saffron-100 text-saffron-800 flex items-center justify-center mb-2 font-bold group-hover:scale-110 transition">
              <Layers className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-display font-extrabold text-maroon-950">5 Tracks</div>
            <div className="text-xs sm:text-sm font-medium text-sand-600 mt-1">35 Sub-Themes</div>
            <div className="text-[11px] text-saffron-700 font-semibold group-hover:underline">Explore Themes →</div>
          </div>

          <div className="glass-card p-5 rounded-2xl text-center hover:border-saffron-400 transition shadow-sm">
            <div className="w-10 h-10 mx-auto rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mb-2 font-bold">
              <Globe className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-display font-extrabold text-maroon-950">14+</div>
            <div className="text-xs sm:text-sm font-medium text-sand-600 mt-1">Keynote Resource Persons</div>
            <div className="text-[11px] text-sand-500">3–4 Intl + 5–6 National Experts</div>
          </div>

          <div className="glass-card p-5 rounded-2xl text-center hover:border-saffron-400 transition shadow-sm">
            <div className="w-10 h-10 mx-auto rounded-full bg-gold-100 text-gold-800 flex items-center justify-center mb-2 font-bold">
              <Award className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-display font-extrabold text-maroon-950">Hybrid & Expo</div>
            <div className="text-xs sm:text-sm font-medium text-sand-600 mt-1">Startup & Innovators Pavilion</div>
            <div className="text-[11px] text-sand-500">Herbal, Tech & Manuscripts</div>
          </div>
        </div>

        {/* Invited Funding & Partner Agencies Strip */}
        <div className="mt-12 text-center">
          <div className="text-[11px] uppercase tracking-wider font-bold text-sand-500 mb-3">
            With Academic Support & In-Principle Patronage Invited From
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
            {FUNDING_AGENCIES.map((agency) => (
              <div 
                key={agency.name}
                className="bg-white/80 border border-sand-300 px-3.5 py-1.5 rounded-lg shadow-xs flex items-center space-x-2 text-xs font-semibold text-sand-800"
                title={agency.fullName}
              >
                <span className="w-2 h-2 rounded-full bg-saffron-500"></span>
                <span className="font-bold text-maroon-900">{agency.name}</span>
                <span className="hidden sm:inline text-sand-400 text-[10px]">({agency.note})</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
