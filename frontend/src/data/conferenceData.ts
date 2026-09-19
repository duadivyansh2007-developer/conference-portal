export interface SubTrack {
  id: string;
  code: string;
  title: string;
  description?: string;
}

export interface Track {
  id: string;
  number: number;
  name: string;
  sanskritName?: string;
  description: string;
  subTracks: SubTrack[];
}

export interface CommitteeMember {
  id: string;
  name: string;
  designation: string;
  affiliation: string;
  roleGroup: 'chief_patron' | 'patron' | 'chairperson' | 'convener' | 'organizing_member' | 'technical_documentation' | 'hospitality_logistics';
  photoUrl?: string;
}

export interface ResourcePerson {
  id: string;
  name: string;
  category: 'international' | 'national' | 'internal';
  affiliation: string;
  countryOrCity: string;
  topic: string;
  session: string;
  status: 'confirmed' | 'invited' | 'tbd';
  bio: string;
}

export interface ScheduleItem {
  id: string;
  day: 1 | 2;
  startTime: string;
  endTime: string;
  title: string;
  topic?: string;
  speaker?: string;
  venueOrRoom: string;
  trackCode?: string;
  type: 'keynote' | 'plenary' | 'parallel' | 'expo' | 'networking' | 'valedictory' | 'inaugural';
}

export interface ImportantDate {
  id: string;
  title: string;
  date: string;
  badge?: string;
  highlight?: boolean;
}

export interface RegistrationCategory {
  id: 'foreign_delegate' | 'faculty' | 'scholar_student';
  title: string;
  subtitle: string;
  currency: 'USD' | 'INR';
  amount: number;
  features: string[];
}

export const CONFERENCE_INFO = {
  shortTitle: "IKON 2027 / PRAKASH 2027",
  fullTitle: "International Conference on Indian Knowledge Systems (IKS)",
  proposedTitleA: "IKON2027 — Indian Knowledge Systems for Outreach and Novelty",
  proposedTitleB: "PRAKASH 2027 — Promoting Research, Advancement, and Knowledge Systems for Applied Sustainable Heritage",
  sanskritMotto: "यत्र विश्वं भवत्येकनीडम्",
  sanskritMottoMeaning: "Where the entire cosmos finds a nest together",
  tagline: "Bridging Timeless Vedic Wisdom with Contemporary Scientific & Technological Innovations",
  dates: "26–27 February 2027",
  mode: "Hybrid (In-Person & Online)",
  venue: "Department of Applied Sciences, Poornima Institute of Engineering & Technology (PIET)",
  location: "ISI-2, RIICO Institutional Area, Sitapura, Jaipur, Rajasthan 302022, India",
  organizer: "Department of Applied Sciences, PIET Jaipur",
  conveners: ["Dr. Krati Sharma", "Dr. Neetu Sharma"],
  contactEmail: "iks2027@poornima.org",
  contactPhone: "+91 98290 XXXXX / +91 94140 XXXXX",
  budgetRevenueTarget: 418000, // ₹4,18,000 budget from Proposal §13
};

export const IMPORTANT_DATES: ImportantDate[] = [
  { id: '1', title: 'Call for Abstracts Open', date: 'October 15, 2026', badge: 'Active' },
  { id: '2', title: 'Abstract Submission Deadline', date: 'December 15, 2026', badge: 'Extended', highlight: true },
  { id: '3', title: 'Notification of Acceptance', date: 'January 05, 2027' },
  { id: '4', title: 'Full Paper Submission Deadline', date: 'January 25, 2027' },
  { id: '5', title: 'Early Bird Registration Closes', date: 'January 30, 2027' },
  { id: '6', title: 'Final Registration Deadline', date: 'February 10, 2027', highlight: true },
  { id: '7', title: 'Conference Dates (Hybrid)', date: 'February 26–27, 2027', badge: 'Main Event', highlight: true },
];

