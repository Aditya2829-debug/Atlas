/**
 * Project Ascend — TypeScript Types
 */

// ─── User Profile ───────────────────────────────────
export type Goal = 'weight_gain' | 'muscle_building' | 'fat_loss' | 'strength' | 'calisthenics' | 'general';
export type TrainingPref = 'home' | 'gym' | 'calisthenics' | 'hybrid';
export type Equipment = 'none' | 'resistance_bands' | 'dumbbells' | 'pull_up_bar' | 'full_gym';
export type DietType = 'vegetarian' | 'eggetarian' | 'non_vegetarian';
export type Budget = 'low' | 'medium' | 'high';
export type ScheduleType = 'college' | 'job' | 'student';
export type Gender = 'male' | 'female' | 'other';

export interface UserProfile {
  id: string;
  name: string;
  age: number;
  gender: Gender;
  height_cm: number;
  weight_kg: number;
  target_weight_kg: number;
  goal: Goal;
  training_pref: TrainingPref;
  equipment: Equipment[];
  diet_type: DietType;
  budget: Budget;
  schedule_type: ScheduleType;
  sleep_time: string; // HH:mm
  wake_time: string;  // HH:mm
  bmr: number;
  tdee: number;
  daily_calories_target: number;
  daily_protein_target: number;
  onboarding_complete: boolean;
  created_at: string;
  updated_at: string;
}

// ─── Onboarding ─────────────────────────────────────
export interface OnboardingData {
  name: string;
  age: number;
  gender: Gender;
  height_cm: number;
  weight_kg: number;
  target_weight_kg: number;
  goal: Goal;
  training_pref: TrainingPref;
  equipment: Equipment[];
  diet_type: DietType;
  budget: Budget;
  schedule_type: ScheduleType;
  sleep_time: string;
  wake_time: string;
}

// ─── Workout ────────────────────────────────────────
export type MuscleGroup = 'chest' | 'back' | 'shoulders' | 'biceps' | 'triceps' | 'legs' | 'core' | 'full_body' | 'cardio';
export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export interface Exercise {
  id: string;
  name: string;
  muscle_group: MuscleGroup;
  secondary_muscles?: MuscleGroup[];
  difficulty: Difficulty;
  equipment_needed: Equipment[];
  sets: number;
  reps: string; // "8-12" or "30 sec"
  rest_seconds: number;
  form_tips: string[];
  video_key?: string;
  calories_per_set?: number;
}

export interface WorkoutPlan {
  id: string;
  user_id: string;
  name: string;
  type: TrainingPref;
  week_number: number;
  day_of_week: number;
  exercises: Exercise[];
  difficulty: Difficulty;
  duration_minutes: number;
  is_active: boolean;
  created_at: string;
}

export interface ExerciseLog {
  name: string;
  sets_done: number;
  reps_done: number[];
  weight_kg?: number;
  notes?: string;
}

export interface WorkoutLog {
  id: string;
  user_id: string;
  plan_id?: string;
  exercises_completed: ExerciseLog[];
  duration_minutes: number;
  difficulty_rating: number; // 1-5
  completed_at: string;
}

// ─── Nutrition ──────────────────────────────────────
export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export interface FoodItem {
  id: string;
  name: string;
  hindi_name?: string;
  aliases?: string[];
  serving: string;
  calories: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
  fiber_g?: number;
  category?: string; // 'grain', 'dairy', 'legume', 'vegetable', etc.
}

export interface FoodLog {
  id: string;
  user_id: string;
  meal_type: MealType;
  food_name: string;
  quantity: string;
  calories: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
  ai_estimated: boolean;
  logged_at: string;
}

export interface MacroSummary {
  calories: { consumed: number; target: number; remaining: number };
  protein: { consumed: number; target: number; remaining: number };
  carbs: { consumed: number; target: number; remaining: number };
  fat: { consumed: number; target: number; remaining: number };
}

export interface MealSuggestion {
  food_name: string;
  quantity: string;
  calories: number;
  protein_g: number;
  estimated_cost_inr: number;
  emoji: string;
}

// ─── Water ──────────────────────────────────────────
export interface WaterLog {
  id: string;
  user_id: string;
  amount_ml: number;
  logged_at: string;
}

// ─── Habits ─────────────────────────────────────────
export interface Habit {
  id: string;
  user_id: string;
  name: string;
  icon: string;
  frequency: 'daily' | 'weekly';
  target_count: number;
  is_active: boolean;
  created_at: string;
}

export interface HabitLog {
  id: string;
  user_id: string;
  habit_id: string;
  completed: boolean;
  logged_at: string;
}

// ─── Streaks ────────────────────────────────────────
export type StreakType = 'workout' | 'nutrition' | 'water' | 'overall';

export interface Streak {
  id: string;
  user_id: string;
  type: StreakType;
  current_streak: number;
  longest_streak: number;
  last_active_date: string;
}

// ─── Check-ins ──────────────────────────────────────
export type Mood = 'great' | 'good' | 'okay' | 'low' | 'bad';

export interface DailyCheckin {
  id: string;
  user_id: string;
  type: 'morning' | 'night';
  sleep_hours?: number;
  energy_level?: number; // 1-5
  mood?: Mood;
  workout_done?: boolean;
  calories_achieved?: boolean;
  water_completed?: boolean;
  notes?: string;
  logged_at: string;
  created_at: string;
}

// ─── Calisthenics ───────────────────────────────────
export type SkillCategory = 'push' | 'pull' | 'core' | 'balance';

export interface CalisthenicsSkill {
  id: string;
  name: string;
  category: SkillCategory;
  progression_level: number; // 0-indexed order in the tree
  prerequisite?: string; // skill name that must be unlocked first
  description: string;
  unlock_criteria: string; // "10 reps" or "30 sec hold"
  form_tips: string[];
}

export interface CalisthenicsProgress {
  id: string;
  user_id: string;
  skill_category: SkillCategory;
  skill_name: string;
  progression_level: number;
  max_reps: number;
  max_hold_seconds: number;
  unlocked: boolean;
  unlocked_at?: string;
}

// ─── AI Chat ────────────────────────────────────────
export type AIRole = 'user' | 'assistant' | 'system';
export type AIContextType = 'workout' | 'nutrition' | 'motivation' | 'general';

export interface AIMessage {
  id: string;
  role: AIRole;
  content: string;
  context_type?: AIContextType;
  created_at: string;
}

// ─── Weight Logs ────────────────────────────────────
export interface WeightLog {
  id: string;
  user_id: string;
  weight_kg: number;
  logged_at: string;
  created_at: string;
}

// ─── Daily Schedule ─────────────────────────────────
export interface ScheduleItem {
  id: string;
  user_id: string;
  time_slot: string; // HH:mm
  activity: string;
  category: 'workout' | 'meal' | 'study' | 'rest' | 'sleep' | 'water';
  is_completed: boolean;
  day_of_week: number;
}

// ─── Dashboard ──────────────────────────────────────
export interface DashboardData {
  weight: { current: number; target: number; start: number };
  calories: MacroSummary;
  water: { consumed_ml: number; target_ml: number };
  workout: { done_today: boolean; plan_name?: string; muscle_group?: string };
  streak: { current: number; longest: number };
  habits: { completed: number; total: number };
  ai_insight: string;
  daily_missions: DailyMission[];
}

export interface DailyMission {
  id: string;
  label: string;
  icon: string;
  completed: boolean;
  category: 'workout' | 'nutrition' | 'water' | 'habit' | 'sleep';
}

// ─── Navigation ─────────────────────────────────────
export type TabName = 'home' | 'workout' | 'nutrition' | 'calisthenics' | 'profile';
