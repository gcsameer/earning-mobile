import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerIcon}>💰</Text>
          <Text style={styles.headerTitle}>About NepEarn</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Mission</Text>
          <Text style={styles.sectionText}>
            NepEarn is a platform that allows users to earn money by completing simple tasks,
            playing games, and watching ads. We believe everyone should have the opportunity to
            earn extra income through legitimate and engaging activities.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Features</Text>
          <View style={styles.featureList}>
            <Text style={styles.featureItem}>• Game-Based Tasks: Play scratch cards, spin wheels, puzzles, and quizzes</Text>
            <Text style={styles.featureItem}>• Offerwall: Complete offers from trusted partners</Text>
            <Text style={styles.featureItem}>• Referral Program: Earn bonuses by inviting friends</Text>
            <Text style={styles.featureItem}>• Daily Bonuses: Claim daily rewards for consistent usage</Text>
            <Text style={styles.featureItem}>• Secure Withdrawals: Safe and reliable payment processing</Text>
            <Text style={styles.featureItem}>• Mobile App: Earn on the go with our Android app</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Transparency and Trust</Text>
          <Text style={styles.sectionText}>
            We are committed to transparency and user trust. Our platform uses industry-standard
            security measures, complies with data protection regulations, and maintains transparent
            earning and withdrawal policies.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Us</Text>
          <Text style={styles.sectionText}>
            For support, questions, or feedback, please contact us at:
          </Text>
          <Text style={styles.contactInfo}>Email: support@nepearn.com</Text>
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
  },
  featureList: {
    marginTop: 8,
  },
  featureItem: {
    fontSize: 16,
    color: '#cbd5e1',
    marginBottom: 8,
    lineHeight: 24,
  },
  contactInfo: {
    fontSize: 16,
    color: '#10b981',
    marginTop: 8,
    fontWeight: '600',
  },
});