export const REGISTRATION_CATEGORIES: RegistrationCategory[] = [
  {
    id: 'foreign_delegate',
    title: 'Foreign Delegate',
    subtitle: 'International Academicians, Scientists & Post-docs',
    currency: 'USD',
    amount: 200, // Proposal range: $150–$300
    features: [
      'Full access to all 5 tracks (In-Person or Virtual)',
      'Conference kit, proceedings booklet & delegate badge',
      'Entry to IKS Expo & Cultural Banquet Dinner',
      'Presentation slot (Oral/Poster) upon paper acceptance',
      'Official Certificate of Presentation & Participation',
    ]
  },
  {
    id: 'faculty',
    title: 'Indian Academician / Faculty',
    subtitle: 'Professors, Associate/Assistant Professors & Industry Professionals',
    currency: 'INR',
    amount: 2000, // Proposal §1 & §13
    features: [
      'Access to all Plenary & Parallel Technical Sessions',
      'High tea, conference lunch & working hospitality during event',
      'Presentation slot & publication consideration in partner journal',
      'Conference delegate kit & souvenir',
      'Official Certificate of Presentation / Participation',
    ]
  },
  {
    id: 'scholar_student',
    title: 'Research Scholar / Student',
    subtitle: 'PhD Scholars, Post-Graduates & Undergraduate Researchers',
    currency: 'INR',
    amount: 1000, // Proposal §1 & §13
    features: [
      'Access to all sessions & IKS Startup Expo',
      'Working lunch and high tea on both days',
      'Oral/Poster presentation opportunity',
      'Eligibility for "Best Paper / Best Poster" Cash Awards',
      'Official Certificate of Presentation / Participation',
    ]
  }
];

