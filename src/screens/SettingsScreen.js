import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';

export default function SettingsScreen() {
  const navigation = useNavigation();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const openWebsite = (url) => {
    Linking.openURL(url).catch(() => {
      // Handle error
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.headerTitle}>Settings</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('Profile')}
          >
            <Text style={styles.menuItemText}>👤 Profile</Text>
            <Text style={styles.menuItemArrow}>→</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Information</Text>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('About')}
          >
            <Text style={styles.menuItemText}>ℹ️ About Us</Text>
            <Text style={styles.menuItemArrow}>→</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('FAQ')}
          >
            <Text style={styles.menuItemText}>❓ FAQ</Text>
            <Text style={styles.menuItemArrow}>→</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('Contact')}
          >
            <Text style={styles.menuItemText}>📧 Contact Us</Text>
            <Text style={styles.menuItemArrow}>→</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Legal</Text>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('PrivacyPolicy')}
          >
            <Text style={styles.menuItemText}>🔒 Privacy Policy</Text>
            <Text style={styles.menuItemArrow}>→</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('TermsOfService')}
          >
            <Text style={styles.menuItemText}>📄 Terms of Service</Text>
            <Text style={styles.menuItemArrow}>→</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Other</Text>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => openWebsite('https://nepearn.vercel.app')}
          >
            <Text style={styles.menuItemText}>🌐 Visit Website</Text>
            <Text style={styles.menuItemArrow}>→</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>NepEarn v1.0.0</Text>
          <Text style={styles.footerText}>© 2025 NepEarn. All rights reserved.</Text>
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
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#94a3b8',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
  },
  menuItemText: {
    fontSize: 16,
    color: '#fff',
  },
  menuItemArrow: {
    fontSize: 18,
    color: '#94a3b8',
  },
  logoutButton: {
    backgroundColor: '#ef4444',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#334155',
  },
  footerText: {
    fontSize: 12,
    color: '#94a3b8',
    marginBottom: 4,
  },
});

