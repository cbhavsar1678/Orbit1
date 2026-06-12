import type { KeyDecision, Risk, ActionItem } from '../types';

export const mockDecisions: KeyDecision[] = [
  {
    id: 'd1',
    title: 'Target mid-market healthcare providers',
    description: 'Focus on hospitals with 50–500 beds — largest addressable segment with modernization budget and faster procurement cycles than enterprise.',
    priority: 'high',
    agent: 'strategist',
  },
  {
    id: 'd2',
    title: 'API-first architecture with FHIR compliance',
    description: 'Build on FHIR HL7 R4 standard from day one. Reduces EHR integration cost by ~60% and is a requirement for most hospital procurement.',
    priority: 'high',
    agent: 'researcher',
  },
  {
    id: 'd3',
    title: 'Land-and-expand revenue model',
    description: 'Start with one department, prove ROI, then expand across hospital. Reduces initial sales cycle from 18 months to 4–6 months.',
    priority: 'medium',
    agent: 'strategist',
  },
  {
    id: 'd4',
    title: 'HIPAA-compliant cloud infrastructure from launch',
    description: 'Non-negotiable for any healthcare buyer. Use AWS GovCloud or Azure Government. Budget $40k–$80k for compliance setup and annual audit.',
    priority: 'high',
    agent: 'builder',
  },
];

export const mockRisks: Risk[] = [
  {
    id: 'r1',
    title: 'Extended enterprise sales cycles',
    description: 'Healthcare sales cycles average 12–18 months. Cash burn risk during extended evaluation periods.',
    severity: 'high',
    mitigation: 'Pursue pilot programs with pilot-friendly pricing. Target community hospitals with faster decision-making.',
  },
  {
    id: 'r2',
    title: 'Regulatory compliance complexity',
    description: 'HIPAA, HITECH, state-level regulations vary significantly. Non-compliance penalties up to $1.9M per year.',
    severity: 'critical',
    mitigation: 'Hire a compliance officer in month 1. Partner with established healthcare legal firm. Build compliance into product from day 0.',
  },
  {
    id: 'r3',
    title: 'EHR integration challenges',
    description: 'Epic, Cerner, and Meditech have historically resisted third-party AI integrations. API access restrictions possible.',
    severity: 'medium',
    mitigation: 'Join Epic App Orchard and Cerner CareAware partner programs. Design for interoperability through FHIR.',
  },
  {
    id: 'r4',
    title: 'Clinician adoption resistance',
    description: 'Physicians report AI tool fatigue. Average EHR generates 11+ alerts per hour — additional AI noise risks rejection.',
    severity: 'medium',
    mitigation: 'Co-design with clinical champions. Focus on reducing documentation burden, not adding alerts. Measure time saved.',
  },
];

export const mockActionItems: ActionItem[] = [
  {
    id: 'a1',
    title: 'Define ICP and TAM for mid-market hospitals',
    assignedTo: 'strategist',
    status: 'done',
    priority: 'high',
  },
  {
    id: 'a2',
    title: 'Interview 15 clinical department heads',
    assignedTo: 'researcher',
    status: 'in-progress',
    priority: 'high',
  },
  {
    id: 'a3',
    title: 'Create FHIR integration technical spec',
    assignedTo: 'builder',
    status: 'pending',
    priority: 'high',
  },
  {
    id: 'a4',
    title: 'Map 3 competitor positioning gaps',
    assignedTo: 'researcher',
    status: 'done',
    priority: 'medium',
  },
  {
    id: 'a5',
    title: 'Build MVP scope and sprint plan',
    assignedTo: 'builder',
    status: 'pending',
    priority: 'high',
  },
  {
    id: 'a6',
    title: 'Draft go-to-market strategy deck',
    assignedTo: 'strategist',
    status: 'pending',
    priority: 'medium',
  },
];
