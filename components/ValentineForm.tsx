import React, { useState, useEffect } from 'react';
import { Heart, Send, Frown, Smile, Sparkles, ArrowRight } from 'lucide-react';
import type { FormData } from '../App';

interface ValentineFormProps {
  onSubmit: (data: FormData) => void;
}

export const ValentineForm: React.FC<ValentineFormProps> = ({ onSubmit }) => {
  const [step, setStep] = useState(1);
  const [answer, setAnswer] = useState<string>('');
  const [reason, setReason] = useState<string>('');
  const [animateHeart, setAnimateHeart] = useState(false);
  const [btnPos, setBtnPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Reset button position if answer changes to Yes or is empty
    if (answer !== 'Ew, no!') {
      setBtnPos({ x: 0, y: 0 });
    }
  }, [answer]);

  const handleRunaway = () => {
    if (answer === 'Ew, no!') {
      const x = (Math.random() - 0.5) * 250;
      const y = (Math.random() - 0.5) * 250;
      setBtnPos({ x, y });
    }
  };

  const handleNext = (e: React.MouseEvent | React.TouchEvent) => {
    if (answer === 'Ew, no!') {
      e.preventDefault();
      handleRunaway();
      return;
    }
    if (answer === 'Yes!') {
      setStep(2);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reason.trim().length > 0) {
      setAnimateHeart(true);
      setTimeout(() => {
        onSubmit({ answer, reason });
      }, 600);
    }
  };

  const getReactionIcon = () => {
    if (answer === 'Yes!') return <Smile className="w-6 h-6 text-green-500 animate-bounce" />;
    if (answer === 'Ew, no!') return <Frown className="w-6 h-6 text-gray-500 animate-pulse" />;
    return <Sparkles className="w-6 h-6 text-valentine-400" />;
  };

  return (
    <div className="min-h-[400px] flex flex-col">
      <header className="text-center space-y-2 mb-8 flex-shrink-0">
        <div className={`mx-auto w-16 h-16 bg-gradient-to-tr from-valentine-400 to-valentine-600 rounded-full flex items-center justify-center shadow-lg transition-transform duration-500 ${animateHeart ? 'scale-150 rotate-12' : 'animate-float'}`}>
          <span className="text-3xl filter drop-shadow-md">🧸</span>
        </div>
        <h1 className="text-3xl font-cursive text-valentine-800">Hi! Ci Cisca</h1>
        <p className="text-valentine-600/80 text-sm">Please fill out this very important form</p>
      </header>

      <form onSubmit={handleSubmit} className="flex-grow flex flex-col justify-between relative">
        {step === 1 && (
          <div className="space-y-8 animate-slide-up">
            <div className="space-y-2">
              <label htmlFor="valentine-question" className="block text-lg font-bold text-gray-800">
                Will you let me be your valentine this year?
              </label>
              <div className="relative">
                <select
                  id="valentine-question"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="w-full appearance-none bg-white border-2 border-valentine-200 text-gray-700 py-3 px-4 pr-8 rounded-xl leading-tight focus:outline-none focus:bg-white focus:border-valentine-500 transition-colors"
                >
                  <option value="" disabled>Choose</option>
                  <option value="Yes!">Yes!</option>
                  <option value="Ew, no!">Ew, no!</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-valentine-600">
                  {answer ? getReactionIcon() : null}
                </div>
              </div>
            </div>

            <div className="pt-4 relative h-16">
              <button
                type="button"
                onClick={handleNext}
                onMouseEnter={handleRunaway}
                onTouchStart={handleRunaway}
                disabled={!answer}
                style={{
                  transform: `translate(${btnPos.x}px, ${btnPos.y}px)`,
                  transition: 'transform 0.15s ease-out'
                }}
                className={`w-full py-4 px-6 rounded-xl flex items-center justify-center space-x-2 font-bold text-lg shadow-lg absolute top-0 left-0 transition-all duration-300
                  ${!answer || answer === 'Ew, no!'
                    ? 'bg-valentine-400 text-white cursor-pointer' 
                    : 'bg-gradient-to-r from-valentine-500 to-valentine-600 text-white hover:shadow-valentine-500/30 hover:-translate-y-1'
                  }
                  ${!answer ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}
                `}
              >
                <span>Next</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-slide-up">
            <div className="space-y-2">
              <label htmlFor="valentine-reason" className="block text-lg font-bold text-gray-800">
                Why?
              </label>
              <textarea
                id="valentine-reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Tell me why..."
                autoFocus
                className="w-full min-h-[120px] bg-white border-2 border-valentine-200 text-gray-700 py-3 px-4 rounded-xl leading-tight focus:outline-none focus:bg-white focus:border-valentine-500 transition-colors resize-none"
              />
            </div>

            <div className="space-y-3">
              <button
                type="submit"
                disabled={reason.trim().length === 0}
                className={`w-full group py-4 px-6 rounded-xl flex items-center justify-center space-x-2 font-bold text-lg transition-all duration-300 transform
                  ${reason.trim().length > 0
                    ? 'bg-gradient-to-r from-valentine-500 to-valentine-600 text-white shadow-lg hover:shadow-valentine-500/30 hover:-translate-y-1' 
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
              >
                <span>Submit to Cay</span>
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button 
                type="button"
                onClick={() => setStep(1)}
                className="w-full text-center text-sm text-gray-400 hover:text-valentine-500 transition-colors"
              >
                Back
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};