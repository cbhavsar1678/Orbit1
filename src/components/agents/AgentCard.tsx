import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { Zap, Search, Hammer, ChevronRight } from 'lucide-react';
import type { AgentId, AgentStatus } from '../../types';
import { AGENT_MAP } from '../../data/mockAgents';
import { AgentAvatar } from './AgentAvatar';
import { StatusBadge } from '../ui/StatusBadge';

interface AgentCardProps {
  agentId: AgentId;
  status: AgentStatus;
  isActive: boolean;
  onClick: () => void;
  className?: string;
}

const AgentIcon = ({ agentId, size = 16 }: { agentId: AgentId; size?: number }) => {
  if (agentId === 'strategist') return <Zap size={size} />;
  if (agentId === 'researcher') return <Search size={size} />;
  return <Hammer size={size} />;
};

export function AgentCard({ agentId, status, isActive, onClick, className }: AgentCardProps) {
  const agent = AGENT_MAP[agentId];

  return (
    <motion.button
      onClick={onClick}
      className={clsx(
        'w-full text-left rounded-2xl p-4 transition-all duration-180',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
        'border',
        isActive
          ? 'border-opacity-100 bg-white shadow-card-hover'
          : 'border-surface-border bg-white hover:shadow-card hover:border-surface-border',
        className
      )}
      style={isActive ? { borderColor: agent.accentColor } : {}}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.1 }}
      aria-pressed={isActive}
      aria-label={`${agent.name} agent — ${agent.specialty} — status: ${status}`}
    >
      <div className="flex items-start gap-3">
        <AgentAvatar agentId={agentId} status={status} size="md" />

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-0.5">
            <div className="flex items-center gap-1.5">
              <span
                className="text-body-sm font-semibold text-ink"
              >
                {agent.name}
              </span>
              {isActive && (
                <motion.span
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-caption font-medium px-1.5 py-0.5 rounded-md"
                  style={{ background: agent.lightColor, color: agent.accentColor }}
                >
                  Active
                </motion.span>
              )}
            </div>
            <ChevronRight
              size={14}
              className={clsx(
                'transition-colors duration-150',
                isActive ? 'text-ink-secondary' : 'text-ink-disabled'
              )}
            />
          </div>

          <p className="text-caption text-ink-tertiary mb-2 flex items-center gap-1">
            <AgentIcon agentId={agentId} size={11} />
            {agent.specialty}
          </p>

          <StatusBadge status={status} size="sm" />
        </div>
      </div>

      {/* Active indicator line */}
      {isActive && (
        <motion.div
          className="absolute left-0 top-3 bottom-3 w-0.5 rounded-full"
          style={{ background: agent.gradient }}
          layoutId="agent-active-line"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </motion.button>
  );
}
