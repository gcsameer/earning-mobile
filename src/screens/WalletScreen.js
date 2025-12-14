import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import api from '../config/api';

export default function WalletScreen({ navigation }) {
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

  const renderTransaction = ({ item }) => (
    <View style={styles.transactionCard}>
      <View style={styles.transactionHeader}>
        <Text style={styles.transactionType}>{item.type.toUpperCase()}</Text>
        <Text
          style={[
            styles.transactionAmount,
            item.coins > 0 ? styles.positive : styles.negative,
          ]}
        >
          {item.coins > 0 ? '+' : ''}{item.coins} coins
        </Text>
      </View>
      <Text style={styles.transactionNote}>{item.note}</Text>
      <Text style={styles.transactionDate}>
        {new Date(item.created_at).toLocaleDateString()}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Total Balance</Text>
        <Text style={styles.balanceAmount}>
          {wallet?.coins_balance || 0} coins
        </Text>
        <Text style={styles.balanceRs}>
          ≈ Rs. {wallet?.approx_balance_rs || '0.00'}
        </Text>
        <TouchableOpacity
          style={styles.withdrawButton}
          onPress={() => navigation.navigate('Withdraw')}
        >
          <Text style={styles.withdrawButtonText}>Withdraw</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.transactionsTitle}>Recent Transactions</Text>
      <FlatList
        data={wallet?.transactions || []}
        renderItem={renderTransaction}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={loadWallet} />
        }
        contentContainerStyle={styles.transactionsList}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No transactions yet</Text>
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
  balanceCard: {
    backgroundColor: '#1e293b',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#10b981',
    marginBottom: 4,
  },
  balanceRs: {
    fontSize: 16,
    color: '#cbd5e1',
    marginBottom: 20,
  },
  withdrawButton: {
    backgroundColor: '#10b981',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
  },
  withdrawButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  transactionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginHorizontal: 16,
    marginBottom: 12,
  },
  transactionsList: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  transactionCard: {
    backgroundColor: '#1e293b',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  transactionType: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: '600',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  positive: {
    color: '#10b981',
  },
  negative: {
    color: '#ef4444',
  },
  transactionNote: {
    fontSize: 14,
    color: '#cbd5e1',
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 12,
    color: '#64748b',
  },
  empty: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    color: '#94a3b8',
    fontSize: 16,
  },
});

