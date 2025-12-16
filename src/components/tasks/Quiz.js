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

export default function Quiz({ task, onComplete }) {
  const [quiz, setQuiz] = useState(null);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reward, setReward] = useState(0);

  // Simple quiz questions
  const quizQuestions = [
    {
      question: "What is the capital of Nepal?",
      options: ["Kathmandu", "Pokhara", "Lalitpur", "Bhaktapur"],
      answer: "Kathmandu"
    },
    {
      question: "Which is the highest mountain in the world?",
      options: ["K2", "Mount Everest", "Kangchenjunga", "Lhotse"],
      answer: "Mount Everest"
    },
    {
      question: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
      answer: "4"
    },
    {
      question: "Which planet is closest to the Sun?",
      options: ["Venus", "Earth", "Mercury", "Mars"],
      answer: "Mercury"
    },
    {
      question: "What is the largest ocean?",
      options: ["Atlantic", "Indian", "Arctic", "Pacific"],
      answer: "Pacific"
    }
  ];

  useEffect(() => {
    // Pick a random question
    const randomQuestion = quizQuestions[Math.floor(Math.random() * quizQuestions.length)];
    setQuiz(randomQuestion);
  }, []);

  const handleAnswer = async (selectedAnswer) => {
    if (answered || loading) return;

    setSelected(selectedAnswer);
    setAnswered(true);
    setLoading(true);
    setError(null);

    // Check if answer is correct
    if (selectedAnswer === quiz.answer) {
      try {
        const response = await api.post(`/tasks/game/complete/${task.id}/`, {
          device_id: 'mobile-app',
        });

        if (response.data && response.data.reward_coins) {
          setReward(response.data.reward_coins);
          
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
        setAnswered(false);
        setSelected(null);
        Alert.alert('Error', errorMessage);
      } finally {
        setLoading(false);
      }
    } else {
      setError('Wrong answer! Try again.');
      setLoading(false);
      setTimeout(() => {
        setAnswered(false);
        setSelected(null);
        setError(null);
        // Reset with new question
        const randomQuestion = quizQuestions[Math.floor(Math.random() * quizQuestions.length)];
        setQuiz(randomQuestion);
      }, 2000);
    }
  };

  if (!quiz) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#10b981" />
        <Text style={styles.loadingText}>Loading quiz...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{task.title}</Text>
      <Text style={styles.description}>{task.description}</Text>

      <View style={styles.quizContainer}>
        <Text style={styles.question}>{quiz.question}</Text>

        <View style={styles.optionsContainer}>
          {quiz.options.map((option, index) => {
            const isCorrect = answered && option === quiz.answer;
            const isWrong = answered && selected === option && option !== quiz.answer;
            
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  isCorrect && styles.optionCorrect,
                  isWrong && styles.optionWrong,
                ]}
                onPress={() => handleAnswer(option)}
                disabled={answered || loading}
              >
                <Text style={styles.optionText}>
                  {String.fromCharCode(65 + index)}. {option}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {answered && selected === quiz.answer && (
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
        💰 Answer correctly to earn <Text style={styles.rewardRange}>50 coins</Text>
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
  quizContainer: {
    backgroundColor: '#334155',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
  },
  question: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 24,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    backgroundColor: '#475569',
    borderRadius: 8,
    padding: 16,
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
    fontSize: 16,
    fontWeight: '500',
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

