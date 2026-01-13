
export interface Question {
  id: string;
  text: string;
}

export interface Section {
  id: string;
  title: string;
  icon: string;
  maxScore: number;
  questions: Question[];
}

export interface Department {
  id: string;
  name: string;
  description: string;
  sections: Section[];
}

export interface AuditHeader {
  area: string;
  date: string;
  auditor: string;
}

export interface ActionPlanItem {
  id: string;
  problem: string;
  action: string;
  responsible: string;
  targetDate: string;
}

export type ScoreValue = 0 | 1 | 2 | null;

export interface SavedAudit {
  id: string;
  timestamp: string;
  deptId: string;
  header: AuditHeader;
  scores: Record<string, ScoreValue>;
  actionPlan: ActionPlanItem[];
  aiSummary?: string;
  percentage: number;
  synced?: boolean;
}
