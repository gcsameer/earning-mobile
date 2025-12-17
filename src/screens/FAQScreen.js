import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const faqData = [
  {
    question: 'How do I earn coins?',
    answer: 'You can earn coins by completing tasks, playing games (scratch cards, spin wheel, puzzles, quizzes), watching ads, completing offers, and referring friends.',
  },
  {
    question: 'How do I withdraw my earnings?',
    answer: 'Go to the Withdraw section, enter the amount you want to withdraw, select your payment method (eSewa, Khalti, or Bank), and submit your request. Withdrawals are processed within 24-48 hours.',
  },
  {
    question: 'What is the minimum withdrawal amount?',
    answer: 'The minimum withdrawal amount is Rs. 50. Check the current coin-to-rupee rate in your Wallet section.',
  },
  {
    question: 'How does the referral program work?',
    answer: 'Share your referral code with friends. When they sign up using your code, you both get bonus coins - you get 50 coins, they get 20 coins.',
  },
  {
    question: 'Can I play games multiple times?',
    answer: 'Yes! You can play each game task (scratch card, spin wheel, puzzle, quiz) up to 3 times per day. Regular tasks have different limits.',
  },
  {
    question: 'What are daily bonuses?',
    answer: 'Daily bonuses are rewards you can claim once per day. The amount increases with your login streak!',
  },
  {
    question: 'How do I increase my login streak?',
    answer: 'Simply log in to the app every day. Your streak increases with consecutive daily logins, and you get bonus coins for maintaining your streak.',
  },
  {
    question: 'Are there any fees?',
    answer: 'No! NepEarn is completely free to use. There are no hidden fees or charges.',
  },
  {
    question: 'Is my data safe?',
    answer: 'Yes! We use industry-standard security measures to protect your data. Please read our Privacy Policy for more details.',
  },
  {
    question: 'Can I use the app on multiple devices?',
    answer: 'Yes, you can log in from multiple devices using the same account. However, some tasks may have device-specific limits.',
  },
];

export default function FAQScreen() {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleFAQ = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerIcon}>❓</Text>
          <Text style={styles.headerTitle}>Frequently Asked Questions</Text>
          <Text style={styles.headerSubtitle}>
            Find answers to common questions
          </Text>
        </View>

        {faqData.map((faq, index) => (
          <View key={index} style={styles.faqCard}>
            <TouchableOpacity
              style={styles.faqQuestion}
              onPress={() => toggleFAQ(index)}
            >
              <Text style={styles.faqQuestionText}>{faq.question}</Text>
              <Text style={styles.expandIcon}>
                {expandedIndex === index ? '−' : '+'}
              </Text>
            </TouchableOpacity>
            {expandedIndex === index && (
              <View style={styles.faqAnswer}>
                <Text style={styles.faqAnswerText}>{faq.answer}</Text>
              </View>
            )}
          </View>
        ))}

        <View style={styles.helpCard}>
          <Text style={styles.helpTitle}>Still need help?</Text>
          <Text style={styles.helpText}>
            Contact our support team at support@nepearn.com
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  content: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  headerIcon: {
    fontSize: 64,
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#94a3b8',
    textAlign: 'center',
  },
  faqCard: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
  },
  faqQuestion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  faqQuestionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginRight: 12,
  },
  expandIcon: {
    fontSize: 24,
    color: '#10b981',
    fontWeight: 'bold',
  },
  faqAnswer: {
    padding: 16,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: '#334155',
  },
  faqAnswerText: {
    fontSize: 14,
    color: '#cbd5e1',
    lineHeight: 20,
  },
  helpCard: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  helpTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  helpText: {
    fontSize: 14,
    color: '#10b981',
    textAlign: 'center',
  },
});

