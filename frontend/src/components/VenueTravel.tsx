import React from 'react';
import { MapPin, Navigation, Plane, Train, Building, ExternalLink, Phone, Mail } from 'lucide-react';
import { CONFERENCE_INFO } from '../data/conferenceData';

export const VenueTravel: React.FC = () => {
  return (
    <div className="space-y-10 py-4">
      {/* Header Banner */}
      <div className="bg-white p-8 rounded-3xl border border-sand-300 shadow-sm max-w-4xl mx-auto text-center space-y-3">
        <div className="inline-flex items-center space-x-2 text-xs font-bold text-maroon-700 uppercase tracking-widest bg-maroon-50 px-3 py-1 rounded-full">
          <MapPin className="w-3.5 h-3.5" />
          <span>Pink City of Jaipur</span>
        </div>
        <h2 className="text-3xl font-display font-extrabold text-maroon-950">
          Venue, Map & Travel Guide
        </h2>
        <p className="text-xs sm:text-sm text-sand-600 max-w-2xl mx-auto">
          Held in the historic royal city of Jaipur, home to UNESCO World Heritage site Jantar Mantar and exquisite Rajput-Mughal architectural wonders.
        </p>
      </div>

      {/* Main Venue Card */}
      <div className="bg-white p-8 rounded-3xl border border-sand-300 shadow-royal max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <div className="inline-flex items-center space-x-2 text-xs font-bold text-saffron-700 uppercase tracking-wider bg-saffron-50 px-3 py-1 rounded-full">
            <span>Conference Location</span>
          </div>

          <h3 className="text-2xl font-display font-bold text-maroon-950 leading-snug">
            Poornima Institute of Engineering & Technology (PIET)
          </h3>

          <div className="text-xs sm:text-sm text-sand-700 space-y-2 leading-relaxed">
            <p className="font-semibold text-maroon-900">
              Department of Applied Sciences, PIET
            </p>
            <p>
              ISI-2, RIICO Institutional Area, Sitapura, Jaipur, Rajasthan 302022, India.
            </p>
            <p className="text-sand-600 text-xs">
              Primary Sessions held in Swami Vivekananda Central Auditorium and Seminar Halls A & B.
            </p>
          </div>

          <div className="pt-2 flex flex-col space-y-2 text-xs text-sand-700">
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-saffron-600" />
              <span>{CONFERENCE_INFO.contactEmail}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-saffron-600" />
              <span>{CONFERENCE_INFO.contactPhone}</span>
            </div>
          </div>

          <div className="pt-2">
            <a
              href="https://maps.google.com/?q=Poornima+Institute+of+Engineering+and+Technology+Jaipur"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-2 px-5 py-2.5 text-xs font-bold text-white bg-maroon-800 hover:bg-maroon-900 rounded-xl shadow-royal transition"
            >
              <Navigation className="w-4 h-4" />
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 ml-1" />
            </a>
          </div>
        </div>

        {/* Stylized Jaipur / Campus Map Card */}
        <div className="bg-sand-100 p-6 rounded-2xl border border-sand-300 text-center space-y-4 relative overflow-hidden">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-maroon-800 to-saffron-600 text-white flex items-center justify-center mx-auto text-2xl shadow-sm">
            🏰
          </div>
          <div className="space-y-1">
            <h4 className="font-display font-bold text-maroon-950 text-base">Jaipur: The Cultural Capital</h4>
            <p className="text-xs text-sand-600">
              February offers ideal weather in Jaipur (pleasant 22°C daytime temperatures), perfect for visiting Jantar Mantar (astronomy), Amer Fort, and Hawa Mahal.
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-sand-200 text-xs text-left space-y-1.5 text-sand-800">
            <div className="font-bold text-maroon-900 text-[11px] uppercase">Campus Facilities for Delegates:</div>
            <div>• High-speed Wi-Fi & AV Recording in all halls</div>
            <div>• Dining Pavilion serving traditional Rajasthani Cuisine</div>
            <div>• Free parking & on-campus security surveillance</div>
          </div>
        </div>
      </div>

      {/* Connectivity Grid */}
      <div className="max-w-5xl mx-auto space-y-4">
        <h3 className="text-center font-display font-bold text-xl text-maroon-950">
          Reaching the PIET Campus
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-sand-300 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <Plane className="w-5 h-5" />
            </div>
            <h4 className="font-display font-bold text-sm text-maroon-950">By Air</h4>
            <div className="text-xs font-bold text-saffron-700">Jaipur International Airport (JAI)</div>
            <p className="text-xs text-sand-600">
              Approx. 12 km (20 mins drive). Pre-paid app taxis (Ola, Uber) and airport cabs are readily available directly to Sitapura.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-sand-300 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Train className="w-5 h-5" />
            </div>
            <h4 className="font-display font-bold text-sm text-maroon-950">By Train</h4>
            <div className="text-xs font-bold text-saffron-700">Jaipur Junction (JP) & Gandhinagar (GADJ)</div>
            <p className="text-xs text-sand-600">
              Jaipur Junction: ~18 km. Gandhinagar Station: ~14 km. Well connected via Shatabdi, Vande Bharat, and Rajdhani Express trains.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-sand-300 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Building className="w-5 h-5" />
            </div>
            <h4 className="font-display font-bold text-sm text-maroon-950">Accommodation</h4>
            <div className="text-xs font-bold text-saffron-700">Sitapura & Tonk Road Hotels</div>
            <p className="text-xs text-sand-600">
              Partner hotels within 3–5 km radius with special academic rates: Crowne Plaza Sitapura, Chokhi Dhani Resort, and Hotel Royal Orchid.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
