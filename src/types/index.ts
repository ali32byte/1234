export type StatusType = 'عالی' | 'خوب' | 'متوسط' | 'ضعیف';

export type StatusEmoji = '😍' | '🙂' | '😐' | '😞';

export type LeagueType = 'Bronze' | 'Silver' | 'Gold' | 'Diamond';

export type ThemeType = 'light' | 'dark' | 'pastel' | 'neon';

export interface Subject {
  name: string;
  taz: number;
  history: number[];
  correct: number;
  wrong: number;
  blank: number;
  vsAverage: string;
  statusEmoji: StatusEmoji;
  percentWithNegative: number;
  percentWithoutNegative: number;
  tazIfNoWrong: number;
  rank: number;
  skillTree?: SkillNode[];
}

export interface SkillNode {
  id: string;
  name: string;
  mastery: number;
  children?: SkillNode[];
}

export interface Exam {
  name: string;
  taz: number;
  date: string;
}

export interface Rank {
  country: number;
  region: number;
}

export interface StudentReport {
  name: string;
  city: string;
  region: string;
  examDate: string;
  status: StatusType;
  statusEmoji: StatusEmoji;
  totalTaz: number;
  rank: Rank;
  averageTaz: number;
  league: LeagueType;
  subjects: Subject[];
  achievements: string[];
  badgesUnlocked: string[];
  exams: Exam[];
  totalCorrect: number;
  totalWrong: number;
  totalBlank: number;
  totalParticipants: number;
  absenceCount: number;
  avatar?: string;
  profileColor?: string;
  visibleBadges?: string[];
}
