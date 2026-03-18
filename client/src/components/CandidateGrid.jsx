import React, { useState } from 'react';
import { motion } from 'framer-motion';

const CandidateGrid = ({ candidates, loading }) => {
  const [filter, setFilter] = useState('All');

  const getMatchLevel = (score) => {
    if (score >= 85) return { label: 'STRONG', color: 'text-strong bg-strong/10 border-strong/20', bar: 'bg-accent' };
    if (score >= 70) return { label: 'GOOD', color: 'text-good bg-good/10 border-good/20', bar: 'bg-good' };
    return { label: 'AVERAGE', color: 'text-white/60 bg-white/10 border-white/10', bar: 'bg-border' };
  };

  const filteredCandidates = candidates.filter((candidate) => {
    if (filter === 'All') return true;
    const match = getMatchLevel(candidate.matchScore);
    return match.label === filter.toUpperCase();
  });

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
      className="mb-20"
    >
      <div className="border border-border bg-surface/30 rounded-2xl overflow-hidden shadow-lg">
        {/* Toolbar */}
        <div className="p-6 border-b border-border bg-bg/50 flex flex-col md:flex-row gap-6 justify-between items-center">
          <div className="relative w-full md:w-2/3">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">🔍</span>
            <input 
              type="text" 
              placeholder="Search candidates, skills, companies..."
              className="w-full bg-surface border border-border rounded-lg py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-accent transition-colors"
            />
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            {['All', 'Strong', 'Good'].map((f) => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                className={`flex-1 md:flex-none px-6 py-2 rounded-md font-sans text-sm font-bold border transition-colors ${filter === f ? 'bg-accent/10 border-accent text-accent' : 'bg-transparent border-border text-white/60 hover:text-white'}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Table Header */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-8 py-4 bg-surface/20 border-b border-border font-sans text-[10px] font-bold text-white/40 uppercase tracking-widest">
          <div className="col-span-1">#</div>
          <div className="col-span-3">CANDIDATE</div>
          <div className="col-span-2">SEMANTIC SCORE</div>
          <div className="col-span-2">MATCH LEVEL</div>
          <div className="col-span-2">TOP SKILLS</div>
          <div className="col-span-1">EXP</div>
          <div className="col-span-1 text-center">ACTION</div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-border/50">
          {loading ? (
            <div className="p-16 text-center text-white/50 animate-pulse font-sans">
              [ SCANNING DATABASE ... ]
            </div>
          ) : filteredCandidates.length > 0 ? (
            filteredCandidates.map((candidate, idx) => {
              const match = getMatchLevel(candidate.matchScore);
              const initials = candidate.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
              
              // Pad index
              const indexStr = (idx + 1).toString().padStart(2, '0');
              
              return (
                <div key={candidate._id || idx} className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center px-8 py-6 hover:bg-surface/50 transition-colors group">
                  {/* # */}
                  <div className="col-span-1 font-heading font-extrabold text-accent text-lg hidden md:block group-hover:drop-shadow-[0_0_8px_rgba(255,69,0,0.5)]">
                    {indexStr}
                  </div>
                  
                  {/* Candidate */}
                  <div className="col-span-3 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent flex items-center justify-center font-heading font-bold text-accent text-sm shrink-0">
                      {initials}
                    </div>
                    <div>
                      <div className="font-heading font-extrabold text-white text-[15px] mb-0.5">{candidate.name}</div>
                      <div className="font-sans text-[11px] text-white/50">{candidate.role || 'Unspecified Role'}</div>
                    </div>
                  </div>

                  {/* Score */}
                  <div className="col-span-2 hidden md:flex items-center gap-4">
                    <span className="font-heading font-extrabold text-lg text-white w-8">{candidate.matchScore}</span>
                    <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${candidate.matchScore}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className={`h-full rounded-full ${match.bar}`}
                      ></motion.div>
                    </div>
                    <div className="w-4"></div>{/* Spacing alignment */}
                  </div>

                  {/* Match Level */}
                  <div className="col-span-2 hidden md:block">
                    <span className={`inline-block border px-2.5 py-1 rounded text-[10px] font-sans font-bold tracking-widest ${match.color}`}>
                      {match.label}
                    </span>
                  </div>

                  {/* Skills */}
                  <div className="col-span-2 hidden md:flex flex-wrap gap-2">
                    {candidate.skills && candidate.skills.slice(0, 3).map((skill, i) => (
                      <span key={i} className="bg-bg border border-border px-2 py-0.5 rounded text-[10px] font-sans text-white/70">
                        {skill}
                      </span>
                    ))}
                    {candidate.skills && candidate.skills.length > 3 && (
                      <span className="text-[10px] font-sans text-white/40 self-center">+{candidate.skills.length - 3}</span>
                    )}
                  </div>

                  {/* Exp (Mocked or real) */}
                  <div className="col-span-1 font-sans text-xs text-white/70 hidden md:block">
                    {candidate.experience || Math.floor(Math.random() * 6 + 2) + ' yrs'}
                  </div>

                  {/* Action */}
                  <div className="col-span-1 flex justify-center md:justify-end w-full md:w-auto mt-4 md:mt-0">
                    <button onClick={() => alert(`Reviewing candidate: ${candidate.name}`)} className="w-full md:w-auto px-4 py-2 border border-border rounded text-[11px] font-sans font-bold text-white/80 hover:bg-white hover:text-black transition-all hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] group-hover:border-white/40 cursor-pointer">
                      Review →
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
             <div className="p-16 text-center text-white/50 font-sans text-sm">
                No candidates matched the current filter criteria.
             </div>
          )}
        </div>
      </div>
    </motion.section>
  );
};

export default CandidateGrid;
