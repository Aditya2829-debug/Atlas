import { create } from 'zustand';
import type { WorkoutPlan, WorkoutLog, Exercise, ExerciseLog } from '@/lib/types';
import { beginnerHomePlan, getExercisesByIds } from '@/data/exercises';

interface WorkoutState {
  plans: WorkoutPlan[];
  activeWorkoutId: string | null;
  activeExerciseIndex: number;
  completedSets: { [exerciseId: string]: boolean[] }; // map exerciseId -> boolean array for each set
  history: WorkoutLog[];

  // Actions
  initializePlans: () => void;
  setActiveWorkout: (planId: string | null) => void;
  setActiveExerciseIndex: (index: number) => void;
  toggleSetCompleted: (exerciseId: string, setIndex: number) => void;
  completeWorkout: (durationMinutes: number, difficultyRating: number) => WorkoutLog | null;
  resetActiveWorkout: () => void;
}

// Convert template to WorkoutPlan
const mapTemplatesToPlans = (): WorkoutPlan[] => {
  return beginnerHomePlan.map((temp, index) => ({
    id: `plan-${index}-${temp.day_of_week}`,
    user_id: 'local-user',
    name: temp.name,
    type: 'home',
    week_number: 1,
    day_of_week: temp.day_of_week,
    exercises: getExercisesByIds(temp.exercise_ids),
    difficulty: 'beginner',
    duration_minutes: 35,
    is_active: true,
    created_at: new Date().toISOString(),
  }));
};

export const useWorkoutStore = create<WorkoutState>((set, get) => ({
  plans: mapTemplatesToPlans(),
  activeWorkoutId: null,
  activeExerciseIndex: 0,
  completedSets: {},
  history: [],

  initializePlans: () => {
    set({ plans: mapTemplatesToPlans() });
  },

  setActiveWorkout: (planId) => {
    const state = get();
    if (!planId) {
      set({ activeWorkoutId: null, activeExerciseIndex: 0, completedSets: {} });
      return;
    }

    const plan = state.plans.find((p) => p.id === planId);
    if (!plan) return;

    // Initialize completedSets map
    const initialCompletedSets: { [exerciseId: string]: boolean[] } = {};
    plan.exercises.forEach((ex) => {
      initialCompletedSets[ex.id] = new Array(ex.sets).fill(false);
    });

    set({
      activeWorkoutId: planId,
      activeExerciseIndex: 0,
      completedSets: initialCompletedSets,
    });
  },

  setActiveExerciseIndex: (index) => set({ activeExerciseIndex: index }),

  toggleSetCompleted: (exerciseId, setIndex) => {
    set((state) => {
      const current = state.completedSets[exerciseId] || [];
      const updated = [...current];
      if (setIndex >= 0 && setIndex < updated.length) {
        updated[setIndex] = !updated[setIndex];
      }
      return {
        completedSets: {
          ...state.completedSets,
          [exerciseId]: updated,
        },
      };
    });
  },

  completeWorkout: (durationMinutes, difficultyRating) => {
    const { activeWorkoutId, plans, completedSets } = get();
    if (!activeWorkoutId) return null;

    const plan = plans.find((p) => p.id === activeWorkoutId);
    if (!plan) return null;

    // Create completed exercise logs
    const exercises_completed: ExerciseLog[] = plan.exercises.map((ex) => {
      const setsDone = (completedSets[ex.id] || []).filter(Boolean).length;
      // Assume target reps were achieved for completed sets
      const repsDone = new Array(setsDone).fill(parseInt(ex.reps) || 10);
      return {
        name: ex.name,
        sets_done: setsDone,
        reps_done: repsDone,
        weight_kg: 5, // Defaulting to our 5kg dumbbells
      };
    });

    const newLog: WorkoutLog = {
      id: `log-${Date.now()}`,
      user_id: 'local-user',
      plan_id: activeWorkoutId,
      exercises_completed,
      duration_minutes: durationMinutes,
      difficulty_rating: difficultyRating,
      completed_at: new Date().toISOString(),
    };

    set((state) => ({
      history: [...state.history, newLog],
      activeWorkoutId: null,
      activeExerciseIndex: 0,
      completedSets: {},
    }));

    return newLog;
  },

  resetActiveWorkout: () => {
    set({
      activeWorkoutId: null,
      activeExerciseIndex: 0,
      completedSets: {},
    });
  },
}));
