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
    <div className="prose prose-blue max-w-none" ref={containerRef}>
      <ReactMarkdown
        components={{
          code({ className, children, ...props }: React.ComponentPropsWithoutRef<'code'>) {
            if (className === 'language-mermaid') {
              return <div className="mermaid">{children}</div>;
            }
            return <code className={className} {...props}>{children}</code>;
          }
        }}
      >
        {report}
      </ReactMarkdown>
      
      {citations && citations.length > 0 && (
        <div className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-bold mb-4">Sources & Citations</h2>
          <ul className="space-y-4">
            {citations.map((citation) => (
              <li key={citation.id} className="text-sm">
                <a 
                  href={citation.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-bold text-blue-600 hover:underline"
                >
                  {citation.title}
                </a>
                <p className="text-gray-600 mt-1">{citation.snippet}</p>
                <span className="text-xs text-gray-400">Accessed on: {new Date(citation.accessDate).toLocaleDateString()}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
