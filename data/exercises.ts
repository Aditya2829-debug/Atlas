/**
 * Project Ascend — Exercise Database
 * 
 * Comprehensive exercise library for home, gym, and calisthenics workouts.
 * Each exercise includes muscle groups, difficulty, equipment, sets/reps, and form tips.
 */

import { type Exercise, type MuscleGroup, type Difficulty, type Equipment } from '../lib/types';

// ─── HOME WORKOUTS (No Equipment / Dumbbells) ────────────

export const homeExercises: Exercise[] = [
  // CHEST
  {
    id: 'pushup',
    name: 'Push-ups',
    muscle_group: 'chest',
    secondary_muscles: ['triceps', 'shoulders'],
    difficulty: 'beginner',
    equipment_needed: ['none'],
    sets: 3,
    reps: '8-15',
    rest_seconds: 60,
    form_tips: [
      'Keep body in a straight line from head to heels',
      'Lower chest to just above the ground',
      'Elbows at 45° angle, not flared out',
      'Push through palms, squeeze chest at top',
    ],
    calories_per_set: 8,
  },
  {
    id: 'incline_pushup',
    name: 'Incline Push-ups',
    muscle_group: 'chest',
    secondary_muscles: ['triceps'],
    difficulty: 'beginner',
    equipment_needed: ['none'],
    sets: 3,
    reps: '10-15',
    rest_seconds: 45,
    form_tips: [
      'Hands on elevated surface (table, bench)',
      'Easier version of regular pushups',
      'Great for building initial chest strength',
      'Keep core tight throughout',
    ],
    calories_per_set: 6,
  },
  {
    id: 'diamond_pushup',
    name: 'Diamond Push-ups',
    muscle_group: 'chest',
    secondary_muscles: ['triceps'],
    difficulty: 'intermediate',
    equipment_needed: ['none'],
    sets: 3,
    reps: '6-12',
    rest_seconds: 75,
    form_tips: [
      'Hands together forming a diamond shape',
      'Targets inner chest and triceps',
      'Keep elbows close to body',
      'Harder than regular pushups — go slow',
    ],
    calories_per_set: 10,
  },
  {
    id: 'db_chest_press',
    name: 'Dumbbell Floor Press',
    muscle_group: 'chest',
    secondary_muscles: ['triceps', 'shoulders'],
    difficulty: 'beginner',
    equipment_needed: ['dumbbells'],
    sets: 3,
    reps: '10-15',
    rest_seconds: 60,
    form_tips: [
      'Lie on floor, knees bent, feet flat',
      'Press dumbbells straight up over chest',
      'Lower until elbows touch the ground',
      'Squeeze chest at the top',
    ],
    calories_per_set: 8,
  },
  {
    id: 'db_chest_fly',
    name: 'Dumbbell Floor Fly',
    muscle_group: 'chest',
    difficulty: 'beginner',
    equipment_needed: ['dumbbells'],
    sets: 3,
    reps: '10-12',
    rest_seconds: 60,
    form_tips: [
      'Lie on floor, arms extended with slight bend',
      'Lower dumbbells out to sides in an arc',
      'Stop when elbows touch the ground',
      'Squeeze chest to bring dumbbells back up',
    ],
    calories_per_set: 7,
  },

  // BACK
  {
    id: 'db_bent_row',
    name: 'Dumbbell Bent-Over Row',
    muscle_group: 'back',
    secondary_muscles: ['biceps'],
    difficulty: 'beginner',
    equipment_needed: ['dumbbells'],
    sets: 3,
    reps: '10-12',
    rest_seconds: 60,
    form_tips: [
      'Bend at hips, back flat at 45°',
      'Pull dumbbells to lower ribs',
      'Squeeze shoulder blades together at top',
      'Don\'t use momentum — control the weight',
    ],
    calories_per_set: 9,
  },
  {
    id: 'db_single_row',
    name: 'Single-Arm Dumbbell Row',
    muscle_group: 'back',
    secondary_muscles: ['biceps'],
    difficulty: 'beginner',
    equipment_needed: ['dumbbells'],
    sets: 3,
    reps: '10-12 each',
    rest_seconds: 45,
    form_tips: [
      'One hand and knee on bench/chair for support',
      'Pull dumbbell to hip, elbow driving back',
      'Keep back flat and core engaged',
      'Full stretch at bottom, squeeze at top',
    ],
    calories_per_set: 8,
  },
  {
    id: 'reverse_fly',
    name: 'Dumbbell Reverse Fly',
    muscle_group: 'back',
    secondary_muscles: ['shoulders'],
    difficulty: 'beginner',
    equipment_needed: ['dumbbells'],
    sets: 3,
    reps: '12-15',
    rest_seconds: 45,
    form_tips: [
      'Bend at hips, arms hanging down',
      'Raise dumbbells out to sides',
      'Squeeze shoulder blades at top',
      'Use lighter weight — it\'s harder than it looks',
    ],
    calories_per_set: 6,
  },
  {
    id: 'superman',
    name: 'Superman Hold',
    muscle_group: 'back',
    secondary_muscles: ['core'],
    difficulty: 'beginner',
    equipment_needed: ['none'],
    sets: 3,
    reps: '15-20',
    rest_seconds: 45,
    form_tips: [
      'Lie face down, arms extended forward',
      'Lift arms, chest, and legs off the ground',
      'Hold for 2 seconds at the top',
      'Strengthens lower back — essential for posture',
    ],
    calories_per_set: 5,
  },

  // SHOULDERS
  {
    id: 'db_shoulder_press',
    name: 'Dumbbell Shoulder Press',
    muscle_group: 'shoulders',
    secondary_muscles: ['triceps'],
    difficulty: 'beginner',
    equipment_needed: ['dumbbells'],
    sets: 3,
    reps: '10-12',
    rest_seconds: 60,
    form_tips: [
      'Sit or stand, dumbbells at shoulder height',
      'Press straight up overhead',
      'Don\'t lock elbows completely at top',
      'Lower slowly to shoulder level',
    ],
    calories_per_set: 8,
  },
  {
    id: 'db_lateral_raise',
    name: 'Dumbbell Lateral Raise',
    muscle_group: 'shoulders',
    difficulty: 'beginner',
    equipment_needed: ['dumbbells'],
    sets: 3,
    reps: '12-15',
    rest_seconds: 45,
    form_tips: [
      'Stand with dumbbells at sides',
      'Raise arms out to sides until parallel to ground',
      'Slight bend in elbows throughout',
      'Lower slowly — don\'t swing',
    ],
    calories_per_set: 6,
  },
  {
    id: 'db_front_raise',
    name: 'Dumbbell Front Raise',
    muscle_group: 'shoulders',
    difficulty: 'beginner',
    equipment_needed: ['dumbbells'],
    sets: 3,
    reps: '10-12',
    rest_seconds: 45,
    form_tips: [
      'Stand with dumbbells in front of thighs',
      'Raise one or both arms to shoulder height',
      'Keep a slight bend in elbows',
      'Control the lowering phase',
    ],
    calories_per_set: 6,
  },
  {
    id: 'pike_pushup',
    name: 'Pike Push-ups',
    muscle_group: 'shoulders',
    secondary_muscles: ['triceps'],
    difficulty: 'intermediate',
    equipment_needed: ['none'],
    sets: 3,
    reps: '6-10',
    rest_seconds: 75,
    form_tips: [
      'Start in downward dog position',
      'Bend elbows and lower head toward ground',
      'Push back up to starting position',
      'Builds toward handstand pushups',
    ],
    calories_per_set: 9,
  },

  // BICEPS
  {
    id: 'db_bicep_curl',
    name: 'Dumbbell Bicep Curl',
    muscle_group: 'biceps',
    difficulty: 'beginner',
    equipment_needed: ['dumbbells'],
    sets: 3,
    reps: '10-15',
    rest_seconds: 45,
    form_tips: [
      'Stand straight, dumbbells at sides, palms forward',
      'Curl dumbbells up toward shoulders',
      'Keep elbows pinned to sides — don\'t swing',
      'Squeeze biceps at the top, lower slowly',
    ],
    calories_per_set: 6,
  },
  {
    id: 'db_hammer_curl',
    name: 'Dumbbell Hammer Curl',
    muscle_group: 'biceps',
    difficulty: 'beginner',
    equipment_needed: ['dumbbells'],
    sets: 3,
    reps: '10-12',
    rest_seconds: 45,
    form_tips: [
      'Same as bicep curl but palms face each other',
      'Targets brachialis and forearms too',
      'Keep elbows still — only forearms move',
      'Great for overall arm thickness',
    ],
    calories_per_set: 6,
  },
  {
    id: 'db_concentration_curl',
    name: 'Concentration Curl',
    muscle_group: 'biceps',
    difficulty: 'beginner',
    equipment_needed: ['dumbbells'],
    sets: 3,
    reps: '10-12 each',
    rest_seconds: 45,
    form_tips: [
      'Sit on chair, elbow braced against inner thigh',
      'Curl dumbbell up, squeezing at the top',
      'Very controlled movement — no swinging',
      'Best isolation exercise for bicep peak',
    ],
    calories_per_set: 5,
  },

  // TRICEPS
  {
    id: 'tricep_dips',
    name: 'Chair Tricep Dips',
    muscle_group: 'triceps',
    secondary_muscles: ['chest', 'shoulders'],
    difficulty: 'beginner',
    equipment_needed: ['none'],
    sets: 3,
    reps: '8-15',
    rest_seconds: 60,
    form_tips: [
      'Hands on edge of chair behind you',
      'Lower body by bending elbows to 90°',
      'Push back up squeezing triceps',
      'Keep back close to the chair',
    ],
    calories_per_set: 8,
  },
  {
    id: 'db_tricep_extension',
    name: 'Dumbbell Tricep Extension',
    muscle_group: 'triceps',
    difficulty: 'beginner',
    equipment_needed: ['dumbbells'],
    sets: 3,
    reps: '10-12',
    rest_seconds: 45,
    form_tips: [
      'Hold one dumbbell with both hands overhead',
      'Lower it behind your head by bending elbows',
      'Extend arms back up — squeeze triceps',
      'Keep elbows pointing forward, close to head',
    ],
    calories_per_set: 6,
  },
  {
    id: 'db_kickback',
    name: 'Dumbbell Tricep Kickback',
    muscle_group: 'triceps',
    difficulty: 'beginner',
    equipment_needed: ['dumbbells'],
    sets: 3,
    reps: '12-15',
    rest_seconds: 45,
    form_tips: [
      'Bend at hips, upper arm parallel to ground',
      'Extend forearm back until arm is straight',
      'Squeeze tricep at full extension',
      'Keep upper arm still throughout',
    ],
    calories_per_set: 5,
  },

  // LEGS
  {
    id: 'bodyweight_squat',
    name: 'Bodyweight Squat',
    muscle_group: 'legs',
    secondary_muscles: ['core'],
    difficulty: 'beginner',
    equipment_needed: ['none'],
    sets: 3,
    reps: '15-20',
    rest_seconds: 60,
    form_tips: [
      'Feet shoulder-width apart, toes slightly out',
      'Sit back as if sitting in a chair',
      'Knees track over toes — don\'t cave in',
      'Go as deep as comfortable, push through heels',
    ],
    calories_per_set: 10,
  },
  {
    id: 'goblet_squat',
    name: 'Goblet Squat',
    muscle_group: 'legs',
    secondary_muscles: ['core'],
    difficulty: 'beginner',
    equipment_needed: ['dumbbells'],
    sets: 3,
    reps: '10-15',
    rest_seconds: 60,
    form_tips: [
      'Hold dumbbell vertically at chest level',
      'Squat deep — elbows inside knees',
      'Keep torso upright, chest proud',
      'Great for learning squat form',
    ],
    calories_per_set: 12,
  },
  {
    id: 'lunges',
    name: 'Walking Lunges',
    muscle_group: 'legs',
    difficulty: 'beginner',
    equipment_needed: ['none'],
    sets: 3,
    reps: '10 each leg',
    rest_seconds: 60,
    form_tips: [
      'Step forward, lower back knee toward ground',
      'Front knee at 90°, doesn\'t pass toes',
      'Push off front foot to step forward',
      'Keep torso upright, core engaged',
    ],
    calories_per_set: 12,
  },
  {
    id: 'db_romanian_deadlift',
    name: 'Dumbbell Romanian Deadlift',
    muscle_group: 'legs',
    secondary_muscles: ['back'],
    difficulty: 'beginner',
    equipment_needed: ['dumbbells'],
    sets: 3,
    reps: '10-12',
    rest_seconds: 60,
    form_tips: [
      'Stand tall with dumbbells in front of thighs',
      'Hinge at hips, push butt back',
      'Lower dumbbells along legs, slight knee bend',
      'Feel the stretch in hamstrings, squeeze glutes up',
    ],
    calories_per_set: 10,
  },
  {
    id: 'calf_raises',
    name: 'Standing Calf Raises',
    muscle_group: 'legs',
    difficulty: 'beginner',
    equipment_needed: ['none'],
    sets: 3,
    reps: '15-25',
    rest_seconds: 30,
    form_tips: [
      'Stand on edge of a step for full range of motion',
      'Rise up on toes as high as possible',
      'Lower slowly below the step level',
      'Hold dumbbells for added resistance',
    ],
    calories_per_set: 5,
  },
  {
    id: 'wall_sit',
    name: 'Wall Sit',
    muscle_group: 'legs',
    secondary_muscles: ['core'],
    difficulty: 'beginner',
    equipment_needed: ['none'],
    sets: 3,
    reps: '30-60 sec',
    rest_seconds: 60,
    form_tips: [
      'Back flat against wall, slide down to 90°',
      'Knees directly above ankles',
      'Hold the position — don\'t let knees go past toes',
      'Great for building quad endurance',
    ],
    calories_per_set: 8,
  },

  // CORE
  {
    id: 'plank',
    name: 'Plank',
    muscle_group: 'core',
    difficulty: 'beginner',
    equipment_needed: ['none'],
    sets: 3,
    reps: '30-60 sec',
    rest_seconds: 45,
    form_tips: [
      'Forearms on ground, body in straight line',
      'Don\'t let hips sag or pike up',
      'Squeeze abs and glutes tight',
      'Breathe normally — don\'t hold your breath',
    ],
    calories_per_set: 6,
  },
  {
    id: 'crunches',
    name: 'Crunches',
    muscle_group: 'core',
    difficulty: 'beginner',
    equipment_needed: ['none'],
    sets: 3,
    reps: '15-20',
    rest_seconds: 30,
    form_tips: [
      'Lie on back, knees bent, hands behind head',
      'Lift shoulder blades off the ground',
      'Don\'t pull on your neck',
      'Exhale as you crunch up',
    ],
    calories_per_set: 5,
  },
  {
    id: 'bicycle_crunch',
    name: 'Bicycle Crunches',
    muscle_group: 'core',
    difficulty: 'beginner',
    equipment_needed: ['none'],
    sets: 3,
    reps: '15 each side',
    rest_seconds: 45,
    form_tips: [
      'Lie on back, hands behind head, legs up',
      'Twist elbow toward opposite knee',
      'Alternate sides in a pedaling motion',
      'Keep lower back pressed to the ground',
    ],
    calories_per_set: 7,
  },
  {
    id: 'leg_raises',
    name: 'Leg Raises',
    muscle_group: 'core',
    difficulty: 'beginner',
    equipment_needed: ['none'],
    sets: 3,
    reps: '10-15',
    rest_seconds: 45,
    form_tips: [
      'Lie flat, hands under lower back for support',
      'Raise legs to 90° keeping them straight',
      'Lower slowly without touching the ground',
      'Targets lower abs specifically',
    ],
    calories_per_set: 7,
  },
  {
    id: 'mountain_climbers',
    name: 'Mountain Climbers',
    muscle_group: 'core',
    secondary_muscles: ['legs', 'cardio'],
    difficulty: 'beginner',
    equipment_needed: ['none'],
    sets: 3,
    reps: '20 each leg',
    rest_seconds: 45,
    form_tips: [
      'Start in pushup position',
      'Drive knees toward chest alternately',
      'Keep hips level — don\'t bounce',
      'Great for cardio + core combo',
    ],
    calories_per_set: 12,
  },
  {
    id: 'dead_bug',
    name: 'Dead Bug',
    muscle_group: 'core',
    difficulty: 'beginner',
    equipment_needed: ['none'],
    sets: 3,
    reps: '10 each side',
    rest_seconds: 45,
    form_tips: [
      'Lie on back, arms up, knees at 90°',
      'Extend opposite arm and leg simultaneously',
      'Keep lower back pressed to ground',
      'Best anti-extension core exercise for beginners',
    ],
    calories_per_set: 6,
  },

  // FULL BODY
  {
    id: 'burpees',
    name: 'Burpees',
    muscle_group: 'full_body',
    secondary_muscles: ['chest', 'legs', 'core'],
    difficulty: 'intermediate',
    equipment_needed: ['none'],
    sets: 3,
    reps: '8-12',
    rest_seconds: 75,
    form_tips: [
      'Squat down, hands on floor',
      'Jump feet back to pushup position',
      'Do a pushup, jump feet forward',
      'Jump up with arms overhead',
    ],
    calories_per_set: 15,
  },
  {
    id: 'db_thrusters',
    name: 'Dumbbell Thrusters',
    muscle_group: 'full_body',
    secondary_muscles: ['legs', 'shoulders'],
    difficulty: 'intermediate',
    equipment_needed: ['dumbbells'],
    sets: 3,
    reps: '10-12',
    rest_seconds: 75,
    form_tips: [
      'Hold dumbbells at shoulders, squat down',
      'As you stand up, press dumbbells overhead',
      'Combine squat + press in one fluid motion',
      'Great full body compound movement',
    ],
    calories_per_set: 14,
  },
];

