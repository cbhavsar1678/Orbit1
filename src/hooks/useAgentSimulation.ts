import { useCallback } from 'react';
import { useWorkspace } from '../store/workspaceStore';
import {
  strategistWorkstream,
  researcherWorkstream,
  builderWorkstream,
  SIMULATION_CONFIG,
} from '../data/mockWorkspace';
import { mockDecisions, mockRisks, mockActionItems } from '../data/mockInsights';
import type { AgentId, Workstream } from '../types';

const AGENT_ORDER: AgentId[] = ['strategist', 'researcher', 'builder'];
const WORKSTREAM_MAP: Record<AgentId, Workstream> = {
  strategist: strategistWorkstream,
  researcher: researcherWorkstream,
  builder: builderWorkstream,
};

function sleep(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

export function useAgentSimulation() {
  const { dispatch } = useWorkspace();

  const runAgent = useCallback(async (agentId: AgentId) => {
    const workstream = WORKSTREAM_MAP[agentId];

    // Set active agent
    dispatch({ type: 'SET_ACTIVE_AGENT', payload: agentId });

    // Phase 1: Thinking
    dispatch({ type: 'AGENT_THINKING', payload: { agentId } });
    await sleep(SIMULATION_CONFIG.thinkingDuration);

    // Phase 2: Streaming — reveal sections one by one
    dispatch({ type: 'AGENT_STREAMING', payload: { agentId } });

    for (const section of workstream.sections) {
      // Add a small delay before each section
      await sleep(SIMULATION_CONFIG.sectionRevealDelay);
      dispatch({
        type: 'AGENT_SECTION_DONE',
        payload: { agentId, section: { ...section, status: 'streaming' } },
      });
    }

    // Phase 3: Done
    await sleep(400);
    dispatch({ type: 'AGENT_DONE', payload: { agentId, workstream } });
    dispatch({ type: 'SET_ACTIVE_AGENT', payload: null });
  }, [dispatch]);

  const startSimulation = useCallback(async () => {
    dispatch({ type: 'START_WORKSPACE' });

    for (const agentId of AGENT_ORDER) {
      await runAgent(agentId);
      // Handoff delay between agents
      await sleep(SIMULATION_CONFIG.handoffDelay);
    }

    // All done — populate insights
    await sleep(300);
    dispatch({
      type: 'SET_INSIGHTS',
      payload: {
        decisions: mockDecisions,
        risks: mockRisks,
        actionItems: mockActionItems,
      },
    });
  }, [dispatch, runAgent]);

  return { startSimulation };
}
