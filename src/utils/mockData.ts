
// Mock data for the AI-Powered Project Risk Management System

export type RiskLevel = 'Low' | 'Medium' | 'High' | 'Critical';

export interface Risk {
  id: string;
  name: string;
  description: string;
  level: RiskLevel;
  probability: number; // 0-100
  impact: number; // 0-100
  category: string;
  mitigation: string;
  status: 'Open' | 'Mitigated' | 'Accepted';
  dateIdentified: string;
  projectId: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'On Track' | 'At Risk' | 'Delayed' | 'Completed';
  budget: number;
  spent: number;
  progress: number; // 0-100
  riskScore: number; // 0-100
  risks: Risk[];
}

// Market indicators data
export interface MarketIndicator {
  name: string;
  value: number;
  trend: 'up' | 'down' | 'stable';
  impact: 'positive' | 'negative' | 'neutral';
}

// Mock projects data
export const projects: Project[] = [
  {
    id: 'p1',
    name: 'Cloud Migration',
    description: 'Migrate on-premise systems to cloud infrastructure',
    startDate: '2023-06-01',
    endDate: '2023-12-31',
    status: 'At Risk',
    budget: 500000,
    spent: 275000,
    progress: 45,
    riskScore: 65,
    risks: [
      {
        id: 'r1',
        name: 'Data Security Breach',
        description: 'Potential security vulnerabilities during migration',
        level: 'High',
        probability: 40,
        impact: 90,
        category: 'Security',
        mitigation: 'Implement advanced encryption and security protocols',
        status: 'Open',
        dateIdentified: '2023-07-15',
        projectId: 'p1'
      },
      {
        id: 'r2',
        name: 'System Downtime',
        description: 'Extended downtime during migration',
        level: 'Medium',
        probability: 60,
        impact: 70,
        category: 'Operational',
        mitigation: 'Create detailed migration plan with minimal downtime windows',
        status: 'Mitigated',
        dateIdentified: '2023-07-10',
        projectId: 'p1'
      }
    ]
  },
  {
    id: 'p2',
    name: 'CRM Implementation',
    description: 'Implement new CRM system for sales team',
    startDate: '2023-04-01',
    endDate: '2023-10-31',
    status: 'On Track',
    budget: 300000,
    spent: 150000,
    progress: 60,
    riskScore: 25,
    risks: [
      {
        id: 'r3',
        name: 'User Adoption Issues',
        description: 'Sales team resistance to new CRM',
        level: 'Medium',
        probability: 50,
        impact: 60,
        category: 'People',
        mitigation: 'Comprehensive training and change management program',
        status: 'Open',
        dateIdentified: '2023-05-20',
        projectId: 'p2'
      }
    ]
  },
  {
    id: 'p3',
    name: 'E-Commerce Platform',
    description: 'Build new e-commerce platform',
    startDate: '2023-01-15',
    endDate: '2023-09-30',
    status: 'Delayed',
    budget: 750000,
    spent: 600000,
    progress: 70,
    riskScore: 80,
    risks: [
      {
        id: 'r4',
        name: 'Payment Gateway Integration Failure',
        description: 'Issues with payment gateway API integration',
        level: 'Critical',
        probability: 75,
        impact: 95,
        category: 'Technical',
        mitigation: 'Engage payment gateway vendor support team',
        status: 'Open',
        dateIdentified: '2023-06-05',
        projectId: 'p3'
      },
      {
        id: 'r5',
        name: 'Performance Under Load',
        description: 'System performance degrades under high user load',
        level: 'High',
        probability: 65,
        impact: 85,
        category: 'Technical',
        mitigation: 'Load testing and infrastructure scaling',
        status: 'Open',
        dateIdentified: '2023-06-10',
        projectId: 'p3'
      }
    ]
  }
];

// Market indicators data
export const marketIndicators: MarketIndicator[] = [
  { name: 'Technology Sector Volatility', value: 27, trend: 'up', impact: 'negative' },
  { name: 'IT Hardware Supply Chain', value: 65, trend: 'down', impact: 'negative' },
  { name: 'Cloud Services Demand', value: 82, trend: 'up', impact: 'positive' },
  { name: 'IT Talent Availability', value: 35, trend: 'down', impact: 'negative' },
  { name: 'Cybersecurity Threats', value: 78, trend: 'up', impact: 'negative' }
];

// Overall risk metrics
export const overallRiskMetrics = {
  averageRiskScore: 57,
  highRiskProjects: 2,
  criticalRisksCount: 1,
  openRisksCount: 5,
  mitigatedRisksCount: 1
};

// Recent risk alerts
export const recentAlerts = [
  {
    id: 'a1',
    title: 'Critical Risk Identified',
    description: 'Payment Gateway Integration Failure in E-Commerce Platform project',
    timestamp: '2023-07-20T09:15:00',
    read: false,
    projectId: 'p3'
  },
  {
    id: 'a2',
    title: 'Market Risk Alert',
    description: 'Increasing technology sector volatility may affect Cloud Migration timelines',
    timestamp: '2023-07-19T14:30:00',
    read: true,
    projectId: 'p1'
  },
  {
    id: 'a3',
    title: 'Budget Warning',
    description: 'E-Commerce Platform has spent 80% of budget with 70% completion',
    timestamp: '2023-07-18T11:45:00',
    read: false,
    projectId: 'p3'
  }
];

// Sample bot responses
export const botResponses = {
  projectStatus: (projectName: string) => {
    const project = projects.find(p => p.name.toLowerCase().includes(projectName.toLowerCase()));
    if (project) {
      return `Project "${project.name}" is currently ${project.status.toLowerCase()} with a risk score of ${project.riskScore}/100. Progress is at ${project.progress}%, with ${project.risks.length} identified risks (${project.risks.filter(r => r.level === 'High' || r.level === 'Critical').length} high or critical).`;
    }
    return `I couldn't find information about a project named "${projectName}". Please check the project name and try again.`;
  },
  
  overallRisk: () => {
    return `The overall risk profile shows ${overallRiskMetrics.highRiskProjects} high-risk projects out of ${projects.length} total projects. There are ${overallRiskMetrics.criticalRisksCount} critical risks and ${overallRiskMetrics.openRisksCount} open risks across all projects. The average risk score is ${overallRiskMetrics.averageRiskScore}/100.`;
  },
  
  marketTrends: () => {
    const negativeIndicators = marketIndicators.filter(i => i.impact === 'negative');
    return `Current market analysis shows ${negativeIndicators.length} negative indicators that could impact projects. The most concerning are: ${negativeIndicators.map(i => i.name).join(', ')}.`;
  }
};
