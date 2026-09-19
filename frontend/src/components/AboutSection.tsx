import React from 'react';
import { Target, Sparkles, Building2, Compass, ShieldCheck } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const objectives = [
    {
      title: 'Disseminating Ancient STEM Foundational Insights',
      desc: 'Exploring the profound scientific, mathematical, and metallurgical traditions of ancient India and contextualizing their global legacy for contemporary technology.'
    },
    {
      title: 'Fostering Rigorous Interdisciplinary Validation',
      desc: 'Encouraging evidence-based experimental, algorithmic, and biomedical validation of classical treatises such as Sushruta Samhita, Aryabhatiya, and Yuktibhasa.'
    },
    {
      title: 'Global Academic & Research Networking',
      desc: 'Bringing together 100–150 eminent international and national delegates, professors, scholars, and industry professionals in hybrid collaborative sessions.'
    },
    {
      title: 'NEP 2020 Curricular Operationalization',
      desc: 'Deliberating actionable roadmaps for engineering colleges and universities to seamlessly integrate IKS modules into STEM degrees per NEP 2020 mandates.'
    },
    {
      title: 'High-Impact Publication Pathways',
      desc: 'Publishing accepted papers in ISBN conference proceedings and facilitating peer-reviewed publication in Scopus / UGC CARE indexed partner journals.'
    },
    {
      title: 'IKS Startup & Grassroots Innovation Showcase',
      desc: 'Providing an exhibition pavilion for startups, organic agriculturalists, herbal pharmacists, and AI manuscript digitizers to present working prototypes.'
    },
    {
      title: 'Recognizing Scholarly Excellence',
      desc: 'Felicitating young researchers and faculty through prestigious "Best Oral Paper" and "Best Research Poster" felicitations with cash commendations.'
    }
  ];

  return (
    <div className="space-y-16 py-8">
      {/* Introduction and Vision */}
      <section className="relative overflow-hidden bg-white p-8 sm:p-12 rounded-3xl border border-sand-300 shadow-sm">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center space-x-2 text-xs font-bold text-saffron-700 uppercase tracking-widest bg-saffron-50 px-3 py-1 rounded-full border border-saffron-300">
            <Sparkles className="w-3.5 h-3.5 text-saffron-600" />
            <span>Vision & Rationale</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-maroon-950 tracking-tight">
            Indian Knowledge Systems: The Ancient Roots of Modern Innovation
          </h2>

          <div className="text-sand-800 space-y-4 text-base sm:text-lg leading-relaxed font-normal">
            <p>
              For millenia, the Indian subcontinent has served as an epicenter of intellectual and scientific discovery. Far from being archaic dogma, Indian Knowledge Systems (IKS) embody an empirical, observational, and deeply interconnected worldview that pioneered foundational principles across mathematics, astronomy, metallurgy, medicine, architecture, and ecology.
            </p>
            <p>
              Centuries prior to Newton and Leibniz, <strong>Madhava of Sangamagrama</strong> and the 14th-century Kerala School of Mathematics formulated infinite series for trigonometric functions and early differential calculus. In surgery, the <strong>Sushruta Samhita</strong> detailed precision surgical instruments, skin-grafting techniques, and rhinoplasty that established plastic surgery. In civil engineering and hydrology, the magnificent <strong>Baoris (stepwells) of Rajasthan</strong> and the cosmic orientations of <strong>Jantar Mantar</strong> demonstrate unmatched mastery over thermodynamics, hydraulics, and celestial mechanics.
            </p>
            <p className="bg-sand-100/70 p-4 rounded-xl border-l-4 border-saffron-600 italic text-maroon-900 font-serif">
              "The International Conference on Indian Knowledge Systems (IKON2027 / PRAKASH 2027) provides an authoritative, peer-reviewed forum where engineers, scientists, Indologists, and historians converge to celebrate, re-evaluate, and translate our scientific heritage into 21st-century technological leadership."
            </p>
          </div>
        </div>
      </section>

      {/* NEP 2020 Integration Focus */}
      <section className="bg-gradient-to-r from-maroon-950 via-maroon-900 to-sand-950 text-white p-8 sm:p-12 rounded-3xl shadow-royal">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center space-x-2 text-xs font-bold text-gold-300 uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full border border-gold-400/30">
            <Compass className="w-3.5 h-3.5 text-gold-400" />
            <span>National Educational Alignment</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-display font-bold text-gold-200">
            Aligned with National Education Policy (NEP 2020)
          </h2>

          <p className="text-sand-200 leading-relaxed text-base sm:text-lg">
            NEP 2020 explicitly highlights the necessity of anchoring modern Indian education in Indian roots, encouraging multidisciplinary curricula that combine scientific rigor with cultural pride. Sections of NEP 2020 mandate that higher education institutions provide credits in Indian Knowledge Systems, promote indigenous languages and scripts, and foster tribal and traditional wisdom.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10">
              <div className="text-gold-400 font-display font-bold text-lg mb-1">Multidisciplinary STEM</div>
              <p className="text-xs text-sand-300">Integrating Vedic mathematics algorithms, Sanskrit NLP computational grammars, and traditional metallurgical case studies into engineering coursework.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10">
              <div className="text-gold-400 font-display font-bold text-lg mb-1">Indigenous Innovation</div>
              <p className="text-xs text-sand-300">Validating grassroots techniques in water conservation, natural farming, and vernacular cooling for sustainable green architecture.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10">
              <div className="text-gold-400 font-display font-bold text-lg mb-1">Pedagogical Frameworks</div>
              <p className="text-xs text-sand-300">Designing standardized textbooks, faculty development programmes (FDP), and laboratory modules endorsed by AICTE and UGC.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7 Conference Objectives */}
      <section className="space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-maroon-700 uppercase tracking-widest bg-maroon-50 px-3 py-1 rounded-full border border-maroon-200">
            <Target className="w-3.5 h-3.5 text-maroon-600" />
            <span>Proposal §4 Mandate</span>
          </div>
          <h2 className="text-3xl font-display font-extrabold text-maroon-950">
            Conference Objectives
          </h2>
          <p className="text-sand-600 text-sm">
            Seven strategic academic goals guiding the deliberations, technical tracks, and post-conference outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
          {objectives.map((obj, idx) => (
            <div 
              key={idx}
              className={`glass-card p-6 rounded-2xl border border-sand-300 hover:border-saffron-500 transition shadow-xs flex items-start space-x-4 ${
                idx === objectives.length - 1 ? 'md:col-span-2 md:max-w-xl md:mx-auto' : ''
              }`}
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-maroon-700 to-saffron-600 text-white font-bold flex items-center justify-center shrink-0 shadow-xs">
                {idx + 1}
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-display font-bold text-maroon-950">
                  {obj.title}
                </h3>
                <p className="text-xs sm:text-sm text-sand-700 leading-relaxed">
                  {obj.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About PIET and Department of Applied Sciences */}
      <section className="bg-white p-8 sm:p-12 rounded-3xl border border-sand-300 shadow-sm">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div className="inline-flex items-center space-x-2 text-xs font-bold text-maroon-700 uppercase tracking-wider bg-maroon-50 px-3 py-1 rounded-full">
              <Building2 className="w-3.5 h-3.5 text-maroon-600" />
              <span>Host Institution</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-maroon-950">
              Poornima Institute of Engineering & Technology (PIET)
            </h3>
            <p className="text-xs sm:text-sm text-sand-700 leading-relaxed">
              Established under the aegis of the Shanti Education Society, PIET Jaipur is one of northern India's premier engineering destinations. Accredited with NAAC 'A' grade and recognized across national NIRF innovation bands, PIET is dedicated to excellence in engineering, artificial intelligence, and applied scientific research.
            </p>
            <div className="flex items-center space-x-4 text-xs font-semibold text-maroon-800 pt-2">
              <span className="flex items-center space-x-1">
                <ShieldCheck className="w-4 h-4 text-saffron-600" />
                <span>NAAC 'A' Accredited</span>
              </span>
              <span className="flex items-center space-x-1">
                <ShieldCheck className="w-4 h-4 text-saffron-600" />
                <span>RTU Affiliated</span>
              </span>
              <span className="flex items-center space-x-1">
                <ShieldCheck className="w-4 h-4 text-saffron-600" />
                <span>AICTE Approved</span>
              </span>
            </div>
          </div>

          <div className="bg-sand-100 p-6 sm:p-8 rounded-2xl border border-sand-200 space-y-3">
            <h4 className="text-lg font-display font-bold text-maroon-900">
              Department of Applied Sciences
            </h4>
            <p className="text-xs sm:text-sm text-sand-700 leading-relaxed">
              The Department of Applied Sciences forms the foundational academic pillar of PIET, imparting rigorous education across Engineering Mathematics, Physics, Chemistry, and Environmental Studies.
            </p>
            <p className="text-xs sm:text-sm text-sand-700 leading-relaxed">
              Under the visionary leadership of Conveners <strong>Dr. Krati Sharma</strong> and <strong>Dr. Neetu Sharma</strong>, the department actively conducts national and international seminars, faculty development workshops, and sponsored research initiatives exploring applied sciences in Indian tradition.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
