/**
 * Project Ascend — AI Coach Chat
 */

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { COLORS } from '@/lib/constants';
import { useProfileStore } from '@/stores/profileStore';
import { useDailyStore } from '@/stores/dailyStore';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const quickActions = [
  '💪 Can I skip today\'s workout?',
  '🍽️ What should I eat next?',
  '⏱️ I only have 20 minutes',
  '🔥 Motivate me',
  '🥛 Best cheap protein?',
  '😴 I didn\'t sleep well',
];

export default function AIChatScreen() {
  const profile = useProfileStore((s) => s.profile);
  const daily = useDailyStore();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Hey ${profile?.name || 'bhai'}! 👋\n\nI'm your ASCEND AI coach. I know your stats, your goals, and your progress.\n\n📊 Quick status:\n• Calories: ${daily.totalCalories}/${profile?.daily_calories_target} kcal\n• Protein: ${Math.round(daily.totalProtein)}/${profile?.daily_protein_target}g\n• Water: ${(daily.waterIntakeMl / 1000).toFixed(1)}L\n• Workout: ${daily.workoutDone ? '✅ Done' : '❌ Pending'}\n• Streak: ${daily.currentStreak} days 🔥\n\nKya help chahiye? Ask me anything about workout, nutrition, or just talk.`,
      timestamp: new Date(),
    },
  ]);
  const scrollRef = useRef<ScrollView>(null);

  const handleSend = (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: messageText,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    // Simulate AI response (will be replaced with OpenRouter later)
    setTimeout(() => {
      let response = '';
      const lowerText = messageText.toLowerCase();

      if (lowerText.includes('skip') || lowerText.includes('rest')) {
        response = `Bhai, consistency > intensity. But if you're genuinely tired, here's what I suggest:\n\n✅ Do a lighter version — 15 min instead of 35\n✅ Just do bodyweight squats + pushups + plank\n✅ Even 10 minutes counts toward your streak\n\nSkipping is okay once a week. But don't make it a habit. You've got ${daily.currentStreak} days going — don't break it! 💪`;
      } else if (lowerText.includes('eat') || lowerText.includes('food') || lowerText.includes('protein')) {
        const remaining = Math.max(0, (profile?.daily_protein_target || 94) - daily.totalProtein);
        response = `You need ${Math.round(remaining)}g more protein today. Budget-friendly options:\n\n🫘 Soya chunks (50g dry) = 26g protein — ₹15\n🥚 4 boiled eggs = 25g protein — ₹24\n🥛 500ml milk = 16g protein — ₹25\n🥜 Peanut butter toast = 8g protein — ₹10\n\nCheapest combo: Soya chunks curry + 2 roti = ~30g protein for under ₹20. ${profile?.diet_type === 'vegetarian' ? 'Since you\'re veg, soya chunks are your best friend!' : ''}`;
      } else if (lowerText.includes('motivat') || lowerText.includes('discipline')) {
        response = `Listen ${profile?.name || 'bhai'}, you're ${profile?.weight_kg}kg right now.\n\nYou want to be ${profile?.target_weight_kg}kg.\n\nThat's only ${(profile?.target_weight_kg || 62) - (profile?.weight_kg || 52)}kg away.\n\nAt 0.3kg/week, that's about ${Math.ceil(((profile?.target_weight_kg || 62) - (profile?.weight_kg || 52)) / 0.35)} weeks.\n\n🗓️ That means by next year, people won't even recognize you.\n\nBut ONLY if you show up today. And tomorrow. And the day after.\n\nNo shortcut exists. But the math is simple:\n• Eat ${profile?.daily_calories_target || 2800} calories\n• Hit ${profile?.daily_protein_target || 94}g protein\n• Train 5 days/week\n• Sleep 7-8 hours\n\nDo this for 6 months. You WILL transform. I promise. 💪🔥`;
      } else if (lowerText.includes('20 min') || lowerText.includes('short') || lowerText.includes('quick')) {
        response = `20 minute express workout 🚀:\n\n1. Pushups × 3 sets of 12 (3 min)\n2. Goblet Squats × 3 sets of 12 (3 min)\n3. DB Rows × 3 sets of 10 (3 min)\n4. Plank × 3 sets of 30 sec (2 min)\n5. Shoulder Press × 3 sets of 10 (3 min)\n6. Mountain Climbers × 3 sets of 15 (3 min)\n\nRest 30 seconds between sets. Done in exactly 20 minutes. No excuses! 💪`;
      } else if (lowerText.includes('sleep')) {
        response = `Bad sleep = bad recovery = slow gains.\n\nHere's your sleep protocol:\n\n📵 No phone after 10 PM\n🛌 In bed by ${profile?.sleep_time || '11:00'}\n📖 Read a book instead of scrolling\n🌡️ Keep room cool\n💧 No water 1 hour before bed\n☕ No chai/coffee after 4 PM\n\nSleep is when your muscles actually grow. Treat it like a workout — non-negotiable.`;
      } else {
        response = `Great question! Right now I'm in demo mode — once connected to AI (OpenRouter), I'll give you personalized answers based on your exact stats and progress.\n\nFor now, try the quick actions below or ask about:\n• Workout modifications\n• Nutrition advice\n• Motivation\n• Quick routines`;
      }

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 800);
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: '🤖 AI Coach',
          headerStyle: { backgroundColor: COLORS.background },
          headerTintColor: COLORS.text,
          headerTitleStyle: { fontFamily: 'Inter_600SemiBold', fontSize: 17 },
        }}
      />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={90}
      >
        <ScrollView
          ref={scrollRef}
          style={styles.messageList}
          contentContainerStyle={styles.messageContent}
          onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((msg) => (
            <View
              key={msg.id}
              style={[
                styles.messageBubble,
                msg.role === 'user' ? styles.userBubble : styles.aiBubble,
              ]}
            >
              <Text style={[
                styles.messageText,
                msg.role === 'user' && styles.userMessageText,
              ]}>
                {msg.content}
              </Text>
            </View>
          ))}

          {/* Quick Actions */}
          {messages.length <= 2 && (
            <View style={styles.quickActions}>
              {quickActions.map((action) => (
                <TouchableOpacity
                  key={action}
                  style={styles.quickActionChip}
                  onPress={() => handleSend(action)}
                >
                  <Text style={styles.quickActionText}>{action}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </ScrollView>

        {/* Input Bar */}
        <View style={styles.inputBar}>
          <TextInput
            style={styles.textInput}
            placeholder="Ask anything..."
            placeholderTextColor={COLORS.textDim}
            value={input}
            onChangeText={setInput}
            onSubmitEditing={() => handleSend()}
            multiline
          />
          <TouchableOpacity
            style={[styles.sendButton, !input.trim() && styles.sendButtonDisabled]}
            onPress={() => handleSend()}
            disabled={!input.trim()}
          >
            <Ionicons name="send" size={20} color={input.trim() ? '#000' : COLORS.textDim} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  messageList: { flex: 1 },
  messageContent: { padding: 16, paddingBottom: 8 },

  messageBubble: {
    maxWidth: '85%',
    padding: 14,
    borderRadius: 16,
    marginBottom: 10,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: COLORS.primary,
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.card,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  messageText: {
    fontSize: 15,
    fontFamily: 'Inter_400Regular',
    color: COLORS.text,
    lineHeight: 22,
  },
  userMessageText: { color: '#000' },

  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
    marginBottom: 8,
  },
  quickActionChip: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  quickActionText: {
    fontSize: 13,
    fontFamily: 'Inter_500Medium',
    color: COLORS.textSecondary,
  },

  inputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 12,
    paddingBottom: Platform.OS === 'ios' ? 28 : 12,
    backgroundColor: COLORS.card,
    borderTopWidth: 1,
    borderTopColor: COLORS.cardBorder,
    gap: 10,
  },
  textInput: {
    flex: 1,
    minHeight: 44,
    maxHeight: 100,
    backgroundColor: COLORS.background,
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    fontFamily: 'Inter_400Regular',
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: COLORS.cardBorder,
  },
});
