import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { COLORS } from '@/lib/constants';
import { useWorkoutStore } from '@/stores/workoutStore';
import { useProfileStore } from '@/stores/profileStore';

export default function WorkoutDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const profile = useProfileStore((s) => s.profile);
  
  // Custom lookup for active routine
  const workoutStore = useWorkoutStore();
  const plan = workoutStore.plans.find((p) => p.id === id) || workoutStore.plans[0];

  if (!plan) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Workout plan not found.</Text>
      </SafeAreaView>
    );
  }

  const handleStartWorkout = () => {
    // Save active workout ID in store
    workoutStore.setActiveWorkout(plan.id);
    router.push('/workout/active' as never);
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: plan.name,
          headerStyle: { backgroundColor: COLORS.background },
          headerTintColor: COLORS.text,
          headerTitleStyle: { fontFamily: 'Inter_600SemiBold', fontSize: 17 },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 12 }}>
              <Ionicons name="arrow-back" size={24} color={COLORS.text} />
            </TouchableOpacity>
          ),
        }}
      />
      <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Metadata Card */}
          <View style={styles.metaCard}>
            <View style={styles.metaItem}>
              <Ionicons name="time-outline" size={20} color={COLORS.primary} />
              <View>
                <Text style={styles.metaLabel}>Duration</Text>
                <Text style={styles.metaValue}>{plan.duration_minutes} min</Text>
              </View>
            </View>

            <View style={styles.metaItem}>
              <Ionicons name="flash-outline" size={20} color={COLORS.accent} />
              <View>
                <Text style={styles.metaLabel}>Difficulty</Text>
                <Text style={[styles.metaValue, { textTransform: 'capitalize' }]}>{plan.difficulty}</Text>
              </View>
            </View>

            <View style={styles.metaItem}>
              <Ionicons name="construct-outline" size={20} color={COLORS.secondary} />
              <View>
                <Text style={styles.metaLabel}>Equipment</Text>
                <Text style={styles.metaValue}>
                  {profile?.equipment.includes('dumbbells') ? 'Dumbbells' : 'Bodyweight'}
                </Text>
              </View>
            </View>
          </View>

          {/* Exercise list */}
          <Text style={styles.sectionTitle}>Exercises ({plan.exercises.length})</Text>
          <View style={styles.exerciseList}>
            {plan.exercises.map((exercise, index) => (
              <View key={exercise.id} style={styles.exerciseCard}>
                <View style={styles.exerciseIndex}>
                  <Text style={styles.indexText}>{index + 1}</Text>
                </View>
                <View style={styles.exerciseInfo}>
                  <Text style={styles.exerciseName}>{exercise.name}</Text>
                  <Text style={styles.exerciseMeta}>
                    {exercise.sets} sets × {exercise.reps} • {exercise.muscle_group.toUpperCase()}
                  </Text>
                  {exercise.form_tips && exercise.form_tips.length > 0 && (
                    <View style={styles.tipsContainer}>
                      <Ionicons name="information-circle-outline" size={14} color={COLORS.textMuted} />
                      <Text style={styles.tipText} numberOfLines={2}>
                        {exercise.form_tips[0]}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Start Button */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.startButton} onPress={handleStartWorkout} activeOpacity={0.8}>
            <Text style={styles.startButtonText}>Start Workout</Text>
            <Ionicons name="play" size={18} color="#000" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  errorText: {
    color: COLORS.danger,
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
    textAlign: 'center',
    marginTop: 40,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 100,
  },
  metaCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  metaLabel: {
    fontSize: 11,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textMuted,
  },
  metaValue: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.text,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.text,
    marginBottom: 16,
  },
  exerciseList: {
    gap: 12,
  },
  exerciseCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    alignItems: 'center',
    gap: 16,
  },
  exerciseIndex: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primaryMuted,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  indexText: {
    fontSize: 15,
    fontFamily: 'Inter_700Bold',
    color: COLORS.primary,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.text,
    marginBottom: 4,
  },
  exerciseMeta: {
    fontSize: 13,
    fontFamily: 'Inter_500Medium',
    color: COLORS.textMuted,
  },
  tipsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
    backgroundColor: 'rgba(255,255,255,0.02)',
    padding: 8,
    borderRadius: 8,
  },
  tipText: {
    flex: 1,
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textDim,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.background,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.cardBorder,
  },
  startButton: {
    flexDirection: 'row',
    height: 56,
    backgroundColor: COLORS.primary,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  startButtonText: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    color: '#000',
  },
});
