import { ExternalLink } from 'lucide-react';
import { clsx } from 'clsx';
import type { Citation } from '../../types';

interface CitationChipProps {
  citation: Citation;
  className?: string;
}

export function CitationChip({ citation, className }: CitationChipProps) {
  return (
    <a
      href={citation.url || '#'}
      target={citation.url ? '_blank' : undefined}
      rel="noopener noreferrer"
      className={clsx(
        'inline-flex items-center gap-1 px-2 py-0.5 rounded-md',
        'text-caption font-medium',
        'bg-primary/8 text-primary border border-primary/15',
        'hover:bg-primary/15 hover:border-primary/25 transition-colors duration-150',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1',
        className
      )}
      aria-label={`Citation: ${citation.label} — ${citation.source}`}
    >
      <span>{citation.label}</span>
      {citation.url && citation.url !== '#' && (
        <ExternalLink className="w-2.5 h-2.5 opacity-60" aria-hidden="true" />
      )}
    </a>
  );
}

interface CitationListProps {
  citations: Citation[];
  className?: string;
}

export function CitationList({ citations, className }: CitationListProps) {
  if (!citations.length) return null;
  return (
    <div className={clsx('flex flex-wrap gap-1.5', className)} aria-label="Citations">
      {citations.map((c) => (
        <CitationChip key={c.id} citation={c} />
      ))}
    </div>
  );
}
