import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Award, Briefcase, FileText, CheckCircle2 } from 'lucide-react';

const CandidateModal = ({ candidate, isOpen, onClose }) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !candidate) return null;

  const matchLevel = candidate.matchScore >= 85 ? 'STRONG' : candidate.matchScore >= 70 ? 'GOOD' : 'AVERAGE';
  const matchColor = candidate.matchScore >= 85 ? 'text-strong' : candidate.matchScore >= 70 ? 'text-good' : 'text-white/60';
  const barColor = candidate.matchScore >= 85 ? 'bg-accent' : candidate.matchScore >= 70 ? 'bg-good' : 'bg-border';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-surface border border-border rounded-2xl shadow-2xl custom-scrollbar"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 z-10 flex items-start justify-between p-6 border-b bg-surface/90 backdrop-blur border-border">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 text-xl font-bold rounded-full bg-accent/10 border border-accent text-accent font-heading">
                {candidate.name.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <h2 className="text-2xl font-extrabold text-white font-heading">{candidate.name}</h2>
                <div className="flex items-center gap-2 mt-1 text-sm text-white/50 font-sans">
                  <Briefcase className="w-4 h-4" />
                  <span>{candidate.experience || 'Experience Not Listed'}</span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 transition-colors rounded-full text-white/50 hover:bg-white/10 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-8">
            
            {/* ATS Score Section */}
            <div className="p-6 border rounded-xl bg-bg/50 border-border">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-white/70 font-sans font-medium">
                  <Award className="w-5 h-5 text-accent" />
                  ATS Match Score
                </div>
                <span className={`px-3 py-1 text-xs font-bold tracking-widest rounded border ${matchColor} border-current/20 bg-current/10 font-sans`}>
                  {matchLevel}
                </span>
              </div>
              <div className="flex items-end gap-4 mb-2">
                <span className="text-5xl font-extrabold text-white font-heading">{candidate.matchScore}</span>
                <span className="pb-1 text-white/40 font-sans">/ 100</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-border mt-4">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${candidate.matchScore}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className={`h-full rounded-full ${barColor}`}
                />
              </div>
            </div>

            {/* Extracted Skills */}
            {candidate.skills && candidate.skills.length > 0 && (
              <div>
                <h3 className="flex items-center gap-2 mb-4 text-sm font-bold tracking-wider text-white/40 uppercase font-sans">
                  <CheckCircle2 className="w-4 h-4" /> Extracted Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {candidate.skills.map((skill, i) => (
                    <span key={i} className="px-3 py-1.5 text-sm rounded bg-accent/10 border border-accent/20 text-white font-sans transition-colors hover:bg-accent/20">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Resume Snippet */}
            {candidate.snippet && (
              <div>
                <h3 className="flex items-center gap-2 mb-4 text-sm font-bold tracking-wider text-white/40 uppercase font-sans">
                  <FileText className="w-4 h-4" /> Resume Excerpt
                </h3>
                <div className="p-5 text-sm leading-relaxed border rounded-xl bg-bg border-border text-white/80 font-sans italic">
                  "{candidate.snippet}..."
                </div>
              </div>
            )}

          </div>
          
          {/* Footer Action */}
          <div className="p-6 border-t bg-surface/50 border-border flex justify-end">
             <button onClick={onClose} className="px-6 py-2.5 bg-accent text-white font-sans font-bold rounded hover:bg-accent/80 transition-colors">
               Close Profile
             </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CandidateModal;
