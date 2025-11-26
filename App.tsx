import React, { useState } from 'react';
import { Terminal, Code2, Cpu, ChevronRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { RequirementForm } from './components/RequirementForm';
import { CodeDisplay } from './components/CodeDisplay';
import { generateGameCode } from './services/geminiService';
import { FormData, AppState } from './types';

const INITIAL_FORM_STATE: FormData = {
  language: '',
  engine: '',
  concept: '',
  task: '',
  constraints: ''
};

export default function App() {
  const [appState, setAppState] = useState<AppState>('input');
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_STATE);
  const [generatedCode, setGeneratedCode] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (data: FormData) => {
    setFormData(data);
    setAppState('loading');
    setError(null);

    try {
      const result = await generateGameCode(data);
      setGeneratedCode(result);
      setAppState('result');
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred while generating code.');
      setAppState('input');
    }
  };

  const resetApp = () => {
    setAppState('input');
    setGeneratedCode('');
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-200">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={resetApp}>
            <div className="bg-blue-600 p-2 rounded-lg shadow-lg shadow-blue-900/20">
              <Terminal size={24} className="text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              GameDev Forge
            </h1>
          </div>
          <div className="flex items-center space-x-4 text-sm font-medium text-slate-400">
            <div className={`flex items-center space-x-2 ${appState === 'input' ? 'text-blue-400' : ''}`}>
              <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs">1</span>
              <span>Requirements</span>
            </div>
            <ChevronRight size={16} />
            <div className={`flex items-center space-x-2 ${appState === 'loading' ? 'text-blue-400' : ''}`}>
              <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs">2</span>
              <span>Processing</span>
            </div>
            <ChevronRight size={16} />
            <div className={`flex items-center space-x-2 ${appState === 'result' ? 'text-blue-400' : ''}`}>
              <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs">3</span>
              <span>Solution</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-12">
        
        {/* Error Display */}
        {error && (
          <div className="mb-8 p-4 bg-red-900/30 border border-red-800 rounded-lg flex items-center gap-3 text-red-200 animate-in fade-in slide-in-from-top-4">
            <AlertCircle className="shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {/* Views */}
        {appState === 'input' && (
          <div className="animate-in fade-in zoom-in-95 duration-300">
            <div className="mb-8 text-center space-y-2">
              <h2 className="text-3xl font-bold text-white">Define Your Mechanics</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Provide the technical specifications below. The AI will generate production-ready code tailored to your exact engine and constraints.
              </p>
            </div>
            <RequirementForm 
              initialData={formData} 
              onSubmit={handleFormSubmit} 
            />
          </div>
        )}

        {appState === 'loading' && (
          <div className="flex flex-col items-center justify-center min-h-[400px] animate-in fade-in duration-500">
            <div className="relative">
              <div className="w-24 h-24 border-4 border-slate-700 border-t-blue-500 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Cpu className="text-blue-500 animate-pulse" size={32} />
              </div>
            </div>
            <h3 className="mt-8 text-2xl font-semibold text-white">Forging Code Solution...</h3>
            <p className="mt-2 text-slate-400">Analyzing constraints and generating optimal logic.</p>
            <div className="mt-8 flex flex-col gap-2 w-full max-w-md">
              <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 animate-progress-indeterminate"></div>
              </div>
              <div className="flex justify-between text-xs text-slate-500 font-mono">
                <span>Phase 1: Analysis</span>
                <span>Phase 2: Generation</span>
                <span>Phase 3: Optimization</span>
              </div>
            </div>
          </div>
        )}

        {appState === 'result' && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-emerald-500/10 p-2 rounded-full">
                  <CheckCircle2 className="text-emerald-500" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Generation Complete</h2>
                  <p className="text-slate-400 text-sm">Ready for implementation</p>
                </div>
              </div>
              <button 
                onClick={resetApp}
                className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700"
              >
                New Request
              </button>
            </div>
            <CodeDisplay code={generatedCode} language={formData.language} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 mt-auto">
        <div className="max-w-5xl mx-auto px-6 text-center text-slate-500 text-sm">
          <p className="flex items-center justify-center gap-2">
            <Code2 size={16} />
            <span>Powered by Google Gemini 2.5 Flash</span>
          </p>
        </div>
      </footer>
    </div>
  );
}