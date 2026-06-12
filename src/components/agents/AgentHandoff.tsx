import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { clsx } from 'clsx';
import type { AgentId } from '../../types';
import { AGENT_MAP } from '../../data/mockAgents';

interface AgentHandoffProps {
  fromAgent: AgentId;
  toAgent: AgentId;
  visible: boolean;
}

export function AgentHandoff({ fromAgent, toAgent, visible }: AgentHandoffProps) {
  const from = AGENT_MAP[fromAgent];
  const to = AGENT_MAP[toAgent];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="flex items-center justify-center gap-3 py-4 px-6"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          aria-live="polite"
          aria-label={`${from.name} completed, handing off to ${to.name}`}
        >
          {/* From agent chip */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg"
            style={{ background: from.lightColor }}>
            <CheckCircle2 size={12} style={{ color: from.accentColor }} />
            <span className="text-caption font-semibold" style={{ color: from.accentColor }}>
              {from.name}
            </span>
          </div>

          {/* Arrow */}
          <motion.div
            animate={{ x: [0, 4, 0] }}
            transition={{ repeat: 3, duration: 0.5 }}
          >
            <ArrowRight size={14} className="text-ink-tertiary" />
          </motion.div>

          {/* To agent chip */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg"
            style={{ background: to.lightColor }}>
            <motion.span
              className="w-2 h-2 rounded-full"
              style={{ background: to.accentColor }}
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
            />
            <span className="text-caption font-semibold" style={{ color: to.accentColor }}>
              {to.name}
            </span>
          </div>

          <span className="text-caption text-ink-tertiary">taking over…</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
