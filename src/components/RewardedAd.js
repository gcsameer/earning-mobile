import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';

/**
 * RewardedAd Component - Placeholder
 * AdMob temporarily disabled to fix build errors
 * Will be re-enabled after successful build
 */
export default function RewardedAdButton({ 
  adUnitId, 
  onRewardEarned, 
  buttonText = 'Watch Ad to Earn Coins',
  disabled = false 
}) {
  const [loading, setLoading] = useState(false);

  const showAd = () => {
    setLoading(true);
    // Placeholder - AdMob will be re-enabled after build succeeds
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'AdMob Temporarily Disabled',
        'AdMob has been temporarily disabled to fix build errors. It will be re-enabled after the build succeeds.',
        [{ text: 'OK' }]
      );
    }, 500);
  };

  return (
    <TouchableOpacity
      style={[styles.button, (loading || disabled) && styles.buttonDisabled]}
      onPress={showAd}
      disabled={loading || disabled}
    >
      <Text style={styles.buttonText}>
        {loading ? 'Loading...' : buttonText}
      </Text>
      <Text style={styles.note}>AdMob temporarily disabled</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#10b981',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  buttonDisabled: {
    backgroundColor: '#6b7280',
    opacity: 0.6,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  note: {
    color: '#ffffff',
    fontSize: 10,
    marginTop: 4,
    opacity: 0.7,
  },
});
