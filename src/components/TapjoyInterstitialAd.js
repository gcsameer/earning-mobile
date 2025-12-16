import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

/**
 * Tapjoy Interstitial Ad Component
 * Note: This requires Tapjoy SDK integration
 */
export default function TapjoyInterstitialAd({ 
  onAdClosed,
  autoShow = false
}) {
  const [loading, setLoading] = useState(false);

  const showInterstitialAd = async () => {
    setLoading(true);
    
    try {
      // Note: Tapjoy SDK integration required
      // This is a placeholder - integrate Tapjoy SDK's interstitial ad functionality
      
      Alert.alert(
        'Tapjoy SDK Required',
        'Tapjoy interstitial ads require the Tapjoy SDK. Please install react-native-tapjoy or integrate Tapjoy\'s native SDK.',
        [{ 
          text: 'OK',
          onPress: () => {
            if (onAdClosed) onAdClosed();
          }
        }]
      );

      // Placeholder for actual Tapjoy interstitial ad implementation
      // When ad is closed:
      // if (onAdClosed) onAdClosed();
      
    } catch (error) {
      Alert.alert('Error', 'Failed to show interstitial ad');
      if (onAdClosed) onAdClosed();
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (autoShow) {
      showInterstitialAd();
    }
  }, [autoShow]);

  if (autoShow) {
    return null; // Auto-show doesn't need a button
  }

  return (
    <TouchableOpacity
      style={[styles.button, loading && styles.buttonDisabled]}
      onPress={showInterstitialAd}
      disabled={loading}
    >
      <Text style={styles.buttonText}>
        {loading ? 'Loading...' : 'Show Ad'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#3b82f6',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 4,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
});

