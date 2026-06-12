import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { TopNav } from './TopNav';
import { MobileNav } from './MobileNav';
import { LeftPanel } from '../panels/LeftPanel';
import { CenterPanel } from '../panels/CenterPanel';
import { RightPanel } from '../panels/RightPanel';
import type { MobileTab } from '../../types';

// Mobile profile placeholder
function MobileProfile() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
      <div
        className="w-20 h-20 rounded-2xl flex items-center justify-center text-white text-h2 font-bold mb-4"
        style={{ background: 'linear-gradient(135deg, #5B6CFF, #8B5CF6)' }}
      >
        CG
      </div>
      <h2 className="text-h3 font-semibold text-ink mb-1">Chirag G.</h2>
      <p className="text-body-sm text-ink-secondary mb-1">chirag@orbit.ai</p>
      <p className="text-caption text-ink-tertiary">Orbit AI Workspace</p>
    </div>
  );
}

export function WorkspaceLayout() {
  const [mobileTab, setMobileTab] = useState<MobileTab>('workspace');

  return (
    <div className="h-screen flex flex-col bg-surface-secondary overflow-hidden">
      {/* Top Navigation */}
      <TopNav />

      {/* Main content area */}
      <div className="flex-1 min-h-0 flex overflow-hidden">

        {/* ── Desktop layout (lg+) ───────────────────────── */}
        <div className="hidden lg:flex w-full overflow-hidden">
          {/* Left Panel */}
          <aside
            className="w-[320px] shrink-0"
            aria-label="Goal and agent controls"
          >
            <LeftPanel />
          </aside>

          {/* Center Panel — flexible width */}
          <main
            className="flex-1 min-w-0"
            aria-label="AI collaboration canvas"
          >
            <CenterPanel />
          </main>

          {/* Right Panel */}
          <aside
            className="w-[340px] shrink-0"
            aria-label="Insights and action items"
          >
            <RightPanel />
          </aside>
        </div>

        {/* ── Mobile layout (< lg) ───────────────────────── */}
        <div className="lg:hidden flex-1 min-h-0 overflow-hidden pb-[72px]">
          <AnimatePresence mode="wait">
            {mobileTab === 'workspace' && (
              <motion.div
                key="workspace"
                className="h-full"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.18 }}
              >
                <CenterPanel />
              </motion.div>
            )}
            {mobileTab === 'agents' && (
              <motion.div
                key="agents"
                className="h-full"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.18 }}
              >
                <LeftPanel />
              </motion.div>
            )}
            {mobileTab === 'insights' && (
              <motion.div
                key="insights"
                className="h-full"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.18 }}
              >
                <RightPanel />
              </motion.div>
            )}
            {mobileTab === 'profile' && (
              <motion.div
                key="profile"
                className="h-full bg-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                <MobileProfile />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile bottom navigation */}
      <div className="lg:hidden" aria-hidden="false">
        <MobileNav activeTab={mobileTab} onChange={setMobileTab} />
      </div>
    </div>
  );
}
