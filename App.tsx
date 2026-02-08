import React, { useState } from 'react';
import { ValentineForm } from './components/ValentineForm';
import { Summary } from './components/Summary';
import { HeartBackground } from './components/HeartBackground';

export type FormData = {
  answer: string;
  reason: string;
};

export default function App() {
  const [view, setView] = useState<'form' | 'summary'>('form');
  const [formData, setFormData] = useState<FormData>({
    answer: '',
    reason: '',
  });

  const handleFormSubmit = (data: FormData) => {
    setFormData(data);
    setView('summary');
  };

  const handleReset = () => {
    setFormData({ answer: '', reason: '' });
    setView('form');
  };

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center p-4">
      <HeartBackground />
      
      <main className="w-full max-w-md z-10 relative">
        <div className="glass-panel rounded-3xl shadow-xl shadow-valentine-200/50 p-8 transition-all duration-500 ease-in-out transform hover:scale-[1.01]">
          {view === 'form' ? (
            <ValentineForm onSubmit={handleFormSubmit} />
          ) : (
            <Summary 
              answer={formData.answer} 
              reason={formData.reason} 
              onReset={handleReset} 
            />
          )}
        </div>
        
        <footer className="mt-8 text-center text-valentine-800/60 text-sm font-semibold">
          Made with ❤️ for Cay
        </footer>
      </main>
    </div>
  );
}