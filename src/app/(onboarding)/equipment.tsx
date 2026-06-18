import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { COLORS, EQUIPMENT_OPTIONS } from '@/lib/constants';
import { useOnboardingStore } from '@/stores/onboardingStore';
import type { Equipment } from '@/lib/types';

export default function EquipmentScreen() {
  const router = useRouter();
  const { data, updateData } = useOnboardingStore();
  const [selectedEq, setSelectedEq] = useState<Equipment[]>(data.equipment);

  const toggleEquipment = (eqId: Equipment) => {
    if (eqId === 'none') {
      setSelectedEq(['none']);
      return;
    }

    setSelectedEq((prev) => {
      const filtered = prev.filter((id) => id !== 'none');
      if (filtered.includes(eqId)) {
        return filtered.filter((id) => id !== eqId);
      } else {
        return [...filtered, eqId];
      }
    });
  };

  const handleNext = () => {
    updateData({ equipment: selectedEq.length === 0 ? ['none'] : selectedEq });
    router.push('/(onboarding)/diet' as never);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Equipment</Text>
        <Text style={styles.stepIndicator}>4 of 6</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>What do you have access to?</Text>
        <Text style={styles.subtitle}>
          Select all that apply. Remember, you have 5kg dumbbells? Select Dumbbells!
        </Text>

        <View style={styles.grid}>
          {EQUIPMENT_OPTIONS.map((eq) => {
            const isSelected = selectedEq.includes(eq.id as Equipment);
            return (
              <TouchableOpacity
                key={eq.id}
                style={[styles.card, isSelected ? styles.cardSelected : null]}
                onPress={() => toggleEquipment(eq.id as Equipment)}
                activeOpacity={0.7}
              >
                <View style={styles.cardLeft}>
                  <Text style={styles.cardIcon}>{eq.icon}</Text>
                  <Text style={styles.cardLabel}>{eq.label}</Text>
                </View>
                {isSelected ? (
                  <Ionicons name="checkbox" size={22} color={COLORS.primary} />
                ) : (
                  <Ionicons name="square-outline" size={22} color={COLORS.textDim} />
                )}
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
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textMuted,
    lineHeight: 20,
    marginBottom: 24,
  },
  grid: {
    gap: 12,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryMuted,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  cardIcon: {
    fontSize: 24,
  },
  cardLabel: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.text,
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
