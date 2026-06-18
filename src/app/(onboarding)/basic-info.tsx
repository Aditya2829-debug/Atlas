import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { COLORS } from '@/lib/constants';
import { useOnboardingStore } from '@/stores/onboardingStore';
import type { Gender } from '@/lib/types';

export default function BasicInfoScreen() {
  const router = useRouter();
  const { data, updateData } = useOnboardingStore();

  const [name, setName] = useState(data.name);
  const [age, setAge] = useState(data.age.toString());
  const [gender, setGender] = useState<Gender>(data.gender);
  const [height, setHeight] = useState(data.height_cm.toString());
  const [weight, setWeight] = useState(data.weight_kg.toString());
  const [targetWeight, setTargetWeight] = useState(data.target_weight_kg.toString());
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleNext = () => {
    const nextErrors: { [key: string]: string } = {};

    if (!name.trim()) nextErrors.name = 'Name is required';
    
    const ageNum = parseInt(age, 10);
    if (isNaN(ageNum) || ageNum < 10 || ageNum > 100) {
      nextErrors.age = 'Enter a valid age (10-100)';
    }

    const heightNum = parseFloat(height);
    if (isNaN(heightNum) || heightNum < 100 || heightNum > 250) {
      nextErrors.height = 'Enter a valid height in cm';
    }

    const weightNum = parseFloat(weight);
    if (isNaN(weightNum) || weightNum < 30 || weightNum > 250) {
      nextErrors.weight = 'Enter a valid weight in kg';
    }

    const targetNum = parseFloat(targetWeight);
    if (isNaN(targetNum) || targetNum < 30 || targetNum > 250) {
      nextErrors.targetWeight = 'Enter a valid target weight in kg';
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    // Update store
    updateData({
      name: name.trim(),
      age: ageNum,
      gender,
      height_cm: heightNum,
      weight_kg: weightNum,
      target_weight_kg: targetNum,
    });

    router.push('/(onboarding)/goals' as never);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color={COLORS.text} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Basic Info</Text>
            <Text style={styles.stepIndicator}>1 of 6</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Name Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>What should we call you?</Text>
              <TextInput
                style={[styles.input, errors.name ? styles.inputError : null]}
                placeholder="Your name"
                placeholderTextColor={COLORS.textDim}
                value={name}
                onChangeText={(text) => {
                  setName(text);
                  setErrors((prev) => ({ ...prev, name: '' }));
                }}
              />
              {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
            </View>

            {/* Gender Selection */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Select Gender</Text>
              <View style={styles.genderContainer}>
                {(['male', 'female', 'other'] as Gender[]).map((g) => (
                  <TouchableOpacity
                    key={g}
                    style={[
                      styles.genderButton,
                      gender === g ? styles.genderButtonSelected : null,
                    ]}
                    onPress={() => setGender(g)}
                  >
                    <Text
                      style={[
                        styles.genderButtonText,
                        gender === g ? styles.genderButtonTextSelected : null,
                      ]}
                    >
                      {g.toUpperCase()}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Age Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Age (years)</Text>
              <TextInput
                style={[styles.input, errors.age ? styles.inputError : null]}
                placeholder="e.g. 20"
                placeholderTextColor={COLORS.textDim}
                keyboardType="number-pad"
                value={age}
                onChangeText={(text) => {
                  setAge(text);
                  setErrors((prev) => ({ ...prev, age: '' }));
                }}
              />
              {errors.age ? <Text style={styles.errorText}>{errors.age}</Text> : null}
            </View>

            {/* Height Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Height (cm)</Text>
              <TextInput
                style={[styles.input, errors.height ? styles.inputError : null]}
                placeholder="e.g. 175"
                placeholderTextColor={COLORS.textDim}
                keyboardType="numeric"
                value={height}
                onChangeText={(text) => {
                  setHeight(text);
                  setErrors((prev) => ({ ...prev, height: '' }));
                }}
              />
              {errors.height ? <Text style={styles.errorText}>{errors.height}</Text> : null}
            </View>

            {/* Weight Row */}
            <View style={styles.row}>
              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text style={styles.label}>Weight (kg)</Text>
                <TextInput
                  style={[styles.input, errors.weight ? styles.inputError : null]}
                  placeholder="e.g. 52"
                  placeholderTextColor={COLORS.textDim}
                  keyboardType="numeric"
                  value={weight}
                  onChangeText={(text) => {
                    setWeight(text);
                    setErrors((prev) => ({ ...prev, weight: '' }));
                  }}
                />
                {errors.weight ? <Text style={styles.errorText}>{errors.weight}</Text> : null}
              </View>

              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text style={styles.label}>Target Weight (kg)</Text>
                <TextInput
                  style={[styles.input, errors.targetWeight ? styles.inputError : null]}
                  placeholder="e.g. 62"
                  placeholderTextColor={COLORS.textDim}
                  keyboardType="numeric"
                  value={targetWeight}
                  onChangeText={(text) => {
                    setTargetWeight(text);
                    setErrors((prev) => ({ ...prev, targetWeight: '' }));
                  }}
                />
                {errors.targetWeight ? <Text style={styles.errorText}>{errors.targetWeight}</Text> : null}
              </View>
            </View>
          </View>

          {/* Action Button */}
          <TouchableOpacity style={styles.nextButton} onPress={handleNext} activeOpacity={0.8}>
            <Text style={styles.nextButtonText}>Next Step</Text>
            <Ionicons name="arrow-forward" size={18} color="#000" />
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 32,
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
  form: {
    gap: 24,
    marginBottom: 40,
  },
  inputGroup: {
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    gap: 16,
  },
  label: {
    fontSize: 15,
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
  },
  inputError: {
    borderColor: COLORS.danger,
  },
  errorText: {
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
    color: COLORS.danger,
    marginTop: 2,
  },
  genderContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  genderButton: {
    flex: 1,
    height: 50,
    backgroundColor: COLORS.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    justifyContent: 'center',
    alignItems: 'center',
  },
  genderButtonSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryMuted,
  },
  genderButtonText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.textMuted,
  },
  genderButtonTextSelected: {
    color: COLORS.primary,
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
