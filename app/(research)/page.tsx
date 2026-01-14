'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Sparkles } from 'lucide-react';
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
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] w-full max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground/90">
          무엇을 <span className="text-primary">탐색</span>하고 싶으신가요?
        </h1>
        <p className="text-muted-foreground text-lg">
          복잡한 조사를 단순하게. 주제를 입력하세요.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="w-full space-y-6">
        <div className="relative group">
            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl blur-lg -z-10" />
            <textarea
                className={cn(
                "flex w-full rounded-xl border border-input bg-background/50 px-4 py-4 text-lg shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-none min-h-[120px]",
                "hover:border-primary/50"
                )}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="예: 전기차 전고체 배터리의 미래..."
                required
            />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
             <select
                className={cn(
                  "flex h-12 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                  "appearance-none cursor-pointer"
                )}
                value={mode}
                onChange={(e) => setMode(e.target.value as 'quick_scan' | 'deep_probe')}
             >
                <option value="quick_scan">⚡ 빠른 스캔 (요약 개요)</option>
                <option value="deep_probe">🔍 심층 탐구 (포괄적 분석)</option>
             </select>
             <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
             </div>
          </div>

          <Button 
            type="submit" 
            disabled={loading}
            size="lg"
            className="h-12 px-8 text-base shadow-md hover:shadow-lg transition-all"
          >
            {loading ? (
                <>
                    <Sparkles className="mr-2 h-5 w-5 animate-spin" />
                    분석 중...
                </>
            ) : (
                <>
                    <Search className="mr-2 h-5 w-5" />
                    조사 시작
                </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}