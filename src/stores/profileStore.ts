/**
 * Project Ascend — Profile Store (Zustand)
 * Manages user profile, onboarding state, and targets.
 */

import { create } from 'zustand';
import type { UserProfile, OnboardingData, Goal, Gender } from '@/lib/types';
import { calculateAllTargets } from '@/lib/calculations';

interface ProfileState {
  profile: UserProfile | null;
  isOnboarded: boolean;
  isLoading: boolean;

  // Actions
  setProfile: (profile: UserProfile) => void;
  completeOnboarding: (data: OnboardingData) => void;
  updateWeight: (weight: number) => void;
  resetProfile: () => void;
}

// Demo profile for development (your actual stats!)
const DEMO_PROFILE: UserProfile = (() => {
  const targets = calculateAllTargets(52, 175, 20, 'male', 'weight_gain', 'moderate');
  return {
    id: 'demo-user',
    name: 'Aditya',
    age: 20,
    gender: 'male' as Gender,
    height_cm: 175, // 5'9"
    weight_kg: 52,
    target_weight_kg: 62,
    goal: 'weight_gain' as Goal,
    training_pref: 'hybrid',
    equipment: ['dumbbells'],
    diet_type: 'eggetarian',
    budget: 'low',
    schedule_type: 'college',
    sleep_time: '23:00',
    wake_time: '07:00',
    bmr: targets.bmr,
    tdee: targets.tdee,
    daily_calories_target: targets.daily_calories_target,
    daily_protein_target: targets.daily_protein_target,
    onboarding_complete: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
})();

export const useProfileStore = create<ProfileState>((set, get) => ({
  // Start with demo profile for development
  profile: DEMO_PROFILE,
  isOnboarded: true,
  isLoading: false,

  setProfile: (profile) => set({ profile, isOnboarded: profile.onboarding_complete }),

  completeOnboarding: (data) => {
    const targets = calculateAllTargets(
      data.weight_kg,
      data.height_cm,
      data.age,
      data.gender,
      data.goal,
      'moderate'
    );

    const profile: UserProfile = {
      id: 'local-user',
      ...data,
      ...targets,
      onboarding_complete: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    set({ profile, isOnboarded: true });
  },

  updateWeight: (weight) => {
    const { profile } = get();
    if (!profile) return;

    const targets = calculateAllTargets(
      weight,
      profile.height_cm,
      profile.age,
      profile.gender,
      profile.goal,
      'moderate'
    );

    set({
      profile: {
        ...profile,
        weight_kg: weight,
        ...targets,
        updated_at: new Date().toISOString(),
      },
    });
  },

  resetProfile: () => set({ profile: null, isOnboarded: false }),
}));
