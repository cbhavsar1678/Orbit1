import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  type ReactNode,
} from 'react';
import type {
  WorkspaceState,
  WorkspaceAction,
  AgentId,
  WorkstreamSection,
  Workstream,
} from '../types';

// ─── Initial State ────────────────────────────────────────
const initialState: WorkspaceState = {
  phase: 'empty',
  goal: '',
  context: '',
  activeAgent: null,
  agentStatuses: {
    strategist: 'idle',
    researcher: 'idle',
    builder: 'idle',
  },
  workstreams: {},
  insights: {
    decisions: [],
    risks: [],
    actionItems: [],
  },
};

// ─── Reducer ──────────────────────────────────────────────
function workspaceReducer(
  state: WorkspaceState,
  action: WorkspaceAction
): WorkspaceState {
  switch (action.type) {
    case 'SET_GOAL':
      return {
        ...state,
        goal: action.payload,
        phase: action.payload.trim() ? 'goal-entered' : 'empty',
      };

    case 'SET_CONTEXT':
      return { ...state, context: action.payload };

    case 'START_WORKSPACE':
      return {
        ...state,
        phase: 'running',
        workstreams: {},
        agentStatuses: { strategist: 'idle', researcher: 'idle', builder: 'idle' },
        activeAgent: null,
        insights: { decisions: [], risks: [], actionItems: [] },
      };

    case 'SET_ACTIVE_AGENT':
      return { ...state, activeAgent: action.payload };

    case 'AGENT_THINKING':
      return {
        ...state,
        agentStatuses: {
          ...state.agentStatuses,
          [action.payload.agentId]: 'thinking',
        },
      };

    case 'AGENT_STREAMING':
      return {
        ...state,
        agentStatuses: {
          ...state.agentStatuses,
          [action.payload.agentId]: 'streaming',
        },
      };

    case 'AGENT_SECTION_DONE': {
      const { agentId, section } = action.payload;
      const existing = state.workstreams[agentId];
      return {
        ...state,
        workstreams: {
          ...state.workstreams,
          [agentId]: {
            agentId,
            sections: [
              ...(existing?.sections ?? []),
              { ...section, status: 'done' },
            ],
            startedAt: existing?.startedAt ?? Date.now(),
          } as Workstream,
        },
      };
    }

    case 'AGENT_DONE': {
      const { agentId, workstream } = action.payload;
      return {
        ...state,
        agentStatuses: {
          ...state.agentStatuses,
          [agentId]: 'done',
        },
        workstreams: {
          ...state.workstreams,
          [agentId]: { ...workstream, completedAt: Date.now() },
        },
      };
    }

    case 'AGENT_ERROR':
      return {
        ...state,
        phase: 'error',
        agentStatuses: {
          ...state.agentStatuses,
          [action.payload.agentId]: 'error',
        },
        error: { agentId: action.payload.agentId, message: action.payload.message },
      };

    case 'SET_INSIGHTS':
      return {
        ...state,
        insights: action.payload,
        phase: 'done',
      };

    case 'RESET':
      return { ...initialState };

    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────
interface WorkspaceContextValue {
  state: WorkspaceState;
  dispatch: React.Dispatch<WorkspaceAction>;
  setGoal: (goal: string) => void;
  setContext: (context: string) => void;
  resetWorkspace: () => void;
}

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(workspaceReducer, initialState);

  const setGoal = useCallback((goal: string) => {
    dispatch({ type: 'SET_GOAL', payload: goal });
  }, []);

  const setContext = useCallback((context: string) => {
    dispatch({ type: 'SET_CONTEXT', payload: context });
  }, []);

  const resetWorkspace = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  return (
    <WorkspaceContext.Provider value={{ state, dispatch, setGoal, setContext, resetWorkspace }}>
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const ctx = useContext(WorkspaceContext);
  if (!ctx) throw new Error('useWorkspace must be used inside WorkspaceProvider');
  return ctx;
}

export type { WorkspaceContextValue };
