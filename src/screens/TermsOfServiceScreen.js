import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

export default function TermsOfServiceScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Terms of Service</Text>
        <Text style={styles.date}>Last updated: {new Date().toLocaleDateString()}</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
          <Text style={styles.sectionText}>
            By accessing and using NepEarn, you accept and agree to be bound by the terms and
            provision of this agreement. If you do not agree, please do not use this service.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Description of Service</Text>
          <Text style={styles.sectionText}>
            NepEarn is an earning platform that allows users to earn coins by:
          </Text>
          <Text style={styles.listItem}>• Playing games (scratch cards, spin wheels, puzzles, quizzes)</Text>
          <Text style={styles.listItem}>• Completing offers through our offerwall</Text>
          <Text style={styles.listItem}>• Watching advertisements</Text>
          <Text style={styles.listItem}>• Referring friends</Text>
          <Text style={styles.sectionText}>
            Coins earned can be converted to real money and withdrawn through approved payment methods.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. User Accounts</Text>
          <Text style={styles.sectionText}>
            To use our service, you must:
          </Text>
          <Text style={styles.listItem}>• Be at least 18 years old</Text>
          <Text style={styles.listItem}>• Provide accurate and complete information</Text>
          <Text style={styles.listItem}>• Use a valid email address</Text>
          <Text style={styles.listItem}>• Maintain the security of your account</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Earning and Withdrawals</Text>
          <Text style={styles.sectionText}>
            • Coins are earned through legitimate task completion
          </Text>
          <Text style={styles.sectionText}>
            • Minimum withdrawal amount is Rs. 50
          </Text>
          <Text style={styles.sectionText}>
            • Withdrawals are processed within 24-48 hours
          </Text>
          <Text style={styles.sectionText}>
            • We reserve the right to verify transactions and prevent fraud
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. Prohibited Activities</Text>
          <Text style={styles.sectionText}>
            You agree not to:
          </Text>
          <Text style={styles.listItem}>• Use automated tools or bots</Text>
          <Text style={styles.listItem}>• Create multiple accounts</Text>
          <Text style={styles.listItem}>• Engage in fraudulent activities</Text>
          <Text style={styles.listItem}>• Violate any applicable laws</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>6. Contact Us</Text>
          <Text style={styles.sectionText}>
            For questions about these Terms, contact us at support@nepearn.com
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 16,
    color: '#cbd5e1',
    lineHeight: 24,
    marginBottom: 8,
  },
  listItem: {
    fontSize: 16,
    color: '#cbd5e1',
    lineHeight: 24,
    marginLeft: 16,
    marginBottom: 4,
  },
});

