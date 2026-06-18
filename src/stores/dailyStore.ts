/**
 * Project Ascend — Daily Tracking Store (Zustand)
 * Tracks today's nutrition, water, workouts, habits.
 */

import { create } from 'zustand';
import { getTodayString } from '@/lib/utils';
import type { FoodLog, MealType } from '@/lib/types';

interface DailyState {
  // Date
  today: string;

  // Nutrition
  foodLogs: FoodLog[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;

  // Water
  waterIntakeMl: number;

  // Workout
  workoutDone: boolean;
  workoutMinutes: number;

  // Habits
  habitsCompleted: string[];

  // Streak
  currentStreak: number;

  // Actions
  addFoodLog: (food: Omit<FoodLog, 'id' | 'user_id' | 'logged_at'>) => void;
  removeFoodLog: (id: string) => void;
  addWater: (ml: number) => void;
  markWorkoutDone: (minutes: number) => void;
  toggleHabit: (habitName: string) => void;
  incrementStreak: () => void;
  resetDay: () => void;
}

export const useDailyStore = create<DailyState>((set, get) => ({
  today: getTodayString(),

  // Demo data for development — simulate some logged food
  foodLogs: [
    {
      id: 'demo-1',
      user_id: 'demo',
      meal_type: 'breakfast' as MealType,
      food_name: '2 Aloo Paratha + Curd',
      quantity: '2 paratha + 1 katori curd',
      calories: 518,
      protein_g: 13.3,
      carbs_g: 67.2,
      fat_g: 21.4,
      ai_estimated: false,
      logged_at: new Date().toISOString(),
    },
    {
      id: 'demo-2',
      user_id: 'demo',
      meal_type: 'snack' as MealType,
      food_name: 'Banana + Milk',
      quantity: '1 banana + 1 glass milk',
      calories: 245,
      protein_g: 9.1,
      carbs_g: 35.0,
      fat_g: 8.3,
      ai_estimated: false,
      logged_at: new Date().toISOString(),
    },
  ],
  totalCalories: 763,
  totalProtein: 22.4,
  totalCarbs: 102.2,
  totalFat: 29.7,

  waterIntakeMl: 1500,
  workoutDone: false,
  workoutMinutes: 0,
  habitsCompleted: ['All Meals Logged'],
  currentStreak: 4,

  addFoodLog: (food) => {
    const id = `food-${Date.now()}`;
    const newLog: FoodLog = {
      ...food,
      id,
      user_id: 'local',
      logged_at: new Date().toISOString(),
    };

    set((state) => ({
      foodLogs: [...state.foodLogs, newLog],
      totalCalories: state.totalCalories + food.calories,
      totalProtein: state.totalProtein + food.protein_g,
      totalCarbs: state.totalCarbs + food.carbs_g,
      totalFat: state.totalFat + food.fat_g,
    }));
  },

  removeFoodLog: (id) => {
    set((state) => {
      const log = state.foodLogs.find((f) => f.id === id);
      if (!log) return state;
      return {
        foodLogs: state.foodLogs.filter((f) => f.id !== id),
        totalCalories: state.totalCalories - log.calories,
        totalProtein: state.totalProtein - log.protein_g,
        totalCarbs: state.totalCarbs - log.carbs_g,
        totalFat: state.totalFat - log.fat_g,
      };
    });
  },

  addWater: (ml) => {
    set((state) => ({
      waterIntakeMl: state.waterIntakeMl + ml,
    }));
  },

  markWorkoutDone: (minutes) => {
    set({ workoutDone: true, workoutMinutes: minutes });
  },

  toggleHabit: (habitName) => {
    set((state) => {
      const completed = state.habitsCompleted.includes(habitName)
        ? state.habitsCompleted.filter((h) => h !== habitName)
        : [...state.habitsCompleted, habitName];
      return { habitsCompleted: completed };
    });
  },

  incrementStreak: () => {
    set((state) => ({ currentStreak: state.currentStreak + 1 }));
  },

  resetDay: () => {
    set({
      today: getTodayString(),
      foodLogs: [],
      totalCalories: 0,
      totalProtein: 0,
      totalCarbs: 0,
      totalFat: 0,
      waterIntakeMl: 0,
      workoutDone: false,
      workoutMinutes: 0,
      habitsCompleted: [],
    });
  },
}));
