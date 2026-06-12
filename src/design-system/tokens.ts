// ─── All Design Tokens (re-export) ───────────────────────
export { colors, agentColors } from './colors';
export { typography } from './typography';
export { spacing, layout } from './spacing';

// Animation durations
export const motion = {
  duration: {
    instant: 100,
    fast: 150,
    normal: 180,
    moderate: 250,
    slow: 400,
  },
  spring: {
    snappy: { type: 'spring', stiffness: 500, damping: 30 },
    smooth: { type: 'spring', stiffness: 300, damping: 28 },
    gentle: { type: 'spring', stiffness: 200, damping: 25 },
    bouncy: { type: 'spring', stiffness: 400, damping: 20 },
  },
  easing: {
    smooth: [0.4, 0, 0.2, 1] as [number, number, number, number],
    in: [0.4, 0, 1, 1] as [number, number, number, number],
    out: [0, 0, 0.2, 1] as [number, number, number, number],
  },
} as const;
