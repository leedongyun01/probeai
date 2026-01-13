'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ResearchPage() {
  const [query, setQuery] = useState('');
  const [mode, setMode] = useState<'quick_scan' | 'deep_probe'>('quick_scan');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/research/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, mode }),
      });

      const data = await res.json();
      if (data.sessionId) {
        router.push(`/${data.sessionId}?query=${encodeURIComponent(query)}&mode=${mode}`);
      }
    } catch (error) {
      console.error("Failed to start research:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">ProbeAI Research</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 font-medium">Research Query</label>
          <textarea
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            rows={4}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What do you want to investigate?"
            required
          />
        </div>
        <div>
          <label className="block mb-2 font-medium">Mode</label>
          <select
            className="w-full p-3 border rounded-lg"
            value={mode}
            onChange={(e) => setMode(e.target.value as 'quick_scan' | 'deep_probe')}
          >
            <option value="quick_scan">Quick Scan (Fast)</option>
            <option value="deep_probe">Deep Probe (Iterative)</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold disabled:bg-gray-400"
        >
          {loading ? 'Analyzing...' : 'Start Research'}
        </button>
      </form>
    </div>
  );
}