export const TRACKS_DATA: Track[] = [
  {
    id: 'track-1',
    number: 1,
    name: 'Scientific Heritage, Mathematics, and Technology',
    sanskritName: 'विज्ञान, गणित एवं तकनीकी परंपरा',
    description: 'Exploring ancient Indian breakthroughs in mathematics, astronomy, metallurgy, physics, and marine architecture, and their enduring foundational impact on modern global STEM.',
    subTracks: [
      { id: '1.1', code: '1.1', title: 'The Kerala School of Mathematics – Infinite Series, Calculus, and Global Legacy' },
      { id: '1.2', code: '1.2', title: 'Astronomical Observatories & Instruments: From Jantar Mantar to Surya Siddhanta' },
      { id: '1.3', code: '1.3', title: 'Ancient Indian Metallurgy & Materials Science: Wootz Steel, Zinc Smelting & Rustless Iron' },
      { id: '1.4', code: '1.4', title: 'Vedic Mathematics, Sulba Sutras, and Computational Logic for Modern AI/Algorithms' },
      { id: '1.5', code: '1.5', title: 'Maritime Architecture, Shipbuilding, and Navigational Technology in Indian Ocean Trade' },
      { id: '1.6', code: '1.6', title: 'Hydrological Systems, Stepwells (Baoris), and Indigenous Water Harvesting Engineering' },
      { id: '1.7', code: '1.7', title: 'Atomic Concepts (Paramanu) and Physical Theories in Vaisheshika and Nyaya Darshana' },
    ]
  },
  {
    id: 'track-2',
    number: 2,
    name: 'Holistic Health, Wellness, and Life Sciences',
    sanskritName: 'आयुर्वेद, योग एवं स्वास्थ्य विज्ञान',
    description: 'Translating traditional biomedical paradigms—Ayurveda, Yoga, and Siddha—into contemporary evidence-based integrative healthcare, pharmacognosy, and preventive medicine.',
    subTracks: [
      { id: '2.1', code: '2.1', title: 'Foundations of Ayurveda: Tridosha Physiology, Dhatu Metabolism, and Preventive Care' },
      { id: '2.2', code: '2.2', title: 'Pharmacognosy & Ethnobotany: Phytochemical Characterization of Traditional Medicinal Herbs' },
      { id: '2.3', code: '2.3', title: 'Neurobiology of Yoga, Pranayama, and Meditation in Mental Health & Stress Alleviation' },
      { id: '2.4', code: '2.4', title: 'Surgical Innovations and Rhinoplasty Principles in Sushruta Samhita' },
      { id: '2.5', code: '2.5', title: 'Siddha, Sowa-Rigpa, and Traditional Mineral-Herbal Formulations (Rasa Shastra)' },
      { id: '2.6', code: '2.6', title: 'Circadian Biology, Dinacharya, and Ritucharya for Modern Metabolic Health' },
      { id: '2.7', code: '2.7', title: 'Nutritional Science, Ahara-Vihara, and Functional Foods in Traditional Dietetics' },
    ]
  },
  {
    id: 'track-3',
    number: 3,
    name: 'Environmental Ethics, Sustainable Architecture, and Agriculture',
    sanskritName: 'पर्यावरण, वास्तु एवं कृषि संपदा',
    description: 'Ancient paradigms of eco-centric balance, Vrikshayurveda organic farming, passive vernacular architectural cooling, and sustainable civil engineering for climate resilience.',
    subTracks: [
      { id: '3.1', code: '3.1', title: 'Vrikshayurveda: Indigenous Organic Farming, Agro-Forestry, and Soil Ecology' },
      { id: '3.2', code: '3.2', title: 'Heritage Seed Preservation, Natural Pest Management, and Zero-Budget Natural Farming' },
      { id: '3.3', code: '3.3', title: 'Vastu Shastra and Eco-Friendly Spatial Design for Net-Zero Buildings' },
      { id: '3.4', code: '3.4', title: 'Sacred Groves, Forest Stewardship, and Biodiversity Conservation in Indic Traditions' },
      { id: '3.5', code: '3.5', title: 'Vernacular Architecture of Rajasthan: Passive Solar Cooling, Jali Screens, and Thermal Mass' },
      { id: '3.6', code: '3.6', title: 'Sustainable Civil Engineering Materials: Lime Mortars, Stone Masonry, and Terracotta' },
      { id: '3.7', code: '3.7', title: 'Environmental Ethics and Eco-Centric Cosmologies in the Vedas, Epics, and Puranas' },
    ]
  },
  {
    id: 'track-4',
    number: 4,
    name: 'Governance, Economics, Ethics, and Management',
    sanskritName: 'अर्थशास्त्र, नीति एवं प्रबंधन विचार',
    description: 'Re-evaluating Kautilyan statecraft, Shreni merchant banking, ethical stewardship (Dharma), and Indian ethos for corporate governance and resilient public administration.',
    subTracks: [
      { id: '4.1', code: '4.1', title: "Kautilya's Arthashastra: Statecraft, Geopolitics, and Strategic Defense Analysis" },
      { id: '4.2', code: '4.2', title: 'Dharma-Based Governance, Transparency, and Public Administration Ethics' },
      { id: '4.3', code: '4.3', title: 'Traditional Guilds (Shrenis), Mercantile Law, and Ancient Indian Financial Instruments (Hundi)' },
      { id: '4.4', code: '4.4', title: 'Indian Work Ethos, Nishkama Karma, and Human Values in Modern Organizational Management' },
      { id: '4.5', code: '4.5', title: 'Jurisprudence, Conflict Resolution, and Nyaya Shastra in Ancient Legal Frameworks' },
      { id: '4.6', code: '4.6', title: 'Sustainable Resource Economics, Circular Wealth Systems, and Lokasamgraha' },
      { id: '4.7', code: '4.7', title: 'Strategic Leadership Models from Ramayana, Mahabharata, and Panchatantra' },
    ]
  },
  {
    id: 'track-5',
    number: 5,
    name: 'Pedagogy, Arts, and Cultural Heritage',
    sanskritName: 'शिक्षा पद्धति, कला एवं सांस्कृतिक धरोहर',
    description: 'Operationalizing NEP 2020 pedagogical integration, ancient university paradigms, Sanskrit computational linguistics, performing arts, and digital preservation of manuscripts.',
    subTracks: [
      { id: '5.1', code: '5.1', title: 'Ancient University Pedagogies: Takshashila, Nalanda, and Vallabhi as Knowledge Hubs' },
      { id: '5.2', code: '5.2', title: 'NEP 2020 Implementation Strategies: Integrating IKS into STEM and Higher Education Curricula' },
      { id: '5.3', code: '5.3', title: 'Sanskrit as a Formal Language for Computational Linguistics, Knowledge Graphs, and NLP' },
      { id: '5.4', code: '5.4', title: 'Classical Aesthetics, Rasa Theory, and Natyashastra in Contemporary Performing Arts' },
      { id: '5.5', code: '5.5', title: 'Manuscriptology, Paleography, and AI-Driven Preservation of Ancient Palm-Leaf Inscriptions' },
      { id: '5.6', code: '5.6', title: 'Indigenous Martial Arts (Kalaripayattu), Traditional Sports, and Experiential Learning' },
      { id: '5.7', code: '5.7', title: 'Living Heritage: Traditional Handicrafts, Handloom Weaving, and Artisanal Economies' },
    ]
  }
];

