import React, { createContext, useContext, useState, useEffect } from 'react';

export interface RegistrationRecord {
  id: string;
  registrationCode: string;
  fullName: string;
  email: string;
  phone: string;
  affiliation: string;
  department: string;
  country: string;
  category: 'foreign_delegate' | 'faculty' | 'scholar_student';
  mode: 'in_person' | 'online';
  feeAmount: number;
  feeCurrency: 'USD' | 'INR';
  dietaryNotes?: string;
  accompanyingCount: number;
  taDaAcknowledged: boolean;
  paymentGateway: 'razorpay' | 'paypal' | 'manual_bank_transfer';
  paymentReference?: string;
  status: 'pending' | 'paid' | 'cancelled';
  createdAt: string;
  receiptNumber?: string;
  adminNotes?: string;
}

export interface AuthorInfo {
  name: string;
  email: string;
  affiliation: string;
  isPresenting: boolean;
}

export interface ReviewComment {
  id: string;
  reviewerName: string;
  comment: string;
  decision?: 'accept' | 'revise' | 'reject';
  createdAt: string;
}

export interface SubmissionRecord {
  id: string;
  submissionCode: string;
  title: string;
  trackId: string;
  subTrackId: string;
  authors: AuthorInfo[];
  abstractText: string;
  keywords: string[];
  presentationMode: 'oral' | 'poster';
  status: 'submitted' | 'under_review' | 'revision_requested' | 'accepted' | 'rejected' | 'full_paper_submitted' | 'finalized';
  submittedByEmail: string;
  createdAt: string;
  updatedAt: string;
  fullPaperUrl?: string;
  fullPaperFileName?: string;
  reviews: ReviewComment[];
}

export interface ExpoApplication {
  id: string;
  applicantName: string;
  organization: string;
  email: string;
  phone: string;
  category: 'herbal_products' | 'green_building' | 'manuscript_scanning' | 'artisanal_crafts' | 'other';
  description: string;
  status: 'submitted' | 'accepted' | 'rejected';
  createdAt: string;
}

export type AdminRole = 'super_admin' | 'committee' | 'hospitality';

interface ConferenceContextType {
  // Registrations
  registrations: RegistrationRecord[];
  addRegistration: (reg: Omit<RegistrationRecord, 'id' | 'registrationCode' | 'createdAt' | 'receiptNumber'>) => RegistrationRecord;
  updateRegistrationStatus: (id: string, status: 'pending' | 'paid' | 'cancelled', note?: string, reference?: string) => void;
  getRegistrationByCode: (code: string) => RegistrationRecord | undefined;

  // Submissions
  submissions: SubmissionRecord[];
  addSubmission: (sub: Omit<SubmissionRecord, 'id' | 'submissionCode' | 'createdAt' | 'updatedAt' | 'reviews' | 'status'>) => SubmissionRecord;
  updateSubmissionStatus: (id: string, status: SubmissionRecord['status'], reviewComment?: string, reviewerName?: string) => void;
  attachFullPaper: (id: string, fileName: string) => void;
  getSubmissionByCode: (code: string) => SubmissionRecord | undefined;
  getSubmissionsByAuthor: (email: string) => SubmissionRecord[];

  // Expo Applications
  expoApplications: ExpoApplication[];
  addExpoApplication: (app: Omit<ExpoApplication, 'id' | 'createdAt' | 'status'>) => ExpoApplication;
  updateExpoStatus: (id: string, status: 'submitted' | 'accepted' | 'rejected') => void;

  // Author Session
  authorEmail: string | null;
  setAuthorEmail: (email: string | null) => void;

  // Admin Session
  adminRole: AdminRole;
  setAdminRole: (role: AdminRole) => void;
  adminLoggedIn: boolean;
  setAdminLoggedIn: (val: boolean) => void;

  // CMS Content
  announcementText: string;
  setAnnouncementText: (val: string) => void;

  // Utilities
  stats: {
    totalRegistrations: number;
    paidRegistrations: number;
    pendingRegistrations: number;
    totalRevenueINR: number;
    totalSubmissions: number;
    acceptedSubmissions: number;
    pendingReviews: number;
    expoCount: number;
  };
}

