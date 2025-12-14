import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import api from '../config/api';
import AdBanner from '../components/AdBanner';

export default function TasksScreen({ navigation }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const response = await api.get('/tasks/');
      setTasks(response.data);
    } catch (error) {
      Alert.alert('Error', 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleStartTask = async (taskId) => {
    try {
      const response = await api.post(`/tasks/start/${taskId}/`, {
        device_id: 'mobile-app',
      });
      Alert.alert('Success', 'Task started! Complete it to earn coins.');
    } catch (error) {
      Alert.alert('Error', error.response?.data?.detail || 'Failed to start task');
    }
  };

  const renderTask = ({ item, index }) => (
    <View>
      <View style={styles.taskCard}>
        <Text style={styles.taskTitle}>{item.title}</Text>
        <Text style={styles.taskDescription}>{item.description}</Text>
        <View style={styles.taskFooter}>
          <Text style={styles.rewardText}>Reward: {item.reward_coins} coins</Text>
          <TouchableOpacity
            style={styles.startButton}
            onPress={() => handleStartTask(item.id)}
          >
            <Text style={styles.startButtonText}>Start</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Show ad after every 3rd task */}
      {(index + 1) % 3 === 0 && <AdBanner style={styles.adContainer} />}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={({ item, index }) => renderTask({ item, index })}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={loadTasks} />
        }
        contentContainerStyle={styles.list}
        ListHeaderComponent={<AdBanner style={styles.adContainer} />}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No tasks available</Text>
          </View>
        }
        ListFooterComponent={<AdBanner style={styles.adContainer} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  list: {
    padding: 16,
  },
  taskCard: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  taskDescription: {
    fontSize: 14,
    color: '#cbd5e1',
    marginBottom: 12,
  },
  taskFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rewardText: {
    fontSize: 16,
    color: '#10b981',
    fontWeight: '600',
  },
  startButton: {
    backgroundColor: '#10b981',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
  },
  startButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  empty: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    color: '#94a3b8',
    fontSize: 16,
  },
  adContainer: {
    marginVertical: 10,
  },
});

