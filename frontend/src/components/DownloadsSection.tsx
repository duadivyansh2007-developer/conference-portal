import React from 'react';
import { Download, FileText } from 'lucide-react';

export const DownloadsSection: React.FC = () => {
  const downloads = [
    {
      title: 'Official Conference Information Brochure',
      filename: 'IKON2027_Official_Brochure_PIET.pdf',
      size: '2.4 MB',
      description: 'Comprehensive 8-page full color brochure outlining conference scope, patron messages, PIET campus profile, keynote speakers, and registration details.',
      tag: 'Primary Brochure'
    },
    {
      title: 'Call for Papers (CFP) Document',
      filename: 'IKON2027_Call_For_Papers_CFP.pdf',
      size: '1.1 MB',
      description: 'Detailed author guidelines, 5 tracks and 35 sub-tracks classification, 300-word structured abstract format, indexing information, and important submission milestones.',
      tag: 'For Authors'
    },
    {
      title: 'Day-Wise Detailed Programme Schedule',
      filename: 'IKON2027_Programme_Schedule.pdf',
      size: '850 KB',
      description: 'Session-by-session timetable covering Day 1 Inaugural, Plenaries, parallel breakout halls, IKS Startup Expo showcase, and Valedictory distribution.',
      tag: 'Schedule'
    },
    {
      title: 'Offline Bank Transfer Proforma & Wire Guide',
      filename: 'PIET_IKS2027_Bank_Wire_Details.pdf',
      size: '420 KB',
      description: 'Account number, Bank of India IFSC code, SWIFT coordinates for foreign wire remittances, and step-by-step UTR reporting instructions.',
      tag: 'Payment Guide'
    }
  ];

  return (
    <div className="space-y-8 py-4">
      {/* Header Banner */}
      <div className="bg-white p-8 rounded-3xl border border-sand-300 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 text-xs font-bold text-maroon-700 uppercase tracking-widest bg-maroon-50 px-3 py-1 rounded-full">
            <Download className="w-3.5 h-3.5" />
            <span>Official Publications</span>
          </div>
          <h2 className="text-3xl font-display font-extrabold text-maroon-950">
            Downloads & Conference Resources
          </h2>
          <p className="text-xs sm:text-sm text-sand-600">
            Download verified brochures, author CFP guidelines, programme schedule sheets, and official bank wiring proformas.
          </p>
        </div>
      </div>

      {/* Downloads Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {downloads.map((item, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-2xl border border-sand-300 hover:border-saffron-400 transition shadow-xs flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-saffron-100 text-saffron-800 px-2.5 py-0.5 rounded-full">
                  {item.tag}
                </span>
                <span className="text-xs font-mono font-medium text-sand-500">
                  {item.size}
                </span>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-xl bg-maroon-50 text-maroon-800 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-display font-bold text-maroon-950 leading-snug">
                    {item.title}
                  </h3>
                  <div className="text-[11px] font-mono text-sand-500 mt-0.5">{item.filename}</div>
                </div>
              </div>

              <p className="text-xs text-sand-600 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="pt-3 border-t border-sand-200 flex items-center justify-between">
              <span className="text-[11px] text-sand-500 font-semibold">
                Official file pending publication
              </span>
              <button
                type="button"
                disabled
                className="px-4 py-2 text-xs font-bold text-sand-400 bg-sand-100 rounded-xl cursor-not-allowed flex items-center space-x-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unavailable</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
