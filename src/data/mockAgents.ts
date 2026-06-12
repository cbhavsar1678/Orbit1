import type { Agent } from '../types';

export const AGENTS: Agent[] = [
  {
    id: 'strategist',
    name: 'Strategist',
    specialty: 'Planning & Strategy',
    description: 'Breaks complex goals into actionable plans, identifies opportunities, and sets strategic direction.',
    accentColor: '#5B6CFF',
    lightColor: '#F0F1FF',
    borderColor: '#C3C9FF',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #8B5CF6 100%)',
    initials: 'ST',
  },
  {
    id: 'researcher',
    name: 'Researcher',
    specialty: 'Insights & Evidence',
    description: 'Gathers market intelligence, validates assumptions with data, and surfaces critical insights.',
    accentColor: '#8B5CF6',
    lightColor: '#F5F3FF',
    borderColor: '#DDD6FE',
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
    initials: 'RE',
  },
  {
    id: 'builder',
    name: 'Builder',
    specialty: 'Execution & Delivery',
    description: 'Converts strategy into concrete tasks, timelines, and deliverables ready for implementation.',
    accentColor: '#06B6D4',
    lightColor: '#ECFEFF',
    borderColor: '#A5F3FC',
    gradient: 'linear-gradient(135deg, #06B6D4 0%, #22D3EE 100%)',
    initials: 'BU',
  },
];

export const AGENT_MAP = Object.fromEntries(AGENTS.map(a => [a.id, a])) as Record<string, Agent>;