const INITIAL_REGISTRATIONS: RegistrationRecord[] = [
  {
    id: 'reg-1',
    registrationCode: 'IKON27-0042',
    fullName: 'Dr. Anandvardhan Sharma',
    email: 'anand.sharma@iitd.ac.in',
    phone: '+91 98765 43210',
    affiliation: 'Indian Institute of Technology Delhi',
    department: 'Department of Humanities and Social Sciences',
    country: 'India',
    category: 'faculty',
    mode: 'in_person',
    feeAmount: 2000,
    feeCurrency: 'INR',
    dietaryNotes: 'Vegetarian / Satvik',
    accompanyingCount: 0,
    taDaAcknowledged: true,
    paymentGateway: 'razorpay',
    paymentReference: 'pay_RZP8392019482',
    status: 'paid',
    receiptNumber: 'REC-IKON27-0042',
    createdAt: '2026-10-18T10:15:00Z',
    adminNotes: 'Online payment auto-confirmed via Razorpay webhook'
  },
  {
    id: 'reg-2',
    registrationCode: 'IKON27-0043',
    fullName: 'Prof. David R. Henderson',
    email: 'david.henderson@ox.ac.uk',
    phone: '+44 7700 900077',
    affiliation: 'University of Oxford',
    department: 'Faculty of Asian and Middle Eastern Studies',
    country: 'United Kingdom',
    category: 'foreign_delegate',
    mode: 'online',
    feeAmount: 200,
    feeCurrency: 'USD',
    dietaryNotes: 'None',
    accompanyingCount: 0,
    taDaAcknowledged: true,
    paymentGateway: 'paypal',
    paymentReference: 'PAYID-MTB92847291',
    status: 'paid',
    receiptNumber: 'REC-IKON27-0043',
    createdAt: '2026-10-19T14:30:00Z',
    adminNotes: 'Foreign delegate online participation verified'
  },
  {
    id: 'reg-3',
    registrationCode: 'IKON27-0044',
    fullName: 'Priyanka Rathore',
    email: 'priyanka.r@rajasthanuniversity.ac.in',
    phone: '+91 94140 12345',
    affiliation: 'University of Rajasthan, Jaipur',
    department: 'Department of Sanskrit & Indology',
    country: 'India',
    category: 'scholar_student',
    mode: 'in_person',
    feeAmount: 1000,
    feeCurrency: 'INR',
    dietaryNotes: 'No onion/garlic',
    accompanyingCount: 0,
    taDaAcknowledged: true,
    paymentGateway: 'manual_bank_transfer',
    paymentReference: 'NEFT-SBI-49281729012',
    status: 'pending',
    createdAt: '2026-10-21T09:00:00Z',
    adminNotes: 'Awaiting bank statement UTR cross-check'
  }
];