export const COMMITTEE_DATA: CommitteeMember[] = [
  {
    id: 'c-1',
    name: 'Dr. S. M. Seth',
    designation: 'Chairman Emeritus, Poornima Group | Former Director, NIH Roorkee',
    affiliation: 'Poornima Group of Colleges, Jaipur',
    roleGroup: 'chief_patron'
  },
  {
    id: 'c-2',
    name: 'Ar. Shashikant Singhi',
    designation: 'Chairperson, Poornima Group',
    affiliation: 'Poornima Group of Colleges, Jaipur',
    roleGroup: 'chief_patron'
  },
  {
    id: 'c-3',
    name: 'Dr. Gautam Singh',
    designation: 'Director, Poornima Institute of Engineering & Technology (PIET)',
    affiliation: 'PIET, Jaipur',
    roleGroup: 'patron'
  },
  {
    id: 'c-4',
    name: 'Dr. Dinesh Goyal',
    designation: 'Professor & Dean, Academic Innovations',
    affiliation: 'PIET, Jaipur',
    roleGroup: 'patron'
  },
  {
    id: 'c-5',
    name: 'Dr. Sama Jain',
    designation: 'Head of Department, Applied Sciences',
    affiliation: 'PIET, Jaipur',
    roleGroup: 'chairperson'
  },
  {
    id: 'c-6',
    name: 'Dr. Krati Sharma',
    designation: 'Associate Professor, Department of Applied Sciences',
    affiliation: 'PIET, Jaipur',
    roleGroup: 'convener'
  },
  {
    id: 'c-7',
    name: 'Dr. Neetu Sharma',
    designation: 'Associate Professor, Department of Applied Sciences',
    affiliation: 'PIET, Jaipur',
    roleGroup: 'convener'
  },
  {
    id: 'c-8',
    name: 'Dr. Ritu Soryan',
    designation: 'Associate Professor, Department of Applied Sciences',
    affiliation: 'PIET, Jaipur',
    roleGroup: 'organizing_member'
  },
  {
    id: 'c-9',
    name: 'Dr. Richa Sharma',
    designation: 'Assistant Professor, Department of Applied Sciences',
    affiliation: 'PIET, Jaipur',
    roleGroup: 'organizing_member'
  },
  {
    id: 'c-10',
    name: 'Dr. Pooja Sharma',
    designation: 'Assistant Professor, Department of Applied Sciences',
    affiliation: 'PIET, Jaipur',
    roleGroup: 'organizing_member'
  },
  {
    id: 'c-11',
    name: 'Dr. Reena Gautam',
    designation: 'Associate Professor, Chemistry Section',
    affiliation: 'PIET, Jaipur',
    roleGroup: 'organizing_member'
  },
  {
    id: 'c-12',
    name: 'Dr. Deepankar Sen',
    designation: 'Associate Professor, Physics Section',
    affiliation: 'PIET, Jaipur',
    roleGroup: 'organizing_member'
  },
  {
    id: 'c-13',
    name: 'Dr. Sonu Kumar',
    designation: 'Assistant Professor, Mathematics Section',
    affiliation: 'PIET, Jaipur',
    roleGroup: 'organizing_member'
  },
  {
    id: 'c-14',
    name: 'Dr. Neetu Sharma (Lead) & Dr. Richa Sharma',
    designation: 'Technical & Publication Chairs',
    affiliation: 'Technical & Documentation Committee, PIET',
    roleGroup: 'technical_documentation'
  },
  {
    id: 'c-15',
    name: 'Student Technical Coordinators (Cyborgs Club)',
    designation: 'Web & Digital Portal Infrastructure',
    affiliation: 'PIET Technical Society',
    roleGroup: 'technical_documentation'
  },
  {
    id: 'c-16',
    name: 'Dr. Krati Sharma (Lead) & Dr. Pooja Sharma',
    designation: 'Hospitality & Travel Coordinators',
    affiliation: 'Hospitality & Logistics Committee, PIET',
    roleGroup: 'hospitality_logistics'
  }
];

