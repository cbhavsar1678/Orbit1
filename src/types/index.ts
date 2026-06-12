// ─── Global TypeScript Types ──────────────────────────────

export type AgentId = 'strategist' | 'researcher' | 'builder';

export type AgentStatus = 'idle' | 'thinking' | 'streaming' | 'done' | 'error';

export interface Agent {
  id: AgentId;
  name: string;
  specialty: string;
  description: string;
  accentColor: string;
  lightColor: string;
  borderColor: string;
  gradient: string;
  initials: string;
}

export interface WorkstreamSection {
  id: string;
  title: string;
  content: string;
  type: 'analysis' | 'insight' | 'task' | 'risk' | 'source' | 'plan';
  status: 'pending' | 'streaming' | 'done';
  citations?: Citation[];
  metadata?: Record<string, string>;
}

export interface Workstream {
  agentId: AgentId;
  sections: WorkstreamSection[];
  startedAt?: number;
  completedAt?: number;
}

export interface Citation {
  id: string;
  label: string;
  source: string;
  url?: string;
}

export interface KeyDecision {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  agent: AgentId;
}

export interface Risk {
  id: string;
  title: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  mitigation: string;
}

export interface ActionItem {
  id: string;
  title: string;
  assignedTo: AgentId;
  status: 'pending' | 'in-progress' | 'done';
  priority: 'high' | 'medium' | 'low';
}

export type WorkspacePhase =
  | 'empty'          // No goal yet
  | 'goal-entered'   // Goal typed but not started
  | 'running'        // Agents actively working
  | 'done'           // All agents complete
  | 'error';         // Something went wrong

export interface WorkspaceState {
  phase: WorkspacePhase;
  goal: string;
  context: string;
  activeAgent: AgentId | null;
  agentStatuses: Record<AgentId, AgentStatus>;
  workstreams: Partial<Record<AgentId, Workstream>>;
  insights: {
    decisions: KeyDecision[];
    risks: Risk[];
    actionItems: ActionItem[];
  };
  error?: {
    agentId: AgentId;
    message: string;
  };
}

export type WorkspaceAction =
  | { type: 'SET_GOAL'; payload: string }
  | { type: 'SET_CONTEXT'; payload: string }
  | { type: 'START_WORKSPACE' }
  | { type: 'AGENT_THINKING'; payload: { agentId: AgentId } }
  | { type: 'AGENT_STREAMING'; payload: { agentId: AgentId } }
  | { type: 'AGENT_SECTION_DONE'; payload: { agentId: AgentId; section: WorkstreamSection } }
  | { type: 'AGENT_DONE'; payload: { agentId: AgentId; workstream: Workstream } }
  | { type: 'AGENT_ERROR'; payload: { agentId: AgentId; message: string } }
  | { type: 'SET_ACTIVE_AGENT'; payload: AgentId | null }
  | { type: 'SET_INSIGHTS'; payload: WorkspaceState['insights'] }
  | { type: 'RESET' };

export type MobileTab = 'workspace' | 'agents' | 'insights' | 'profile';
