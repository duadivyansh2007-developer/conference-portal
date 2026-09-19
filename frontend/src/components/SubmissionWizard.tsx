import React, { useState } from 'react';
import {
  FileText, CheckCircle, AlertCircle, Upload,
  User, Plus, Trash2, ArrowRight, KeyRound, Sparkles
} from 'lucide-react';
import { TRACKS_DATA } from '../data/conferenceData';
import { useConference, AuthorInfo, SubmissionRecord } from '../context/ConferenceStore';

interface SubmissionWizardProps {
  initialTrackId?: string;
  initialSubTrackCode?: string;
  onClose?: () => void;
  onViewStatus?: (code: string) => void;
}

export const SubmissionWizard: React.FC<SubmissionWizardProps> = ({
  initialTrackId,
  initialSubTrackCode,
  onClose: _onClose,
  onViewStatus: _onViewStatus
}) => {
  const {
    authorEmail,
    setAuthorEmail,
    addSubmission,
    getSubmissionsByAuthor,
    attachFullPaper
  } = useConference();

  // Author OTP Login State
  const [loginEmailInput, setLoginEmailInput] = useState(authorEmail || '');
  const [otpSent, setOtpSent] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState('');
  const [isAuthorLoggedIn, setIsAuthorLoggedIn] = useState(!!authorEmail);

  // Tab: 'new' submission vs 'my_submissions'
  const [activeTab, setActiveTab] = useState<'new' | 'my_submissions'>(
    authorEmail && getSubmissionsByAuthor(authorEmail).length > 0 ? 'my_submissions' : 'new'
  );

  // Submission Form Fields
  const [trackId, setTrackId] = useState<string>(initialTrackId || 'track-1');
  const [subTrackId, setSubTrackId] = useState<string>(initialSubTrackCode || '1.1');
  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState<AuthorInfo[]>([
    { name: '', email: authorEmail || '', affiliation: '', isPresenting: true }
  ]);
  const [abstractText, setAbstractText] = useState('');
  const [keywords, setKeywords] = useState('');
  const [presentationMode, setPresentationMode] = useState<'oral' | 'poster'>('oral');

  const [formError, setFormError] = useState('');
  const [_newlyCreatedSub, setNewlyCreatedSub] = useState<SubmissionRecord | null>(null);

  // Full paper upload modal state
  const [uploadingForSubId, setUploadingForSubId] = useState<string | null>(null);
  const [paperFileName, setPaperFileName] = useState('');

  // Calculate abstract word count
  const wordCount = abstractText.trim().length > 0 ? abstractText.trim().split(/\s+/).length : 0;
  const maxWords = 300;

  const currentTrack = TRACKS_DATA.find(t => t.id === trackId) || TRACKS_DATA[0];

  // OTP Simulation
  const handleSendOtp = () => {
    if (!loginEmailInput || !loginEmailInput.includes('@')) {
      setFormError('Please provide a valid email address.');
      return;
    }
    setFormError('');
    setOtpSent(true);
    setEnteredOtp('123456'); // Simulated auto-fill for frictionless pair test
  };

  const handleVerifyOtp = () => {
    if (enteredOtp !== '123456') {
      setFormError('Invalid OTP code. Please enter 123456 (simulated OTP).');
      return;
    }
    setFormError('');
    setAuthorEmail(loginEmailInput);
    setIsAuthorLoggedIn(true);
    setAuthors(prev => [
      { ...prev[0], email: loginEmailInput }
    ]);
  };

  const handleAddAuthor = () => {
    setAuthors(prev => [
      ...prev,
      { name: '', email: '', affiliation: '', isPresenting: false }
    ]);
  };

  const handleRemoveAuthor = (index: number) => {
    if (authors.length <= 1) return;
    setAuthors(prev => prev.filter((_, idx) => idx !== index));
  };

  const handleAuthorChange = (index: number, field: keyof AuthorInfo, val: any) => {
    setAuthors(prev => prev.map((a, idx) => {
      if (idx === index) {
        if (field === 'isPresenting' && val === true) {
          // ensure only one presenting author is flagged
          return { ...a, isPresenting: true };
        }
        return { ...a, [field]: val };
      }
      if (field === 'isPresenting' && val === true) {
        return { ...a, isPresenting: false };
      }
      return a;
    }));
  };

  const handleSubmitAbstract = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setFormError('Please enter a paper title.');
      return;
    }
    if (wordCount > maxWords) {
      setFormError(`Abstract exceeds the ${maxWords} words limit. Please shorten your abstract.`);
      return;
    }
    if (wordCount < 50) {
      setFormError('Abstract is too short. Please provide at least 50 words.');
      return;
    }
    if (authors.some(a => !a.name.trim() || !a.affiliation.trim())) {
      setFormError('Please provide names and affiliations for all listed authors.');
      return;
    }

    const keywordList = keywords.split(',').map(k => k.trim()).filter(Boolean);
    if (keywordList.length > 5) {
      setFormError('Please provide no more than 5 keywords.');
      return;
    }

    const newSub = addSubmission({
      title,
      trackId,
      subTrackId,
      authors,
      abstractText,
      keywords: keywordList.length ? keywordList : ['Indian Knowledge Systems'],
      presentationMode,
      submittedByEmail: authorEmail || authors[0].email
    });

    setNewlyCreatedSub(newSub);
    setFormError('');
    setActiveTab('my_submissions');
  };

  const handleSimulatedFileUpload = (subId: string) => {
    if (!paperFileName.trim()) return;
    attachFullPaper(subId, paperFileName);
    setUploadingForSubId(null);
    setPaperFileName('');
  };

  const mySubmissions = authorEmail ? getSubmissionsByAuthor(authorEmail) : [];

  const getStatusBadge = (status: SubmissionRecord['status']) => {
    switch (status) {
      case 'submitted':
        return <span className="bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-bold px-2 py-0.5 rounded">Submitted</span>;
      case 'under_review':
        return <span className="bg-amber-50 text-amber-800 border border-amber-300 text-[10px] font-bold px-2 py-0.5 rounded">Under Review</span>;
      case 'accepted':
        return <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded">Accepted for Presentation</span>;
      case 'full_paper_submitted':
        return <span className="bg-purple-100 text-purple-800 border border-purple-300 text-[10px] font-bold px-2 py-0.5 rounded">Full Paper Received</span>;
      case 'finalized':
        return <span className="bg-gold-100 text-gold-900 border border-gold-400 text-[10px] font-bold px-2 py-0.5 rounded">Finalized in Proceedings</span>;
      case 'revision_requested':
        return <span className="bg-orange-100 text-orange-800 border border-orange-300 text-[10px] font-bold px-2 py-0.5 rounded">Revision Requested</span>;
      case 'rejected':
        return <span className="bg-red-50 text-red-700 border border-red-200 text-[10px] font-bold px-2 py-0.5 rounded">Declined</span>;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-sand-300 shadow-royal overflow-hidden my-4">
      {/* Author Authentication Strip */}
      <div className="bg-gradient-to-r from-sand-100 to-sand-50 p-6 border-b border-sand-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-maroon-700 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Author Portal (Passwordless OTP)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-maroon-950">
            Abstract & Paper Submission
          </h2>
        </div>

        {isAuthorLoggedIn ? (
          <div className="flex items-center space-x-3 bg-white px-3.5 py-2 rounded-xl border border-sand-300 text-xs">
            <User className="w-4 h-4 text-saffron-600" />
            <span className="font-medium text-sand-800">{authorEmail}</span>
            <button
              onClick={() => { setAuthorEmail(null); setIsAuthorLoggedIn(false); setOtpSent(false); }}
              className="text-maroon-700 font-bold hover:underline ml-2"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-2 text-xs">
            <span className="text-sand-600">Sign in with email OTP to track submissions</span>
          </div>
        )}
      </div>

      <div className="p-6 sm:p-10">
        {formError && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{formError}</span>
          </div>
        )}

        {/* LOGIN FORM IF NOT LOGGED IN */}
        {!isAuthorLoggedIn && (
          <div className="max-w-md mx-auto py-8 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-saffron-100 text-saffron-700 flex items-center justify-center mx-auto">
              <KeyRound className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-display font-bold text-maroon-950">Author Passwordless Access</h3>
              <p className="text-xs text-sand-600">
                Enter your email address to receive an instantaneous 6-digit login OTP. No passwords required.
              </p>
            </div>

            {!otpSent ? (
              <div className="space-y-3 pt-2">
                <input
                  type="email"
                  placeholder="author@university.ac.in"
                  value={loginEmailInput}
                  onChange={e => setLoginEmailInput(e.target.value)}
                  className="w-full text-xs p-3 bg-white border border-sand-300 rounded-xl focus:ring-2 focus:ring-saffron-500 outline-none"
                />
                <button
                  onClick={handleSendOtp}
                  className="w-full py-3 text-xs font-bold text-white bg-maroon-800 hover:bg-maroon-900 rounded-xl shadow-royal"
                >
                  Send Login OTP Code
                </button>
              </div>
            ) : (
              <div className="space-y-3 pt-2">
                <div className="text-xs text-emerald-700 bg-emerald-50 p-2 rounded-lg border border-emerald-200">
                  Code sent to <strong>{loginEmailInput}</strong>! (Test Code: <strong>123456</strong>)
                </div>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="123456"
                  value={enteredOtp}
                  onChange={e => setEnteredOtp(e.target.value)}
                  className="w-full text-center tracking-widest font-mono text-base font-bold p-3 bg-white border border-sand-300 rounded-xl focus:ring-2 focus:ring-saffron-500 outline-none"
                />
                <button
                  onClick={handleVerifyOtp}
                  className="w-full py-3 text-xs font-bold text-white bg-saffron-600 hover:bg-saffron-700 rounded-xl shadow-royal"
                >
                  Verify & Enter Author Dashboard
                </button>
              </div>
            )}
          </div>
        )}

        {/* LOGGED-IN AUTHOR WORKSPACE */}
        {isAuthorLoggedIn && (
          <div className="space-y-6">
            {/* Tab Controls */}
            <div className="flex border-b border-sand-200">
              <button
                onClick={() => setActiveTab('new')}
                className={`px-5 py-2.5 text-xs font-bold border-b-2 transition ${activeTab === 'new'
                    ? 'border-maroon-800 text-maroon-900'
                    : 'border-transparent text-sand-500 hover:text-sand-900'
                  }`}
              >
                + Submit New Abstract
              </button>
              <button
                onClick={() => setActiveTab('my_submissions')}
                className={`px-5 py-2.5 text-xs font-bold border-b-2 transition flex items-center space-x-1.5 ${activeTab === 'my_submissions'
                    ? 'border-maroon-800 text-maroon-900'
                    : 'border-transparent text-sand-500 hover:text-sand-900'
                  }`}
              >
                <span>My Submissions</span>
                <span className="bg-sand-200 text-sand-800 px-1.5 py-0.5 rounded text-[10px]">
                  {mySubmissions.length}
                </span>
              </button>
            </div>

            {/* TAB 1: NEW ABSTRACT SUBMISSION */}
            {activeTab === 'new' && (
              <form onSubmit={handleSubmitAbstract} className="space-y-6">
                {/* Track and Sub-Track Selectors */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-sand-50 p-4 rounded-2xl border border-sand-200">
                  <div>
                    <label className="text-xs font-bold text-sand-700 mb-1 block">Selected Track *</label>
                    <select
                      value={trackId}
                      onChange={e => {
                        setTrackId(e.target.value);
                        const newT = TRACKS_DATA.find(t => t.id === e.target.value);
                        if (newT) setSubTrackId(newT.subTracks[0].code);
                      }}
                      className="w-full text-xs p-2.5 bg-white border border-sand-300 rounded-lg focus:ring-2 focus:ring-saffron-500 outline-none"
                    >
                      {TRACKS_DATA.map(t => (
                        <option key={t.id} value={t.id}>
                          Track {t.number}: {t.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-sand-700 mb-1 block">Sub-Track Theme (35 Options) *</label>
                    <select
                      value={subTrackId}
                      onChange={e => setSubTrackId(e.target.value)}
                      className="w-full text-xs p-2.5 bg-white border border-sand-300 rounded-lg focus:ring-2 focus:ring-saffron-500 outline-none"
                    >
                      {currentTrack.subTracks.map(st => (
                        <option key={st.code} value={st.code}>
                          {st.code} — {st.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Paper Title */}
                <div>
                  <label className="text-xs font-bold text-sand-700 mb-1 block">
                    Paper Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Algorithmic Convergence in Madhava's Infinite Series for Sine and Cosine"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="w-full text-xs p-3 bg-white border border-sand-300 rounded-lg focus:ring-2 focus:ring-saffron-500 outline-none font-semibold text-sand-900"
                  />
                </div>

                {/* Authors Section */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-sand-700">
                      Authors & Co-Authors List *
                    </label>
                    <button
                      type="button"
                      onClick={handleAddAuthor}
                      className="text-xs font-bold text-maroon-800 hover:text-saffron-600 flex items-center space-x-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Co-Author</span>
                    </button>
                  </div>

                  <div className="space-y-2">
                    {authors.map((author, idx) => (
                      <div key={idx} className="bg-sand-50 p-3 rounded-xl border border-sand-200 grid grid-cols-1 sm:grid-cols-12 gap-2 items-center text-xs">
                        <div className="sm:col-span-4">
                          <input
                            type="text"
                            required
                            placeholder="Full Name"
                            value={author.name}
                            onChange={e => handleAuthorChange(idx, 'name', e.target.value)}
                            className="w-full p-2 bg-white border border-sand-300 rounded outline-none"
                          />
                        </div>
                        <div className="sm:col-span-3">
                          <input
                            type="email"
                            required
                            placeholder="Email"
                            value={author.email}
                            onChange={e => handleAuthorChange(idx, 'email', e.target.value)}
                            className="w-full p-2 bg-white border border-sand-300 rounded outline-none"
                          />
                        </div>
                        <div className="sm:col-span-3">
                          <input
                            type="text"
                            required
                            placeholder="Affiliation / Org"
                            value={author.affiliation}
                            onChange={e => handleAuthorChange(idx, 'affiliation', e.target.value)}
                            className="w-full p-2 bg-white border border-sand-300 rounded outline-none"
                          />
                        </div>
                        <div className="sm:col-span-2 flex items-center justify-between">
                          <label className="flex items-center space-x-1 text-[11px] text-sand-700 cursor-pointer">
                            <input
                              type="radio"
                              name="presenting_author"
                              checked={author.isPresenting}
                              onChange={() => handleAuthorChange(idx, 'isPresenting', true)}
                            />
                            <span>Presenter</span>
                          </label>
                          {authors.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveAuthor(idx)}
                              className="text-red-500 hover:text-red-700 p-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Abstract Text & 300-word counter */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-sand-700">
                      Structured Abstract (Max 300 Words) *
                    </label>
                    <span className={`text-xs font-mono font-bold ${wordCount > maxWords ? 'text-red-600' : 'text-sand-600'
                      }`}>
                      {wordCount} / {maxWords} words
                    </span>
                  </div>
                  <textarea
                    required
                    rows={6}
                    placeholder="Provide a structured abstract stating the objective, ancient Indian knowledge text/paradigm referenced, methodology, contemporary relevance, and preliminary findings..."
                    value={abstractText}
                    onChange={e => setAbstractText(e.target.value)}
                    className={`w-full text-xs p-3 bg-white border rounded-xl focus:ring-2 outline-none ${wordCount > maxWords
                        ? 'border-red-500 focus:ring-red-400'
                        : 'border-sand-300 focus:ring-saffron-500'
                      }`}
                  ></textarea>
                </div>

                {/* Keywords & Mode */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-sand-700 mb-1 block">
                      Keywords (comma separated, max 5) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Kerala School, Calculus, Infinite Series, Madhava"
                      value={keywords}
                      onChange={e => setKeywords(e.target.value)}
                      className="w-full text-xs p-2.5 bg-white border border-sand-300 rounded-lg focus:ring-2 focus:ring-saffron-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-sand-700 mb-1 block">
                      Preferred Presentation Mode *
                    </label>
                    <div className="flex space-x-3 pt-1">
                      <label className="flex items-center space-x-1.5 text-xs text-sand-800 cursor-pointer">
                        <input
                          type="radio"
                          value="oral"
                          checked={presentationMode === 'oral'}
                          onChange={() => setPresentationMode('oral')}
                          className="text-maroon-800"
                        />
                        <span>Oral Paper Presentation (15 mins)</span>
                      </label>
                      <label className="flex items-center space-x-1.5 text-xs text-sand-800 cursor-pointer">
                        <input
                          type="radio"
                          value="poster"
                          checked={presentationMode === 'poster'}
                          onChange={() => setPresentationMode('poster')}
                          className="text-maroon-800"
                        />
                        <span>Research Poster</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    disabled={wordCount > maxWords}
                    className="px-8 py-3 text-sm font-bold text-white bg-maroon-800 hover:bg-maroon-900 rounded-xl shadow-royal flex items-center space-x-2"
                  >
                    <span>Submit Abstract for Peer Review</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* TAB 2: MY SUBMISSIONS LIST */}
            {activeTab === 'my_submissions' && (
              <div className="space-y-4">
                {mySubmissions.length === 0 ? (
                  <div className="text-center py-10 bg-sand-50 rounded-2xl border border-sand-200 space-y-2">
                    <FileText className="w-10 h-10 text-sand-400 mx-auto" />
                    <div className="text-sm font-bold text-sand-800">No submissions found for {authorEmail}</div>
                    <button
                      onClick={() => setActiveTab('new')}
                      className="px-4 py-2 text-xs font-bold text-white bg-maroon-800 rounded-lg shadow-sm"
                    >
                      + Create Your First Submission
                    </button>
                  </div>
                ) : (
                  mySubmissions.map((sub) => (
                    <div key={sub.id} className="bg-white p-5 rounded-2xl border border-sand-300 shadow-xs space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-sand-200 pb-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-xs font-bold text-maroon-900 bg-sand-100 px-2 py-0.5 rounded">
                            {sub.submissionCode}
                          </span>
                          <span className="text-[11px] text-sand-500 font-semibold">
                            Sub-Track {sub.subTrackId}
                          </span>
                        </div>
                        <div>{getStatusBadge(sub.status)}</div>
                      </div>

                      <h3 className="text-base font-display font-bold text-maroon-950">
                        {sub.title}
                      </h3>

                      <div className="text-xs text-sand-600">
                        <strong>Authors:</strong> {sub.authors.map(a => `${a.name} (${a.affiliation})`).join(', ')}
                      </div>

                      <div className="text-xs text-sand-500 bg-sand-50 p-3 rounded-lg border border-sand-200/60 line-clamp-3">
                        {sub.abstractText}
                      </div>

                      {/* Review feedback if available */}
                      {sub.reviews.length > 0 && (
                        <div className="bg-amber-50/70 p-3 rounded-xl border border-amber-200 space-y-1">
                          <div className="text-[10px] font-bold uppercase tracking-wider text-amber-900">
                            Committee Review Remarks
                          </div>
                          {sub.reviews.map(r => (
                            <div key={r.id} className="text-xs text-sand-800">
                              "{r.comment}" — <em>{r.reviewerName}</em>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Full Paper Action Strip if Accepted */}
                      <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-sand-200 text-xs">
                        <div className="text-[11px] text-sand-500">
                          Submitted on {new Date(sub.createdAt).toLocaleDateString()}
                        </div>

                        {sub.status === 'accepted' && !sub.fullPaperFileName && (
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => setUploadingForSubId(sub.id)}
                              className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg transition flex items-center space-x-1"
                            >
                              <Upload className="w-3.5 h-3.5" />
                              <span>Upload Full Paper (PDF/DOCX)</span>
                            </button>
                          </div>
                        )}

                        {sub.fullPaperFileName && (
                          <div className="text-emerald-700 font-bold flex items-center space-x-1 text-xs">
                            <CheckCircle className="w-4 h-4" />
                            <span>Full Paper Attached: {sub.fullPaperFileName}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}

        {/* FULL PAPER UPLOAD MODAL SIMULATION */}
        {uploadingForSubId && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <div className="bg-white max-w-md w-full p-6 rounded-3xl shadow-royal space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-lg text-maroon-950">
                  Upload Full Paper Document
                </h3>
                <button
                  onClick={() => setUploadingForSubId(null)}
                  className="text-sand-400 hover:text-sand-700 text-lg font-bold"
                >
                  ×
                </button>
              </div>

              <p className="text-xs text-sand-600">
                Please upload the camera-ready full research manuscript (Word/PDF, ≤10MB) complying with the template for conference proceedings.
              </p>

              <div>
                <label className="text-xs font-bold text-sand-700 mb-1 block">Document Filename *</label>
                <input
                  type="text"
                  placeholder="e.g. IKON2027_KeralaSchool_Paper.pdf"
                  value={paperFileName}
                  onChange={e => setPaperFileName(e.target.value)}
                  className="w-full text-xs p-2.5 border border-sand-300 rounded-lg outline-none"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  onClick={() => setUploadingForSubId(null)}
                  className="px-4 py-2 text-xs font-semibold text-sand-700 bg-sand-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleSimulatedFileUpload(uploadingForSubId)}
                  disabled={!paperFileName.trim()}
                  className="px-4 py-2 text-xs font-bold text-white bg-maroon-800 hover:bg-maroon-900 rounded-lg shadow-sm"
                >
                  Confirm Upload
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