// ─── WORKOUT PLAN TEMPLATES ──────────────────────────

export interface WorkoutTemplate {
  name: string;
  day_of_week: number;
  muscle_focus: string;
  exercise_ids: string[];
  type: 'home' | 'gym' | 'calisthenics';
}

export const beginnerHomePlan: WorkoutTemplate[] = [
  {
    name: 'Push Day',
    day_of_week: 1, // Monday
    muscle_focus: 'Chest + Shoulders + Triceps',
    exercise_ids: ['pushup', 'db_chest_press', 'db_shoulder_press', 'db_lateral_raise', 'tricep_dips', 'db_tricep_extension'],
    type: 'home',
  },
  {
    name: 'Pull Day',
    day_of_week: 2, // Tuesday
    muscle_focus: 'Back + Biceps',
    exercise_ids: ['db_bent_row', 'db_single_row', 'reverse_fly', 'superman', 'db_bicep_curl', 'db_hammer_curl'],
    type: 'home',
  },
  {
    name: 'Leg Day',
    day_of_week: 3, // Wednesday
    muscle_focus: 'Quads + Hamstrings + Calves',
    exercise_ids: ['goblet_squat', 'lunges', 'db_romanian_deadlift', 'wall_sit', 'calf_raises'],
    type: 'home',
  },
  // Thursday = Rest
  {
    name: 'Upper Body',
    day_of_week: 5, // Friday
    muscle_focus: 'Full Upper Body',
    exercise_ids: ['pushup', 'db_bent_row', 'db_shoulder_press', 'db_bicep_curl', 'tricep_dips', 'plank'],
    type: 'home',
  },
  {
    name: 'Core + Arms',
    day_of_week: 6, // Saturday
    muscle_focus: 'Core + Arms + Cardio',
    exercise_ids: ['plank', 'bicycle_crunch', 'leg_raises', 'mountain_climbers', 'db_bicep_curl', 'db_tricep_extension'],
    type: 'home',
  },
  // Sunday = Rest
];

/**
 * Get exercises by their IDs
 */
export function getExercisesByIds(ids: string[]): Exercise[] {
  return ids
    .map((id) => homeExercises.find((ex) => ex.id === id))
    .filter((ex): ex is Exercise => ex !== undefined);
}

/**
 * Get exercises by muscle group
 */
export function getExercisesByMuscle(muscle: MuscleGroup): Exercise[] {
  return homeExercises.filter(
    (ex) => ex.muscle_group === muscle || ex.secondary_muscles?.includes(muscle)
  );
}

/**
 * Get exercises by difficulty
 */
export function getExercisesByDifficulty(difficulty: Difficulty): Exercise[] {
  return homeExercises.filter((ex) => ex.difficulty === difficulty);
}

/**
 * Get exercises compatible with user's equipment
 */
export function getExercisesForEquipment(equipment: Equipment[]): Exercise[] {
  return homeExercises.filter((ex) =>
    ex.equipment_needed.some((eq) => equipment.includes(eq))
  );
}

/**
 * Estimate total workout calories
 */
export function estimateWorkoutCalories(exercises: Exercise[]): number {
  return exercises.reduce((total, ex) => {
    return total + (ex.calories_per_set || 7) * ex.sets;
  }, 0);
}
