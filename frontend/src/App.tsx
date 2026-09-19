import React, { useState } from 'react';
import { ConferenceProvider } from './context/ConferenceStore';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { TracksExplorer } from './components/TracksExplorer';
import { ScheduleSection } from './components/ScheduleSection';
import { SpeakersSection } from './components/SpeakersSection';
import { CommitteeSection } from './components/CommitteeSection';
import { RegistrationWizard } from './components/RegistrationWizard';
import { SubmissionWizard } from './components/SubmissionWizard';
import { DownloadsSection } from './components/DownloadsSection';
import { CertificatesPolicy } from './components/CertificatesPolicy';
import { VenueTravel } from './components/VenueTravel';
import { ContactFaq } from './components/ContactFaq';
import { AdminConsole } from './components/AdminConsole';
import { StatusLookupModal } from './components/StatusLookupModal';
import { IksExpoModal } from './components/IksExpoModal';
import { PrivacyModal } from './components/PrivacyModal';
import { Footer } from './components/Footer';
import { TRACKS_DATA, IMPORTANT_DATES } from './data/conferenceData';
import { ArrowRight, Calendar } from 'lucide-react';

function ConferenceApp() {
  const demoAdminEnabled = import.meta.env.VITE_ENABLE_DEMO_ADMIN === 'true';
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [isStatusLookupOpen, setIsStatusLookupOpen] = useState(false);
  const [isExpoOpen, setIsExpoOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  // Pre-selected track for submission
  const [submissionInitialTrack, setSubmissionInitialTrack] = useState<{ trackId: string; subTrackCode: string } | undefined>(undefined);
  const [lookupInitialCode, setLookupInitialCode] = useState<string>('');

  const handleOpenRegistration = () => {
    setIsRegisterOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenSubmission = (trackId?: string, subTrackCode?: string) => {
    if (trackId && subTrackCode) {
      setSubmissionInitialTrack({ trackId, subTrackCode });
    }
    setIsSubmitOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenStatusLookup = (code = '') => {
    setLookupInitialCode(code);
    setIsStatusLookupOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfaf6]">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        showAdminConsole={demoAdminEnabled}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setIsRegisterOpen(false);
          setIsSubmitOpen(false);
        }}
        openRegistration={handleOpenRegistration}
        openSubmission={() => handleOpenSubmission()}
        openStatusLookup={() => handleOpenStatusLookup()}
        openExpoModal={() => setIsExpoOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* MODAL / DEDICATED VIEW: REGISTRATION WIZARD */}
        {isRegisterOpen ? (
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-4 max-w-3xl mx-auto">
              <button
                onClick={() => setIsRegisterOpen(false)}
                className="text-xs font-bold text-sand-600 hover:text-maroon-800 flex items-center space-x-1"
              >
                <span>← Back to Conference Site</span>
              </button>
            </div>
            <RegistrationWizard
              onClose={() => setIsRegisterOpen(false)}
              onViewStatus={(code) => handleOpenStatusLookup(code)}
            />
          </div>
        ) : isSubmitOpen ? (
          /* MODAL / DEDICATED VIEW: SUBMISSION WIZARD */
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-4 max-w-4xl mx-auto">
              <button
                onClick={() => setIsSubmitOpen(false)}
                className="text-xs font-bold text-sand-600 hover:text-maroon-800 flex items-center space-x-1"
              >
                <span>← Back to Conference Site</span>
              </button>
            </div>
            <SubmissionWizard
              initialTrackId={submissionInitialTrack?.trackId}
              initialSubTrackCode={submissionInitialTrack?.subTrackCode}
              onClose={() => setIsSubmitOpen(false)}
              onViewStatus={(code) => handleOpenStatusLookup(code)}
            />
          </div>
        ) : (
          /* TAB ROUTING */
          <>
            {activeTab === 'home' && (
              <>
                <Hero
                  onRegister={handleOpenRegistration}
                  onSubmit={() => handleOpenSubmission()}
                  onExploreTracks={() => {
                    setActiveTab('tracks');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  onDownloadBrochure={() => {
                    setActiveTab('downloads');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />

                {/* Important Dates Strip */}
                <section className="bg-sand-100/80 border-b border-sand-300 py-10">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                    <div className="text-center space-y-1">
                      <div className="inline-flex items-center space-x-1 text-xs font-bold text-maroon-800 uppercase tracking-widest">
                        <Calendar className="w-3.5 h-3.5 text-saffron-600" />
                        <span>Key Milestones & Timeline</span>
                      </div>
                      <h2 className="text-2xl font-display font-bold text-maroon-950">
                        Important Conference Deadlines
                      </h2>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                      {IMPORTANT_DATES.slice(0, 6).map((item) => (
                        <div
                          key={item.id}
                          className={`p-4 rounded-2xl border text-center transition flex flex-col justify-between ${item.highlight
                            ? 'bg-white border-saffron-500 shadow-royal'
                            : 'bg-white/80 border-sand-300'
                            }`}
                        >
                          <div>
                            {item.badge && (
                              <span className="inline-block text-[9px] font-bold uppercase tracking-wider bg-saffron-100 text-saffron-800 px-2 py-0.5 rounded-full mb-1">
                                {item.badge}
                              </span>
                            )}
                            <div className="text-[11px] font-bold text-sand-800 leading-tight">
                              {item.title}
                            </div>
                          </div>
                          <div className="text-xs font-mono font-extrabold text-maroon-900 mt-2">
                            {item.date}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* 5 Core Tracks Teaser Section */}
                <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                  <div className="text-center space-y-2 max-w-3xl mx-auto">
                    <span className="text-xs font-bold uppercase tracking-widest text-saffron-700 bg-saffron-50 px-3 py-1 rounded-full border border-saffron-300">
                      Academic Scope
                    </span>
                    <h2 className="text-3xl font-display font-extrabold text-maroon-950">
                      5 Multidisciplinary Conference Tracks
                    </h2>
                    <p className="text-xs sm:text-sm text-sand-600">
                      Comprising 35 specialized research themes spanning mathematics, metallurgy, ayurveda, civil architecture, Kautilyan statecraft, and Sanskrit computational linguistics.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {TRACKS_DATA.map((t) => (
                      <div
                        key={t.id}
                        className="bg-white p-6 rounded-2xl border border-sand-300 hover:border-saffron-500 transition shadow-xs hover:shadow-royal flex flex-col justify-between group"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="w-8 h-8 rounded-lg bg-maroon-100 text-maroon-900 font-serif font-bold text-xs flex items-center justify-center">
                              T{t.number}
                            </span>
                            <span className="text-[10px] font-mono font-bold text-sand-400">
                              7 Sub-Themes
                            </span>
                          </div>

                          <h3 className="font-display font-bold text-sm text-maroon-950 leading-snug group-hover:text-maroon-800 transition">
                            {t.name}
                          </h3>

                          <p className="text-[11px] text-sand-600 line-clamp-3 leading-relaxed">
                            {t.description}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-sand-200 mt-4">
                          <button
                            onClick={() => {
                              setActiveTab('tracks');
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="text-xs font-bold text-maroon-800 hover:text-saffron-600 flex items-center space-x-1"
                          >
                            <span>Explore Themes</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="text-center pt-2">
                    <button
                      onClick={() => {
                        setActiveTab('tracks');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-6 py-3 text-xs font-bold text-maroon-900 bg-sand-100 hover:bg-sand-200 border border-sand-300 rounded-xl transition"
                    >
                      View All 35 Sub-Tracks & Author Guidelines →
                    </button>
                  </div>
                </section>

                {/* Keynote Speakers Teaser */}
                <section className="bg-sand-50 py-16 border-y border-sand-300">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                      <div className="space-y-2">
                        <span className="text-xs font-bold uppercase tracking-widest text-maroon-700 bg-maroon-50 px-3 py-1 rounded-full border border-maroon-200">
                          Resource Persons
                        </span>
                        <h2 className="text-3xl font-display font-extrabold text-maroon-950">
                          Keynote Experts & Plenary Speakers
                        </h2>
                        <p className="text-xs sm:text-sm text-sand-600">
                          International and national pioneers across history of mathematics, ancient metallurgy, and Ayurveda.
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          setActiveTab('speakers');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="text-xs font-bold text-maroon-800 hover:text-saffron-600 underline shrink-0"
                      >
                        View Full Speaker Profiles →
                      </button>
                    </div>

                    <SpeakersSection />
                  </div>
                </section>

                {/* Call to Register Banner */}
                <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="bg-gradient-to-r from-maroon-900 via-maroon-800 to-saffron-800 text-white rounded-3xl p-8 sm:p-12 shadow-royal-lg flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="space-y-3 max-w-2xl text-center md:text-left">
                      <div className="text-xs uppercase font-bold tracking-widest text-gold-300">
                        Join 100–150 Delegates in Jaipur or Online
                      </div>
                      <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-white">
                        Register for IKON 2027 / PRAKASH 2027
                      </h2>
                      <p className="text-xs sm:text-sm text-sand-200 leading-relaxed">
                        Early registration ensures publication in conference proceedings and entry to the exclusive IKS Startup Expo & cultural dinner.
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
                      <button
                        onClick={handleOpenRegistration}
                        className="px-8 py-4 text-sm font-bold text-maroon-950 bg-white hover:bg-saffron-50 rounded-xl shadow-lg transition transform hover:-translate-y-0.5"
                      >
                        Register as Delegate
                      </button>
                      <button
                        onClick={() => handleOpenSubmission()}
                        className="px-6 py-4 text-sm font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition"
                      >
                        Submit Paper
                      </button>
                    </div>
                  </div>
                </section>
              </>
            )}

            {/* OTHER TABS */}
            {activeTab === 'about' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <AboutSection />
              </div>
            )}

            {activeTab === 'tracks' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <TracksExplorer
                  onSelectTrackForSubmission={(trackId, subTrackCode) => {
                    handleOpenSubmission(trackId, subTrackCode);
                  }}
                />
              </div>
            )}

            {activeTab === 'schedule' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <ScheduleSection />
              </div>
            )}

            {activeTab === 'speakers' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SpeakersSection />
              </div>
            )}

            {activeTab === 'committee' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <CommitteeSection />
              </div>
            )}

            {activeTab === 'downloads' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <DownloadsSection />
              </div>
            )}

            {activeTab === 'certificates' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <CertificatesPolicy />
              </div>
            )}

            {activeTab === 'venue' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <VenueTravel />
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <ContactFaq />
              </div>
            )}

            {activeTab === 'admin' && demoAdminEnabled && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <AdminConsole />
              </div>
            )}
          </>
        )}
      </main>

      {/* Global Modals */}
      <StatusLookupModal
        isOpen={isStatusLookupOpen}
        onClose={() => setIsStatusLookupOpen(false)}
        initialCode={lookupInitialCode}
      />

      <IksExpoModal
        isOpen={isExpoOpen}
        onClose={() => setIsExpoOpen(false)}
      />

      <PrivacyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />

      {/* Footer */}
      <Footer
        showAdminConsole={demoAdminEnabled}
        setActiveTab={(tab) => {
          setActiveTab(tab === 'admin' && !demoAdminEnabled ? 'home' : tab);
          setIsRegisterOpen(false);
          setIsSubmitOpen(false);
        }}
        openStatusLookup={() => handleOpenStatusLookup()}
        openPrivacyModal={() => setIsPrivacyOpen(true)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ConferenceProvider>
      <ConferenceApp />
    </ConferenceProvider>
  );
}