export const SPEAKERS_DATA: ResourcePerson[] = [
  {
    id: 'sp-1',
    name: 'Prof. Subhash Kak',
    category: 'international',
    affiliation: 'Oklahoma State University, USA',
    countryOrCity: 'Stillwater, OK, USA',
    topic: 'Vedic Astronomy, Computational Science, and the Architecture of Consciousness',
    session: 'Inaugural Keynote Address (Day 1)',
    status: 'invited',
    bio: 'Renowned computer scientist, Regents Professor, and Padma Shri awardee whose pioneering works connect quantum theory, ancient Indian astronomy, and artificial intelligence.'
  },
  {
    id: 'sp-2',
    name: 'Prof. Michel Danino',
    category: 'international',
    affiliation: 'IIT Gandhinagar, Indian Knowledge Systems Division',
    countryOrCity: 'Gandhinagar / France',
    topic: 'Science, Technology and Sustainable Metallurgy in Ancient and Classical India',
    session: 'Plenary Session I (Day 1)',
    status: 'confirmed',
    bio: 'French-Indian author and visiting professor at IIT Gandhinagar, member of the IKS National Steering Committee, specializing in protohistory, hydrology, and ancient Indian science.'
  },
  {
    id: 'sp-3',
    name: 'Prof. M. D. Srinivas',
    category: 'national',
    affiliation: 'Centre for Policy Studies, Chennai',
    countryOrCity: 'Chennai, India',
    topic: 'The Kerala School of Mathematics: Yuktibhasa and the Birth of Infinite Series',
    session: 'Plenary Session I (Day 1)',
    status: 'confirmed',
    bio: 'Theoretical physicist and foremost historian of Indian mathematics and astronomy, author of landmark volumes on Yuktibhasa and Nilakantha Somayaji.'
  },
  {
    id: 'sp-4',
    name: 'Dr. B. Mahadevan',
    category: 'national',
    affiliation: 'Indian Institute of Management Bangalore (IIMB)',
    countryOrCity: 'Bengaluru, India',
    topic: 'Indic Paradigms of Sustainable Management, Nishkama Karma & Institutional Ethics',
    session: 'Plenary Session II (Day 2)',
    status: 'confirmed',
    bio: 'Founding member of the IKS Division (MoE), Professor of Operations Management at IIMB, author of "Introduction to Indian Knowledge Systems".'
  },
  {
    id: 'sp-5',
    name: 'Dr. Rammanohar P.',
    category: 'national',
    affiliation: 'Amrita Centre for Advanced Research in Ayurveda (ÁCARA)',
    countryOrCity: 'Kollam, Kerala',
    topic: 'Translational Ayurvedic Research: Tridosha Physiology and Modern Systems Biology',
    session: 'Track 2 Keynote (Day 1)',
    status: 'invited',
    bio: 'Pioneering researcher bridging classical Ayurvedic diagnostics with modern multi-omics and evidence-based pharmacogenomics.'
  },
  {
    id: 'sp-6',
    name: 'Dr. Gautam Singh',
    category: 'internal',
    affiliation: 'Director, PIET Jaipur',
    countryOrCity: 'Jaipur, Rajasthan',
    topic: 'Operationalizing NEP 2020: Mainstreaming IKS across Engineering & Technology Institutions',
    session: 'Panel Discussion Chair (Day 1)',
    status: 'confirmed',
    bio: 'Eminent academician and director at PIET Jaipur, championing interdisciplinary curriculum innovation and applied scientific heritage.'
  }
];