const INITIAL_SUBMISSIONS: SubmissionRecord[] = [
  {
    id: 'sub-1',
    submissionCode: 'SUB-0018',
    title: 'Madhava’s Infinite Series for Sine and Cosine: A Comparative Algorithmic Analysis with Modern Taylor Approximations',
    trackId: 'track-1',
    subTrackId: '1.1',
    authors: [
      { name: 'Dr. Anandvardhan Sharma', email: 'anand.sharma@iitd.ac.in', affiliation: 'IIT Delhi', isPresenting: true },
      { name: 'S. Narayanan', email: 'narayanan.s@iitd.ac.in', affiliation: 'IIT Delhi', isPresenting: false }
    ],
    abstractText: 'This study undertakes a rigorous algorithmic evaluation of the infinite series formulated by Madhava of Sangamagrama in the 14th century Kerala School of Mathematics. By examining verse fragments from Tantrasamgraha and Yuktibhasa, we demonstrate the computational efficiency of Madhava’s sine and cosine power series compared with classical Taylor series expansions. We model both approaches in Python to benchmark float-point convergence and floating-point error bounds, shedding light on the advanced analytical calculus developed in southwestern India centuries before European formalization.',
    keywords: ['Kerala School of Mathematics', 'Madhava Series', 'Yuktibhasa', 'Calculus', 'Algorithmic Efficiency'],
    presentationMode: 'oral',
    status: 'accepted',
    submittedByEmail: 'anand.sharma@iitd.ac.in',
    createdAt: '2026-10-20T11:00:00Z',
    updatedAt: '2026-10-25T16:00:00Z',
    fullPaperFileName: 'Madhava_Calculus_PIET_IKON2027.pdf',
    reviews: [
      {
        id: 'rev-1',
        reviewerName: 'Dr. Neetu Sharma',
        comment: 'Outstanding rigorous mathematical reconstruction of the Kerala school series. Accepted for Oral presentation in Track 1.',
        decision: 'accept',
        createdAt: '2026-10-25T15:45:00Z'
      }
    ]
  },
  {
    id: 'sub-2',
    submissionCode: 'SUB-0024',
    title: 'Biocompatibility and Micro-Design of Surgical Instruments in Sushruta Samhita: Metallurgical Lessons for Modern Laparoscopy',
    trackId: 'track-2',
    subTrackId: '2.4',
    authors: [
      { name: 'Dr. Meenakshi Joshi', email: 'meenakshi.joshi@aiims.edu', affiliation: 'AIIMS New Delhi', isPresenting: true }
    ],
    abstractText: 'Sushruta Samhita classifies over 120 surgical instruments (Yantras and Shastras) with defined edge sharpness (such as cutting a single human hair floating in water). This investigation analyses the historical metallurgy (high-carbon crucible iron) and ergonomic biomechanics of ancient scalpel designs. We compare force-displacement characteristics of reconstructed Sushruta-type micro-forceps with standard stainless-steel laparoscopic instruments, presenting critical insights into tissue preservation and instrument durability.',
    keywords: ['Sushruta Samhita', 'Ancient Surgery', 'Surgical Metallurgy', 'Yantras', 'Bio-mechanics'],
    presentationMode: 'oral',
    status: 'under_review',
    submittedByEmail: 'meenakshi.joshi@aiims.edu',
    createdAt: '2026-10-28T14:20:00Z',
    updatedAt: '2026-10-28T14:20:00Z',
    reviews: []
  },
  {
    id: 'sub-3',
    submissionCode: 'SUB-0031',
    title: 'Thermal Comfort and Passive Cooling in Shekhawati Havelis: Vernacular Jali Screens as Natural Climate Moderators',
    trackId: 'track-3',
    subTrackId: '3.5',
    authors: [
      { name: 'Ar. Harsh Vardhan Singh', email: 'harsh.singh@spa.ac.in', affiliation: 'School of Planning and Architecture', isPresenting: true }
    ],
    abstractText: 'Desert architecture in Rajasthan evolved highly sophisticated passive cooling strategies through the integrated use of high thermal mass stone, central courtyards, and perforated stone screens (Jalis). Using computational fluid dynamics (CFD) and on-site temperature telemetry across three 19th-century Havelis in Shekhawati, this paper demonstrates a natural 6–9°C interior temperature drop during peak summer heat without active mechanical air conditioning.',
    keywords: ['Vernacular Architecture', 'Passive Cooling', 'Jali Screens', 'Thermal Mass', 'Rajasthan'],
    presentationMode: 'poster',
    status: 'submitted',
    submittedByEmail: 'harsh.singh@spa.ac.in',
    createdAt: '2026-11-01T09:15:00Z',
    updatedAt: '2026-11-01T09:15:00Z',
    reviews: []
  }
];

const INITIAL_EXPO_APPLICATIONS: ExpoApplication[] = [
  {
    id: 'exp-1',
    applicantName: 'Vaidya Rajeshwari Dixit',
    organization: 'Dhanvantari Bio-Extracts Pvt. Ltd.',
    email: 'rajeshwari@dhanvantaribio.com',
    phone: '+91 98290 88776',
    category: 'herbal_products',
    description: 'Showcasing standardized cold-pressed medicinal oil micro-emulsions formulated from classical Ashtanga Hridaya protocols.',
    status: 'accepted',
    createdAt: '2026-10-22T12:00:00Z'
  },
  {
    id: 'exp-2',
    applicantName: 'Vikramaditya Rao',
    organization: 'LipiScan AI Technologies',
    email: 'vikram@lipiscan.ai',
    phone: '+91 97110 55443',
    category: 'manuscript_scanning',
    description: 'Portable multispectral non-invasive digital scanner specialized for fragile birch-bark and palm-leaf manuscripts with real-time OCR for Sharada and Grantha scripts.',
    status: 'accepted',
    createdAt: '2026-10-24T16:30:00Z'
  }
];

