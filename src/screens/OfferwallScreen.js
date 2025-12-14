import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Linking,
} from 'react-native';
import api from '../config/api';

export default function OfferwallScreen() {
  const [offerwallUrl, setOfferwallUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOfferwall();
  }, []);

  const loadOfferwall = async () => {
    try {
      const response = await api.get('/cpx/wall/');
      setOfferwallUrl(response.data.url);
    } catch (error) {
      Alert.alert('Error', 'Failed to load offerwall');
    } finally {
      setLoading(false);
    }
  };

  const openOfferwall = async () => {
    if (offerwallUrl) {
      const supported = await Linking.canOpenURL(offerwallUrl);
      if (supported) {
        await Linking.openURL(offerwallUrl);
      } else {
        Alert.alert('Error', 'Cannot open offerwall URL');
      }
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#10b981" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>CPX Research Offerwall</Text>
        <Text style={styles.description}>
          Complete offers and surveys to earn coins. Click the button below to
          open the offerwall.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={openOfferwall}
          disabled={!offerwallUrl}
        >
          <Text style={styles.buttonText}>Open Offerwall</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: '#cbd5e1',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  button: {
    backgroundColor: '#10b981',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

