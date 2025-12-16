import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Animated,
} from 'react-native';
import api from '../../config/api';

export default function SpinWheel({ task, onComplete }) {
  const [spinning, setSpinning] = useState(false);
  const [reward, setReward] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [rotation] = useState(new Animated.Value(0));

  // Wheel segments with rewards
  const segments = [25, 50, 75, 100, 25, 50, 75, 100];

  const handleSpin = async () => {
    if (spinning || loading) return;

    setSpinning(true);
    setLoading(true);
    setError(null);

    try {
      const response = await api.post(`/tasks/game/complete/${task.id}/`, {
        device_id: 'mobile-app',
      });

      if (response.data && response.data.reward_coins) {
        const wonReward = response.data.reward_coins;
        setReward(wonReward);

        // Animate spin
        const randomRotations = 5 + Math.random() * 3; // 5-8 full rotations
        const finalRotation = randomRotations * 360;
        
        rotation.setValue(0);
        Animated.timing(rotation, {
          toValue: finalRotation,
          duration: 3000,
          useNativeDriver: true,
        }).start(() => {
          setSpinning(false);
          setTimeout(() => {
            if (onComplete) onComplete(response.data);
          }, 1000);
        });
      } else {
        setError('Task completed but no reward received. Please contact support.');
        setSpinning(false);
      }
    } catch (err) {
      console.error('Task completion error:', err);
      const errorMessage = err.response?.data?.detail || err.response?.data?.message || err.message || 'Failed to complete task';
      setError(errorMessage);
      setSpinning(false);
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const spinStyle = {
    transform: [
      {
        rotate: rotation.interpolate({
          inputRange: [0, 360],
          outputRange: ['0deg', '360deg'],
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{task.title}</Text>
      <Text style={styles.description}>{task.description}</Text>

      <View style={styles.wheelContainer}>
        <Animated.View style={[styles.wheel, spinStyle]}>
          {segments.map((coins, index) => {
            const segmentAngle = (360 / segments.length) * index;
            return (
              <View
                key={index}
                style={[
                  styles.segment,
                  {
                    transform: [{ rotate: `${segmentAngle}deg` }],
                  },
                ]}
              >
                <Text style={styles.segmentText}>{coins}</Text>
              </View>
            );
          })}
        </Animated.View>
        <View style={styles.pointer} />
      </View>

      {reward && !spinning && (
        <View style={styles.rewardContainer}>
          <Text style={styles.rewardText}>🎉 You won {reward} coins!</Text>
        </View>
      )}

      <TouchableOpacity
        style={[styles.spinButton, (spinning || loading) && styles.buttonDisabled]}
        onPress={handleSpin}
        disabled={spinning || loading}
      >
        {loading || spinning ? (
          <ActivityIndicator color="#fff" />
        ) : reward ? (
          <Text style={styles.spinButtonText}>🎡 Spin Again</Text>
        ) : (
          <Text style={styles.spinButtonText}>🎡 Spin Wheel</Text>
        )}
      </TouchableOpacity>

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      <Text style={styles.infoText}>
        💰 Win between <Text style={styles.rewardRange}>25-100 coins</Text> per spin (random)
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
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 24,
    textAlign: 'center',
  },
  wheelContainer: {
    width: 250,
    height: 250,
    position: 'relative',
    marginBottom: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wheel: {
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: '#10b981',
    position: 'relative',
    borderWidth: 8,
    borderColor: '#334155',
  },
  segment: {
    position: 'absolute',
    width: 125,
    height: 125,
    top: 0,
    left: 125,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  segmentText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  pointer: {
    position: 'absolute',
    top: -10,
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 20,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#fff',
    zIndex: 10,
  },
  rewardContainer: {
    marginBottom: 16,
  },
  rewardText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#10b981',
    textAlign: 'center',
  },
  spinButton: {
    backgroundColor: '#10b981',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
    minWidth: 200,
    alignItems: 'center',
    marginBottom: 16,
  },
  spinButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  errorContainer: {
    backgroundColor: '#ef4444',
    opacity: 0.1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ef4444',
    width: '100%',
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

