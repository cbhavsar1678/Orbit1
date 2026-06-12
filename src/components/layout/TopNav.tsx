import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Bell, ChevronDown, Hexagon, Command,
  User, Settings, LogOut, HelpCircle
} from 'lucide-react';
import { clsx } from 'clsx';
import { useWorkspace } from '../../store/workspaceStore';

// ─── Logo ──────────────────────────────────────────────────
function OrbitLogo() {
  return (
    <div className="flex items-center gap-2.5" aria-label="Orbit — Multi-Agent AI Workspace">
      <div
        className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: 'linear-gradient(135deg, #5B6CFF 0%, #8B5CF6 100%)' }}
        aria-hidden="true"
      >
        <Hexagon size={16} className="text-white" fill="rgba(255,255,255,0.2)" />
      </div>
      <span className="text-body font-bold text-ink tracking-tight">Orbit</span>
    </div>
  );
}

// ─── Workspace Title ────────────────────────────────────────
function WorkspaceTitle() {
  const { state } = useWorkspace();
  const title = state.goal
    ? state.goal.length > 40
      ? state.goal.slice(0, 40) + '…'
      : state.goal
    : 'New Workspace';

  return (
    <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-surface-secondary transition-colors duration-150 cursor-default max-w-xs">
      <span className="text-body-sm text-ink-secondary font-medium truncate">{title}</span>
      <ChevronDown size={12} className="text-ink-tertiary shrink-0" aria-hidden="true" />
    </div>
  );
}

// ─── Search Bar ─────────────────────────────────────────────
function SearchBar() {
  return (
    <button
      className={clsx(
        'hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl',
        'bg-surface-secondary border border-surface-border',
        'text-body-sm text-ink-tertiary',
        'hover:border-ink-disabled hover:text-ink-secondary transition-all duration-150',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        'w-52'
      )}
      aria-label="Search workspace (Cmd+K)"
    >
      <Search size={13} aria-hidden="true" />
      <span className="flex-1 text-left">Search…</span>
      <span className="flex items-center gap-0.5 text-caption text-ink-disabled">
        <Command size={10} aria-hidden="true" />
        <span>K</span>
      </span>
    </button>
  );
}

// ─── Notification Bell ──────────────────────────────────────
function NotificationBell() {
  const { state } = useWorkspace();
  const hasNew = state.phase === 'done';

  return (
    <motion.button
      className={clsx(
        'relative w-9 h-9 rounded-xl flex items-center justify-center',
        'text-ink-secondary hover:text-ink hover:bg-surface-secondary',
        'transition-colors duration-150',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary'
      )}
      whileTap={{ scale: 0.93 }}
      aria-label={hasNew ? 'Notifications — new items available' : 'Notifications'}
    >
      <Bell size={17} aria-hidden="true" />
      <AnimatePresence>
        {hasNew && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-error border-2 border-white"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </motion.button>
  );
}

// ─── User Avatar Dropdown ───────────────────────────────────
function UserMenu() {
  const [open, setOpen] = useState(false);

  const menuItems = [
    { icon: User, label: 'Profile' },
    { icon: Settings, label: 'Settings' },
    { icon: HelpCircle, label: 'Help & docs' },
    { icon: LogOut, label: 'Sign out', danger: true },
  ];

  return (
    <div className="relative">
      <motion.button
        onClick={() => setOpen(!open)}
        className={clsx(
          'flex items-center gap-2 px-2 py-1.5 rounded-xl',
          'hover:bg-surface-secondary transition-colors duration-150',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary'
        )}
        whileTap={{ scale: 0.97 }}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="User menu"
      >
        {/* Avatar */}
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
          style={{ background: 'linear-gradient(135deg, #5B6CFF, #8B5CF6)' }}
          aria-hidden="true"
        >
          <span className="text-white text-[10px] font-bold">CG</span>
        </div>
        <span className="hidden md:block text-body-sm font-medium text-ink">Chirag</span>
        <ChevronDown
          size={12}
          className={clsx('text-ink-tertiary transition-transform duration-150', open && 'rotate-180')}
          aria-hidden="true"
        />
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -4 }}
              transition={{ duration: 0.15, type: 'spring', stiffness: 400, damping: 30 }}
              className="absolute right-0 top-full mt-2 w-48 bg-white border border-surface-border rounded-2xl shadow-xl z-50 overflow-hidden"
              role="menu"
            >
              <div className="px-3 py-3 border-b border-surface-border">
                <p className="text-body-sm font-semibold text-ink">Chirag G.</p>
                <p className="text-caption text-ink-tertiary">chirag@orbit.ai</p>
              </div>
              <div className="py-1.5">
                {menuItems.map((item) => (
                  <button
                    key={item.label}
                    className={clsx(
                      'w-full flex items-center gap-2.5 px-3 py-2 text-body-sm',
                      'hover:bg-surface-secondary transition-colors duration-100',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary',
                      item.danger ? 'text-error' : 'text-ink-secondary hover:text-ink'
                    )}
                    role="menuitem"
                    onClick={() => setOpen(false)}
                  >
                    <item.icon size={14} aria-hidden="true" />
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Top Nav ────────────────────────────────────────────────
export function TopNav() {
  return (
    <header
      className="sticky top-0 z-50 h-[72px] bg-white/90 backdrop-blur-sm border-b border-surface-border flex items-center px-5 gap-4"
      role="banner"
    >
      {/* Logo */}
      <OrbitLogo />

      {/* Divider */}
      <div className="hidden md:block w-px h-5 bg-surface-border" aria-hidden="true" />

      {/* Workspace title */}
      <WorkspaceTitle />

      {/* Spacer */}
      <div className="flex-1" />

      {/* Search */}
      <SearchBar />

      {/* Notifications */}
      <NotificationBell />

      {/* User menu */}
      <UserMenu />
    </header>
  );
}
