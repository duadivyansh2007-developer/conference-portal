import React, { useState } from 'react';
import { Search, X, Printer, AlertCircle } from 'lucide-react';
import { useConference } from '../context/ConferenceStore';

interface StatusLookupModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCode?: string;
}

export const StatusLookupModal: React.FC<StatusLookupModalProps> = ({
  isOpen,
  onClose,
  initialCode = ''
}) => {
  const [lookupCode, setLookupCode] = useState(initialCode);
  const [hasSearched, setHasSearched] = useState(false);

  const { getRegistrationByCode, getSubmissionByCode } = useConference();

  if (!isOpen) return null;

  const foundRegistration = lookupCode.trim() ? getRegistrationByCode(lookupCode) : undefined;
  const foundSubmission = !foundRegistration && lookupCode.trim() ? getSubmissionByCode(lookupCode) : undefined;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white max-w-lg w-full rounded-3xl shadow-2xl border border-sand-300 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-maroon-900 text-white p-5 flex items-center justify-between border-b border-saffron-500/30">
          <div className="flex items-center space-x-2">
            <Search className="w-5 h-5 text-gold-400" />
            <h3 className="font-display font-bold text-base">Check Status & Lookup Receipt</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-sand-300 hover:text-white p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <form onSubmit={handleSearch} className="space-y-3">
            <label className="text-xs font-bold text-sand-700 block">
              Enter Registration Code or Submission Code
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                required
                placeholder="e.g. IKON27-0042 or SUB-0018"
                value={lookupCode}
                onChange={e => { setLookupCode(e.target.value); setHasSearched(false); }}
                className="flex-1 text-xs p-3 font-mono font-bold uppercase bg-sand-50 border border-sand-300 rounded-xl focus:ring-2 focus:ring-saffron-500 outline-none"
              />
              <button
                type="submit"
                className="px-5 py-3 text-xs font-bold text-white bg-saffron-600 hover:bg-saffron-700 rounded-xl shadow-sm"
              >
                Lookup
              </button>
            </div>
            <div className="text-[11px] text-sand-500">
              Tip: Registration codes start with <code>IKON27-</code>, submission codes start with <code>SUB-</code>.
            </div>
          </form>

          {/* RESULTS: REGISTRATION FOUND */}
          {foundRegistration && (
            <div className="bg-sand-50 p-5 rounded-2xl border border-sand-300 space-y-3 text-xs">
              <div className="flex items-center justify-between border-b border-sand-200 pb-2">
                <span className="font-mono font-bold text-sm text-maroon-900">
                  {foundRegistration.registrationCode}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                  foundRegistration.status === 'paid'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  Status: {foundRegistration.status.toUpperCase()}
                </span>
              </div>

              <div className="space-y-1.5 text-sand-800">
                <div><strong>Delegate:</strong> {foundRegistration.fullName}</div>
                <div><strong>Email:</strong> {foundRegistration.email}</div>
                <div><strong>Affiliation:</strong> {foundRegistration.affiliation}</div>
                <div><strong>Category:</strong> {foundRegistration.category.replace('_', ' ')} ({foundRegistration.mode})</div>
                <div><strong>Fee Paid:</strong> {foundRegistration.feeCurrency === 'USD' ? `$${foundRegistration.feeAmount}` : `₹${foundRegistration.feeAmount.toLocaleString()}`}</div>
                {foundRegistration.receiptNumber && (
                  <div><strong>Official Receipt:</strong> {foundRegistration.receiptNumber}</div>
                )}
                {foundRegistration.adminNotes && (
                  <div className="text-[11px] text-sand-500 bg-white p-2 rounded border border-sand-200">
                    Remarks: {foundRegistration.adminNotes}
                  </div>
                )}
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 text-xs font-bold text-maroon-800 bg-white hover:bg-sand-100 border border-sand-300 rounded-lg flex items-center space-x-1.5 shadow-2xs"
                >
                  <Printer className="w-3.5 h-3.5 text-maroon-700" />
                  <span>Print Receipt</span>
                </button>
              </div>
            </div>
          )}

          {/* RESULTS: SUBMISSION FOUND */}
          {foundSubmission && (
            <div className="bg-sand-50 p-5 rounded-2xl border border-sand-300 space-y-3 text-xs">
              <div className="flex items-center justify-between border-b border-sand-200 pb-2">
                <span className="font-mono font-bold text-sm text-maroon-900">
                  {foundSubmission.submissionCode}
                </span>
                <span className="px-2.5 py-0.5 rounded-full font-bold text-[10px] bg-purple-100 text-purple-800">
                  {foundSubmission.status.toUpperCase()}
                </span>
              </div>

              <div className="space-y-1.5 text-sand-800">
                <div className="font-display font-bold text-maroon-950 text-sm">{foundSubmission.title}</div>
                <div><strong>Sub-Track:</strong> {foundSubmission.subTrackId}</div>
                <div><strong>Authors:</strong> {foundSubmission.authors.map(a => a.name).join(', ')}</div>
                <div><strong>Mode:</strong> {foundSubmission.presentationMode.toUpperCase()} Presentation</div>
                {foundSubmission.fullPaperFileName && (
                  <div className="text-emerald-700 font-bold">
                    ✓ Full Paper Received: {foundSubmission.fullPaperFileName}
                  </div>
                )}
              </div>

              {foundSubmission.reviews.length > 0 && (
                <div className="bg-amber-50 p-3 rounded-lg border border-amber-200 text-sand-800">
                  <div className="font-bold text-[10px] text-amber-900 uppercase">Review Feedback:</div>
                  <div className="italic">"{foundSubmission.reviews[0].comment}"</div>
                </div>
              )}
            </div>
          )}

          {/* NOT FOUND MESSAGE */}
          {hasSearched && !foundRegistration && !foundSubmission && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>No active record found matching code "{lookupCode}". Please verify and try again.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
