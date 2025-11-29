'use client';

import { useState } from 'react';
import { Button } from './ui/Button';
import { MODEL_OPTIONS, PLAN_OPTIONS, COUNTRY_OPTIONS } from '../types';
import { useCache } from '../lib/cache';

export default function ShareSetup({ onSucccess }: { onSucccess: () => void }) {
  const cache = useCache();
  const [formData, setFormData] = useState({
    favoriteModel: '',
    cursorPlan: 'Pro',
    country: '',
    favoriteMode: '' as 'Plan' | 'Agent' | 'Ask' | '',
    displayName: '',
    note: ''
  });
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to submit');

      // Invalidate cache so fresh data loads on return
      cache.invalidateAll();

      setStatus('success');
      setTimeout(() => {
        onSucccess();
      }, 1500);
    } catch (err) {
      setStatus('error');
      setErrorMsg('Something went wrong while saving your setup. Please try again.');
    }
  };

  const handleReset = () => {
    setFormData({
      favoriteModel: '',
      cursorPlan: 'Pro',
      country: '',
      favoriteMode: '',
      displayName: '',
      note: ''
    });
    setStatus('idle');
    setErrorMsg('');
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
          Tell us how you use Cursor
        </h1>
        <p className="mt-4 text-lg text-zinc-400">
          Answer a few questions and join the community board.
        </p>
      </div>

      {status === 'success' && (
        <div className="mb-6 rounded-md bg-green-500/10 p-4 text-sm text-green-400 border border-green-500/20">
          Thanks! Your setup has been recorded. Redirecting...
        </div>
      )}

      {status === 'error' && (
        <div className="mb-6 rounded-md bg-red-500/10 p-4 text-sm text-red-400 border border-red-500/20">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Model */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-zinc-400">
            Which AI model do you use the most in Cursor?
          </label>
          <select
            className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-colors"
            value={formData.favoriteModel}
            onChange={(e) => setFormData({...formData, favoriteModel: e.target.value})}
            required
          >
            <option value="" disabled>Select a model...</option>
            {MODEL_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>

        {/* Plan */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-zinc-400">
            Which Cursor plan are you on?
          </label>
          <select
            className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-colors"
            value={formData.cursorPlan}
            onChange={(e) => setFormData({...formData, cursorPlan: e.target.value})}
            required
          >
            {PLAN_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
          <p className="text-xs text-zinc-500">Roughly what you’re using today is enough.</p>
        </div>

        {/* Country */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-zinc-400">
            Where are you from?
          </label>
          <select
            className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-colors"
            value={formData.country}
            onChange={(e) => setFormData({...formData, country: e.target.value})}
            required
          >
            <option value="" disabled>Select your country...</option>
            {COUNTRY_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>

        {/* Mode */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-zinc-400">
            Which Cursor mode do you use the most?
          </label>
          <div className="flex rounded-lg bg-zinc-900/50 p-1 ring-1 ring-zinc-800">
            {['Plan', 'Agent', 'Ask'].map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setFormData({...formData, favoriteMode: mode as any})}
                className={`flex-1 rounded-md py-2 text-sm font-medium transition-all duration-200 ${
                  formData.favoriteMode === mode 
                    ? 'bg-zinc-800 text-white shadow-sm' 
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
          {!formData.favoriteMode && <input className="sr-only" required />} 
        </div>

        {/* Display Name */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-zinc-400">
            Public display name (optional)
          </label>
          <input
            type="text"
            placeholder="huycao, anonymous-dev, ..."
            className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-white placeholder-zinc-600 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-colors"
            value={formData.displayName}
            onChange={(e) => setFormData({...formData, displayName: e.target.value})}
          />
          <p className="text-xs text-zinc-500">Shown on the leaderboard. Leave blank if you want a generic name.</p>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-zinc-800/50">
          <Button 
            type="submit" 
            isLoading={status === 'loading'}
            disabled={!formData.favoriteModel || !formData.cursorPlan || !formData.country || !formData.favoriteMode}
          >
            Submit my setup
          </Button>
          <button 
            type="button" 
            onClick={handleReset}
            className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            Reset form
          </button>
        </div>
      </form>
    </div>
  );
}
