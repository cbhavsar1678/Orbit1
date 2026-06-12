import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface EmptyStateProps {
  onGetStarted: () => void;
}

// SVG Orbital animation component
function OrbitalIllustration() {
  const prefersReduced = useReducedMotion();

  const agents = [
    { id: 'strategist', initials: 'ST', gradient: ['#5B6CFF', '#8B5CF6'], angle: 0, label: 'Strategist', delay: 0 },
    { id: 'researcher', initials: 'RE', gradient: ['#8B5CF6', '#A78BFA'], angle: 120, label: 'Researcher', delay: 2.67 },
    { id: 'builder', initials: 'BU', gradient: ['#06B6D4', '#22D3EE'], angle: 240, label: 'Builder', delay: 5.33 },
  ];

  return (
    <div className="relative w-64 h-64 mx-auto" aria-hidden="true">
      {/* Orbital ring */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 256 256"
        fill="none"
      >
        {/* Outer dashed ring */}
        <circle
          cx="128"
          cy="128"
          r="96"
          stroke="#E2E8F0"
          strokeWidth="1.5"
          strokeDasharray="4 6"
        />
        {/* Inner ring */}
        <circle
          cx="128"
          cy="128"
          r="60"
          stroke="#F1F5F9"
          strokeWidth="1"
        />
      </svg>

      {/* Center goal node */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="w-16 h-16 rounded-2xl flex flex-col items-center justify-center shadow-elevated"
          style={{
            background: 'linear-gradient(135deg, #5B6CFF 0%, #8B5CF6 100%)',
          }}
          animate={prefersReduced ? {} : {
            scale: [1, 1.06, 1],
            boxShadow: [
              '0 8px 24px rgba(91,108,255,0.2)',
              '0 12px 32px rgba(91,108,255,0.35)',
              '0 8px 24px rgba(91,108,255,0.2)',
            ]
          }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
        >
          <span className="text-white font-bold text-h3">⬡</span>
          <span className="text-white text-[8px] font-semibold mt-0.5 tracking-wider">ORBIT</span>
        </motion.div>
      </div>

      {/* Orbiting agent nodes */}
      {agents.map((agent) => {
        const angleRad = (agent.angle * Math.PI) / 180;
        const radius = 96;
        const cx = 128 + radius * Math.cos(angleRad);
        const cy = 128 + radius * Math.sin(angleRad);

        return (
          <motion.div
            key={agent.id}
            className="absolute w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
            style={{
              left: cx - 24,
              top: cy - 24,
              background: `linear-gradient(135deg, ${agent.gradient[0]}, ${agent.gradient[1]})`,
            }}
            animate={prefersReduced ? {} : {
              x: [0, Math.cos(angleRad + Math.PI / 6) * 6, 0, Math.cos(angleRad - Math.PI / 6) * 6, 0],
              y: [0, Math.sin(angleRad + Math.PI / 6) * 6, 0, Math.sin(angleRad - Math.PI / 6) * 6, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 8,
              delay: agent.delay,
              ease: 'easeInOut',
            }}
          >
            <span className="text-white font-bold text-[11px]">{agent.initials}</span>
          </motion.div>
        );
      })}

      {/* Connecting lines (pulse) */}
      {!prefersReduced && agents.map((agent) => {
        const angleRad = (agent.angle * Math.PI) / 180;
        const radius = 96;
        const x2 = 128 + radius * Math.cos(angleRad);
        const y2 = 128 + radius * Math.sin(angleRad);

        return (
          <svg
            key={`line-${agent.id}`}
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 256 256"
          >
            <motion.line
              x1="128" y1="128"
              x2={x2} y2={y2}
              stroke={agent.gradient[0]}
              strokeWidth="1"
              strokeDasharray="3 5"
              animate={{ opacity: [0.2, 0.6, 0.2] }}
              transition={{ repeat: Infinity, duration: 2.5, delay: agent.delay * 0.3 }}
            />
          </svg>
        );
      })}
    </div>
  );
}

export function EmptyState({ onGetStarted }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-8 py-16 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      >
        <OrbitalIllustration />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.35 }}
          className="mt-10 space-y-3"
        >
          <h1 className="text-h2 font-bold text-ink tracking-tight">
            Start with a goal.
          </h1>
          <p className="text-body text-ink-secondary max-w-sm mx-auto leading-relaxed">
            Your AI team will plan, research, and execute. Three specialized agents collaborate to turn your vision into a concrete plan.
          </p>
        </motion.div>

        {/* Agent chips */}
        <motion.div
          className="flex items-center justify-center gap-2 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {[
            { name: 'Strategist', color: '#5B6CFF', bg: '#F0F1FF' },
            { name: 'Researcher', color: '#8B5CF6', bg: '#F5F3FF' },
            { name: 'Builder', color: '#06B6D4', bg: '#ECFEFF' },
          ].map((a, i) => (
            <motion.span
              key={a.name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.08 }}
              className="text-caption font-semibold px-3 py-1 rounded-full"
              style={{ background: a.bg, color: a.color }}
            >
              {a.name}
            </motion.span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="mt-8"
        >
          <Button
            id="empty-state-cta"
            size="lg"
            onClick={onGetStarted}
            icon={<ArrowRight size={16} />}
            iconPosition="right"
            aria-label="Create Workspace — enter your goal to get started"
          >
            Create Workspace
          </Button>
        </motion.div>

        <motion.p
          className="text-caption text-ink-tertiary mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          No backend needed — powered by simulated AI collaboration
        </motion.p>
      </motion.div>
    </div>
  );
}
