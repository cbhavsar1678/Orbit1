import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface StreamingTextProps {
  text: string;
  speed?: number;  // ms per word
  onComplete?: () => void;
  className?: string;
}

export function StreamingText({ text, speed = 25, onComplete, className }: StreamingTextProps) {
  const prefersReduced = useReducedMotion();
  const [visibleWords, setVisibleWords] = useState(0);
  const words = text.split(' ');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (prefersReduced) {
      setVisibleWords(words.length);
      onCompleteRef.current?.();
      return;
    }

    setVisibleWords(0);
    let idx = 0;

    intervalRef.current = setInterval(() => {
      idx++;
      setVisibleWords(idx);
      if (idx >= words.length) {
        clearInterval(intervalRef.current!);
        onCompleteRef.current?.();
      }
    }, speed);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, speed, prefersReduced, words.length]);

  const isStreaming = visibleWords < words.length;

  return (
    <span className={className} aria-live="polite">
      {words.slice(0, visibleWords).join(' ')}
      {isStreaming && (
        <motion.span
          className="inline-block w-px h-4 bg-primary ml-0.5 align-middle"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
          aria-hidden="true"
        />
      )}
    </span>
  );
}

// Markdown-aware text renderer (basic bold/italic support)
export function MarkdownText({ text, className }: { text: string; className?: string }) {
  // Split into lines, handle bold (**text**) and bullet points
  const lines = text.split('\n');

  return (
    <div className={className}>
      {lines.map((line, i) => {
        if (!line.trim()) return <div key={i} className="h-2" />;

        // Heading lines (bold with **)
        if (line.startsWith('**') && line.endsWith('**')) {
          const content = line.slice(2, -2);
          return <p key={i} className="font-semibold text-ink mb-1">{content}</p>;
        }

        // Bullet / list items
        if (line.startsWith('- ') || line.startsWith('• ') || line.match(/^[\[\]✅📊💰⏱️🔗📉⚠️🚀📋]/)) {
          const content = renderInlineMarkdown(line);
          return <div key={i} className="flex gap-2 mb-1 text-body-sm text-ink-secondary leading-relaxed">
            <span>{content}</span>
          </div>;
        }

        // Normal paragraph
        const content = renderInlineMarkdown(line);
        return <p key={i} className="text-body-sm text-ink-secondary leading-relaxed mb-1">{content}</p>;
      })}
    </div>
  );
}

function renderInlineMarkdown(text: string): React.ReactNode {
  // Handle **bold** inline
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  if (parts.length === 1) return text;

  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-semibold text-ink">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}
