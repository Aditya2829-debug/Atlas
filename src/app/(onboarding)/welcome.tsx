import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { COLORS } from '@/lib/constants';

const { width } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Glow Element */}
        <View style={styles.glow} />

        {/* Hero Icon */}
        <View style={styles.iconContainer}>
          <Ionicons name="trending-up" size={48} color={COLORS.primary} />
        </View>

        {/* Hero Title */}
        <Text style={styles.title}>ASCEND</Text>
        <Text style={styles.subtitle}>
          Build your ultimate body, habits, and daily discipline in one unified system.
        </Text>

        {/* Feature Highlights */}
        <View style={styles.features}>
          <View style={styles.featureRow}>
            <View style={styles.featureIcon}>
              <Ionicons name="barbell-outline" size={20} color={COLORS.primary} />
            </View>
            <View>
              <Text style={styles.featureTitle}>Home & Gym Planner</Text>
              <Text style={styles.featureDesc}>Workouts designed around your 5kg dumbbells or the gym.</Text>
            </View>
          </View>

          <View style={styles.featureRow}>
            <View style={styles.featureIcon}>
              <Ionicons name="nutrition-outline" size={20} color={COLORS.accent} />
            </View>
            <View>
              <Text style={styles.featureTitle}>Indian Calorie Estimator</Text>
              <Text style={styles.featureDesc}>Accurate tracking for roti, paneer, and local Indian foods.</Text>
            </View>
          </View>

          <View style={styles.featureRow}>
            <View style={styles.featureIcon}>
              <Ionicons name="chatbubble-ellipses-outline" size={20} color={COLORS.secondary} />
            </View>
            <View>
              <Text style={styles.featureTitle}>AI Transformation Coach</Text>
              <Text style={styles.featureDesc}>Personal advice, daily motivational boosts, and modifications.</Text>
            </View>
          </View>
        </View>

        {/* Start Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/(onboarding)/basic-info' as never)}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Begin Journey</Text>
          <Ionicons name="arrow-forward" size={18} color="#000" />
        </TouchableOpacity>
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
    top: '10%',
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: (width * 0.8) / 2,
    backgroundColor: COLORS.primaryGlow,
    opacity: 0.5,
    filter: 'blur(80px)' as any,
  },
  iconContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: COLORS.primaryMuted,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.primary,
    marginBottom: 24,
  },
  title: {
    fontSize: 40,
    fontFamily: 'Inter_900Black',
    color: COLORS.text,
    letterSpacing: 2,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
    color: COLORS.textMuted,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 12,
    marginBottom: 40,
  },
  features: {
    width: '100%',
    gap: 20,
    marginBottom: 48,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    gap: 16,
  },
  featureIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.03)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureTitle: {
    fontSize: 15,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.text,
    marginBottom: 2,
  },
  featureDesc: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textMuted,
    maxWidth: '90%',
  },
  button: {
    flexDirection: 'row',
    width: '100%',
    height: 56,
    backgroundColor: COLORS.primary,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    color: '#000',
  },
});
