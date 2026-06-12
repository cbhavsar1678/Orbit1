// ─── Typography Scale ─────────────────────────────────────
export const typography = {
  fontFamily: {
    sans: "'Inter', system-ui, -apple-system, sans-serif",
  },
  fontSize: {
    display: { size: '48px', lineHeight: '1.1', letterSpacing: '-0.03em', fontWeight: '700' },
    h1: { size: '36px', lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '700' },
    h2: { size: '28px', lineHeight: '1.2', letterSpacing: '-0.015em', fontWeight: '600' },
    h3: { size: '22px', lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' },
    bodyLg: { size: '18px', lineHeight: '1.6', fontWeight: '400' },
    body: { size: '16px', lineHeight: '1.6', fontWeight: '400' },
    bodySm: { size: '14px', lineHeight: '1.5', fontWeight: '400' },
    caption: { size: '12px', lineHeight: '1.4', letterSpacing: '0.01em', fontWeight: '400' },
    label: { size: '11px', lineHeight: '1.4', letterSpacing: '0.08em', fontWeight: '600' },
  },
  fontWeight: {
    light: '300',
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
} as const;
