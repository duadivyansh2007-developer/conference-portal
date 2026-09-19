import React, { useState } from 'react';
import { 
  CheckCircle, ArrowRight, ArrowLeft, AlertCircle, 
  CreditCard, Printer, DollarSign, 
  QrCode, Building2, Globe
} from 'lucide-react';
import { REGISTRATION_CATEGORIES, RegistrationCategory } from '../data/conferenceData';
import { useConference, RegistrationRecord } from '../context/ConferenceStore';

interface RegistrationWizardProps {
  onClose?: () => void;
  onViewStatus?: (code: string) => void;
}

export const RegistrationWizard: React.FC<RegistrationWizardProps> = ({ onClose, onViewStatus }) => {
  const { addRegistration } = useConference();

  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [selectedCategory, setSelectedCategory] = useState<RegistrationCategory['id']>('faculty');
  const [mode, setMode] = useState<'in_person' | 'online'>('in_person');

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [affiliation, setAffiliation] = useState('');
  const [department, setDepartment] = useState('');
  const [country, setCountry] = useState('India');
  const [dietaryNotes, setDietaryNotes] = useState('Vegetarian');
  const [accompanyingCount, setAccompanyingCount] = useState(0);

  // Mandatory TA/DA Acknowledgment
  const [taDaAcknowledged, setTaDaAcknowledged] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Payment Options
  const [paymentGateway, setPaymentGateway] = useState<'razorpay' | 'paypal' | 'manual_bank_transfer'>('razorpay');
  const [bankUtrReference, setBankUtrReference] = useState('');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Completed Record
  const [completedRegistration, setCompletedRegistration] = useState<RegistrationRecord | null>(null);

  const currentCategoryObj = REGISTRATION_CATEGORIES.find(c => c.id === selectedCategory)!;

  // Auto-switch payment gateway when currency changes
  const handleCategorySelect = (catId: RegistrationCategory['id']) => {
    setSelectedCategory(catId);
    if (catId === 'foreign_delegate') {
      setPaymentGateway('paypal');
      if (country === 'India') setCountry('United States');
    } else {
      setPaymentGateway('razorpay');
      if (country !== 'India') setCountry('India');
    }
  };

  const handleStep1Submit = () => {
    setStep(2);
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone || !affiliation) {
      setErrorMessage('Please complete all required fields.');
      return;
    }
    setErrorMessage('');
    setStep(3);
  };

  const handleStep3Submit = () => {
    if (!taDaAcknowledged) {
      setErrorMessage('You must acknowledge the TA/DA policy to proceed with registration.');
      return;
    }
    setErrorMessage('');
    setStep(4);
  };

  const handleSimulatedPayment = (isOffline = false) => {
    setIsProcessingPayment(true);

    setTimeout(() => {
      setIsProcessingPayment(false);

      const isPaid = !isOffline;
      const refId = isOffline 
        ? (bankUtrReference || `UTR-OFFLINE-${Date.now()}`) 
        : paymentGateway === 'razorpay' 
          ? `pay_RZP${Math.floor(10000000 + Math.random() * 90000000)}` 
          : `PAYID-USD-${Math.floor(100000 + Math.random() * 900000)}`;

      const newReg = addRegistration({
        fullName,
        email,
        phone,
        affiliation,
        department,
        country,
        category: selectedCategory,
        mode,
        feeAmount: currentCategoryObj.amount,
        feeCurrency: currentCategoryObj.currency,
        dietaryNotes,
        accompanyingCount,
        taDaAcknowledged: true,
        paymentGateway: isOffline ? 'manual_bank_transfer' : paymentGateway,
        paymentReference: refId,
        status: isPaid ? 'paid' : 'pending',
        adminNotes: isOffline ? 'Bank transfer pending UTR verification' : 'Online transaction verified'
      });

      setCompletedRegistration(newReg);
      setStep(5);
    }, 1200);
  };

  const printReceipt = () => {
    window.print();
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-sand-300 shadow-royal overflow-hidden my-4">
      {/* Wizard Progress Bar */}
      <div className="bg-sand-100 px-6 py-4 border-b border-sand-200">
        <div className="flex items-center justify-between text-xs font-bold text-sand-600">
          <span className={step >= 1 ? 'text-maroon-800' : ''}>1. Tier & Mode</span>
          <span>→</span>
          <span className={step >= 2 ? 'text-maroon-800' : ''}>2. Delegate Details</span>
          <span>→</span>
          <span className={step >= 3 ? 'text-maroon-800' : ''}>3. TA/DA Review</span>
          <span>→</span>
          <span className={step >= 4 ? 'text-maroon-800' : ''}>4. Payment</span>
          <span>→</span>
          <span className={step === 5 ? 'text-emerald-700' : ''}>5. Confirmation</span>
        </div>
        <div className="w-full bg-sand-200 h-1.5 rounded-full mt-2 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-maroon-700 to-saffron-600 h-full transition-all duration-300"
            style={{ width: `${(step / 5) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="p-6 sm:p-10">
        {errorMessage && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* STEP 1: CATEGORY & MODE */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-2xl font-display font-bold text-maroon-950">Select Registration Tier</h2>
              <p className="text-xs text-sand-600">Official fees determined by Department of Applied Sciences, PIET.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {REGISTRATION_CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <div
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat.id)}
                    className={`p-5 rounded-2xl border-2 cursor-pointer transition flex flex-col justify-between ${
                      isSelected
                        ? 'border-maroon-800 bg-maroon-50/50 shadow-sm'
                        : 'border-sand-300 hover:border-saffron-400 bg-white'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase text-maroon-800 tracking-wider">
                          {cat.currency}
                        </span>
                        {isSelected && <CheckCircle className="w-4 h-4 text-maroon-800" />}
                      </div>
                      <div className="text-xl font-display font-extrabold text-maroon-950 mt-1">
                        {cat.title}
                      </div>
                      <div className="text-2xl font-black text-saffron-700 mt-2 font-mono">
                        {cat.currency === 'USD' ? `$${cat.amount}` : `₹${cat.amount.toLocaleString()}`}
                      </div>
                      <p className="text-[11px] text-sand-600 mt-1">{cat.subtitle}</p>
                    </div>

                    <ul className="text-[11px] text-sand-700 mt-4 space-y-1 pt-3 border-t border-sand-200/80">
                      {cat.features.slice(0, 3).map((f, i) => (
                        <li key={i} className="flex items-start space-x-1">
                          <span className="text-saffron-600 font-bold">✓</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>

            {/* Attendance Mode */}
            <div className="pt-4 border-t border-sand-200 space-y-2">
              <label className="text-xs font-bold text-sand-800 uppercase tracking-wider block">
                Participation Mode
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div
                  onClick={() => setMode('in_person')}
                  className={`p-4 rounded-xl border cursor-pointer flex items-center space-x-3 ${
                    mode === 'in_person'
                      ? 'border-maroon-800 bg-sand-100 font-bold text-maroon-950'
                      : 'border-sand-300 text-sand-700'
                  }`}
                >
                  <Building2 className="w-5 h-5 text-saffron-600" />
                  <div className="text-xs">
                    <div>In-Person Attendance</div>
                    <div className="text-[10px] text-sand-500 font-normal">PIET Campus, Jaipur, Rajasthan</div>
                  </div>
                </div>

                <div
                  onClick={() => setMode('online')}
                  className={`p-4 rounded-xl border cursor-pointer flex items-center space-x-3 ${
                    mode === 'online'
                      ? 'border-maroon-800 bg-sand-100 font-bold text-maroon-950'
                      : 'border-sand-300 text-sand-700'
                  }`}
                >
                  <Globe className="w-5 h-5 text-maroon-700" />
                  <div className="text-xs">
                    <div>Virtual / Online Participation</div>
                    <div className="text-[10px] text-sand-500 font-normal">High-definition Zoom/Webex live access</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={handleStep1Submit}
                className="px-6 py-3 text-sm font-bold text-white bg-maroon-800 hover:bg-maroon-900 rounded-xl shadow-royal flex items-center space-x-2"
              >
                <span>Continue to Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: DELEGATE DETAILS FORM */}
        {step === 2 && (
          <form onSubmit={handleStep2Submit} className="space-y-4">
            <div className="space-y-1">
              <h2 className="text-2xl font-display font-bold text-maroon-950">Delegate Contact & Affiliation</h2>
              <p className="text-xs text-sand-600">Information used for delegate badge, conference kit, and official certificate.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-sand-700 mb-1 block">Full Name (with Title) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Rajesh K. Varma"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  className="w-full text-xs p-2.5 bg-white border border-sand-300 rounded-lg focus:ring-2 focus:ring-saffron-500 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-sand-700 mb-1 block">Email Address (for receipt & certificate) *</label>
                <input
                  type="email"
                  required
                  placeholder="rajesh.varma@university.edu"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full text-xs p-2.5 bg-white border border-sand-300 rounded-lg focus:ring-2 focus:ring-saffron-500 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-sand-700 mb-1 block">Phone / WhatsApp Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98290 12345"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full text-xs p-2.5 bg-white border border-sand-300 rounded-lg focus:ring-2 focus:ring-saffron-500 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-sand-700 mb-1 block">Affiliation / University / Institution *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Banaras Hindu University / IIT Roorkee"
                  value={affiliation}
                  onChange={e => setAffiliation(e.target.value)}
                  className="w-full text-xs p-2.5 bg-white border border-sand-300 rounded-lg focus:ring-2 focus:ring-saffron-500 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-sand-700 mb-1 block">Department / Center</label>
                <input
                  type="text"
                  placeholder="e.g. Department of Physics / IKS Center"
                  value={department}
                  onChange={e => setDepartment(e.target.value)}
                  className="w-full text-xs p-2.5 bg-white border border-sand-300 rounded-lg focus:ring-2 focus:ring-saffron-500 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-sand-700 mb-1 block">Country</label>
                <input
                  type="text"
                  value={country}
                  onChange={e => setCountry(e.target.value)}
                  className="w-full text-xs p-2.5 bg-white border border-sand-300 rounded-lg focus:ring-2 focus:ring-saffron-500 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-sand-700 mb-1 block">Dietary Preference (In-person)</label>
                <select
                  value={dietaryNotes}
                  onChange={e => setDietaryNotes(e.target.value)}
                  className="w-full text-xs p-2.5 bg-white border border-sand-300 rounded-lg focus:ring-2 focus:ring-saffron-500 outline-none"
                >
                  <option value="Vegetarian">Standard Indian Vegetarian</option>
                  <option value="Jain / Satvik">Jain / Satvik (No onion / garlic)</option>
                  <option value="Vegan">Vegan</option>
                  <option value="Special">Other / Gluten-free</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-sand-700 mb-1 block">Accompanying Persons (if any)</label>
                <input
                  type="number"
                  min="0"
                  max="4"
                  value={accompanyingCount}
                  onChange={e => setAccompanyingCount(parseInt(e.target.value) || 0)}
                  className="w-full text-xs p-2.5 bg-white border border-sand-300 rounded-lg focus:ring-2 focus:ring-saffron-500 outline-none"
                />
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-sand-200">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2.5 text-xs font-semibold text-sand-700 hover:text-maroon-800 flex items-center space-x-1"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="submit"
                className="px-6 py-3 text-sm font-bold text-white bg-maroon-800 hover:bg-maroon-900 rounded-xl shadow-royal flex items-center space-x-2"
              >
                <span>Review & TA/DA Notice</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: TA/DA ACKNOWLEDGMENT & REVIEW */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-2xl font-display font-bold text-maroon-950">Review Details & Policies</h2>
              <p className="text-xs text-sand-600">Please review registration details and acknowledge the non-negotiable TA/DA policy.</p>
            </div>

            {/* Summary Box */}
            <div className="bg-sand-50 p-5 rounded-2xl border border-sand-200 space-y-3 text-xs">
              <div className="flex justify-between border-b border-sand-200 pb-2">
                <span className="text-sand-600">Category & Fee:</span>
                <span className="font-bold text-maroon-950">
                  {currentCategoryObj.title} ({currentCategoryObj.currency === 'USD' ? `$${currentCategoryObj.amount}` : `₹${currentCategoryObj.amount.toLocaleString()}`})
                </span>
              </div>
              <div className="flex justify-between border-b border-sand-200 pb-2">
                <span className="text-sand-600">Attendance Mode:</span>
                <span className="font-bold capitalize">{mode.replace('_', ' ')}</span>
              </div>
              <div className="flex justify-between border-b border-sand-200 pb-2">
                <span className="text-sand-600">Delegate:</span>
                <span className="font-bold">{fullName} ({email})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sand-600">Institution:</span>
                <span className="font-bold">{affiliation}</span>
              </div>
            </div>

            {/* MANDATORY TA/DA POLICY BOX */}
            <div className="p-5 rounded-2xl bg-amber-50/90 border-2 border-amber-300 space-y-3">
              <div className="flex items-center space-x-2 text-amber-900 font-bold text-sm">
                <AlertCircle className="w-5 h-5 text-amber-700" />
                <span>Mandatory Official Policy Notification</span>
              </div>
              <p className="text-xs text-amber-900 leading-relaxed">
                Per official conference regulations sanctioned by the Department of Applied Sciences, PIET Jaipur (Proposal §1):
              </p>
              <div className="bg-white/80 p-3 rounded-xl border border-amber-200 font-serif italic text-xs font-bold text-maroon-950">
                "No TA/DA shall be provided to any participants."
              </div>
              <p className="text-[11px] text-amber-800">
                All delegates, research scholars, and faculty members are advised to claim registration fees and travel arrangements from their respective parent universities, R&D institutes, or TEQIP/sponsoring schemes.
              </p>

              <label className="flex items-start space-x-3 pt-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={taDaAcknowledged}
                  onChange={e => setTaDaAcknowledged(e.target.checked)}
                  className="mt-0.5 w-4 h-4 text-maroon-800 border-amber-400 rounded focus:ring-maroon-600"
                />
                <span className="text-xs font-bold text-maroon-950">
                  I understand, acknowledge and agree that No TA/DA will be provided by PIET for attending this conference.
                </span>
              </label>
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-sand-200">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-4 py-2.5 text-xs font-semibold text-sand-700 hover:text-maroon-800 flex items-center space-x-1"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="button"
                disabled={!taDaAcknowledged}
                onClick={handleStep3Submit}
                className={`px-6 py-3 text-sm font-bold text-white rounded-xl shadow-royal flex items-center space-x-2 transition ${
                  taDaAcknowledged
                    ? 'bg-maroon-800 hover:bg-maroon-900'
                    : 'bg-sand-400 cursor-not-allowed'
                }`}
              >
                <span>Proceed to Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: PAYMENT SELECTION & SIMULATION */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-2xl font-display font-bold text-maroon-950">Secure Payment Gateway</h2>
              <p className="text-xs text-sand-600">
                Amount Payable: <strong className="text-maroon-900 text-sm font-mono">{currentCategoryObj.currency === 'USD' ? `$${currentCategoryObj.amount}` : `₹${currentCategoryObj.amount.toLocaleString()}`}</strong>
              </p>
            </div>

            {/* Gateway Options */}
            <div className="space-y-3">
              {currentCategoryObj.currency === 'INR' ? (
                <div 
                  onClick={() => setPaymentGateway('razorpay')}
                  className={`p-4 rounded-2xl border-2 cursor-pointer flex items-center justify-between ${
                    paymentGateway === 'razorpay'
                      ? 'border-saffron-600 bg-saffron-50/50'
                      : 'border-sand-300 bg-white'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <CreditCard className="w-6 h-6 text-saffron-600" />
                    <div>
                      <div className="text-xs font-bold text-sand-900">Razorpay Online Gateway (UPI / Cards / Netbanking)</div>
                      <div className="text-[11px] text-sand-500">Instant confirmation, auto-generated receipt with GST compliance</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-saffron-700 font-mono">₹{currentCategoryObj.amount}</span>
                </div>
              ) : (
                <div 
                  onClick={() => setPaymentGateway('paypal')}
                  className={`p-4 rounded-2xl border-2 cursor-pointer flex items-center justify-between ${
                    paymentGateway === 'paypal'
                      ? 'border-saffron-600 bg-saffron-50/50'
                      : 'border-sand-300 bg-white'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <DollarSign className="w-6 h-6 text-blue-600" />
                    <div>
                      <div className="text-xs font-bold text-sand-900">PayPal / International Stripe Checkout (USD)</div>
                      <div className="text-[11px] text-sand-500">Secure international credit/debit card settlement for foreign delegates</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-blue-700 font-mono">${currentCategoryObj.amount}</span>
                </div>
              )}

              {/* Offline Bank Transfer Option */}
              <div 
                onClick={() => setPaymentGateway('manual_bank_transfer')}
                className={`p-4 rounded-2xl border-2 cursor-pointer flex items-center justify-between ${
                  paymentGateway === 'manual_bank_transfer'
                    ? 'border-maroon-700 bg-maroon-50/50'
                    : 'border-sand-300 bg-white'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Building2 className="w-6 h-6 text-maroon-700" />
                  <div>
                    <div className="text-xs font-bold text-sand-900">Direct Bank Transfer (NEFT / RTGS / IMPS)</div>
                    <div className="text-[11px] text-sand-500">PIET institutional bank account with manual UTR submission</div>
                  </div>
                </div>
                <span className="text-xs font-bold text-sand-700">Bank UTR</span>
              </div>
            </div>

            {/* Offline Bank Transfer Details Details */}
            {paymentGateway === 'manual_bank_transfer' && (
              <div className="bg-sand-50 p-4 rounded-2xl border border-sand-300 space-y-3 text-xs">
                <div className="font-bold text-maroon-900 uppercase tracking-wider text-[11px]">
                  Official Bank Account Details (PIET Jaipur)
                </div>
                <div className="grid grid-cols-2 gap-2 text-sand-700 font-mono text-[11px]">
                  <div>Account Name: <strong>Poornima Institute of Engg. & Tech.</strong></div>
                  <div>Bank Name: <strong>Bank of India</strong></div>
                  <div>Account No.: <strong>66541011000XXXX</strong></div>
                  <div>IFSC Code: <strong>BKID0006654</strong></div>
                  <div>Branch: <strong>Sitapura Industrial Area, Jaipur</strong></div>
                  <div>SWIFT Code (USD): <strong>BKIDINBBJAI</strong></div>
                </div>

                <div className="pt-2">
                  <label className="text-xs font-bold text-sand-800 mb-1 block">
                    Enter Bank UTR / Transaction Reference Number *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. UTR-20261102948271"
                    value={bankUtrReference}
                    onChange={e => setBankUtrReference(e.target.value)}
                    className="w-full text-xs p-2.5 bg-white border border-sand-300 rounded-lg focus:ring-2 focus:ring-saffron-500 outline-none font-mono"
                  />
                  <span className="text-[10px] text-sand-500 mt-1 block">
                    A committee admin will cross-reference this UTR with bank statements before approving the status to Paid.
                  </span>
                </div>
              </div>
            )}

            <div className="pt-4 flex items-center justify-between border-t border-sand-200">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-4 py-2.5 text-xs font-semibold text-sand-700 hover:text-maroon-800 flex items-center space-x-1"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="button"
                disabled={isProcessingPayment}
                onClick={() => handleSimulatedPayment(paymentGateway === 'manual_bank_transfer')}
                className="px-8 py-3 text-sm font-bold text-white bg-gradient-to-r from-maroon-700 to-saffron-600 hover:from-maroon-800 hover:to-saffron-700 rounded-xl shadow-royal flex items-center space-x-2"
              >
                {isProcessingPayment ? (
                  <span>Processing Checkout...</span>
                ) : paymentGateway === 'manual_bank_transfer' ? (
                  <span>Submit Bank UTR</span>
                ) : (
                  <span>Pay Now ({currentCategoryObj.currency === 'USD' ? `$${currentCategoryObj.amount}` : `₹${currentCategoryObj.amount}`})</span>
                )}
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: CONFIRMATION & PRINTABLE RECEIPT */}
        {step === 5 && completedRegistration && (
          <div className="space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <h2 className="text-3xl font-display font-extrabold text-maroon-950">
                Registration Successful!
              </h2>
              <p className="text-xs sm:text-sm text-sand-600">
                Welcome to IKON 2027 / PRAKASH 2027. Your registration has been logged in the conference records.
              </p>
            </div>

            {/* Registration Code Badge */}
            <div className="inline-block bg-sand-100 border-2 border-saffron-500/50 p-4 rounded-2xl shadow-xs">
              <div className="text-[10px] uppercase tracking-wider font-bold text-sand-500">Your Official Registration Code</div>
              <div className="text-2xl sm:text-3xl font-mono font-black text-maroon-900 tracking-wider">
                {completedRegistration.registrationCode}
              </div>
              <div className="text-[11px] text-emerald-800 font-bold mt-1">
                Status: {completedRegistration.status === 'paid' ? 'PAID (Verified)' : 'PENDING (Awaiting Bank UTR Review)'}
              </div>
            </div>

            {/* Printable Receipt Card */}
            <div id="printable-receipt" className="text-left bg-white p-6 rounded-2xl border border-sand-300 shadow-sm space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-sand-200 pb-3">
                <div>
                  <div className="font-display font-bold text-maroon-950 text-base">
                    IKON 2027 / PRAKASH 2027
                  </div>
                  <div className="text-[10px] text-sand-500">
                    Dept. of Applied Sciences, PIET Jaipur, Rajasthan
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-xs font-bold text-sand-800">
                    {completedRegistration.receiptNumber}
                  </div>
                  <div className="text-[10px] text-sand-500">
                    Date: {new Date(completedRegistration.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-sand-500 block text-[10px]">Delegate Name</span>
                  <span className="font-bold text-sand-900">{completedRegistration.fullName}</span>
                </div>
                <div>
                  <span className="text-sand-500 block text-[10px]">Affiliation</span>
                  <span className="font-bold text-sand-900">{completedRegistration.affiliation}</span>
                </div>
                <div>
                  <span className="text-sand-500 block text-[10px]">Category & Mode</span>
                  <span className="font-bold text-sand-900 capitalize">
                    {completedRegistration.category.replace('_', ' ')} • {completedRegistration.mode}
                  </span>
                </div>
                <div>
                  <span className="text-sand-500 block text-[10px]">Amount Paid</span>
                  <span className="font-bold font-mono text-saffron-700">
                    {completedRegistration.feeCurrency === 'USD' ? `$${completedRegistration.feeAmount}` : `₹${completedRegistration.feeAmount.toLocaleString()}`}
                  </span>
                </div>
                <div className="col-span-2">
                  <span className="text-sand-500 block text-[10px]">Payment Reference</span>
                  <span className="font-mono text-[11px] text-sand-800">{completedRegistration.paymentReference}</span>
                </div>
              </div>

              <div className="bg-sand-50 p-3 rounded-lg text-[10px] text-sand-600 border border-sand-200">
                Note: No TA/DA will be provided to participants per conference policy. Please present this registration code at the registration desk for delegate kit and badge collection.
              </div>
            </div>

            {/* Receipt Actions */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={printReceipt}
                className="px-4 py-2.5 text-xs font-bold text-sand-800 bg-sand-100 hover:bg-sand-200 border border-sand-300 rounded-xl transition flex items-center space-x-1.5"
              >
                <Printer className="w-4 h-4 text-sand-700" />
                <span>Print Official Receipt</span>
              </button>

              <button
                onClick={() => onViewStatus?.(completedRegistration.registrationCode)}
                className="px-4 py-2.5 text-xs font-bold text-maroon-800 bg-saffron-100 hover:bg-saffron-200 border border-saffron-300 rounded-xl transition flex items-center space-x-1.5"
              >
                <QrCode className="w-4 h-4" />
                <span>Check Status Tracker</span>
              </button>

              {onClose && (
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 text-xs font-bold text-white bg-maroon-900 hover:bg-maroon-800 rounded-xl"
                >
                  Return to Home
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
