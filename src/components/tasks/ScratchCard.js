import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import api from '../../config/api';

export default function ScratchCard({ task, onComplete }) {
  const [scratched, setScratched] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [reward, setReward] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleScratch = async () => {
    if (scratched || loading) return;
    
    setScratched(true);
    setLoading(true);
    setError(null);

    try {
      const response = await api.post(`/tasks/game/complete/${task.id}/`, {
        device_id: 'mobile-app',
      });

      if (response.data && response.data.reward_coins) {
        setReward(response.data.reward_coins);
        setRevealed(true);
        
        // Call onComplete callback after a short delay
        setTimeout(() => {
          if (onComplete) onComplete(response.data);
        }, 2000);
      } else {
        setError('Task completed but no reward received. Please contact support.');
        setScratched(false);
      }
    } catch (err) {
      console.error('Task completion error:', err);
      const errorMessage = err.response?.data?.detail || err.response?.data?.message || err.message || 'Failed to complete task';
      setError(errorMessage);
      setScratched(false);
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{task.title}</Text>
      <Text style={styles.description}>{task.description}</Text>

      <View style={styles.cardContainer}>
        {!scratched ? (
          <View style={styles.cardContent}>
            <Text style={styles.cardEmoji}>🎫</Text>
            <Text style={styles.cardText}>Scratch to reveal your reward!</Text>
            <TouchableOpacity
              style={[styles.scratchButton, loading && styles.buttonDisabled]}
              onPress={handleScratch}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#10b981" />
              ) : (
                <Text style={styles.scratchButtonText}>Scratch Card</Text>
              )}
            </TouchableOpacity>
          </View>
        ) : revealed ? (
          <View style={styles.cardContent}>
            <Text style={styles.cardEmoji}>🎉</Text>
            <Text style={styles.rewardText}>You won {reward} coins!</Text>
            <Text style={styles.rewardSubtext}>Coins added to your balance</Text>
          </View>
        ) : (
          <View style={styles.cardContent}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={styles.cardText}>Processing...</Text>
          </View>
        )}
      </View>

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      <Text style={styles.infoText}>
        💰 Reward: <Text style={styles.rewardRange}>20-150 coins</Text> (random)
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 20,
    margin: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 16,
  },
  cardContainer: {
    backgroundColor: '#10b981',
    borderRadius: 12,
    padding: 24,
    minHeight: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  cardText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  scratchButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  scratchButtonText: {
    color: '#10b981',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  rewardText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  rewardSubtext: {
    color: '#d1fae5',
    fontSize: 14,
    textAlign: 'center',
  },
  errorContainer: {
    backgroundColor: '#ef4444',
    opacity: 0.1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ef4444',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 14,
    textAlign: 'center',
  },
  infoText: {
    fontSize: 12,
    color: '#94a3b8',
    textAlign: 'center',
    marginTop: 8,
  },
  rewardRange: {
    color: '#10b981',
    fontWeight: '600',
  },
});

