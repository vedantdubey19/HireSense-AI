import React from 'react';

const TechStack = () => {
  const techs = [
    { name: 'React', color: '#3b82f6' },
    { name: 'Node.js', color: '#10b981' },
    { name: 'Express', color: '#f59e0b' },
    { name: 'MongoDB', color: '#10b981' },
    { name: 'Docker', color: '#06b6d4' },
    { name: 'NLP Embeddings', color: '#8b5cf6' },
    { name: 'Semantic Search', color: '#14b8a6' },
  ];

  return (
    <section className="text-center mb-16 opacity-0 animate-[fade-up_0.8s_cubic-bezier(.16,1,.3,1)_0.5s_forwards]">
      <span className="font-sans text-accent uppercase text-sm mb-8 block font-bold tracking-[2px]">
        Tech Stack
      </span>
      <div className="flex justify-center flex-wrap gap-4 mt-6">
        {techs.map((tech, idx) => (
          <div 
            key={idx}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/10 bg-white/5 text-xs font-sans transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_6px_20px_rgba(123,92,255,0.3)] hover:border-accent2/60 cursor-default"
          >
            <div 
              className="w-2.5 h-2.5 rounded-full" 
              style={{ backgroundColor: tech.color }}
            ></div>
            <span>{tech.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechStack;
