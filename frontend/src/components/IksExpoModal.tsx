import React, { useState } from 'react';
import { Sparkles, X, CheckCircle, Send } from 'lucide-react';
import { useConference, ExpoApplication } from '../context/ConferenceStore';

interface IksExpoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IksExpoModal: React.FC<IksExpoModalProps> = ({ isOpen, onClose }) => {
  const { addExpoApplication } = useConference();

  const [applicantName, setApplicantName] = useState('');
  const [organization, setOrganization] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState<ExpoApplication['category']>('herbal_products');
  const [description, setDescription] = useState('');
  const [submittedApp, setSubmittedApp] = useState<ExpoApplication | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newApp = addExpoApplication({
      applicantName,
      organization,
      email,
      phone,
      category,
      description
    });
    setSubmittedApp(newApp);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white max-w-2xl w-full rounded-3xl shadow-2xl border border-sand-300 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-maroon-900 to-saffron-800 text-white p-6 flex items-center justify-between border-b border-saffron-400/30">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-xs font-bold text-gold-300 uppercase tracking-widest">
              <Sparkles className="w-4 h-4" />
              <span>Day 2 Innovation Showcase (01:00 PM – 02:30 PM)</span>
            </div>
            <h3 className="font-display font-extrabold text-xl sm:text-2xl">
              IKS Startup & Innovators Expo 2027
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="text-sand-300 hover:text-white p-1 rounded-lg"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Expo Overview */}
          <div className="bg-sand-50 p-4 rounded-2xl border border-sand-200 text-xs text-sand-700 space-y-2">
            <p>
              The <strong>IKS Startup & Grassroots Innovators Expo</strong> invites university incubators, ayurvedic startups, green construction firms, and manuscript digitization developers to exhibit live prototypes to 100–150 national and international delegates and funding bodies.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-semibold text-[11px] text-maroon-900">
              <div className="bg-white p-2 rounded-lg border border-sand-200 text-center">🌿 Herbal & Ayurveda</div>
              <div className="bg-white p-2 rounded-lg border border-sand-200 text-center">🏛️ Green Architecture</div>
              <div className="bg-white p-2 rounded-lg border border-sand-200 text-center">📜 Manuscript AI/OCR</div>
              <div className="bg-white p-2 rounded-lg border border-sand-200 text-center">🎨 Living Handicrafts</div>
            </div>
          </div>

          {!submittedApp ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h4 className="text-sm font-display font-bold text-maroon-950 uppercase tracking-wider">
                Exhibitor Application Form
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-sand-700 mb-1 block">Lead Applicant Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vaidya Rajeshwari Dixit"
                    value={applicantName}
                    onChange={e => setApplicantName(e.target.value)}
                    className="w-full text-xs p-2.5 bg-white border border-sand-300 rounded-lg outline-none focus:ring-2 focus:ring-saffron-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-sand-700 mb-1 block">Startup / Enterprise / Institution *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dhanvantari Bio-Extracts Pvt. Ltd."
                    value={organization}
                    onChange={e => setOrganization(e.target.value)}
                    className="w-full text-xs p-2.5 bg-white border border-sand-300 rounded-lg outline-none focus:ring-2 focus:ring-saffron-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-sand-700 mb-1 block">Official Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="contact@startup.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full text-xs p-2.5 bg-white border border-sand-300 rounded-lg outline-none focus:ring-2 focus:ring-saffron-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-sand-700 mb-1 block">Phone / Mobile *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98290 XXXXX"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full text-xs p-2.5 bg-white border border-sand-300 rounded-lg outline-none focus:ring-2 focus:ring-saffron-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-sand-700 mb-1 block">Showcase Category *</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value as any)}
                    className="w-full text-xs p-2.5 bg-white border border-sand-300 rounded-lg outline-none focus:ring-2 focus:ring-saffron-500"
                  >
                    <option value="herbal_products">Herbal & Ayurvedic Formulations / Wellness Products</option>
                    <option value="green_building">Sustainable Civil Engineering & Green Architecture Materials</option>
                    <option value="manuscript_scanning">Manuscript Scanning, Paleography OCR & Digital Preservation</option>
                    <option value="artisanal_crafts">Traditional Artisanship, Handloom & Heritage Handicrafts</option>
                    <option value="other">Other Indigenous Technology / Vedic Science Innovation</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-sand-700 mb-1 block">
                    Brief Description of Demonstration / Products *
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Describe what prototype or product you intend to exhibit at your kiosk..."
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    className="w-full text-xs p-2.5 bg-white border border-sand-300 rounded-lg outline-none focus:ring-2 focus:ring-saffron-500"
                  ></textarea>
                </div>
              </div>

              <div className="pt-2 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-sand-700 hover:bg-sand-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-bold text-white bg-maroon-800 hover:bg-maroon-900 rounded-xl shadow-royal flex items-center space-x-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Application</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-display font-bold text-maroon-950">
                Exhibitor Application Received!
              </h4>
              <p className="text-xs text-sand-600 max-w-md mx-auto">
                Thank you, <strong>{submittedApp.applicantName}</strong> ({submittedApp.organization}). The Hospitality & Logistics Committee will review kiosk allocations and email your stall allotment details within 5 business days.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2 text-xs font-bold text-white bg-maroon-800 rounded-xl"
              >
                Close Window
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
