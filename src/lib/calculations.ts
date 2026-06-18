/**
 * Project Ascend — Fitness Calculations
 * 
 * BMR: Mifflin-St Jeor Equation (most accurate for general population)
 * TDEE: BMR × Activity Multiplier
 * Macros: Based on goal-specific splits
 */

import { type Gender, type Goal } from './types';
import { MACRO_SPLIT } from './constants';

// Activity multipliers
const ACTIVITY_MULTIPLIERS = {
  sedentary: 1.2,      // Little/no exercise
  light: 1.375,        // Light exercise 1-3 days/week
  moderate: 1.55,      // Moderate exercise 3-5 days/week
  active: 1.725,       // Hard exercise 6-7 days/week
  very_active: 1.9,    // Very hard exercise, physical job
} as const;

type ActivityLevel = keyof typeof ACTIVITY_MULTIPLIERS;

/**
 * Calculate BMR using Mifflin-St Jeor Equation
 * 
 * Male:   10 × weight(kg) + 6.25 × height(cm) - 5 × age - 5
 * Female: 10 × weight(kg) + 6.25 × height(cm) - 5 × age - 161
 */
export function calculateBMR(
  weight_kg: number,
  height_cm: number,
  age: number,
  gender: Gender
): number {
  const base = 10 * weight_kg + 6.25 * height_cm - 5 * age;
  return gender === 'female' ? base - 161 : base - 5;
}

/**
 * Calculate TDEE (Total Daily Energy Expenditure)
 */
export function calculateTDEE(
  bmr: number,
  activityLevel: ActivityLevel = 'moderate'
): number {
  return Math.round(bmr * ACTIVITY_MULTIPLIERS[activityLevel]);
}

/**
 * Calculate daily calorie target based on goal
 * - Weight gain: TDEE + 500 (lean bulk)
 * - Muscle building: TDEE + 300 (clean bulk)
 * - Fat loss: TDEE - 500 (moderate deficit)
 * - Strength: TDEE + 200 (slight surplus)
 * - Calisthenics: TDEE + 200
 * - General: TDEE (maintenance)
 */
export function calculateDailyCalories(tdee: number, goal: Goal): number {
  const surpluses: Record<Goal, number> = {
    weight_gain: 500,
    muscle_building: 300,
    fat_loss: -500,
    strength: 200,
    calisthenics: 200,
    general: 0,
  };
  return Math.round(tdee + surpluses[goal]);
}

/**
 * Calculate daily protein target
 * 
 * Minimum: 1.6g per kg body weight
 * For muscle gain: 2.0g per kg
 * For fat loss: 2.2g per kg (higher to preserve muscle)
 */
export function calculateProteinTarget(weight_kg: number, goal: Goal): number {
  const proteinPerKg: Record<Goal, number> = {
    weight_gain: 1.8,
    muscle_building: 2.0,
    fat_loss: 2.2,
    strength: 2.0,
    calisthenics: 1.8,
    general: 1.6,
  };
  return Math.round(weight_kg * proteinPerKg[goal]);
}

/**
 * Calculate macro breakdown in grams from total calories
 */
export function calculateMacros(
  totalCalories: number,
  goal: Goal
): { protein_g: number; carbs_g: number; fat_g: number } {
  const split = MACRO_SPLIT[goal];
  return {
    protein_g: Math.round((totalCalories * split.protein) / 4), // 4 cal per gram
    carbs_g: Math.round((totalCalories * split.carbs) / 4),     // 4 cal per gram
    fat_g: Math.round((totalCalories * split.fat) / 9),          // 9 cal per gram
  };
}

/**
 * Calculate all targets from onboarding data
 */
export function calculateAllTargets(
  weight_kg: number,
  height_cm: number,
  age: number,
  gender: Gender,
  goal: Goal,
  activityLevel: ActivityLevel = 'moderate'
) {
  const bmr = calculateBMR(weight_kg, height_cm, age, gender);
  const tdee = calculateTDEE(bmr, activityLevel);
  const dailyCalories = calculateDailyCalories(tdee, goal);
  const dailyProtein = calculateProteinTarget(weight_kg, goal);
  const macros = calculateMacros(dailyCalories, goal);

  return {
    bmr: Math.round(bmr),
    tdee,
    daily_calories_target: dailyCalories,
    daily_protein_target: dailyProtein,
    macros,
  };
}

/**
 * Calculate BMI
 */
export function calculateBMI(weight_kg: number, height_cm: number): number {
  const heightM = height_cm / 100;
  return Number((weight_kg / (heightM * heightM)).toFixed(1));
}

/**
 * Get BMI category
 */
export function getBMICategory(bmi: number): string {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
}

/**
 * Estimate weeks to reach target weight
 * Healthy gain: 0.25-0.5 kg/week
 * Healthy loss: 0.5-1.0 kg/week
 */
export function estimateWeeksToGoal(
  currentWeight: number,
  targetWeight: number,
  goal: Goal
): number {
  const diff = Math.abs(targetWeight - currentWeight);
  const weeklyRate = goal === 'fat_loss' ? 0.5 : 0.35; // kg per week
  return Math.ceil(diff / weeklyRate);
}

/**
 * Convert height from feet/inches to cm
 */
export function feetToCm(feet: number, inches: number = 0): number {
  return Math.round((feet * 30.48) + (inches * 2.54));
}

/**
 * Convert cm to feet and inches
 */
export function cmToFeet(cm: number): { feet: number; inches: number } {
  const totalInches = cm / 2.54;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);
  return { feet, inches };
}

/**
 * Calculate ideal weight range (based on BMI 20-25)
 */
export function getIdealWeightRange(height_cm: number): { min: number; max: number } {
  const heightM = height_cm / 100;
  return {
    min: Math.round(20 * heightM * heightM),
    max: Math.round(25 * heightM * heightM),
  };
}
