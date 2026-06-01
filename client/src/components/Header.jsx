import React from 'react';
import { motion } from 'framer-motion';

const Header = ({ isActive, onScrollTo, onNewRole }) => {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col md:flex-row justify-between items-center mb-16 pb-4 border-b border-white/5 gap-4"
    >
      <div className="flex flex-col items-start cursor-pointer" onClick={() => onScrollTo && onScrollTo('dashboard')}>
        <h3 className="font-heading font-extrabold text-2xl m-0 text-white tracking-tight">
          hire<span className="text-accent">sense</span>.ai
        </h3>
        <span className="bg-accent text-white px-1.5 py-0.5 mt-1 text-[10px] uppercase font-bold rounded-sm tracking-wider">
          ENGINE
        </span>
      </div>

      <nav className="flex gap-8 text-sm font-sans text-white/60">
        <span onClick={() => onScrollTo && onScrollTo('dashboard')} className="text-white border-b-2 border-accent pb-1 cursor-pointer transition-colors">Dashboard</span>
        <span onClick={() => onScrollTo && onScrollTo('pipeline')} className="cursor-pointer hover:text-white transition-colors">Pipeline</span>
      </nav>

      <div className="flex gap-4 items-center">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-sm border ${isActive ? 'border-strong/20 bg-strong/10 text-strong' : 'border-red-500/20 bg-red-500/10 text-red-500'} text-xs font-sans font-bold cursor-pointer uppercase tracking-wider`}
        >
          <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-strong shadow-[0_0_8px_#10b981] animate-blink' : 'bg-red-500'}`}></div>
          {isActive ? 'PIPELINE ACTIVE' : 'OFFLINE'}
        </motion.div>
        <button onClick={onNewRole} className="text-white/40 border border-white/10 px-3 py-1.5 rounded-sm font-sans text-xs uppercase tracking-wider hover:bg-white/5 transition-colors cursor-pointer">
          + New Role
        </button>
      </div>
    </motion.header>
  );
};

export default Header;