export const SCHEDULE_DATA: ScheduleItem[] = [
  // DAY 1
  {
    id: 'sch-1',
    day: 1,
    startTime: '08:30 AM',
    endTime: '09:30 AM',
    title: 'Delegate Registration, Kit Distribution & Welcome Morning Tea',
    venueOrRoom: 'Central Foyer & Registration Desk',
    type: 'networking'
  },
  {
    id: 'sch-2',
    day: 1,
    startTime: '09:30 AM',
    endTime: '11:00 AM',
    title: 'Inaugural Ceremony, Saraswati Vandana & Presidential Address',
    topic: 'Welcome by Conveners, Lamp Lighting, Keynote Address on "IKS in the 21st Century"',
    speaker: 'Prof. Subhash Kak (Virtual Keynote) & Poornima Leadership',
    venueOrRoom: 'Main Auditorium (Swami Vivekananda Hall)',
    type: 'inaugural'
  },
  {
    id: 'sch-3',
    day: 1,
    startTime: '11:00 AM',
    endTime: '11:15 AM',
    title: 'High Tea & Networking Break',
    venueOrRoom: 'Executive Dining Hall & Courtyard',
    type: 'networking'
  },
  {
    id: 'sch-4',
    day: 1,
    startTime: '11:15 AM',
    endTime: '01:00 PM',
    title: 'Plenary Session I: Indian Mathematics, Astronomy and Scientific Heritage',
    topic: 'Infinite Series in Kerala School, Jantar Mantar Observations, and Wootz Steel Metallurgy',
    speaker: 'Prof. Michel Danino & Prof. M. D. Srinivas',
    venueOrRoom: 'Main Auditorium',
    type: 'plenary'
  },
  {
    id: 'sch-5',
    day: 1,
    startTime: '01:00 PM',
    endTime: '02:00 PM',
    title: 'Networking Lunch & Poster Exhibition Viewing (Session A)',
    venueOrRoom: 'Dining Pavilion & Exhibition Hall',
    type: 'networking'
  },
  {
    id: 'sch-6',
    day: 1,
    startTime: '02:00 PM',
    endTime: '04:00 PM',
    title: 'Parallel Technical Paper Presentations: Session 1 & 2',
    topic: 'Track 1 (Scientific Heritage & Math) and Track 2 (Ayurveda, Yoga & Life Sciences)',
    venueOrRoom: 'Seminar Halls A & B (Hybrid Streaming Enabled)',
    trackCode: 'Track 1 & Track 2',
    type: 'parallel'
  },
  {
    id: 'sch-7',
    day: 1,
    startTime: '04:00 PM',
    endTime: '04:15 PM',
    title: 'Evening Tea Break',
    venueOrRoom: 'Courtyard Foyer',
    type: 'networking'
  },
  {
    id: 'sch-8',
    day: 1,
    startTime: '04:15 PM',
    endTime: '05:30 PM',
    title: 'Panel Discussion: NEP 2020 and Mainstreaming IKS in Engineering Curricula',
    topic: 'Strategies for textbooks, laboratory modules, faculty development, and funding pathways',
    speaker: 'Moderated by Dr. Gautam Singh & Panelists from AIU/UGC and ICSSR',
    venueOrRoom: 'Main Auditorium',
    type: 'keynote'
  },

  // DAY 2
  {
    id: 'sch-9',
    day: 2,
    startTime: '09:00 AM',
    endTime: '10:30 AM',
    title: 'Plenary Session II: Sustainable Architecture, Water Management & Vrikshayurveda',
    topic: 'Stepwell Engineering (Baoris), Passive Solar Buildings, and Non-Violent Natural Farming',
    speaker: 'Dr. B. Mahadevan (IIM Bangalore) & Invited Experts',
    venueOrRoom: 'Main Auditorium',
    type: 'plenary'
  },
  {
    id: 'sch-10',
    day: 2,
    startTime: '10:30 AM',
    endTime: '10:45 AM',
    title: 'Tea & Coffee Break',
    venueOrRoom: 'Foyer',
    type: 'networking'
  },
  {
    id: 'sch-11',
    day: 2,
    startTime: '10:45 AM',
    endTime: '01:00 PM',
    title: 'Parallel Technical Paper Presentations: Session 3 & 4',
    topic: 'Track 3 (Environmental Ethics & Architecture) and Track 4 (Governance, Economics & Shreni Law)',
    venueOrRoom: 'Seminar Halls A & B',
    trackCode: 'Track 3 & Track 4',
    type: 'parallel'
  },
  {
    id: 'sch-12',
    day: 2,
    startTime: '01:00 PM',
    endTime: '02:30 PM',
    title: 'IKS Startup & Innovation Expo Showcase + Networking Lunch',
    topic: 'Interactive Live Demos: Ayurvedic Formulations, Manuscript Scanning, Eco-Building Materials',
    venueOrRoom: 'PIET Innovation Center & Central Lawn',
    type: 'expo'
  },
  {
    id: 'sch-13',
    day: 2,
    startTime: '02:30 PM',
    endTime: '04:00 PM',
    title: 'Track 5 Presentations & Sanskrit Computational Linguistics Showcase',
    topic: 'Sanskrit NLP, Takshashila Pedagogies, and Cultural Heritage Preservation',
    venueOrRoom: 'Main Auditorium & Hall C',
    trackCode: 'Track 5',
    type: 'parallel'
  },
  {
    id: 'sch-14',
    day: 2,
    startTime: '04:00 PM',
    endTime: '05:15 PM',
    title: 'Valedictory Function, Best Paper Awards & Certificate Distribution',
    topic: 'Conference Summary Report, Best Oral & Poster Paper Felicitations, Formal Vote of Thanks',
    speaker: 'Chief Guest, Patron, and Conveners Dr. Krati Sharma & Dr. Neetu Sharma',
    venueOrRoom: 'Main Auditorium',
    type: 'valedictory'
  }
];

