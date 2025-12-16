import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import api from '../../config/api';

export default function Puzzle({ task, onComplete }) {
  const [puzzle, setPuzzle] = useState(null);
  const [selected, setSelected] = useState(null);
  const [solved, setSolved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reward, setReward] = useState(0);

  // Simple math puzzle
  useEffect(() => {
    const num1 = Math.floor(Math.random() * 20) + 1;
    const num2 = Math.floor(Math.random() * 20) + 1;
    const answer = num1 + num2;
    const wrongAnswers = [
      answer + 1,
      answer - 1,
      answer + 2,
      answer - 2,
    ].filter(a => a > 0 && a !== answer);

    const options = [answer, ...wrongAnswers.slice(0, 3)]
      .sort(() => Math.random() - 0.5);

    setPuzzle({
      question: `What is ${num1} + ${num2}?`,
      answer,
      options,
    });
  }, []);

  const handleAnswer = async (selectedAnswer) => {
    if (solved || loading) return;

    setSelected(selectedAnswer);
    setLoading(true);
    setError(null);

    // Check if answer is correct
    if (selectedAnswer === puzzle.answer) {
      try {
        const response = await api.post(`/tasks/game/complete/${task.id}/`, {
          device_id: 'mobile-app',
        });

        if (response.data && response.data.reward_coins) {
          setReward(response.data.reward_coins);
          setSolved(true);

          setTimeout(() => {
            if (onComplete) onComplete(response.data);
          }, 2000);
        } else {
          setError('Task completed but no reward received. Please contact support.');
        }
      } catch (err) {
        console.error('Task completion error:', err);
        const errorMessage = err.response?.data?.detail || err.response?.data?.message || err.message || 'Failed to complete task';
        setError(errorMessage);
        setSelected(null);
        Alert.alert('Error', errorMessage);
      } finally {
        setLoading(false);
      }
    } else {
      setError('Wrong answer! Try again.');
      setLoading(false);
      setTimeout(() => {
        setSelected(null);
        setError(null);
      }, 2000);
    }
  };

  if (!puzzle) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#10b981" />
        <Text style={styles.loadingText}>Loading puzzle...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{task.title}</Text>
      <Text style={styles.description}>{task.description}</Text>

      <View style={styles.puzzleContainer}>
        <Text style={styles.question}>{puzzle.question}</Text>

        <View style={styles.optionsContainer}>
          {puzzle.options.map((option, index) => {
            const isCorrect = solved && option === puzzle.answer;
            const isWrong = selected === option && option !== puzzle.answer;
            
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  isCorrect && styles.optionCorrect,
                  isWrong && styles.optionWrong,
                ]}
                onPress={() => handleAnswer(option)}
                disabled={solved || loading}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {solved && (
        <View style={styles.rewardContainer}>
          <Text style={styles.rewardText}>🎉 Correct! You won {reward} coins!</Text>
        </View>
      )}

      {error && (
        <View style={[
          styles.errorContainer,
          error.includes('Wrong') && styles.errorWrong,
        ]}>
          <Text style={[
            styles.errorText,
            error.includes('Wrong') && styles.errorTextWrong,
          ]}>
            {error}
          </Text>
        </View>
      )}

      <Text style={styles.infoText}>
        💰 Solve correctly to earn <Text style={styles.rewardRange}>50 coins</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 20,
    margin: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 16,
    textAlign: 'center',
  },
  loadingText: {
    color: '#94a3b8',
    marginTop: 12,
    textAlign: 'center',
  },
  puzzleContainer: {
    backgroundColor: '#334155',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
  },
  question: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 24,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  optionButton: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#475569',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  optionCorrect: {
    backgroundColor: '#10b981',
  },
  optionWrong: {
    backgroundColor: '#ef4444',
  },
  optionText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  rewardContainer: {
    marginBottom: 16,
    alignItems: 'center',
  },
  rewardText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#10b981',
    textAlign: 'center',
  },
  errorContainer: {
    backgroundColor: '#ef4444',
    opacity: 0.1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ef4444',
  },
  errorWrong: {
    backgroundColor: '#ef4444',
    opacity: 0.1,
  },
  errorText: {
    color: '#ef4444',
    fontSize: 14,
    textAlign: 'center',
  },
  errorTextWrong: {
    color: '#ef4444',
  },
  infoText: {
    fontSize: 12,
    color: '#94a3b8',
    textAlign: 'center',
    marginTop: 8,
  },
  rewardRange: {
    color: '#10b981',
    fontWeight: '600',
  },
});

