import ReactMarkdown from 'react-markdown';
import { SourceCitation } from '@/lib/schema/research';
import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({ startOnLoad: true, theme: 'default' });

interface ReportViewerProps {
  report: string;
  citations: SourceCitation[];
}

export function ReportViewer({ report, citations }: ReportViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      mermaid.contentLoaded();
    }
  }, [report]);

  return (
    <div className="prose prose-slate dark:prose-invert max-w-none" ref={containerRef}>
      <ReactMarkdown
        components={{
          code({ className, children, ...props }: React.ComponentPropsWithoutRef<'code'>) {
            if (className === 'language-mermaid') {
              return <div className="mermaid bg-white dark:bg-white/90 p-4 rounded-lg overflow-x-auto">{children}</div>;
            }
            return <code className={className} {...props}>{children}</code>;
          }
        }}
      >
        {report}
      </ReactMarkdown>
      
      {citations && citations.length > 0 && (
        <div className="mt-12 border-t border-border pt-8">
          <h2 className="text-2xl font-bold mb-4 text-foreground">출처 및 인용</h2>
          <ul className="space-y-4">
            {citations.map((citation) => (
              <li key={citation.id} className="text-sm">
                <a 
                  href={citation.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-bold text-primary hover:underline hover:text-primary/80 transition-colors"
                >
                  {citation.title}
                </a>
                <p className="text-muted-foreground mt-1">{citation.snippet}</p>
                <span className="text-xs text-muted-foreground/60">접속일: {new Date(citation.accessDate).toLocaleDateString()}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
