import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, Search, Shield, ChevronDown } from 'lucide-react';
import { useConference } from '../context/ConferenceStore';

interface NavbarProps {
  activeTab: string;
  showAdminConsole: boolean;
  setActiveTab: (tab: string) => void;
  openRegistration: () => void;
  openSubmission: () => void;
  openStatusLookup: () => void;
  openExpoModal: () => void;
}

interface NavLinkItem {
  id: string;
  label: string;
  action?: () => void;
  icon?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  showAdminConsole,
  setActiveTab,
  openRegistration,
  openSubmission,
  openStatusLookup,
  openExpoModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const moreDropdownRef = useRef<HTMLDivElement>(null);
  const { announcementText } = useConference();

  const primaryNavLinks: NavLinkItem[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'tracks', label: 'Tracks' },
    { id: 'schedule', label: 'Schedule' },
    { id: 'speakers', label: 'Speakers' },
    { id: 'committee', label: 'Committee' },
  ];

  const moreNavLinks: NavLinkItem[] = [
    { id: 'expo', label: 'IKS Expo', action: openExpoModal, icon: '🎪' },
    { id: 'downloads', label: 'Downloads', icon: '📄' },
    { id: 'certificates', label: 'Certificates & Policies', icon: '📜' },
    { id: 'venue', label: 'Venue & Travel', icon: '📍' },
  ];

  const contactLink: NavLinkItem = { id: 'contact', label: 'Contact' };

  const isMoreActive = moreNavLinks.some(item => item.id === activeTab);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreDropdownRef.current && !moreDropdownRef.current.contains(event.target as Node)) {
        setMoreDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (link: NavLinkItem) => {
    if (link.action) {
      link.action();
    } else {
      setActiveTab(link.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
    setMoreDropdownOpen(false);
  };

  const allNavLinks = [...primaryNavLinks, ...moreNavLinks, contactLink];

  return (
    <header className="sticky top-0 z-40 w-full shadow-md">
      {/* Top Heritage Notice Strip */}
      <div className="bg-maroon-900 text-saffron-100 text-xs px-4 py-2 border-b border-saffron-500/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center space-x-2 font-medium min-w-0 flex-1">
            <span className="bg-saffron-600 text-white font-bold px-2 py-0.5 rounded text-[10px] tracking-wide uppercase shrink-0">
              Notice
            </span>
            <span className="truncate text-[11px] sm:text-xs text-saffron-100/90">{announcementText}</span>
          </div>
          <div className="flex items-center space-x-3 sm:space-x-4 text-[11px] font-medium shrink-0">
            <span className="hidden md:inline text-saffron-300 whitespace-nowrap">
              Department of Applied Sciences, PIET Jaipur
            </span>
            <button
              onClick={openStatusLookup}
              className="flex items-center space-x-1 text-gold-400 hover:text-white transition cursor-pointer whitespace-nowrap"
            >
              <Search className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">Check Status</span>
              <span className="sm:hidden">Status</span>
            </button>
            {showAdminConsole && (
              <button
                onClick={() => setActiveTab('admin')}
                className="flex items-center space-x-1 text-xs text-saffron-200 hover:text-white transition px-2 py-0.5 rounded bg-maroon-800/80 hover:bg-maroon-700 cursor-pointer whitespace-nowrap"
              >
                <Shield className="w-3 h-3 shrink-0" />
                <span>Admin</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="bg-white/95 backdrop-blur-md border-b border-sand-300/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-20 gap-3">

            {/* Logo & Brand Identity */}
            <div
              className="flex items-center space-x-3 cursor-pointer select-none shrink-0"
              onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-maroon-700 to-saffron-600 flex items-center justify-center text-white shadow-royal text-2xl font-serif font-bold border border-gold-400/80 shrink-0">
                🪔
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex items-center space-x-1.5 leading-none">
                  <span className="font-display font-extrabold text-xl lg:text-2xl text-maroon-900 tracking-tight leading-none whitespace-nowrap">
                    IKON <span className="text-saffron-600">2027</span>
                  </span>
                  <span className="text-sand-400 text-xs font-bold select-none leading-none">/</span>
                  <span className="font-display font-semibold text-xs lg:text-sm text-sand-700 tracking-wide leading-none whitespace-nowrap">
                    PRAKASH 2027
                  </span>
                </div>
                <span className="text-[10px] lg:text-[11px] font-semibold tracking-wider text-maroon-700 uppercase whitespace-nowrap leading-none mt-1">
                  PIET Jaipur • Dept. of Applied Sciences
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-0.5 xl:space-x-1 shrink-0">
              {primaryNavLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link)}
                  className={`px-2.5 xl:px-3 py-1.5 rounded-lg text-xs xl:text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${activeTab === link.id
                      ? 'text-maroon-900 bg-sand-200/90 font-bold border-b-2 border-saffron-600'
                      : 'text-sand-900 hover:text-maroon-800 hover:bg-sand-100'
                    }`}
                >
                  {link.label}
                </button>
              ))}

              {/* More Dropdown */}
              <div
                className="relative"
                ref={moreDropdownRef}
                onMouseEnter={() => setMoreDropdownOpen(true)}
                onMouseLeave={() => setMoreDropdownOpen(false)}
              >
                <button
                  onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                  className={`px-2.5 xl:px-3 py-1.5 rounded-lg text-xs xl:text-sm font-medium transition-colors flex items-center space-x-1 whitespace-nowrap cursor-pointer ${isMoreActive
                      ? 'text-maroon-900 bg-sand-200/90 font-bold border-b-2 border-saffron-600'
                      : 'text-sand-900 hover:text-maroon-800 hover:bg-sand-100'
                    }`}
                >
                  <span>More</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${moreDropdownOpen ? 'rotate-180 text-saffron-600' : ''}`} />
                </button>

                {moreDropdownOpen && (
                  <div className="absolute left-0 top-full pt-1 w-56 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                    <div className="bg-white rounded-xl shadow-xl border border-sand-300 py-1.5 overflow-hidden">
                      {moreNavLinks.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => handleNavClick(item)}
                          className={`w-full text-left px-4 py-2.5 text-xs font-medium flex items-center space-x-2.5 transition-colors cursor-pointer ${activeTab === item.id
                              ? 'text-maroon-900 bg-sand-100 font-bold border-l-2 border-saffron-600'
                              : 'text-sand-800 hover:text-maroon-900 hover:bg-sand-50'
                            }`}
                        >
                          <span className="text-sm">{item.icon}</span>
                          <span className="whitespace-nowrap">{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Contact Link */}
              <button
                onClick={() => handleNavClick(contactLink)}
                className={`px-2.5 xl:px-3 py-1.5 rounded-lg text-xs xl:text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${activeTab === contactLink.id
                    ? 'text-maroon-900 bg-sand-200/90 font-bold border-b-2 border-saffron-600'
                    : 'text-sand-900 hover:text-maroon-800 hover:bg-sand-100'
                  }`}
              >
                {contactLink.label}
              </button>
            </div>

            {/* Action CTAs */}
            <div className="hidden lg:flex items-center space-x-2 shrink-0">
              <button
                onClick={openSubmission}
                className="px-3 xl:px-3.5 py-1.5 text-xs font-bold text-maroon-800 bg-saffron-100/80 hover:bg-saffron-200 border border-saffron-400/50 rounded-lg transition shadow-xs whitespace-nowrap cursor-pointer"
              >
                Submit Abstract
              </button>
              <button
                onClick={openRegistration}
                className="px-3.5 xl:px-4 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-maroon-700 to-saffron-600 hover:from-maroon-800 hover:to-saffron-700 rounded-lg shadow-royal hover:shadow-royal-lg transition transform hover:-translate-y-0.5 whitespace-nowrap cursor-pointer"
              >
                Register Now
              </button>
            </div>

            {/* Mobile & Tablet Controls */}
            <div className="flex lg:hidden items-center space-x-2 shrink-0">
              <button
                onClick={openRegistration}
                className="px-3 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-maroon-700 to-saffron-600 rounded-lg shadow-sm whitespace-nowrap cursor-pointer"
              >
                Register
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-sand-800 hover:text-maroon-700 hover:bg-sand-100 focus:outline-none cursor-pointer"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-sand-300 px-4 pt-2 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top duration-200">
            <div className="grid grid-cols-2 gap-1.5 pt-2">
              {allNavLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link)}
                  className={`text-left px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition cursor-pointer ${activeTab === link.id
                      ? 'text-maroon-800 bg-sand-200 font-bold'
                      : 'text-sand-800 hover:text-maroon-700 hover:bg-sand-100'
                    }`}
                >
                  {link.icon && <span className="mr-1.5">{link.icon}</span>}
                  {link.label}
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-sand-200 flex flex-col space-y-2">
              <button
                onClick={() => { openSubmission(); setMobileMenuOpen(false); }}
                className="w-full text-center py-2.5 text-xs sm:text-sm font-bold text-maroon-900 bg-saffron-100 border border-saffron-300 rounded-lg cursor-pointer"
              >
                Submit Abstract / Paper
              </button>
              <button
                onClick={() => { openRegistration(); setMobileMenuOpen(false); }}
                className="w-full text-center py-2.5 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-maroon-700 to-saffron-600 rounded-lg shadow-royal cursor-pointer"
              >
                Register Now (Faculty / Scholar / Foreign)
              </button>
              <div className="flex justify-between items-center pt-2 text-xs text-sand-600">
                <button
                  onClick={() => { openStatusLookup(); setMobileMenuOpen(false); }}
                  className="text-maroon-700 font-semibold underline cursor-pointer"
                >
                  Lookup Status
                </button>
                <button
                  onClick={() => { setActiveTab('admin'); setMobileMenuOpen(false); }}
                  className="text-sand-800 font-semibold cursor-pointer"
                >
                  Admin Console
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
