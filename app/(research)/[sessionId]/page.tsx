'use client';

import { use } from 'react';
import { ReportViewer } from '@/components/research/ReportViewer';
import { StatusDashboard } from '@/components/research/StatusDashboard';
import { useResearchStream } from '@/lib/hooks/useResearchStream';

export default function SessionPage({ params }: { params: Promise<{ sessionId: string }> }) {
  const { sessionId } = use(params);
  const { data, error } = useResearchStream(sessionId);

  if (error) return <div className="p-8 text-center text-red-500">Error: {error}</div>;
  if (!data) return <div className="p-8 text-center">Connecting to research session...</div>;

  return (
    <div className="max-w-4xl mx-auto p-8">
      <header className="mb-8 border-b pb-4">
        <h1 className="text-2xl font-bold text-gray-800">Research Session</h1>
        <p className="text-gray-500">Session ID: {sessionId}</p>
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
