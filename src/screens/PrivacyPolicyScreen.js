import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

export default function PrivacyPolicyScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Privacy Policy</Text>
        <Text style={styles.date}>Last updated: {new Date().toLocaleDateString()}</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Introduction</Text>
          <Text style={styles.sectionText}>
            Welcome to NepEarn. We are committed to protecting your privacy and ensuring you have
            a positive experience on our platform. This Privacy Policy explains how we collect,
            use, disclose, and safeguard your information.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Information We Collect</Text>
          <Text style={styles.sectionText}>
            We collect information that you provide directly to us, including:
          </Text>
          <Text style={styles.listItem}>• Username and email address</Text>
          <Text style={styles.listItem}>• Phone number</Text>
          <Text style={styles.listItem}>• Payment and withdrawal information</Text>
          <Text style={styles.listItem}>• Task completion history</Text>
          <Text style={styles.listItem}>• Device information and usage data</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. How We Use Your Information</Text>
          <Text style={styles.sectionText}>
            We use your information to:
          </Text>
          <Text style={styles.listItem}>• Process transactions and withdrawals</Text>
          <Text style={styles.listItem}>• Provide and improve our services</Text>
          <Text style={styles.listItem}>• Send important notifications</Text>
          <Text style={styles.listItem}>• Prevent fraud and ensure security</Text>
          <Text style={styles.listItem}>• Comply with legal obligations</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Data Security</Text>
          <Text style={styles.sectionText}>
            We implement industry-standard security measures to protect your data, including
            encryption, secure servers, and regular security audits.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. Your Rights</Text>
          <Text style={styles.sectionText}>
            You have the right to access, update, or delete your personal information. Contact us
            at support@nepearn.com for assistance.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>6. Contact Us</Text>
          <Text style={styles.sectionText}>
            For questions about this Privacy Policy, contact us at support@nepearn.com
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

