'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Terminal, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] w-full max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 rounded border border-green-500/20 bg-green-500/10 px-3 py-1 text-xs font-mono font-medium text-green-500 mb-4">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          SYSTEM ONLINE
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          PROBE<span className="text-blue-500">AI</span>
        </h1>
        <p className="text-muted-foreground font-mono text-sm uppercase tracking-widest">
          Advanced Research & Analysis Terminal
        </p>
      </div>

      <div className="w-full rounded-lg border border-slate-800 bg-slate-900/70 backdrop-blur-md p-6 md:p-8 shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-mono text-slate-400 uppercase tracking-wider">Target Objective</label>
            <textarea
                className={cn(
                "flex w-full rounded bg-slate-950/50 border border-slate-800 px-4 py-4 font-mono text-sm text-foreground placeholder:text-slate-600 focus:border-blue-500 focus:outline-none resize-none min-h-[100px] transition-all",
                "hover:border-slate-700 focus:ring-1 focus:ring-blue-500/20"
                )}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="> Enter research topic or query..."
                required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="space-y-2">
               <label className="text-xs font-mono text-slate-400 uppercase tracking-wider">Operation Mode</label>
               <div className="relative">
                 <select
                    className={cn(
                      "flex h-10 w-full rounded bg-slate-950/50 border border-slate-800 px-3 py-2 font-mono text-sm text-foreground focus:border-blue-500 focus:outline-none appearance-none cursor-pointer hover:border-slate-700 transition-colors"
                    )}
                    value={mode}
                    onChange={(e) => setMode(e.target.value as 'quick_scan' | 'deep_probe')}
                 >
                    <option value="quick_scan">QUICK SCAN [Fast]</option>
                    <option value="deep_probe">DEEP PROBE [Comprehensive]</option>
                 </select>
                 <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                    <Activity className="h-4 w-4" />
                 </div>
               </div>
             </div>
             
             <div className="flex items-end">
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full h-10 rounded bg-blue-600 hover:bg-blue-500 text-white font-semibold uppercase tracking-wider text-xs transition-all shadow-[0_0_10px_rgba(37,99,235,0.2)] hover:shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                >
                  {loading ? (
                      <>
                          <span className="animate-spin mr-2">/</span>
                          INITIALIZING...
                      </>
                  ) : (
                      <>
                          <Terminal className="mr-2 h-4 w-4" />
                          INITIALIZE SEQUENCE
                      </>
                  )}
                </Button>
             </div>
          </div>
        </form>
      </div>
      
      <div className="flex gap-8 text-xs font-mono text-slate-600">
        <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-slate-600"></div>
            <span>READY FOR INPUT</span>
        </div>
        <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-slate-600"></div>
            <span>V2.5 FLASH LITE</span>
        </div>
      </div>

    </div>
  );
}