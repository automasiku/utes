// Quiz Configuration
export const QUIZ_DEFAULTS = {
  NUMBER_OF_QUESTIONS: 10,
  NUMBER_OF_OPTIONS: 4,
  ESSAY_QUESTIONS: 5,
} as const;

// Quiz Configuration Options
export const QUIZ_CONFIG_OPTIONS = {
  QUESTION_COUNTS: [5, 10, 15, 20],
  DIFFICULTIES: [
    { value: 'easy', label: 'Mudah', description: 'Soal dasar dan langsung' },
    { value: 'medium', label: 'Sedang', description: 'Soal yang memerlukan pemahaman' },
    { value: 'hard', label: 'Sulit', description: 'Soal yang menantang dan kompleks' },
  ],
  LEARNING_OBJECTIVES: [
    { 
      value: 'remember', 
      label: 'Menghafal (Remember)', 
      description: 'Fokus pada fakta dasar, definisi, istilah, dan poin penting dari video',
      icon: '🧠'
    },
    { 
      value: 'understand', 
      label: 'Memahami (Understand)', 
      description: 'Fokus pada penjelasan konsep, hubungan antar ide, dan interpretasi',
      icon: '💡'
    },
    { 
      value: 'apply', 
      label: 'Menerapkan (Apply)', 
      description: 'Menggunakan konsep ke situasi baru, soal berbasis kasus praktis',
      icon: '🔧'
    },
    { 
      value: 'analyze', 
      label: 'Menganalisis (Analyze)', 
      description: 'Membandingkan, membedah, menemukan pola dan penyebab',
      icon: '🔍'
    },
    { 
      value: 'evaluate', 
      label: 'Evaluasi (Evaluate)', 
      description: 'Menilai dan mengambil keputusan berdasarkan materi',
      icon: '⚖️'
    },
    { 
      value: 'create', 
      label: 'Mencipta (Create)', 
      description: 'Membuat sesuatu baru dari materi, essay yang lebih panjang',
      icon: '✨'
    },
  ],
} as const;

// Score Thresholds
export const SCORE_THRESHOLDS = {
  EXCELLENT: 80,
  GOOD: 60,
} as const;

// Quiz Modes
export const QUIZ_MODES = {
  NOB: 'nob',
  LEGEND: 'legend',
} as const;

export type QuizMode = typeof QUIZ_MODES[keyof typeof QUIZ_MODES];

// History Limits
export const HISTORY_LIMITS = {
  DEFAULT_SESSIONS: 10,
} as const;

// Quiz Configuration Type
export interface QuizConfiguration {
  numberOfQuestions: number;
  difficulty: 'easy' | 'medium' | 'hard';
  learningObjective: 'remember' | 'understand' | 'apply' | 'analyze' | 'evaluate' | 'create';
}
