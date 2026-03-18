import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const UploadZone = ({ onUpload, isUploading }) => {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFiles([...files, ...Array.from(e.dataTransfer.files)]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      setFiles([...files, ...Array.from(e.target.files)]);
    }
  };

  const removeFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const handleUploadSubmit = () => {
    if (files.length > 0) {
      onUpload(files);
      setFiles([]); // Clear after upload initiation if desired, or keep to show
    }
  };

  return (
    <div className="mb-10 w-full text-left">
      <span className="font-sans text-accent uppercase text-sm mb-4 block font-bold tracking-[2px]">
        Upload Candidates
      </span>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        whileHover={{ borderColor: 'rgba(0, 255, 200, 0.4)' }}
        className={`glass-card relative overflow-hidden transition-all duration-300 border-2 border-dashed ${dragActive ? 'border-accent bg-accent/10 scale-[1.02]' : 'border-white/20'}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {isUploading && (
          <div className="absolute inset-0 bg-bg/80 backdrop-blur-sm z-20 flex flex-col items-center justify-center">
            <div className="w-12 h-12 border-4 border-accent/30 border-t-accent rounded-full animate-spin mb-4"></div>
            <span className="font-heading font-extrabold text-xl animate-pulse text-white">Analyzing Resumes...</span>
            <span className="font-sans text-xs text-accent mt-2">Running NLP Embedding Model</span>
          </div>
        )}

        <div className="text-center py-8">
          <div className="text-4xl mb-4">📄</div>
          <p className="font-sans text-sm text-white/80 mb-4">
            Drag & drop PDF/DOCX files here, or
          </p>
          <label className="cta-btn cursor-pointer inline-block py-2 px-6 text-sm">
            Browse Files
            <input type="file" multiple accept=".pdf,.docx" className="hidden" onChange={handleChange} />
          </label>
        </div>

        {files.length > 0 && (
          <div className="mt-6 border-t border-white/10 pt-4">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-heading text-sm text-white">Selected Files ({files.length})</h4>
              <button 
                onClick={handleUploadSubmit}
                className="bg-accent text-bg px-4 py-1 rounded-full font-bold font-sans text-xs hover:bg-white transition-colors"
                disabled={isUploading}
              >
                Start Processing
              </button>
            </div>
            <ul className="space-y-2 max-h-40 overflow-y-auto pr-2">
              {files.map((file, idx) => (
                <li key={idx} className="flex justify-between items-center text-xs font-sans bg-white/5 p-2 rounded">
                  <span className="truncate max-w-[80%] text-white/80">{file.name}</span>
                  <button onClick={() => removeFile(idx)} className="text-red-400 hover:text-red-300">✕</button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default UploadZone;
