import { motion, AnimatePresence } from 'framer-motion';
import {
  Lightbulb, AlertTriangle, CheckSquare2, Download,
  ChevronDown, ChevronUp, TrendingUp, CheckCircle2
} from 'lucide-react';
import { useState, useCallback } from 'react';
import { clsx } from 'clsx';
import { useWorkspace } from '../../store/workspaceStore';
import type { KeyDecision, Risk, ActionItem } from '../../types';
import { AGENT_MAP } from '../../data/mockAgents';
import { Skeleton } from '../ui/SkeletonLoader';
import { Button } from '../ui/Button';
import { generateMarkdownExport, downloadFile, generateFilename } from '../../utils/exportWorkspace';

// ─── Decision Card ─────────────────────────────────────────
function DecisionCard({ decision, index }: { decision: KeyDecision; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const agent = AGENT_MAP[decision.agent];
  const priorityColors = { high: '#EF4444', medium: '#F59E0B', low: '#94A3B8' };

  return (
    <motion.div
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.07, type: 'spring', stiffness: 300, damping: 28 }}
      className="bg-white border border-surface-border rounded-xl overflow-hidden"
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left px-4 py-3 flex items-start gap-3 hover:bg-surface-secondary transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
        aria-expanded={expanded}
        aria-label={`Decision: ${decision.title}. Priority: ${decision.priority}.`}
      >
        <span
          className="mt-1 w-2 h-2 rounded-full shrink-0"
          style={{ background: priorityColors[decision.priority] }}
          aria-hidden="true"
        />
        <div className="flex-1 min-w-0">
          <p className="text-body-sm font-semibold text-ink leading-snug">{decision.title}</p>
          <div className="flex items-center gap-2 mt-1">
            <span
              className="text-caption font-medium px-1.5 py-0.5 rounded-md"
              style={{ background: agent.lightColor, color: agent.accentColor }}
            >
              {agent.name}
            </span>
            <span className="text-caption capitalize" style={{ color: priorityColors[decision.priority] }}>
              {decision.priority} priority
            </span>
          </div>
        </div>
        {expanded ? (
          <ChevronUp size={14} className="text-ink-tertiary shrink-0 mt-1" aria-hidden="true" />
        ) : (
          <ChevronDown size={14} className="text-ink-tertiary shrink-0 mt-1" aria-hidden="true" />
        )}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 border-t border-surface-border pt-3">
              <p className="text-body-sm text-ink-secondary leading-relaxed">{decision.description}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Risk Card ─────────────────────────────────────────────
function RiskCard({ risk, index }: { risk: Risk; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const severityConfig = {
    critical: { color: '#EF4444', bg: '#FEF2F2', label: 'Critical' },
    high: { color: '#F59E0B', bg: '#FFFBEB', label: 'High' },
    medium: { color: '#8B5CF6', bg: '#F5F3FF', label: 'Medium' },
    low: { color: '#94A3B8', bg: '#F8FAFC', label: 'Low' },
  };
  const config = severityConfig[risk.severity];

  return (
    <motion.div
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.07, type: 'spring', stiffness: 300, damping: 28 }}
      className="bg-white border border-surface-border rounded-xl overflow-hidden"
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left px-4 py-3 flex items-start gap-3 hover:bg-surface-secondary transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
        aria-expanded={expanded}
        aria-label={`Risk: ${risk.title}. Severity: ${risk.severity}.`}
      >
        <span
          className="mt-1 text-caption font-bold px-1.5 py-0.5 rounded shrink-0"
          style={{ background: config.bg, color: config.color }}
        >
          {config.label}
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-body-sm font-semibold text-ink leading-snug">{risk.title}</p>
        </div>
        {expanded ? (
          <ChevronUp size={14} className="text-ink-tertiary shrink-0 mt-1" aria-hidden="true" />
        ) : (
          <ChevronDown size={14} className="text-ink-tertiary shrink-0 mt-1" aria-hidden="true" />
        )}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 border-t border-surface-border pt-3 space-y-3">
              <p className="text-body-sm text-ink-secondary leading-relaxed">{risk.description}</p>
              <div>
                <p className="text-label text-ink-tertiary uppercase tracking-wider mb-1">Mitigation</p>
                <p className="text-body-sm text-ink-secondary leading-relaxed">{risk.mitigation}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Action Item Row ────────────────────────────────────────
function ActionItemRow({ item, index }: { item: ActionItem; index: number }) {
  const agent = AGENT_MAP[item.assignedTo];
  const statusConfig = {
    pending: { color: '#94A3B8', label: 'Pending' },
    'in-progress': { color: '#F59E0B', label: 'In progress' },
    done: { color: '#22C55E', label: 'Done' },
  };
  const sc = statusConfig[item.status];
  const priorityDot = { high: '#EF4444', medium: '#F59E0B', low: '#94A3B8' };

  return (
    <motion.div
      initial={{ opacity: 0, x: 8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05, type: 'spring', stiffness: 300, damping: 28 }}
      className="flex items-center gap-3 py-2.5 px-4 rounded-xl hover:bg-surface-secondary transition-colors duration-150"
    >
      <span
        className="w-1.5 h-1.5 rounded-full shrink-0"
        style={{ background: priorityDot[item.priority] }}
        aria-hidden="true"
      />
      <span className="flex-1 text-body-sm text-ink-secondary leading-snug">{item.title}</span>
      <div className="flex items-center gap-2 shrink-0">
        <span
          className="text-caption font-medium px-1.5 py-0.5 rounded-md whitespace-nowrap"
          style={{ background: agent.lightColor, color: agent.accentColor }}
        >
          {agent.initials}
        </span>
        <span className="text-caption whitespace-nowrap" style={{ color: sc.color }}>
          {sc.label}
        </span>
      </div>
    </motion.div>
  );
}

// ─── Skeleton placeholders ──────────────────────────────────
function InsightSkeleton() {
  return (
    <div className="space-y-2">
      {[0, 1, 2].map((i) => (
        <div key={i} className="bg-white border border-surface-border rounded-xl px-4 py-3 flex gap-3">
          <Skeleton className="w-2 h-2 mt-1.5" rounded="full" />
          <div className="flex-1 space-y-1.5">
            <Skeleton className="h-3.5 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Section wrapper ────────────────────────────────────────
function Section({
  title,
  icon,
  count,
  children,
  badge,
}: {
  title: string;
  icon: React.ReactNode;
  count?: number;
  children: React.ReactNode;
  badge?: string;
}) {
  return (
    <section aria-label={title}>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-ink-secondary" aria-hidden="true">{icon}</span>
        <span className="text-body-sm font-semibold text-ink">{title}</span>
        {count !== undefined && (
          <span className="text-caption text-ink-tertiary bg-surface-secondary px-1.5 py-0.5 rounded-full">
            {count}
          </span>
        )}
        {badge && (
          <span className="text-caption font-medium text-primary bg-primary/8 px-1.5 py-0.5 rounded-full ml-auto">
            {badge}
          </span>
        )}
      </div>
      {children}
    </section>
  );
}

// ─── Right Panel ────────────────────────────────────────────
export function RightPanel() {
  const { state } = useWorkspace();
  const { decisions, risks, actionItems } = state.insights;
  const isDone = state.phase === 'done';
  const isRunning = state.phase === 'running';
  const hasInsights = decisions.length > 0 || risks.length > 0 || actionItems.length > 0;
  const [exportState, setExportState] = useState<'idle' | 'exporting' | 'done' | 'error'>('idle');

  const handleExport = useCallback(async () => {
    if (exportState === 'exporting') return;
    setExportState('exporting');
    try {
      const markdown = generateMarkdownExport(state);
      const filename = generateFilename(state.goal || 'orbit-workspace');
      downloadFile(markdown, filename);
      setExportState('done');
      // Reset after 2.5s
      setTimeout(() => setExportState('idle'), 2500);
    } catch (err) {
      console.error('Export failed:', err);
      setExportState('error');
      setTimeout(() => setExportState('idle'), 3000);
    }
  }, [state, exportState]);

  return (
    <div className="flex flex-col h-full bg-white border-l border-surface-border">
      {/* Header */}
      <div className="shrink-0 px-5 py-4 border-b border-surface-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp size={15} className="text-ink-secondary" aria-hidden="true" />
          <span className="text-body-sm font-semibold text-ink">Insights</span>
        </div>
        {isDone && (
          <motion.div whileTap={{ scale: 0.96 }}>
            <Button
              variant={exportState === 'done' ? 'ghost' : 'secondary'}
              size="sm"
              loading={exportState === 'exporting'}
              icon={
                exportState === 'done'
                  ? <CheckCircle2 size={12} className="text-green-600" />
                  : exportState === 'error'
                  ? <AlertTriangle size={12} className="text-red-500" />
                  : <Download size={12} />
              }
              onClick={handleExport}
              aria-label="Export workspace as Markdown file"
              className={
                exportState === 'done'
                  ? 'text-green-600 border-green-200 bg-green-50 hover:bg-green-100'
                  : exportState === 'error'
                  ? 'text-red-500 border-red-200 bg-red-50'
                  : ''
              }
            >
              {exportState === 'done'
                ? 'Exported!'
                : exportState === 'error'
                ? 'Failed — retry'
                : 'Export .md'
              }
            </Button>
          </motion.div>
        )}
      </div>

      {/* Body */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        {/* Empty / idle state */}
        {!isRunning && !hasInsights && (
          <div className="flex flex-col items-center justify-center h-full px-6 py-12 text-center">
            <div className="w-12 h-12 rounded-2xl bg-surface-secondary flex items-center justify-center mb-4" aria-hidden="true">
              <TrendingUp size={20} className="text-ink-disabled" />
            </div>
            <p className="text-body-sm font-medium text-ink-secondary mb-1">No insights yet</p>
            <p className="text-caption text-ink-tertiary">
              Insights populate as agents complete their analysis.
            </p>
          </div>
        )}

        {/* Loading skeletons during run */}
        {isRunning && !hasInsights && (
          <div className="p-5 space-y-6">
            <div>
              <Skeleton className="h-3 w-1/3 mb-3" />
              <InsightSkeleton />
            </div>
            <div>
              <Skeleton className="h-3 w-1/4 mb-3" />
              <InsightSkeleton />
            </div>
          </div>
        )}

        {/* Populated insights */}
        {hasInsights && (
          <div className="p-5 space-y-8">
            {/* Key Decisions */}
            {decisions.length > 0 && (
              <Section
                title="Key Decisions"
                icon={<Lightbulb size={15} />}
                count={decisions.length}
              >
                <div className="space-y-2">
                  {decisions.map((d, i) => (
                    <DecisionCard key={d.id} decision={d} index={i} />
                  ))}
                </div>
              </Section>
            )}

            {/* Risks */}
            {risks.length > 0 && (
              <Section
                title="Risks"
                icon={<AlertTriangle size={15} />}
                count={risks.length}
                badge={risks.some(r => r.severity === 'critical') ? 'Critical' : undefined}
              >
                <div className="space-y-2">
                  {risks.map((r, i) => (
                    <RiskCard key={r.id} risk={r} index={i} />
                  ))}
                </div>
              </Section>
            )}

            {/* Action Items */}
            {actionItems.length > 0 && (
              <Section
                title="Action Items"
                icon={<CheckSquare2 size={15} />}
                count={actionItems.length}
              >
                <div className="border border-surface-border rounded-xl overflow-hidden divide-y divide-surface-border">
                  {actionItems.map((item, i) => (
                    <ActionItemRow key={item.id} item={item} index={i} />
                  ))}
                </div>
              </Section>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
