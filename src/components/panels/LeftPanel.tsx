import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Users } from 'lucide-react';
import { useWorkspace } from '../../store/workspaceStore';
import { AGENTS } from '../../data/mockAgents';
import { GoalCard } from '../workspace/GoalCard';
import { AgentCard } from '../agents/AgentCard';
import { Button } from '../ui/Button';
import { ProgressTracker } from '../workspace/ProgressTracker';
import type { AgentId } from '../../types';

export function LeftPanel() {
  const { state, resetWorkspace } = useWorkspace();
  const isRunning = state.phase === 'running';
  const isDone = state.phase === 'done';

  return (
    <div className="flex flex-col h-full bg-white border-r border-surface-border">
      {/* Panel header */}
      <div className="shrink-0 px-4 py-4 border-b border-surface-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 flex items-center justify-center" aria-hidden="true">
              <Users size={14} className="text-ink-secondary" />
            </div>
            <span className="text-body-sm font-semibold text-ink">Workspace</span>
          </div>
          {(isRunning || isDone) && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Button
                variant="ghost"
                size="sm"
                onClick={resetWorkspace}
                icon={<RotateCcw size={13} />}
                aria-label="Reset workspace and start over"
                className="text-ink-tertiary hover:text-ink text-caption"
              >
                Reset
              </Button>
            </motion.div>
          )}
        </div>

        {/* Progress tracker — visible during/after run */}
        <AnimatePresence>
          {(isRunning || isDone) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 overflow-hidden"
            >
              <ProgressTracker
                agentStatuses={state.agentStatuses}
                activeAgent={state.activeAgent}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        {/* Goal Card */}
        <div className="border-b border-surface-border">
          <GoalCard />
        </div>

        {/* Agent selector */}
        <div className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-label text-ink-tertiary uppercase tracking-wider">AI Agents</span>
            <span className="text-caption text-ink-disabled bg-surface-secondary px-1.5 py-0.5 rounded-full">3</span>
          </div>
          <div className="flex flex-col gap-2">
            {AGENTS.map((agent) => (
              <div key={agent.id} className="relative">
                <AgentCard
                  agentId={agent.id as AgentId}
                  status={state.agentStatuses[agent.id as AgentId]}
                  isActive={state.activeAgent === agent.id}
                  onClick={() => {
                    // Scroll center panel to this agent's section
                    const el = document.querySelector(`[aria-label="${agent.name} workstream"]`);
                    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="shrink-0 px-4 py-3 border-t border-surface-border">
        <p className="text-caption text-ink-tertiary text-center">
          Orbit AI Workspace · v1.0
        </p>
      </div>
    </div>
  );
}
