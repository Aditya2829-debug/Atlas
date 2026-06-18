import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Vibration,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, Stack } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { COLORS } from '@/lib/constants';
import { useWorkoutStore } from '@/stores/workoutStore';
import { useDailyStore } from '@/stores/dailyStore';

export default function ActiveWorkoutScreen() {
  const router = useRouter();
  const dailyStore = useDailyStore();
  const workoutStore = useWorkoutStore();

  const plan = workoutStore.plans.find((p) => p.id === workoutStore.activeWorkoutId) || workoutStore.plans[0];
  const activeIndex = workoutStore.activeExerciseIndex;
  const currentExercise = plan?.exercises[activeIndex];

  // Rest Timer State
  const [timerActive, setTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const timerRef = useRef<any | null>(null);

  // Total Workout Timer
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  useEffect(() => {
    const totalTimer = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(totalTimer);
  }, []);

  // Rest Timer Effect
  useEffect(() => {
    if (timerActive && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && timerActive) {
      setTimerActive(false);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      Vibration.vibrate([0, 500, 100, 500]); // vibrate twice
      Alert.alert('Rest Over!', 'Time for your next set.');
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [timerActive, timeLeft]);

  if (!plan || !currentExercise) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>No active workout in progress.</Text>
      </SafeAreaView>
    );
  }

  const handleSetToggle = (setIndex: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    workoutStore.toggleSetCompleted(currentExercise.id, setIndex);

    const isCompletedNow = !workoutStore.completedSets[currentExercise.id]?.[setIndex];
    if (isCompletedNow) {
      // Start Rest Timer
      setTimeLeft(currentExercise.rest_seconds || 60);
      setTimerActive(true);
    }
  };

  const handleSkipRest = () => {
    setTimerActive(false);
    setTimeLeft(0);
  };

  const handleAddRestTime = () => {
    setTimeLeft((prev) => prev + 30);
  };

  const handlePrevExercise = () => {
    if (activeIndex > 0) {
      workoutStore.setActiveExerciseIndex(activeIndex - 1);
      setTimerActive(false);
    }
  };

  const handleNextExercise = () => {
    if (activeIndex < plan.exercises.length - 1) {
      workoutStore.setActiveExerciseIndex(activeIndex + 1);
      setTimerActive(false);
    }
  };

  const handleFinishWorkout = () => {
    Alert.alert(
      'Finish Workout?',
      'Are you sure you want to complete this workout session?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Finish',
          onPress: () => {
            const durationMinutes = Math.ceil(elapsedSeconds / 60);
            workoutStore.completeWorkout(durationMinutes, 3);
            dailyStore.markWorkoutDone(durationMinutes);
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            router.replace('/(tabs)');
          },
        },
      ]
    );
  };

  const formatElapsedTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const completedSetsCount = (workoutStore.completedSets[currentExercise.id] || []).filter(Boolean).length;

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: `Active: ${plan.name}`,
          headerStyle: { backgroundColor: COLORS.background },
          headerTintColor: COLORS.text,
          headerTitleStyle: { fontFamily: 'Inter_600SemiBold', fontSize: 17 },
          headerRight: () => (
            <Text style={styles.elapsedText}>{formatElapsedTime(elapsedSeconds)}</Text>
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  'Quit Workout?',
                  'Your progress for this active session will be discarded.',
                  [
                    { text: 'Cancel', style: 'cancel' },
                    {
                      text: 'Quit',
                      style: 'destructive',
                      onPress: () => {
                        workoutStore.resetActiveWorkout();
                        router.back();
                      },
                    },
                  ]
                );
              }}
              style={{ marginRight: 12 }}
            >
              <Ionicons name="close-outline" size={26} color={COLORS.text} />
            </TouchableOpacity>
          ),
        }}
      />

      <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
        {/* Rest Timer Banner */}
        {timerActive && (
          <View style={styles.timerBanner}>
            <View style={styles.timerBannerLeft}>
              <Ionicons name="alarm-outline" size={22} color={COLORS.accent} />
              <Text style={styles.timerBannerText}>Rest Timer: {timeLeft}s</Text>
            </View>
            <View style={styles.timerBannerRight}>
              <TouchableOpacity style={styles.timerAddButton} onPress={handleAddRestTime}>
                <Text style={styles.timerAddButtonText}>+30s</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.timerSkipButton} onPress={handleSkipRest}>
                <Text style={styles.timerSkipButtonText}>Skip</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Progress Indicator */}
          <Text style={styles.progressIndicatorText}>
            EXERCISE {activeIndex + 1} OF {plan.exercises.length}
          </Text>

          {/* Exercise Details */}
          <Text style={styles.exerciseName}>{currentExercise.name}</Text>
          <Text style={styles.exerciseMuscle}>{currentExercise.muscle_group.toUpperCase()}</Text>

          {/* Sets Tracker */}
          <View style={styles.setsCard}>
            <View style={styles.setsHeader}>
              <Text style={styles.setsHeaderTitle}>SETS & TARGETS</Text>
              <Text style={styles.setsHeaderProgress}>
                {completedSetsCount}/{currentExercise.sets} completed
              </Text>
            </View>

            {new Array(currentExercise.sets).fill(0).map((_, idx) => {
              const isDone = !!workoutStore.completedSets[currentExercise.id]?.[idx];
              return (
                <TouchableOpacity
                  key={idx}
                  style={[styles.setRow, isDone && styles.setRowCompleted]}
                  onPress={() => handleSetToggle(idx)}
                  activeOpacity={0.7}
                >
                  <View style={styles.setRowLeft}>
                    <View style={[styles.setIndexCircle, isDone && styles.setIndexCircleCompleted]}>
                      <Text style={[styles.setIndexText, isDone && styles.setIndexTextCompleted]}>
                        {idx + 1}
                      </Text>
                    </View>
                    <Text style={[styles.setTargetText, isDone && styles.setTargetTextCompleted]}>
                      Target: {currentExercise.reps} reps (Dumbbell: 5kg)
                    </Text>
                  </View>
                  <Ionicons
                    name={isDone ? 'checkmark-circle' : 'ellipse-outline'}
                    size={24}
                    color={isDone ? COLORS.primary : COLORS.textDim}
                  />
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Form Tips */}
          {currentExercise.form_tips && currentExercise.form_tips.length > 0 && (
            <View style={styles.tipsCard}>
              <View style={styles.tipsHeader}>
                <Ionicons name="bulb-outline" size={20} color={COLORS.warning} />
                <Text style={styles.tipsTitle}>FORM TIPS</Text>
              </View>
              {currentExercise.form_tips.map((tip, index) => (
                <View key={index} style={styles.tipRow}>
                  <Text style={styles.tipBullet}>•</Text>
                  <Text style={styles.tipText}>{tip}</Text>
                </View>
              ))}
            </View>
          )}
        </ScrollView>

        {/* Bottom Navigation */}
        <View style={styles.footer}>
          <View style={styles.footerRow}>
            <TouchableOpacity
              style={[styles.navButton, activeIndex === 0 && styles.navButtonDisabled]}
              onPress={handlePrevExercise}
              disabled={activeIndex === 0}
            >
              <Ionicons name="arrow-back" size={20} color={activeIndex === 0 ? COLORS.textDim : COLORS.text} />
              <Text style={[styles.navButtonText, activeIndex === 0 && styles.navButtonTextDisabled]}>Prev</Text>
            </TouchableOpacity>

            {activeIndex < plan.exercises.length - 1 ? (
              <TouchableOpacity style={styles.navButton} onPress={handleNextExercise}>
                <Text style={styles.navButtonText}>Next</Text>
                <Ionicons name="arrow-forward" size={20} color={COLORS.text} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.finishButton} onPress={handleFinishWorkout}>
                <Text style={styles.finishButtonText}>Finish Workout</Text>
                <Ionicons name="checkmark" size={20} color="#000" />
              </TouchableOpacity>
            )}
          </View>
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
  elapsedText: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.primary,
    marginRight: 8,
  },
  timerBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.accentMuted,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.accentDim,
  },
  timerBannerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  timerBannerText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.accent,
  },
  timerBannerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  timerAddButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
  },
  timerAddButtonText: {
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.text,
  },
  timerSkipButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: COLORS.accent,
    borderRadius: 8,
  },
  timerSkipButtonText: {
    fontSize: 12,
    fontFamily: 'Inter_700Bold',
    color: '#000',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 100,
  },
  progressIndicatorText: {
    fontSize: 12,
    fontFamily: 'Inter_700Bold',
    color: COLORS.primary,
    letterSpacing: 1,
    marginBottom: 8,
  },
  exerciseName: {
    fontSize: 28,
    fontFamily: 'Inter_700Bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  exerciseMuscle: {
    fontSize: 13,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.textMuted,
    marginBottom: 24,
  },
  setsCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    padding: 16,
    marginBottom: 20,
  },
  setsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.cardBorder,
    paddingBottom: 12,
    marginBottom: 12,
  },
  setsHeaderTitle: {
    fontSize: 12,
    fontFamily: 'Inter_700Bold',
    color: COLORS.textMuted,
    letterSpacing: 0.5,
  },
  setsHeaderProgress: {
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.primary,
  },
  setRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.cardBorder,
  },
  setRowCompleted: {
    opacity: 0.7,
  },
  setRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  setIndexCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.cardBorder,
    justifyContent: 'center',
    alignItems: 'center',
  },
  setIndexCircleCompleted: {
    backgroundColor: COLORS.primaryMuted,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  setIndexText: {
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.textMuted,
  },
  setIndexTextCompleted: {
    color: COLORS.primary,
    fontFamily: 'Inter_700Bold',
  },
  setTargetText: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    color: COLORS.text,
  },
  setTargetTextCompleted: {
    color: COLORS.textMuted,
    textDecorationLine: 'line-through',
  },
  tipsCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    padding: 16,
    marginBottom: 20,
  },
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  tipsTitle: {
    fontSize: 12,
    fontFamily: 'Inter_700Bold',
    color: COLORS.warning,
    letterSpacing: 0.5,
  },
  tipRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  tipBullet: {
    fontSize: 14,
    color: COLORS.textMuted,
  },
  tipText: {
    flex: 1,
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textSecondary,
    lineHeight: 18,
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
  footerRow: {
    flexDirection: 'row',
    gap: 12,
  },
  navButton: {
    flexDirection: 'row',
    flex: 1,
    height: 56,
    backgroundColor: COLORS.card,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
  navButtonText: {
    fontSize: 15,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.text,
  },
  navButtonTextDisabled: {
    color: COLORS.textDim,
  },
  finishButton: {
    flexDirection: 'row',
    flex: 1.5,
    height: 56,
    backgroundColor: COLORS.primary,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  finishButtonText: {
    fontSize: 15,
    fontFamily: 'Inter_700Bold',
    color: '#000',
  },
});