export const FUNDING_AGENCIES = [
  { name: 'ICSSR', fullName: 'Indian Council of Social Science Research', note: 'Invited Support' },
  { name: 'DST', fullName: 'Department of Science and Technology, Govt. of India', note: 'Invited Support' },
  { name: 'AIU / UGC', fullName: 'Association of Indian Universities / University Grants Commission', note: 'Invited Support' },
  { name: 'ICHR', fullName: 'Indian Council of Historical Research', note: 'Invited Support' },
  { name: 'AINRF / IKS Division', fullName: 'Anusandhan National Research Foundation / IKS Division MoE', note: 'Invited Support' },
  { name: 'Poornima Group', fullName: 'Poornima Institute of Engineering & Technology, Jaipur', note: 'Host Institution' }
];

export const FAQS = [
  {
    q: 'What is the format of the conference (Hybrid)?',
    a: 'IKON 2027 / PRAKASH 2027 operates in hybrid mode. National and local participants are warmly welcomed to attend in person at the PIET Campus in Jaipur, Rajasthan, while international delegates and distant participants can present their accepted research and attend all keynote sessions live online via our high-definition interactive streaming platform.'
  },
  {
    q: 'What is the official TA/DA policy for attendees and presenters?',
    a: 'Per official conference regulations approved by the organizing committee: "No TA/DA shall be provided to any participants." All delegates, faculty, and scholars are requested to seek travel allowances and registration funding from their respective sponsoring parent institutions.'
  },
  {
    q: 'What are the submission guidelines and word limit for abstracts?',
    a: 'Abstracts must not exceed 300 words and should clearly delineate the research objective, methodology, ancient Indian knowledge text/paradigm referenced, contemporary relevance, and preliminary findings. Up to 5 keywords must be provided.'
  },
  {
    q: 'Will accepted papers be published in a proceeding or journal?',
    a: 'All accepted and presented abstracts will be published in the official conference proceedings with an ISBN. Selected high-impact full papers will be recommended for peer-reviewed publication in Scopus/UGC CARE indexed partner journals following the journal’s standard editorial review process.'
  },
  {
    q: 'How do I pay if I am an international foreign delegate?',
    a: 'Foreign delegates paying the $200 USD registration fee can settle payment directly online through our international PayPal/Stripe checkout portal. Upon completion, an instantaneous official tax invoice and invitation letter for visa purposes will be generated.'
  },
  {
    q: 'Can I pay via direct Bank Transfer (NEFT/RTGS)?',
    a: 'Yes! If institutional policy requires direct bank remittance, you may transfer the appropriate registration fee to PIET’s official bank account and submit your UTR / Transaction Reference Number on the registration portal for committee verification.'
  }
];
