import React, { useState } from 'react';
import { Award } from 'lucide-react';

export const CertificatesPolicy: React.FC = () => {
  const [previewName, setPreviewName] = useState('Dr. Anandvardhan Sharma');
  const [previewRole, setPreviewRole] = useState<'presentation' | 'participation'>('presentation');

  return (
    <div className="space-y-10 py-4">
      {/* Header Banner */}
      <div className="bg-white p-8 rounded-3xl border border-sand-300 shadow-sm max-w-4xl mx-auto text-center space-y-3">
        <div className="inline-flex items-center space-x-2 text-xs font-bold text-maroon-700 uppercase tracking-widest bg-maroon-50 px-3 py-1 rounded-full">
          <Award className="w-3.5 h-3.5" />
          <span>Certification & Academic Felicitations</span>
        </div>
        <h2 className="text-3xl font-display font-extrabold text-maroon-950">
          Certificates & Awards Framework
        </h2>
        <p className="text-xs sm:text-sm text-sand-600 max-w-2xl mx-auto">
          Official institutional recognition issued jointly under the seal of the Department of Applied Sciences, Poornima Institute of Engineering & Technology (PIET), Jaipur.
        </p>
      </div>

      {/* Policy Details Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <div className="bg-white p-6 rounded-2xl border border-sand-300 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-maroon-100 text-maroon-800 flex items-center justify-center font-bold">
            1
          </div>
          <h3 className="font-display font-bold text-lg text-maroon-950">Certificate of Participation</h3>
          <p className="text-xs text-sand-600 leading-relaxed">
            Issued to all registered Indian and foreign delegates (Faculty, Scholars, and Students) who complete payment and attend at least 75% of plenary and parallel technical sessions. Available for instant digital download via your registration code.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-sand-300 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-saffron-100 text-saffron-800 flex items-center justify-center font-bold">
            2
          </div>
          <h3 className="font-display font-bold text-lg text-maroon-950">Certificate of Presentation</h3>
          <p className="text-xs text-sand-600 leading-relaxed">
            Awarded exclusively to the designated presenting author who delivers the approved oral research paper or mounts their poster in the designated parallel track. Features title, track code, and ISBN proceedings reference.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-sand-300 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-gold-100 text-gold-800 flex items-center justify-center font-bold">
            3
          </div>
          <h3 className="font-display font-bold text-lg text-maroon-950">Best Paper & Poster Awards</h3>
          <p className="text-xs text-sand-600 leading-relaxed">
            Jury-evaluated awards across all 5 tracks recognizing methodological rigor, originality, and impact on contemporary STEM. Presented with official framed citations and cash honoraria during the Valedictory Ceremony.
          </p>
        </div>
      </div>

      {/* Interactive Certificate Preview Tool */}
      <div className="bg-white p-8 rounded-3xl border border-sand-300 shadow-royal max-w-4xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sand-200 pb-4">
          <div>
            <h3 className="text-xl font-display font-bold text-maroon-950">
              Interactive Certificate Preview
            </h3>
            <p className="text-xs text-sand-500">
              Test how your official verified digital certificate will appear upon completion.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={previewName}
              onChange={e => setPreviewName(e.target.value)}
              placeholder="Enter your name"
              className="text-xs p-2 border border-sand-300 rounded-lg outline-none w-48 font-semibold"
            />
            <select
              value={previewRole}
              onChange={e => setPreviewRole(e.target.value as any)}
              className="text-xs p-2 border border-sand-300 rounded-lg outline-none"
            >
              <option value="presentation">Presentation</option>
              <option value="participation">Participation</option>
            </select>
          </div>
        </div>

        {/* Certificate Frame Mockup */}
        <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-br from-[#fcf9f2] via-white to-[#faf5e8] border-8 border-double border-maroon-900 shadow-md text-center space-y-6 relative overflow-hidden">
          {/* Inner Golden Border */}
          <div className="absolute inset-2 border border-gold-500/40 pointer-events-none rounded-sm"></div>

          <div className="space-y-1">
            <div className="text-2xl">🪔</div>
            <div className="text-xs font-serif uppercase tracking-widest text-maroon-800 font-bold">
              Poornima Institute of Engineering & Technology, Jaipur
            </div>
            <div className="text-[10px] uppercase tracking-wider text-sand-500 font-sans">
              Department of Applied Sciences
            </div>
          </div>

          <div className="space-y-1">
            <h4 className="text-2xl sm:text-3xl font-display font-bold text-maroon-950 uppercase tracking-wider">
              Certificate of {previewRole === 'presentation' ? 'Presentation' : 'Participation'}
            </h4>
            <div className="text-xs text-sand-600 italic font-serif">
              International Conference on Indian Knowledge Systems (IKON2027 / PRAKASH 2027)
            </div>
          </div>

          <div className="space-y-2 max-w-lg mx-auto text-xs sm:text-sm text-sand-800 font-serif leading-relaxed">
            <p>This is to certify that</p>
            <div className="text-xl sm:text-2xl font-display font-extrabold text-maroon-900 border-b border-sand-300 pb-1 max-w-xs mx-auto">
              {previewName || 'Delegate Name'}
            </div>
            <p>
              has successfully {previewRole === 'presentation' ? 'presented an original research paper titled "Madhava’s Infinite Series for Sine and Cosine: A Comparative Algorithmic Analysis" in Track 1' : 'participated as a registered delegate'} during the 2-day hybrid conference held on 26–27 February 2027 at PIET Campus, Jaipur.
            </p>
          </div>

          <div className="pt-6 grid grid-cols-3 gap-4 text-center border-t border-sand-300/80 text-[11px] font-sans text-sand-700">
            <div>
              <div className="font-serif italic font-bold text-maroon-900 text-xs">Dr. Krati Sharma</div>
              <div className="text-[10px] text-sand-500">Convener, PIET</div>
            </div>
            <div>
              <div className="font-serif italic font-bold text-maroon-900 text-xs">Dr. Neetu Sharma</div>
              <div className="text-[10px] text-sand-500">Convener, PIET</div>
            </div>
            <div>
              <div className="font-serif italic font-bold text-maroon-900 text-xs">Dr. Gautam Singh</div>
              <div className="text-[10px] text-sand-500">Director, PIET</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
