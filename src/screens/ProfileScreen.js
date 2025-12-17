import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { useAuth } from '../context/AuthContext';
import api from '../config/api';

export default function ProfileScreen() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await api.get('/me/');
      setProfile(response.data);
    } catch (error) {
      Alert.alert('Error', 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const copyReferralCode = () => {
    if (profile?.ref_code) {
      Clipboard.setString(profile.ref_code);
      setCopied(true);
      Alert.alert('Copied!', 'Referral code copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading profile...</Text>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerIcon}>👤</Text>
          <Text style={styles.headerTitle}>My Profile</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Username</Text>
            <Text style={styles.value}>{profile?.username || 'N/A'}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{profile?.email || 'Not provided'}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.label}>Phone</Text>
            <Text style={styles.value}>{profile?.phone || 'Not provided'}</Text>
          </View>

          {profile?.user_level > 1 && (
            <>
              <View style={styles.divider} />
              <View style={styles.infoRow}>
                <Text style={styles.label}>Level</Text>
                <View style={styles.levelBadge}>
                  <Text style={styles.levelText}>Level {profile.user_level}</Text>
                </View>
              </View>
            </>
          )}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Wallet Balance</Text>
          <Text style={styles.coinAmount}>{profile?.coins_balance || 0}</Text>
          <Text style={styles.coinLabel}>Coins</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Referral Code</Text>
          <View style={styles.referralContainer}>
            <Text style={styles.referralCode}>{profile?.ref_code || 'N/A'}</Text>
            <TouchableOpacity
              style={styles.copyButton}
              onPress={copyReferralCode}
            >
              <Text style={styles.copyButtonText}>
                {copied ? '✓ Copied' : 'Copy'}
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.referralHint}>
            Share this code with friends to earn bonuses!
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#94a3b8',
    fontSize: 16,
  },
  content: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
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
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#94a3b8',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  label: {
    fontSize: 16,
    color: '#94a3b8',
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  divider: {
    height: 1,
    backgroundColor: '#334155',
    marginVertical: 8,
  },
  levelBadge: {
    backgroundColor: '#10b981',
    opacity: 0.2,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  levelText: {
    color: '#10b981',
    fontSize: 14,
    fontWeight: '600',
  },
  coinAmount: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#10b981',
    textAlign: 'center',
    marginBottom: 8,
  },
  coinLabel: {
    fontSize: 16,
    color: '#94a3b8',
    textAlign: 'center',
  },
  referralContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#0f172a',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  referralCode: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#10b981',
    letterSpacing: 2,
    flex: 1,
  },
  copyButton: {
    backgroundColor: '#10b981',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  copyButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  referralHint: {
    fontSize: 12,
    color: '#94a3b8',
    textAlign: 'center',
  },
});

