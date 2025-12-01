export interface ServiceCardItem {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  isNew?: boolean;
}

export interface SuggestedRole {
  role: string;
  suitability: string;
}

export interface CVAnalysis {
  fullName: string;
  experience: string;
  score: number;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  suggestedRoles: SuggestedRole[];
}

export interface AnalysisState {
  isLoading: boolean;
  result: CVAnalysis | null;
  error: string | null;
}