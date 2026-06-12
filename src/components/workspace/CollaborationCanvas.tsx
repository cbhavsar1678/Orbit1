import { useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useWorkspace } from '../../store/workspaceStore';
import { AGENTS } from '../../data/mockAgents';
import type { AgentId } from '../../types';
import { WorkstreamCard, WorkstreamCardSkeleton } from './WorkstreamCard';
import { AgentAvatar } from '../agents/AgentAvatar';
import { StatusBadge } from '../ui/StatusBadge';
import { EmptyState } from '../states/EmptyState';
import { ErrorState } from '../states/ErrorState';
import { useAgentSimulation } from '../../hooks/useAgentSimulation';

function AgentWorkstreamSection({ agentId }: { agentId: AgentId }) {
  const { state } = useWorkspace();
  const agent = AGENTS.find(a => a.id === agentId)!;
  const status = state.agentStatuses[agentId];
  const workstream = state.workstreams[agentId];
  const isActive = state.activeAgent === agentId;
  const isThinking = status === 'thinking';
  const isStreaming = status === 'streaming';
  const isIdle = status === 'idle';
  const isDone = status === 'done';

  // Don't render if not yet started
  if (isIdle && state.phase === 'running' && !workstream) return null;
  if (isIdle && state.phase !== 'running') return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 280, damping: 28 }}
      aria-label={`${agent.name} workstream`}
      className="mb-8"
    >
      {/* Workstream header */}
      <div className="flex items-center gap-3 mb-5">
        <AgentAvatar agentId={agentId} status={status} size="md" />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h2 className="text-h3 font-semibold text-ink">{agent.name}</h2>
            <StatusBadge status={status} size="sm" />
          </div>
          <p className="text-caption text-ink-tertiary">{agent.specialty}</p>
        </div>

        {isDone && workstream?.completedAt && (
          <span className="text-caption text-ink-tertiary">
            Completed
          </span>
        )}
      </div>

      {/* Thinking state — skeleton */}
      {isThinking && (
        <div className="space-y-3" aria-label="Thinking…">
          <WorkstreamCardSkeleton index={0} />
          <WorkstreamCardSkeleton index={1} />
        </div>
      )}

      {/* Streaming / Done — show sections */}
      {(isStreaming || isDone) && workstream && (
        <div className="space-y-3">
          <AnimatePresence>
            {workstream.sections.map((section, i) => (
              <WorkstreamCard
                key={section.id}
                section={section}
                index={i}
                isStreaming={isStreaming && i === workstream.sections.length - 1}
              />
            ))}
          </AnimatePresence>

          {/* Still streaming — show one more skeleton */}
          {isStreaming && (
            <WorkstreamCardSkeleton index={workstream.sections.length} />
          )}
        </div>
      )}

      {/* Section divider */}
      {!isIdle && (
        <div className="mt-8 border-b border-surface-border" aria-hidden="true" />
      )}
    </motion.section>
  );
}

export function CollaborationCanvas() {
  const { state, dispatch } = useWorkspace();
  const { startSimulation } = useAgentSimulation();
  const scrollRef = useRef<HTMLDivElement>(null);

  function handleGetStarted() {
    const goalInput = document.getElementById('goal-input') as HTMLTextAreaElement | null;
    goalInput?.focus();
  }

  function handleRetry() {
    startSimulation();
  }

  function handleContinue() {
    dispatch({ type: 'SET_INSIGHTS', payload: state.insights });
  }

  // Empty state
  if (state.phase === 'empty' || state.phase === 'goal-entered') {
    return <EmptyState onGetStarted={handleGetStarted} />;
  }

  // Error state
  if (state.phase === 'error' && state.error) {
    return (
      <ErrorState
        agentId={state.error.agentId}
        message={state.error.message}
        onRetry={handleRetry}
        onContinue={handleContinue}
      />
    );
  }

  return (
    <div
      ref={scrollRef}
      className="h-full overflow-y-auto px-6 py-6"
      aria-label="AI collaboration canvas"
    >
      {/* Goal display banner */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 p-5 bg-gradient-to-r from-primary/5 to-violet-500/5 border border-primary/10 rounded-2xl"
      >
        <p className="text-label text-primary uppercase tracking-wider mb-1">Active Goal</p>
        <p className="text-body font-medium text-ink leading-relaxed">
          {state.goal}
        </p>
        {state.context && (
          <p className="text-body-sm text-ink-secondary mt-1 line-clamp-2">{state.context}</p>
        )}
      </motion.div>

      {/* Workstreams */}
      {AGENTS.map((agent) => (
        <AgentWorkstreamSection key={agent.id} agentId={agent.id} />
      ))}

      {/* Done celebration */}
      <AnimatePresence>
        {state.phase === 'done' && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-5 bg-green-50 border border-green-200 rounded-2xl text-center"
          >
            <p className="text-body font-semibold text-green-800">
              ✦ All agents completed
            </p>
            <p className="text-body-sm text-green-600 mt-0.5">
              Check the Insights panel for key decisions and action items.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
