import React, { useState, useEffect } from 'react';
import { Heart, Send, Frown, Smile, Sparkles } from 'lucide-react';
import type { FormData } from '../App';

interface ValentineFormProps {
  onSubmit: (data: FormData) => void;
}

export const ValentineForm: React.FC<ValentineFormProps> = ({ onSubmit }) => {
  const [answer, setAnswer] = useState<string>('');
  const [reason, setReason] = useState<string>('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [animateHeart, setAnimateHeart] = useState(false);

  useEffect(() => {
    // Basic validation: Answer must be selected (not empty) and not the default "Choose".
    // Reason is optional based on the prompt "a fill answer" but usually good to have content.
    // We'll enforce at least 1 character in reason to make it a "fill answer".
    setIsFormValid(answer !== '' && reason.trim().length > 0);
  }, [answer, reason]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      setAnimateHeart(true);
      // Small delay for animation
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <header className="text-center space-y-2 mb-8">
        <div className={`mx-auto w-16 h-16 bg-gradient-to-tr from-valentine-400 to-valentine-600 rounded-full flex items-center justify-center shadow-lg transition-transform duration-500 ${animateHeart ? 'scale-150 rotate-12' : 'animate-float'}`}>
          <Heart className="w-8 h-8 text-white fill-current" />
        </div>
        <h1 className="text-3xl font-cursive text-valentine-800">Hi! Ci Cisca</h1>
        <p className="text-valentine-600/80 text-sm">Please fill out this very important form</p>
      </header>

      <div className="space-y-4">
        {/* Question 1 */}
        <div className="space-y-2">
          <label htmlFor="valentine-question" className="block text-lg font-bold text-gray-800">
            1. Will you let me be your valentine this year?
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
               {answer ? getReactionIcon() : <Heart className="w-4 h-4" />}
            </div>
          </div>
        </div>

        {/* Question 2 */}
        <div className="space-y-2">
          <label htmlFor="valentine-reason" className="block text-lg font-bold text-gray-800">
            2. Why?
          </label>
          <textarea
            id="valentine-reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Tell me why..."
            className="w-full min-h-[120px] bg-white border-2 border-valentine-200 text-gray-700 py-3 px-4 rounded-xl leading-tight focus:outline-none focus:bg-white focus:border-valentine-500 transition-colors resize-none"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={!isFormValid}
        className={`w-full group py-4 px-6 rounded-xl flex items-center justify-center space-x-2 font-bold text-lg transition-all duration-300 transform
          ${isFormValid 
            ? 'bg-gradient-to-r from-valentine-500 to-valentine-600 text-white shadow-lg hover:shadow-valentine-500/30 hover:-translate-y-1' 
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
      >
        <span>Submit Answer</span>
        <Send className={`w-5 h-5 ${isFormValid ? 'group-hover:translate-x-1 transition-transform' : ''}`} />
      </button>
    </form>
  );
};