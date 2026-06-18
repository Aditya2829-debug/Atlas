import { create } from 'zustand';
import type { OnboardingData, Gender, Goal, TrainingPref, Equipment, DietType, Budget, ScheduleType } from '@/lib/types';

interface OnboardingState {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
  resetData: () => void;
}

const DEFAULT_DATA: OnboardingData = {
  name: '',
  age: 20,
  gender: 'male',
  height_cm: 175,
  weight_kg: 52,
  target_weight_kg: 62,
  goal: 'weight_gain',
  training_pref: 'hybrid',
  equipment: [],
  diet_type: 'non_vegetarian',
  budget: 'medium',
  schedule_type: 'college',
  sleep_time: '23:00',
  wake_time: '07:00',
};

export const useOnboardingStore = create<OnboardingState>((set) => ({
  data: DEFAULT_DATA,
  updateData: (updates) => set((state) => ({ data: { ...state.data, ...updates } })),
  resetData: () => set({ data: DEFAULT_DATA }),
}));
