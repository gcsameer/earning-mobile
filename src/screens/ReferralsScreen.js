import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Share,
  Alert,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import api from '../config/api';

export default function ReferralsScreen() {
  const { user } = useAuth();
  const [referrals, setReferrals] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReferrals();
  }, []);

  const loadReferrals = async () => {
    try {
      const response = await api.get('/referrals/');
      setReferrals(response.data);
    } catch (error) {
      console.error('Error loading referrals:', error);
    } finally {
      setLoading(false);
    }
  };

  const shareReferralCode = async () => {
    try {
      const message = `Join NepEarn and earn money! Use my referral code: ${user?.ref_code}`;
      await Share.share({
        message,
        title: 'NepEarn Referral',
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to share referral code');
    }
  };

  const renderUser = ({ item }) => (
    <View style={styles.userCard}>
      <View style={styles.userInfo}>
        <Text style={styles.username}>{item.username}</Text>
        <Text style={styles.userCoins}>{item.coins} coins</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.referralCard}>
        <Text style={styles.referralTitle}>Your Referral Code</Text>
        <Text style={styles.referralCode}>{user?.ref_code}</Text>
        <TouchableOpacity
          style={styles.shareButton}
          onPress={shareReferralCode}
        >
          <Text style={styles.shareButtonText}>Share Code</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsCard}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{referrals?.total_referred || 0}</Text>
          <Text style={styles.statLabel}>Total Referrals</Text>
        </View>
      </View>

      <Text style={styles.usersTitle}>Referred Users</Text>
      <FlatList
        data={referrals?.users || []}
        renderItem={renderUser}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={loadReferrals} />
        }
        contentContainerStyle={styles.usersList}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No referrals yet</Text>
            <Text style={styles.emptySubtext}>
              Share your code to start earning!
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  referralCard: {
    backgroundColor: '#1e293b',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  referralTitle: {
    fontSize: 16,
    color: '#94a3b8',
    marginBottom: 12,
  },
  referralCode: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#10b981',
    letterSpacing: 4,
    marginBottom: 20,
  },
  shareButton: {
    backgroundColor: '#10b981',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
  },
  shareButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  statsCard: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  stat: {
    flex: 1,
    backgroundColor: '#1e293b',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#10b981',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#94a3b8',
  },
  usersTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginHorizontal: 16,
    marginBottom: 12,
  },
  usersList: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  userCard: {
    backgroundColor: '#1e293b',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  username: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  userCoins: {
    fontSize: 14,
    color: '#10b981',
  },
  empty: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    color: '#94a3b8',
    fontSize: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    color: '#64748b',
    fontSize: 14,
  },
});

