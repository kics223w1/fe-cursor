'use client';

import { useState } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { MODEL_OPTIONS, PLAN_OPTIONS } from '../types';

export default function ShareSetup({ onSucccess }: { onSucccess: () => void }) {
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
    <div className="grid gap-6 lg:grid-cols-12">
      {/* Left Column: Form */}
      <div className="lg:col-span-7">
        <Card 
          title="Tell us how you use Cursor" 
          subtitle="Answer a few questions and join the community board."
        >
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

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Model */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                Which AI model do you use the most in Cursor?
              </label>
              <input
                list="models"
                placeholder="Select a model..."
                className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white placeholder-zinc-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={formData.favoriteModel}
                onChange={(e) => setFormData({...formData, favoriteModel: e.target.value})}
                required
              />
              <datalist id="models">
                {MODEL_OPTIONS.map(opt => <option key={opt} value={opt} />)}
              </datalist>
            </div>

            {/* Plan */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                Which Cursor plan are you on?
              </label>
              <select
                className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={formData.cursorPlan}
                onChange={(e) => setFormData({...formData, cursorPlan: e.target.value})}
                required
              >
                {PLAN_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
              <p className="mt-1 text-xs text-zinc-500">Roughly what you’re using today is enough.</p>
            </div>

            {/* Country */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                Where are you from?
              </label>
              <input
                type="text"
                placeholder="Vietnam, USA, Japan, ..."
                className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white placeholder-zinc-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={formData.country}
                onChange={(e) => setFormData({...formData, country: e.target.value})}
                required
              />
            </div>

            {/* Mode */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-3">
                Which Cursor mode do you use the most?
              </label>
              <div className="flex rounded-md bg-zinc-900 p-1 ring-1 ring-zinc-700">
                {['Plan', 'Agent', 'Ask'].map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setFormData({...formData, favoriteMode: mode as any})}
                    className={`flex-1 rounded-sm py-1.5 text-sm font-medium transition-all ${
                      formData.favoriteMode === mode 
                        ? 'bg-zinc-700 text-white shadow-sm' 
                        : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
              {!formData.favoriteMode && <input className="sr-only" required />} 
            </div>

            {/* Display Name */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                Public display name (optional)
              </label>
              <input
                type="text"
                placeholder="huycao, anonymous-dev, ..."
                className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white placeholder-zinc-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={formData.displayName}
                onChange={(e) => setFormData({...formData, displayName: e.target.value})}
              />
              <p className="mt-1 text-xs text-zinc-500">Shown on the leaderboard. Leave blank if you want a generic name.</p>
            </div>

            {/* Note */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                Anything you want to share?
              </label>
              <textarea
                rows={3}
                placeholder="What you’re building, how Cursor helps you, etc. (optional)"
                className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white placeholder-zinc-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={formData.note}
                onChange={(e) => setFormData({...formData, note: e.target.value})}
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <Button 
                type="submit" 
                isLoading={status === 'loading'}
                disabled={!formData.favoriteMode}
              >
                Submit my setup
              </Button>
              <button 
                type="button" 
                onClick={handleReset}
                className="text-sm text-zinc-400 hover:text-white transition-colors"
              >
                Reset form
              </button>
            </div>
          </form>
        </Card>
      </div>

      {/* Right Column: Preview */}
      <div className="lg:col-span-5">
        <div className="sticky top-8">
          <Card title="Leaderboard preview">
            <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
              <div className="mb-1 font-bold text-white">
                {formData.displayName || "Anonymous dev"}
              </div>
              <div className="mb-1 text-sm text-zinc-300">
                {formData.favoriteModel ? formData.favoriteModel : <span className="text-zinc-600 italic">Model...</span>}
                <span className="mx-2 text-zinc-600">•</span>
                {formData.cursorPlan}
              </div>
              <div className="mb-3 text-sm text-zinc-300">
                {formData.country ? formData.country : <span className="text-zinc-600 italic">Country...</span>}
                <span className="mx-2 text-zinc-600">•</span>
                {formData.favoriteMode ? formData.favoriteMode : <span className="text-zinc-600 italic">Mode...</span>}
              </div>
              {formData.note && (
                <div className="text-xs text-zinc-500 italic border-l-2 border-zinc-700 pl-2">
                  "{formData.note}"
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

