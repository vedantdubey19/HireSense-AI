import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const PipelineStepper = ({ activeStepOverride = null, candidates = [] }) => {
  const stepsData = [
    { title: 'Ingest' },
    { title: 'Parse' },
    { title: 'Embed' },
    { title: 'Match' },
    { title: 'Rank' }
  ];

  const shortlistedCount = candidates.length;

  const [currentStep, setCurrentStep] = useState(0);
  const [isReprojecting, setIsReprojecting] = useState(false);

  const handleReproject = () => {
    setIsReprojecting(true);
    setTimeout(() => setIsReprojecting(false), 2000);
  };

  const displayedStep = activeStepOverride !== null ? activeStepOverride : currentStep;

  useEffect(() => {
    if (activeStepOverride !== null) {
      return;
    }
    const interval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % stepsData.length);
    }, 1500);
    return () => clearInterval(interval);
  }, [activeStepOverride, stepsData.length]);

  return (
    <div className="mb-20 opacity-0 animate-[fade-up_0.8s_cubic-bezier(.16,1,.3,1)_0.3s_forwards]">
      {/* Pipeline Stepper Box */}
      <section className="border border-border bg-surface/30 rounded-2xl p-8 relative overflow-hidden mb-8 shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-3">
            <div className="w-1 h-4 bg-accent"></div>
            <span className="font-heading font-bold text-sm tracking-[2px] text-white">SCREENING PIPELINE</span>
          </div>
          <span className="bg-accent/10 border border-accent/20 text-accent font-sans font-bold text-[10px] px-3 py-1 rounded tracking-widest">LIVE</span>
        </div>

        {/* Stepper */}
        <div className="relative flex justify-between items-center max-w-4xl mx-auto mb-16 px-4">
          <div className="absolute left-8 right-8 h-0.5 bg-border top-6 -z-10"></div>
          {/* Active Line Fill */}
          <motion.div 
            className="absolute left-8 h-0.5 bg-accent top-6 -z-10"
            initial={{ width: '0%' }}
            animate={{ width: `${(displayedStep / (stepsData.length - 1)) * 100}%` }}
            transition={{ duration: 0.5 }}
            style={{ maxWidth: 'calc(100% - 4rem)' }}
          ></motion.div>

          {stepsData.map((step, idx) => {
            const isPast = idx < displayedStep;
            const isCurrent = idx === displayedStep;
            
            let nodeClass = "w-12 h-12 rounded-full flex justify-center items-center font-sans font-bold text-lg border-2 transition-all duration-300 bg-bg ";
            if (isPast) nodeClass += "bg-accent border-accent text-bg";
            else if (isCurrent) nodeClass += "bg-surface border-accent text-accent shadow-[0_0_15px_rgba(255,69,0,0.3)]";
            else nodeClass += "border-border text-white/40";

            return (
              <div key={idx} className="flex flex-col items-center gap-3">
                <div className={nodeClass}>
                  {idx + 1}
                </div>
                <div className={`font-sans text-[13px] font-bold ${isCurrent ? 'text-accent' : (isPast ? 'text-white/80' : 'text-white/40')}`}>
                  {step.title}
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats row inside the card */}
        <div className="grid grid-cols-2 lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-border border border-border rounded-xl bg-bg/50 overflow-hidden">
          {[
            { label: 'TOTAL', val: candidates.length },
            { label: 'PARSED', val: candidates.length },
            { label: 'EMBEDDED', val: candidates.length },
            { label: 'MATCHED', val: candidates.length },
            { label: 'SHORTLISTED', val: shortlistedCount }
          ].map((stat, idx) => (
            <div key={idx} className={`p-5 text-center ${idx === 4 ? 'col-span-2 lg:col-span-1' : ''}`}>
              <div className="font-heading font-extrabold text-2xl text-white mb-1.5">{stat.val}</div>
              <div className="font-sans text-[10px] uppercase font-bold text-white/40 tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>


    </div>
  );
};

export default PipelineStepper;
