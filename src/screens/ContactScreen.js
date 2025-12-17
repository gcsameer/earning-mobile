import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Linking } from 'react-native';

export default function ContactScreen() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.message) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const emailBody = `Name: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject || 'General Inquiry'}\n\nMessage:\n${formData.message}`;
    const emailUrl = `mailto:support@nepearn.com?subject=${encodeURIComponent(formData.subject || 'General Inquiry')}&body=${encodeURIComponent(emailBody)}`;

    Linking.canOpenURL(emailUrl)
      .then((supported) => {
        if (supported) {
          Linking.openURL(emailUrl);
        } else {
          Alert.alert('Error', 'Email app not available');
        }
      })
      .catch(() => {
        Alert.alert('Error', 'Failed to open email app');
      });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerIcon}>📧</Text>
          <Text style={styles.headerTitle}>Contact Us</Text>
          <Text style={styles.headerSubtitle}>
            Have questions? We're here to help!
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Name *</Text>
          <TextInput
            style={styles.input}
            placeholder="Your name"
            placeholderTextColor="#94a3b8"
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
          />

          <Text style={styles.label}>Email *</Text>
          <TextInput
            style={styles.input}
            placeholder="your.email@example.com"
            placeholderTextColor="#94a3b8"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Subject</Text>
          <TextInput
            style={styles.input}
            placeholder="Subject (optional)"
            placeholderTextColor="#94a3b8"
            value={formData.subject}
            onChangeText={(text) => setFormData({ ...formData, subject: text })}
          />

          <Text style={styles.label}>Message *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Your message..."
            placeholderTextColor="#94a3b8"
            value={formData.message}
            onChangeText={(text) => setFormData({ ...formData, message: text })}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Send Message</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Other Ways to Reach Us</Text>
          <TouchableOpacity
            style={styles.contactMethod}
            onPress={() => Linking.openURL('mailto:support@nepearn.com')}
          >
            <Text style={styles.contactMethodText}>📧 support@nepearn.com</Text>
          </TouchableOpacity>
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
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#94a3b8',
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    backgroundColor: '#0f172a',
    borderRadius: 8,
    padding: 16,
    color: '#fff',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  textArea: {
    height: 120,
    paddingTop: 16,
  },
  submitButton: {
    backgroundColor: '#10b981',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  infoCard: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  contactMethod: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  contactMethodText: {
    fontSize: 16,
    color: '#10b981',
  },
});

