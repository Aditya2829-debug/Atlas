/**
 * Project Ascend — Nutrition Tracker
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/lib/constants';
import { useProfileStore } from '@/stores/profileStore';
import { useDailyStore } from '@/stores/dailyStore';
import { searchFoods, getBudgetProteinSources } from '@/data/indian-foods';
import { formatNumber, getPercentage } from '@/lib/utils';
import type { MealType, FoodItem } from '@/lib/types';

export default function NutritionScreen() {
  const profile = useProfileStore((s) => s.profile);
  const daily = useDailyStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<FoodItem[]>([]);
  const [selectedMeal, setSelectedMeal] = useState<MealType>('snack');

  if (!profile) return null;

  const caloriePercent = getPercentage(daily.totalCalories, profile.daily_calories_target);
  const proteinPercent = getPercentage(daily.totalProtein, profile.daily_protein_target);
  const carbsTarget = Math.round((profile.daily_calories_target * 0.50) / 4);
  const fatTarget = Math.round((profile.daily_calories_target * 0.25) / 9);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length >= 2) {
      setSearchResults(searchFoods(query).slice(0, 8));
    } else {
      setSearchResults([]);
    }
  };

  const handleAddFood = (food: FoodItem) => {
    daily.addFoodLog({
      meal_type: selectedMeal,
      food_name: food.name,
      quantity: food.serving,
      calories: food.calories,
      protein_g: food.protein_g,
      carbs_g: food.carbs_g,
      fat_g: food.fat_g,
      ai_estimated: false,
    });
    setSearchQuery('');
    setSearchResults([]);
  };

  const proteinSuggestions = getBudgetProteinSources(profile.diet_type).slice(0, 5);
  const proteinRemaining = Math.max(0, profile.daily_protein_target - daily.totalProtein);

  const mealTypes: { key: MealType; label: string; icon: string }[] = [
    { key: 'breakfast', label: 'Breakfast', icon: '🍳' },
    { key: 'lunch', label: 'Lunch', icon: '🍽️' },
    { key: 'dinner', label: 'Dinner', icon: '🌙' },
    { key: 'snack', label: 'Snack', icon: '🥜' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Nutrition</Text>
          <Text style={styles.subtitle}>Track your meals & macros</Text>
        </View>

        {/* Macro Overview */}
        <View style={styles.macroCard}>
          <View style={styles.macroRing}>
            <Text style={styles.macroRingValue}>{formatNumber(daily.totalCalories)}</Text>
            <Text style={styles.macroRingLabel}>/ {formatNumber(profile.daily_calories_target)} kcal</Text>
          </View>
          <View style={styles.macroGrid}>
            {/* Protein */}
            <View style={styles.macroItem}>
              <View style={[styles.macroDot, { backgroundColor: COLORS.accent }]} />
              <Text style={styles.macroLabel}>Protein</Text>
              <Text style={styles.macroValue}>{Math.round(daily.totalProtein)}g</Text>
              <Text style={styles.macroTarget}>/ {profile.daily_protein_target}g</Text>
            </View>
            {/* Carbs */}
            <View style={styles.macroItem}>
              <View style={[styles.macroDot, { backgroundColor: COLORS.secondary }]} />
              <Text style={styles.macroLabel}>Carbs</Text>
              <Text style={styles.macroValue}>{Math.round(daily.totalCarbs)}g</Text>
              <Text style={styles.macroTarget}>/ {carbsTarget}g</Text>
            </View>
            {/* Fat */}
            <View style={styles.macroItem}>
              <View style={[styles.macroDot, { backgroundColor: '#EAB308' }]} />
              <Text style={styles.macroLabel}>Fat</Text>
              <Text style={styles.macroValue}>{Math.round(daily.totalFat)}g</Text>
              <Text style={styles.macroTarget}>/ {fatTarget}g</Text>
            </View>
          </View>
        </View>

        {/* Meal Type Selector */}
        <View style={styles.mealSelector}>
          {mealTypes.map((mt) => (
            <TouchableOpacity
              key={mt.key}
              style={[styles.mealChip, selectedMeal === mt.key && styles.mealChipActive]}
              onPress={() => setSelectedMeal(mt.key)}
            >
              <Text style={styles.mealChipEmoji}>{mt.icon}</Text>
              <Text style={[styles.mealChipLabel, selectedMeal === mt.key && styles.mealChipLabelActive]}>
                {mt.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Food Search */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={COLORS.textDim} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder='Search food... "dal", "paratha", "paneer"'
            placeholderTextColor={COLORS.textDim}
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <View style={styles.resultsCard}>
            {searchResults.map((food) => (
              <TouchableOpacity
                key={food.id}
                style={styles.resultItem}
                onPress={() => handleAddFood(food)}
              >
                <View style={styles.resultInfo}>
                  <Text style={styles.resultName}>{food.name}</Text>
                  <Text style={styles.resultServing}>{food.serving}</Text>
                </View>
                <View style={styles.resultMacros}>
                  <Text style={styles.resultCalories}>{food.calories} kcal</Text>
                  <Text style={styles.resultProtein}>{food.protein_g}g protein</Text>
                </View>
                <Ionicons name="add-circle" size={24} color={COLORS.primary} />
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Today's Food Log */}
        {daily.foodLogs.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Today's Log</Text>
            {daily.foodLogs.map((log) => (
              <View key={log.id} style={styles.foodLogItem}>
                <View style={styles.foodLogInfo}>
                  <Text style={styles.foodLogMeal}>
                    {log.meal_type.charAt(0).toUpperCase() + log.meal_type.slice(1)}
                  </Text>
                  <Text style={styles.foodLogName}>{log.food_name}</Text>
                  <Text style={styles.foodLogQuantity}>{log.quantity}</Text>
                </View>
                <View style={styles.foodLogMacros}>
                  <Text style={styles.foodLogCalories}>{log.calories} kcal</Text>
                  <Text style={styles.foodLogProtein}>{log.protein_g}g P</Text>
                </View>
                <TouchableOpacity onPress={() => daily.removeFoodLog(log.id)}>
                  <Ionicons name="close-circle-outline" size={22} color={COLORS.danger} />
                </TouchableOpacity>
              </View>
            ))}
          </>
        )}

        {/* Protein Suggestions */}
        {proteinRemaining > 15 && (
          <>
            <View style={styles.suggestionHeader}>
              <Text style={styles.sectionTitle}>💡 What to eat next?</Text>
              <Text style={styles.suggestionSubtitle}>{Math.round(proteinRemaining)}g protein remaining</Text>
            </View>
            {proteinSuggestions.map((food) => (
              <TouchableOpacity
                key={food.id}
                style={styles.suggestionItem}
                onPress={() => handleAddFood(food)}
              >
                <View style={styles.suggestionInfo}>
                  <Text style={styles.suggestionName}>{food.name}</Text>
                  <Text style={styles.suggestionServing}>{food.serving}</Text>
                </View>
                <View style={styles.suggestionMacros}>
                  <Text style={styles.suggestionProtein}>{food.protein_g}g protein</Text>
                  <Text style={styles.suggestionCalories}>{food.calories} kcal</Text>
                </View>
              </TouchableOpacity>
            ))}
          </>
        )}

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

  // Macro Overview
  macroCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  macroRing: { alignItems: 'center', marginBottom: 20 },
  macroRingValue: { fontSize: 36, fontFamily: 'Inter_700Bold', color: COLORS.text },
  macroRingLabel: { fontSize: 14, fontFamily: 'Inter_400Regular', color: COLORS.textMuted },
  macroGrid: { flexDirection: 'row', justifyContent: 'space-around' },
  macroItem: { alignItems: 'center' },
  macroDot: { width: 8, height: 8, borderRadius: 4, marginBottom: 6 },
  macroLabel: { fontSize: 12, fontFamily: 'Inter_500Medium', color: COLORS.textMuted, marginBottom: 4 },
  macroValue: { fontSize: 18, fontFamily: 'Inter_700Bold', color: COLORS.text },
  macroTarget: { fontSize: 12, fontFamily: 'Inter_400Regular', color: COLORS.textDim },

  // Meal Selector
  mealSelector: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  mealChip: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.card,
    paddingVertical: 10,
    borderRadius: 10,
    gap: 4,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  mealChipActive: { borderColor: COLORS.primary, backgroundColor: COLORS.primaryMuted },
  mealChipEmoji: { fontSize: 14 },
  mealChipLabel: { fontSize: 11, fontFamily: 'Inter_500Medium', color: COLORS.textMuted },
  mealChipLabelActive: { color: COLORS.primary },

  // Search
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 12,
    paddingHorizontal: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  searchIcon: { marginRight: 10 },
  searchInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 15,
    fontFamily: 'Inter_400Regular',
    color: COLORS.text,
  },

  // Results
  resultsCard: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    overflow: 'hidden',
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.cardBorder,
    gap: 10,
  },
  resultInfo: { flex: 1 },
  resultName: { fontSize: 15, fontFamily: 'Inter_500Medium', color: COLORS.text },
  resultServing: { fontSize: 12, fontFamily: 'Inter_400Regular', color: COLORS.textDim, marginTop: 2 },
  resultMacros: { alignItems: 'flex-end' },
  resultCalories: { fontSize: 14, fontFamily: 'Inter_600SemiBold', color: COLORS.text },
  resultProtein: { fontSize: 12, fontFamily: 'Inter_400Regular', color: COLORS.accent },

  // Food Log
  sectionTitle: { fontSize: 18, fontFamily: 'Inter_600SemiBold', color: COLORS.text, marginBottom: 12, marginTop: 8 },
  foodLogItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    gap: 10,
  },
  foodLogInfo: { flex: 1 },
  foodLogMeal: { fontSize: 11, fontFamily: 'Inter_600SemiBold', color: COLORS.primary, textTransform: 'uppercase' },
  foodLogName: { fontSize: 15, fontFamily: 'Inter_500Medium', color: COLORS.text, marginTop: 2 },
  foodLogQuantity: { fontSize: 12, fontFamily: 'Inter_400Regular', color: COLORS.textDim },
  foodLogMacros: { alignItems: 'flex-end' },
  foodLogCalories: { fontSize: 14, fontFamily: 'Inter_600SemiBold', color: COLORS.text },
  foodLogProtein: { fontSize: 12, fontFamily: 'Inter_500Medium', color: COLORS.accent },

  // Suggestions
  suggestionHeader: { marginTop: 8 },
  suggestionSubtitle: { fontSize: 13, fontFamily: 'Inter_400Regular', color: COLORS.accent, marginBottom: 12, marginTop: -4 },
  suggestionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: COLORS.accentMuted,
  },
  suggestionInfo: { flex: 1 },
  suggestionName: { fontSize: 15, fontFamily: 'Inter_500Medium', color: COLORS.text },
  suggestionServing: { fontSize: 12, fontFamily: 'Inter_400Regular', color: COLORS.textDim, marginTop: 2 },
  suggestionMacros: { alignItems: 'flex-end' },
  suggestionProtein: { fontSize: 14, fontFamily: 'Inter_600SemiBold', color: COLORS.accent },
  suggestionCalories: { fontSize: 12, fontFamily: 'Inter_400Regular', color: COLORS.textMuted },
});
