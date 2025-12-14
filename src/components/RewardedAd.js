import React, { useEffect, useState, useRef } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import mobileAds, { RewardedAd, RewardedAdEventType } from 'react-native-google-mobile-ads';

export default function RewardedAdButton({ 
  adUnitId, 
  onRewardEarned, 
  buttonText = 'Watch Ad to Earn Coins',
  disabled = false 
}) {
  const [loaded, setLoaded] = useState(false);
  const rewarded = useRef(null);

  // Default ad unit ID if not provided
  const defaultAdUnitId = 'ca-app-pub-8858320671117320/6166975524';
  const unitId = adUnitId || defaultAdUnitId;

  useEffect(() => {
    // Initialize Google Mobile Ads
    mobileAds()
      .initialize()
      .then(adapterStatuses => {
        console.log('AdMob initialized:', adapterStatuses);
      });

    // Create rewarded ad instance
    rewarded.current = RewardedAd.createForAdRequest(unitId, {
      requestNonPersonalizedAdsOnly: true,
    });

    // Load ad
    const unsubscribeLoaded = rewarded.current.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        setLoaded(true);
        console.log('Rewarded ad loaded');
      },
    );

    const unsubscribeEarned = rewarded.current.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      (reward) => {
        console.log('User earned reward:', reward);
        if (onRewardEarned) {
          onRewardEarned(reward);
        }
        // Reload ad for next time
        setLoaded(false);
        rewarded.current.load();
      },
    );

    const unsubscribeError = rewarded.current.addAdEventListener(
      RewardedAdEventType.ERROR,
      (error) => {
        console.error('Rewarded ad error:', error);
        Alert.alert('Ad Error', 'Failed to load ad. Please try again later.');
        setLoaded(false);
      },
    );

    // Load the ad
    rewarded.current.load();

    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
      unsubscribeError();
    };
  }, [unitId, onRewardEarned]);

  const showAd = () => {
    if (loaded && rewarded.current) {
      rewarded.current.show();
    } else {
      Alert.alert('Ad Not Ready', 'Please wait for the ad to load.');
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, (!loaded || disabled) && styles.buttonDisabled]}
      onPress={showAd}
      disabled={!loaded || disabled}
    >
      <Text style={styles.buttonText}>
        {loaded ? buttonText : 'Loading Ad...'}
      </Text>
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
});

