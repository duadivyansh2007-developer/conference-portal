import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { FAQS, CONFERENCE_INFO } from '../data/conferenceData';

export const ContactFaq: React.FC = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  const toggleFaq = (index: number) => {
    setExpandedFaq(prev => prev === index ? null : index);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSentSuccess(true);
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
  };

  return (
    <div className="space-y-12 py-4">
      {/* Header Banner */}
      <div className="bg-white p-8 rounded-3xl border border-sand-300 shadow-sm max-w-4xl mx-auto text-center space-y-3">
        <div className="inline-flex items-center space-x-2 text-xs font-bold text-maroon-700 uppercase tracking-widest bg-maroon-50 px-3 py-1 rounded-full">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Support & Helpdesk</span>
        </div>
        <h2 className="text-3xl font-display font-extrabold text-maroon-950">
          Frequently Asked Questions & Contact
        </h2>
        <p className="text-xs sm:text-sm text-sand-600 max-w-2xl mx-auto">
          Need assistance with registration, abstract review status, or hybrid presentation connectivity? Connect directly with the Organizing Secretaries.
        </p>
      </div>

      {/* FAQ Accordions */}
      <div className="max-w-4xl mx-auto space-y-3">
        <h3 className="font-display font-bold text-xl text-maroon-950 mb-4 text-center">
          Frequently Asked Questions (FAQs)
        </h3>

        {FAQS.map((faq, idx) => {
          const isOpen = expandedFaq === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-sand-300 overflow-hidden shadow-xs"
            >
              <div
                onClick={() => toggleFaq(idx)}
                className="p-5 cursor-pointer flex items-center justify-between hover:bg-sand-50 transition select-none"
              >
                <div className="font-display font-bold text-sm text-maroon-950 pr-4">
                  {faq.q}
                </div>
                <div className="shrink-0 text-sand-500">
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </div>

              {isOpen && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-sand-700 leading-relaxed border-t border-sand-200/80 pt-3 bg-sand-50/40">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Contact Form and Details Grid */}
      <div className="max-w-5xl mx-auto bg-white rounded-3xl border border-sand-300 shadow-royal overflow-hidden grid grid-cols-1 md:grid-cols-12">
        {/* Left Side: Contact Information */}
        <div className="md:col-span-5 bg-gradient-to-br from-maroon-950 to-maroon-900 text-white p-8 space-y-6">
          <div className="space-y-2">
            <h4 className="text-xl font-display font-bold text-gold-300">
              Organizing Secretariat
            </h4>
            <p className="text-xs text-sand-300 leading-relaxed">
              Department of Applied Sciences, Poornima Institute of Engineering & Technology (PIET).
            </p>
          </div>

          <div className="space-y-4 text-xs text-sand-200">
            <div className="space-y-1">
              <div className="font-bold text-saffron-300 uppercase tracking-wider text-[10px]">Conference Conveners</div>
              <div className="font-semibold text-white">Dr. Krati Sharma & Dr. Neetu Sharma</div>
              <div className="text-[11px] text-sand-400">Associate Professors, Dept. of Applied Sciences</div>
            </div>

            <div className="flex items-start space-x-3 pt-2">
              <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
              <div>
                ISI-2, RIICO Institutional Area, Sitapura, Jaipur, Rajasthan 302022, India
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Mail className="w-4 h-4 text-gold-400 shrink-0" />
              <span>{CONFERENCE_INFO.contactEmail}</span>
            </div>

            <div className="flex items-center space-x-3">
              <Phone className="w-4 h-4 text-gold-400 shrink-0" />
              <span>{CONFERENCE_INFO.contactPhone}</span>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 text-[11px] text-sand-400 italic">
            Technical & Documentation Helpdesk operates Monday through Saturday (09:00 AM – 05:00 PM IST).
          </div>
        </div>

        {/* Right Side: Message Submission Form */}
        <div className="md:col-span-7 p-8">
          {sentSuccess ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-display font-bold text-maroon-950">
                Message Sent Successfully!
              </h4>
              <p className="text-xs text-sand-600 max-w-sm mx-auto">
                Thank you for contacting the IKON2027 secretariat. One of our conveners will reply to your registered email shortly.
              </p>
              <button
                onClick={() => setSentSuccess(false)}
                className="px-4 py-2 text-xs font-bold text-maroon-800 bg-sand-100 rounded-lg hover:bg-sand-200"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h4 className="font-display font-bold text-lg text-maroon-950">
                Send an Inquiry to Conveners
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-sand-700 mb-1 block">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Prof. / Dr. / Scholar Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full text-xs p-2.5 bg-sand-50 border border-sand-300 rounded-lg outline-none focus:ring-2 focus:ring-saffron-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-sand-700 mb-1 block">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="your.email@university.edu"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full text-xs p-2.5 bg-sand-50 border border-sand-300 rounded-lg outline-none focus:ring-2 focus:ring-saffron-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-sand-700 mb-1 block">Subject / Query Topic *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Inquiry regarding Track 2 presentation mode or offline fee receipt"
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  className="w-full text-xs p-2.5 bg-sand-50 border border-sand-300 rounded-lg outline-none focus:ring-2 focus:ring-saffron-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-sand-700 mb-1 block">Message Body *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Write your detailed inquiry here..."
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  className="w-full text-xs p-2.5 bg-sand-50 border border-sand-300 rounded-lg outline-none focus:ring-2 focus:ring-saffron-500"
                ></textarea>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-bold text-white bg-maroon-800 hover:bg-maroon-900 rounded-xl shadow-royal flex items-center space-x-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message to Secretariat</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
