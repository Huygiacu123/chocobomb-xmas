import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid'; // Actually we don't have uuid lib, use simple generator
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';

import { 
  StepType, 
  CakeState, 
  BaseOption, 
  PlacedDecoration 
} from './types';
import { 
  SHELLS, 
  POWDERS, 
  CORES, 
  COATINGS, 
  DECORATIONS, 
  STEPS_FLOW 
} from './constants';

import { Welcome } from './components/Welcome';
import { PreviewArea } from './components/PreviewArea';
import { OptionList } from './components/OptionList';
import { Summary } from './components/Summary';
import { BackgroundMusic } from './components/BackgroundMusic';

// Simple ID generator
const generateId = () => Math.random().toString(36).substr(2, 9);

function App() {
  // --- STATE ---
  const [step, setStep] = useState<StepType>(StepType.WELCOME);
  const [hasStarted, setHasStarted] = useState(false); // New state to trigger music
  
  const [cakeState, setCakeState] = useState<CakeState>({
    userName: '',
    shell: null,
    powder: null,
    core: null,
    coating: null,
    decorations: [],
  });

  // --- HANDLERS ---
  const handleStart = (name: string) => {
    setCakeState(prev => ({ ...prev, userName: name }));
    setStep(StepType.SHELL);
    setHasStarted(true); // User interacted, start music!
  };

  const handleSelectOption = (option: BaseOption, type: StepType) => {
    switch (type) {
      case StepType.SHELL:
        setCakeState(prev => ({ ...prev, shell: option }));
        break;
      case StepType.POWDER:
        setCakeState(prev => ({ ...prev, powder: option }));
        break;
      case StepType.CORE:
        setCakeState(prev => ({ ...prev, core: option }));
        break;
      case StepType.COATING:
        setCakeState(prev => ({ ...prev, coating: option }));
        break;
      case StepType.DECOR:
        // For decor, selecting adds a NEW item to the center
        const newDecor: PlacedDecoration = {
          ...option,
          uniqueId: generateId(),
          x: (Math.random() * 40) - 20, // Random jitter around center
          y: (Math.random() * 40) - 20,
          scale: 1
        };
        setCakeState(prev => ({ 
          ...prev, 
          decorations: [...prev.decorations, newDecor] 
        }));
        break;
    }
  };

  const handleUpdateDecorPosition = (id: string, x: number, y: number) => {
    // Note: Framer motion handles visual drag. 
    // If we wanted to save exact coords for persistence we would update here.
    // For this simple app, we update state only if needed for saving later.
  };

  const handleRemoveDecor = (id: string) => {
    setCakeState(prev => ({
      ...prev,
      decorations: prev.decorations.filter(d => d.uniqueId !== id)
    }));
  };

  const handleNext = () => {
    const currentStepIndex = STEPS_FLOW.findIndex(s => s.id === step);
    if (currentStepIndex < STEPS_FLOW.length - 1) {
      setStep(STEPS_FLOW[currentStepIndex + 1].id as StepType);
    } else {
      setStep(StepType.FINISH);
    }
  };

  const handleBack = () => {
    const currentStepIndex = STEPS_FLOW.findIndex(s => s.id === step);
    if (currentStepIndex > 0) {
      setStep(STEPS_FLOW[currentStepIndex - 1].id as StepType);
    } else {
      setStep(StepType.WELCOME);
    }
  };

  const handleReset = () => {
    setCakeState({
      userName: '',
      shell: null,
      powder: null,
      core: null,
      coating: null,
      decorations: [],
    });
    setStep(StepType.WELCOME);
    // Note: We don't reset 'hasStarted' so music keeps playing if they restart
  };

  // --- DERIVED DATA ---
  const currentFlowStep = STEPS_FLOW.find(s => s.id === step);
  const currentStepIndex = STEPS_FLOW.findIndex(s => s.id === step);
  const totalSteps = STEPS_FLOW.length;

  // Validation to enable Next button
  const canGoNext = () => {
    switch (step) {
      case StepType.SHELL: return !!cakeState.shell;
      case StepType.POWDER: return !!cakeState.powder;
      case StepType.CORE: return !!cakeState.core;
      case StepType.COATING: return !!cakeState.coating;
      case StepType.DECOR: return true; // Optional
      default: return false;
    }
  };

  // --- RENDER ---

  return (
    <div className="min-h-screen bg-brand-50 text-gray-800 overflow-hidden relative">
      
      {/* GLOBAL MUSIC PLAYER */}
      <BackgroundMusic shouldStart={hasStarted} />

      {step === StepType.WELCOME ? (
        <Welcome onStart={handleStart} />
      ) : step === StepType.FINISH ? (
        <Summary cakeState={cakeState} onReset={handleReset} />
      ) : (
        <div className="flex flex-col md:flex-row min-h-screen">
          
          {/* LEFT: Controls (Mobile: Bottom Sheet / Desktop: Sidebar) */}
          <div className="order-2 md:order-1 w-full md:w-1/3 lg:w-1/4 bg-white shadow-2xl z-10 flex flex-col h-[40vh] md:h-screen">
            
            {/* Header (Progress) */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-brand-500 tracking-wider">BƯỚC {currentStepIndex + 1} / {totalSteps}</span>
                <span className="text-xs text-gray-400">Hi, {cakeState.userName}</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <motion.div 
                  className="bg-brand-500 h-full" 
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentStepIndex + 1) / totalSteps) * 100}%` }}
                />
              </div>
            </div>

            {/* Dynamic Options List */}
            <div className="flex-1 overflow-hidden p-4">
              <AnimatePresence mode="wait">
                {currentFlowStep && (
                  <motion.div
                    key={currentFlowStep.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="h-full"
                  >
                    <p className="text-sm text-gray-500 mb-4 italic">{currentFlowStep.help}</p>
                    <OptionList
                      title={currentFlowStep.title}
                      options={currentFlowStep.data}
                      selectedId={
                        step === StepType.SHELL ? cakeState.shell?.id :
                        step === StepType.POWDER ? cakeState.powder?.id :
                        step === StepType.CORE ? cakeState.core?.id :
                        step === StepType.COATING ? cakeState.coating?.id :
                        undefined
                      }
                      onSelect={(opt) => handleSelectOption(opt, step)}
                      isDecorMode={step === StepType.DECOR}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Navigation Footer */}
            <div className="p-4 border-t border-gray-100 bg-white flex gap-3">
              <button 
                onClick={handleBack}
                className="p-3 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-600 transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              
              <button 
                onClick={handleNext}
                disabled={!canGoNext()}
                className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl font-bold transition-all shadow-md ${
                  canGoNext() 
                    ? 'bg-brand-500 text-white hover:bg-brand-600 hover:shadow-lg transform active:scale-95' 
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {step === StepType.DECOR ? 'Hoàn tất' : 'Tiếp theo'} 
                {step === StepType.DECOR ? <CheckCircle size={20} /> : <ArrowRight size={20} />}
              </button>
            </div>
          </div>

          {/* RIGHT: Preview Area */}
          <div className="order-1 md:order-2 flex-1 relative flex items-center justify-center p-4 bg-brand-50/50">
            <div className="w-full max-w-2xl">
              <PreviewArea 
                cakeState={cakeState} 
                currentStep={step}
                onUpdateDecorPosition={handleUpdateDecorPosition}
                onRemoveDecor={handleRemoveDecor}
              />
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

export default App;