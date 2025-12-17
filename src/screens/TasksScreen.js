import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Alert,
  Modal,
  ScrollView,
} from 'react-native';
import api from '../config/api';
import AdBanner from '../components/AdBanner';
import { useInterstitialAd } from '../components/InterstitialAd';
import ScratchCard from '../components/tasks/ScratchCard';
import SpinWheel from '../components/tasks/SpinWheel';
import Puzzle from '../components/tasks/Puzzle';
import Quiz from '../components/tasks/Quiz';

export default function TasksScreen({ navigation }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeGame, setActiveGame] = useState(null);
  const { showInterstitial } = useInterstitialAd();

  useEffect(() => {
    loadTasks();
  }, []);

  // Show interstitial ad when screen is focused (user navigates to this screen)
  useEffect(() => {
    // Show ad after a short delay to avoid interrupting navigation
    const timer = setTimeout(() => {
      showInterstitial();
    }, 2000); // 2 second delay
    return () => clearTimeout(timer);
  }, []); // Only on mount

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

  const handleStartTask = async (task) => {
    // Offerwall tasks => navigate to offerwall screen
    if (task.type === 'offerwall') {
      navigation.navigate('Offerwall');
      return;
    }
    if (task.type === 'tapjoy_offerwall') {
      navigation.navigate('TapjoyOfferwall');
      return;
    }

    // Game-based tasks (instant completion)
    const gameTypes = ['scratch_card', 'spin_wheel', 'puzzle', 'quiz'];
    if (gameTypes.includes(task.type)) {
      setActiveGame(task);
      return;
    }

    // Regular tasks (with countdown) - navigate to countdown screen
    try {
      const response = await api.post(`/tasks/start/${task.id}/`, {
        device_id: 'mobile-app',
      });
      
      const userTaskId = response.data?.user_task_id;
      if (!userTaskId) {
        Alert.alert('Error', 'No user_task_id returned from backend');
        return;
      }

      // Navigate to countdown screen
      navigation.navigate('TaskCountdown', { userTaskId });
    } catch (error) {
      Alert.alert('Error', error.response?.data?.detail || 'Failed to start task');
    }
  };

  const handleGameComplete = (result) => {
    setActiveGame(null);
    Alert.alert(
      'Success!',
      `You earned ${result.reward_coins} coins! Your new balance is ${result.new_balance} coins.`,
      [
        {
          text: 'OK',
          onPress: () => loadTasks(), // Refresh tasks
        },
      ]
    );
  };

  const renderGameModal = () => {
    if (!activeGame) return null;

    let GameComponent = null;
    switch (activeGame.type) {
      case 'scratch_card':
        GameComponent = ScratchCard;
        break;
      case 'spin_wheel':
        GameComponent = SpinWheel;
        break;
      case 'puzzle':
        GameComponent = Puzzle;
        break;
      case 'quiz':
        GameComponent = Quiz;
        break;
      default:
        return null;
    }

    return (
      <Modal
        visible={!!activeGame}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setActiveGame(null)}
      >
        <ScrollView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setActiveGame(null)}
            >
              <Text style={styles.closeButtonText}>✕ Close</Text>
            </TouchableOpacity>
          </View>
          <GameComponent task={activeGame} onComplete={handleGameComplete} />
        </ScrollView>
      </Modal>
    );
  };

  const renderTask = ({ item, index }) => {
    const gameTypes = ['scratch_card', 'spin_wheel', 'puzzle', 'quiz'];
    const isGame = gameTypes.includes(item.type);
    const isOfferwall = item.type === 'offerwall' || item.type === 'tapjoy_offerwall';
    
    return (
      <View>
        <View style={styles.taskCard}>
          <Text style={styles.taskTitle}>{item.title}</Text>
          <Text style={styles.taskDescription}>{item.description}</Text>
          <View style={styles.taskFooter}>
            {!isGame && !isOfferwall && (
              <Text style={styles.rewardText}>Reward: {item.reward_coins} coins</Text>
            )}
            <TouchableOpacity
              style={styles.startButton}
              onPress={() => handleStartTask(item)}
            >
              <Text style={styles.startButtonText}>
                {isOfferwall
                  ? item.type === 'tapjoy_offerwall'
                    ? 'Open Tapjoy'
                    : 'Open Offerwall'
                  : isGame
                  ? '🎮 Play'
                  : 'Start'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Show ad after every 3rd task */}
        {(index + 1) % 3 === 0 && <AdBanner style={styles.adContainer} />}
      </View>
    );
  };

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
      {renderGameModal()}
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
  modalContainer: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    color: '#10b981',
    fontSize: 16,
    fontWeight: '600',
  },
});

