/**
 * Project Ascend — Home Dashboard
 * 
 * The command center. Shows all daily stats at a glance.
 * Everything the user needs to answer: "What should I do today?"
 */

import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { COLORS, WATER_GLASS_ML, DAILY_WATER_TARGET_ML, DEFAULT_HABITS } from '@/lib/constants';
import { getGreeting, getPercentage, formatNumber, getStreakEmoji, getMotivationalMessage } from '@/lib/utils';
import { useProfileStore } from '@/stores/profileStore';
import { useDailyStore } from '@/stores/dailyStore';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const profile = useProfileStore((s) => s.profile);
  const daily = useDailyStore();

  if (!profile) return null;

  const caloriePercent = getPercentage(daily.totalCalories, profile.daily_calories_target);
  const proteinPercent = getPercentage(daily.totalProtein, profile.daily_protein_target);
  const waterPercent = getPercentage(daily.waterIntakeMl, DAILY_WATER_TARGET_ML);
  const weightProgress = getPercentage(
    profile.weight_kg - 52, // starting weight
    profile.target_weight_kg - 52
  );

  const proteinRemaining = Math.max(0, profile.daily_protein_target - daily.totalProtein);
  const caloriesRemaining = Math.max(0, profile.daily_calories_target - daily.totalCalories);

  const aiInsight = getMotivationalMessage({
    streak: daily.currentStreak,
    proteinRemaining,
    workoutDone: daily.workoutDone,
    waterRemaining: DAILY_WATER_TARGET_ML - daily.waterIntakeMl,
  });

  // Daily missions
  const missions = [
    { id: '1', label: 'Breakfast', icon: '🍳', completed: daily.foodLogs.some((f) => f.meal_type === 'breakfast') },
    { id: '2', label: 'Workout', icon: '💪', completed: daily.workoutDone },
    { id: '3', label: '3L Water', icon: '💧', completed: daily.waterIntakeMl >= DAILY_WATER_TARGET_ML },
    { id: '4', label: `${profile.daily_protein_target}g Protein`, icon: '🥩', completed: daily.totalProtein >= profile.daily_protein_target },
    { id: '5', label: 'Lunch', icon: '🍽️', completed: daily.foodLogs.some((f) => f.meal_type === 'lunch') },
    { id: '6', label: 'Dinner', icon: '🌙', completed: daily.foodLogs.some((f) => f.meal_type === 'dinner') },
  ];

  const missionsCompleted = missions.filter((m) => m.completed).length;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ─── Header ─────────────────────────── */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>{getGreeting()}</Text>
            <Text style={styles.name}>{profile.name} 👋</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity 
              style={styles.streakBadge}
              onPress={() => {/* streak detail */}}
            >
              <Text style={styles.streakEmoji}>{getStreakEmoji(daily.currentStreak)}</Text>
              <Text style={styles.streakCount}>{daily.currentStreak}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.aiButton}
              onPress={() => router.push('/ai-coach' as never)}
            >
              <Ionicons name="chatbubble-ellipses" size={22} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* ─── AI Insight Card ────────────────── */}
        <View style={styles.insightCard}>
          <View style={styles.insightIcon}>
            <Ionicons name="flash" size={18} color={COLORS.accent} />
          </View>
          <Text style={styles.insightText}>{aiInsight}</Text>
        </View>

        {/* ─── Transformation Progress ────────── */}
        <View style={styles.transformCard}>
          <View style={styles.transformHeader}>
            <Text style={styles.cardTitle}>Transformation</Text>
            <Text style={styles.transformTarget}>
              {profile.weight_kg}kg → {profile.target_weight_kg}kg
            </Text>
          </View>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBarFill, { width: `${Math.max(weightProgress, 5)}%` }]} />
          </View>
          <Text style={styles.progressLabel}>
            {weightProgress > 0 ? `${weightProgress}% progress` : 'Just getting started'} • 
            {' '}{profile.target_weight_kg - profile.weight_kg}kg to go
          </Text>
        </View>

        {/* ─── Stats Grid ─────────────────────── */}
        <View style={styles.statsGrid}>
          {/* Calories Card */}
          <TouchableOpacity style={styles.statCard} onPress={() => router.push('/(tabs)/nutrition' as never)}>
            <View style={styles.statHeader}>
              <Text style={styles.statLabel}>Calories</Text>
              <View style={[styles.statBadge, { backgroundColor: COLORS.primaryMuted }]}>
                <Text style={[styles.statBadgeText, { color: COLORS.primary }]}>{caloriePercent}%</Text>
              </View>
            </View>
            <Text style={styles.statValue}>{formatNumber(daily.totalCalories)}</Text>
            <Text style={styles.statTarget}>/ {formatNumber(profile.daily_calories_target)} kcal</Text>
            <View style={styles.miniProgressBar}>
              <View style={[styles.miniProgressFill, { width: `${Math.min(caloriePercent, 100)}%`, backgroundColor: COLORS.primary }]} />
            </View>
            <Text style={styles.statRemaining}>
              {caloriesRemaining > 0 ? `${formatNumber(caloriesRemaining)} remaining` : '✅ Target hit!'}
            </Text>
          </TouchableOpacity>

          {/* Protein Card */}
          <TouchableOpacity style={styles.statCard} onPress={() => router.push('/(tabs)/nutrition' as never)}>
            <View style={styles.statHeader}>
              <Text style={styles.statLabel}>Protein</Text>
              <View style={[styles.statBadge, { backgroundColor: COLORS.accentMuted }]}>
                <Text style={[styles.statBadgeText, { color: COLORS.accent }]}>{proteinPercent}%</Text>
              </View>
            </View>
            <Text style={styles.statValue}>{Math.round(daily.totalProtein)}g</Text>
            <Text style={styles.statTarget}>/ {profile.daily_protein_target}g</Text>
            <View style={styles.miniProgressBar}>
              <View style={[styles.miniProgressFill, { width: `${Math.min(proteinPercent, 100)}%`, backgroundColor: COLORS.accent }]} />
            </View>
            <Text style={styles.statRemaining}>
              {proteinRemaining > 0 ? `${Math.round(proteinRemaining)}g remaining` : '✅ Target hit!'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* ─── Water & Workout Row ────────────── */}
        <View style={styles.statsGrid}>
          {/* Water Card */}
          <TouchableOpacity 
            style={styles.statCard}
            onPress={() => daily.addWater(WATER_GLASS_ML)}
            activeOpacity={0.7}
          >
            <View style={styles.statHeader}>
              <Text style={styles.statLabel}>Water</Text>
              <Ionicons name="water" size={18} color={COLORS.secondary} />
            </View>
            <Text style={styles.statValue}>{(daily.waterIntakeMl / 1000).toFixed(1)}L</Text>
            <Text style={styles.statTarget}>/ {DAILY_WATER_TARGET_ML / 1000}L</Text>
            <View style={styles.miniProgressBar}>
              <View style={[styles.miniProgressFill, { width: `${Math.min(waterPercent, 100)}%`, backgroundColor: COLORS.secondary }]} />
            </View>
            <Text style={[styles.statRemaining, { color: COLORS.secondary }]}>
              Tap to add +250ml
            </Text>
          </TouchableOpacity>

          {/* Workout Card */}
          <TouchableOpacity 
            style={[styles.statCard, daily.workoutDone && styles.statCardSuccess]}
            onPress={() => router.push('/(tabs)/workout' as never)}
          >
            <View style={styles.statHeader}>
              <Text style={styles.statLabel}>Workout</Text>
              {daily.workoutDone ? (
                <Ionicons name="checkmark-circle" size={20} color={COLORS.primary} />
              ) : (
                <Ionicons name="barbell-outline" size={20} color={COLORS.accent} />
              )}
            </View>
            {daily.workoutDone ? (
              <>
                <Text style={[styles.statValue, { color: COLORS.primary }]}>Done! ✅</Text>
                <Text style={styles.statTarget}>{daily.workoutMinutes} minutes</Text>
              </>
            ) : (
              <>
                <Text style={styles.statValue}>Pending</Text>
                <Text style={[styles.statTarget, { color: COLORS.accent }]}>Push Day today</Text>
              </>
            )}
            <View style={styles.workoutButton}>
              <Text style={styles.workoutButtonText}>
                {daily.workoutDone ? 'View Details' : 'Start Workout →'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* ─── Daily Missions ─────────────────── */}
        <View style={styles.missionsCard}>
          <View style={styles.missionsHeader}>
            <Text style={styles.cardTitle}>Daily Missions</Text>
            <Text style={styles.missionCount}>{missionsCompleted}/{missions.length}</Text>
          </View>
          {missions.map((mission) => (
            <View key={mission.id} style={styles.missionItem}>
              <Text style={styles.missionIcon}>{mission.icon}</Text>
              <Text style={[
                styles.missionLabel,
                mission.completed && styles.missionCompleted,
              ]}>
                {mission.label}
              </Text>
              {mission.completed ? (
                <Ionicons name="checkmark-circle" size={22} color={COLORS.primary} />
              ) : (
                <Ionicons name="ellipse-outline" size={22} color={COLORS.textDim} />
              )}
            </View>
          ))}
        </View>

        {/* ─── Quick Actions ──────────────────── */}
        <View style={styles.quickActions}>
          <TouchableOpacity 
            style={[styles.quickAction, { backgroundColor: COLORS.primaryMuted }]}
            onPress={() => router.push('/(tabs)/nutrition' as never)}
          >
            <Text style={styles.quickActionEmoji}>🍽️</Text>
            <Text style={[styles.quickActionLabel, { color: COLORS.primary }]}>Log Food</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.quickAction, { backgroundColor: COLORS.secondaryMuted }]}
            onPress={() => daily.addWater(WATER_GLASS_ML)}
          >
            <Text style={styles.quickActionEmoji}>💧</Text>
            <Text style={[styles.quickActionLabel, { color: COLORS.secondary }]}>+Water</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.quickAction, { backgroundColor: COLORS.accentMuted }]}
            onPress={() => router.push('/(tabs)/workout' as never)}
          >
            <Text style={styles.quickActionEmoji}>💪</Text>
            <Text style={[styles.quickActionLabel, { color: COLORS.accent }]}>Workout</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.quickAction, { backgroundColor: 'rgba(168, 85, 247, 0.15)' }]}
            onPress={() => router.push('/ai-coach' as never)}
          >
            <Text style={styles.quickActionEmoji}>🤖</Text>
            <Text style={[styles.quickActionLabel, { color: '#A855F7' }]}>AI Coach</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom padding */}
        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 20,
  },
  greeting: {
    fontSize: 14,
    color: COLORS.textMuted,
    fontFamily: 'Inter_500Medium',
  },
  name: {
    fontSize: 28,
    color: COLORS.text,
    fontFamily: 'Inter_700Bold',
    marginTop: 2,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.accentMuted,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
  },
  streakEmoji: {
    fontSize: 16,
  },
  streakCount: {
    fontSize: 15,
    fontFamily: 'Inter_700Bold',
    color: COLORS.accent,
  },
  aiButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primaryMuted,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // AI Insight
  insightCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    gap: 12,
  },
  insightIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.accentMuted,
    justifyContent: 'center',
    alignItems: 'center',
  },
  insightText: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textSecondary,
    fontFamily: 'Inter_500Medium',
    lineHeight: 20,
  },

  // Transformation
  transformCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  transformHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  cardTitle: {
    fontSize: 17,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.text,
  },
  transformTarget: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.primary,
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: COLORS.cardBorder,
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 5,
  },
  progressLabel: {
    fontSize: 13,
    color: COLORS.textMuted,
    fontFamily: 'Inter_400Regular',
  },

  // Stats Grid
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  statCardSuccess: {
    borderColor: COLORS.primaryMuted,
    backgroundColor: 'rgba(34, 197, 94, 0.05)',
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 13,
    color: COLORS.textMuted,
    fontFamily: 'Inter_500Medium',
  },
  statBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  statBadgeText: {
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
  },
  statValue: {
    fontSize: 26,
    fontFamily: 'Inter_700Bold',
    color: COLORS.text,
    marginBottom: 2,
  },
  statTarget: {
    fontSize: 13,
    color: COLORS.textDim,
    fontFamily: 'Inter_400Regular',
    marginBottom: 10,
  },
  miniProgressBar: {
    height: 4,
    backgroundColor: COLORS.cardBorder,
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 8,
  },
  miniProgressFill: {
    height: '100%',
    borderRadius: 2,
  },
  statRemaining: {
    fontSize: 12,
    color: COLORS.textDim,
    fontFamily: 'Inter_400Regular',
  },

  // Workout button inside card
  workoutButton: {
    marginTop: 8,
    backgroundColor: COLORS.accentMuted,
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: 'center',
  },
  workoutButtonText: {
    fontSize: 13,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.accent,
  },

  // Missions
  missionsCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  missionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  missionCount: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.primary,
  },
  missionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.cardBorder,
    gap: 12,
  },
  missionIcon: {
    fontSize: 18,
    width: 28,
    textAlign: 'center',
  },
  missionLabel: {
    flex: 1,
    fontSize: 15,
    fontFamily: 'Inter_500Medium',
    color: COLORS.text,
  },
  missionCompleted: {
    textDecorationLine: 'line-through',
    color: COLORS.textDim,
  },

  // Quick Actions
  quickActions: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 8,
  },
  quickAction: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 14,
    gap: 6,
  },
  quickActionEmoji: {
    fontSize: 22,
  },
  quickActionLabel: {
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
  },
});
