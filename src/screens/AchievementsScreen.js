import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  Alert,
  ActivityIndicator,
} from 'react-native';
import api from '../config/api';

export default function AchievementsScreen() {
  const [achievements, setAchievements] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadAchievements();
  }, []);

  const loadAchievements = async () => {
    try {
      const response = await api.get('/achievements/');
      setAchievements(response.data);
      setError(null);
    } catch (e) {
      setError('Failed to load achievements.');
      Alert.alert('Error', 'Failed to load achievements.');
    } finally {
      setLoading(false);
    }
  };

  const renderAchievement = ({ item, isUnlocked }) => (
    <View
      style={[
        styles.achievementCard,
        isUnlocked ? styles.achievementUnlocked : styles.achievementLocked,
      ]}
    >
      <Text style={styles.achievementIcon}>{item.icon}</Text>
      <Text
        style={[
          styles.achievementName,
          !isUnlocked && styles.achievementNameLocked,
        ]}
      >
        {item.name}
      </Text>
      <Text
        style={[
          styles.achievementDescription,
          !isUnlocked && styles.achievementDescriptionLocked,
        ]}
      >
        {item.description}
      </Text>
      {isUnlocked ? (
        <Text style={styles.unlockedBadge}>✓ Unlocked</Text>
      ) : (
        <>
          {item.progress !== undefined && item.target !== undefined && (
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${Math.min(
                        (item.progress / item.target) * 100,
                        100
                      )}%`,
                    },
                  ]}
                />
              </View>
              <Text style={styles.progressText}>
                {item.progress} / {item.target}
              </Text>
            </View>
          )}
          <Text style={styles.lockedBadge}>🔒 Locked</Text>
        </>
      )}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#10b981" />
          <Text style={styles.loadingText}>Loading achievements...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerIcon}>🏆</Text>
        <Text style={styles.headerTitle}>Achievements</Text>
        {achievements && (
          <Text style={styles.headerSubtitle}>
            {achievements.total_unlocked} of {achievements.total_available}{' '}
            unlocked
          </Text>
        )}
      </View>

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      <FlatList
        data={[
          ...(achievements?.unlocked || []).map((a) => ({ ...a, isUnlocked: true })),
          ...(achievements?.locked || []).map((a) => ({ ...a, isUnlocked: false })),
        ]}
        renderItem={({ item }) => renderAchievement({ item, isUnlocked: item.isUnlocked })}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={loadAchievements} />
        }
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No achievements available</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#94a3b8',
    marginTop: 12,
  },
  header: {
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  headerIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#94a3b8',
  },
  errorContainer: {
    backgroundColor: '#ef4444',
    opacity: 0.1,
    margin: 16,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ef4444',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 14,
    textAlign: 'center',
  },
  list: {
    padding: 16,
  },
  achievementCard: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 2,
  },
  achievementUnlocked: {
    backgroundColor: '#10b981',
    opacity: 0.1,
    borderColor: '#10b981',
  },
  achievementLocked: {
    backgroundColor: '#1e293b',
    borderColor: '#334155',
    opacity: 0.6,
  },
  achievementIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  achievementName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
  achievementNameLocked: {
    color: '#94a3b8',
  },
  achievementDescription: {
    fontSize: 14,
    color: '#cbd5e1',
    textAlign: 'center',
    marginBottom: 12,
  },
  achievementDescriptionLocked: {
    color: '#64748b',
  },
  progressContainer: {
    width: '100%',
    marginBottom: 12,
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#334155',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#64748b',
  },
  progressText: {
    fontSize: 12,
    color: '#94a3b8',
    textAlign: 'center',
  },
  unlockedBadge: {
    fontSize: 12,
    color: '#10b981',
    fontWeight: '600',
    marginTop: 8,
  },
  lockedBadge: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 8,
  },
  empty: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    color: '#94a3b8',
    fontSize: 16,
  },
});

