import React, { useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import mobileAds from 'react-native-google-mobile-ads';

export default function AdBanner({ adUnitId, style }) {
  const bannerRef = useRef(null);

  useEffect(() => {
    // Initialize Google Mobile Ads
    mobileAds()
      .initialize()
      .then(adapterStatuses => {
        console.log('AdMob initialized:', adapterStatuses);
      });
  }, []);

  // Default ad unit ID if not provided
  const defaultAdUnitId = 'ca-app-pub-8858320671117320/6142924791';
  const unitId = adUnitId || defaultAdUnitId;

  return (
    <View style={[styles.container, style]}>
      <mobileAds.Banner
        ref={bannerRef}
        unitId={unitId}
        size={mobileAds.BannerSize.BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
        onAdLoaded={() => {
          console.log('Banner ad loaded');
        }}
        onAdFailedToLoad={(error) => {
          console.error('Banner ad failed to load:', error);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    marginVertical: 10,
  },
});

