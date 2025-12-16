import React, { useEffect, useState, useRef } from 'react';
import { Alert } from 'react-native';
import mobileAds, { InterstitialAd, AdEventType } from 'react-native-google-mobile-ads';

/**
 * Interstitial Ad Component
 * Ad Unit ID: ca-app-pub-8858320671117320/4972958131
 */
export default function InterstitialAd({ 
  adUnitId,
  onAdClosed,
  onAdFailedToLoad,
  autoLoad = true,
  autoShow = false
}) {
  const [loaded, setLoaded] = useState(false);
  const interstitial = useRef(null);

  // Default ad unit ID if not provided
  const defaultAdUnitId = 'ca-app-pub-8858320671117320/4972958131';
  const unitId = adUnitId || defaultAdUnitId;

  useEffect(() => {
    // Initialize Google Mobile Ads
    mobileAds()
      .initialize()
      .then(adapterStatuses => {
        console.log('AdMob initialized:', adapterStatuses);
      });

    // Create interstitial ad instance
    interstitial.current = InterstitialAd.createForAdRequest(unitId, {
      requestNonPersonalizedAdsOnly: true,
    });

    // Load ad
    const unsubscribeLoaded = interstitial.current.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setLoaded(true);
        console.log('Interstitial ad loaded');
        // Auto-show if enabled
        if (autoShow && interstitial.current) {
          interstitial.current.show();
        }
      },
    );

    const unsubscribeClosed = interstitial.current.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        console.log('Interstitial ad closed');
        setLoaded(false);
        if (onAdClosed) {
          onAdClosed();
        }
        // Reload ad for next time
        if (autoLoad && interstitial.current) {
          interstitial.current.load();
        }
      },
    );

    const unsubscribeError = interstitial.current.addAdEventListener(
      AdEventType.ERROR,
      (error) => {
        console.error('Interstitial ad error:', error);
        setLoaded(false);
        if (onAdFailedToLoad) {
          onAdFailedToLoad(error);
        }
      },
    );

    // Load the ad if autoLoad is enabled
    if (autoLoad) {
      interstitial.current.load();
    }

    return () => {
      unsubscribeLoaded();
      unsubscribeClosed();
      unsubscribeError();
    };
  }, [unitId, autoLoad, autoShow, onAdClosed, onAdFailedToLoad]);

  const showAd = () => {
    if (loaded && interstitial.current) {
      interstitial.current.show();
    } else {
      console.warn('Interstitial ad not ready');
      if (onAdFailedToLoad) {
        onAdFailedToLoad(new Error('Ad not loaded'));
      }
    }
  };

  // Expose show method via ref (for parent components)
  React.useImperativeHandle(React.forwardRef(() => null), () => ({
    show: showAd,
    isLoaded: loaded,
  }));

  return null; // Interstitial ads don't render anything
}

/**
 * Hook to use Interstitial Ad
 * Usage: const { showInterstitial, isLoaded } = useInterstitialAd();
 */
export function useInterstitialAd(adUnitId) {
  const [loaded, setLoaded] = useState(false);
  const interstitialRef = useRef(null);

  useEffect(() => {
    const defaultAdUnitId = 'ca-app-pub-8858320671117320/4972958131';
    const unitId = adUnitId || defaultAdUnitId;

    // Initialize
    mobileAds()
      .initialize()
      .then(() => {
        interstitialRef.current = InterstitialAd.createForAdRequest(unitId, {
          requestNonPersonalizedAdsOnly: true,
        });

        // Listen for loaded event
        const unsubscribeLoaded = interstitialRef.current.addAdEventListener(
          AdEventType.LOADED,
          () => {
            setLoaded(true);
            console.log('Interstitial ad loaded (hook)');
          },
        );

        // Listen for closed event
        const unsubscribeClosed = interstitialRef.current.addAdEventListener(
          AdEventType.CLOSED,
          () => {
            setLoaded(false);
            // Reload for next time
            interstitialRef.current.load();
          },
        );

        // Load the ad
        interstitialRef.current.load();

        return () => {
          unsubscribeLoaded();
          unsubscribeClosed();
        };
      });
  }, [adUnitId]);

  const showInterstitial = () => {
    if (loaded && interstitialRef.current) {
      interstitialRef.current.show();
    } else {
      console.warn('Interstitial ad not ready');
    }
  };

  return { showInterstitial, isLoaded: loaded };
}

