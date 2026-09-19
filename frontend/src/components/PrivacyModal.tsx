import React from 'react';
import { X, ShieldCheck } from 'lucide-react';
import { CONFERENCE_INFO } from '../data/conferenceData';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white max-w-2xl w-full rounded-3xl shadow-2xl border border-sand-300 overflow-hidden max-h-[85vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        <div className="bg-maroon-900 text-white p-5 flex items-center justify-between border-b border-saffron-500/30 shrink-0">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-gold-400" />
            <h3 className="font-display font-bold text-base">Privacy Notice & DPDP Act 2023 Compliance</h3>
          </div>
          <button onClick={onClose} className="text-sand-300 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4 text-xs text-sand-700 leading-relaxed">
          <p>
            The Department of Applied Sciences, Poornima Institute of Engineering & Technology (PIET), Jaipur, is committed to safeguarding personal data in compliance with India’s <strong>Digital Personal Data Protection (DPDP) Act, 2023</strong> and international data privacy norms.
          </p>

          <div className="space-y-1">
            <h4 className="font-bold text-maroon-900 text-sm">1. Data Collected</h4>
            <p>
              We collect delegate and author information strictly necessary for academic conference administration: Name, Email Address, Phone Number, Institutional Affiliation, Academic Department, Country, Dietary Preferences, and Abstract / Full Paper manuscripts.
            </p>
          </div>

          <div className="space-y-1">
            <h4 className="font-bold text-maroon-900 text-sm">2. Financial & Payment Information Security</h4>
            <p>
              <strong>No payment card numbers, bank credentials, or CVVs are ever received or stored on our servers.</strong> All online payment processing is handled exclusively through PCI-DSS Level 1 certified payment gateways (Razorpay for INR, PayPal/Stripe for USD).
            </p>
          </div>

          <div className="space-y-1">
            <h4 className="font-bold text-maroon-900 text-sm">3. Purpose Limitation</h4>
            <p>
              Your contact details will only be used to:
              (a) Issue official registration codes and payment receipts;
              (b) Transmit peer review decisions and full-paper formatting guidelines;
              (c) Deliver certificate files and conference schedule updates;
              (d) We do NOT sell or license attendee information to third-party commercial marketers.
            </p>
          </div>

          <div className="space-y-1">
            <h4 className="font-bold text-maroon-900 text-sm">4. Data Retention & Erasure Requests</h4>
            <p>
              Per institutional policy, delegate and publication records are archived for a period of 3 years following conference conclusion for statutory audit and indexing purposes. For data deletion inquiries, please contact: <strong className="text-maroon-900">{CONFERENCE_INFO.contactEmail}</strong>.
            </p>
          </div>
        </div>

        <div className="p-4 bg-sand-100 border-t border-sand-200 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold text-white bg-maroon-800 hover:bg-maroon-900 rounded-xl"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
