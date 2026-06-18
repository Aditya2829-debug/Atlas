/**
 * Project Ascend — Utility Functions
 */

/**
 * Format a number with commas (e.g., 2,839)
 */
export function formatNumber(num: number): string {
  return Math.round(num).toLocaleString('en-IN');
}

/**
 * Get percentage (clamped to 0-100)
 */
export function getPercentage(current: number, target: number): number {
  if (target === 0) return 0;
  return Math.min(Math.max(Math.round((current / target) * 100), 0), 100);
}

/**
 * Get decimal percentage (0.0 - 1.0)
 */
export function getDecimalPercentage(current: number, target: number): number {
  if (target === 0) return 0;
  return Math.min(Math.max(current / target, 0), 1);
}

/**
 * Get time-based greeting
 */
export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 5) return 'Late night grind';
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  if (hour < 21) return 'Good evening';
  return 'Good night';
}

/**
 * Format date to readable string
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/**
 * Format date to short format (Mon, 19 Jun)
 */
export function formatDateShort(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
}

/**
 * Get today's date as YYYY-MM-DD string
 */
export function getTodayString(): string {
  return new Date().toISOString().split('T')[0];
}

/**
 * Get day of week (0-6, Sunday=0)
 */
export function getDayOfWeek(): number {
  return new Date().getDay();
}

/**
 * Get day name
 */
export function getDayName(dayIndex?: number): string {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[dayIndex ?? getDayOfWeek()];
}

/**
 * Get short day name
 */
export function getDayNameShort(dayIndex?: number): string {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return days[dayIndex ?? getDayOfWeek()];
}

/**
 * Format minutes to readable duration (e.g., "45 min" or "1h 15m")
 */
export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

/**
 * Format time string (HH:mm) to 12-hour format
 */
export function formatTime12h(time: string): string {
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const h = hours % 12 || 12;
  return `${h}:${minutes.toString().padStart(2, '0')} ${period}`;
}

/**
 * Calculate water glasses from ml
 */
export function mlToGlasses(ml: number, glassSize: number = 250): number {
  return Math.floor(ml / glassSize);
}

/**
 * Generate a UUID
 */
export function generateId(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Clamp a number between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Get streak emoji based on count
 */
export function getStreakEmoji(streak: number): string {
  if (streak >= 30) return '👑';
  if (streak >= 21) return '💎';
  if (streak >= 14) return '⭐';
  if (streak >= 7) return '🔥';
  if (streak >= 3) return '✨';
  return '🌱';
}

/**
 * Get motivational message based on context
 */
export function getMotivationalMessage(context: {
  streak?: number;
  proteinRemaining?: number;
  waterRemaining?: number;
  workoutDone?: boolean;
  missedWorkouts?: number;
}): string {
  const messages: string[] = [];

  if (context.proteinRemaining && context.proteinRemaining > 30) {
    messages.push(`You're ${Math.round(context.proteinRemaining)}g protein short. Try soya chunks or eggs.`);
  }
  if (context.waterRemaining && context.waterRemaining > 1000) {
    messages.push(`Drink up! ${(context.waterRemaining / 1000).toFixed(1)}L water remaining today.`);
  }
  if (context.missedWorkouts && context.missedWorkouts >= 2) {
    messages.push(`You skipped ${context.missedWorkouts} workouts this week. Don't let it become a habit.`);
  }
  if (context.streak && context.streak >= 7) {
    messages.push(`${context.streak} day streak! ${getStreakEmoji(context.streak)} Keep the momentum going.`);
  }
  if (context.workoutDone) {
    messages.push('Workout done! Great discipline today. Recovery and protein are key now.');
  }

  if (messages.length === 0) {
    const defaults = [
      'Every rep counts. Every meal matters. Stay locked in.',
      'The body you want is built in the days you don\'t feel like training.',
      'Discipline is doing what needs to be done, even when you don\'t feel like it.',
      'You\'re building a stronger version of yourself. One day at a time.',
      'Consistency beats intensity. Show up every day.',
    ];
    return defaults[Math.floor(Math.random() * defaults.length)];
  }

  return messages[0];
}
