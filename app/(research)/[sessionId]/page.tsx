'use client';

import { use } from 'react';
import { ReportViewer } from '@/components/research/ReportViewer';
import { StatusDashboard } from '@/components/research/StatusDashboard';
import { useResearchStream } from '@/lib/hooks/useResearchStream';

export default function SessionPage({ params }: { params: Promise<{ sessionId: string }> }) {
  const { sessionId } = use(params);
  const { data, error } = useResearchStream(sessionId);

  if (error) return <div className="p-8 text-center text-destructive">Error: {error}</div>;
  if (!data) return <div className="p-8 text-center text-muted-foreground animate-pulse">Connecting to research session...</div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="border-b border-border pb-6">
        <h1 className="text-3xl font-bold text-foreground">Research Report</h1>
        <p className="text-sm text-muted-foreground mt-1 font-mono">ID: {sessionId}</p>
      </header>

      <StatusDashboard 
        mode={data.mode || 'research'}
        currentStep={data.currentStep}
        plan={data.plan}
        status={data.report ? 'Completed' : 'Running'}
      />

      {data.report && (
        <ReportViewer 
          report={data.report} 
          citations={data.citations || []} 
        />
      )}
    </div>
  );
}
