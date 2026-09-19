import React, { useState } from 'react';
import { Users, MapPin } from 'lucide-react';
import { SPEAKERS_DATA } from '../data/conferenceData';

export const SpeakersSection: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'international' | 'national' | 'internal'>('all');

  const filteredSpeakers = SPEAKERS_DATA.filter(sp => {
    if (selectedFilter === 'all') return true;
    return sp.category === selectedFilter;
  });

  return (
    <div className="space-y-8 py-4">
      {/* Header Banner */}
      <div className="bg-white p-8 rounded-3xl border border-sand-300 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 text-xs font-bold text-maroon-700 uppercase tracking-widest bg-maroon-50 px-3 py-1 rounded-full">
            <Users className="w-3.5 h-3.5" />
            <span>Keynote Resource Persons</span>
          </div>
          <h2 className="text-3xl font-display font-extrabold text-maroon-950">
            Eminent Speakers & Resource Persons
          </h2>
          <p className="text-xs sm:text-sm text-sand-600">
            Featuring distinguished international thinkers, national awardees, and IKS pioneering scholars delivering plenary keynotes and presiding over technical tracks.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 shrink-0 bg-sand-100 p-1.5 rounded-xl border border-sand-200">
          {(['all', 'international', 'national', 'internal'] as const).map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition capitalize ${
                selectedFilter === cat
                  ? 'bg-maroon-800 text-white shadow-xs'
                  : 'text-sand-700 hover:text-maroon-800'
              }`}
            >
              {cat === 'all' ? 'All Speakers (6)' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Speakers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSpeakers.map((speaker) => (
          <div
            key={speaker.id}
            className="bg-white rounded-2xl border border-sand-300 hover:border-saffron-400 transition shadow-xs overflow-hidden flex flex-col justify-between"
          >
            <div className="p-6 space-y-4">
              {/* Top Row: Avatar & Status Badge */}
              <div className="flex items-start justify-between gap-3">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-maroon-800 to-saffron-600 flex items-center justify-center text-white font-serif font-bold text-xl shadow-royal shrink-0 border-2 border-gold-400">
                  {speaker.name.replace('Prof. ', '').replace('Dr. ', '').charAt(0)}
                </div>

                <div className="text-right space-y-1">
                  <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    speaker.status === 'confirmed'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                      : 'bg-amber-50 text-amber-800 border-amber-300'
                  }`}>
                    {speaker.status === 'confirmed' ? '✓ Confirmed Keynote' : '⏳ Invited Expert'}
                  </span>
                  <div className="text-[10px] uppercase tracking-wider font-semibold text-sand-500">
                    {speaker.category}
                  </div>
                </div>
              </div>

              {/* Speaker Details */}
              <div className="space-y-1">
                <h3 className="text-lg font-display font-bold text-maroon-950 leading-snug">
                  {speaker.name}
                </h3>
                <div className="text-xs font-medium text-maroon-700">
                  {speaker.affiliation}
                </div>
                <div className="flex items-center space-x-1 text-[11px] text-sand-500">
                  <MapPin className="w-3 h-3 text-saffron-600" />
                  <span>{speaker.countryOrCity}</span>
                </div>
              </div>

              {/* Topic */}
              <div className="bg-sand-50 p-3.5 rounded-xl border border-sand-200/80 space-y-1">
                <div className="text-[10px] uppercase font-bold tracking-wider text-saffron-700">
                  Keynote Plenary Topic
                </div>
                <div className="text-xs font-semibold text-sand-900 leading-snug">
                  "{speaker.topic}"
                </div>
              </div>

              {/* Bio snippet */}
              <p className="text-xs text-sand-600 leading-relaxed font-normal">
                {speaker.bio}
              </p>
            </div>

            <div className="bg-sand-100/60 px-6 py-3 border-t border-sand-200 text-[11px] text-sand-600 font-medium flex items-center justify-between">
              <span>{speaker.session}</span>
              <span className="text-maroon-800 font-bold">Swami Vivekananda Hall</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
