import { motion } from 'framer-motion';
import { CheckCircle2, Clock, Loader2 } from 'lucide-react';
import { clsx } from 'clsx';
import type { AgentId, AgentStatus } from '../../types';
import { AGENT_MAP, AGENTS } from '../../data/mockAgents';

interface ProgressTrackerProps {
  agentStatuses: Record<AgentId, AgentStatus>;
  activeAgent: AgentId | null;
  className?: string;
}

function AgentStep({
  agentId,
  status,
  isActive,
  isLast,
}: {
  agentId: AgentId;
  status: AgentStatus;
  isActive: boolean;
  isLast: boolean;
}) {
  const agent = AGENT_MAP[agentId];
  const isDone = status === 'done';
  const isWorking = status === 'thinking' || status === 'streaming';
  const isIdle = status === 'idle';

  return (
    <div className="flex items-center gap-2">
      {/* Step indicator */}
      <div className="relative flex items-center justify-center w-7 h-7 shrink-0">
        {isDone ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            <CheckCircle2 size={20} style={{ color: agent.accentColor }} />
          </motion.div>
        ) : isWorking ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
            style={{ color: agent.accentColor }}
          >
            <Loader2 size={18} />
          </motion.div>
        ) : (
          <div
            className="w-5 h-5 rounded-full border-2"
            style={{ borderColor: isIdle ? '#E2E8F0' : agent.accentColor }}
          />
        )}
      </div>

      {/* Label */}
      <span
        className={clsx(
          'text-caption font-semibold transition-colors duration-200',
          isDone && 'text-ink',
          isWorking && 'text-ink',
          isIdle && 'text-ink-disabled',
        )}
        style={isWorking ? { color: agent.accentColor } : {}}
      >
        {agent.name}
      </span>

      {/* Connector */}
      {!isLast && (
        <div className="flex-1 mx-1">
          <div className="h-px bg-surface-border relative overflow-hidden">
            {isDone && (
              <motion.div
                className="absolute inset-0 h-full"
                style={{ background: agent.accentColor }}
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.4 }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export function ProgressTracker({ agentStatuses, activeAgent, className }: ProgressTrackerProps) {
  return (
    <div
      className={clsx('flex items-center gap-0', className)}
      aria-label="Agent progress"
      role="progressbar"
    >
      {AGENTS.map((agent, i) => (
        <AgentStep
          key={agent.id}
          agentId={agent.id}
          status={agentStatuses[agent.id]}
          isActive={activeAgent === agent.id}
          isLast={i === AGENTS.length - 1}
        />
      ))}
    </div>
  );
}
