import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { CONFERENCE_INFO } from '../data/conferenceData';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  showAdminConsole: boolean;
  openStatusLookup: () => void;
  openPrivacyModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, showAdminConsole, openStatusLookup, openPrivacyModal }) => {
  return (
    <footer className="bg-sand-950 text-sand-300 border-t-4 border-maroon-800 pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Organizer */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-maroon-700 to-saffron-600 flex items-center justify-center text-white text-xl font-serif font-bold border border-gold-400">
                🪔
              </div>
              <div>
                <div className="font-display font-extrabold text-lg text-white">
                  IKON <span className="text-saffron-500">2027</span>
                </div>
                <div className="text-[10px] uppercase tracking-wider text-sand-400">
                  PRAKASH 2027 • IKS Conference
                </div>
              </div>
            </div>

            <p className="text-xs text-sand-400 leading-relaxed">
              Official website for the International Conference on Indian Knowledge Systems, organized by the Department of Applied Sciences, Poornima Institute of Engineering & Technology (PIET), Jaipur, Rajasthan.
            </p>

            <div className="text-xs text-saffron-400 font-serif italic">
              ॥ {CONFERENCE_INFO.sanskritMotto} ॥
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button onClick={() => { setActiveTab('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-gold-300 transition">
                  About & NEP 2020 Rationale
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('tracks'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-gold-300 transition">
                  5 Tracks & 35 Sub-Themes
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('schedule'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-gold-300 transition">
                  Programme Schedule (Day 1 & 2)
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('speakers'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-gold-300 transition">
                  Resource Persons & Keynotes
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('committee'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-gold-300 transition">
                  Organizing Committee
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('downloads'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-gold-300 transition">
                  Brochure & CFP Downloads
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Delegate Actions */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">
              Delegate Resources
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button onClick={openStatusLookup} className="text-gold-400 hover:underline font-semibold">
                  Lookup Registration / Paper Status
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('certificates'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-gold-300 transition">
                  Certificates & Awards Policy
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('venue'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-gold-300 transition">
                  Venue, Maps & Accommodation
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-gold-300 transition">
                  FAQ & Convener Contact
                </button>
              </li>
              {showAdminConsole && (
                <li>
                  <button onClick={() => { setActiveTab('admin'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-gold-300 transition">
                    Organizing Committee Console
                  </button>
                </li>
              )}
            </ul>

            <div className="pt-2 text-[11px] text-sand-400 bg-sand-900 p-2.5 rounded-lg border border-sand-800">
              <span className="font-bold text-saffron-400">Notice:</span> No TA/DA shall be provided to any participants per official conference policy.
            </div>
          </div>

          {/* Col 4: Secretariat & Contact */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">
              Secretariat Contact
            </h4>
            <div className="space-y-2 text-xs text-sand-400 leading-relaxed">
              <p>
                <strong>Department of Applied Sciences</strong><br />
                Poornima Institute of Engineering & Technology<br />
                ISI-2, RIICO Institutional Area, Sitapura, Jaipur, Rajasthan 302022
              </p>
              <div className="text-sand-300">
                Email: <span className="text-white font-mono">{CONFERENCE_INFO.contactEmail}</span>
              </div>
              <div className="text-sand-300">
                Phone: <span className="text-white">{CONFERENCE_INFO.contactPhone}</span>
              </div>
              <div className="pt-2 flex items-center space-x-1 text-[11px] text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>NAAC 'A' Accredited Campus</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, DPDP Privacy, and Credits */}
        <div className="pt-8 border-t border-sand-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-sand-500">
          <div>
            © 2026–2027 Poornima Institute of Engineering & Technology (PIET). All Rights Reserved.
          </div>

          <div className="flex items-center space-x-4 text-[11px]">
            <button onClick={openPrivacyModal} className="hover:text-sand-300 underline">
              Privacy Notice & DPDP Compliance
            </button>
            <span>•</span>
            <span className="text-sand-400">
              Developed for Department of Applied Sciences, PIET Jaipur
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
