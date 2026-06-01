import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import PipelineStepper from './components/PipelineStepper';
import CandidateGrid from './components/CandidateGrid';
import UploadZone from './components/UploadZone';
import JobDescriptionInput from './components/JobDescriptionInput';
import Toast from './components/Toast';
import ConfirmModal from './components/ConfirmModal';
import { getCandidates, uploadResumes, setJobDescription } from './api/hiresense';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [candidates, setCandidates] = useState([]);
  const [isBackendActive, setIsBackendActive] = useState(false);
  const [loadingInitial, setLoadingInitial] = useState(true);
  
  const [isUploading, setIsUploading] = useState(false);
  const [isSettingJob, setIsSettingJob] = useState(false);
  
  const [activeStepOverride, setActiveStepOverride] = useState(null);
  
  const [showUploadPanel, setShowUploadPanel] = useState(false);

  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('info');
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  const showToast = (message, type = 'info') => {
    setToastMessage(message);
    setToastType(type);
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const data = await getCandidates();
      setCandidates(data);
      setIsBackendActive(true);
    } catch (err) {
      console.error('API connection failed', err);
      setIsBackendActive(false);
    } finally {
      setLoadingInitial(false);
    }
  };

  const handleSetJob = async (title, description) => {
    setIsSettingJob(true);
    try {
      await setJobDescription(title, description);
      showToast('Job Description set successfully!', 'success');
    } catch (err) {
      showToast('Failed to set job description', 'error');
      console.error(err);
    } finally {
      setIsSettingJob(false);
    }
  };

  const handleUpload = async (files) => {
    setIsUploading(true);
    setActiveStepOverride(0); // Ingest
    
    // Simulate steps for UI if backend is too fast
    const t1 = setTimeout(() => setActiveStepOverride(1), 1000); // Parse
    const t2 = setTimeout(() => setActiveStepOverride(2), 2500); // Embed

    try {
      const result = await uploadResumes(files);
      clearTimeout(t1);
      clearTimeout(t2);
      
      setCandidates(result.candidates || []);
      
      setActiveStepOverride(3); // Shortlist/Rank
      setTimeout(() => setActiveStepOverride(null), 2000); // Reset to auto-cycle
      setShowUploadPanel(false); // Hide panel on success
    } catch (err) {
      clearTimeout(t1);
      clearTimeout(t2);
      showToast('Upload failed. Please ensure backend and NLP services are running and Job Description is set first.', 'error');
      console.error(err);
      setActiveStepOverride(null);
    } finally {
      setIsUploading(false);
    }
  };

  const pipelineRef = useRef(null);
  const embeddingsRef = useRef(null);
  const dashboardRef = useRef(null);
  
  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleResetRole = () => {
    setShowConfirmReset(true);
  };

  const confirmResetRole = async () => {
    setShowConfirmReset(false);
    try {
       setCandidates([]);
       setActiveStepOverride(null);
       setShowUploadPanel(true);
       scrollToSection(dashboardRef);
       showToast('Started a new role successfully.', 'success');
    } catch (err) {
       console.error(err);
    }
  };

  return (
    <div className="relative min-h-screen bg-bg text-white font-sans">
      <Toast message={toastMessage} type={toastType} onClose={() => setToastMessage('')} />
      <ConfirmModal 
        isOpen={showConfirmReset} 
        title="Start New Role?" 
        message="Are you sure you want to start a new role? This will clear all current candidates from the dashboard."
        onConfirm={confirmResetRole}
        onCancel={() => setShowConfirmReset(false)}
      />
      <div className="max-w-[1240px] mx-auto px-6 py-8 box-border" ref={dashboardRef}>
        
        <Header 
          isActive={isBackendActive} 
          onScrollTo={(section) => {
            if (section === 'dashboard') scrollToSection(dashboardRef);
            if (section === 'pipeline') scrollToSection(pipelineRef);
            if (section === 'embeddings') scrollToSection(embeddingsRef);
          }}
          onNewRole={handleResetRole}
        />

        <HeroSection 
          onRunPipeline={() => {
            setShowUploadPanel(true);
            setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
          }} 
          candidates={candidates} 
        />

        <AnimatePresence>
        {showUploadPanel && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-16 p-8 border border-border rounded-lg bg-surface relative overflow-hidden"
          >
            {/* Top accent bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent to-accent2" />
            
            <h2 className="font-heading font-extrabold text-2xl mb-8 text-white">Pipeline Configuration</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <JobDescriptionInput onSetJob={handleSetJob} isSetting={isSettingJob} />
              <UploadZone onUpload={handleUpload} isUploading={isUploading} />
            </div>
          </motion.div>
        )}
        </AnimatePresence>

        <div ref={pipelineRef}>
          <PipelineStepper activeStepOverride={activeStepOverride} candidates={candidates} />
        </div>

        <div ref={embeddingsRef}>
          <CandidateGrid candidates={candidates} loading={loadingInitial} />
        </div>

      </div>
    </div>
  );
}

export default App;
