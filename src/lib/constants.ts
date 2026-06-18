/**
 * Project Ascend — Design System Constants
 * Premium dark-mode-first design tokens
 */

export const COLORS = {
  // Backgrounds
  background: '#0B0B0B',
  card: '#151515',
  cardBorder: '#1F1F1F',
  cardHover: '#1A1A1A',
  surface: '#111111',
  
  // Primary palette
  primary: '#22C55E',       // Green — progress, success, health
  primaryDim: '#16A34A',
  primaryMuted: 'rgba(34, 197, 94, 0.15)',
  primaryGlow: 'rgba(34, 197, 94, 0.25)',
  
  // Secondary palette
  secondary: '#3B82F6',     // Blue — info, water, calm
  secondaryDim: '#2563EB',
  secondaryMuted: 'rgba(59, 130, 246, 0.15)',
  secondaryGlow: 'rgba(59, 130, 246, 0.25)',
  
  // Accent palette
  accent: '#F97316',        // Orange — energy, fire, motivation
  accentDim: '#EA580C',
  accentMuted: 'rgba(249, 115, 22, 0.15)',
  accentGlow: 'rgba(249, 115, 22, 0.25)',
  
  // Status
  warning: '#EAB308',
  warningMuted: 'rgba(234, 179, 8, 0.15)',
  danger: '#EF4444',
  dangerMuted: 'rgba(239, 68, 68, 0.15)',
  
  // Text
  text: '#FFFFFF',
  textSecondary: '#D1D5DB',
  textMuted: '#9CA3AF',
  textDim: '#6B7280',
  textDisabled: '#4B5563',
  
  // Misc
  overlay: 'rgba(0, 0, 0, 0.6)',
  divider: '#1F1F1F',
  tabBarBg: '#0D0D0D',
  tabBarBorder: '#1A1A1A',
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
} as const;

export const BORDER_RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

export const FONT_SIZE = {
  xs: 11,
  sm: 13,
  md: 15,
  base: 16,
  lg: 18,
  xl: 22,
  '2xl': 28,
  '3xl': 34,
  '4xl': 42,
} as const;

export const FONT_WEIGHT = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
  black: '900' as const,
};

// Tab icons mapping
export const TAB_ICONS = {
  home: 'home',
  workout: 'fitness-center',
  nutrition: 'restaurant',
  calisthenics: 'self-improvement',
  profile: 'person',
} as const;

// Goal options for onboarding
export const GOALS = [
  { id: 'weight_gain', label: 'Weight Gain', icon: '⬆️', description: 'Gain healthy weight & muscle' },
  { id: 'muscle_building', label: 'Muscle Building', icon: '💪', description: 'Build lean muscle mass' },
  { id: 'fat_loss', label: 'Fat Loss', icon: '🔥', description: 'Lose fat, get defined' },
  { id: 'strength', label: 'Strength', icon: '🏋️', description: 'Get stronger overall' },
  { id: 'calisthenics', label: 'Calisthenics', icon: '🤸', description: 'Master bodyweight skills' },
  { id: 'general', label: 'General Fitness', icon: '🏃', description: 'Overall health & fitness' },
] as const;

export const TRAINING_PREFS = [
  { id: 'home', label: 'Home Workout', icon: '🏠', description: 'Train at home with minimal equipment' },
  { id: 'gym', label: 'Gym Workout', icon: '🏋️', description: 'Full gym access' },
  { id: 'calisthenics', label: 'Calisthenics', icon: '🤸', description: 'Bodyweight mastery' },
  { id: 'hybrid', label: 'Hybrid', icon: '🔄', description: 'Mix of home, gym & bodyweight' },
] as const;

export const EQUIPMENT_OPTIONS = [
  { id: 'none', label: 'No Equipment', icon: '🙌' },
  { id: 'resistance_bands', label: 'Resistance Bands', icon: '🔗' },
  { id: 'dumbbells', label: 'Dumbbells', icon: '🏋️' },
  { id: 'pull_up_bar', label: 'Pull-up Bar', icon: '🔩' },
  { id: 'full_gym', label: 'Full Gym', icon: '🏢' },
] as const;

export const DIET_TYPES = [
  { id: 'vegetarian', label: 'Vegetarian', icon: '🥬', description: 'No eggs, no meat' },
  { id: 'eggetarian', label: 'Eggetarian', icon: '🥚', description: 'Vegetarian + eggs' },
  { id: 'non_vegetarian', label: 'Non-Vegetarian', icon: '🍗', description: 'Everything goes' },
] as const;

export const BUDGET_OPTIONS = [
  { id: 'low', label: 'Low Budget', icon: '💰', description: '₹3,000-5,000/month food' },
  { id: 'medium', label: 'Medium Budget', icon: '💳', description: '₹5,000-10,000/month food' },
  { id: 'high', label: 'High Budget', icon: '💎', description: '₹10,000+/month food' },
] as const;

export const SCHEDULE_TYPES = [
  { id: 'college', label: 'College Student', icon: '🎓' },
  { id: 'job', label: 'Working Professional', icon: '💼' },
  { id: 'student', label: 'School Student', icon: '📚' },
] as const;

// Water tracking
export const WATER_GLASS_ML = 250;
export const DAILY_WATER_TARGET_ML = 3000;

// Macro percentages for weight gain
export const MACRO_SPLIT = {
  weight_gain: { protein: 0.25, carbs: 0.50, fat: 0.25 },
  muscle_building: { protein: 0.30, carbs: 0.45, fat: 0.25 },
  fat_loss: { protein: 0.35, carbs: 0.35, fat: 0.30 },
  strength: { protein: 0.30, carbs: 0.45, fat: 0.25 },
  calisthenics: { protein: 0.25, carbs: 0.50, fat: 0.25 },
  general: { protein: 0.25, carbs: 0.50, fat: 0.25 },
} as const;

// Default habits
export const DEFAULT_HABITS = [
  { name: 'Workout Done', icon: '💪' },
  { name: '3L Water', icon: '💧' },
  { name: 'Hit Protein Target', icon: '🥩' },
  { name: 'Sleep by 11 PM', icon: '🛌' },
  { name: 'No Phone After 10 PM', icon: '📵' },
  { name: 'Study/Skill Time', icon: '📚' },
  { name: 'All Meals Logged', icon: '🍳' },
] as const;
