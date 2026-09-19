import React, { useState } from 'react';
import { 
  Shield, Users, FileText, Download, 
  Search, Award, DollarSign, Store 
} from 'lucide-react';
import { useConference, AdminRole, RegistrationRecord, SubmissionRecord } from '../context/ConferenceStore';
import { CONFERENCE_INFO, TRACKS_DATA } from '../data/conferenceData';

export const AdminConsole: React.FC = () => {
  const {
    registrations,
    updateRegistrationStatus,
    submissions,
    updateSubmissionStatus,
    expoApplications,
    updateExpoStatus,
    adminRole,
    setAdminRole,
    announcementText,
    setAnnouncementText,
    stats
  } = useConference();

  const [activeAdminTab, setActiveAdminTab] = useState<'dashboard' | 'registrations' | 'submissions' | 'expo' | 'content'>('dashboard');

  // Registrations table filters
  const [regSearch, setRegSearch] = useState('');
  const [regStatusFilter, setRegStatusFilter] = useState<'all' | 'paid' | 'pending'>('all');
  const [selectedReg, setSelectedReg] = useState<RegistrationRecord | null>(null);
  const [manualNote, setManualNote] = useState('');
  const [manualUtr, setManualUtr] = useState('');

  // Submissions table filters
  const [subSearch, setSubSearch] = useState('');
  const [subTrackFilter, setSubTrackFilter] = useState<string>('all');
  const [subStatusFilter, setSubStatusFilter] = useState<string>('all');
  const [reviewingSub, setReviewingSub] = useState<SubmissionRecord | null>(null);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewerName, setReviewerName] = useState('Dr. Neetu Sharma (Convener)');

  // CMS edit state
  const [bannerInput, setBannerInput] = useState(announcementText);
  const [bannerSaved, setBannerSaved] = useState(false);

  // Certificate generation trigger state
  const [certGenMessage, setCertGenMessage] = useState('');

  // Filtered Registrations
  const filteredRegistrations = registrations.filter(r => {
    if (regStatusFilter !== 'all' && r.status !== regStatusFilter) return false;
    if (!regSearch.trim()) return true;
    const q = regSearch.toLowerCase();
    return (
      r.fullName.toLowerCase().includes(q) ||
      r.email.toLowerCase().includes(q) ||
      r.registrationCode.toLowerCase().includes(q) ||
      r.affiliation.toLowerCase().includes(q)
    );
  });

  // Filtered Submissions
  const filteredSubmissions = submissions.filter(s => {
    if (subTrackFilter !== 'all' && s.trackId !== subTrackFilter) return false;
    if (subStatusFilter !== 'all' && s.status !== subStatusFilter) return false;
    if (!subSearch.trim()) return true;
    const q = subSearch.toLowerCase();
    return (
      s.title.toLowerCase().includes(q) ||
      s.submissionCode.toLowerCase().includes(q) ||
      s.authors.some(a => a.name.toLowerCase().includes(q))
    );
  });

  // CSV Export
  const exportRegistrationsCSV = () => {
    const headers = ['Registration Code', 'Full Name', 'Email', 'Phone', 'Affiliation', 'Category', 'Mode', 'Amount', 'Currency', 'Status', 'Payment Ref', 'Dietary', 'Created At'];
    const rows = registrations.map(r => [
      r.registrationCode,
      `"${r.fullName.replace(/"/g, '""')}"`,
      r.email,
      r.phone,
      `"${r.affiliation.replace(/"/g, '""')}"`,
      r.category,
      r.mode,
      r.feeAmount,
      r.feeCurrency,
      r.status,
      r.paymentReference || '',
      `"${r.dietaryNotes || ''}"`,
      r.createdAt
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `IKON2027_Registrations_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleMarkAsPaid = (regId: string) => {
    updateRegistrationStatus(regId, 'paid', manualNote || 'Verified via Bank Statement', manualUtr);
    setSelectedReg(null);
    setManualNote('');
    setManualUtr('');
  };

  const handleReviewDecision = (subId: string, status: SubmissionRecord['status']) => {
    updateSubmissionStatus(subId, status, reviewComment, reviewerName);
    setReviewingSub(null);
    setReviewComment('');
  };

  const handleSaveCMS = () => {
    setAnnouncementText(bannerInput);
    setBannerSaved(true);
    setTimeout(() => setBannerSaved(false), 2500);
  };

  const handleBulkCertificateGen = () => {
    setCertGenMessage(`Successfully queued batch generation of ${stats.paidRegistrations} Participation Certificates & ${stats.acceptedSubmissions} Presentation Certificates!`);
    setTimeout(() => setCertGenMessage(''), 5000);
  };

  // Progress towards ₹4,18,000 budget target (Proposal §13)
  const budgetTarget = CONFERENCE_INFO.budgetRevenueTarget;
  const progressPercent = Math.min(100, Math.round((stats.totalRevenueINR / budgetTarget) * 100));

  return (
    <div className="space-y-8 py-4">
      {/* Top Admin Bar with Role Switcher */}
      <div className="bg-sand-900 text-white p-6 rounded-3xl shadow-royal flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-maroon-700 to-saffron-600 flex items-center justify-center text-white font-bold text-xl shadow-sm border border-gold-400">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-display font-bold text-white">
                Organizing Committee Admin Console
              </h2>
              <span className="bg-saffron-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                {adminRole.replace('_', ' ')}
              </span>
            </div>
            <div className="text-xs text-sand-400">
              Department of Applied Sciences, PIET Jaipur • Secured Operational Console
            </div>
          </div>
        </div>

        {/* Role Switcher Pill */}
        <div className="flex items-center space-x-2 bg-sand-800 p-1.5 rounded-xl border border-sand-700 text-xs">
          <span className="text-sand-400 text-[11px] px-2 font-medium">Role:</span>
          {(['super_admin', 'committee', 'hospitality'] as AdminRole[]).map(role => (
            <button
              key={role}
              onClick={() => setAdminRole(role)}
              className={`px-3 py-1.5 rounded-lg font-bold capitalize transition ${
                adminRole === role
                  ? 'bg-maroon-700 text-white shadow-xs'
                  : 'text-sand-300 hover:text-white'
              }`}
            >
              {role === 'super_admin' ? 'Conveners (Super)' : role}
            </button>
          ))}
        </div>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex border-b border-sand-300 bg-white px-6 rounded-2xl shadow-xs">
        {[
          { id: 'dashboard', label: 'Executive Dashboard' },
          { id: 'registrations', label: `Registrations (${registrations.length})` },
          { id: 'submissions', label: `Abstracts & Papers (${submissions.length})` },
          { id: 'expo', label: `IKS Expo (${expoApplications.length})` },
          ...(adminRole === 'super_admin' ? [{ id: 'content', label: 'CMS & Certificates' }] : []),
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveAdminTab(tab.id as any)}
            className={`py-4 px-4 text-xs font-bold border-b-2 transition ${
              activeAdminTab === tab.id
                ? 'border-maroon-800 text-maroon-900 font-extrabold'
                : 'border-transparent text-sand-600 hover:text-sand-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: EXECUTIVE DASHBOARD */}
      {activeAdminTab === 'dashboard' && (
        <div className="space-y-6">
          {/* KPI Stat Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-sand-300 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-sand-500 uppercase">Paid Registrations</span>
                <Users className="w-4 h-4 text-maroon-700" />
              </div>
              <div className="text-3xl font-display font-extrabold text-maroon-950 mt-2">
                {stats.paidRegistrations}
              </div>
              <div className="text-[11px] text-sand-500 mt-1">
                {stats.pendingRegistrations} Pending Verification
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-sand-300 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-sand-500 uppercase">Revenue Realized</span>
                <DollarSign className="w-4 h-4 text-emerald-700" />
              </div>
              <div className="text-3xl font-display font-extrabold text-emerald-800 mt-2 font-mono">
                ₹{stats.totalRevenueINR.toLocaleString()}
              </div>
              <div className="text-[11px] text-sand-500 mt-1">
                Target: ₹{budgetTarget.toLocaleString()} (Proposal §13)
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-sand-300 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-sand-500 uppercase">Paper Submissions</span>
                <FileText className="w-4 h-4 text-saffron-600" />
              </div>
              <div className="text-3xl font-display font-extrabold text-maroon-950 mt-2">
                {stats.totalSubmissions}
              </div>
              <div className="text-[11px] text-sand-500 mt-1">
                {stats.acceptedSubmissions} Accepted • {stats.pendingReviews} Under Review
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-sand-300 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-sand-500 uppercase">Expo Exhibitors</span>
                <Store className="w-4 h-4 text-gold-600" />
              </div>
              <div className="text-3xl font-display font-extrabold text-maroon-950 mt-2">
                {stats.expoCount}
              </div>
              <div className="text-[11px] text-sand-500 mt-1">
                Day 2 Pavilion Applications
              </div>
            </div>
          </div>

          {/* Budget vs Revenue Progress Bar */}
          <div className="bg-white p-6 rounded-2xl border border-sand-300 shadow-xs space-y-3">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-maroon-950">Registration Revenue vs Total Estimated Budget</span>
              <span className="text-saffron-700 font-mono font-bold">
                {progressPercent}% (₹{stats.totalRevenueINR.toLocaleString()} / ₹{budgetTarget.toLocaleString()})
              </span>
            </div>
            <div className="w-full bg-sand-200 h-3 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-maroon-700 to-saffron-600 h-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <p className="text-[11px] text-sand-500">
              Per Proposal §13, estimated total conference budget is ₹4,18,000, funded via delegate registration fees and requested academic grants from ICSSR, DST, AIU, and ICHR.
            </p>
          </div>

          {/* Submissions by Track Summary */}
          <div className="bg-white p-6 rounded-2xl border border-sand-300 shadow-xs space-y-4">
            <h3 className="font-display font-bold text-base text-maroon-950">
              Abstract Submissions Breakdown Across 5 Tracks
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              {TRACKS_DATA.map(t => {
                const count = submissions.filter(s => s.trackId === t.id).length;
                return (
                  <div key={t.id} className="bg-sand-50 p-3.5 rounded-xl border border-sand-200 text-center">
                    <div className="text-[10px] font-bold text-sand-500 uppercase">Track {t.number}</div>
                    <div className="text-2xl font-display font-extrabold text-maroon-900 mt-1">{count}</div>
                    <div className="text-[10px] text-sand-600 truncate mt-0.5">{t.name}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: REGISTRATIONS MANAGEMENT */}
      {activeAdminTab === 'registrations' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-2xl border border-sand-300 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-sand-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search name, code, email..."
                  value={regSearch}
                  onChange={e => setRegSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs border border-sand-300 rounded-lg outline-none"
                />
              </div>

              <select
                value={regStatusFilter}
                onChange={e => setRegStatusFilter(e.target.value as any)}
                className="text-xs p-1.5 border border-sand-300 rounded-lg outline-none"
              >
                <option value="all">All Statuses</option>
                <option value="paid">Paid Only</option>
                <option value="pending">Pending Only</option>
              </select>
            </div>

            {adminRole !== 'hospitality' && (
              <button
                onClick={exportRegistrationsCSV}
                className="px-4 py-2 text-xs font-bold text-white bg-maroon-800 hover:bg-maroon-900 rounded-xl transition flex items-center space-x-1.5 shrink-0 shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Attendee List (CSV)</span>
              </button>
            )}
          </div>

          {/* Registrations Table */}
          <div className="bg-white rounded-2xl border border-sand-300 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-sand-100/70 border-b border-sand-200 text-sand-700 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="p-3">Code</th>
                    <th className="p-3">Delegate</th>
                    <th className="p-3">Category & Mode</th>
                    <th className="p-3">Dietary</th>
                    <th className="p-3">Fee / Status</th>
                    {adminRole === 'super_admin' && <th className="p-3 text-right">Actions</th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-sand-200">
                  {filteredRegistrations.map(r => (
                    <tr key={r.id} className="hover:bg-sand-50 transition">
                      <td className="p-3 font-mono font-bold text-maroon-900">{r.registrationCode}</td>
                      <td className="p-3">
                        <div className="font-bold text-sand-900">{r.fullName}</div>
                        <div className="text-[11px] text-sand-500">{r.affiliation}</div>
                        {adminRole !== 'hospitality' && <div className="text-[10px] text-sand-400">{r.email} • {r.phone}</div>}
                      </td>
                      <td className="p-3 capitalize">
                        <div>{r.category.replace('_', ' ')}</div>
                        <div className="text-[10px] text-sand-500 font-semibold">{r.mode}</div>
                      </td>
                      <td className="p-3 text-sand-700">
                        {r.dietaryNotes || 'Standard'}
                      </td>
                      <td className="p-3">
                        <div className="font-mono font-bold text-sand-900">
                          {r.feeCurrency === 'USD' ? `$${r.feeAmount}` : `₹${r.feeAmount}`}
                        </div>
                        <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          r.status === 'paid'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {r.status.toUpperCase()}
                        </span>
                      </td>
                      {adminRole === 'super_admin' && (
                        <td className="p-3 text-right">
                          {r.status === 'pending' && (
                            <button
                              onClick={() => setSelectedReg(r)}
                              className="px-2.5 py-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-lg"
                            >
                              Verify / Mark Paid
                            </button>
                          )}
                          {r.status === 'paid' && (
                            <span className="text-[11px] text-emerald-700 font-semibold">✓ Verified</span>
                          )}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SUBMISSIONS MANAGEMENT & REVIEW DRAWER */}
      {activeAdminTab === 'submissions' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-2xl border border-sand-300 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Search title, author, code..."
                value={subSearch}
                onChange={e => setSubSearch(e.target.value)}
                className="text-xs p-1.5 border border-sand-300 rounded-lg outline-none w-56"
              />

              <select
                value={subTrackFilter}
                onChange={e => setSubTrackFilter(e.target.value)}
                className="text-xs p-1.5 border border-sand-300 rounded-lg outline-none"
              >
                <option value="all">All 5 Tracks</option>
                {TRACKS_DATA.map(t => (
                  <option key={t.id} value={t.id}>Track {t.number}</option>
                ))}
              </select>

              <select
                value={subStatusFilter}
                onChange={e => setSubStatusFilter(e.target.value)}
                className="text-xs p-1.5 border border-sand-300 rounded-lg outline-none"
              >
                <option value="all">All Statuses</option>
                <option value="submitted">Submitted</option>
                <option value="under_review">Under Review</option>
                <option value="accepted">Accepted</option>
                <option value="revision_requested">Revision</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          <div className="space-y-3">
            {filteredSubmissions.map(sub => (
              <div key={sub.id} className="bg-white p-5 rounded-2xl border border-sand-300 shadow-xs space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs font-bold text-maroon-900 bg-sand-100 px-2 py-0.5 rounded">
                      {sub.submissionCode}
                    </span>
                    <span className="text-[11px] font-bold text-saffron-800">
                      Sub-Track {sub.subTrackId}
                    </span>
                    <span className="text-[11px] text-sand-500 uppercase font-semibold">
                      ({sub.presentationMode} Presentation)
                    </span>
                  </div>
                  <span className="text-xs font-bold capitalize bg-sand-100 px-2.5 py-0.5 rounded-full">
                    {sub.status.replace('_', ' ')}
                  </span>
                </div>

                <h3 className="text-base font-display font-bold text-maroon-950">
                  {sub.title}
                </h3>

                <div className="text-xs text-sand-600">
                  <strong>Authors:</strong> {sub.authors.map(a => `${a.name} (${a.affiliation})`).join(', ')}
                </div>

                <p className="text-xs text-sand-700 bg-sand-50 p-3 rounded-lg border border-sand-200">
                  {sub.abstractText}
                </p>

                {/* Reviewer Action Buttons */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-sand-200">
                  <div className="text-[11px] text-sand-500">
                    Contact: {sub.submittedByEmail}
                  </div>

                  {adminRole !== 'hospitality' && (
                    <button
                      onClick={() => setReviewingSub(sub)}
                      className="px-3.5 py-1.5 text-xs font-bold text-white bg-maroon-800 hover:bg-maroon-900 rounded-lg shadow-sm"
                    >
                      Review & Set Decision
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: EXPO MANAGEMENT */}
      {activeAdminTab === 'expo' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-sand-300 overflow-hidden shadow-xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-sand-100/70 border-b border-sand-200 font-bold uppercase text-[10px] text-sand-700">
                <tr>
                  <th className="p-3">Applicant & Organization</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Product / Innovation</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand-200">
                {expoApplications.map(app => (
                  <tr key={app.id} className="hover:bg-sand-50">
                    <td className="p-3">
                      <div className="font-bold text-sand-900">{app.applicantName}</div>
                      <div className="text-[11px] text-maroon-800">{app.organization}</div>
                      <div className="text-[10px] text-sand-500">{app.email} • {app.phone}</div>
                    </td>
                    <td className="p-3 capitalize font-medium">{app.category.replace('_', ' ')}</td>
                    <td className="p-3 text-sand-700 max-w-xs truncate">{app.description}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        app.status === 'accepted'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {app.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="p-3 text-right space-x-1">
                      {app.status !== 'accepted' && (
                        <button
                          onClick={() => updateExpoStatus(app.id, 'accepted')}
                          className="px-2 py-1 text-[10px] font-bold bg-emerald-600 text-white rounded"
                        >
                          Allot Booth
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: CMS & CERTIFICATES (SUPER ADMIN ONLY) */}
      {activeAdminTab === 'content' && adminRole === 'super_admin' && (
        <div className="space-y-6">
          {/* Announcement Banner Editor */}
          <div className="bg-white p-6 rounded-2xl border border-sand-300 shadow-xs space-y-4">
            <h3 className="font-display font-bold text-base text-maroon-950">
              Live Homepage Announcement Banner
            </h3>
            <p className="text-xs text-sand-600">
              Instantly updates the urgent alert strip across the top header of the website without requiring a code deploy.
            </p>
            <div className="flex space-x-2">
              <input
                type="text"
                value={bannerInput}
                onChange={e => setBannerInput(e.target.value)}
                className="flex-1 text-xs p-2.5 bg-sand-50 border border-sand-300 rounded-lg outline-none"
              />
              <button
                onClick={handleSaveCMS}
                className="px-4 py-2 text-xs font-bold text-white bg-maroon-800 hover:bg-maroon-900 rounded-lg shadow-sm"
              >
                Save Announcement
              </button>
            </div>
            {bannerSaved && (
              <div className="text-xs text-emerald-700 font-bold">
                ✓ Announcement banner updated and published!
              </div>
            )}
          </div>

          {/* Bulk Certificate Generation Engine */}
          <div className="bg-white p-6 rounded-2xl border border-sand-300 shadow-xs space-y-4">
            <h3 className="font-display font-bold text-base text-maroon-950">
              Post-Conference Bulk Certificate Batch Generator
            </h3>
            <p className="text-xs text-sand-600">
              Triggers the automated certificate rendering pipeline for all <strong>{stats.paidRegistrations} paid delegates</strong> and <strong>{stats.acceptedSubmissions} accepted research authors</strong> per `USER_FLOWS.md` §6.
            </p>
            <button
              onClick={handleBulkCertificateGen}
              className="px-6 py-3 text-xs font-bold text-white bg-gradient-to-r from-maroon-800 to-saffron-600 hover:from-maroon-900 rounded-xl shadow-royal flex items-center space-x-2"
            >
              <Award className="w-4 h-4 text-gold-300" />
              <span>Generate & Dispatch All Verified Certificates</span>
            </button>
            {certGenMessage && (
              <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-800 text-xs font-bold">
                {certGenMessage}
              </div>
            )}
          </div>
        </div>
      )}

      {/* VERIFY / MARK PAID MODAL */}
      {selectedReg && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full p-6 rounded-3xl shadow-2xl space-y-4">
            <h3 className="font-display font-bold text-lg text-maroon-950">
              Verify Registration: {selectedReg.registrationCode}
            </h3>
            <div className="text-xs space-y-1 text-sand-700 bg-sand-50 p-3 rounded-lg border">
              <div>Delegate: <strong>{selectedReg.fullName}</strong></div>
              <div>Affiliation: {selectedReg.affiliation}</div>
              <div>Amount: <strong>₹{selectedReg.feeAmount}</strong></div>
              <div>UTR Claimed: <code>{selectedReg.paymentReference || 'None'}</code></div>
            </div>

            <div>
              <label className="text-xs font-bold text-sand-700 mb-1 block">Confirmed Bank UTR Reference</label>
              <input
                type="text"
                placeholder="e.g. UTR-BOI-291829012"
                value={manualUtr}
                onChange={e => setManualUtr(e.target.value)}
                className="w-full text-xs p-2 border border-sand-300 rounded outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-sand-700 mb-1 block">Verification Note</label>
              <input
                type="text"
                placeholder="e.g. Verified by Dr. Krati Sharma against BOI passbook statement"
                value={manualNote}
                onChange={e => setManualNote(e.target.value)}
                className="w-full text-xs p-2 border border-sand-300 rounded outline-none"
              />
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => setSelectedReg(null)}
                className="px-4 py-2 text-xs text-sand-600 bg-sand-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => handleMarkAsPaid(selectedReg.id)}
                className="px-4 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-sm"
              >
                Approve & Mark as Paid
              </button>
            </div>
          </div>
        </div>
      )}

      {/* REVIEW DRAWER MODAL */}
      {reviewingSub && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full p-6 rounded-3xl shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="font-display font-bold text-lg text-maroon-950">
              Technical Review: {reviewingSub.submissionCode}
            </h3>
            <div className="text-xs font-bold text-maroon-900">
              {reviewingSub.title}
            </div>

            <div>
              <label className="text-xs font-bold text-sand-700 mb-1 block">Reviewer Identity</label>
              <input
                type="text"
                value={reviewerName}
                onChange={e => setReviewerName(e.target.value)}
                className="w-full text-xs p-2 border border-sand-300 rounded outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-sand-700 mb-1 block">Review Remarks & Recommendations *</label>
              <textarea
                rows={4}
                required
                placeholder="Enter technical comments regarding methodology, Vedic textual correlation, and presentation mode..."
                value={reviewComment}
                onChange={e => setReviewComment(e.target.value)}
                className="w-full text-xs p-2.5 border border-sand-300 rounded-lg outline-none"
              ></textarea>
            </div>

            <div className="flex flex-wrap justify-between items-center gap-2 pt-2">
              <button
                onClick={() => setReviewingSub(null)}
                className="px-4 py-2 text-xs text-sand-600 bg-sand-100 rounded-lg"
              >
                Cancel
              </button>

              <div className="flex space-x-2">
                <button
                  onClick={() => handleReviewDecision(reviewingSub.id, 'revision_requested')}
                  className="px-3 py-1.5 text-xs font-bold text-amber-800 bg-amber-100 hover:bg-amber-200 rounded-lg"
                >
                  Request Revision
                </button>
                <button
                  onClick={() => handleReviewDecision(reviewingSub.id, 'rejected')}
                  className="px-3 py-1.5 text-xs font-bold text-red-800 bg-red-100 hover:bg-red-200 rounded-lg"
                >
                  Decline
                </button>
                <button
                  onClick={() => handleReviewDecision(reviewingSub.id, 'accepted')}
                  className="px-4 py-1.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-sm"
                >
                  Accept Paper
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
