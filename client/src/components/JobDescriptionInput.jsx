import React, { useState } from 'react';
import { motion } from 'framer-motion';

const JobDescriptionInput = ({ onSetJob, isSetting }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (description.trim()) {
      onSetJob(title, description);
    }
  };

  return (
    <div className="mb-10 w-full text-left">
      <span className="font-sans text-accent uppercase text-sm mb-4 block font-bold tracking-[2px]">
        Target Job Profile
      </span>
      
      <motion.form 
        onSubmit={handleSubmit} 
        className="glass-card flex flex-col gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div>
          <input 
            type="text" 
            placeholder="Job Title (e.g. Senior Frontend Engineer)" 
            className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white font-sans text-sm outline-none focus:border-accent transition-colors"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <textarea 
            placeholder="Paste complete job description here..." 
            className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white font-sans text-sm min-h-[150px] outline-none focus:border-accent transition-colors resize-y"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <div className="text-right text-xs font-sans text-white/40 mt-1">
            {description.length} chars
          </div>
        </div>
        
        <div className="flex justify-end mt-2">
          <motion.button 
            type="submit" 
            disabled={isSetting || !description.trim()}
            whileHover={(!isSetting && description.trim()) ? { scale: 1.02, boxShadow: '0 0 20px rgba(123,92,255,0.6)' } : {}}
            whileTap={(!isSetting && description.trim()) ? { scale: 0.98 } : {}}
            className="bg-accent2 text-white px-6 py-2 rounded-full font-bold font-sans text-sm transition-all disabled:opacity-50"
          >
            {isSetting ? 'Generating Embedding...' : 'Set Job Description'}
          </motion.button>
        </div>
      </motion.form>
    </div>
  );
};

export default JobDescriptionInput;
