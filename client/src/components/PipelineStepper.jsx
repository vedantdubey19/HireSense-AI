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

  const shortlistedCount = candidates.length > 0 ? candidates.length : 312;

  const [currentStep, setCurrentStep] = useState(0);
  const [isReprojecting, setIsReprojecting] = useState(false);

  const handleReproject = () => {
    setIsReprojecting(true);
    setTimeout(() => setIsReprojecting(false), 2000);
  };

  useEffect(() => {
    if (activeStepOverride !== null) {
      setCurrentStep(activeStepOverride);
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
            animate={{ width: `${(currentStep / (stepsData.length - 1)) * 100}%` }}
            transition={{ duration: 0.5 }}
            style={{ maxWidth: 'calc(100% - 4rem)' }}
          ></motion.div>

          {stepsData.map((step, idx) => {
            const isPast = idx < currentStep;
            const isCurrent = idx === currentStep;
            
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
            { label: 'TOTAL', val: '5,247' },
            { label: 'PARSED', val: '4,891' },
            { label: 'EMBEDDED', val: '4,891' },
            { label: 'MATCHED', val: '1,043' },
            { label: 'SHORTLISTED', val: shortlistedCount }
          ].map((stat, idx) => (
            <div key={idx} className={`p-5 text-center ${idx === 4 ? 'col-span-2 lg:col-span-1' : ''}`}>
              <div className="font-heading font-extrabold text-2xl text-white mb-1.5">{stat.val}</div>
              <div className="font-sans text-[10px] uppercase font-bold text-white/40 tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Semantic Embedding Space Placeholder */}
      <section className="border border-border bg-surface/30 rounded-2xl p-8 relative overflow-hidden shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="w-1 h-4 bg-accent2"></div>
            <span className="font-heading font-bold text-sm tracking-[2px] text-white">SEMANTIC EMBEDDING SPACE</span>
          </div>
          <span 
            onClick={handleReproject}
            className={`text-white/40 font-sans font-bold text-[10px] px-3 py-1 border border-border rounded tracking-widest cursor-pointer hover:bg-white/5 transition-colors flex items-center gap-1 ${isReprojecting ? 'opacity-50 pointer-events-none' : ''}`}
          >
            <span className={isReprojecting ? "animate-spin" : ""}>↻</span> {isReprojecting ? 'Reprojecting...' : 'Reproject'}
          </span>
        </div>
        
        <div className="font-sans text-xs text-white/50 mb-6">
          t-SNE projection • 768-dim vectors • cosine similarity
        </div>
        
        <div className="h-[280px] border border-border bg-bg/50 rounded-xl relative overflow-hidden flex items-center justify-center group">
          {/* Subtle concentric circles for radar/projection effect */}
          <div className={`absolute border border-border/50 rounded-full w-[100px] h-[100px] ${isReprojecting ? 'animate-pulse' : ''}`}></div>
          <div className={`absolute border border-border/50 rounded-full w-[200px] h-[200px] ${isReprojecting ? 'animate-pulse delay-75' : ''}`}></div>
          <div className={`absolute border border-border/50 rounded-full w-[350px] h-[350px] ${isReprojecting ? 'animate-pulse delay-150' : ''}`}></div>
          
          <div className="absolute w-2 h-2 rounded-full bg-accent top-1/2 left-[40%]"></div>
          <div className="absolute w-2 h-2 rounded-full bg-accent top-[45%] left-[55%]"></div>
          <div className="absolute w-2 h-2 rounded-full bg-accent top-[60%] left-[45%]"></div>
          
          <div className="absolute w-2 h-2 rounded-full bg-good top-[30%] left-[30%]"></div>
          <div className="absolute w-2 h-2 rounded-full bg-good top-[40%] left-[65%]"></div>
          
          <div className="absolute w-1.5 h-1.5 rounded-full bg-border top-[20%] left-[70%]"></div>
          <div className="absolute w-1.5 h-1.5 rounded-full bg-border top-[75%] left-[35%]"></div>
          
          <div className="absolute w-3 h-3 bg-strong top-[48%] left-[48%] z-10 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-bg/50 to-transparent pointer-events-none"></div>
          <span className="text-white/10 font-sans italic absolute inset-0 flex items-center justify-center pointer-events-none select-none">[ Visualization Interface ]</span>
        </div>
        
        <div className="flex flex-wrap gap-x-6 gap-y-3 mt-5 font-sans text-[10px] font-bold text-white/60 uppercase tracking-wider">
          <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-accent"></div>Strong match (&gt;85)</div>
          <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-good"></div>Good match (70-85)</div>
          <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-white/20"></div>Ranked</div>
          <div className="flex items-center gap-2"><div className="w-2 h-2 bg-strong"></div>Job centroid</div>
        </div>
      </section>
    </div>
  );
};

export default PipelineStepper;
