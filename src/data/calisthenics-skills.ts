/**
 * Project Ascend — Calisthenics Skill Tree Data
 * 
 * Four branches: Push, Pull, Core, Balance
 * Each branch has 7 progressions from beginner to advanced.
 * Designed as a game-like unlock system.
 */

import { type CalisthenicsSkill, type SkillCategory } from '../lib/types';

export const calisthenicsSkills: CalisthenicsSkill[] = [
  // ─── PUSH PROGRESSION ──────────────────────
  {
    id: 'push_1',
    name: 'Wall Push-up',
    category: 'push',
    progression_level: 0,
    description: 'Easiest push variation. Stand arm\'s length from wall and push.',
    unlock_criteria: '3 sets of 15 reps',
    form_tips: [
      'Stand at arm\'s length from wall',
      'Place hands shoulder-width on the wall',
      'Lean in, touch nose to wall, push back',
      'Keep body straight throughout',
    ],
  },
  {
    id: 'push_2',
    name: 'Incline Push-up',
    category: 'push',
    progression_level: 1,
    prerequisite: 'Wall Push-up',
    description: 'Hands on elevated surface like table or bench.',
    unlock_criteria: '3 sets of 12 reps',
    form_tips: [
      'Use table, bench, or stairs',
      'Lower surface = harder the exercise',
      'Full range of motion — chest to surface',
      'Progress to lower surfaces over time',
    ],
  },
  {
    id: 'push_3',
    name: 'Knee Push-up',
    category: 'push',
    progression_level: 2,
    prerequisite: 'Incline Push-up',
    description: 'Standard push-up from knees. Builds foundation.',
    unlock_criteria: '3 sets of 12 reps',
    form_tips: [
      'Knees on ground, cross ankles',
      'Straight line from knees to head',
      'Full range of motion',
      'Once easy, move to regular push-ups',
    ],
  },
  {
    id: 'push_4',
    name: 'Push-up',
    category: 'push',
    progression_level: 3,
    prerequisite: 'Knee Push-up',
    description: 'The classic. Master this before moving on.',
    unlock_criteria: '3 sets of 15 reps',
    form_tips: [
      'Hands shoulder-width, body straight',
      'Lower until chest nearly touches ground',
      'Push up explosively',
      'The gold standard of bodyweight fitness',
    ],
  },
  {
    id: 'push_5',
    name: 'Diamond Push-up',
    category: 'push',
    progression_level: 4,
    prerequisite: 'Push-up',
    description: 'Hands together. Targets inner chest and triceps.',
    unlock_criteria: '3 sets of 10 reps',
    form_tips: [
      'Hands form a diamond shape under chest',
      'Elbows stay close to body',
      'Much harder than regular push-ups',
      'Key stepping stone to advanced variations',
    ],
  },
  {
    id: 'push_6',
    name: 'Archer Push-up',
    category: 'push',
    progression_level: 5,
    prerequisite: 'Diamond Push-up',
    description: 'One arm does most of the work. Builds toward one-arm pushup.',
    unlock_criteria: '3 sets of 8 reps each side',
    form_tips: [
      'Wide hand placement',
      'Shift weight to one arm, other arm assists',
      'Lower toward the working arm',
      'Builds unilateral pushing strength',
    ],
  },
  {
    id: 'push_7',
    name: 'Pseudo Planche Push-up',
    category: 'push',
    progression_level: 6,
    prerequisite: 'Archer Push-up',
    description: 'Hands by waist, leaning forward. Advanced level.',
    unlock_criteria: '3 sets of 8 reps',
    form_tips: [
      'Hands at waist level, fingers pointing out/back',
      'Lean forward significantly before pushing',
      'Extreme shoulder and chest strength needed',
      'Works toward planche progression',
    ],
  },

  // ─── PULL PROGRESSION ──────────────────────
  {
    id: 'pull_1',
    name: 'Dead Hang',
    category: 'pull',
    progression_level: 0,
    description: 'Just hang from the bar. Builds grip and shoulder strength.',
    unlock_criteria: '30 seconds hold',
    form_tips: [
      'Grab bar with overhand grip, shoulder width',
      'Arms fully extended, feet off ground',
      'Pack shoulders (pull slightly down)',
      'Builds grip strength foundation',
    ],
  },
  {
    id: 'pull_2',
    name: 'Australian Pull-up',
    category: 'pull',
    progression_level: 1,
    prerequisite: 'Dead Hang',
    description: 'Inverted row. Feet on ground, pull chest to bar.',
    unlock_criteria: '3 sets of 12 reps',
    form_tips: [
      'Use a low bar or table edge',
      'Body at 45° angle, heels on ground',
      'Pull chest to bar, squeeze shoulder blades',
      'Easier alternative to full pull-up',
    ],
  },
  {
    id: 'pull_3',
    name: 'Negative Pull-up',
    category: 'pull',
    progression_level: 2,
    prerequisite: 'Australian Pull-up',
    description: 'Jump to top position, lower yourself as slowly as possible.',
    unlock_criteria: '3 sets of 5 reps (5 sec lowering)',
    form_tips: [
      'Jump or use a chair to get chin above bar',
      'Lower yourself as slowly as possible (5 seconds)',
      'Build eccentric strength for full pull-up',
      'This is the #1 way to learn pull-ups',
    ],
  },
  {
    id: 'pull_4',
    name: 'Pull-up',
    category: 'pull',
    progression_level: 3,
    prerequisite: 'Negative Pull-up',
    description: 'The king of upper body exercises. Pull chin over bar.',
    unlock_criteria: '3 sets of 5 reps',
    form_tips: [
      'Overhand grip, shoulder width',
      'Pull chin above the bar',
      'No kipping or swinging',
      'Engage lats — pull elbows to hips',
    ],
  },
  {
    id: 'pull_5',
    name: 'Chest-to-Bar Pull-up',
    category: 'pull',
    progression_level: 4,
    prerequisite: 'Pull-up',
    description: 'Pull higher — chest touches the bar.',
    unlock_criteria: '3 sets of 5 reps',
    form_tips: [
      'Pull chest to the bar, not just chin over',
      'Requires more lat strength',
      'Lean back slightly at the top',
      'Essential for muscle-up progression',
    ],
  },
  {
    id: 'pull_6',
    name: 'Wide Grip Pull-up',
    category: 'pull',
    progression_level: 5,
    prerequisite: 'Chest-to-Bar Pull-up',
    description: 'Wider grip targets outer lats more.',
    unlock_criteria: '3 sets of 8 reps',
    form_tips: [
      'Hands wider than shoulder width',
      'Pull straight up, elbows out',
      'Builds the V-taper back shape',
      'Harder than standard pull-ups',
    ],
  },
  {
    id: 'pull_7',
    name: 'Muscle-Up',
    category: 'pull',
    progression_level: 6,
    prerequisite: 'Wide Grip Pull-up',
    description: 'The holy grail. Pull-up + dip in one movement.',
    unlock_criteria: '1 clean rep',
    form_tips: [
      'Start with high pull-ups',
      'At the top, transition over the bar',
      'Push down to dip position',
      'Takes months to learn — be patient',
    ],
  },

  // ─── CORE PROGRESSION ──────────────────────
  {
    id: 'core_1',
    name: 'Dead Bug',
    category: 'core',
    progression_level: 0,
    description: 'Beginner anti-extension exercise. Safe for everyone.',
    unlock_criteria: '3 sets of 10 each side',
    form_tips: [
      'Lie on back, arms up, knees at 90°',
      'Extend opposite arm and leg',
      'Keep lower back glued to floor',
      'Breathe out as you extend',
    ],
  },
  {
    id: 'core_2',
    name: 'Plank (60 sec)',
    category: 'core',
    progression_level: 1,
    prerequisite: 'Dead Bug',
    description: 'Hold plank for 60 seconds with perfect form.',
    unlock_criteria: '60 seconds hold',
    form_tips: [
      'Forearms on ground, straight line body',
      'Squeeze abs and glutes',
      'Don\'t sag or pike',
      'Breathe normally throughout',
    ],
  },
  {
    id: 'core_3',
    name: 'Side Plank (30 sec)',
    category: 'core',
    progression_level: 2,
    prerequisite: 'Plank (60 sec)',
    description: 'Lateral core stability. Essential for overall balance.',
    unlock_criteria: '30 seconds each side',
    form_tips: [
      'Stack feet, forearm on ground',
      'Hips lifted, body in straight line',
      'Top arm can be on hip or extended',
      'Don\'t let hips drop',
    ],
  },
  {
    id: 'core_4',
    name: 'Hollow Body Hold',
    category: 'core',
    progression_level: 3,
    prerequisite: 'Side Plank (30 sec)',
    description: 'Gymnastics foundation exercise. Core stays engaged.',
    unlock_criteria: '30 seconds hold',
    form_tips: [
      'Lie on back, arms overhead',
      'Lift shoulders and legs off ground',
      'Lower back pressed into floor',
      'Shape body like a banana/hollow position',
    ],
  },
  {
    id: 'core_5',
    name: 'L-Sit (Floor)',
    category: 'core',
    progression_level: 4,
    prerequisite: 'Hollow Body Hold',
    description: 'Hold yourself up with legs straight out. Crazy core strength.',
    unlock_criteria: '10 seconds hold',
    form_tips: [
      'Hands on floor beside hips (or on parallettes)',
      'Press down, lift butt off ground',
      'Extend legs straight in front',
      'Requires core + hip flexor strength',
    ],
  },
  {
    id: 'core_6',
    name: 'Hanging Leg Raise',
    category: 'core',
    progression_level: 5,
    prerequisite: 'L-Sit (Floor)',
    description: 'Hang from bar and raise legs to 90°. Advanced.',
    unlock_criteria: '3 sets of 8 reps',
    form_tips: [
      'Hang from bar, legs straight',
      'Raise legs to 90° (or higher)',
      'No swinging — controlled movement',
      'Start with knee raises if too hard',
    ],
  },
  {
    id: 'core_7',
    name: 'Dragon Flag',
    category: 'core',
    progression_level: 6,
    prerequisite: 'Hanging Leg Raise',
    description: 'Bruce Lee\'s signature move. Ultimate core exercise.',
    unlock_criteria: '3 sets of 5 reps',
    form_tips: [
      'Lie on bench, grip behind head',
      'Lift entire body up to vertical',
      'Lower slowly, body stays straight as a flag',
      'Only shoulders touch the bench',
    ],
  },

  // ─── BALANCE PROGRESSION ───────────────────
  {
    id: 'balance_1',
    name: 'Bear Crawl',
    category: 'balance',
    progression_level: 0,
    description: 'Crawl on hands and feet. Builds coordination.',
    unlock_criteria: '3 sets of 20 steps',
    form_tips: [
      'Hands and feet on ground, knees hovering',
      'Move opposite hand and foot together',
      'Keep hips level and low',
      'Builds whole-body coordination',
    ],
  },
  {
    id: 'balance_2',
    name: 'Frog Stand',
    category: 'balance',
    progression_level: 1,
    prerequisite: 'Bear Crawl',
    description: 'Squat with knees on elbows, lift feet. Entry to balancing.',
    unlock_criteria: '15 seconds hold',
    form_tips: [
      'Squat down, hands shoulder-width on floor',
      'Place knees on back of elbows/triceps',
      'Lean forward slowly, lift feet off ground',
      'First hand-balancing skill to learn',
    ],
  },
  {
    id: 'balance_3',
    name: 'Crow Pose',
    category: 'balance',
    progression_level: 2,
    prerequisite: 'Frog Stand',
    description: 'Arms bent, knees on arms, balance on hands.',
    unlock_criteria: '15 seconds hold',
    form_tips: [
      'Similar to frog stand but arms more bent',
      'Round upper back slightly',
      'Look forward, not down',
      'Shift weight forward to find balance point',
    ],
  },
  {
    id: 'balance_4',
    name: 'Headstand',
    category: 'balance',
    progression_level: 3,
    prerequisite: 'Crow Pose',
    description: 'Balance on head and forearms. Build inverted strength.',
    unlock_criteria: '30 seconds hold',
    form_tips: [
      'Tripod position — head and two hands',
      'Walk feet in, lift one leg at a time',
      'Use a wall for support initially',
      'Core must be rock solid',
    ],
  },
  {
    id: 'balance_5',
    name: 'Wall Handstand',
    category: 'balance',
    progression_level: 4,
    prerequisite: 'Headstand',
    description: 'Kick up to handstand against wall. Hold with control.',
    unlock_criteria: '30 seconds hold',
    form_tips: [
      'Face wall, hands 6 inches away',
      'Kick up one leg at a time',
      'Squeeze core and glutes',
      'Stack shoulders over wrists',
    ],
  },
  {
    id: 'balance_6',
    name: 'Freestanding Handstand',
    category: 'balance',
    progression_level: 5,
    prerequisite: 'Wall Handstand',
    description: 'No wall. Pure balance. Advanced skill.',
    unlock_criteria: '10 seconds hold',
    form_tips: [
      'Kick up away from wall',
      'Fingers grip the ground for balance',
      'Think "tall" — extend through shoulders',
      'Practice bail-out (cartwheel out)',
    ],
  },
  {
    id: 'balance_7',
    name: 'Handstand Push-up (Wall)',
    category: 'balance',
    progression_level: 6,
    prerequisite: 'Freestanding Handstand',
    description: 'Push-up while in handstand position against wall.',
    unlock_criteria: '3 sets of 5 reps',
    form_tips: [
      'Get into wall handstand',
      'Lower head toward ground',
      'Push back up to straight arms',
      'Ultimate pressing strength exercise',
    ],
  },
];

