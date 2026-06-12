import { motion, AnimatePresence } from 'framer-motion';
import { Brain } from 'lucide-react';
import { useWorkspace } from '../../store/workspaceStore';
import { CollaborationCanvas } from '../workspace/CollaborationCanvas';
import { ProgressTracker } from '../workspace/ProgressTracker';

export function CenterPanel() {
  const { state } = useWorkspace();
  const isRunning = state.phase === 'running';

  return (
    <div className="flex flex-col h-full bg-surface-secondary">
      {/* Center header - only shown during active run */}
      <AnimatePresence>
        {(isRunning || state.phase === 'done') && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="shrink-0 bg-white border-b border-surface-border px-6 py-3 flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <Brain size={15} className="text-ink-secondary" aria-hidden="true" />
              <span className="text-body-sm font-semibold text-ink">Collaboration Canvas</span>
            </div>

            {/* Status summary */}
            <div className="flex items-center gap-4">
              <ProgressTracker
                agentStatuses={state.agentStatuses}
                activeAgent={state.activeAgent}
                className="hidden md:flex"
              />
              {isRunning && state.activeAgent && (
                <motion.div
                  className="flex items-center gap-1.5"
                  animate={{ opacity: [1, 0.6, 1] }}
                  transition={{ repeat: Infinity, duration: 1.8 }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-success" />
                  <span className="text-caption text-ink-secondary">Live</span>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main canvas — takes all remaining height */}
      <div className="flex-1 min-h-0">
        <CollaborationCanvas />
      </div>
    </div>
  );
}
