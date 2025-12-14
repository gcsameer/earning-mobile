import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import api from '../config/api';

export default function WithdrawScreen() {
  const [wallet, setWallet] = useState(null);
  const [formData, setFormData] = useState({
    amount_rs: '',
    method: 'eSewa',
    account_id: '',
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadWallet();
  }, []);

  const loadWallet = async () => {
    try {
      const response = await api.get('/wallet/');
      setWallet(response.data);
    } catch (error) {
      Alert.alert('Error', 'Failed to load wallet');
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async () => {
    if (!formData.amount_rs || !formData.account_id) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const amount = parseFloat(formData.amount_rs);
    if (isNaN(amount) || amount <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    if (amount < 50) {
      Alert.alert('Error', 'Minimum withdrawal is Rs. 50');
      return;
    }

    setSubmitting(true);
    try {
      await api.post('/withdraw/', formData);
      Alert.alert('Success', 'Withdrawal request submitted successfully!');
      setFormData({ amount_rs: '', method: 'eSewa', account_id: '' });
      loadWallet();
    } catch (error) {
      Alert.alert(
        'Error',
        error.response?.data?.detail || 'Failed to submit withdrawal request'
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#10b981" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Available Balance</Text>
          <Text style={styles.balanceAmount}>
            {wallet?.coins_balance || 0} coins
          </Text>
          <Text style={styles.balanceRs}>
            ≈ Rs. {wallet?.approx_balance_rs || '0.00'}
          </Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Amount (Rs.)</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter amount"
            placeholderTextColor="#94a3b8"
            value={formData.amount_rs}
            onChangeText={(text) =>
              setFormData({ ...formData, amount_rs: text })
            }
            keyboardType="decimal-pad"
          />

          <Text style={styles.label}>Payment Method</Text>
          <View style={styles.methodButtons}>
            {['eSewa', 'Khalti', 'Bank'].map((method) => (
              <TouchableOpacity
                key={method}
                style={[
                  styles.methodButton,
                  formData.method === method && styles.methodButtonActive,
                ]}
                onPress={() => setFormData({ ...formData, method })}
              >
                <Text
                  style={[
                    styles.methodButtonText,
                    formData.method === method &&
                      styles.methodButtonTextActive,
                  ]}
                >
                  {method}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Account ID / Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter account ID or number"
            placeholderTextColor="#94a3b8"
            value={formData.account_id}
            onChangeText={(text) =>
              setFormData({ ...formData, account_id: text })
            }
          />

          <TouchableOpacity
            style={[styles.submitButton, submitting && styles.submitButtonDisabled]}
            onPress={handleWithdraw}
            disabled={submitting}
          >
            {submitting ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.submitButtonText}>Submit Request</Text>
            )}
          </TouchableOpacity>

          <Text style={styles.note}>
            Minimum withdrawal: Rs. 50{'\n'}
            Requests are processed within 24-48 hours
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  scrollContent: {
    padding: 16,
  },
  balanceCard: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 24,
  },
  balanceLabel: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#10b981',
    marginBottom: 4,
  },
  balanceRs: {
    fontSize: 16,
    color: '#cbd5e1',
  },
  form: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    color: '#cbd5e1',
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#1e293b',
    color: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  methodButtons: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  methodButton: {
    flex: 1,
    backgroundColor: '#1e293b',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  methodButtonActive: {
    backgroundColor: '#10b981',
    borderColor: '#10b981',
  },
  methodButtonText: {
    color: '#cbd5e1',
    fontSize: 14,
    fontWeight: '600',
  },
  methodButtonTextActive: {
    color: '#fff',
  },
  submitButton: {
    backgroundColor: '#10b981',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  note: {
    fontSize: 12,
    color: '#94a3b8',
    textAlign: 'center',
    marginTop: 16,
    lineHeight: 18,
  },
});

