import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { COLORS, SCHEDULE_TYPES } from '@/lib/constants';
import { useOnboardingStore } from '@/stores/onboardingStore';
import type { ScheduleType } from '@/lib/types';

export default function ScheduleScreen() {
  const router = useRouter();
  const { data, updateData } = useOnboardingStore();
  const [selectedSchedule, setSelectedSchedule] = useState<ScheduleType>(data.schedule_type);
  const [sleepTime, setSleepTime] = useState(data.sleep_time);
  const [wakeTime, setWakeTime] = useState(data.wake_time);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleNext = () => {
    const nextErrors: { [key: string]: string } = {};

    // Validate simple time formats (HH:MM)
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(sleepTime)) {
      nextErrors.sleepTime = 'Use HH:MM format (24h)';
    }
    if (!timeRegex.test(wakeTime)) {
      nextErrors.wakeTime = 'Use HH:MM format (24h)';
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    updateData({
      schedule_type: selectedSchedule,
      sleep_time: sleepTime,
      wake_time: wakeTime,
    });
    router.push('/(onboarding)/generating' as never);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Daily Schedule</Text>
        <Text style={styles.stepIndicator}>6 of 6</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Schedule Profile */}
        <Text style={styles.title}>Your Primary Activity</Text>
        <Text style={styles.subtitle}>Select the profile that fits your daily routine.</Text>

        <View style={styles.scheduleGrid}>
          {SCHEDULE_TYPES.map((type) => {
            const isSelected = selectedSchedule === type.id;
            return (
              <TouchableOpacity
                key={type.id}
                style={[styles.card, isSelected ? styles.cardSelected : null]}
                onPress={() => setSelectedSchedule(type.id as ScheduleType)}
                activeOpacity={0.7}
              >
                <Text style={styles.cardIcon}>{type.icon}</Text>
                <Text style={[styles.cardLabel, isSelected ? styles.cardLabelSelected : null]}>
                  {type.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Sleep/Wake times */}
        <Text style={[styles.title, { marginTop: 32 }]}>Sleep Schedule</Text>
        <Text style={styles.subtitle}>Let us know when you sleep and wake up (24h format HH:MM).</Text>

        <View style={styles.timeInputsRow}>
          <View style={styles.timeInputGroup}>
            <Text style={styles.timeLabel}>Sleep Time (e.g. 23:00)</Text>
            <TextInput
              style={[styles.input, errors.sleepTime ? styles.inputError : null]}
              value={sleepTime}
              onChangeText={(text) => {
                setSleepTime(text);
                setErrors((prev) => ({ ...prev, sleepTime: '' }));
              }}
              placeholder="23:00"
              placeholderTextColor={COLORS.textDim}
              maxLength={5}
            />
            {errors.sleepTime ? <Text style={styles.errorText}>{errors.sleepTime}</Text> : null}
          </View>

          <View style={styles.timeInputGroup}>
            <Text style={styles.timeLabel}>Wake Time (e.g. 07:00)</Text>
            <TextInput
              style={[styles.input, errors.wakeTime ? styles.inputError : null]}
              value={wakeTime}
              onChangeText={(text) => {
                setWakeTime(text);
                setErrors((prev) => ({ ...prev, wakeTime: '' }));
              }}
              placeholder="07:00"
              placeholderTextColor={COLORS.textDim}
              maxLength={5}
            />
            {errors.wakeTime ? <Text style={styles.errorText}>{errors.wakeTime}</Text> : null}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext} activeOpacity={0.8}>
          <Text style={styles.nextButtonText}>Generate My Plan</Text>
          <Ionicons name="sparkles" size={18} color="#000" />
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
  scheduleGrid: {
    gap: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    gap: 16,
  },
  cardSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryMuted,
  },
  cardIcon: {
    fontSize: 22,
  },
  cardLabel: {
    fontSize: 15,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.textMuted,
  },
  cardLabelSelected: {
    color: COLORS.text,
  },
  timeInputsRow: {
    flexDirection: 'row',
    gap: 16,
  },
  timeInputGroup: {
    flex: 1,
    gap: 6,
  },
  timeLabel: {
    fontSize: 13,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.textSecondary,
  },
  input: {
    height: 52,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: 12,
    paddingHorizontal: 16,
    color: COLORS.text,
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
  },
  inputError: {
    borderColor: COLORS.danger,
  },
  errorText: {
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
    color: COLORS.danger,
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
