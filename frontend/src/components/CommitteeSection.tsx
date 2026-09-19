import React from 'react';
import { Shield, Award, Users } from 'lucide-react';
import { COMMITTEE_DATA } from '../data/conferenceData';

export const CommitteeSection: React.FC = () => {
  const chiefPatrons = COMMITTEE_DATA.filter(m => m.roleGroup === 'chief_patron');
  const patrons = COMMITTEE_DATA.filter(m => m.roleGroup === 'patron');
  const chairpersons = COMMITTEE_DATA.filter(m => m.roleGroup === 'chairperson');
  const conveners = COMMITTEE_DATA.filter(m => m.roleGroup === 'convener');
  const organizingMembers = COMMITTEE_DATA.filter(m => m.roleGroup === 'organizing_member');
  const techCommittee = COMMITTEE_DATA.filter(m => m.roleGroup === 'technical_documentation');
  const hospitalityCommittee = COMMITTEE_DATA.filter(m => m.roleGroup === 'hospitality_logistics');

  return (
    <div className="space-y-12 py-4">
      {/* Header Banner */}
      <div className="bg-white p-8 rounded-3xl border border-sand-300 shadow-sm text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center space-x-2 text-xs font-bold text-maroon-700 uppercase tracking-widest bg-maroon-50 px-3 py-1 rounded-full">
          <Users className="w-3.5 h-3.5" />
          <span>Governance & Leadership</span>
        </div>
        <h2 className="text-3xl font-display font-extrabold text-maroon-950">
          Organizing Committee
        </h2>
        <p className="text-xs sm:text-sm text-sand-600">
          Constitutional leadership and execution committees from Poornima Institute of Engineering & Technology (PIET) ensuring rigorous academic oversight.
        </p>
      </div>

      {/* Chief Patrons */}
      <div className="space-y-4 max-w-4xl mx-auto">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-saffron-700 bg-saffron-100/70 px-4 py-1 rounded-full border border-saffron-300">
            Chief Patrons
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {chiefPatrons.map(member => (
            <div key={member.id} className="bg-white p-6 rounded-2xl border-2 border-gold-400/40 shadow-sm text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-maroon-100 text-maroon-900 font-serif font-bold text-lg flex items-center justify-center mx-auto border border-gold-300">
                {member.name.charAt(0)}
              </div>
              <h3 className="text-lg font-display font-bold text-maroon-950">{member.name}</h3>
              <p className="text-xs text-sand-700 font-medium">{member.designation}</p>
              <div className="text-[11px] text-maroon-700 font-semibold">{member.affiliation}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Patrons & Chairperson */}
      <div className="space-y-4 max-w-5xl mx-auto">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-maroon-800 bg-maroon-50 px-4 py-1 rounded-full border border-maroon-200">
            Patrons & Conference Chairperson
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[...patrons, ...chairpersons].map(member => (
            <div key={member.id} className="bg-white p-5 rounded-2xl border border-sand-300 shadow-xs text-center space-y-1.5 hover:border-saffron-400 transition">
              <div className="text-[10px] uppercase font-bold tracking-wider text-saffron-700">
                {member.roleGroup === 'chairperson' ? 'Conference Chairperson' : 'Patron'}
              </div>
              <h3 className="text-base font-display font-bold text-maroon-950">{member.name}</h3>
              <p className="text-xs text-sand-600">{member.designation}</p>
              <div className="text-[11px] text-sand-500 font-medium">{member.affiliation}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Conveners (Highlighted) */}
      <div className="space-y-4 max-w-4xl mx-auto">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-white bg-maroon-900 px-5 py-1.5 rounded-full shadow-sm">
            Conveners & Organizing Secretaries
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {conveners.map(member => (
            <div key={member.id} className="bg-gradient-to-br from-white to-sand-50 p-6 rounded-2xl border-2 border-saffron-500/40 shadow-royal space-y-2 text-center">
              <div className="w-14 h-14 rounded-2xl bg-maroon-800 text-gold-300 font-serif font-bold text-xl flex items-center justify-center mx-auto shadow-sm">
                🪔
              </div>
              <h3 className="text-xl font-display font-bold text-maroon-950">{member.name}</h3>
              <p className="text-xs font-semibold text-saffron-700">{member.designation}</p>
              <div className="text-xs text-sand-600">{member.affiliation}</div>
              <div className="pt-2 text-[11px] text-sand-500 italic">
                Lead Coordinator for Proposal, Editorial & Funding Submissions
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Organizing Members */}
      <div className="space-y-4 max-w-5xl mx-auto">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-sand-700 bg-sand-100 px-4 py-1 rounded-full">
            Faculty Organizing Committee Members
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {organizingMembers.map(member => (
            <div key={member.id} className="bg-white p-4 rounded-xl border border-sand-300 text-center space-y-1 shadow-2xs hover:border-saffron-400 transition">
              <div className="text-xs font-display font-bold text-maroon-950">{member.name}</div>
              <div className="text-[10px] text-sand-500 leading-tight">{member.designation}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Technical & Hospitality Sub-Committees */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {/* Technical & Documentation */}
        <div className="bg-white p-6 rounded-2xl border border-sand-300 shadow-xs space-y-3">
          <div className="flex items-center space-x-2 text-maroon-900 font-display font-bold text-base border-b border-sand-200 pb-2">
            <Shield className="w-4 h-4 text-saffron-600" />
            <span>Technical & Documentation Committee</span>
          </div>
          <div className="space-y-2 text-xs text-sand-700">
            {techCommittee.map(m => (
              <div key={m.id} className="bg-sand-50 p-3 rounded-lg border border-sand-200">
                <div className="font-bold text-maroon-950">{m.name}</div>
                <div className="text-sand-600 text-[11px]">{m.designation} — {m.affiliation}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Hospitality & Logistics */}
        <div className="bg-white p-6 rounded-2xl border border-sand-300 shadow-xs space-y-3">
          <div className="flex items-center space-x-2 text-maroon-900 font-display font-bold text-base border-b border-sand-200 pb-2">
            <Award className="w-4 h-4 text-saffron-600" />
            <span>Hospitality & Logistics Committee</span>
          </div>
          <div className="space-y-2 text-xs text-sand-700">
            {hospitalityCommittee.map(m => (
              <div key={m.id} className="bg-sand-50 p-3 rounded-lg border border-sand-200">
                <div className="font-bold text-maroon-950">{m.name}</div>
                <div className="text-sand-600 text-[11px]">{m.designation} — {m.affiliation}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
