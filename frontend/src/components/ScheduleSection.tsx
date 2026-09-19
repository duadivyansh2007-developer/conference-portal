import React, { useState } from 'react';
import { 
  Calendar, Clock, MapPin, User, Printer, Globe 
} from 'lucide-react';
import { SCHEDULE_DATA, ScheduleItem } from '../data/conferenceData';

export const ScheduleSection: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<1 | 2>(1);

  const daySchedule = SCHEDULE_DATA.filter(item => item.day === selectedDay);

  const getTypeBadge = (type: ScheduleItem['type']) => {
    switch (type) {
      case 'inaugural':
        return <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Inaugural</span>;
      case 'keynote':
      case 'plenary':
        return <span className="bg-maroon-100 text-maroon-900 border border-maroon-300 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Plenary / Keynote</span>;
      case 'parallel':
        return <span className="bg-blue-50 text-blue-800 border border-blue-200 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Technical Presentations</span>;
      case 'expo':
        return <span className="bg-emerald-100 text-emerald-900 border border-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded uppercase">IKS Expo</span>;
      case 'valedictory':
        return <span className="bg-gold-100 text-gold-900 border border-gold-300 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Valedictory & Awards</span>;
      case 'networking':
      default:
        return <span className="bg-sand-100 text-sand-700 border border-sand-300 text-[10px] font-semibold px-2 py-0.5 rounded">Hospitality / Networking</span>;
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 py-4">
      {/* Header Banner */}
      <div className="bg-white p-8 rounded-3xl border border-sand-300 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 text-xs font-bold text-maroon-700 uppercase tracking-widest bg-maroon-50 px-3 py-1 rounded-full">
            <Calendar className="w-3.5 h-3.5" />
            <span>Academic Programme</span>
          </div>
          <h2 className="text-3xl font-display font-extrabold text-maroon-950">
            Day-Wise Programme Schedule
          </h2>
          <p className="text-xs sm:text-sm text-sand-600">
            2-day comprehensive hybrid schedule featuring keynotes, parallel track presentations, IKS startup demos, and valedictory awards.
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <button
            onClick={handlePrint}
            className="px-4 py-2 text-xs font-bold text-sand-800 bg-sand-100 hover:bg-sand-200 border border-sand-300 rounded-xl transition flex items-center space-x-2"
          >
            <Printer className="w-4 h-4" />
            <span>Print Programme</span>
          </button>
        </div>
      </div>

      {/* Day Selector Tabs */}
      <div className="flex items-center justify-center space-x-3">
        <button
          onClick={() => setSelectedDay(1)}
          className={`px-6 py-3.5 rounded-2xl text-sm font-display font-bold transition flex items-center space-x-3 shadow-sm ${
            selectedDay === 1
              ? 'bg-maroon-900 text-white shadow-royal border-2 border-gold-400'
              : 'bg-white text-sand-700 border border-sand-300 hover:bg-sand-100'
          }`}
        >
          <Calendar className="w-4 h-4 text-gold-400" />
          <div className="text-left">
            <div className="text-xs font-sans font-normal opacity-80">Day 1 • Friday</div>
            <div>26 February 2027</div>
          </div>
        </button>

        <button
          onClick={() => setSelectedDay(2)}
          className={`px-6 py-3.5 rounded-2xl text-sm font-display font-bold transition flex items-center space-x-3 shadow-sm ${
            selectedDay === 2
              ? 'bg-maroon-900 text-white shadow-royal border-2 border-gold-400'
              : 'bg-white text-sand-700 border border-sand-300 hover:bg-sand-100'
          }`}
        >
          <Calendar className="w-4 h-4 text-gold-400" />
          <div className="text-left">
            <div className="text-xs font-sans font-normal opacity-80">Day 2 • Saturday</div>
            <div>27 February 2027</div>
          </div>
        </button>
      </div>

      {/* Timeline Card Stack */}
      <div className="space-y-4 max-w-4xl mx-auto">
        {daySchedule.map((item) => (
          <div
            key={item.id}
            className="bg-white p-5 sm:p-6 rounded-2xl border border-sand-300 hover:border-saffron-400 transition shadow-xs flex flex-col sm:flex-row items-start gap-4 sm:gap-6"
          >
            {/* Time Column */}
            <div className="shrink-0 sm:w-44 flex sm:flex-col items-center sm:items-start justify-between sm:justify-start gap-2 border-b sm:border-b-0 sm:border-r border-sand-200 pb-2 sm:pb-0 sm:pr-4 w-full">
              <div className="flex items-center space-x-1.5 text-xs font-bold text-maroon-800">
                <Clock className="w-4 h-4 text-saffron-600" />
                <span>{item.startTime} – {item.endTime}</span>
              </div>
              <div className="mt-1">{getTypeBadge(item.type)}</div>
            </div>

            {/* Content Column */}
            <div className="flex-1 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-base sm:text-lg font-display font-bold text-maroon-950">
                  {item.title}
                </h3>
                {item.trackCode && (
                  <span className="bg-sand-100 border border-sand-300 text-sand-800 text-[11px] font-mono px-2 py-0.5 rounded">
                    {item.trackCode}
                  </span>
                )}
              </div>

              {item.topic && (
                <p className="text-xs sm:text-sm text-sand-700 font-normal leading-relaxed">
                  {item.topic}
                </p>
              )}

              {/* Speaker and Venue Footer */}
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-medium text-sand-600">
                {item.speaker && (
                  <div className="flex items-center space-x-1.5 text-maroon-900 font-semibold">
                    <User className="w-3.5 h-3.5 text-maroon-700" />
                    <span>{item.speaker}</span>
                  </div>
                )}
                <div className="flex items-center space-x-1 text-sand-500">
                  <MapPin className="w-3.5 h-3.5 text-saffron-600" />
                  <span>{item.venueOrRoom}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Hybrid Note */}
      <div className="max-w-4xl mx-auto bg-sand-100 p-4 rounded-xl border border-sand-300 text-xs text-sand-700 flex items-center space-x-3">
        <Globe className="w-5 h-5 text-saffron-600 shrink-0" />
        <span>
          <strong>Hybrid Session Link:</strong> Registered online delegates will receive high-resolution Zoom / Webex interactive room links and presentation schedules 48 hours prior to the conference.
        </span>
      </div>
    </div>
  );
};
