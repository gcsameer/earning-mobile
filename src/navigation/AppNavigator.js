import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth } from '../context/AuthContext';
import { ActivityIndicator, View, StyleSheet, Text } from 'react-native';

// Screens
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import DashboardScreen from '../screens/DashboardScreen';
import TasksScreen from '../screens/TasksScreen';
import WalletScreen from '../screens/WalletScreen';
import ReferralsScreen from '../screens/ReferralsScreen';
import OfferwallScreen from '../screens/OfferwallScreen';
import TapjoyOfferwallScreen from '../screens/TapjoyOfferwallScreen';
import WithdrawScreen from '../screens/WithdrawScreen';
import TaskCountdownScreen from '../screens/TaskCountdownScreen';
import AchievementsScreen from '../screens/AchievementsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AboutScreen from '../screens/AboutScreen';
import ContactScreen from '../screens/ContactScreen';
import FAQScreen from '../screens/FAQScreen';
import PrivacyPolicyScreen from '../screens/PrivacyPolicyScreen';
import TermsOfServiceScreen from '../screens/TermsOfServiceScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#0f172a',
        },
        headerTintColor: '#fff',
        tabBarStyle: {
          backgroundColor: '#1e293b',
          borderTopColor: '#334155',
        },
        tabBarActiveTintColor: '#10b981',
        tabBarInactiveTintColor: '#94a3b8',
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 20 }}>🏠</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Tasks"
        component={TasksScreen}
        options={{
          title: 'Tasks',
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 20 }}>📋</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Wallet"
        component={WalletScreen}
        options={{
          title: 'Wallet',
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 20 }}>💰</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Referrals"
        component={ReferralsScreen}
        options={{
          title: 'Referrals',
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 20 }}>👥</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 20 }}>⚙️</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#10b981" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#0f172a',
          },
          headerTintColor: '#fff',
          contentStyle: {
            backgroundColor: '#0f172a',
          },
        }}
      >
        {!isAuthenticated ? (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ title: 'Register' }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Main"
              component={MainTabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Offerwall"
              component={OfferwallScreen}
              options={{ title: 'CPX Offerwall' }}
            />
            <Stack.Screen
              name="TapjoyOfferwall"
              component={TapjoyOfferwallScreen}
              options={{ title: 'Tapjoy Offerwall' }}
            />
            <Stack.Screen
              name="Withdraw"
              component={WithdrawScreen}
              options={{ title: 'Withdraw' }}
            />
            <Stack.Screen
              name="TaskCountdown"
              component={TaskCountdownScreen}
              options={{ title: 'Task in Progress' }}
            />
            <Stack.Screen
              name="Achievements"
              component={AchievementsScreen}
              options={{ title: 'Achievements' }}
            />
            <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{ title: 'Profile' }}
            />
            <Stack.Screen
              name="About"
              component={AboutScreen}
              options={{ title: 'About Us' }}
            />
            <Stack.Screen
              name="Contact"
              component={ContactScreen}
              options={{ title: 'Contact Us' }}
            />
            <Stack.Screen
              name="FAQ"
              component={FAQScreen}
              options={{ title: 'FAQ' }}
            />
            <Stack.Screen
              name="PrivacyPolicy"
              component={PrivacyPolicyScreen}
              options={{ title: 'Privacy Policy' }}
            />
            <Stack.Screen
              name="TermsOfService"
              component={TermsOfServiceScreen}
              options={{ title: 'Terms of Service' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f172a',
  },
});

