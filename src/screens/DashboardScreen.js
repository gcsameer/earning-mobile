import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import api from '../config/api';
import AdBanner from '../components/AdBanner';

export default function DashboardScreen({ navigation }) {
  const { user } = useAuth();
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWallet();
  }, []);

  const loadWallet = async () => {
    try {
      const response = await api.get('/wallet/');
      setWallet(response.data);
    } catch (error) {
      console.error('Error loading wallet:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = () => {
    setLoading(true);
    loadWallet();
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={onRefresh} />
      }
    >
      <View style={styles.content}>
        <Text style={styles.greeting}>Welcome, {user?.username}!</Text>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>Coins Balance</Text>
          <Text style={styles.coinAmount}>{wallet?.coins_balance || 0}</Text>
          <Text style={styles.rsAmount}>
            ≈ Rs. {wallet?.approx_balance_rs || '0.00'}
          </Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Tasks')}
          >
            <Text style={styles.actionButtonText}>View Tasks</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Wallet')}
          >
            <Text style={styles.actionButtonText}>Wallet</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Referrals')}
          >
            <Text style={styles.actionButtonText}>Referrals</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Your Referral Code</Text>
          <Text style={styles.referralCode}>{user?.ref_code}</Text>
          <Text style={styles.infoText}>
            Share this code with friends to earn bonuses!
          </Text>
        </View>

        {/* Ad Banner */}
        <AdBanner style={styles.adContainer} />
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
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  cardLabel: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 8,
  },
  coinAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#10b981',
    marginBottom: 4,
  },
  rsAmount: {
    fontSize: 16,
    color: '#cbd5e1',
  },
  actions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#10b981',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  infoCard: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  infoTitle: {
    fontSize: 16,
    color: '#94a3b8',
    marginBottom: 8,
  },
  referralCode: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#10b981',
    marginBottom: 8,
    letterSpacing: 2,
  },
  infoText: {
    fontSize: 14,
    color: '#cbd5e1',
    textAlign: 'center',
  },
  adContainer: {
    marginTop: 20,
    marginBottom: 10,
  },
});

