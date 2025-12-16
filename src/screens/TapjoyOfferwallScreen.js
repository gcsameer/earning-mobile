import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import api from '../config/api';

export default function TapjoyOfferwallScreen() {
  const [sdkKey, setSdkKey] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOfferwall();
  }, []);

  const loadOfferwall = async () => {
    try {
      const response = await api.get('/tapjoy/wall/');
      setSdkKey(response.data.sdk_key);
      setUserId(response.data.user_id);
    } catch (error) {
      Alert.alert('Error', 'Failed to load Tapjoy offerwall');
    } finally {
      setLoading(false);
    }
  };

  const openOfferwall = async () => {
    if (!sdkKey) {
      Alert.alert('Error', 'Tapjoy SDK key not available');
      return;
    }

    // Note: Tapjoy SDK integration requires native modules
    // This is a placeholder - you'll need to integrate Tapjoy SDK
    Alert.alert(
      'Tapjoy SDK',
      'Tapjoy SDK integration requires native modules. Please install react-native-tapjoy or use Tapjoy\'s native SDK.',
      [{ text: 'OK' }]
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#10b981" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Tapjoy Offerwall</Text>
        <Text style={styles.description}>
          Complete offers and surveys to earn coins. Tapjoy offers are available through the Tapjoy SDK.
        </Text>

        {sdkKey && (
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>SDK Key:</Text>
            <Text style={styles.infoValue}>{sdkKey}</Text>
            <Text style={styles.infoLabel}>User ID:</Text>
            <Text style={styles.infoValue}>{userId}</Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={openOfferwall}
          disabled={!sdkKey}
        >
          <Text style={styles.buttonText}>Open Tapjoy Offerwall</Text>
        </TouchableOpacity>

        <View style={styles.noteContainer}>
          <Text style={styles.note}>
            💡 Note: Tapjoy SDK integration requires native modules. 
            Install react-native-tapjoy or integrate Tapjoy's native SDK.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  card: {
    backgroundColor: '#1e293b',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: '#cbd5e1',
    marginBottom: 20,
    lineHeight: 20,
  },
  infoContainer: {
    backgroundColor: '#0f172a',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  infoLabel: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 8,
  },
  infoValue: {
    fontSize: 14,
    color: '#ffffff',
    fontFamily: 'monospace',
  },
  button: {
    backgroundColor: '#10b981',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  noteContainer: {
    backgroundColor: '#1e3a8a',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
  },
  note: {
    fontSize: 12,
    color: '#bfdbfe',
    lineHeight: 18,
  },
});

