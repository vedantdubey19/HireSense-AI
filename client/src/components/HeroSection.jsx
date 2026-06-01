import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const useCounterAnimation = (targetValue, duration = 1500) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    let animationFrameId;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(ease * targetValue));

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      } else {
        setCount(targetValue);
      }
    };

    animationFrameId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animationFrameId);
  }, [targetValue, duration]);

  return count;
};

const HeroSection = ({ onRunPipeline, candidates = [] }) => {
  const total = candidates.length;
  const avgScore = candidates.length > 0 
    ? Math.round(candidates.reduce((acc, curr) => acc + curr.matchScore, 0) / candidates.length) 
    : 0;

  const animatedTotal = useCounterAnimation(total);
  const animatedAvg = useCounterAnimation(avgScore);

  return (
    <motion.section 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24"
    >
      <div className="text-left">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex items-center gap-4 text-accent uppercase tracking-widest text-[10px] mb-6 font-bold font-sans"
        >
          <div className="w-8 h-[1px] bg-accent"></div>
          SEMANTIC RECRUITMENT ENGINE V2.4
        </motion.div>
        
        <h1 className="font-heading font-extrabold text-[3.5rem] leading-[1.1] mb-8 text-white">
          <span className="bg-accent3 text-white px-2 tracking-tight">Resume</span> screening, <br/>
          <span className="text-accent italic tracking-tight">re-engineered</span> <br/>
          with AI.
        </h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-[15px] max-w-md mb-10 leading-relaxed font-sans text-white/50"
        >
          Advanced embedding-based semantic matching across 5,000+ candidate profiles. Automated ranking eliminates manual shortlisting bias — delivering your top 1% in seconds.
        </motion.p>
        
        <div className="flex gap-4">
          <motion.button 
            onClick={onRunPipeline}
            whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.1)' }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 border border-white/20 bg-transparent text-white rounded-md px-5 py-3 font-sans font-bold text-sm transition-colors cursor-pointer"
          >
            <span className="text-lg leading-none">▶</span> Run Screening
          </motion.button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {/* Stat Box 1 */}
        <div className="border border-border bg-surface/50 rounded-xl p-6 flex flex-col relative overflow-hidden">
          <div className="flex justify-between items-start mb-2">
            <span className="font-sans text-[10px] uppercase text-white/50 tracking-widest">PROFILES SCREENED</span>
            <div className="flex items-center gap-3">
              <div className="w-3 h-1 bg-accent"></div>
              <span className="bg-strong/10 text-strong px-2 py-0.5 rounded text-[10px] font-sans font-bold">+12% today</span>
            </div>
          </div>
          <div className="font-heading font-extrabold text-4xl text-white">{animatedTotal.toLocaleString()}</div>
        </div>

        {/* Stat Box 2 */}
        <div className="border border-border bg-surface/50 rounded-xl p-6 flex flex-col relative overflow-hidden">
          <div className="flex justify-between items-start mb-2">
            <span className="font-sans text-[10px] uppercase text-white/50 tracking-widest">SHORTLISTING TIME</span>
            <div className="flex items-center gap-3">
              <div className="w-3 h-1 bg-accent"></div>
              <span className="bg-strong/10 text-strong px-2 py-0.5 rounded text-[10px] font-sans font-bold">vs manual</span>
            </div>
          </div>
          <div className="font-heading font-extrabold text-4xl text-white flex items-end">
            -70<span className="text-xl text-accent">%</span>
          </div>
        </div>

        {/* Stat Box 3 */}
        <div className="border border-border bg-surface/50 rounded-xl p-6 flex flex-col relative overflow-hidden">
          <div className="flex justify-between items-start mb-2">
            <span className="font-sans text-[10px] uppercase text-white/50 tracking-widest">SEMANTIC ACCURACY</span>
            <div className="flex items-center gap-3">
              <div className="w-8 h-1 bg-accent"></div>
              <span className="bg-strong/10 text-strong px-2 py-0.5 rounded text-[10px] font-sans font-bold">↑ 3pts</span>
            </div>
          </div>
          <div className="font-heading font-extrabold text-4xl text-white flex items-end">
            {animatedAvg}<span className="text-xl text-accent">%</span>
          </div>
        </div>

        {/* Stat Box 4 */}
        <div className="border border-border bg-surface/50 rounded-xl p-6 flex flex-col relative overflow-hidden">
          <div className="flex justify-between items-start mb-2">
            <span className="font-sans text-[10px] uppercase text-white/50 tracking-widest">PIPELINE LATENCY</span>
            <div className="flex items-center gap-3">
              <span className="bg-strong/10 text-strong px-2 py-1 rounded text-[10px] font-sans font-bold leading-tight text-center">avg per<br/>profile</span>
            </div>
          </div>
          <div className="font-heading font-extrabold text-4xl text-white flex items-end">
            1.2<span className="text-xl text-accent">s</span>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
