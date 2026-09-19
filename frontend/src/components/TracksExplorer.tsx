import React, { useState } from 'react';
import { Layers, Search, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import { TRACKS_DATA } from '../data/conferenceData';

interface TracksExplorerProps {
  onSelectTrackForSubmission?: (trackId: string, subTrackCode: string) => void;
}

export const TracksExplorer: React.FC<TracksExplorerProps> = ({ onSelectTrackForSubmission }) => {
  const [selectedTrackTab, setSelectedTrackTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedTracks, setExpandedTracks] = useState<Record<string, boolean>>({
    'track-1': true,
    'track-2': true,
    'track-3': false,
    'track-4': false,
    'track-5': false,
  });

  const toggleTrack = (id: string) => {
    setExpandedTracks(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const expandAll = () => {
    const allExpanded: Record<string, boolean> = {};
    TRACKS_DATA.forEach(t => { allExpanded[t.id] = true; });
    setExpandedTracks(allExpanded);
  };

  const collapseAll = () => {
    const allCollapsed: Record<string, boolean> = {};
    TRACKS_DATA.forEach(t => { allCollapsed[t.id] = false; });
    setExpandedTracks(allCollapsed);
  };

  // Filter logic
  const filteredTracks = TRACKS_DATA.filter(track => {
    if (selectedTrackTab !== 'all' && track.id !== selectedTrackTab) {
      return false;
    }
    if (!searchQuery.trim()) return true;

    const q = searchQuery.toLowerCase();
    const trackMatches = track.name.toLowerCase().includes(q) || track.description.toLowerCase().includes(q);
    const subTrackMatches = track.subTracks.some(st => 
      st.title.toLowerCase().includes(q) || st.code.includes(q)
    );
    return trackMatches || subTrackMatches;
  });

  return (
    <div className="space-y-8 py-4">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-maroon-900 to-maroon-800 text-white p-8 rounded-3xl shadow-royal relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 font-serif text-8xl pointer-events-none select-none">
          पंचस्तम्भ
        </div>
        <div className="max-w-3xl relative z-10 space-y-3">
          <div className="inline-flex items-center space-x-2 text-xs font-bold text-saffron-300 uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full">
            <Layers className="w-3.5 h-3.5" />
            <span>Academic Call for Papers (CFP)</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            5 Interdisciplinary Tracks & 35 Specialized Themes
          </h2>
          <p className="text-sand-200 text-xs sm:text-sm leading-relaxed font-normal">
            Every submission must map directly to one of the 35 sub-themes extracted from the official PIET conference proposal. Submissions undergo single-blind peer review by our Technical & Documentation Committee.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-card p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Track Category Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          <button
            onClick={() => setSelectedTrackTab('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              selectedTrackTab === 'all'
                ? 'bg-maroon-800 text-white shadow-xs'
                : 'bg-sand-100 text-sand-700 hover:bg-sand-200'
            }`}
          >
            All Tracks (5)
          </button>
          {TRACKS_DATA.map(t => (
            <button
              key={t.id}
              onClick={() => setSelectedTrackTab(t.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center space-x-1 ${
                selectedTrackTab === t.id
                  ? 'bg-maroon-800 text-white shadow-xs'
                  : 'bg-sand-100 text-sand-700 hover:bg-sand-200'
              }`}
            >
              <span>Track {t.number}</span>
            </button>
          ))}
        </div>

        {/* Live Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-sand-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search all 35 sub-themes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-sand-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-saffron-500 text-sand-900"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-sand-400 hover:text-sand-700"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Accordion Controls */}
      <div className="flex justify-between items-center px-1 text-xs text-sand-600 font-medium">
        <span>Showing {filteredTracks.length} of {TRACKS_DATA.length} Tracks ({TRACKS_DATA.reduce((acc, t) => acc + t.subTracks.length, 0)} Total Sub-Themes)</span>
        <div className="space-x-3">
          <button onClick={expandAll} className="hover:text-maroon-800 underline">Expand All</button>
          <span>•</span>
          <button onClick={collapseAll} className="hover:text-maroon-800 underline">Collapse All</button>
        </div>
      </div>

      {/* Tracks Accordions */}
      <div className="space-y-6">
        {filteredTracks.map((track) => {
          const isExpanded = expandedTracks[track.id] || searchQuery.trim().length > 0;
          
          return (
            <div 
              key={track.id}
              className="bg-white rounded-2xl border border-sand-300 overflow-hidden shadow-xs hover:border-saffron-400 transition"
            >
              {/* Track Header Strip */}
              <div 
                onClick={() => toggleTrack(track.id)}
                className="p-5 sm:p-6 bg-gradient-to-r from-sand-50 via-white to-sand-50 cursor-pointer flex items-center justify-between border-b border-sand-200 select-none hover:bg-sand-100/60 transition"
              >
                <div className="space-y-1 pr-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="bg-maroon-900 text-white font-serif font-bold text-xs px-2.5 py-0.5 rounded shadow-xs">
                      Track {track.number}
                    </span>
                    {track.sanskritName && (
                      <span className="text-xs font-serif text-maroon-700 font-semibold italic">
                        ॥ {track.sanskritName} ॥
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg sm:text-xl font-display font-extrabold text-maroon-950">
                    {track.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-sand-600 font-normal leading-relaxed max-w-4xl">
                    {track.description}
                  </p>
                </div>

                <div className="shrink-0 pl-2">
                  <div className="w-8 h-8 rounded-full bg-sand-200 text-sand-700 flex items-center justify-center">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>
              </div>

              {/* Sub-Tracks Table */}
              {isExpanded && (
                <div className="divide-y divide-sand-200 bg-sand-50/40">
                  {track.subTracks.map((st) => (
                    <div 
                      key={st.code}
                      className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white transition"
                    >
                      <div className="flex items-start space-x-3">
                        <span className="shrink-0 inline-block bg-saffron-100 border border-saffron-300 text-saffron-900 text-xs font-mono font-bold px-2 py-1 rounded">
                          {st.code}
                        </span>
                        <div>
                          <div className="text-sm font-semibold text-sand-900 font-sans">
                            {st.title}
                          </div>
                          <div className="text-[11px] text-sand-500 mt-0.5">
                            Track {track.number} • Department of Applied Sciences Approved Sub-Theme
                          </div>
                        </div>
                      </div>

                      <div className="shrink-0 flex items-center space-x-2 self-end sm:self-center">
                        <button
                          onClick={() => onSelectTrackForSubmission?.(track.id, st.code)}
                          className="text-xs font-bold text-maroon-800 bg-sand-100 hover:bg-saffron-100 border border-sand-300 hover:border-saffron-400 px-3 py-1.5 rounded-lg transition flex items-center space-x-1"
                        >
                          <span>Submit Paper</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {filteredTracks.length === 0 && (
          <div className="bg-white p-12 text-center rounded-2xl border border-sand-300 text-sand-600">
            <p className="text-base font-semibold">No sub-themes found matching "{searchQuery}"</p>
            <p className="text-xs text-sand-400 mt-1">Try searching for keywords like "Mathematics", "Ayurveda", "Vastu", "Arthashastra", or "Sanskrit".</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedTrackTab('all'); }}
              className="mt-4 px-4 py-2 text-xs font-bold text-maroon-800 bg-sand-100 rounded-lg"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
