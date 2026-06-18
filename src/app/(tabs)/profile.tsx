/**
 * Project Ascend — Profile Screen
 */

import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/lib/constants';
import { useProfileStore } from '@/stores/profileStore';
import { useDailyStore } from '@/stores/dailyStore';
import { calculateBMI, getBMICategory, cmToFeet, estimateWeeksToGoal } from '@/lib/calculations';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const profile = useProfileStore((s) => s.profile);
  const daily = useDailyStore();

  const router = useRouter();
  const resetProfile = useProfileStore((s) => s.resetProfile);

  if (!profile) return null;

  const bmi = calculateBMI(profile.weight_kg, profile.height_cm);
  const bmiCategory = getBMICategory(bmi);
  const { feet, inches } = cmToFeet(profile.height_cm);
  const weeksToGoal = estimateWeeksToGoal(profile.weight_kg, profile.target_weight_kg, profile.goal);

  const statsItems = [
    { label: 'Current Weight', value: `${profile.weight_kg} kg`, icon: 'scale-outline' as const },
    { label: 'Target Weight', value: `${profile.target_weight_kg} kg`, icon: 'trending-up-outline' as const },
    { label: 'Height', value: `${feet}'${inches}" (${profile.height_cm}cm)`, icon: 'resize-outline' as const },
    { label: 'BMI', value: `${bmi} (${bmiCategory})`, icon: 'analytics-outline' as const },
    { label: 'Daily Calories', value: `${profile.daily_calories_target} kcal`, icon: 'flame-outline' as const },
    { label: 'Daily Protein', value: `${profile.daily_protein_target}g`, icon: 'nutrition-outline' as const },
    { label: 'BMR', value: `${profile.bmr} kcal`, icon: 'pulse-outline' as const },
    { label: 'TDEE', value: `${profile.tdee} kcal`, icon: 'speedometer-outline' as const },
    { label: 'Est. Time to Goal', value: `~${weeksToGoal} weeks`, icon: 'calendar-outline' as const },
  ];

  const settingsItems = [
    { label: 'Goal', value: profile.goal.replace('_', ' '), icon: 'flag-outline' as const },
    { label: 'Training', value: profile.training_pref, icon: 'barbell-outline' as const },
    { label: 'Diet', value: profile.diet_type.replace('_', ' '), icon: 'leaf-outline' as const },
    { label: 'Equipment', value: profile.equipment.join(', '), icon: 'construct-outline' as const },
    { label: 'Schedule', value: profile.schedule_type, icon: 'school-outline' as const },
    { label: 'Sleep', value: `${profile.sleep_time} - ${profile.wake_time}`, icon: 'moon-outline' as const },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{profile.name.charAt(0)}</Text>
          </View>
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.tagline}>
            {profile.age}yo • {profile.goal.replace('_', ' ')} • {daily.currentStreak} day streak 🔥
          </Text>
        </View>

        {/* Body Stats */}
        <Text style={styles.sectionTitle}>Body Stats</Text>
        <View style={styles.statsCard}>
          {statsItems.map((item, i) => (
            <View key={i} style={[styles.statItem, i < statsItems.length - 1 && styles.statItemBorder]}>
              <View style={styles.statItemLeft}>
                <Ionicons name={item.icon} size={18} color={COLORS.textMuted} />
                <Text style={styles.statItemLabel}>{item.label}</Text>
              </View>
              <Text style={styles.statItemValue}>{item.value}</Text>
            </View>
          ))}
        </View>

        {/* Settings */}
        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.statsCard}>
          {settingsItems.map((item, i) => (
            <View key={i} style={[styles.statItem, i < settingsItems.length - 1 && styles.statItemBorder]}>
              <View style={styles.statItemLeft}>
                <Ionicons name={item.icon} size={18} color={COLORS.textMuted} />
                <Text style={styles.statItemLabel}>{item.label}</Text>
              </View>
              <Text style={[styles.statItemValue, { textTransform: 'capitalize' }]}>{item.value}</Text>
            </View>
          ))}
        </View>

        {/* Quick Actions */}
        <TouchableOpacity
          style={styles.dangerButton}
          onPress={() => {
            resetProfile();
            router.replace('/(onboarding)/welcome');
          }}
        >
          <Ionicons name="refresh-outline" size={18} color={COLORS.danger} />
          <Text style={styles.dangerButtonText}>Reset Profile & Restart Onboarding</Text>
        </TouchableOpacity>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scrollContent: { paddingHorizontal: 20 },

  profileHeader: {
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 32,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primaryMuted,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 3,
    borderColor: COLORS.primary,
  },
  avatarText: { fontSize: 32, fontFamily: 'Inter_700Bold', color: COLORS.primary },
  name: { fontSize: 24, fontFamily: 'Inter_700Bold', color: COLORS.text, marginBottom: 4 },
  tagline: { fontSize: 14, fontFamily: 'Inter_500Medium', color: COLORS.textMuted },

  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.text,
    marginBottom: 12,
    marginTop: 8,
  },
  statsCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  statItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  statItemBorder: { borderBottomWidth: 1, borderBottomColor: COLORS.cardBorder },
  statItemLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  statItemLabel: { fontSize: 14, fontFamily: 'Inter_400Regular', color: COLORS.textMuted },
  statItemValue: { fontSize: 14, fontFamily: 'Inter_600SemiBold', color: COLORS.text },

  dangerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.dangerMuted,
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 16,
  },
  dangerButtonText: { fontSize: 14, fontFamily: 'Inter_500Medium', color: COLORS.danger },
});
