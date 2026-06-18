/**
 * Project Ascend — Calisthenics Skill Tree
 */

import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/lib/constants';
import { getAllSkillTrees, skillCategoryMeta } from '@/data/calisthenics-skills';
import type { SkillCategory, CalisthenicsSkill } from '@/lib/types';

// Simulated user progress (will come from store later)
const userProgress: Record<string, number> = {
  push: 3, // Unlocked up to Push-up (level 3)
  pull: 1, // Unlocked up to Australian Pull-up
  core: 2, // Unlocked up to Side Plank
  balance: 0, // Only Bear Crawl
};

function SkillNode({ skill, isUnlocked, isCurrent, isLast }: {
  skill: CalisthenicsSkill;
  isUnlocked: boolean;
  isCurrent: boolean;
  isLast: boolean;
}) {
  return (
    <View style={styles.nodeContainer}>
      <View style={styles.nodeRow}>
        {/* Connection line */}
        {!isLast && (
          <View style={[
            styles.connectionLine,
            { backgroundColor: isUnlocked ? COLORS.primary : COLORS.cardBorder },
          ]} />
        )}
        
        {/* Node circle */}
        <View style={[
          styles.nodeCircle,
          isUnlocked && styles.nodeUnlocked,
          isCurrent && styles.nodeCurrent,
        ]}>
          {isUnlocked ? (
            <Ionicons name="checkmark" size={16} color="#000" />
          ) : isCurrent ? (
            <Ionicons name="flash" size={16} color={COLORS.accent} />
          ) : (
            <Ionicons name="lock-closed" size={14} color={COLORS.textDim} />
          )}
        </View>

        {/* Skill info */}
        <View style={styles.nodeInfo}>
          <Text style={[
            styles.nodeName,
            !isUnlocked && !isCurrent && styles.nodeNameLocked,
          ]}>
            {skill.name}
          </Text>
          <Text style={styles.nodeUnlockCriteria}>
            {isUnlocked ? '✅ Unlocked' : skill.unlock_criteria}
          </Text>
        </View>
      </View>
    </View>
  );
}

function SkillBranch({ category }: { category: SkillCategory }) {
  const meta = skillCategoryMeta[category];
  const skills = getAllSkillTrees()[category];
  const currentLevel = userProgress[category] || 0;

  return (
    <View style={styles.branchCard}>
      <View style={styles.branchHeader}>
        <Text style={styles.branchEmoji}>{meta.emoji}</Text>
        <View>
          <Text style={styles.branchTitle}>{meta.label}</Text>
          <Text style={styles.branchProgress}>
            Level {currentLevel + 1} / {skills.length}
          </Text>
        </View>
        <View style={[styles.branchLevelBadge, { backgroundColor: meta.color + '25' }]}>
          <Text style={[styles.branchLevelText, { color: meta.color }]}>
            {Math.round(((currentLevel + 1) / skills.length) * 100)}%
          </Text>
        </View>
      </View>

      <View style={styles.skillTree}>
        {skills.map((skill, index) => (
          <SkillNode
            key={skill.id}
            skill={skill}
            isUnlocked={index <= currentLevel}
            isCurrent={index === currentLevel + 1}
            isLast={index === skills.length - 1}
          />
        ))}
      </View>
    </View>
  );
}

export default function CalisthenicsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Calisthenics</Text>
          <Text style={styles.subtitle}>Master bodyweight skills</Text>
        </View>

        {/* Overview Stats */}
        <View style={styles.overviewRow}>
          {(Object.entries(skillCategoryMeta) as [SkillCategory, typeof skillCategoryMeta.push][]).map(([key, meta]) => (
            <View key={key} style={styles.overviewCard}>
              <Text style={styles.overviewEmoji}>{meta.emoji}</Text>
              <Text style={styles.overviewLabel}>{meta.label}</Text>
              <Text style={[styles.overviewLevel, { color: meta.color }]}>
                Lv.{(userProgress[key] || 0) + 1}
              </Text>
            </View>
          ))}
        </View>

        {/* Skill Trees */}
        <SkillBranch category="push" />
        <SkillBranch category="pull" />
        <SkillBranch category="core" />
        <SkillBranch category="balance" />

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

  // Overview
  overviewRow: { flexDirection: 'row', gap: 10, marginBottom: 24 },
  overviewCard: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  overviewEmoji: { fontSize: 24, marginBottom: 6 },
  overviewLabel: { fontSize: 12, fontFamily: 'Inter_500Medium', color: COLORS.textMuted, marginBottom: 4 },
  overviewLevel: { fontSize: 16, fontFamily: 'Inter_700Bold' },

  // Branch
  branchCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  branchHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 20 },
  branchEmoji: { fontSize: 32 },
  branchTitle: { fontSize: 20, fontFamily: 'Inter_700Bold', color: COLORS.text },
  branchProgress: { fontSize: 13, fontFamily: 'Inter_400Regular', color: COLORS.textMuted, marginTop: 2 },
  branchLevelBadge: {
    marginLeft: 'auto',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  branchLevelText: { fontSize: 13, fontFamily: 'Inter_600SemiBold' },

  // Skill Tree
  skillTree: { paddingLeft: 4 },
  nodeContainer: { marginBottom: 4 },
  nodeRow: { flexDirection: 'row', alignItems: 'center', gap: 14, position: 'relative' },
  connectionLine: {
    position: 'absolute',
    left: 14,
    top: 30,
    width: 2,
    height: 36,
  },
  nodeCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.cardBorder,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.cardBorder,
  },
  nodeUnlocked: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  nodeCurrent: {
    backgroundColor: COLORS.accentMuted,
    borderColor: COLORS.accent,
  },
  nodeInfo: { flex: 1, paddingVertical: 8 },
  nodeName: { fontSize: 15, fontFamily: 'Inter_500Medium', color: COLORS.text },
  nodeNameLocked: { color: COLORS.textDim },
  nodeUnlockCriteria: { fontSize: 12, fontFamily: 'Inter_400Regular', color: COLORS.textDim, marginTop: 2 },
});
