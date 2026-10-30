export type TaskCategory = 'Coding' | 'Research' | 'Writing' | 'Image Generation' | 'Math/Calculation' | 'Others';

export type UserType = 'Student' | 'Professional' | 'Developer' | 'Researcher' | 'Creative';

export type BudgetPreference = 'Low (prefer free tools)' | 'Medium' | 'High (best capability)';

export interface ModelScore {
  id: string;
  name: string;
  provider: string;
  icon: string;
  color: string;
  badge?: string;
  isBestChoice?: boolean;
  qualityRating: number; // 1-5
  speedRating: number; // 1-5
  costLabel: string; // "Free" | "₹" | "₹₹" | "₹₹₹"
  privacyRating: number; // 1-5
  description: string;
  pros: string[];
  estimatedCostInINR: number;
}

export interface TaskAnalysisResult {
  task: string;
  category: TaskCategory;
  userType: UserType;
  aiRequired: boolean;
  notNeededReason?: string;
  directAnswer?: string;
  recommendedTool?: {
    name: string;
    description: string;
    icon: string;
    badge: string;
  };
  recommendedModels: ModelScore[];
  summaryNote?: string;
}

export interface RecentActivityItem {
  id: string;
  title: string;
  model: string;
  timeAgo: string;
  category: TaskCategory;
  status: 'Recommended' | 'Completed' | 'Alternative Used';
  costINR: number;
}

export interface SpendingByModel {
  model: string;
  spentINR: number;
  requests: number;
  color: string;
}

export interface CategoryShare {
  name: TaskCategory;
  percentage: number;
  requests: number;
  color: string;
}

export interface LearningStep {
  stepNumber: number;
  title: string;
  guidance: string;
  hint?: string;
}

export interface LearningSession {
  problemTitle: string;
  currentStepIndex: number;
  steps: LearningStep[];
  solutionCode: string;
  solutionExplanation: string;
  userResponses: { role: 'user' | 'assistant'; text: string; timestamp: string }[];
}

export interface UserProfile {
  name: string;
  role: UserType;
  avatarInitial: string;
  email: string;
  monthlyBudgetINR: number;
  currency: string;
  savingsTargetINR: number;
}
