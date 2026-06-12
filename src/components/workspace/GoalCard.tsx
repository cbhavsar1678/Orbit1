import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, ChevronDown, Sparkles, ArrowRight } from 'lucide-react';
import { clsx } from 'clsx';
import { useWorkspace } from '../../store/workspaceStore';
import { useAgentSimulation } from '../../hooks/useAgentSimulation';
import { Button } from '../ui/Button';
import { Textarea } from '../ui/Input';

const EXAMPLE_GOALS = [
  'Launch an AI startup targeting healthcare providers.',
  'Build a B2B SaaS for remote team productivity.',
  'Create a sustainable fashion marketplace.',
  'Develop an EdTech platform for corporate training.',
];

export function GoalCard() {
  const { state, setGoal, setContext } = useWorkspace();
  const { startSimulation } = useAgentSimulation();
  const [isContextExpanded, setIsContextExpanded] = useState(false);
  const [isStarting, setIsStarting] = useState(false);

  const canStart = state.goal.trim().length > 10 && state.phase !== 'running';

  async function handleStart() {
    if (!canStart) return;
    setIsStarting(true);
    try {
      await startSimulation();
    } finally {
      setIsStarting(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey) && canStart) {
      handleStart();
    }
  }

  return (
    <div className="p-4 space-y-4">
      {/* Goal label */}
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center" aria-hidden="true">
          <Target size={12} className="text-primary" />
        </div>
        <span className="text-label text-ink-tertiary uppercase tracking-wider">Your Goal</span>
      </div>

      {/* Goal input */}
      <div className="relative">
        <textarea
          id="goal-input"
          value={state.goal}
          onChange={(e) => setGoal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder='e.g. "Launch an AI startup targeting healthcare providers."'
          rows={3}
          disabled={state.phase === 'running'}
          aria-label="Enter your goal"
          aria-describedby="goal-hint"
          className={clsx(
            'w-full bg-surface-secondary border border-surface-border rounded-xl',
            'text-body-sm text-ink placeholder-ink-tertiary',
            'px-4 py-3 resize-none transition-all duration-150',
            'hover:border-ink-disabled',
            'focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 focus:bg-white',
            'disabled:opacity-60 disabled:cursor-not-allowed',
          )}
        />
        {state.goal.length > 5 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute bottom-3 right-3"
          >
            <Sparkles size={14} className="text-primary opacity-60" aria-hidden="true" />
          </motion.div>
        )}
      </div>
      <p id="goal-hint" className="text-caption text-ink-tertiary -mt-2">
        Press <kbd className="px-1 py-0.5 bg-surface-tertiary border border-surface-border rounded text-caption">⌘↵</kbd> to start
      </p>

      {/* Example goals */}
      <AnimatePresence>
        {state.phase === 'empty' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-1.5"
          >
            <p className="text-label text-ink-tertiary uppercase tracking-wider">Try an example</p>
            {EXAMPLE_GOALS.map((g) => (
              <motion.button
                key={g}
                onClick={() => setGoal(g)}
                className={clsx(
                  'w-full text-left text-caption text-ink-secondary',
                  'px-3 py-2 rounded-lg bg-surface-secondary border border-transparent',
                  'hover:border-surface-border hover:text-ink hover:bg-white',
                  'transition-all duration-150',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                )}
                whileTap={{ scale: 0.98 }}
              >
                {g}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Context (collapsible) */}
      <div className="border border-surface-border rounded-xl overflow-hidden">
        <button
          onClick={() => setIsContextExpanded(!isContextExpanded)}
          className={clsx(
            'w-full flex items-center justify-between px-4 py-3',
            'text-body-sm font-medium text-ink-secondary',
            'hover:bg-surface-secondary transition-colors duration-150',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary',
          )}
          aria-expanded={isContextExpanded}
          aria-controls="context-panel"
        >
          <span>Add context</span>
          <motion.span
            animate={{ rotate: isContextExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown size={14} aria-hidden="true" />
          </motion.span>
        </button>

        <AnimatePresence>
          {isContextExpanded && (
            <motion.div
              id="context-panel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4 pt-1">
                <Textarea
                  value={state.context}
                  onChange={(e) => setContext(e.target.value)}
                  placeholder="Add any relevant context — industry, constraints, audience, or prior research…"
                  rows={4}
                  disabled={state.phase === 'running'}
                  aria-label="Additional context"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* CTA */}
      <Button
        id="start-workspace-btn"
        onClick={handleStart}
        disabled={!canStart}
        loading={isStarting || state.phase === 'running'}
        fullWidth
        size="lg"
        icon={<ArrowRight size={16} />}
        iconPosition="right"
        className="mt-2"
        aria-label="Start workspace — launch all three AI agents"
      >
        {state.phase === 'running' ? 'Agents working…' : 'Start Workspace'}
      </Button>
    </div>
  );
}
