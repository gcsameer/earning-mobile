import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import api from '../config/api';

/**
 * Tapjoy Rewarded Ad Component
 * Note: This requires Tapjoy SDK integration
 */
export default function TapjoyRewardedAd({ 
  onRewardEarned,
  rewardAmount = 10,
  buttonText = "Watch Ad for Coins"
}) {
  const [loading, setLoading] = useState(false);

  const showRewardedAd = async () => {
    setLoading(true);
    
    try {
      // Note: Tapjoy SDK integration required
      // This is a placeholder - integrate Tapjoy SDK's rewarded ad functionality
      
      Alert.alert(
        'Tapjoy SDK Required',
        'Tapjoy rewarded ads require the Tapjoy SDK. Please install react-native-tapjoy or integrate Tapjoy\'s native SDK.',
        [{ text: 'OK' }]
      );

      // Placeholder for actual Tapjoy rewarded ad implementation
      // When ad is watched successfully:
      // await api.post('/ads/rewarded/complete/', { ad_network: 'tapjoy' });
      // if (onRewardEarned) onRewardEarned(rewardAmount);
      
    } catch (error) {
      Alert.alert('Error', 'Failed to show rewarded ad');
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, loading && styles.buttonDisabled]}
      onPress={showRewardedAd}
      disabled={loading}
    >
      <Text style={styles.buttonText}>
        {loading ? 'Loading...' : buttonText}
      </Text>
      <Text style={styles.rewardText}>+{rewardAmount} coins</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#10b981',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  rewardText: {
    color: '#ffffff',
    fontSize: 12,
    marginTop: 4,
    opacity: 0.9,
  },
});

