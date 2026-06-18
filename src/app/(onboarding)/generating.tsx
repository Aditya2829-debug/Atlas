import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { COLORS } from '@/lib/constants';
import { useOnboardingStore } from '@/stores/onboardingStore';
import { useProfileStore } from '@/stores/profileStore';

const { width } = Dimensions.get('window');

const loadingSteps = [
  '🔄 Analyzing your stats (52kg, 5\'9")...',
  '🧮 Calculating Mifflin-St Jeor BMR...',
  '🔥 Adjusting TDEE for moderate activity...',
  '🥦 Formulating protein targets (1.6g/kg)...',
  '💪 Structuring dumbbell home routine...',
  '🍽️ Building Indian meal budget profiles...',
  '🤖 Training your personal AI Coach...',
  '🚀 Ready to launch!',
];

export default function GeneratingScreen() {
  const router = useRouter();
  const { data } = useOnboardingStore();
  const completeOnboarding = useProfileStore((s) => s.completeOnboarding);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Cycle through steps
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < loadingSteps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 600);

    // Complete onboarding and redirect after finishing all steps
    const completeTimeout = setTimeout(() => {
      completeOnboarding(data);
      router.replace('/(tabs)');
    }, loadingSteps.length * 600 + 400);

    return () => {
      clearInterval(stepInterval);
      clearTimeout(completeTimeout);
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Glow */}
        <View style={styles.glow} />

        {/* Loading Spinner */}
        <View style={styles.spinnerContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>

        {/* Text */}
        <Text style={styles.title}>Creating Plan</Text>
        <Text style={styles.subtitle}>
          Our AI is customizing your nutrition targets, workouts, and habits...
        </Text>

        {/* Active Step */}
        <View style={styles.stepCard}>
          <Text style={styles.stepText}>{loadingSteps[currentStep]}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  glow: {
    position: 'absolute',
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: (width * 0.7) / 2,
    backgroundColor: COLORS.primaryGlow,
    opacity: 0.4,
    filter: 'blur(70px)' as any,
  },
  spinnerContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.card,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter_700Bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textMuted,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 40,
    paddingHorizontal: 16,
  },
  stepCard: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    width: '100%',
    alignItems: 'center',
  },
  stepText: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    color: COLORS.primary,
  },
});
