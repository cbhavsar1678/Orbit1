import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import {
  BarChart3, Lightbulb, CheckSquare, AlertTriangle, Link2, BookOpen,
} from 'lucide-react';
import type { WorkstreamSection } from '../../types';
import { CitationList } from '../ui/CitationChip';
import { Skeleton, SkeletonText } from '../ui/SkeletonLoader';
import { MarkdownText } from './StreamingText';

const typeConfig = {
  analysis: {
    icon: BarChart3,
    label: 'Analysis',
    color: '#5B6CFF',
    bg: '#F0F1FF',
  },
  insight: {
    icon: Lightbulb,
    label: 'Insight',
    color: '#8B5CF6',
    bg: '#F5F3FF',
  },
  task: {
    icon: CheckSquare,
    label: 'Task',
    color: '#06B6D4',
    bg: '#ECFEFF',
  },
  risk: {
    icon: AlertTriangle,
    label: 'Risk',
    color: '#F59E0B',
    bg: '#FFFBEB',
  },
  source: {
    icon: Link2,
    label: 'Sources',
    color: '#94A3B8',
    bg: '#F1F5F9',
  },
  plan: {
    icon: BookOpen,
    label: 'Plan',
    color: '#5B6CFF',
    bg: '#F0F1FF',
  },
};

interface WorkstreamCardProps {
  section: WorkstreamSection;
  index: number;
  isStreaming?: boolean;
}

export function WorkstreamCard({ section, index, isStreaming = false }: WorkstreamCardProps) {
  const config = typeConfig[section.type] || typeConfig.analysis;
  const Icon = config.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 28,
        delay: index * 0.05,
      }}
      className="bg-white border border-surface-border rounded-2xl overflow-hidden shadow-card"
      aria-label={section.title}
    >
      {/* Card header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-surface-border">
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: config.bg }}
          aria-hidden="true"
        >
          <Icon size={14} style={{ color: config.color }} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-body-sm font-semibold text-ink truncate">{section.title}</h3>
          <span
            className="text-caption font-medium"
            style={{ color: config.color }}
          >
            {config.label}
          </span>
        </div>
        {isStreaming && (
          <motion.div
            className="flex gap-0.5"
            aria-label="Generating content"
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="w-1 h-1 rounded-full bg-ink-disabled"
                animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
                transition={{ repeat: Infinity, duration: 0.9, delay: i * 0.15 }}
              />
            ))}
          </motion.div>
        )}
      </div>

      {/* Card body */}
      <div className="px-5 py-4">
        {section.status === 'done' || section.content ? (
          <>
            <MarkdownText text={section.content} />
            {section.citations && section.citations.length > 0 && (
              <div className="mt-4 pt-4 border-t border-surface-border">
                <p className="text-label text-ink-tertiary uppercase mb-2">Sources</p>
                <CitationList citations={section.citations} />
              </div>
            )}
          </>
        ) : (
          <div className="space-y-3" aria-hidden="true">
            <SkeletonText lines={4} />
          </div>
        )}
      </div>
    </motion.article>
  );
}

export function WorkstreamCardSkeleton({ index = 0 }: { index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="bg-white border border-surface-border rounded-2xl overflow-hidden"
    >
      <div className="flex items-center gap-3 px-5 py-4 border-b border-surface-border">
        <Skeleton className="w-7 h-7" rounded="lg" />
        <div className="flex-1 space-y-1.5">
          <Skeleton className="h-3.5 w-1/3" />
          <Skeleton className="h-3 w-1/4" />
        </div>
      </div>
      <div className="px-5 py-4">
        <SkeletonText lines={5} />
      </div>
    </motion.div>
  );
}
