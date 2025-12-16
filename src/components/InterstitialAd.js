import React, { useEffect, useState } from 'react';

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
    // Silently fail (don't interrupt user experience)
    if (onAdClosed) {
      setTimeout(() => onAdClosed(), 100);
    }
  };

  useEffect(() => {
    if (autoShow) {
      showAd();
    }
  }, [autoShow]);

  return null; // No UI for interstitial ads
}

/**
 * useInterstitialAd Hook - Placeholder
 * AdMob temporarily disabled to fix build errors
 * This hook is used in DashboardScreen and TasksScreen
 */
export function useInterstitialAd(adUnitId) {
  const [isLoaded, setIsLoaded] = useState(false);

  const showInterstitial = () => {
    // Placeholder - AdMob will be re-enabled after build succeeds
    // Silently fail (don't interrupt user experience)
    return Promise.resolve();
  };

  return {
    isLoaded,
    showInterstitial,
  };
}
