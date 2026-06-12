import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { AGENT_MAP } from '../../data/mockAgents';
import type { AgentId } from '../../types';

interface ErrorStateProps {
  agentId: AgentId;
  message?: string;
  onRetry: () => void;
  onContinue: () => void;
}

export function ErrorState({ agentId, message, onRetry, onContinue }: ErrorStateProps) {
  const agent = AGENT_MAP[agentId];

  return (
    <motion.div
      className="flex flex-col items-center justify-center h-full px-8 py-16 text-center"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Error icon */}
      <div className="w-14 h-14 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center mb-6">
        <AlertCircle size={24} className="text-error" aria-hidden="true" />
      </div>

      <h2 className="text-h3 font-semibold text-ink mb-2">
        {agent.name} hit a snag
      </h2>

      <p className="text-body text-ink-secondary max-w-xs mb-2 leading-relaxed">
        {message || `${agent.name} could not complete this task. You can retry or continue with the information already gathered.`}
      </p>

      <p className="text-caption text-ink-tertiary mb-8">
        No data was lost. All previous output is preserved.
      </p>

      <div className="flex items-center gap-3">
        <Button
          variant="secondary"
          onClick={onRetry}
          icon={<RefreshCw size={14} />}
          aria-label={`Retry ${agent.name}`}
        >
          Retry {agent.name}
        </Button>
        <Button
          onClick={onContinue}
          icon={<ArrowRight size={14} />}
          iconPosition="right"
          aria-label="Continue with available data"
        >
          Continue
        </Button>
      </div>
    </motion.div>
  );
}
