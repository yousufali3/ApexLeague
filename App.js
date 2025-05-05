import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthStore } from './store/authStore';

// Screens
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import BottomTabNavigator from './navigation/BottomTabNavigator'; // Import BottomTabNavigator
import WalletScreen from './screens/WalletScreen'; // Import WalletScreen
import ProfileScreen from './screens/ProfileScreen'; // Import ProfileScreen
import GameScreen from './screens/GameScreen'; // Import GameScreen
import TournamentDetailsScreen from './screens/TournamentDetailsScreen'; // Import TournamentDetailsScreen
const Stack = createNativeStackNavigator();

export default function App() {
  const { token, loadToken } = useAuthStore();

  useEffect(() => {
    loadToken();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false, // Hide header for all screens by default
        }}
      >
        {token ? (
          <>
            <Stack.Screen name="HomeTabs" component={BottomTabNavigator} />
            <Stack.Screen
              name="Wallet"
              component={WalletScreen}
              options={{ headerShown: true }} // Enable header for Wallet
            />
            <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{ headerShown: true }} // Enable header for Profile
            />
            <Stack.Screen
              name="GameScreen"
              component={GameScreen}
              options={{ headerShown: true }}
            />
            <Stack.Screen
              name="TournamentDetails"
              component={TournamentDetailsScreen}
              // options={{ headerShown: true }} // Enable header for TournamentDetails
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPasswordScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
