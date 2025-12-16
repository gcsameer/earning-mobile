import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

/**
 * AdBanner Component - Placeholder
 * AdMob temporarily disabled to fix build errors
 * Will be re-enabled after successful build
 */
export default function AdBanner({ adUnitId, style }) {
  // Placeholder for AdMob banner ad
  // AdMob will be re-enabled after build succeeds
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.text}>📢 Ad Space</Text>
      <Text style={styles.subtext}>AdMob temporarily disabled</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1e293b',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
    marginVertical: 8,
  },
  text: {
    color: '#cbd5e1',
    fontSize: 14,
    fontWeight: '500',
  },
  subtext: {
    color: '#94a3b8',
    fontSize: 12,
    marginTop: 4,
  },
});
