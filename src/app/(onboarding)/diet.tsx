import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { COLORS, DIET_TYPES, BUDGET_OPTIONS } from '@/lib/constants';
import { useOnboardingStore } from '@/stores/onboardingStore';
import type { DietType, Budget } from '@/lib/types';

export default function DietScreen() {
  const router = useRouter();
  const { data, updateData } = useOnboardingStore();
  const [selectedDiet, setSelectedDiet] = useState<DietType>(data.diet_type);
  const [selectedBudget, setSelectedBudget] = useState<Budget>(data.budget);

  const handleNext = () => {
    updateData({ diet_type: selectedDiet, budget: selectedBudget });
    router.push('/(onboarding)/schedule' as never);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Diet & Budget</Text>
        <Text style={styles.stepIndicator}>5 of 6</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Diet Selection */}
        <Text style={styles.title}>Diet Preference</Text>
        <Text style={styles.subtitle}>Choose your food style to receive relevant meal suggestion macros.</Text>

        <View style={styles.section}>
          {DIET_TYPES.map((diet) => {
            const isSelected = selectedDiet === diet.id;
            return (
              <TouchableOpacity
                key={diet.id}
                style={[styles.card, isSelected ? styles.cardSelected : null]}
                onPress={() => setSelectedDiet(diet.id as DietType)}
                activeOpacity={0.7}
              >
                <View style={styles.cardHeader}>
                  <Text style={styles.cardIcon}>{diet.icon}</Text>
                  {isSelected && <Ionicons name="checkmark-circle" size={20} color={COLORS.primary} />}
                </View>
                <Text style={styles.cardLabel}>{diet.label}</Text>
                <Text style={styles.cardDesc}>{diet.description}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Budget Selection */}
        <Text style={[styles.title, { marginTop: 24 }]}>Monthly Food Budget</Text>
        <Text style={styles.subtitle}>We'll prioritize cost-effective high-protein recommendations.</Text>

        <View style={styles.section}>
          {BUDGET_OPTIONS.map((budget) => {
            const isSelected = selectedBudget === budget.id;
            return (
              <TouchableOpacity
                key={budget.id}
                style={[styles.card, isSelected ? styles.cardSelected : null]}
                onPress={() => setSelectedBudget(budget.id as Budget)}
                activeOpacity={0.7}
              >
                <View style={styles.cardHeader}>
                  <Text style={styles.cardIcon}>{budget.icon}</Text>
                  {isSelected && <Ionicons name="checkmark-circle" size={20} color={COLORS.primary} />}
                </View>
                <Text style={styles.cardLabel}>{budget.label}</Text>
                <Text style={styles.cardDesc}>{budget.description}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext} activeOpacity={0.8}>
          <Text style={styles.nextButtonText}>Next Step</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.card,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
    color: COLORS.text,
  },
  stepIndicator: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.primary,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 100,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Inter_700Bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textMuted,
    lineHeight: 18,
    marginBottom: 16,
  },
  section: {
    gap: 12,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  cardSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryMuted,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  cardIcon: {
    fontSize: 24,
  },
  cardLabel: {
    fontSize: 15,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.text,
    marginBottom: 2,
  },
  cardDesc: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textMuted,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.background,
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.cardBorder,
  },
  nextButton: {
    flexDirection: 'row',
    width: '100%',
    height: 56,
    backgroundColor: COLORS.primary,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  nextButtonText: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    color: '#000',
  },
});
