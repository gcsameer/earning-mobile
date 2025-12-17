import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import api from '../config/api';
import AdBanner from '../components/AdBanner';

export default function TaskCountdownScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { userTaskId } = route.params || {};
  
  const [seconds, setSeconds] = useState(8);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Countdown timer
  useEffect(() => {
    if (!userTaskId) {
      Alert.alert('Error', 'Task ID not provided');
      navigation.goBack();
      return;
    }

    if (seconds <= 0) return;

    const timer = setInterval(() => {
      setSeconds((s) => (s > 0 ? s - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds, userTaskId, navigation]);

  const completeTask = async () => {
    if (seconds > 0 || loading) return;

    setError(null);
    setLoading(true);

    try {
      const response = await api.post(`/tasks/complete/${userTaskId}/`);
      Alert.alert(
        'Success!',
        `Task completed! You earned ${response.data.reward_coins} coins!`,
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Wallet'),
          },
        ]
      );
    } catch (e) {
      const errorMsg = e?.response?.data?.detail || 'Failed to complete task';
      setError(errorMsg);
      Alert.alert('Error', errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Task in Progress</Text>

        <AdBanner style={styles.adContainer} />

        <View style={styles.countdownCard}>
          <Text style={styles.countdownLabel}>Please wait</Text>
          <Text style={styles.countdownValue}>{seconds}</Text>
          <Text style={styles.countdownLabel}>seconds</Text>
        </View>

        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        <TouchableOpacity
          style={[
            styles.completeButton,
            (seconds > 0 || loading) && styles.buttonDisabled,
          ]}
          onPress={completeTask}
          disabled={seconds > 0 || loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : seconds > 0 ? (
            <Text style={styles.buttonText}>Waiting... ({seconds}s)</Text>
          ) : (
            <Text style={styles.buttonText}>Complete Task</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.infoText}>
          ⚠️ Please wait for the countdown to complete before claiming your reward.
        </Text>

        <AdBanner style={styles.adContainer} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
  },
  adContainer: {
    marginVertical: 20,
  },
  countdownCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 40,
    alignItems: 'center',
    marginVertical: 30,
    borderWidth: 2,
    borderColor: '#10b981',
  },
  countdownLabel: {
    fontSize: 18,
    color: '#94a3b8',
    marginBottom: 12,
  },
  countdownValue: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#10b981',
    marginVertical: 20,
  },
  errorContainer: {
    backgroundColor: '#ef4444',
    opacity: 0.1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ef4444',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 14,
    textAlign: 'center',
  },
  completeButton: {
    backgroundColor: '#10b981',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonDisabled: {
    backgroundColor: '#6b7280',
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  infoText: {
    fontSize: 12,
    color: '#94a3b8',
    textAlign: 'center',
    marginTop: 10,
  },
});