const ConferenceContext = createContext<ConferenceContextType | null>(null);

const readStoredArray = <T,>(key: string, fallback: T[]): T[] => {
  try {
    const saved = localStorage.getItem(key);
    if (!saved) return fallback;
    const parsed: unknown = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed as T[] : fallback;
  } catch {
    return fallback;
  }
};

const createPublicCode = (prefix: string): string => {
  const bytes = new Uint8Array(8);
  crypto.getRandomValues(bytes);
  const suffix = Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('').toUpperCase();
  return `${prefix}-${suffix}`;
};

const persist = (key: string, value: unknown): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage can be disabled or full; the in-memory state remains usable.
  }
};

export const ConferenceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [registrations, setRegistrations] = useState<RegistrationRecord[]>(() => {
    return readStoredArray('ikon2027_registrations', INITIAL_REGISTRATIONS);
  });

  const [submissions, setSubmissions] = useState<SubmissionRecord[]>(() => {
    return readStoredArray('ikon2027_submissions', INITIAL_SUBMISSIONS);
  });

  const [expoApplications, setExpoApplications] = useState<ExpoApplication[]>(() => {
    return readStoredArray('ikon2027_expo', INITIAL_EXPO_APPLICATIONS);
  });

  const [authorEmail, setAuthorEmail] = useState<string | null>(() => {
    try {
      return localStorage.getItem('ikon2027_author_email');
    } catch {
      return null;
    }
  });

  const [adminRole, setAdminRole] = useState<AdminRole>('super_admin');
  const [adminLoggedIn, setAdminLoggedIn] = useState<boolean>(false);
  const [announcementText, setAnnouncementText] = useState<string>(
    '📢 Call for Abstracts Extended to December 15, 2026! Submit research across 5 Tracks & 35 Sub-Themes.'
  );

  useEffect(() => {
    persist('ikon2027_registrations', registrations);
  }, [registrations]);

  useEffect(() => {
    persist('ikon2027_submissions', submissions);
  }, [submissions]);

  useEffect(() => {
    persist('ikon2027_expo', expoApplications);
  }, [expoApplications]);

  useEffect(() => {
    try {
      if (authorEmail) {
        localStorage.setItem('ikon2027_author_email', authorEmail);
      } else {
        localStorage.removeItem('ikon2027_author_email');
      }
    } catch {
      // Storage can be disabled; authentication state remains in memory.
    }
  }, [authorEmail]);

  const addRegistration = (reg: Omit<RegistrationRecord, 'id' | 'registrationCode' | 'createdAt' | 'receiptNumber'>): RegistrationRecord => {
    const code = createPublicCode('IKON27');
    const newReg: RegistrationRecord = {
      ...reg,
      id: `reg-${Date.now()}`,
      registrationCode: code,
      receiptNumber: `REC-${code}`,
      createdAt: new Date().toISOString()
    };
    setRegistrations(prev => [newReg, ...prev]);
    return newReg;
  };

  const updateRegistrationStatus = (id: string, status: 'pending' | 'paid' | 'cancelled', note?: string, reference?: string) => {
    setRegistrations(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          status,
          adminNotes: note ? `${item.adminNotes || ''} | ${note}` : item.adminNotes,
          paymentReference: reference || item.paymentReference,
          receiptNumber: status === 'paid' && !item.receiptNumber ? `REC-${item.registrationCode}` : item.receiptNumber
        };
      }
      return item;
    }));
  };

  const getRegistrationByCode = (code: string): RegistrationRecord | undefined => {
    return registrations.find(r => r.registrationCode.toUpperCase() === code.trim().toUpperCase());
  };

  const addSubmission = (sub: Omit<SubmissionRecord, 'id' | 'submissionCode' | 'createdAt' | 'updatedAt' | 'reviews' | 'status'>): SubmissionRecord => {
    const code = createPublicCode('SUB');
    const now = new Date().toISOString();
    const newSub: SubmissionRecord = {
      ...sub,
      id: `sub-${Date.now()}`,
      submissionCode: code,
      status: 'submitted',
      createdAt: now,
      updatedAt: now,
      reviews: []
    };
    setSubmissions(prev => [newSub, ...prev]);
    return newSub;
  };

  const updateSubmissionStatus = (id: string, status: SubmissionRecord['status'], reviewComment?: string, reviewerName?: string) => {
    const now = new Date().toISOString();
    setSubmissions(prev => prev.map(item => {
      if (item.id === id) {
        const decisionVal: 'accept' | 'revise' | 'reject' | undefined =
          status === 'accepted' ? 'accept' :
            status === 'revision_requested' ? 'revise' :
              status === 'rejected' ? 'reject' : undefined;

        const newReviews: ReviewComment[] = reviewComment ? [
          ...item.reviews,
          {
            id: `rev-${Date.now()}`,
            reviewerName: reviewerName || 'Committee Member',
            comment: reviewComment,
            decision: decisionVal,
            createdAt: now
          }
        ] : item.reviews;

        return {
          ...item,
          status,
          updatedAt: now,
          reviews: newReviews
        };
      }
      return item;
    }));
  };

  const attachFullPaper = (id: string, fileName: string) => {
    setSubmissions(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          fullPaperFileName: fileName,
          status: 'full_paper_submitted',
          updatedAt: new Date().toISOString()
        };
      }
      return item;
    }));
  };

  const getSubmissionByCode = (code: string): SubmissionRecord | undefined => {
    return submissions.find(s => s.submissionCode.toUpperCase() === code.trim().toUpperCase());
  };

  const getSubmissionsByAuthor = (email: string): SubmissionRecord[] => {
    return submissions.filter(s => s.submittedByEmail.toLowerCase() === email.trim().toLowerCase());
  };

  const addExpoApplication = (app: Omit<ExpoApplication, 'id' | 'createdAt' | 'status'>): ExpoApplication => {
    const newApp: ExpoApplication = {
      ...app,
      id: `exp-${Date.now()}`,
      status: 'submitted',
      createdAt: new Date().toISOString()
    };
    setExpoApplications(prev => [newApp, ...prev]);
    return newApp;
  };

  const updateExpoStatus = (id: string, status: 'submitted' | 'accepted' | 'rejected') => {
    setExpoApplications(prev => prev.map(a => a.id === id ? { ...a, status } : a));
  };

  // Compute live KPI metrics
  const totalRegistrations = registrations.length;
  const paidRegistrations = registrations.filter(r => r.status === 'paid').length;
  const pendingRegistrations = registrations.filter(r => r.status === 'pending').length;

  // Convert USD to approximate INR for aggregate tracking (e.g. $1 = ₹84)
  const totalRevenueINR = registrations
    .filter(r => r.status === 'paid')
    .reduce((acc, curr) => acc + (curr.feeCurrency === 'USD' ? curr.feeAmount * 84 : curr.feeAmount), 0);

  const totalSubmissions = submissions.length;
  const acceptedSubmissions = submissions.filter(s => s.status === 'accepted' || s.status === 'full_paper_submitted' || s.status === 'finalized').length;
  const pendingReviews = submissions.filter(s => s.status === 'submitted' || s.status === 'under_review').length;
  const expoCount = expoApplications.length;

  return (
    <ConferenceContext.Provider value={{
      registrations,
      addRegistration,
      updateRegistrationStatus,
      getRegistrationByCode,
      submissions,
      addSubmission,
      updateSubmissionStatus,
      attachFullPaper,
      getSubmissionByCode,
      getSubmissionsByAuthor,
      expoApplications,
      addExpoApplication,
      updateExpoStatus,
      authorEmail,
      setAuthorEmail,
      adminRole,
      setAdminRole,
      adminLoggedIn,
      setAdminLoggedIn,
      announcementText,
      setAnnouncementText,
      stats: {
        totalRegistrations,
        paidRegistrations,
        pendingRegistrations,
        totalRevenueINR,
        totalSubmissions,
        acceptedSubmissions,
        pendingReviews,
        expoCount
      }
    }}>
      {children}
    </ConferenceContext.Provider>
  );
};

export const useConference = () => {
  const context = useContext(ConferenceContext);
  if (!context) {
    throw new Error('useConference must be used within a ConferenceProvider');
  }
  return context;
};