/**
 * Get skills by category
 */
export function getSkillsByCategory(category: SkillCategory): CalisthenicsSkill[] {
  return calisthenicsSkills
    .filter((s) => s.category === category)
    .sort((a, b) => a.progression_level - b.progression_level);
}

/**
 * Get all categories with their skills
 */
export function getAllSkillTrees(): Record<SkillCategory, CalisthenicsSkill[]> {
  return {
    push: getSkillsByCategory('push'),
    pull: getSkillsByCategory('pull'),
    core: getSkillsByCategory('core'),
    balance: getSkillsByCategory('balance'),
  };
}

/**
 * Get the next skill to unlock in a category
 */
export function getNextSkill(
  category: SkillCategory,
  currentLevel: number
): CalisthenicsSkill | null {
  const skills = getSkillsByCategory(category);
  return skills.find((s) => s.progression_level === currentLevel + 1) ?? null;
}

/**
 * Category metadata
 */
export const skillCategoryMeta: Record<SkillCategory, { label: string; emoji: string; color: string }> = {
  push: { label: 'Push', emoji: '💪', color: '#EF4444' },
  pull: { label: 'Pull', emoji: '🏋️', color: '#3B82F6' },
  core: { label: 'Core', emoji: '🔥', color: '#F97316' },
  balance: { label: 'Balance', emoji: '🤸', color: '#22C55E' },
};
