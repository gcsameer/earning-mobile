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
import SocialShare from '../components/SocialShare';

export default function DashboardScreen({ navigation }) {
  const { user } = useAuth();
  const [wallet, setWallet] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [streak, setStreak] = useState(null);
  const [achievements, setAchievements] = useState(null);
  const [challenges, setChallenges] = useState(null);
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

      // Load achievements (optional)
      try {
        const achievementsRes = await api.get('/achievements/');
        setAchievements(achievementsRes.data);
      } catch (e) {
        // Achievements optional - fail silently
      }

      // Load challenges (optional)
      try {
        const challengesRes = await api.get('/challenges/');
        setChallenges(challengesRes.data);
      } catch (e) {
        // Challenges optional - fail silently
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

  const claimChallenge = async (challengeId) => {
    try {
      const response = await api.post('/challenges/', { challenge_id: challengeId });
      Alert.alert(
        'Success!',
        `Challenge reward claimed: ${response.data.reward} coins!`,
        [
          {
            text: 'OK',
            onPress: () => loadAll(), // Refresh dashboard
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', error.response?.data?.detail || 'Failed to claim challenge.');
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
            onPress: () => loadAll(), // Refresh dashboard
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

        {/* Daily Challenges */}
        {challenges && challenges.challenges && challenges.challenges.length > 0 && (
          <View style={styles.challengesContainer}>
            <Text style={styles.sectionTitle}>🎯 Daily Challenges</Text>
            {challenges.challenges.map((challenge) => (
              <View
                key={challenge.id}
                style={[
                  styles.challengeCard,
                  challenge.completed && styles.challengeCompleted,
                ]}
              >
                <View style={styles.challengeHeader}>
                  <Text style={styles.challengeTitle}>{challenge.title}</Text>
                  {challenge.completed && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </View>
                <Text style={styles.challengeDescription}>{challenge.description}</Text>
                <View style={styles.progressContainer}>
                  <View style={styles.progressBar}>
                    <View
                      style={[
                        styles.progressFill,
                        {
                          width: `${Math.min(
                            (challenge.progress / challenge.target) * 100,
                            100
                          )}%`,
                        },
                      ]}
                    />
                  </View>
                  <Text style={styles.progressText}>
                    {challenge.progress} / {challenge.target}
                  </Text>
                </View>
                <View style={styles.challengeFooter}>
                  <Text style={styles.challengeReward}>
                    Reward: {challenge.reward} coins
                  </Text>
                  {challenge.completed && !challenge.claimed && (
                    <TouchableOpacity
                      style={styles.claimButton}
                      onPress={() => claimChallenge(challenge.id)}
                    >
                      <Text style={styles.claimButtonText}>Claim</Text>
                    </TouchableOpacity>
                  )}
                  {challenge.completed && challenge.claimed && (
                    <Text style={styles.claimedText}>Already claimed</Text>
                  )}
                </View>
              </View>
            ))}
            {challenges.total_rewards_available > 0 && (
              <View style={styles.rewardsAvailableCard}>
                <Text style={styles.rewardsAvailableText}>
                  💰 {challenges.total_rewards_available} coins available to claim!
                </Text>
              </View>
            )}
          </View>
        )}

        {/* Achievements Preview */}
        {achievements && achievements.unlocked && achievements.unlocked.length > 0 && (
          <View style={styles.achievementsContainer}>
            <View style={styles.achievementsHeader}>
              <Text style={styles.sectionTitle}>
                🏆 Achievements ({achievements.total_unlocked}/{achievements.total_available})
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Achievements')}
              >
                <Text style={styles.viewAllText}>View All →</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.achievementsGrid}>
              {achievements.unlocked.slice(0, 4).map((achievement) => (
                <View key={achievement.id} style={styles.achievementPreview}>
                  <Text style={styles.achievementIcon}>{achievement.icon}</Text>
                  <Text style={styles.achievementName} numberOfLines={1}>
                    {achievement.name}
                  </Text>
                </View>
              ))}
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

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => {
              showInterstitial();
              navigation.navigate('Achievements');
            }}
          >
            <Text style={styles.actionButtonText}>Achievements</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => {
              showInterstitial();
              navigation.navigate('Profile');
            }}
          >
            <Text style={styles.actionButtonText}>Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Your Referral Code</Text>
          <Text style={styles.referralCode}>{user?.ref_code}</Text>
          <Text style={styles.infoText}>
            Share this code with friends to earn bonuses! You get 50 coins, they get 20 coins.
          </Text>
          {user?.ref_code && (
            <SocialShare
              type="referral"
              referralLink={`https://nepearn.vercel.app/register?ref=${user.ref_code}`}
            />
          )}
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  challengesContainer: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  challengeCard: {
    backgroundColor: '#0f172a',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  challengeCompleted: {
    borderColor: '#10b981',
    backgroundColor: '#10b981',
    opacity: 0.1,
  },
  challengeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  challengeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    flex: 1,
  },
  checkmark: {
    fontSize: 18,
    color: '#10b981',
  },
  challengeDescription: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 12,
  },
  progressContainer: {
    marginBottom: 12,
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#334155',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10b981',
  },
  progressText: {
    fontSize: 12,
    color: '#94a3b8',
    textAlign: 'right',
  },
  challengeFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  challengeReward: {
    fontSize: 14,
    color: '#10b981',
    fontWeight: '600',
  },
  claimButton: {
    backgroundColor: '#10b981',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  claimButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  claimedText: {
    fontSize: 12,
    color: '#94a3b8',
    fontStyle: 'italic',
  },
  rewardsAvailableCard: {
    backgroundColor: '#10b981',
    opacity: 0.1,
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#10b981',
  },
  rewardsAvailableText: {
    color: '#10b981',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '600',
  },
  achievementsContainer: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  achievementsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  viewAllText: {
    color: '#10b981',
    fontSize: 14,
    fontWeight: '600',
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  achievementPreview: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#10b981',
    opacity: 0.1,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#10b981',
  },
  achievementIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  achievementName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
});

