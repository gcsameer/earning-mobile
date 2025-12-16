import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import api from '../config/api';
import AdBanner from '../components/AdBanner';
import RewardedAdButton from '../components/RewardedAd';
import { useInterstitialAd } from '../components/InterstitialAd';

export default function DashboardScreen({ navigation }) {
  const { user } = useAuth();
  const [wallet, setWallet] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [streak, setStreak] = useState(null);
  const [loading, setLoading] = useState(true);
  const { showInterstitial } = useInterstitialAd();

  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    setLoading(true);
    try {
      // Load wallet
      const walletRes = await api.get('/wallet/');
      setWallet(walletRes.data);

      // Load analytics (optional)
      try {
        const analyticsRes = await api.get('/analytics/');
        setAnalytics(analyticsRes.data);
      } catch (e) {
        // Analytics optional - fail silently
      }

      // Load streak (optional)
      try {
        const streakRes = await api.post('/streak/');
        setStreak(streakRes.data);
      } catch (e) {
        // Streak optional - fail silently
      }
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = () => {
    loadAll();
  };

  const claimBonus = async () => {
    try {
      const response = await api.post('/daily-bonus/');
      Alert.alert(
        'Success!',
        `Daily bonus claimed: ${response.data.bonus_coins} coins!`,
        [
          {
            text: 'OK',
            onPress: () => loadAll(), // Refresh dashboard
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', error.response?.data?.detail || 'Failed to claim bonus.');
    }
  };

  const handleRewardedAdComplete = async (reward) => {
    try {
      // Call backend API to credit coins
      const response = await api.post('/ads/rewarded/complete/');
      Alert.alert(
        'Success!',
        `You earned ${response.data.reward_coins} coins! Your new balance is ${response.data.new_balance} coins.`,
        [
          {
            text: 'OK',
            onPress: () => loadWallet(), // Refresh wallet balance
          },
        ]
      );
    } catch (error) {
      console.error('Error crediting rewarded ad:', error);
      Alert.alert(
        'Error',
        error.response?.data?.detail || 'Failed to credit coins. Please try again.'
      );
    }
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

        {/* Daily Bonus Button */}
        <TouchableOpacity
          style={styles.bonusButton}
          onPress={claimBonus}
        >
          <Text style={styles.bonusButtonText}>🎁 Claim Daily Bonus</Text>
        </TouchableOpacity>

        {/* Login Streak */}
        {streak && (
          <View style={styles.streakCard}>
            <Text style={styles.streakLabel}>🔥 Login Streak</Text>
            <Text style={styles.streakValue}>{streak.current_streak} days</Text>
            {streak.bonus > 0 && (
              <Text style={styles.streakBonus}>+{streak.bonus} coins bonus!</Text>
            )}
          </View>
        )}

        {/* Analytics Overview */}
        {analytics && (
          <View style={styles.analyticsContainer}>
            <Text style={styles.analyticsTitle}>📊 Your Stats</Text>
            <View style={styles.analyticsGrid}>
              <View style={styles.analyticsItem}>
                <Text style={styles.analyticsValue}>{analytics.earnings?.today || 0}</Text>
                <Text style={styles.analyticsLabel}>Today</Text>
              </View>
              <View style={styles.analyticsItem}>
                <Text style={styles.analyticsValue}>{analytics.earnings?.this_week || 0}</Text>
                <Text style={styles.analyticsLabel}>This Week</Text>
              </View>
              <View style={styles.analyticsItem}>
                <Text style={styles.analyticsValue}>{analytics.tasks?.total_completed || 0}</Text>
                <Text style={styles.analyticsLabel}>Tasks</Text>
              </View>
              <View style={styles.analyticsItem}>
                <Text style={styles.analyticsValue}>{analytics.referrals?.total || 0}</Text>
                <Text style={styles.analyticsLabel}>Referrals</Text>
              </View>
            </View>
          </View>
        )}

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => {
              showInterstitial();
              navigation.navigate('Tasks');
            }}
          >
            <Text style={styles.actionButtonText}>View Tasks</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => {
              showInterstitial();
              navigation.navigate('Wallet');
            }}
          >
            <Text style={styles.actionButtonText}>Wallet</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => {
              showInterstitial();
              navigation.navigate('Referrals');
            }}
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

        {/* Rewarded Ad Section */}
        <View style={styles.rewardedAdCard}>
          <Text style={styles.rewardedAdTitle}>🎬 Watch Ad to Earn Coins</Text>
          <Text style={styles.rewardedAdDescription}>
            Watch a short ad and earn 10 coins instantly!
          </Text>
          <RewardedAdButton
            onRewardEarned={handleRewardedAdComplete}
            buttonText="▶️ Watch Ad & Earn 10 Coins"
            style={styles.rewardedAdButton}
          />
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
  rewardedAdCard: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  rewardedAdTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  rewardedAdDescription: {
    fontSize: 14,
    color: '#cbd5e1',
    marginBottom: 16,
    textAlign: 'center',
  },
  rewardedAdButton: {
    width: '100%',
  },
  bonusButton: {
    backgroundColor: '#f59e0b',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  bonusButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  streakCard: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#f59e0b',
  },
  streakLabel: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 8,
  },
  streakValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#f59e0b',
    marginBottom: 4,
  },
  streakBonus: {
    fontSize: 14,
    color: '#10b981',
    fontWeight: '600',
  },
  analyticsContainer: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  analyticsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
    textAlign: 'center',
  },
  analyticsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  analyticsItem: {
    width: '48%',
    backgroundColor: '#0f172a',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    alignItems: 'center',
  },
  analyticsValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#10b981',
    marginBottom: 4,
  },
  analyticsLabel: {
    fontSize: 12,
    color: '#94a3b8',
  },
});

