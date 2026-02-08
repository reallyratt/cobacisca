import React, { useState } from 'react';
import { Copy, Check, RefreshCcw, Heart } from 'lucide-react';

interface SummaryProps {
  answer: string;
  reason: string;
  onReset: () => void;
}

export const Summary: React.FC<SummaryProps> = ({ answer, reason, onReset }) => {
  const [copied, setCopied] = useState(false);

  // The requested format:
  // I said; Yes!
  // Because: [Reason]
  const summaryText = `I said; ${answer}\nBecause: ${reason}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(summaryText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const isPositive = answer === 'Yes!';

  return (
    <div className="space-y-8 animate-in fade-in zoom-in duration-500">
      <header className="text-center space-y-2">
        <div className={`mx-auto w-16 h-16 ${isPositive ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'} rounded-full flex items-center justify-center shadow-inner mb-4`}>
          {isPositive ? <Heart className="w-8 h-8 fill-current animate-pulse-fast" /> : <div className="text-3xl">😢</div>}
        </div>
        <h2 className="text-2xl font-bold text-gray-800">3. Summary of the form</h2>
        <p className="text-gray-500 text-sm">Here is what you decided</p>
      </header>

      <div className="bg-white/60 p-6 rounded-2xl border-2 border-valentine-100 space-y-4 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-1 h-full bg-valentine-400"></div>
        
        <div className="space-y-1">
          <p className="text-xs font-bold uppercase tracking-wider text-valentine-400">Your Answer</p>
          <p className="text-xl font-bold text-gray-800">I said; {answer}</p>
        </div>
        
        <div className="space-y-1 pt-2 border-t border-valentine-100">
          <p className="text-xs font-bold uppercase tracking-wider text-valentine-400">Your Reason</p>
          <p className="text-lg text-gray-700 italic">"Because: {reason}"</p>
        </div>
      </div>

      <div className="space-y-3">
        <button
          onClick={handleCopy}
          className="w-full relative py-3 px-6 rounded-xl font-bold flex items-center justify-center space-x-2 transition-all duration-300 bg-white border-2 border-valentine-200 hover:border-valentine-400 hover:bg-valentine-50 text-valentine-700"
        >
          {copied ? (
            <>
              <Check className="w-5 h-5 text-green-500" />
              <span className="text-green-600">Copied to clipboard!</span>
            </>
          ) : (
            <>
              <Copy className="w-5 h-5" />
              <span>Copy message for Cay</span>
            </>
          )}
        </button>

        <button
          onClick={onReset}
          className="w-full py-2 text-sm text-gray-400 hover:text-valentine-500 flex items-center justify-center space-x-1 transition-colors"
        >
          <RefreshCcw className="w-3 h-3" />
          <span>Start Over</span>
        </button>
      </div>
    </div>
  );
};