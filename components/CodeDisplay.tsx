import React, { useState } from 'react';
import { Copy, Check, FileText } from 'lucide-react';

interface CodeDisplayProps {
  code: string;
  language: string;
}

export const CodeDisplay: React.FC<CodeDisplayProps> = ({ code, language }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Simple Markdown parser for specific format
  // We expect text followed by ```lang code ```
  const parts = code.split(/(```[\s\S]*?```)/g);

  return (
    <div className="space-y-6">
      {parts.map((part, index) => {
        if (part.startsWith('```')) {
          // It's a code block
          const lines = part.split('\n');
          const lang = lines[0].replace(/```/, '').trim() || language;
          const content = lines.slice(1, -1).join('\n'); // remove first and last ``` lines

          return (
            <div key={index} className="relative rounded-xl overflow-hidden border border-slate-700 bg-[#0d1117] shadow-2xl">
              <div className="flex items-center justify-between px-4 py-3 bg-slate-800/50 border-b border-slate-700/50">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400 uppercase tracking-wider">
                  <FileText size={14} />
                  {lang}
                </div>
                <button
                  onClick={() => handleCopy(content, index)}
                  className="flex items-center gap-1.5 px-2 py-1 rounded hover:bg-slate-700 text-slate-400 hover:text-white transition-colors text-xs font-medium"
                >
                  {copiedIndex === index ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  {copiedIndex === index ? 'Copied!' : 'Copy Code'}
                </button>
              </div>
              <div className="p-4 overflow-x-auto">
                <pre className="font-mono text-sm leading-relaxed text-slate-300">
                  <code>{content}</code>
                </pre>
              </div>
            </div>
          );
        } else if (part.trim().length > 0) {
          // It's regular text
          return (
            <div key={index} className="prose prose-invert max-w-none text-slate-300 leading-7">
               {/* Simple line break handling */}
              {part.split('\n').map((line, i) => (
                <p key={i} className="mb-2">{line}</p>
              ))}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};