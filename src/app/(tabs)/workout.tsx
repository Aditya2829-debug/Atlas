/**
 * Project Ascend — Workout Hub
 */

import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/lib/constants';
import { useProfileStore } from '@/stores/profileStore';
import { useDailyStore } from '@/stores/dailyStore';
import { useWorkoutStore } from '@/stores/workoutStore';
import { getExercisesByIds, beginnerHomePlan } from '@/data/exercises';
import { getDayName, getDayOfWeek, formatDuration } from '@/lib/utils';
import { useRouter } from 'expo-router';

export default function WorkoutScreen() {
  const router = useRouter();
  const profile = useProfileStore((s) => s.profile);
  const daily = useDailyStore();
  const workoutStore = useWorkoutStore();
  const todayPlan = workoutStore.plans.find((p) => p.day_of_week === getDayOfWeek());

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Workout</Text>
          <Text style={styles.subtitle}>{getDayName()} • Week 1</Text>
        </View>

        {/* Today's Workout */}
        {todayPlan ? (
          <View style={styles.todayCard}>
            <View style={styles.todayBadge}>
              <Text style={styles.todayBadgeText}>TODAY</Text>
            </View>
            <Text style={styles.todayTitle}>{todayPlan.name}</Text>
            <Text style={styles.todayMuscle}>
              {todayPlan.day_of_week === 1 ? 'Chest + Shoulders + Triceps' :
               todayPlan.day_of_week === 2 ? 'Back + Biceps' :
               todayPlan.day_of_week === 3 ? 'Quads + Hamstrings + Calves' :
               todayPlan.day_of_week === 5 ? 'Full Upper Body' :
               'Core + Arms + Cardio'}
            </Text>
            <View style={styles.todayMeta}>
              <View style={styles.metaItem}>
                <Ionicons name="barbell-outline" size={16} color={COLORS.textMuted} />
                <Text style={styles.metaText}>{todayPlan.exercises.length} exercises</Text>
              </View>
              <View style={styles.metaItem}>
                <Ionicons name="time-outline" size={16} color={COLORS.textMuted} />
                <Text style={styles.metaText}>~35 min</Text>
              </View>
              <View style={styles.metaItem}>
                <Ionicons name="flash-outline" size={16} color={COLORS.textMuted} />
                <Text style={styles.metaText}>Beginner</Text>
              </View>
            </View>
            <TouchableOpacity 
              style={[styles.startButton, daily.workoutDone && styles.doneButton]}
              disabled={daily.workoutDone}
              onPress={() => router.push(`/workout/${todayPlan.id}` as never)}
            >
              <Text style={styles.startButtonText}>
                {daily.workoutDone ? '✅ Completed Today' : '▶ Start Workout'}
              </Text>
            </TouchableOpacity>

            {/* Exercise Preview */}
            <View style={styles.exerciseList}>
              {todayPlan.exercises.map((exercise, i) => (
                <TouchableOpacity
                  key={exercise.id}
                  style={styles.exerciseItem}
                  onPress={() => router.push(`/workout/${todayPlan.id}` as never)}
                >
                  <View style={styles.exerciseNumber}>
                    <Text style={styles.exerciseNumberText}>{i + 1}</Text>
                  </View>
                  <View style={styles.exerciseInfo}>
                    <Text style={styles.exerciseName}>{exercise.name}</Text>
                    <Text style={styles.exerciseDetail}>
                      {exercise.sets} sets × {exercise.reps} • {exercise.rest_seconds}s rest
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={18} color={COLORS.textDim} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ) : (
          <View style={styles.restDayCard}>
            <Text style={styles.restEmoji}>😴</Text>
            <Text style={styles.restTitle}>Rest Day</Text>
            <Text style={styles.restSubtitle}>Recovery is when muscles grow. Stretch, hydrate, eat well.</Text>
          </View>
        )}

        {/* Weekly Plan Overview */}
        <Text style={styles.sectionTitle}>This Week</Text>
        <View style={styles.weekPlan}>
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
            const plan = beginnerHomePlan.find((p) => p.day_of_week === i + 1);
            const isToday = getDayOfWeek() === (i + 1) % 7;
            const isPast = (i + 1) % 7 < getDayOfWeek();
            
            return (
              <View key={day} style={[styles.weekDay, isToday && styles.weekDayActive]}>
                <Text style={[styles.weekDayLabel, isToday && styles.weekDayLabelActive]}>
                  {day}
                </Text>
                {plan ? (
                  <View style={[styles.weekDayDot, { backgroundColor: isToday ? COLORS.primary : COLORS.accent }]} />
                ) : (
                  <View style={[styles.weekDayDot, { backgroundColor: COLORS.textDim, opacity: 0.3 }]} />
                )}
                <Text style={[styles.weekDayType, isToday && { color: COLORS.primary }]}>
                  {plan?.name.split(' ')[0] || 'Rest'}
                </Text>
              </View>
            );
          })}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scrollContent: { paddingHorizontal: 20 },
  header: { paddingTop: 12, paddingBottom: 20 },
  title: { fontSize: 28, fontFamily: 'Inter_700Bold', color: COLORS.text },
  subtitle: { fontSize: 14, fontFamily: 'Inter_500Medium', color: COLORS.textMuted, marginTop: 4 },

  todayCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  todayBadge: {
    backgroundColor: COLORS.primaryMuted,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  todayBadgeText: { fontSize: 11, fontFamily: 'Inter_700Bold', color: COLORS.primary, letterSpacing: 1 },
  todayTitle: { fontSize: 24, fontFamily: 'Inter_700Bold', color: COLORS.text, marginBottom: 4 },
  todayMuscle: { fontSize: 14, fontFamily: 'Inter_500Medium', color: COLORS.textMuted, marginBottom: 16 },
  todayMeta: { flexDirection: 'row', gap: 16, marginBottom: 20 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  metaText: { fontSize: 13, fontFamily: 'Inter_400Regular', color: COLORS.textMuted },

  startButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  doneButton: { backgroundColor: COLORS.primaryMuted },
  startButtonText: { fontSize: 16, fontFamily: 'Inter_600SemiBold', color: '#000' },

  exerciseList: { gap: 2 },
  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.cardBorder,
    gap: 12,
  },
  exerciseNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.cardBorder,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exerciseNumberText: { fontSize: 13, fontFamily: 'Inter_600SemiBold', color: COLORS.textMuted },
  exerciseInfo: { flex: 1 },
  exerciseName: { fontSize: 15, fontFamily: 'Inter_500Medium', color: COLORS.text },
  exerciseDetail: { fontSize: 13, fontFamily: 'Inter_400Regular', color: COLORS.textDim, marginTop: 2 },

  restDayCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 32,
    marginBottom: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  restEmoji: { fontSize: 48, marginBottom: 12 },
  restTitle: { fontSize: 22, fontFamily: 'Inter_700Bold', color: COLORS.text, marginBottom: 8 },
  restSubtitle: { fontSize: 14, fontFamily: 'Inter_400Regular', color: COLORS.textMuted, textAlign: 'center' },

  sectionTitle: { fontSize: 18, fontFamily: 'Inter_600SemiBold', color: COLORS.text, marginBottom: 16 },
  weekPlan: { flexDirection: 'row', gap: 6, marginBottom: 24 },
  weekDay: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  weekDayActive: { borderColor: COLORS.primary, backgroundColor: COLORS.primaryMuted },
  weekDayLabel: { fontSize: 11, fontFamily: 'Inter_600SemiBold', color: COLORS.textDim, marginBottom: 8 },
  weekDayLabelActive: { color: COLORS.primary },
  weekDayDot: { width: 6, height: 6, borderRadius: 3, marginBottom: 6 },
  weekDayType: { fontSize: 9, fontFamily: 'Inter_500Medium', color: COLORS.textDim },
});
