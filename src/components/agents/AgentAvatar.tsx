import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import type { AgentId, AgentStatus } from '../../types';
import { AGENT_MAP } from '../../data/mockAgents';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface AgentAvatarProps {
  agentId: AgentId;
  status: AgentStatus;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showRing?: boolean;
  className?: string;
}

const sizeConfig = {
  sm: { outer: 32, inner: 28, text: '10px' },
  md: { outer: 40, inner: 36, text: '13px' },
  lg: { outer: 52, inner: 46, text: '16px' },
  xl: { outer: 64, inner: 56, text: '20px' },
};

export function AgentAvatar({ agentId, status, size = 'md', showRing = true, className }: AgentAvatarProps) {
  const agent = AGENT_MAP[agentId];
  const prefersReduced = useReducedMotion();
  const { outer, inner, text } = sizeConfig[size];

  const isActive = status === 'thinking' || status === 'streaming';
  const isDone = status === 'done';

  return (
    <div
      className={clsx('relative shrink-0 flex items-center justify-center', className)}
      style={{ width: outer, height: outer }}
      aria-label={`${agent.name} — ${status}`}
    >
      {/* Animated ring */}
      {showRing && isActive && !prefersReduced && (
        <>
          <motion.span
            className="absolute inset-0 rounded-full"
            style={{ border: `2px solid ${agent.accentColor}` }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.7, 0, 0.7] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          />
          <motion.span
            className="absolute inset-0 rounded-full"
            style={{ border: `1.5px solid ${agent.accentColor}` }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut', delay: 0.5 }}
          />
        </>
      )}

      {/* Done checkmark ring */}
      {isDone && (
        <motion.span
          className="absolute inset-0 rounded-full border-2 border-success"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        />
      )}

      {/* Avatar circle */}
      <motion.div
        className="rounded-full flex items-center justify-center"
        style={{
          width: inner,
          height: inner,
          background: agent.gradient,
        }}
        animate={isActive && !prefersReduced ? { scale: [1, 1.04, 1] } : { scale: 1 }}
        transition={isActive ? { repeat: Infinity, duration: 2.5, ease: 'easeInOut' } : {}}
      >
        <span
          style={{ fontSize: text, fontWeight: 700, color: 'white', letterSpacing: '0.02em' }}
        >
          {agent.initials}
        </span>
      </motion.div>

      {/* Status dot */}
      <AnimatePresence>
        {status !== 'idle' && (
          <motion.span
            className={clsx(
              'absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white',
              status === 'thinking' && 'bg-warning',
              status === 'streaming' && 'bg-success',
              status === 'done' && 'bg-success',
              status === 'error' && 'bg-error',
            )}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
