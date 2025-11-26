import React, { useState } from 'react';
import { FormData } from '../types';
import { FileCode, Layers, Lightbulb, PenTool, Settings2, ArrowRight, Sparkles } from 'lucide-react';

interface RequirementFormProps {
  initialData: FormData;
  onSubmit: (data: FormData) => void;
}

const EXAMPLE_DATA: FormData = {
  language: "C#",
  engine: "Unity 6",
  concept: "A high-octane cyberpunk hover-racing game where vehicles can drive on walls and ceilings using anti-gravity mechanics.",
  task: "Create a modular vehicle controller script. It should handle: 1) Raycast-based suspension, 2) Jet engine propulsion with acceleration curves, 3) Wall adhesion logic when close to surfaces.",
  constraints: "Use Unity's Rigidbody physics. ensure the code is highly performant for mobile devices (avoid frequent allocation in Update). Add tooltips for public variables."
};

export const RequirementForm: React.FC<RequirementFormProps> = ({ initialData, onSubmit }) => {
  const [data, setData] = useState<FormData>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleFillExample = () => {
    setData(EXAMPLE_DATA);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(data);
  };

  const isFormValid = Object.values(data).every(val => (val as string).trim().length > 0);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleFillExample}
          className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 rounded-lg border border-blue-500/20 transition-all hover:scale-105"
        >
          <Sparkles size={14} />
          <span>Auto-fill Example</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Language */}
        <div className="group">
          <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
            <FileCode size={16} className="text-blue-400" />
            Programming Language
          </label>
          <input
            type="text"
            name="language"
            value={data.language}
            onChange={handleChange}
            placeholder="e.g., C#, Python 3.10, TypeScript"
            className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all hover:bg-slate-900"
            required
          />
        </div>

        {/* Engine */}
        <div className="group">
          <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
            <Layers size={16} className="text-purple-400" />
            Engine / Framework
          </label>
          <input
            type="text"
            name="engine"
            value={data.engine}
            onChange={handleChange}
            placeholder="e.g., Unity (2D), Unreal Engine 5, Godot"
            className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all hover:bg-slate-900"
            required
          />
        </div>
      </div>

      {/* Concept */}
      <div className="group">
        <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
          <Lightbulb size={16} className="text-amber-400" />
          Game Concept & Context
        </label>
        <textarea
          name="concept"
          value={data.concept}
          onChange={handleChange}
          placeholder="Briefly describe the game genre and existing setup..."
          rows={3}
          className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all hover:bg-slate-900 resize-none"
          required
        />
      </div>

      {/* Specific Task */}
      <div className="group">
        <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
          <PenTool size={16} className="text-emerald-400" />
          Specific Code Task
        </label>
        <textarea
          name="task"
          value={data.task}
          onChange={handleChange}
          placeholder="Define the exact functionality (e.g., 'A* Pathfinding for hex grid')..."
          rows={3}
          className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all hover:bg-slate-900 resize-none"
          required
        />
      </div>

      {/* Constraints */}
      <div className="group">
        <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
          <Settings2 size={16} className="text-rose-400" />
          Performance / Constraints
        </label>
        <textarea
          name="constraints"
          value={data.constraints}
          onChange={handleChange}
          placeholder="Efficiency requirements, external libraries, specific patterns..."
          rows={2}
          className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 transition-all hover:bg-slate-900 resize-none"
          required
        />
      </div>

      <div className="pt-4 flex justify-end">
        <button
          type="submit"
          disabled={!isFormValid}
          className={`
            flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-white transition-all transform hover:scale-[1.02] active:scale-[0.98]
            ${isFormValid 
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-900/40 cursor-pointer' 
              : 'bg-slate-800 text-slate-500 cursor-not-allowed'}
          `}
        >
          <span>Generate Code Solution</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </form>
  );
};