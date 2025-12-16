import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';

/**
 * InterstitialAd Component - Placeholder
 * AdMob temporarily disabled to fix build errors
 * Will be re-enabled after successful build
 */
export default function InterstitialAd({ 
  adUnitId,
  onAdClosed,
  onAdFailedToLoad,
  autoLoad = true,
  autoShow = false
}) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Placeholder - AdMob will be re-enabled after build succeeds
    if (autoLoad) {
      // Simulate loading (but don't actually load)
      setLoaded(false);
    }
  }, [autoLoad]);

  const showAd = () => {
    // Placeholder - AdMob will be re-enabled after build succeeds
    Alert.alert(
      'AdMob Temporarily Disabled',
      'AdMob has been temporarily disabled to fix build errors. It will be re-enabled after the build succeeds.',
      [{ 
        text: 'OK',
        onPress: () => {
          if (onAdClosed) onAdClosed();
        }
      }]
    );
  };

  useEffect(() => {
    if (autoShow) {
      showAd();
    }
  }, [autoShow]);

  return null; // No UI for interstitial ads
}
